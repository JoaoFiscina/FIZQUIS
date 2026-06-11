import type { MedicalArea } from "./questions";

export type CellType =
  | "normal"
  | "wildcard"
  | "bonus"
  | "risk"
  | "interaction"
  | "final";

export type SpecialEffectType =
  | "curinga"             // Escolhe a área da pergunta
  | "plantao_tranquilo"   // Acerto: joga de novo. Erro: volta pra origem
  | "evolucao_perfeita"   // Acerto: +2 casas. Erro: volta pra origem
  | "alta_hospitalar"     // Acerto: pega atalho. Erro: volta pra origem
  | "dupla_checagem"      // Elimina 2 alternativas incorretas
  | "plantao_caotico"     // Acerto: +4 casas. Erro: volta 4 casas a partir da origem
  | "caso_grave"          // Rota mais longa/loop de penalidade se errar
  | "risco_cirurgico"     // Acerto: avança o dobro do dado tirado. Erro: volta pra origem
  | "intercorrencia"      // Acerto: escolhe adversário para voltar 3 casas. Erro: própria equipe volta 3 casas a partir da origem
  | "pergunta_r3"         // Pergunta difícil. Acerto: +5 casas. Erro: volta pra origem e perde o próximo turno
  | "passa_plantao"       // Escolhe outra equipe para responder.
  | "troca_leito"         // Acerto: troca com qualquer equipe à frente. Erro: volta pra origem
  | "contra_referencia";  // Acerto: escolhe adversário à frente para voltar 2 casas. Erro: própria equipe volta 2 casas da origem

export interface BoardCell {
  id: number;
  label: string;
  area?: MedicalArea;
  type: CellType;
  specialEffect?: SpecialEffectType;
  region: "inicio" | "meio" | "final";
  position: {
    x: number;
    y: number;
  };
  next?: number[]; // IDs das próximas casas possíveis (bifurcações)
  pathGroup?: "main" | "shortcut" | "long" | "penalty_loop";
}

export type PawnType =
  | "stethoscope"
  | "scalpel"
  | "syringe"
  | "ambulance"
  | "bandage"
  | "pills"
  | "thermometer"
  | "otoscope";

export interface Team {
  id: string;
  name: string;
  color: string; // Hex color code
  pawn: PawnType;
  position: number; // ID da casa atual
  previousPosition?: number; // Para controle de voltar em caso de erro
  skipNextTurn?: boolean;
  score?: number;
}

export interface GameLogEntry {
  id: string;
  text: string;
  timestamp: string;
  type: "system" | "roll" | "correct" | "wrong" | "bonus" | "penalty" | "effect";
  teamId?: string;
}

export type GamePhase =
  | "setup"
  | "waiting_roll"
  | "rolling"
  | "moving"
  | "choosing_path"
  | "choosing_target"
  | "choosing_area"
  | "revealing_cell"
  | "answering"
  | "resolving"
  | "game_over";
