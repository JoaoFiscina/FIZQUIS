import { clinicaQuestions } from "./clinica";
import { cirurgiaQuestions } from "./cirurgia";
import { pediatriaQuestions } from "./pediatria";
import { goQuestions } from "./go";
import { preventivaQuestions } from "./preventiva";
import { urgenciaQuestions } from "./urgencia";
import type { Question } from "../../types/questions";

export const allQuestions: Question[] = [
  ...clinicaQuestions,
  ...cirurgiaQuestions,
  ...pediatriaQuestions,
  ...goQuestions,
  ...preventivaQuestions,
  ...urgenciaQuestions
];

export const questionsByArea: Record<string, Question[]> = {
  clinica: clinicaQuestions,
  cirurgia: cirurgiaQuestions,
  pediatria: pediatriaQuestions,
  go: goQuestions,
  preventiva: preventivaQuestions,
  urgencia: urgenciaQuestions
};
