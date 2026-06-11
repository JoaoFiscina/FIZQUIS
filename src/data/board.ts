import type { BoardCell } from "../types/game";
import type { MedicalArea } from "../types/questions";

// Cores associadas a cada área
export const areaColors: Record<MedicalArea | "curinga" | "special" | "start" | "final", string> = {
  clinica: "#3b82f6",     // Azul
  cirurgia: "#ef4444",    // Vermelho
  pediatria: "#10b981",    // Verde
  go: "#a855f7",          // Roxo
  preventiva: "#FBBF24",  // Amarelo
  urgencia: "#f97316",    // Laranja
  curinga: "#ec4899",     // Rosa/Multicolor (Rainbow)
  special: "#06b6d4",     // Ciano
  start: "#8e9aaf",       // Cinza azulado amigável
  final: "#10b981"        // Verde esmeralda brilhante
};

export const areaNames: Record<MedicalArea | "curinga", string> = {
  clinica: "Clínica Médica",
  cirurgia: "Cirurgia",
  pediatria: "Pediatria",
  go: "Ginecologia e Obstetrícia",
  preventiva: "Saúde Coletiva / Preventiva",
  urgencia: "Urgência e Emergência",
  curinga: "Curinga"
};

// Mapeamento das 50 casas do tabuleiro + caminhos de bifurcação
export const boardCells: BoardCell[] = [
  // --- INÍCIO (Região Início: 0 a 12) ---
  { id: 0, label: "Início", type: "normal", region: "inicio", position: { x: 5, y: 90 }, next: [1] },
  { id: 1, label: "Clínica", area: "clinica", type: "normal", region: "inicio", position: { x: 12, y: 90 }, next: [2] },
  { id: 2, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "inicio", position: { x: 20, y: 90 }, next: [3] },
  { id: 3, label: "Cirurgia", area: "cirurgia", type: "normal", region: "inicio", position: { x: 28, y: 90 }, next: [4] },
  { id: 4, label: "Evolução Perfeita", type: "bonus", specialEffect: "evolucao_perfeita", region: "inicio", position: { x: 36, y: 90 }, next: [5] },
  { id: 5, label: "Pediatria", area: "pediatria", type: "normal", region: "inicio", position: { x: 44, y: 90 }, next: [6] },
  { id: 6, label: "G.O.", area: "go", type: "normal", region: "inicio", position: { x: 52, y: 90 }, next: [7] },
  { id: 7, label: "Dupla Checagem", type: "bonus", specialEffect: "dupla_checagem", region: "inicio", position: { x: 60, y: 90 }, next: [8] },
  { id: 8, label: "Preventiva", area: "preventiva", type: "normal", region: "inicio", position: { x: 68, y: 90 }, next: [9] },
  { id: 9, label: "Urgência", area: "urgencia", type: "normal", region: "inicio", position: { x: 76, y: 90 }, next: [10] },
  { id: 10, label: "Plantão Tranquilo", type: "bonus", specialEffect: "plantao_tranquilo", region: "inicio", position: { x: 84, y: 90 }, next: [11] },
  { id: 11, label: "Clínica", area: "clinica", type: "normal", region: "inicio", position: { x: 92, y: 90 }, next: [12] },
  
  // Bifurcação Inicial na Casa 12
  { 
    id: 12, 
    label: "Triagem: Bifurcação", 
    type: "normal", 
    area: "clinica",
    region: "inicio", 
    position: { x: 92, y: 76 }, 
    next: [13, 201] // 13: Caminho Curto e Rápido (Arriscado) | 201: Caminho Longo (Seguro)
  },

  // --- CAMINHO A (Curto / Arriscado) ---
  { id: 13, label: "Risco Cirúrgico", type: "risk", specialEffect: "risco_cirurgico", region: "meio", position: { x: 82, y: 70 }, next: [14], pathGroup: "shortcut" },
  { id: 14, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 72, y: 70 }, next: [15], pathGroup: "shortcut" },
  { id: 15, label: "Plantão Caótico", type: "risk", specialEffect: "plantao_caotico", region: "meio", position: { x: 62, y: 70 }, next: [16], pathGroup: "shortcut" },
  { id: 16, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 52, y: 70 }, next: [17], pathGroup: "shortcut" },
  { id: 17, label: "Intercorrência", type: "interaction", specialEffect: "intercorrencia", region: "meio", position: { x: 42, y: 70 }, next: [18], pathGroup: "shortcut" },
  { id: 18, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 32, y: 70 }, next: [23], pathGroup: "shortcut" }, // Junta com o outro caminho na casa 23

  // --- CAMINHO B (Longo / Seguro) ---
  { id: 201, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 88, y: 82 }, next: [202], pathGroup: "long" },
  { id: 202, label: "Dupla Checagem", type: "bonus", specialEffect: "dupla_checagem", region: "meio", position: { x: 78, y: 82 }, next: [203], pathGroup: "long" },
  { id: 203, label: "Urgência", area: "urgencia", type: "normal", region: "meio", position: { x: 68, y: 82 }, next: [204], pathGroup: "long" },
  { id: 204, label: "Clínica", area: "clinica", type: "normal", region: "meio", position: { x: 58, y: 82 }, next: [205], pathGroup: "long" },
  { id: 205, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 48, y: 82 }, next: [206], pathGroup: "long" },
  { id: 206, label: "Alta Hospitalar", type: "bonus", specialEffect: "alta_hospitalar", region: "meio", position: { x: 38, y: 82 }, next: [207], pathGroup: "long" },
  { id: 207, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 28, y: 82 }, next: [208], pathGroup: "long" },
  { id: 208, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 20, y: 82 }, next: [209], pathGroup: "long" },
  { id: 209, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 14, y: 76 }, next: [210], pathGroup: "long" },
  { id: 210, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "meio", position: { x: 20, y: 70 }, next: [23], pathGroup: "long" }, // Junta com o outro caminho na casa 23

  // Ponto de Reunião: Casa 23 (Região Meio)
  { id: 23, label: "Recepção", area: "clinica", type: "normal", region: "meio", position: { x: 22, y: 56 }, next: [24] },
  { id: 24, label: "Urgência", area: "urgencia", type: "normal", region: "meio", position: { x: 30, y: 56 }, next: [25] },
  { id: 25, label: "Passa o Plantão", type: "interaction", specialEffect: "passa_plantao", region: "meio", position: { x: 38, y: 56 }, next: [26] },
  { id: 26, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 46, y: 56 }, next: [27] },
  { id: 27, label: "Troca de Leito", type: "interaction", specialEffect: "troca_leito", region: "meio", position: { x: 54, y: 56 }, next: [28] },
  { id: 28, label: "Clínica", area: "clinica", type: "normal", region: "meio", position: { x: 62, y: 56 }, next: [29] },
  { id: 29, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 70, y: 56 }, next: [30] },

  // Bifurcação 2 na Casa 30 (Aproximação do final)
  { 
    id: 30, 
    label: "Rondando a UTI", 
    type: "normal", 
    area: "urgencia",
    region: "meio", 
    position: { x: 78, y: 56 }, 
    next: [31, 301] // 31: Rota Direta da UTI (Perguntas Difíceis / Atalho) | 301: Rota da Enfermaria (Normal)
  },

  // --- ROTA DA UTI (Atalho R3) ---
  { id: 31, label: "Pergunta de R3", type: "risk", specialEffect: "pergunta_r3", region: "final", position: { x: 84, y: 44 }, next: [32], pathGroup: "shortcut" },
  { id: 32, label: "Caso Grave", type: "risk", specialEffect: "caso_grave", region: "final", position: { x: 74, y: 44 }, next: [33], pathGroup: "shortcut" },
  { id: 33, label: "Urgência", area: "urgencia", type: "normal", region: "final", position: { x: 64, y: 44 }, next: [40], pathGroup: "shortcut" }, // Junta com caminho da enfermaria no 40

  // --- ROTA DA ENFERMARIA (Normal) ---
  { id: 301, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 88, y: 62 }, next: [302], pathGroup: "long" },
  { id: 302, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 94, y: 50 }, next: [303], pathGroup: "long" },
  { id: 303, label: "Contra-referência", type: "interaction", specialEffect: "contra_referencia", region: "final", position: { x: 94, y: 38 }, next: [304], pathGroup: "long" },
  { id: 304, label: "Preventiva", area: "preventiva", type: "normal", region: "final", position: { x: 88, y: 32 }, next: [305], pathGroup: "long" },
  { id: 305, label: "Clínica", area: "clinica", type: "normal", region: "final", position: { x: 78, y: 32 }, next: [306], pathGroup: "long" },
  { id: 306, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "final", position: { x: 68, y: 32 }, next: [307], pathGroup: "long" },
  { id: 307, label: "Pediatria", area: "pediatria", type: "normal", region: "final", position: { x: 58, y: 32 }, next: [40], pathGroup: "long" },

  // Ponto de Encontro Final: Casa 40 (Região Final)
  { id: 40, label: "Posto Médico", area: "clinica", type: "normal", region: "final", position: { x: 54, y: 44 }, next: [41] },
  { id: 41, label: "Evolução Perfeita", type: "bonus", specialEffect: "evolucao_perfeita", region: "final", position: { x: 44, y: 44 }, next: [42] },
  { id: 42, label: "Cirurgia", area: "cirurgia", type: "normal", region: "final", position: { x: 34, y: 44 }, next: [43] },
  { id: 43, label: "Plantão Caótico", type: "risk", specialEffect: "plantao_caotico", region: "final", position: { x: 24, y: 44 }, next: [44] },
  { id: 44, label: "G.O.", area: "go", type: "normal", region: "final", position: { x: 14, y: 44 }, next: [45] },
  { id: 45, label: "Risco Cirúrgico", type: "risk", specialEffect: "risco_cirurgico", region: "final", position: { x: 8, y: 36 }, next: [46] },
  { id: 46, label: "Preventiva", area: "preventiva", type: "normal", region: "final", position: { x: 12, y: 26 }, next: [47] },
  { id: 47, label: "Urgência", area: "urgencia", type: "normal", region: "final", position: { x: 22, y: 26 }, next: [48] },
  { id: 48, label: "Pergunta de R3", type: "risk", specialEffect: "pergunta_r3", region: "final", position: { x: 32, y: 26 }, next: [49] },
  { id: 49, label: "Clínica", area: "clinica", type: "normal", region: "final", position: { x: 42, y: 26 }, next: [50] },
  
  // CASA FINAL (Chegada na 50)
  { id: 50, label: "Plantão Final", type: "final", region: "final", position: { x: 52, y: 20 } }
];

export const getBoardRegion = (cellId: number): "inicio" | "meio" | "final" => {
  const cell = boardCells.find(c => c.id === cellId);
  return cell ? cell.region : "inicio";
};
