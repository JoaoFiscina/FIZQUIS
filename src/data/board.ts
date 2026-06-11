import type { BoardCell } from "../types/game";
import type { MedicalArea } from "../types/questions";

// Cores associadas a cada área - paleta mais vibrante e divertida
export const areaColors: Record<MedicalArea | "curinga" | "special" | "start" | "final", string> = {
  clinica: "#4F8EF7",     // Azul vivo
  cirurgia: "#F25C5C",    // Vermelho coral
  pediatria: "#34C78A",   // Verde menta
  go: "#A56CF5",          // Roxo lavanda
  preventiva: "#F5C042",  // Amarelo dourado
  urgencia: "#F58C3D",    // Laranja quente
  curinga: "#E85AAD",     // Rosa vibrante
  special: "#3CBCBF",     // Turquesa
  start: "#94A3B8",       // Cinza neutro
  final: "#22C55E"        // Verde sucesso
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

// Tabuleiro com path mais sinuoso e orgânico
// Coordenadas em 0-100 (mapeadas para 0-1000 no SVG)
export const boardCells: BoardCell[] = [
  // --- INÍCIO (0 a 12) - Linha inferior com leve ondulação ---
  { id: 0, label: "Início", type: "normal", region: "inicio", position: { x: 8, y: 88 }, next: [1] },
  { id: 1, label: "Clínica", area: "clinica", type: "normal", region: "inicio", position: { x: 16, y: 86 }, next: [2] },
  { id: 2, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "inicio", position: { x: 24, y: 88 }, next: [3] },
  { id: 3, label: "Cirurgia", area: "cirurgia", type: "normal", region: "inicio", position: { x: 32, y: 86 }, next: [4] },
  { id: 4, label: "Evolução Perfeita", type: "bonus", specialEffect: "evolucao_perfeita", region: "inicio", position: { x: 40, y: 88 }, next: [5] },
  { id: 5, label: "Pediatria", area: "pediatria", type: "normal", region: "inicio", position: { x: 48, y: 86 }, next: [6] },
  { id: 6, label: "G.O.", area: "go", type: "normal", region: "inicio", position: { x: 56, y: 88 }, next: [7] },
  { id: 7, label: "Dupla Checagem", type: "bonus", specialEffect: "dupla_checagem", region: "inicio", position: { x: 64, y: 86 }, next: [8] },
  { id: 8, label: "Preventiva", area: "preventiva", type: "normal", region: "inicio", position: { x: 72, y: 88 }, next: [9] },
  { id: 9, label: "Urgência", area: "urgencia", type: "normal", region: "inicio", position: { x: 80, y: 86 }, next: [10] },
  { id: 10, label: "Plantão Tranquilo", type: "bonus", specialEffect: "plantao_tranquilo", region: "inicio", position: { x: 88, y: 88 }, next: [11] },
  { id: 11, label: "Clínica", area: "clinica", type: "normal", region: "inicio", position: { x: 93, y: 84 }, next: [12] },
  
  // Bifurcação na Casa 12 - curva para cima
  { 
    id: 12, 
    label: "Triagem", 
    type: "normal", 
    area: "clinica",
    region: "inicio", 
    position: { x: 93, y: 76 }, 
    next: [13, 201]
  },

  // --- CAMINHO A (Curto / Arriscado) - linha interna, mais alto ---
  { id: 13, label: "Risco Cirúrgico", type: "risk", specialEffect: "risco_cirurgico", region: "meio", position: { x: 84, y: 66 }, next: [14], pathGroup: "shortcut" },
  { id: 14, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 74, y: 63 }, next: [15], pathGroup: "shortcut" },
  { id: 15, label: "Plantão Caótico", type: "risk", specialEffect: "plantao_caotico", region: "meio", position: { x: 64, y: 66 }, next: [16], pathGroup: "shortcut" },
  { id: 16, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 54, y: 63 }, next: [17], pathGroup: "shortcut" },
  { id: 17, label: "Intercorrência", type: "interaction", specialEffect: "intercorrencia", region: "meio", position: { x: 44, y: 66 }, next: [18], pathGroup: "shortcut" },
  { id: 18, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 34, y: 63 }, next: [23], pathGroup: "shortcut" },

  // --- CAMINHO B (Longo / Seguro) - arco externo inferior ---
  { id: 201, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 86, y: 76 }, next: [202], pathGroup: "long" },
  { id: 202, label: "Dupla Checagem", type: "bonus", specialEffect: "dupla_checagem", region: "meio", position: { x: 78, y: 78 }, next: [203], pathGroup: "long" },
  { id: 203, label: "Urgência", area: "urgencia", type: "normal", region: "meio", position: { x: 70, y: 76 }, next: [204], pathGroup: "long" },
  { id: 204, label: "Clínica", area: "clinica", type: "normal", region: "meio", position: { x: 62, y: 78 }, next: [205], pathGroup: "long" },
  { id: 205, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 54, y: 76 }, next: [206], pathGroup: "long" },
  { id: 206, label: "Alta Hospitalar", type: "bonus", specialEffect: "alta_hospitalar", region: "meio", position: { x: 46, y: 78 }, next: [207], pathGroup: "long" },
  { id: 207, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 38, y: 76 }, next: [208], pathGroup: "long" },
  { id: 208, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 30, y: 78 }, next: [209], pathGroup: "long" },
  { id: 209, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 22, y: 74 }, next: [210], pathGroup: "long" },
  { id: 210, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "meio", position: { x: 16, y: 68 }, next: [23], pathGroup: "long" },

  // Ponto de Reunião: Casa 23 - faixa do meio
  { id: 23, label: "Recepção", area: "clinica", type: "normal", region: "meio", position: { x: 24, y: 54 }, next: [24] },
  { id: 24, label: "Urgência", area: "urgencia", type: "normal", region: "meio", position: { x: 32, y: 52 }, next: [25] },
  { id: 25, label: "Passa o Plantão", type: "interaction", specialEffect: "passa_plantao", region: "meio", position: { x: 40, y: 54 }, next: [26] },
  { id: 26, label: "Preventiva", area: "preventiva", type: "normal", region: "meio", position: { x: 48, y: 52 }, next: [27] },
  { id: 27, label: "Troca de Leito", type: "interaction", specialEffect: "troca_leito", region: "meio", position: { x: 56, y: 54 }, next: [28] },
  { id: 28, label: "Clínica", area: "clinica", type: "normal", region: "meio", position: { x: 64, y: 52 }, next: [29] },
  { id: 29, label: "Pediatria", area: "pediatria", type: "normal", region: "meio", position: { x: 72, y: 54 }, next: [30] },

  // Bifurcação 2 na Casa 30
  { 
    id: 30, 
    label: "Rondando a UTI", 
    type: "normal", 
    area: "urgencia",
    region: "meio", 
    position: { x: 80, y: 52 }, 
    next: [31, 301]
  },

  // --- ROTA DA UTI (Atalho R3) - caminho interno alto ---
  { id: 31, label: "Pergunta de R3", type: "risk", specialEffect: "pergunta_r3", region: "final", position: { x: 82, y: 42 }, next: [32], pathGroup: "shortcut" },
  { id: 32, label: "Caso Grave", type: "risk", specialEffect: "caso_grave", region: "final", position: { x: 74, y: 40 }, next: [33], pathGroup: "shortcut" },
  { id: 33, label: "Urgência", area: "urgencia", type: "normal", region: "final", position: { x: 64, y: 42 }, next: [40], pathGroup: "shortcut" },

  // --- ROTA DA ENFERMARIA (Normal) - arco externo ---
  { id: 301, label: "G.O.", area: "go", type: "normal", region: "meio", position: { x: 88, y: 48 }, next: [302], pathGroup: "long" },
  { id: 302, label: "Cirurgia", area: "cirurgia", type: "normal", region: "meio", position: { x: 93, y: 40 }, next: [303], pathGroup: "long" },
  { id: 303, label: "Contra-referência", type: "interaction", specialEffect: "contra_referencia", region: "final", position: { x: 93, y: 30 }, next: [304], pathGroup: "long" },
  { id: 304, label: "Preventiva", area: "preventiva", type: "normal", region: "final", position: { x: 86, y: 28 }, next: [305], pathGroup: "long" },
  { id: 305, label: "Clínica", area: "clinica", type: "normal", region: "final", position: { x: 78, y: 30 }, next: [306], pathGroup: "long" },
  { id: 306, label: "Curinga", type: "wildcard", specialEffect: "curinga", region: "final", position: { x: 70, y: 28 }, next: [307], pathGroup: "long" },
  { id: 307, label: "Pediatria", area: "pediatria", type: "normal", region: "final", position: { x: 62, y: 30 }, next: [40], pathGroup: "long" },

  // Ponto de Encontro Final: Casa 40 - linha superior
  { id: 40, label: "Posto Médico", area: "clinica", type: "normal", region: "final", position: { x: 54, y: 40 }, next: [41] },
  { id: 41, label: "Evolução Perfeita", type: "bonus", specialEffect: "evolucao_perfeita", region: "final", position: { x: 44, y: 42 }, next: [42] },
  { id: 42, label: "Cirurgia", area: "cirurgia", type: "normal", region: "final", position: { x: 34, y: 40 }, next: [43] },
  { id: 43, label: "Plantão Caótico", type: "risk", specialEffect: "plantao_caotico", region: "final", position: { x: 24, y: 42 }, next: [44] },
  { id: 44, label: "G.O.", area: "go", type: "normal", region: "final", position: { x: 14, y: 40 }, next: [45] },
  { id: 45, label: "Risco Cirúrgico", type: "risk", specialEffect: "risco_cirurgico", region: "final", position: { x: 8, y: 32 }, next: [46] },
  { id: 46, label: "Preventiva", area: "preventiva", type: "normal", region: "final", position: { x: 14, y: 22 }, next: [47] },
  { id: 47, label: "Urgência", area: "urgencia", type: "normal", region: "final", position: { x: 24, y: 20 }, next: [48] },
  { id: 48, label: "Pergunta de R3", type: "risk", specialEffect: "pergunta_r3", region: "final", position: { x: 34, y: 22 }, next: [49] },
  { id: 49, label: "Clínica", area: "clinica", type: "normal", region: "final", position: { x: 44, y: 20 }, next: [50] },
  
  // CASA FINAL
  { id: 50, label: "Plantão Final", type: "final", region: "final", position: { x: 52, y: 14 } }
];

export const getBoardRegion = (cellId: number): "inicio" | "meio" | "final" => {
  const cell = boardCells.find(c => c.id === cellId);
  return cell ? cell.region : "inicio";
};
