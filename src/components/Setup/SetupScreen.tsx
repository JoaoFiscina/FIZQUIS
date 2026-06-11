import React, { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { pawnOptions } from "../../data/pawns";
import { PawnIcon } from "../Board/PawnIcon";
import { User, Plus, Trash2, Play, AlertCircle } from "lucide-react";
import type { PawnType } from "../../types/game";

interface SetupTeam {
  name: string;
  color: string;
  pawn: PawnType;
}

const PRESET_COLORS = [
  "#3b82f6", // Azul Médico
  "#ef4444", // Vermelho Cirurgia
  "#10b981", // Verde Pediatria
  "#a855f7", // Roxo G.O.
  "#f97316", // Laranja Urgência
  "#eab308", // Amarelo Preventiva
  "#ec4899"  // Rosa Curinga
];

export const SetupScreen: React.FC = () => {
  const { initializeGame } = useGameStore();
  const [teamsData, setTeamsData] = useState<SetupTeam[]>([
    { name: "Equipe R1 Desesperado", color: PRESET_COLORS[0], pawn: "stethoscope" },
    { name: "Equipe Cirurgia Geral", color: PRESET_COLORS[1], pawn: "scalpel" }
  ]);
  const [error, setError] = useState<string | null>(null);

  const handleAddTeam = () => {
    if (teamsData.length >= 4) return;
    
    const usedColors = teamsData.map((t) => t.color);
    const usedPawns = teamsData.map((t) => t.pawn);
    
    const availableColor = PRESET_COLORS.find((c) => !usedColors.includes(c)) || PRESET_COLORS[teamsData.length];
    const availablePawn = pawnOptions.find((p) => !usedPawns.includes(p.id))?.id || "syringe";

    setTeamsData([
      ...teamsData,
      {
        name: `Equipe Internos ${teamsData.length + 1}`,
        color: availableColor,
        pawn: availablePawn as PawnType
      }
    ]);
    setError(null);
  };

  const handleRemoveTeam = (index: number) => {
    if (teamsData.length <= 2) return;
    setTeamsData(teamsData.filter((_, i) => i !== index));
    setError(null);
  };

  const handleUpdateTeam = (index: number, fields: Partial<SetupTeam>) => {
    setTeamsData(
      teamsData.map((t, i) => (i === index ? { ...t, ...fields } : t))
    );
    setError(null);
  };

  const handleStartGame = () => {
    const hasEmptyName = teamsData.some((t) => !t.name.trim());
    if (hasEmptyName) {
      setError("Por favor, dê um nome para todas as equipes!");
      return;
    }

    const pawns = teamsData.map((t) => t.pawn);
    const hasDuplicatePawns = new Set(pawns).size !== pawns.length;
    if (hasDuplicatePawns) {
      setError("Cada equipe deve escolher um peão exclusivo! Sem disputas pelo estetoscópio.");
      return;
    }

    const colors = teamsData.map((t) => t.color);
    const hasDuplicateColors = new Set(colors).size !== colors.length;
    if (hasDuplicateColors) {
      setError("Cada equipe deve escolher uma cor exclusiva!");
      return;
    }

    initializeGame(teamsData);
   return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-6 animate-fade-in">
      {/* Cabeçalho */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-wide uppercase leading-tight">Configuração de Equipes</h2>
        <p className="text-xs md:text-sm text-slate-500 font-bold max-w-md mx-auto">
          Monte o seu plantão de gincana médica escolhendo as cores e peças exclusivas para cada time.
        </p>
      </div>

      {/* Grid de Equipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamsData.map((team, idx) => {
          const usedPawns = teamsData.map((t, i) => (i !== idx ? t.pawn : null)).filter(Boolean);
          const usedColors = teamsData.map((t, i) => (i !== idx ? t.color : null)).filter(Boolean);

          return (
            <div
              key={idx}
              className="relative p-6 rounded-[32px] bg-white border-2 border-slate-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-slate-200"
              style={{
                borderTop: `8px solid ${team.color}`,
                boxShadow: `0 12px 30px -10px ${team.color}20, 0 4px 6px -1px rgba(0,0,0,0.01)`
              }}
            >
              {/* Botão de Excluir Equipe */}
              {teamsData.length > 2 && (
                <button
                  onClick={() => handleRemoveTeam(idx)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:border-red-200 border border-transparent transition-all p-1.5 rounded-xl cursor-pointer shadow-sm active:scale-95"
                  title="Remover Equipe"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <div className="space-y-4">
                {/* Número da Equipe */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow-md"
                    style={{ backgroundColor: team.color }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    Plantonista {idx + 1}
                  </span>
                </div>

                {/* Input de Nome */}
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleUpdateTeam(idx, { name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200/80 hover:bg-slate-50/50 rounded-2xl py-3 pl-10 pr-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white transition-colors"
                    placeholder="Nome da Equipe..."
                    maxLength={25}
                  />
                </div>

                {/* Seletor de Cores */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Identificação (Cor)</label>
                  <div className="flex flex-wrap gap-2.5">
                    {PRESET_COLORS.map((c) => {
                      const isColorUsed = usedColors.includes(c);
                      const isSelected = team.color === c;

                      return (
                        <button
                          key={c}
                          disabled={isColorUsed}
                          onClick={() => handleUpdateTeam(idx, { color: c })}
                          className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer relative ${
                            isColorUsed ? "opacity-10 cursor-not-allowed scale-75" : ""
                          } ${
                            isSelected 
                              ? "scale-110 border-white shadow-md ring-2 ring-slate-850 ring-offset-1" 
                              : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: c }}
                        >
                          {isSelected && (
                            <span className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Seletor de Peões */}
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Escolha a Peça</label>
                  <div className="grid grid-cols-4 gap-2">
                    {pawnOptions.map((opt) => {
                      const isPawnUsed = usedPawns.includes(opt.id);
                      const isSelected = team.pawn === opt.id;

                      return (
                        <button
                          key={opt.id}
                          disabled={isPawnUsed}
                          onClick={() => handleUpdateTeam(idx, { pawn: opt.id })}
                          className={`p-2.5 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                            isPawnUsed
                              ? "opacity-15 cursor-not-allowed bg-slate-50 border-transparent text-slate-300"
                              : isSelected
                              ? "border-indigo-650 bg-indigo-50/50 text-indigo-650 shadow-sm font-bold scale-[1.03]"
                              : "border-slate-100 bg-slate-50 text-slate-500 hover:bg-slate-100/80 hover:text-slate-850 cursor-pointer active:scale-95"
                          }`}
                          title={opt.description}
                        >
                          <PawnIcon type={opt.id} size={18} />
                          <span className="text-[8px] font-extrabold text-center select-none truncate w-full">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Preview 3D do Peão Refinado */}
              <div className="mt-5 flex items-center gap-3.5 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 shadow-inner">
                {/* SVG 3D Pawn Render */}
                <div className="flex-shrink-0">
                  <svg className="w-11 h-11 overflow-visible" viewBox="0 0 32 32">
                    <defs>
                      <radialGradient id={`setupGlossy-${idx}`} cx="30%" cy="30%" r="70%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                        <stop offset="45%" stopColor="#ffffff" stopOpacity="0.0" />
                        <stop offset="90%" stopColor="#000000" stopOpacity="0.35" />
                      </radialGradient>
                    </defs>
                    {/* Shadow base */}
                    <ellipse cx={16} cy={27} rx={10} ry={3} fill="rgba(0, 0, 0, 0.15)" />
                    {/* Pawn body sphere */}
                    <circle cx={16} cy={16} r={13} fill={team.color} stroke="#FFFFFF" strokeWidth={2.5} />
                    <circle cx={16} cy={16} r={13} fill={`url(#setupGlossy-${idx})`} />
                    {/* Inner symbol */}
                    <g transform="translate(8, 8)" className="text-white pointer-events-none">
                      <PawnIcon type={team.pawn} size={16} />
                    </g>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-slate-700 uppercase select-none">
                    Preview do Peão
                  </p>
                  <p className="text-[9px] text-slate-400 font-bold truncate">
                    {pawnOptions.find((p) => p.id === team.pawn)?.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="flex items-center gap-2.5 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-650 text-xs font-bold animate-shake">
          <AlertCircle size={15} />
          <span>{error}</span>
        </div>
      )}

      {/* Controles de Ação */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        {teamsData.length < 4 && (
          <button
            onClick={handleAddTeam}
            className="btn-3d-white w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-700 font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus size={15} />
            <span>Adicionar Equipe</span>
          </button>
        )}

        <button
          onClick={handleStartGame}
          className="btn-3d-indigo w-full sm:w-auto px-10 py-4 rounded-2xl text-white font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
        >
          <Play size={15} />
          <span>Iniciar Partida</span>
        </button>
      </div>
    </div>
  );
};
