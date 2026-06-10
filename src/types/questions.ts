export type MedicalArea =
  | "clinica"
  | "cirurgia"
  | "pediatria"
  | "go"
  | "preventiva"
  | "urgencia";

export type Difficulty = "facil" | "media" | "dificil";

export interface Question {
  id: string;
  area: MedicalArea;
  difficulty: Difficulty;
  statement: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
  explanation: string;
  tags?: string[];
  source?: string;
}
