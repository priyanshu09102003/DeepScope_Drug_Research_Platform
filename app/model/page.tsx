"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  createMoleculeGenerationHistory,
  getMoleculeGenerationHistoryByUser,
} from "../lib/actions/molecule-generation.action";
import DefaultLayout from "../components/Layout/DefaultLayout";
import MoleculeStructure from "../components/MoleculeStructure";
import { getUserByEmail } from "../lib/actions/user.actions";
import ComponentHeader from "../components/ComponentHeader/ComponentHeader";

const ModalLayout = () => {
  const { data: session } = useSession();
  const [smiles, setSmiles] = useState(
    "CCN(CC)C(=O)[C@@]1(C)Nc2c(ccc3ccccc23)C[C@H]1N(C)C",
  );
  const [numMolecules, setNumMolecules] = useState("10");
  const [minSimilarity, setMinSimilarity] = useState("0.3");
  const [particles, setParticles] = useState("30");
  const [iterations, setIterations] = useState("10");
  const [molecules, setMolecules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const user = await getUserByEmail(session.user.email);
          setUserId(user._id);
          const historyFromServer = await getMoleculeGenerationHistoryByUser(
            user._id,
          );
          setHistory(historyFromServer);
        } catch (error) {
          console.error("Error fetching user or history:", error);
        }
      }
    };

    fetchUserData();
  }, [session?.user?.email]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      algorithm: "CMA-ES",
      num_molecules: parseInt(numMolecules),
      property_name: "QED",
      minimize: false,
      min_similarity: parseFloat(minSimilarity),
      particles: parseInt(particles),
      iterations: parseInt(iterations),
      smi: smiles,
    };

    try {
      // Call your Next.js API route instead of calling NVIDIA directly
      const response = await fetch("/api/generate-molecules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      console.log("Raw API response:", data); // DEBUG LOG
      
      // Parse the molecules from the API response
      let generatedMolecules;
      if (typeof data.molecules === 'string') {
        const parsedMolecules = JSON.parse(data.molecules);
        console.log("Parsed molecules:", parsedMolecules); // DEBUG LOG
        generatedMolecules = parsedMolecules.map((mol: any) => ({
          structure: mol.sample,
          score: parseFloat(mol.score) || 0,
        }));
      } else if (Array.isArray(data.molecules)) {
        console.log("Molecules array:", data.molecules); // DEBUG LOG
        generatedMolecules = data.molecules.map((mol: any) => ({
          structure: mol.sample || mol.structure,
          score: parseFloat(mol.score) || 0,
        }));
      } else {
        throw new Error("Invalid molecules data format");
      }

      console.log("Generated molecules with scores:", generatedMolecules); // DEBUG LOG
      setMolecules(generatedMolecules);

      // Save to database if user is logged in
      if (userId) {
        try {
          await createMoleculeGenerationHistory(
            {
              smiles,
              numMolecules: parseInt(numMolecules),
              minSimilarity: parseFloat(minSimilarity),
              particles: parseInt(particles),
              iterations: parseInt(iterations),
              generatedMolecules,
            },
            userId,
          );

          // Refresh history
          const updatedHistory = await getMoleculeGenerationHistoryByUser(userId);
          setHistory(updatedHistory);
        } catch (dbError) {
          console.error("Error saving to database:", dbError);
          // Don't throw - still show results even if DB save fails
        }
      } else {
        console.warn("User ID is not available. Results will not be saved.");
      }
    } catch (error: any) {
      console.error("Error fetching data:", error);
      setError(error.message || "Failed to generate molecules. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <ComponentHeader 
        pageName="Model Generator" 
        containActionButton={false}
        showBreadcrumb={true}
        breadcrumbItems={[
          { label: "Model" }
        ]}
      />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-3">
        <div className="flex flex-col gap-9 sm:col-span-2">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <div className="border-b border-stroke px-7 py-5 dark:border-strokedark">
              <h3 className="text-xl font-bold text-black dark:text-white">
                🧬 SMILES to Molecule Generator
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Deep dive into molecular modelling hub with optimized molecule generation
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-7">
                {error && (
                  <div className="mb-6 rounded-lg border border-red-500 bg-red-50 p-4 dark:bg-red-900/20">
                    <div className="flex items-start">
                      <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="ml-3">
                        <h3 className="text-sm font-bold text-red-800 dark:text-red-200">Error</h3>
                        <p className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mb-6 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                      SMILES String <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={smiles}
                      onChange={(e) => setSmiles(e.target.value)}
                      placeholder="Enter SMILES string"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3.5 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                      Number of Molecules <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={numMolecules}
                      onChange={(e) => setNumMolecules(e.target.value)}
                      placeholder="Enter number of molecules"
                      className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3.5 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                    Minimum Similarity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={minSimilarity}
                    onChange={(e) => setMinSimilarity(e.target.value)}
                    placeholder="Enter minimum similarity (0-1)"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3.5 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                    Particles <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={particles}
                    onChange={(e) => setParticles(e.target.value)}
                    placeholder="Enter number of particles"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3.5 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-3 block text-sm font-bold text-black dark:text-white">
                    Iterations <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={iterations}
                    onChange={(e) => setIterations(e.target.value)}
                    placeholder="Enter number of iterations"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3.5 text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 active:border-primary dark:border-gray-2 dark:bg-[#181818] dark:text-white dark:focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full justify-center rounded-lg bg-primary p-4 font-bold text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg className="mr-3 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Modelling Structure...
                    </>
                  ) : (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Model Structure
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-lg border border-stroke bg-white shadow-default dark:border-[#121212] dark:bg-[#181818]">
            <div className="border-b border-stroke px-6 py-5 dark:border-strokedark">
              <h3 className="text-lg font-bold text-black dark:text-white">
                📋 Generation History
              </h3>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recent molecule generations
              </p>
            </div>
            <div className="p-5">
              <div className="max-h-96 overflow-y-auto">
                {history.length > 0 ? (
                  history.map((entry: any, index) => (
                    <div key={index} className="mb-4 rounded-lg border border-stroke bg-gray-50 p-4 last:mb-0 dark:border-gray-2 dark:bg-[#1a1a1a]">
                      <p className="mb-2 text-sm text-black dark:text-white">
                        <span className="font-bold">SMILES:</span>
                        <br />
                        <span className="mt-1 inline-block rounded bg-gray-200 px-2 py-1 font-mono text-xs dark:bg-gray-700">
                          {entry.smiles.substring(0, 30)}...
                        </span>
                      </p>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">
                          <span className="font-bold text-black dark:text-white">Molecules:</span> {entry.numMolecules}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(entry.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        className="mt-2 w-full rounded-lg bg-primary/10 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/20 cursor-pointer"
                        onClick={() => setMolecules(entry.generatedMolecules)}
                      >
                        View Results →
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                      No generation history yet
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {molecules.length > 0 && (
        <div className="mt-9 rounded-lg border border-stroke bg-white p-6 shadow-default dark:border-[#121212] dark:bg-[#181818]">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              ✨ Generated Molecules
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {molecules.length} molecules generated successfully
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {molecules.map((mol: any, index) => (
              <MoleculeStructure
                key={index}
                id={`mol-${index + 1}`}
                structure={mol.structure}
                score={mol.score}
              />
            ))}
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ModalLayout;