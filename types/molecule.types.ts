
export interface GeneratedMolecule {
  structure: string;
  score: number;
}

export interface MoleculeGenerationHistoryType {
  smiles: string;
  numMolecules: number;
  minSimilarity: number;
  particles: number;
  iterations: number;
  generatedMolecules: GeneratedMolecule[];
}

export interface MoleculeGenerationHistoryDocument extends MoleculeGenerationHistoryType {
  _id: string;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NvidiaMoleculeResponse {
  molecules: string | GeneratedMolecule[];
  // Add other fields if NVIDIA API returns more data
}