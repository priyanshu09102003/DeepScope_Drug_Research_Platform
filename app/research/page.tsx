
"use client";

import { useState, useEffect } from "react";
import { Search, Atom, FlaskConical, Microscope, Sparkles } from "lucide-react";
import DefaultLayout from "../components/Layout/DefaultLayout";
import MoleculeStructure from "../components/MoleculeStructure";
import initRDKit from "../utils/initRDKit";

interface CompoundData {
  MolecularFormula: string;
  MolecularWeight: number;
  InChIKey: string;
  CanonicalSMILES: string;
  IsomericSMILES: string;
  IUPACName: string;
  XLogP: number;
  ExactMass: number;
  MonoisotopicMass: number;
  TPSA: number;
  Complexity: number;
  Charge: number;
  HBondDonorCount: number;
  HBondAcceptorCount: number;
  RotatableBondCount: number;
  HeavyAtomCount: number;
}

function PubChem() {
  const [compoundName, setCompoundName] = useState("");
  const [compoundData, setCompoundData] = useState<CompoundData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rdkitReady, setRdkitReady] = useState(false);

  // Preload RDKit when component mounts
  useEffect(() => {
    initRDKit()
      .then(() => {
        console.log("RDKit loaded successfully in PubChem component");
        setRdkitReady(true);
      })
      .catch((err) => {
        console.error("Failed to load RDKit in PubChem:", err);
      });
  }, []);

  const fetchCompoundData = async () => {
    if (!compoundName.trim()) {
      setError("Please enter a compound name");
      return;
    }

    setLoading(true);
    setError("");
    setCompoundData(null);

    try {
      const response = await fetch(
        `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(
          compoundName,
        )}/property/MolecularFormula,MolecularWeight,InChIKey,CanonicalSMILES,IsomericSMILES,IUPACName,XLogP,ExactMass,MonoisotopicMass,TPSA,Complexity,Charge,HBondDonorCount,HBondAcceptorCount,RotatableBondCount,HeavyAtomCount/JSON`,
      );

      if (!response.ok) {
        throw new Error("Compound not found");
      }

      const data = await response.json();
      console.log("PubChem API Response:", data);

      if (
        data &&
        data.PropertyTable &&
        data.PropertyTable.Properties &&
        data.PropertyTable.Properties.length > 0
      ) {
        const compoundInfo = data.PropertyTable.Properties[0];
        console.log("Compound Info:", compoundInfo);
        
        // Helper function to safely parse numbers
        const parseNumber = (val: any): number => {
          const num = parseFloat(val);
          return isNaN(num) ? 0 : num;
        };
        
        const parsedData = {
          MolecularFormula: compoundInfo.MolecularFormula || "N/A",
          MolecularWeight: parseNumber(compoundInfo.MolecularWeight),
          InChIKey: compoundInfo.InChIKey || "N/A",
          CanonicalSMILES: compoundInfo.CanonicalSMILES || compoundInfo.ConnectivitySMILES || compoundInfo.SMILES || "",
          IsomericSMILES: compoundInfo.IsomericSMILES || compoundInfo.CanonicalSMILES || compoundInfo.ConnectivitySMILES || compoundInfo.SMILES || "",
          IUPACName: compoundInfo.IUPACName || "N/A",
          XLogP: parseNumber(compoundInfo.XLogP),
          ExactMass: parseNumber(compoundInfo.ExactMass),
          MonoisotopicMass: parseNumber(compoundInfo.MonoisotopicMass),
          TPSA: parseNumber(compoundInfo.TPSA),
          Complexity: parseNumber(compoundInfo.Complexity),
          Charge: parseNumber(compoundInfo.Charge),
          HBondDonorCount: parseInt(compoundInfo.HBondDonorCount) || 0,
          HBondAcceptorCount: parseInt(compoundInfo.HBondAcceptorCount) || 0,
          RotatableBondCount: parseInt(compoundInfo.RotatableBondCount) || 0,
          HeavyAtomCount: parseInt(compoundInfo.HeavyAtomCount) || 0,
        };
        
        console.log("Parsed Data with SMILES:", parsedData.CanonicalSMILES);
        setCompoundData(parsedData);
      } else {
        throw new Error("Compound data is not available");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchCompoundData();
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto min-h-screen p-0">
        <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <h1 className="text-4xl font-bold text-black dark:text-white">
            Compound Search
          </h1>
          <div className="relative flex w-full items-center md:w-auto md:flex-1 md:justify-end">
            <input
              type="text"
              value={compoundName}
              onChange={(e) => setCompoundName(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-full rounded-lg border border-gray-300 bg-white p-3 pl-10 pr-12 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white md:w-96"
              placeholder="Enter a compound name (e.g., Aspirin)"
            />
            <button
              onClick={fetchCompoundData}
              disabled={loading}
              className="absolute right-2 rounded-md p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 dark:hover:bg-gray-700"
            >
              {loading ? (
                <svg className="h-5 w-5 animate-spin text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <Search className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>

         {!compoundData && !error && !loading && (
          <div className="flex items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-12 shadow-xl dark:border-gray-800 dark:from-gray-900 dark:via-purple-900/20 dark:to-blue-900/20 min-h-[600px]">
            <div className="text-center max-w-2xl">
              <div className="mb-8 flex justify-center gap-4">
                <div className="animate-float">
                  <Atom className="h-20 w-20 text-blue-400 dark:text-blue-500" strokeWidth={1.5} />
                </div>
                <div className="animate-float-delay-1">
                  <FlaskConical className="h-20 w-20 text-purple-400 dark:text-purple-500" strokeWidth={1.5} />
                </div>
                <div className="animate-float-delay-2">
                  <Microscope className="h-20 w-20 text-pink-400 dark:text-pink-500" strokeWidth={1.5} />
                </div>
              </div>
              
              <div className="mb-4 flex items-center justify-center gap-2">
                <Sparkles className="h-6 w-6 text-yellow-500" />
                <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                  Discover Molecular Intelligence
                </h3>
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </div>
              
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Unlock comprehensive insights into any compound. Search by name to explore molecular structures, pharmacokinetic properties, drug-likeness analysis, and more.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-xl bg-white/60 dark:bg-gray-800/60 p-4 shadow-md backdrop-blur-sm">
                  <div className="mb-2 flex justify-center">
                    <Atom className="h-8 w-8 text-blue-500" />
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    Molecular Properties
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Detailed structural data, SMILES notation, and chemical identifiers
                  </p>
                </div>
                
                <div className="rounded-xl bg-white/60 dark:bg-gray-800/60 p-4 shadow-md backdrop-blur-sm">
                  <div className="mb-2 flex justify-center">
                    <FlaskConical className="h-8 w-8 text-purple-500" />
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    Drug-Likeness
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Lipinski's Rule of Five analysis and bioavailability predictions
                  </p>
                </div>
                
                <div className="rounded-xl bg-white/60 dark:bg-gray-800/60 p-4 shadow-md backdrop-blur-sm">
                  <div className="mb-2 flex justify-center">
                    <Microscope className="h-8 w-8 text-pink-500" />
                  </div>
                  <h4 className="mb-2 font-semibold text-gray-800 dark:text-gray-200">
                    Pharmacokinetics
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    BBB permeability, ADME properties, and metabolic predictions
                  </p>
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg">
                <Search className="h-4 w-4" />
                <span>Start your research by entering a compound name above</span>
              </div>
            </div>
          </div>
        )}


        {error && (
          <div className="mt-6 rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-900/20">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {compoundData && (
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Molecular Structure - Large Card */}
            <div className="space-y-4 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800 lg:col-span-1">
              <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                Molecular Structure
              </h2>
              
              {/* Canonical SMILES Structure */}
              <div>
                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Canonical Structure
                </h3>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  {compoundData.CanonicalSMILES ? (
                    <MoleculeStructure
                      id={`canonical-${Date.now()}`}
                      structure={compoundData.CanonicalSMILES}
                      svgMode={true}
                      width={250}
                      height={200}
                    />
                  ) : (
                    <div className="flex h-[200px] items-center justify-center text-gray-500">
                      No structure data available
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <strong className="text-sm text-gray-600 dark:text-gray-300">
                    Canonical SMILES:
                  </strong>
                  <p className="mt-1 break-all rounded bg-gray-100 p-2 font-mono text-xs text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                    {compoundData.CanonicalSMILES || "N/A"}
                  </p>
                </div>
              </div>

            </div>

            {/* Right Side - Information Cards */}
            <div className="space-y-6 lg:col-span-2">
              {/* Basic Information */}
              <div className="space-y-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Basic Information
                </h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Molecular Formula:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {compoundData.MolecularFormula}
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Molecular Weight:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {typeof compoundData.MolecularWeight === 'number' 
                        ? compoundData.MolecularWeight.toFixed(2) 
                        : compoundData.MolecularWeight} g/mol
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-gray-600 dark:text-gray-300">
                      InChIKey:
                    </strong>
                    <p className="mt-1 break-all font-mono text-sm text-gray-900 dark:text-white">
                      {compoundData.InChIKey}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <strong className="text-gray-600 dark:text-gray-300">
                      IUPAC Name:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {compoundData.IUPACName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Physical Properties */}
              <div className="space-y-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Physical Properties
                </h2>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      XLogP:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {compoundData.XLogP}
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Exact Mass:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {typeof compoundData.ExactMass === 'number' 
                        ? compoundData.ExactMass.toFixed(6) 
                        : compoundData.ExactMass} g/mol
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Monoisotopic Mass:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {typeof compoundData.MonoisotopicMass === 'number' 
                        ? compoundData.MonoisotopicMass.toFixed(6) 
                        : compoundData.MonoisotopicMass} g/mol
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      TPSA:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {compoundData.TPSA} Ų
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Complexity:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {typeof compoundData.Complexity === 'number' 
                        ? compoundData.Complexity.toFixed(2) 
                        : compoundData.Complexity}
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-600 dark:text-gray-300">
                      Charge:
                    </strong>
                    <p className="mt-1 text-gray-900 dark:text-white">
                      {compoundData.Charge}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Structural Features
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {compoundData.HBondDonorCount}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      H-Bond Donors
                    </p>
                  </div>
                  <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {compoundData.HBondAcceptorCount}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      H-Bond Acceptors
                    </p>
                  </div>
                  <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20">
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {compoundData.RotatableBondCount}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Rotatable Bonds
                    </p>
                  </div>
                  <div className="rounded-lg bg-orange-50 p-4 text-center dark:bg-orange-900/20">
                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                      {compoundData.HeavyAtomCount}
                    </p>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      Heavy Atoms
                    </p>
                  </div>
                </div>
              </div>

              {/* Lipinski's Rule of Five (Drug-Likeness) */}
              <div className="space-y-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Drug-Likeness Analysis
                  <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Lipinski's Rule of Five)
                  </span>
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Molecular Weight ≤ 500
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {compoundData.MolecularWeight.toFixed(2)}
                      </span>
                      {compoundData.MolecularWeight <= 500 ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          ✗ Fail
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        LogP ≤ 5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {compoundData.XLogP}
                      </span>
                      {compoundData.XLogP <= 5 ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          ✗ Fail
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        H-Bond Donors ≤ 5
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {compoundData.HBondDonorCount}
                      </span>
                      {compoundData.HBondDonorCount <= 5 ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          ✗ Fail
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-900">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        H-Bond Acceptors ≤ 10
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm text-gray-900 dark:text-white">
                        {compoundData.HBondAcceptorCount}
                      </span>
                      {compoundData.HBondAcceptorCount <= 10 ? (
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          ✓ Pass
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          ✗ Fail
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 rounded-lg border-l-4 border-blue-500 bg-blue-50 p-3 dark:bg-blue-900/20">
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      <strong>Drug-likeness Score:</strong> {
                        [
                          compoundData.MolecularWeight <= 500,
                          compoundData.XLogP <= 5,
                          compoundData.HBondDonorCount <= 5,
                          compoundData.HBondAcceptorCount <= 10
                        ].filter(Boolean).length
                      }/4 criteria passed. 
                      {[
                        compoundData.MolecularWeight <= 500,
                        compoundData.XLogP <= 5,
                        compoundData.HBondDonorCount <= 5,
                        compoundData.HBondAcceptorCount <= 10
                      ].filter(Boolean).length >= 3 
                        ? " Good oral bioavailability expected." 
                        : " May have limited oral bioavailability."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pharmacokinetic Properties */}
              <div className="space-y-3 rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  Pharmacokinetic Predictions
                </h2>
                <div className="space-y-3">
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Lipophilicity (LogP)
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {compoundData.XLogP}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {compoundData.XLogP < 0 
                        ? "Hydrophilic - Good water solubility" 
                        : compoundData.XLogP < 3 
                        ? "Moderately lipophilic - Balanced solubility" 
                        : compoundData.XLogP < 5 
                        ? "Lipophilic - Better membrane permeability" 
                        : "Highly lipophilic - May accumulate in tissues"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Polar Surface Area (TPSA)
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {compoundData.TPSA} Ų
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {compoundData.TPSA < 60 
                        ? "BBB permeable - Can cross blood-brain barrier" 
                        : compoundData.TPSA < 140 
                        ? "Good oral absorption expected" 
                        : "Limited membrane permeability"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Molecular Flexibility
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {compoundData.RotatableBondCount} bonds
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {compoundData.RotatableBondCount < 5 
                        ? "Rigid molecule - Better binding specificity" 
                        : compoundData.RotatableBondCount < 10 
                        ? "Moderate flexibility - Good drug-like properties" 
                        : "Highly flexible - May have conformational challenges"}
                    </p>
                  </div>
                  <div className="rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Molecular Complexity
                      </span>
                      <span className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                        {compoundData.Complexity.toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {compoundData.Complexity < 200 
                        ? "Simple structure - Easier to synthesize" 
                        : compoundData.Complexity < 500 
                        ? "Moderate complexity - Typical drug-like structure" 
                        : "Complex structure - Challenging synthesis"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Research Notes */}
              <div className="space-y-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 p-6 shadow-md dark:from-purple-900/20 dark:to-pink-900/20">
                <h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
                  🔬 Overall Behavior
                </h2>
                <div className="space-y-2">
                  <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-800/70">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <strong>BBB Permeability:</strong> {compoundData.TPSA < 60 ? "Likely" : "Unlikely"} to cross blood-brain barrier
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-800/70">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <strong>Oral Bioavailability:</strong> {
                        [
                          compoundData.MolecularWeight <= 500,
                          compoundData.XLogP <= 5,
                          compoundData.HBondDonorCount <= 5,
                          compoundData.HBondAcceptorCount <= 10,
                          compoundData.TPSA < 140
                        ].filter(Boolean).length >= 4 ? "Expected to be good" : "May be limited"
                      }
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-800/70">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <strong>Protein Binding:</strong> {compoundData.XLogP > 3 ? "Likely high protein binding" : "Moderate to low protein binding"}
                    </p>
                  </div>
                  <div className="rounded-lg bg-white/70 p-3 dark:bg-gray-800/70">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      <strong>Metabolic Stability:</strong> {compoundData.RotatableBondCount < 5 ? "Expected to be stable" : "May undergo extensive metabolism"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
}

export default PubChem;