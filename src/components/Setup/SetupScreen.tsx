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
    
    // Encontrar uma cor e peão não usados
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
    // 1. Validar nomes vazios
    const hasEmptyName = teamsData.some((t) => !t.name.trim());
    if (hasEmptyName) {
      setError("Por favor, dê um nome para todas as equipes!");
      return;
    }

    // 2. Validar peões repetidos
    const pawns = teamsData.map((t) => t.pawn);
    const hasDuplicatePawns = new Set(pawns).size !== pawns.length;
    if (hasDuplicatePawns) {
      setError("Cada equipe deve escolher um peão exclusivo! Sem disputas pelo estetoscópio.");
      return;
    }

    // 3. Validar cores repetidas
    const colors = teamsData.map((t) => t.color);
    const hasDuplicateColors = new Set(colors).size !== colors.length;
    if (hasDuplicateColors) {
      setError("Cada equipe deve escolher uma cor exclusiva!");
      return;
    }

    initializeGame(teamsData);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8 animate-fade-in">
      {/* Cabeçalho */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-black text-white tracking-wide uppercase">Configuração das Equipes</h2>
        <p className="text-sm text-gray-400">Monte o plantão com 2 a 4 equipes e defina seus peões.</p>
      </div>

      {/* Grid de Equipes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teamsData.map((team, idx) => {
          const usedPawns = teamsData.map((t, i) => (i !== idx ? t.pawn : null)).filter(Boolean);
          const usedColors = teamsData.map((t, i) => (i !== idx ? t.color : null)).filter(Boolean);

          return (
            <div
              key={idx}
              className="relative p-6 rounded-2xl glass border border-white/5 space-y-5 flex flex-col justify-between transition-all duration-300"
              style={{
                boxShadow: `0 8px 30px -10px ${team.color}25, inset 0 0 20px rgba(255,255,255,0.01)`
              }}
            >
              {/* Botão de Excluir Equipe */}
              {teamsData.length > 2 && (
                <button
                  onClick={() => handleRemoveTeam(idx)}
                  className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors p-1.5 hover:bg-white/5 rounded-lg cursor-pointer"
                  title="Remover Equipe"
                >
                  <Trash2 size={16} />
                </button>
              )}

              <div className="space-y-4">
                {/* Número da Equipe */}
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black"
                    style={{ backgroundColor: team.color }}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                    Equipe {idx + 1}
                  </span>
                </div>

                {/* Input de Nome */}
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-gray-500" />
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => handleUpdateTeam(idx, { name: e.target.value })}
                    className="w-full bg-black/40 border border-white/5 rounded-xl py-3 pl-11 pr-4 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                    placeholder="Nome da Equipe..."
                    maxLength={25}
                  />
                </div>

                {/* Seletor de Cores */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider block">Escolha a Cor</label>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_COLORS.map((c) => {
                      const isColorUsed = usedColors.includes(c);
                      const isSelected = team.color === c;

                      return (
                        <button
                          key={c}
                          disabled={isColorUsed}
                          onClick={() => handleUpdateTeam(idx, { color: c })}
                          className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                            isColorUsed ? "opacity-15 cursor-not-allowed scale-75" : ""
                          } ${
                            isSelected ? "scale-115 border-white shadow-lg" : "border-transparent hover:scale-105"
                          }`}
                          style={{ backgroundColor: c, boxShadow: isSelected ? `0 0 10px ${c}` : undefined }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Seletor de Peões */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-wider block">Escolha o Peão</label>
                  <div className="grid grid-cols-4 gap-2">
                    {pawnOptions.map((opt) => {
                      const isPawnUsed = usedPawns.includes(opt.id);
                      const isSelected = team.pawn === opt.id;

                      return (
                        <button
                          key={opt.id}
                          disabled={isPawnUsed}
                          onClick={() => handleUpdateTeam(idx, { pawn: opt.id })}
                          className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                            isPawnUsed
                              ? "opacity-10 cursor-not-allowed bg-black/20 border-transparent text-gray-700"
                              : isSelected
                              ? "border-white bg-white/10 text-white"
                              : "border-white/5 bg-black/30 text-gray-400 hover:bg-white/5 hover:text-white cursor-pointer"
                          }`}
                          title={opt.description}
                        >
                          <PawnIcon type={opt.id} size={20} />
                          <span className="text-[9px] font-semibold text-center select-none truncate w-full">
                            {opt.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Preview do Peão */}
              <div className="mt-4 flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-black shadow-inner"
                  style={{ backgroundColor: team.color }}
                >
                  <PawnIcon type={team.pawn} size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white uppercase select-none">
                    Preview do Peão
                  </p>
                  <p className="text-[10px] text-gray-500 font-medium truncate">
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
        <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold animate-shake">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {/* Controles de Ação do Setup */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        {teamsData.length < 4 && (
          <button
            onClick={handleAddTeam}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Adicionar Equipe</span>
          </button>
        )}

        <button
          onClick={handleStartGame}
          className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] animate-pulse-ring"
        >
          <Play size={16} />
          <span>Iniciar Partida</span>
        </button>
      </div>
    </div>
  );
};
