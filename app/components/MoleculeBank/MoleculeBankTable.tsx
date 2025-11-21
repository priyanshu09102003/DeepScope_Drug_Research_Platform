"use client";
import React, { useState, useEffect } from "react";
import MoleculeStructure from "../MoleculeStructure/index";

const moleculeBank = [
  {
    moleculeName: "Aspirin",
    smilesStructure: "CC(=O)OC1=CC=CC=C1C(O)=O",
    molecularWeight: 180.16,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Caffeine",
    smilesStructure: "CN1C=NC2=C1C(=O)N(C(=O)N2C)C",
    molecularWeight: 194.19,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Benzene",
    smilesStructure: "C1=CC=CC=C1",
    molecularWeight: 78.11,
    categoryUsage: "Industrial solvent",
  },
  {
    moleculeName: "Glucose",
    smilesStructure: "C(C1C(C(C(C(O1)O)O)O)O)O",
    molecularWeight: 180.16,
    categoryUsage: "Energy source/sugar",
  },
  {
    moleculeName: "Penicillin",
    smilesStructure: "CC1(C2C(C(C(O2)N1C(=O)COC(=O)C)C)S)C=O",
    molecularWeight: 334.39,
    categoryUsage: "Antibiotic",
  },
  {
    moleculeName: "Ibuprofen",
    smilesStructure: "CC(C)CC1=CC=C(C=C1)C(C)C(=O)O",
    molecularWeight: 206.28,
    categoryUsage: "Pain reliever/NSAID",
  },
  {
    moleculeName: "Acetaminophen",
    smilesStructure: "CC(=O)NC1=CC=C(O)C=C1",
    molecularWeight: 151.16,
    categoryUsage: "Pain reliever/Antipyretic",
  },
  {
    moleculeName: "Morphine",
    smilesStructure: "CN1CCC23C4C1CC(C2C3O)OC5=CC=CC=C45",
    molecularWeight: 285.34,
    categoryUsage: "Pain reliever/Opiate",
  },
  {
    moleculeName: "Nicotine",
    smilesStructure: "CN1CCCC1C2=CN=CC=C2",
    molecularWeight: 162.23,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Ethanol",
    smilesStructure: "CCO",
    molecularWeight: 46.07,
    categoryUsage: "Alcohol/Disinfectant",
  },
  {
    moleculeName: "Dopamine",
    smilesStructure: "NCCC1=CC(O)=C(O)C=C1",
    molecularWeight: 153.18,
    categoryUsage: "Neurotransmitter",
  },
  {
    moleculeName: "Serotonin",
    smilesStructure: "NCCC1=CNC2=C1C=C(O)C=C2",
    molecularWeight: 176.22,
    categoryUsage: "Neurotransmitter",
  },
  {
    moleculeName: "Adrenaline",
    smilesStructure: "CNCC(O)C1=CC(O)=C(O)C=C1",
    molecularWeight: 183.20,
    categoryUsage: "Hormone/Neurotransmitter",
  },
  {
    moleculeName: "Melatonin",
    smilesStructure: "CC(=O)NCCC1=CNC2=C1C=C(OC)C=C2",
    molecularWeight: 232.28,
    categoryUsage: "Sleep hormone",
  },
  {
    moleculeName: "Testosterone",
    smilesStructure: "CC12CCC3C(C1CCC2O)CCC4=CC(=O)CCC34C",
    molecularWeight: 288.42,
    categoryUsage: "Hormone/Steroid",
  },
  {
    moleculeName: "Estradiol",
    smilesStructure: "CC12CCC3C(C1CCC2O)CCC4=C3C=CC(O)=C4",
    molecularWeight: 272.38,
    categoryUsage: "Hormone/Estrogen",
  },
  {
    moleculeName: "Cholesterol",
    smilesStructure: "CC(C)CCCC(C)C1CCC2C1(CCC3C2CC=C4C3(CCC(C4)O)C)C",
    molecularWeight: 386.65,
    categoryUsage: "Lipid/Cell membrane",
  },
  {
    moleculeName: "Cortisol",
    smilesStructure: "CC12CCC(=O)C=C1CCC3C2C(O)CC4(C3CCC4(O)C(=O)CO)C",
    molecularWeight: 362.46,
    categoryUsage: "Stress hormone",
  },
  {
    moleculeName: "Insulin (simplified)",
    smilesStructure: "CC(C)C1NC(=O)C(CC2=CC=CC=C2)NC(=O)C(CO)NC(=O)C(CC3=CC=CC=C3)NC1=O",
    molecularWeight: 5808.00,
    categoryUsage: "Hormone/Blood sugar regulation",
  },
  {
    moleculeName: "Vitamin C",
    smilesStructure: "OCC(O)C1OC(=O)C(O)=C1O",
    molecularWeight: 176.12,
    categoryUsage: "Vitamin/Antioxidant",
  },
  {
    moleculeName: "Vitamin D3",
    smilesStructure: "CC(C)CCCC(C)C1CCC2C1(CCCC2=CC=C3CC(O)CCC3=C)C",
    molecularWeight: 384.64,
    categoryUsage: "Vitamin/Bone health",
  },
  {
    moleculeName: "Retinol (Vitamin A)",
    smilesStructure: "CC1=C(C(CCC1)(C)C)C=CC(=CC=CC(=CCO)C)C",
    molecularWeight: 286.45,
    categoryUsage: "Vitamin/Vision",
  },
  {
    moleculeName: "THC",
    smilesStructure: "CCCCCC1=CC(=C2C3C=C(CCC3C(OC2=C1)(C)C)C)O",
    molecularWeight: 314.46,
    categoryUsage: "Cannabinoid/Psychoactive",
  },
  {
    moleculeName: "CBD",
    smilesStructure: "CCCCCC1=CC(=C(C(=C1)O)C2C=C(CCC2C(=C)C)C)O",
    morphWeight: 314.46,
    categoryUsage: "Cannabinoid/Therapeutic",
  },
  {
    moleculeName: "Codeine",
    smilesStructure: "COC1=C2C3=C(C=C1)C4C5CC(C3CC2OC4)N5C",
    molecularWeight: 299.36,
    categoryUsage: "Pain reliever/Opiate",
  },
  {
    moleculeName: "Cocaine",
    smilesStructure: "COC(=O)C1C(CC2CCC1N2C)OC(=O)C3=CC=CC=C3",
    molecularWeight: 303.35,
    categoryUsage: "Stimulant/Anesthetic",
  },
  {
    moleculeName: "LSD",
    smilesStructure: "CCN(CC)C(=O)C1CN(C2CC3=CNC4=CC=CC(=C34)C2=C1)C",
    molecularWeight: 323.43,
    categoryUsage: "Hallucinogen",
  },
  {
    moleculeName: "MDMA",
    smilesStructure: "CC(CC1=CC2=C(C=C1)OCO2)NC",
    molecularWeight: 193.25,
    categoryUsage: "Stimulant/Empathogen",
  },
  {
    moleculeName: "Amphetamine",
    smilesStructure: "CC(CC1=CC=CC=C1)N",
    molecularWeight: 135.21,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Methamphetamine",
    smilesStructure: "CC(CC1=CC=CC=C1)NC",
    molecularWeight: 149.23,
    categoryUsage: "Stimulant",
  },
  {
    moleculeName: "Heroin",
    smilesStructure: "CC(=O)OC1C2C3=C(C=C1)C4C5CC(C3CC2OC(=O)C)N5CC4",
    molecularWeight: 369.41,
    categoryUsage: "Opiate/Pain reliever",
  },
  {
    moleculeName: "Fentanyl",
    smilesStructure: "CCC(=O)N(C1CCN(CC1)CCC2=CC=CC=C2)C3=CC=CC=C3",
    molecularWeight: 336.47,
    categoryUsage: "Opiate/Pain reliever",
  },
  {
    moleculeName: "Diazepam",
    smilesStructure: "CN1C(=O)CN=C(C2=C1C=CC(=C2)Cl)C3=CC=CC=C3",
    molecularWeight: 284.74,
    categoryUsage: "Benzodiazepine/Anxiolytic",
  },
  {
    moleculeName: "Alprazolam",
    smilesStructure: "CC1=NN=C2CN=C(C3=C2C=CC(=C3)Cl)C4=CC=CC=C41",
    molecularWeight: 308.76,
    categoryUsage: "Benzodiazepine/Anxiolytic",
  },
  {
    moleculeName: "Prozac (Fluoxetine)",
    smilesStructure: "CNCCC(OC1=CC=C(C=C1)C(F)(F)F)C2=CC=CC=C2",
    molecularWeight: 309.33,
    categoryUsage: "Antidepressant/SSRI",
  },
  {
    moleculeName: "Viagra (Sildenafil)",
    smilesStructure: "CCCC1=NN(C2=C1NC(=NC2=O)C3=C(C=CC(=C3)S(=O)(=O)N4CCN(CC4)C)OCC)C",
    molecularWeight: 474.58,
    categoryUsage: "ED treatment/PDE5 inhibitor",
  },
  {
    moleculeName: "Warfarin",
    smilesStructure: "CC(=O)CC(C1=CC=CC=C1)C2=C(O)C3=CC=CC=C3OC2=O",
    molecularWeight: 308.33,
    categoryUsage: "Anticoagulant",
  },
  {
    moleculeName: "Atorvastatin",
    smilesStructure: "CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4",
    molecularWeight: 558.64,
    categoryUsage: "Statin/Cholesterol lowering",
  },
  {
    moleculeName: "Metformin",
    smilesStructure: "CN(C)C(=N)NC(=N)N",
    molecularWeight: 129.16,
    categoryUsage: "Antidiabetic",
  },
  {
    moleculeName: "Omeprazole",
    smilesStructure: "COC1=CC2=C(C=C1)N=C(N2)S(=O)CC3=NC=C(C(=C3C)OC)C",
    molecularWeight: 345.42,
    categoryUsage: "Proton pump inhibitor",
  },
  // Add these additional molecules to your moleculeBank array:

  // Antibiotics & Antimicrobials
  // Add these additional molecules to your moleculeBank array:

  // Antibiotics & Antimicrobials
  {
    moleculeName: "Amoxicillin",
    smilesStructure: "CC1(C)SC2C(NC(=O)C(N)C3=CC=C(O)C=C3)C(=O)N2C1C(=O)O",
    molecularWeight: 365.40,
    categoryUsage: "Antibiotic/Penicillin",
  },
  {
    moleculeName: "Ciprofloxacin",
    smilesStructure: "C1CC1N2C=C(C(=O)C3=CC(=C(C=C32)N4CCNCC4)F)C(=O)O",
    molecularWeight: 331.34,
    categoryUsage: "Antibiotic/Fluoroquinolone",
  },
  {
    moleculeName: "Azithromycin",
    smilesStructure: "CCC1C(C(C(C(O1)OC2C(C(C(C(O2)C)OC3CC(C(C(O3)C)O)(C)OC)N(C)C)O)C)OC4C(C(C(C(O4)C)OC)N(C)C)O)(C)O",
    molecularWeight: 748.98,
    categoryUsage: "Antibiotic/Macrolide",
  },
  {
    moleculeName: "Doxycycline",
    smilesStructure: "CC1C2C(C3C(C(=O)C(=C(C3(C(=O)C2=C(C4=C1C=CC=C4O)O)O)O)C(=O)N)N(C)C)O",
    molecularWeight: 444.43,
    categoryUsage: "Antibiotic/Tetracycline",
  },
  {
    moleculeName: "Vancomycin",
    smilesStructure: "CC1C(C(CC(O1)OC2C(CC(OC2OC3=C4C=C5C=C3OC6=C(C=C(C=C6)C(C(C(=O)NC(C(=O)NC5C(=O)NC7C8=CC(=C(C=C8)O)C9=C(C=C(C=C9O)O)C(NC(=O)C(C(C1=CC(=C(O4)C=C1)Cl)O)NC7=O)C(=O)O)CC(=O)N)NC(=O)C(CC(C)C)NC)O)Cl)CO)O)O)N",
    molecularWeight: 1449.25,
    categoryUsage: "Antibiotic/Glycopeptide",
  },

  // Antivirals
  {
    moleculeName: "Acyclovir",
    smilesStructure: "C1=NC2=C(N1COCCO)N=C(NC2=O)N",
    molecularWeight: 225.20,
    categoryUsage: "Antiviral/Herpes",
  },
  {
    moleculeName: "Oseltamivir (Tamiflu)",
    smilesStructure: "CCOC(=O)C1=CC(OC(CC(=O)C(C)C)C1NC(=O)C)N",
    molecularWeight: 312.40,
    categoryUsage: "Antiviral/Influenza",
  },
  {
    moleculeName: "Remdesivir",
    smilesStructure: "CCC(CC)COC(=O)C(C)NP(=O)(OCC1C(C(C(O1)N2C=CC(=NC2=O)N)O)O)OC3=CC=CC=C3",
    molecularWeight: 602.58,
    categoryUsage: "Antiviral/COVID-19",
  },

  // Chemotherapy & Cancer Drugs
  {
    moleculeName: "Paclitaxel (Taxol)",
    smilesStructure: "CC1=C2C(C(=O)C3(C(CC4C(C3C(C(C2(C)C)(CC1OC(=O)C(C(C5=CC=CC=C5)NC(=O)C6=CC=CC=C6)O)O)OC(=O)C7=CC=CC=C7)(CO4)OC(=O)C)O)C)OC(=O)C",
    molecularWeight: 853.91,
    categoryUsage: "Chemotherapy/Microtubule stabilizer",
  },
  {
    moleculeName: "Cisplatin",
    smilesStructure: "N.N.Cl[Pt]Cl",
    molecularWeight: 300.05,
    categoryUsage: "Chemotherapy/Platinum compound",
  },
  {
    moleculeName: "Methotrexate",
    smilesStructure: "CN(CC1=CN=C2C(=N1)C(=NC(=N2)N)N)C3=CC=C(C=C3)C(=O)NC(CCC(=O)O)C(=O)O",
    molecularWeight: 454.44,
    categoryUsage: "Chemotherapy/Antimetabolite",
  },
  {
    moleculeName: "Doxorubicin",
    smilesStructure: "CC1C(C(CC(O1)OC2CC(CC3=C2C(=C4C(=C3O)C(=O)C5=C(C4=O)C(=CC=C5)OC)O)(C(=O)CO)O)N)O",
    molecularWeight: 543.52,
    categoryUsage: "Chemotherapy/Anthracycline",
  },

  // Cardiovascular Drugs
  {
    moleculeName: "Aspirin",
    smilesStructure: "CC(=O)OC1=CC=CC=C1C(=O)O",
    molecularWeight: 180.16,
    categoryUsage: "Antiplatelet/NSAID",
  },
  {
    moleculeName: "Clopidogrel (Plavix)",
    smilesStructure: "COC(=O)C(C1=CC=CC=C1Cl)N2CC=C(C2)C3=CC=CS3",
    molecularWeight: 321.82,
    categoryUsage: "Antiplatelet",
  },
  {
    moleculeName: "Lisinopril",
    smilesStructure: "NCCCCC(NC(C(CCN)CCCCN)C(=O)O)C(=O)N1CCCC1C(=O)O",
    molecularWeight: 405.49,
    categoryUsage: "ACE inhibitor/Hypertension",
  },
  {
    moleculeName: "Amlodipine",
    smilesStructure: "CCOC(=O)C1=C(NC(=C(C1C2=CC=CC=C2Cl)C(=O)OC)C)COCCN",
    molecularWeight: 408.88,
    categoryUsage: "Calcium channel blocker",
  },
  {
    moleculeName: "Metoprolol",
    smilesStructure: "COC1=CC=C(C=C1)CCOC(C)CNC(C)C",
    molecularWeight: 267.36,
    categoryUsage: "Beta blocker",
  },
  {
    moleculeName: "Digoxin",
    smilesStructure: "CC1C(C(CC(O1)OC2CCC3(C(C2)CCC4C3CC(C5(C4CC(CC5)O)C)O)C)O)OC6CC(C(C(O6)C)O)O",
    molecularWeight: 780.94,
    categoryUsage: "Cardiac glycoside",
  },

  // Diabetes Medications
  {
    moleculeName: "Insulin Glargine",
    smilesStructure: "CC(C)C1NC(=O)C(CC2=CC=CC=C2)NC(=O)C(CO)NC(=O)C(CC3=CC=CC=C3)NC1=O",
    molecularWeight: 6063.00,
    categoryUsage: "Long-acting insulin",
  },
  {
    moleculeName: "Sitagliptin (Januvia)",
    smilesStructure: "C1CN2C(=NN=C2C(F)(F)F)CN1C(=O)CC(CC3=CC(=C(C=C3F)F)F)N",
    molecularWeight: 407.31,
    categoryUsage: "DPP-4 inhibitor/Diabetes",
  },
  {
    moleculeName: "Empagliflozin",
    smilesStructure: "C1=CC(=CC=C1CC2=CC=C(C=C2)Cl)COC3C(C(C(C(O3)CO)O)O)OC4C(C(C(C(O4)CO)O)O)O",
    molecularWeight: 450.91,
    categoryUsage: "SGLT2 inhibitor/Diabetes",
  },

  // Psychiatric Medications
  {
    moleculeName: "Sertraline (Zoloft)",
    smilesStructure: "CNC1CCC(C2=C1C=C(C=C2)Cl)C3=CC=C(C=C3)Cl",
    molecularWeight: 306.23,
    categoryUsage: "Antidepressant/SSRI",
  },
  {
    moleculeName: "Escitalopram (Lexapro)",
    smilesStructure: "CN(C)CCCC1(C2=C(CO1)C=CC(=C2)C#N)C3=CC=C(C=C3)F",
    molecularWeight: 324.39,
    categoryUsage: "Antidepressant/SSRI",
  },
  {
    moleculeName: "Lithium Carbonate",
    smilesStructure: "[Li+].[Li+].[O-]C([O-])=O",
    molecularWeight: 73.89,
    categoryUsage: "Mood stabilizer/Bipolar",
  },
  {
    moleculeName: "Quetiapine (Seroquel)",
    smilesStructure: "C1CN(CCN1CCOCCO)C2=NC3=CC=CC=C3SC4=CC=CC=C42",
    molecularWeight: 383.51,
    categoryUsage: "Antipsychotic",
  },
  {
    moleculeName: "Aripiprazole (Abilify)",
    smilesStructure: "C1CC(=O)NC2=C1C=CC(=C2)OCCCCN3CCN(CC3)C4=C(C(=CC=C4)Cl)Cl",
    molecularWeight: 448.39,
    categoryUsage: "Antipsychotic",
  },
  {
    moleculeName: "Venlafaxine (Effexor)",
    smilesStructure: "COC1=CC=C(C=C1)C(CN(C)C)C2(CCCCC2)O",
    molecularWeight: 277.40,
    categoryUsage: "Antidepressant/SNRI",
  },

  // Pain Management
  {
    moleculeName: "Tramadol",
    smilesStructure: "COC1=CC=CC=C1C2(CCCCC2)CN(C)C",
    molecularWeight: 263.37,
    categoryUsage: "Pain reliever/Opioid-like",
  },
  {
    moleculeName: "Oxycodone",
    smilesStructure: "COC1=C2C3CC4C5CCC(O5)C(C4CC3CC(C2=C(C=C1)O)OC(=O)C)N(C)C",
    molecularWeight: 315.36,
    categoryUsage: "Pain reliever/Opioid",
  },
  {
    moleculeName: "Hydrocodone",
    smilesStructure: "CN1CCC23C4C1CC(C2CCC(=O)C3)OC5=C4C=CC(=C5)OC",
    molecularWeight: 299.36,
    categoryUsage: "Pain reliever/Opioid",
  },
  {
    moleculeName: "Gabapentin",
    smilesStructure: "NCC1(CC(=O)O)CCCCC1",
    molecularWeight: 171.24,
    categoryUsage: "Anticonvulsant/Neuropathic pain",
  },
  {
    moleculeName: "Pregabalin (Lyrica)",
    smilesStructure: "CC(C)CC(CC(=O)O)CN",
    molecularWeight: 159.23,
    categoryUsage: "Anticonvulsant/Neuropathic pain",
  },

  // Immunosuppressants
  {
    moleculeName: "Cyclosporine",
    smilesStructure: "CCC(C)C(C(=O)N1CCCC1C(=O)NC(C(C)C(C)C)C(=O)N2CCCC2C(=O)NC(C)C(=O)NC(CC(C)C)C(=O)NC(C(C)C)C(=O)N(C)C(CC3=CC=CC=C3)C(=O)N(C)C(CC(C)C)C(=O)NC(C)C(=O)NC(C)C(=O)N(C)C(CC(C)C)C(=O)N(C)C(CC4=CC=CC=C4)C(=O)O)NC(=O)C(C(C)C(C)C)NC(=O)C(C(C)C)N(C)C(=O)CC(C)C(C)C",
    molecularWeight: 1202.61,
    categoryUsage: "Immunosuppressant",
  },
  {
    moleculeName: "Tacrolimus",
    smilesStructure: "CC1CCC(CC(C(=O)C(C(OC(CC(C(=O)C(C(C1O)C)OC)C)CC=CC(=CC(=CC2CCC(C(C2)OC)O)C)C)C)C)C)OC",
    molecularWeight: 804.02,
    categoryUsage: "Immunosuppressant",
  },

  // Antihistamines
  {
    moleculeName: "Diphenhydramine (Benadryl)",
    smilesStructure: "CN(C)CCOC(C1=CC=CC=C1)C2=CC=CC=C2",
    molecularWeight: 255.35,
    categoryUsage: "Antihistamine/Sleep aid",
  },
  {
  moleculeName: "Loratadine (Claritin)",
  smilesStructure: "CCOC(=O)N1CCC(=C2C3=C(CCC4=C2N=CC=C4)C=C(C=C3)Cl)CC1",
  molecularWeight: 382.88,
  categoryUsage: "Antihistamine",
  },
  {
    moleculeName: "Cetirizine (Zyrtec)",
    smilesStructure: "C1CN(CCN1CCOCC(=O)O)C(C2=CC=CC=C2)C3=CC=C(C=C3)Cl",
    molecularWeight: 388.89,
    categoryUsage: "Antihistamine",
  },
  {
    moleculeName: "Fexofenadine (Allegra)",
    smilesStructure: "CC(C)(C(=O)O)C1=CC=C(C=C1)C(CCCN2CCC(CC2)C(C3=CC=CC=C3)(C4=CC=CC=C4)O)O",
    molecularWeight: 501.66,
    categoryUsage: "Antihistamine",
  },

  // Hormones & Endocrine
  {
    moleculeName: "Levothyroxine (Synthroid)",
    smilesStructure: "C1=CC(=CC=C1CC(C(=O)O)N)OC2=CC(=C(C(=C2)I)OC3=CC=C(C=C3)O)I",
    molecularWeight: 776.87,
    categoryUsage: "Thyroid hormone",
  },
  {
    moleculeName: "Prednisone",
    smilesStructure: "CC12CC(C3C(C1CCC2(C(=O)CO)O)CCC4=CC(=O)C=CC34C)O",
    molecularWeight: 358.43,
    categoryUsage: "Corticosteroid/Anti-inflammatory",
  },
  {
    moleculeName: "Dexamethasone",
    smilesStructure: "CC1CC2C3CCC4=CC(=O)C=CC4(C3(C(CC2(C1(C(=O)CO)O)C)O)F)C",
    molecularWeight: 392.46,
    categoryUsage: "Corticosteroid",
  },

  // Respiratory Medications
  {
    moleculeName: "Albuterol (Salbutamol)",
    smilesStructure: "CC(C)(C)NCC(C1=CC(=C(C=C1)O)CO)O",
    molecularWeight: 239.31,
    categoryUsage: "Bronchodilator/Asthma",
  },
  {
    moleculeName: "Montelukast (Singulair)",
    smilesStructure: "CC(C1=CC=CC=C1Cl)SCC2(CC(=O)N(C2)CC3=CC=C(C=C3)C(=O)O)C4=CC=CC=C4",
    molecularWeight: 586.18,
    categoryUsage: "Leukotriene inhibitor/Asthma",
  },

  // Antibiotics (Additional)
  {
    moleculeName: "Levofloxacin",
    smilesStructure: "CC1COC2=C3N1C=C(C(=O)C3=CC(=C2N4CCN(CC4)C)F)C(=O)O",
    molecularWeight: 361.37,
    categoryUsage: "Antibiotic/Fluoroquinolone",
  },
  {
    moleculeName: "Cephalexin",
    smilesStructure: "CC1=C(N2C(C(C2=O)NC(=O)C(C3=CC=CC=C3)N)SC1)C(=O)O",
    molecularWeight: 347.39,
    categoryUsage: "Antibiotic/Cephalosporin",
  },

  // Natural Products & Supplements
  {
    moleculeName: "Curcumin",
    smilesStructure: "COC1=C(C=CC(=C1)C=CC(=O)CC(=O)C=CC2=CC(=C(C=C2)O)OC)O",
    molecularWeight: 368.38,
    categoryUsage: "Natural anti-inflammatory",
  },
  {
    moleculeName: "Resveratrol",
    smilesStructure: "C1=CC(=CC=C1C=CC2=CC(=CC(=C2)O)O)O",
    molecularWeight: 228.24,
    categoryUsage: "Antioxidant/Polyphenol",
  },
  {
    moleculeName: "Quercetin",
    smilesStructure: "C1=CC(=C(C=C1C2=C(C(=O)C3=C(C=C(C=C3O2)O)O)O)O)O",
    molecularWeight: 302.24,
    categoryUsage: "Antioxidant/Flavonoid",
  },

  // Anesthetics
  {
    moleculeName: "Propofol",
    smilesStructure: "CC(C)C1=CC(=C(C(=C1)C(C)C)O)C(C)C",
    molecularWeight: 178.27,
    categoryUsage: "General anesthetic",
  },
  {
    moleculeName: "Lidocaine",
    smilesStructure: "CCN(CC)CC(=O)NC1=C(C=CC=C1C)C",
    molecularWeight: 234.34,
    categoryUsage: "Local anesthetic",
  },
  {
    moleculeName: "Ketamine",
    smilesStructure: "CNC1(CCCCC1=O)C2=CC=CC=C2Cl",
    molecularWeight: 237.73,
    categoryUsage: "Anesthetic/Antidepressant",
  },
  {
    moleculeName: "Bupivacaine",
    smilesStructure: "CCCCN1CCCCC1C(=O)NC2=C(C=CC=C2C)C",
    molecularWeight: 288.43,
    categoryUsage: "Local anesthetic",
  },

  // Anticoagulants & Antiplatelets
  {
    moleculeName: "Heparin (simplified)",
    smilesStructure: "CC(=O)NC1C(C(C(OC1O)COS(=O)(=O)O)OC2C(C(C(C(O2)C(=O)O)OC3C(C(C(C(O3)COS(=O)(=O)O)O)OS(=O)(=O)O)O)O)NS(=O)(=O)O)OS(=O)(=O)O",
    molecularWeight: 12000.00,
    categoryUsage: "Anticoagulant",
  },
  {
    moleculeName: "Rivaroxaban (Xarelto)",
    smilesStructure: "C1CN(CCN1C(=O)C2=CC=C(S2)NC(=O)C3=CC=C(C=C3)N4CCCCC4=O)C5=NC=C(C=C5)Cl",
    molecularWeight: 435.88,
    categoryUsage: "Anticoagulant/Factor Xa inhibitor",
  },
  {
    moleculeName: "Apixaban (Eliquis)",
    smilesStructure: "COC1=CC=C(C=C1)N2C=C(C(=N2)N3CCN(CC3)C(=O)C4=CC=C(C=C4)N5CCCCC5=O)C(=O)N",
    molecularWeight: 459.50,
    categoryUsage: "Anticoagulant/Factor Xa inhibitor",
  },
  {
    moleculeName: "Dabigatran",
    smilesStructure: "CCCCCCOC(=O)N1CCN(CC1)C2=NC(=NC3=CC=CC=C32)C(=O)NC4=CC=C(C=C4)C(=N)N",
    molecularWeight: 471.52,
    categoryUsage: "Anticoagulant/Thrombin inhibitor",
  },

  // Antiparasitic & Antifungal

  {
    moleculeName: "Fluconazole (Diflucan)",
    smilesStructure: "C1=CC=C(C=C1)C(CN2C=NC=N2)(CN3C=NC=N3)O",
    molecularWeight: 306.27,
    categoryUsage: "Antifungal/Azole",
  },
  {
    moleculeName: "Terbinafine (Lamisil)",
    smilesStructure: "CN(C)CC#CC(C)(C)CC=CC1=CC=CC2=CC=CC=C21",
    molecularWeight: 291.43,
    categoryUsage: "Antifungal",
  },
  {
    moleculeName: "Clotrimazole",
    smilesStructure: "C1=CC=C(C=C1)C(C2=CC=CC=C2)(C3=CC=CC=C3Cl)N4C=CN=C4",
    molecularWeight: 344.84,
    categoryUsage: "Antifungal/Topical",
  },

  // Antiemetics & GI Drugs
  {
    moleculeName: "Ondansetron (Zofran)",
    smilesStructure: "CC1=NC=CN1CC2CCC3=C(C2)C4=CC=CC=C4N3C",
    molecularWeight: 293.36,
    categoryUsage: "Antiemetic/5-HT3 antagonist",
  },
  {
    moleculeName: "Metoclopramide (Reglan)",
    smilesStructure: "CCN(CC)CCNC(=O)C1=CC(=C(C=C1N)OC)Cl",
    molecularWeight: 299.80,
    categoryUsage: "Antiemetic/Prokinetic",
  },
  {
    moleculeName: "Lansoprazole",
    smilesStructure: "CC1=C(C=CN=C1CS(=O)C2=NC3=C(N2)C=CC(=C3)OCC(F)(F)F)OCC(F)(F)F",
    molecularWeight: 369.36,
    categoryUsage: "Proton pump inhibitor",
  },
  {
    moleculeName: "Pantoprazole",
    smilesStructure: "COC1=C(C=C(C=C1)OC)CS(=O)C2=NC3=C(N2)C=C(C=C3)OC(F)F",
    molecularWeight: 383.37,
    categoryUsage: "Proton pump inhibitor",
  },
  {
    moleculeName: "Famotidine (Pepcid)",
    smilesStructure: "C1=C(N=C(S1)N=CN)CSCCC(=NS(=O)(=O)N)N",
    molecularWeight: 337.45,
    categoryUsage: "H2 blocker/Acid reducer",
  },

  // Muscle Relaxants & Anticonvulsants
  {
    moleculeName: "Baclofen",
    smilesStructure: "C1=CC(=CC=C1C(CC(=O)O)N)Cl",
    molecularWeight: 213.66,
    categoryUsage: "Muscle relaxant",
  },
  {
    moleculeName: "Cyclobenzaprine",
    smilesStructure: "CN(C)CCC=C1C2=CC=CC=C2CCC3=CC=CC=C31",
    molecularWeight: 275.39,
    categoryUsage: "Muscle relaxant",
  },
  {
  moleculeName: "Carbamazepine (Tegretol)",
  smilesStructure: "C1=CC=C2C(=C1)C=CC3=CC=CC=C3N2C(=O)N",
  molecularWeight: 236.27,
  categoryUsage: "Anticonvulsant/Mood stabilizer",
  },
  {
    moleculeName: "Lamotrigine (Lamictal)",
    smilesStructure: "C1=CC(=CC=C1N)C2=NC(=NC(=N2)N)Cl",
    molecularWeight: 256.09,
    categoryUsage: "Anticonvulsant/Mood stabilizer",
  },
  {
    moleculeName: "Levetiracetam (Keppra)",
    smilesStructure: "CCC(C(=O)N)N1CCCC1=O",
    molecularWeight: 170.21,
    categoryUsage: "Anticonvulsant",
  },
  {
    moleculeName: "Valproic Acid (Depakote)",
    smilesStructure: "CCCC(CCC)C(=O)O",
    molecularWeight: 144.21,
    categoryUsage: "Anticonvulsant/Mood stabilizer",
  },
  {
    moleculeName: "Topiramate (Topamax)",
    smilesStructure: "CC1(C)OC2COC3(COS(=O)(=O)N)OC(C)(C)OC3C2OC1CN",
    molecularWeight: 339.36,
    categoryUsage: "Anticonvulsant/Migraine",
  },

  // Urological & ED Medications
  {
    moleculeName: "Tadalafil (Cialis)",
    smilesStructure: "CN1CC(=O)N2C(C1=O)CC3=C(C2C4=CC5=C(C=C4)OCO5)NC6=CC=CC=C36",
    molecularWeight: 389.40,
    categoryUsage: "ED treatment/PDE5 inhibitor",
  },
  {
    moleculeName: "Vardenafil (Levitra)",
    smilesStructure: "CCCC1=NC(=C2N1N=C(N=C2N3CCN(CC3)CC)C4=C(C=C(C=C4)S(=O)(=O)N5CCCC5)OCC)C",
    molecularWeight: 488.60,
    categoryUsage: "ED treatment/PDE5 inhibitor",
  },
  {
    moleculeName: "Finasteride (Propecia)",
    smilesStructure: "CC(C)(C)NC(=O)C1CCC2C1(CCC3C2CCC4=CC(=O)C=CC34C)C",
    molecularWeight: 372.55,
    categoryUsage: "Hair loss/BPH",
  },
  {
    moleculeName: "Tamsulosin (Flomax)",
    smilesStructure: "CCOC1=CC=C(C=C1)CCNC(C)CC2=CC=C(C=C2)OCC(C)C",
    molecularWeight: 408.51,
    categoryUsage: "BPH/Alpha blocker",
  },

  // Osteoporosis & Bone Health
  {
    moleculeName: "Alendronate (Fosamax)",
    smilesStructure: "NCCCC(O)(P(=O)(O)O)P(=O)(O)O",
    molecularWeight: 249.10,
    categoryUsage: "Bisphosphonate/Osteoporosis",
  },
  {
    moleculeName: "Raloxifene (Evista)",
    smilesStructure: "C1CN(CCN1CCO)C(=O)C2=CC=C(C=C2)C3=C(C4=CC=C(C=C4S3)O)C5=CC=C(C=C5)O",
    molecularWeight: 473.58,
    categoryUsage: "SERM/Osteoporosis",
  },
  {
    moleculeName: "Calcitonin",
    smilesStructure: "CC(C)CC1NC(=O)C(NC(=O)C(NC(=O)C(NC(=O)CNC1=O)CC(=O)N)C)CC(C)C",
    molecularWeight: 3431.89,
    categoryUsage: "Hormone/Osteoporosis",
  },

  // Migraine & Headache
  {
    moleculeName: "Sumatriptan (Imitrex)",
    smilesStructure: "CN(C)CCC1=CNC2=C1C=C(C=C2)CS(=O)(=O)N",
    molecularWeight: 295.40,
    categoryUsage: "Migraine/5-HT agonist",
  },
  {
    moleculeName: "Rizatriptan (Maxalt)",
    smilesStructure: "CN(C)CCC1=CNC2=C1C=CC(=N2)CN3CCNCC3",
    molecularWeight: 269.38,
    categoryUsage: "Migraine/Triptan",
  },
  {
    moleculeName: "Ergotamine",
    smilesStructure: "CN1CC(C2C1CC3=CNC4=CC=CC2=C34)C(=O)NC5(C(=O)N6CCCC6C(=O)O5)C(C)C",
    molecularWeight: 581.67,
    categoryUsage: "Migraine/Ergot alkaloid",
  },

  // Antiviral (HIV/AIDS)
  {
    moleculeName: "Zidovudine (AZT)",
    smilesStructure: "CC1=CN(C(=O)NC1=O)C2CC(C(O2)CO)N=[N+]=[N-]",
    molecularWeight: 267.24,
    categoryUsage: "Antiviral/HIV",
  },
  {
    moleculeName: "Tenofovir",
    smilesStructure: "CC(C)OC(=O)OCOP(=O)(CO[C@H]1C[C@@H](O[C@@H]1CO)N2C=NC3=C2N=CN=C3N)OC(=O)OC(C)C",
    molecularWeight: 635.52,
    categoryUsage: "Antiviral/HIV",
  },
  {
    moleculeName: "Efavirenz (Sustiva)",
    smilesStructure: "C1CC1C2=CC=C(C=C2)OC3=CC=C(C=C3)C4(C(=O)NC(=O)N4)C#CC(F)(F)F",
    molecularWeight: 315.67,
    categoryUsage: "Antiviral/HIV/NNRTI",
  },
  {
    moleculeName: "Emtricitabine",
    smilesStructure: "C1C(C(OC1N2C=C(C(=NC2=O)N)F)CO)O",
    molecularWeight: 247.24,
    categoryUsage: "Antiviral/HIV",
  },

  // Antimalarial
  {
    moleculeName: "Chloroquine",
    smilesStructure: "CCN(CC)CCCC(C)NC1=C2C=CC(=CC2=NC=C1)Cl",
    molecularWeight: 319.87,
    categoryUsage: "Antimalarial",
  },
  {
    moleculeName: "Hydroxychloroquine",
    smilesStructure: "CCN(CCO)CCCC(C)NC1=C2C=CC(=CC2=NC=C1)Cl",
    molecularWeight: 335.87,
    categoryUsage: "Antimalarial/Autoimmune",
  },
  {
    moleculeName: "Mefloquine",
    smilesStructure: "OC(C1CCCCN1)C2=CC(=NC3=C2C=C(C=C3)C(F)(F)F)C(F)(F)F",
    molecularWeight: 378.31,
    categoryUsage: "Antimalarial",
  },

  // Gout Medications
  {
    moleculeName: "Allopurinol",
    smilesStructure: "C1=NNC2=C1C(=O)NC=N2",
    molecularWeight: 136.11,
    categoryUsage: "Gout/Xanthine oxidase inhibitor",
  },
  {
    moleculeName: "Colchicine",
    smilesStructure: "COC1=CC2=C(C=C1OC)C(=O)CC(C2)NC(=O)C3=C(C=CC(=C3)OC)OC",
    molecularWeight: 399.44,
    categoryUsage: "Gout/Anti-inflammatory",
  },
  {
    moleculeName: "Febuxostat (Uloric)",
    smilesStructure: "CN1C=C(C(=N1)C#N)C2=CC=C(C=C2)SC3=CC=C(C=C3)C(=O)O",
    molecularWeight: 316.38,
    categoryUsage: "Gout/Xanthine oxidase inhibitor",
  },

  // Eye Medications
  {
    moleculeName: "Latanoprost",
    smilesStructure: "CCCCC(C)C(C)CC(=O)OC1CC(C=C1)C=CC2CCC(C2)O",
    molecularWeight: 432.58,
    categoryUsage: "Glaucoma/Prostaglandin",
  },
  {
    moleculeName: "Timolol",
    smilesStructure: "CC(C)(C)NCC(COC1=NSN=C1N2CCOCC2)O",
    molecularWeight: 316.42,
    categoryUsage: "Glaucoma/Beta blocker",
  },
  {
    moleculeName: "Brimonidine",
    smilesStructure: "C1CN=C(N1)NC2=C(C=CC=C2Br)Br",
    molecularWeight: 292.13,
    categoryUsage: "Glaucoma/Alpha agonist",
  },

  // Dermatology
  {
  moleculeName: "Tretinoin (Retin-A)",
  smilesStructure: "CC1=C(C(CCC1)(C)C)C=CC(=CC=CC(=CC(=O)O)C)C",
  molecularWeight: 300.44,
  categoryUsage: "Acne/Retinoid",
  },
  {
    moleculeName: "Isotretinoin (Accutane)",
    smilesStructure: "CC1=C(C(CCC1)(C)C)C=CC(=CC=CC(=CC(=O)O)C)C",
    molecularWeight: 300.44,
    categoryUsage: "Acne/Retinoid",
  },
  {
    moleculeName: "Benzoyl Peroxide",
    smilesStructure: "C1=CC=C(C=C1)C(=O)OOC(=O)C2=CC=CC=C2",
    molecularWeight: 242.23,
    categoryUsage: "Acne/Antibacterial",
  },
  {
    moleculeName: "Hydrocortisone",
    smilesStructure: "CC12CCC(C1CCC3C2CCC4(C3(CCC4(C(=O)CO)O)C)C)O",
    molecularWeight: 362.46,
    categoryUsage: "Corticosteroid/Anti-inflammatory",
  },

  // Miscellaneous Important Drugs
  {
    moleculeName: "Epinephrine",
    smilesStructure: "CNCC(C1=CC(=C(C=C1)O)O)O",
    molecularWeight: 183.20,
    categoryUsage: "Emergency/Anaphylaxis",
  },
  {
  moleculeName: "Naloxone (Narcan)",
  smilesStructure: "C=CCN1CCC23C4C(=O)CCC2(C1CC5=C3C(=C(C=C5)O)O4)O",
  molecularWeight: 327.37,  
  categoryUsage: "Opioid reversal",
  },
  {
    moleculeName: "Methylphenidate (Ritalin)",
    smilesStructure: "COC(=O)C(C1CCCCN1)C2=CC=CC=C2",
    molecularWeight: 233.31,
    categoryUsage: "ADHD/Stimulant",
  },
  {
    moleculeName: "Atomoxetine (Strattera)",
    smilesStructure: "CNCCC(C1=CC=CC=C1OC)O",
    molecularWeight: 255.36,
    categoryUsage: "ADHD/SNRI",
  },
  {
    moleculeName: "Modafinil (Provigil)",
    smilesStructure: "C1=CC=C(C=C1)C(=O)C(C2=CC=CS2)S(=O)C",
    molecularWeight: 273.35,
    categoryUsage: "Wakefulness/Narcolepsy",
  },

  // Antirheumatic & Immunomodulators
  {
  moleculeName: "Sulfasalazine",
  smilesStructure: "C1=CC(=CC=C1N=NC2=CC(=C(C=C2)O)S(=O)(=O)O)S(=O)(=O)NC3=NC=CC=C3",
  molecularWeight: 398.39,
  categoryUsage: "Antirheumatic/IBD",
  },
  {
    moleculeName: "Hydroxychloroquine Sulfate",
    smilesStructure: "CCN(CCO)CCCC(C)NC1=C2C=CC(=CC2=NC=C1)Cl",
    molecularWeight: 335.87,
    categoryUsage: "Antimalarial/Lupus/RA",
  },
  {
    moleculeName: "Leflunomide (Arava)",
    smilesStructure: "CC1=CC(=CC=C1)N2C(=O)C(=C(O2)C#N)C(F)(F)F",
    molecularWeight: 270.21,
    categoryUsage: "Antirheumatic/DMARD",
  },
  {
    moleculeName: "Adalimumab (Humira)",
    smilesStructure: "CC(C)CC(C(=O)NC(CC1=CC=CC=C1)C(=O)O)NC(=O)C(CC(C)C)NC(=O)C(CCC(=O)O)NC(=O)C",
    molecularWeight: 144190.00,
    categoryUsage: "Biologic/TNF inhibitor",
  },
  {
    moleculeName: "Infliximab (Remicade)",
    smilesStructure: "CC(C)CC(C(=O)NC(CCC(=O)O)C(=O)NC(CC(C)C)C(=O)O)NC(=O)C(C)NC(=O)C(CC(C)C)N",
    molecularWeight: 149100.00,
    categoryUsage: "Biologic/TNF inhibitor",
  },
  {
    moleculeName: "Etanercept (Enbrel)",
    smilesStructure: "CC(C)CC(C(=O)NC(CC1=CC=CC=C1)C(=O)NC(CCC(=O)N)C(=O)O)NC(=O)C(C(C)C)N",
    molecularWeight: 150000.00,
    categoryUsage: "Biologic/TNF inhibitor",
  },

  // Antitubercular
  {
    moleculeName: "Rifampin (Rifampicin)",
    smilesStructure: "CC1C=CC=C(C(=O)NC2=C(C(=C3C(=C2O)C(=C(C4=C3C(=O)C(O4)(OC=CC(C(C(C(C(C(C1O)C)O)C)OC(=O)C)C)OC)C)C)O)O)C=NN5CCN(CC5)C)O",
    molecularWeight: 822.94,
    categoryUsage: "Antitubercular/Antibiotic",
  },
  {
    moleculeName: "Isoniazid (INH)",
    smilesStructure: "C1=CN=CC=C1C(=O)NN",
    molecularWeight: 137.14,
    categoryUsage: "Antitubercular",
  },
  {
    moleculeName: "Pyrazinamide",
    smilesStructure: "C1=CN=C(C=N1)C(=O)N",
    molecularWeight: 123.11,
    categoryUsage: "Antitubercular",
  },
  {
    moleculeName: "Ethambutol",
    smilesStructure: "CCC(CO)NCCNC(CC)CO",
    molecularWeight: 204.31,
    categoryUsage: "Antitubercular",
  },

  // Antiarrhythmics
  {
    moleculeName: "Amiodarone (Cordarone)",
    smilesStructure: "CCCC1=C(C(=C(C(=C1I)C(=O)C2=CC=C(C=C2)OCCN(CC)CC)I)C3=CC=CC=C3)C",
    molecularWeight: 645.31,
    categoryUsage: "Antiarrhythmic/Class III",
  },
  {
    moleculeName: "Flecainide",
    smilesStructure: "FC(F)COC1=CC=C(C=C1OCC(F)F)C(=O)NCC2CCCCN2",
    molecularWeight: 414.35,
    categoryUsage: "Antiarrhythmic/Class IC",
  },
  {
    moleculeName: "Sotalol",
    smilesStructure: "CC(C)NCC(C1=CC=C(C=C1)NS(=O)(=O)C)O",
    molecularWeight: 272.36,
    categoryUsage: "Antiarrhythmic/Beta blocker",
  },
  {
    moleculeName: "Adenosine",
    smilesStructure: "C1=NC(=C2C(=N1)N(C=N2)C3C(C(C(O3)CO)O)O)N",
    molecularWeight: 267.24,
    categoryUsage: "Antiarrhythmic/Nucleoside",
  },

  // Diuretics
  {
    moleculeName: "Furosemide (Lasix)",
    smilesStructure: "C1=C(C=C(C(=C1Cl)S(=O)(=O)N)N)C(=O)O",
    molecularWeight: 330.74,
    categoryUsage: "Diuretic/Loop",
  },
  {
    moleculeName: "Hydrochlorothiazide (HCTZ)",
    smilesStructure: "C1=C2C(=CC(=C1)S(=O)(=O)N)S(=O)(=O)N=CN2",
    molecularWeight: 297.74,
    categoryUsage: "Diuretic/Thiazide",
  },
  {
    moleculeName: "Spironolactone",
    smilesStructure: "CC(=O)SC1CCC2(C1(CCC3C2CCC4=CC(=O)CCC34C)C)C",
    molecularWeight: 416.57,
    categoryUsage: "Diuretic/Potassium-sparing",
  },
  {
    moleculeName: "Bumetanide",
    smilesStructure: "CCCCNC1=C(C(=CC=C1)C(=O)O)S(=O)(=O)N",
    molecularWeight: 364.42,
    categoryUsage: "Diuretic/Loop",
  },

  // Antidiarrheal & Laxatives
  {
    moleculeName: "Loperamide (Imodium)",
    smilesStructure: "C1CN(CCC1C(C2=CC=C(C=C2)Cl)(C3=CC=CC=C3)O)CCC(C4=CC=CC=C4)(C5=CC=CC=C5)C(=O)N",
    molecularWeight: 477.04,
    categoryUsage: "Antidiarrheal",
  },
  {
    moleculeName: "Bismuth Subsalicylate",
    smilesStructure: "C1=CC=C(C(=C1)C(=O)O)O[Bi]",
    molecularWeight: 362.09,
    categoryUsage: "Antidiarrheal/Antacid",
  },
  {
    moleculeName: "Polyethylene Glycol (PEG)",
    smilesStructure: "C(COCCO)O",
    molecularWeight: 4000.00,
    categoryUsage: "Laxative/Osmotic",
  },

  // Smoking Cessation
  {
    moleculeName: "Varenicline (Chantix)",
    smilesStructure: "C1CC2=C3C(=CC=C2)NC=C3C4=C1NC(=O)N4",
    molecularWeight: 211.26,
    categoryUsage: "Smoking cessation",
  },
  {
    moleculeName: "Bupropion (Wellbutrin/Zyban)",
    smilesStructure: "CC(C(C1=CC=CC=C1Cl)NC(C)C)=O",
    molecularWeight: 239.74,
    categoryUsage: "Antidepressant/Smoking cessation",
  },

  // Weight Loss
  {
    moleculeName: "Orlistat (Xenical)",
    smilesStructure: "CCCCCCCCCCCC(CC(C(C(CCCCCCCCCCC)O)OC(=O)C(CC(C)C)NC=O)O)O",
    molecularWeight: 495.73,
    categoryUsage: "Weight loss/Lipase inhibitor",
  },
  {
    moleculeName: "Phentermine",
    smilesStructure: "CC(C)(CC1=CC=CC=C1)N",
    molecularWeight: 149.23,
    categoryUsage: "Weight loss/Appetite suppressant",
  },
  {
    moleculeName: "Liraglutide (Saxenda)",
    smilesStructure: "CC(C)CC(C(=O)NC(CCC(=O)O)C(=O)NC(CC(C)C)C(=O)NC(CCCCN)C(=O)O)NC(=O)C(C)N",
    molecularWeight: 3751.20,
    categoryUsage: "Weight loss/GLP-1 agonist",
  },

  // Alzheimer's & Dementia
  {
    moleculeName: "Donepezil (Aricept)",
    smilesStructure: "COC1=C(C=C2C(=C1)CC(=O)N2CC3CCN(CC3)CC4=CC=CC=C4)OC",
    molecularWeight: 379.49,
    categoryUsage: "Alzheimer's/Cholinesterase inhibitor",
  },
  {
    moleculeName: "Rivastigmine (Exelon)",
    smilesStructure: "CCN(C)C(=O)OC1=CC=CC(=C1)C(C)N(C)C",
    molecularWeight: 250.34,
    categoryUsage: "Alzheimer's/Cholinesterase inhibitor",
  },
  {
    moleculeName: "Memantine (Namenda)",
    smilesStructure: "CC12CC3CC(C1)(CC(C3)(C2)N)C",
    molecularWeight: 179.30,
    categoryUsage: "Alzheimer's/NMDA antagonist",
  },
  {
    moleculeName: "Galantamine",
    smilesStructure: "CN1CCC23C=CC(CC2OC4=C3C=CC(=C4)O)C1CO",
    molecularWeight: 287.35,
    categoryUsage: "Alzheimer's/Cholinesterase inhibitor",
  },

  // Parkinson's Disease
  {
    moleculeName: "Levodopa (L-DOPA)",
    smilesStructure: "C1=CC(=C(C=C1CC(C(=O)O)N)O)O",
    molecularWeight: 197.19,
    categoryUsage: "Parkinson's/Dopamine precursor",
  },
  {
    moleculeName: "Carbidopa",
    smilesStructure: "CC(C(=O)O)(CC1=CC(=C(C=C1)O)O)N",
    molecularWeight: 226.23,
    categoryUsage: "Parkinson's/Decarboxylase inhibitor",
  },
  {
    moleculeName: "Pramipexole (Mirapex)",
    smilesStructure: "CCCNC1CCC2=C(C1)SC(=N2)N",
    molecularWeight: 211.33,
    categoryUsage: "Parkinson's/Dopamine agonist",
  },
  {
    moleculeName: "Ropinirole (Requip)",
    smilesStructure: "CCCNC1CCC(C1)N2CCC(CC2)C(=O)C3=CC=CC=C3",
    molecularWeight: 260.38,
    categoryUsage: "Parkinson's/Dopamine agonist",
  },
  {
    moleculeName: "Selegiline",
    smilesStructure: "CC(CC#C)N(C)CC1=CC=CC=C1",
    molecularWeight: 187.28,
    categoryUsage: "Parkinson's/MAO-B inhibitor",
  },

  // Multiple Sclerosis
  {
    moleculeName: "Interferon Beta-1a",
    smilesStructure: "CC(C)CC(C(=O)NC(CC1=CC=CC=C1)C(=O)NC(CCCCN)C(=O)O)NC(=O)C(CC(C)C)N",
    molecularWeight: 22500.00,
    categoryUsage: "Multiple sclerosis/Immunomodulator",
  },
  {
    moleculeName: "Glatiramer (Copaxone)",
    smilesStructure: "CC(C)CC(C(=O)NC(CCC(=O)O)C(=O)NC(CC(C)C)C(=O)NC(C(C)C)C(=O)O)N",
    molecularWeight: 6400.00,
    categoryUsage: "Multiple sclerosis/Immunomodulator",
  },
  {
    moleculeName: "Fingolimod (Gilenya)",
    smilesStructure: "CCCCCCCCCCCCCC(CO)(CO)NC1=CC=CC=C1",
    molecularWeight: 307.47,
    categoryUsage: "Multiple sclerosis/S1P modulator",
  },

  // Thyroid Disorders
  {
    moleculeName: "Liothyronine (Cytomel/T3)",
    smilesStructure: "C1=CC(=C(C=C1CC(C(=O)O)N)I)OC2=CC(=C(C(=C2)I)O)I",
    molecularWeight: 650.98,
    categoryUsage: "Thyroid hormone/T3",
  },
  {
    moleculeName: "Methimazole (Tapazole)",
    smilesStructure: "CN1C=CN=C1S",
    molecularWeight: 114.17,
    categoryUsage: "Hyperthyroidism/Antithyroid",
  },
  {
    moleculeName: "Propylthiouracil (PTU)",
    smilesStructure: "CCCC1=CC(=O)NC(=S)N1",
    molecularWeight: 170.23,
    categoryUsage: "Hyperthyroidism/Antithyroid",
  },

  // Vaccines & Biologics (simplified representations)
  {
    moleculeName: "Tetanus Toxoid",
    smilesStructure: "CC(C)CC(C(=O)NC(CCC(=O)N)C(=O)NC(CC(C)C)C(=O)O)NC(=O)C(CC(C)C)N",
    molecularWeight: 150000.00,
    categoryUsage: "Vaccine/Tetanus prevention",
  },

  // Miscellaneous
  {
    moleculeName: "Sildenafil Citrate (Viagra)",
    smilesStructure: "CCCC1=NN(C2=C1NC(=NC2=O)C3=C(C=CC(=C3)S(=O)(=O)N4CCN(CC4)C)OCC)C",
    molecularWeight: 474.58,
    categoryUsage: "ED treatment/PDE5 inhibitor",
  },
  {
    moleculeName: "Clonidine",
    smilesStructure: "C1=C(C=C(C=C1Cl)Cl)NC2=NCCN2",
    molecularWeight: 230.09,
    categoryUsage: "Hypertension/Alpha-2 agonist",
  },
  {
    moleculeName: "Prazosin",
    smilesStructure: "COC1=C(C=C2C(=C1)N=C(N=C2N3CCN(CC3)C(=O)C4=CC=CO4)N)OC",
    molecularWeight: 383.40,
    categoryUsage: "Hypertension/Alpha blocker",
  },
  {
    moleculeName: "Nitroglycerin",
    smilesStructure: "C(C(CO[N+](=O)[O-])O[N+](=O)[O-])O[N+](=O)[O-]",
    molecularWeight: 227.09,
    categoryUsage: "Angina/Vasodilator",
  },
  {
    moleculeName: "Desmopressin",
    smilesStructure: "C1CC(N(C1)C(=O)C(CCCN=C(N)N)NC(=O)C(CC2=CC=C(C=C2)O)NC(=O)C(CC(C)C)NC(=O)C(CC(=O)N)NC(=O)C3CCC(=O)N3)C(=O)NC(CC(C)C)C(=O)N4CCCC4C(=O)NC(CCCN=C(N)N)C(=O)N5CCCC5C(=O)N",
    molecularWeight: 1069.22,
    categoryUsage: "Diabetes insipidus/Vasopressin analog",
  },
  {
    moleculeName: "Octreotide",
    smilesStructure: "CC(C)CC1NC(=O)C(NC(=O)C(NC(=O)C(NC(=O)CNC(=O)C(NC1=O)CCCCN)CC2=CC=C(C=C2)O)CC(C)C)CSC",
    molecularWeight: 1019.24,
    categoryUsage: "Acromegaly/Somatostatin analog",
  },
];

