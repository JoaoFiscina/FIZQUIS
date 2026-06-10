import type { Question, MedicalArea, Difficulty } from "../types/questions";
import { questionsByArea } from "../data/questions";

// Probabilidades de dificuldade por região do tabuleiro
// Retorna a probabilidade acumulada: [Fácil, Médio, Difícil]
const REGION_PROBABILITIES = {
  inicio: { facil: 0.55, media: 0.35, dificil: 0.10 },
  meio: { facil: 0.35, media: 0.45, dificil: 0.20 },
  final: { facil: 0.20, media: 0.45, dificil: 0.35 },
  casa_final: { facil: 0.00, media: 0.40, dificil: 0.60 },
  r3: { facil: 0.00, media: 0.20, dificil: 0.80 } // Especial para a casa Pergunta de R3
};

export const getRandomDifficulty = (
  region: "inicio" | "meio" | "final",
  isFinalCell: boolean,
  isR3: boolean
): Difficulty => {
  const rand = Math.random();
  let probs = REGION_PROBABILITIES[region];

  if (isFinalCell) {
    probs = REGION_PROBABILITIES.casa_final;
  } else if (isR3) {
    probs = REGION_PROBABILITIES.r3;
  }

  // Sorteio com base nas probabilidades
  if (rand < probs.facil) {
    return "facil";
  } else if (rand < probs.facil + probs.media) {
    return "media";
  } else {
    return "dificil";
  }
};

export const getQuestion = (
  area: MedicalArea,
  difficulty: Difficulty,
  usedQuestionIds: string[]
): Question => {
  const availableQuestions = questionsByArea[area] || [];
  
  // 1. Tentar filtrar por dificuldade e não usadas
  let filtered = availableQuestions.filter(
    (q) => q.difficulty === difficulty && !usedQuestionIds.includes(q.id)
  );

  // 2. Se não houver perguntas não usadas dessa dificuldade, tentar qualquer não usada nesta área
  if (filtered.length === 0) {
    filtered = availableQuestions.filter((q) => !usedQuestionIds.includes(q.id));
  }

  // 3. Se todas as perguntas daquela área já foram usadas, resetar o histórico para essa área e pegar qualquer uma
  if (filtered.length === 0) {
    filtered = availableQuestions.filter((q) => q.difficulty === difficulty);
    if (filtered.length === 0) {
      filtered = availableQuestions;
    }
  }

  // Sortear uma das perguntas filtradas
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};
