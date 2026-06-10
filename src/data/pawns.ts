import type { PawnType } from "../types/game";

export interface PawnOption {
  id: PawnType;
  label: string;
  description: string;
}

export const pawnOptions: PawnOption[] = [
  {
    id: "stethoscope",
    label: "Estetoscópio",
    description: "Sempre atento aos batimentos cardíacos do plantão."
  },
  {
    id: "scalpel",
    label: "Bisturi",
    description: "Cortes precisos e decisões rápidas no bloco cirúrgico."
  },
  {
    id: "syringe",
    label: "Seringa",
    description: "Rápido na aplicação de condutas e tratamentos."
  },
  {
    id: "ambulance",
    label: "Ambulância",
    description: "Velocidade máxima para salvar vidas e passar fura-filas."
  },
  {
    id: "bandage",
    label: "Curativo",
    description: "Resistência para aguentar as piores intercorrências."
  },
  {
    id: "pills",
    label: "Comprimidos",
    description: "A receita perfeita para acalmar a tensão do plantão."
  },
  {
    id: "thermometer",
    label: "Termômetro",
    description: "Mede a temperatura das discussões com o preceptor."
  },
  {
    id: "otoscope",
    label: "Otoscópio",
    description: "Olhar aguçado para enxergar detalhes nas entrelinhas."
  }
];
