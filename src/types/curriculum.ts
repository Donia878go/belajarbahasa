export type ModuleLevel =
  | "Dasar"
  | "Variabel"
  | "Percabangan"
  | "Perulangan"
  | "Struktur Data"
  | "Fungsi"
  | "Error Handling"
  | "OOP / Paradigma"
  | "Fitur Khas"
  | "Mini Project";

export interface CurriculumModule {
  id: string;
  order: number;
  level: ModuleLevel;
  title: string;
  theory: string;
  task: string;
  initialCode: string;
  solutionCode: string;
  expectedOutput: string;
  hints: string[];
}

export interface LanguageTrack {
  id: string;
  name: string;
  category: "Modern" | "Klasik & Retro";
  year: string;
  monacoLang: string;
  judge0Id: number;
  description: string;
  modules: CurriculumModule[];
}

export type UserProgress = Record<string, string[]>; // { python: ["py-mod-1", "py-mod-2"], c: ["c-mod-1"] }