const TableOne = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMolecules, setFilteredMolecules] = useState(moleculeBank);

  useEffect(() => {
    const filteredData = moleculeBank.filter((molecule) =>
      molecule.moleculeName.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredMolecules(filteredData);
  }, [searchQuery]);

  return (
    <div>
        <p className="text-gray-900 dark:text-gray-100 mb-6 text-xl font-medium">
            Follows <a 
                href="https://www.epa.gov/sites/default/files/2015-05/documents/appendf.pdf" 
                target="_blank" 
                className="font-bold"
                style={{ color: '#2563eb', textDecoration: 'underline' }}
            >
                SMILE
            </a> Notation
        </p>
      <input
        type="text"
        placeholder="Search for molecules..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border-gray-300 text-gray-700 placeholder-gray-400 dark:border-gray-600 dark:placeholder-gray-500 text-md mb-4 w-full rounded-lg border bg-white px-4 py-3 shadow-sm outline-none focus:border-primary focus:ring-primary dark:bg-[#181818] dark:text-white"
      />
      <table className="text-gray-700 dark:text-gray-300 w-full table-auto">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="border-gray-300 dark:border-gray-700 border px-4 py-2">
              Molecule name
            </th>
            <th className="border-gray-300 dark:border-gray-700 border px-4 py-2">
              Structural Representation
            </th>
            <th className="border-gray-300 dark:border-gray-700 border px-4 py-2">
              Molecular Weights (g/mol)
            </th>
            <th className="border-gray-300 dark:border-gray-700 border px-4 py-2">
              Category Usage
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredMolecules.map((molecule, key) => (
            <tr key={key}>
              <td className="border-gray-300 dark:border-gray-700 border px-4 py-2">
                {molecule.moleculeName}
              </td>
              <td className="border-gray-300 dark:border-gray-700 border px-4 py-2">
                <MoleculeStructure 
                  id={`molecule-${key}`}
                  structure={molecule.smilesStructure}
                  svgMode={true}
                  width={200}
                  height={150}
                />
              </td>
              <td className="border-gray-300 dark:border-gray-700 border px-4 py-2">
                {molecule.molecularWeight}
              </td>
              <td className="border-gray-300 dark:border-gray-700 border px-4 py-2">
                {molecule.categoryUsage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableOne;