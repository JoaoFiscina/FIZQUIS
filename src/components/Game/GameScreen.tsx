import React from "react";
import { useGameStore } from "../../store/gameStore";
import { Board } from "../Board/Board";
import { Dice } from "../Dice/Dice";
import { GameLog } from "./GameLog";
import { QuestionModal } from "../Questions/QuestionModal";
import { AreaSelector } from "../Questions/AreaSelector";
import { TargetSelectionModal } from "./TargetSelectionModal";
import { CellRevealCard } from "./CellRevealCard";
import { PawnIcon } from "../Board/PawnIcon";
import { RefreshCw, Gamepad2 } from "lucide-react";

export const GameScreen: React.FC = () => {
  const {
    teams,
    currentTeamIndex,
    phase,
    diceValue,
    rollDice,
    resetGame
  } = useGameStore();

  const activeTeam = teams[currentTeamIndex];
  if (!activeTeam) return null;

  const isRollDisabled = phase !== "waiting_roll";

  const handleRoll = () => {
    rollDice();
  };

  const getPhaseLabel = () => {
    switch (phase) {
      case "waiting_roll": return { text: "Aguardando Dado", cls: "text-indigo-600 bg-indigo-50 border-indigo-100" };
      case "rolling": return { text: "Sorteando...", cls: "text-purple-600 bg-purple-50 border-purple-100" };
      case "moving": return { text: "Movimentando", cls: "text-cyan-600 bg-cyan-50 border-cyan-100" };
      case "choosing_path": return { text: "Escolha o Caminho!", cls: "text-pink-600 bg-pink-50 border-pink-100" };
      case "choosing_target": return { text: "Escolha o Alvo!", cls: "text-orange-600 bg-orange-50 border-orange-100" };
      case "choosing_area": return { text: "Escolha a Área", cls: "text-pink-600 bg-pink-50 border-pink-100" };
      case "answering": return { text: "Respondendo...", cls: "text-amber-700 bg-amber-50 border-amber-100" };
      case "revealing_cell": return { text: "Revelando Casa", cls: "text-cyan-600 bg-cyan-50 border-cyan-100" };
      default: return { text: "", cls: "" };
    }
  };

  const phaseInfo = getPhaseLabel();

  return (
    <div className="h-screen flex flex-col overflow-hidden px-3 py-2 gap-2">
      {/* Modais e Overlays */}
      <QuestionModal />
      <AreaSelector />
      <TargetSelectionModal />
      {phase === "revealing_cell" && <CellRevealCard />}

      {/* Header compacto */}
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl border border-slate-100 shadow-sm shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
            <Gamepad2 size={16} />
          </div>
          <div>
            <h1 className="text-base font-black text-slate-800 tracking-wide uppercase leading-tight">Plantão Board</h1>
            <p className="text-[9px] text-slate-400 font-bold tracking-wider uppercase">Gincana Médica</p>
          </div>
        </div>

        {/* Status da equipe ativa inline */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white shadow-sm"
              style={{ backgroundColor: activeTeam.color }}
            >
              <PawnIcon type={activeTeam.pawn} size={14} />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-black uppercase leading-tight" style={{ color: activeTeam.color }}>
                {activeTeam.name}
              </p>
            </div>
          </div>

          {phaseInfo.text && (
            <span className={`font-bold uppercase tracking-wider text-[10px] px-2.5 py-1 rounded-lg border ${phaseInfo.cls}`}>
              {phaseInfo.text}
            </span>
          )}

          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black text-slate-400 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-500 hover:border-red-200 rounded-lg transition-all cursor-pointer"
          >
            <RefreshCw size={12} />
            <span className="hidden sm:inline">Reiniciar</span>
          </button>
        </div>
      </div>

      {/* Grid Principal - flex grow */}
      <div className="flex-1 flex gap-3 min-h-0">
        {/* Tabuleiro - ocupa o espaço principal */}
        <div className="flex-1 min-w-0">
          <Board />
        </div>

        {/* Painel Lateral Direito */}
        <div className="w-[260px] shrink-0 flex flex-col gap-2 min-h-0">
          {/* Placar de Equipes */}
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 shadow-sm shrink-0">
            <h3 className="text-[10px] font-black text-slate-500 tracking-wider uppercase mb-2">
              Plantonistas
            </h3>
            <div className="space-y-1.5">
              {teams.map((t, idx) => {
                const isActive = idx === currentTeamIndex && phase !== "game_over";
                return (
                  <div
                    key={t.id}
                    className={`p-2 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? "bg-slate-50 border-slate-200 shadow-sm"
                        : "bg-white border-transparent opacity-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: t.color }}
                      >
                        <PawnIcon type={t.pawn} size={12} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black truncate w-28" style={{ color: t.color }}>
                          {t.name}
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold">Casa {t.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {t.skipNextTurn && (
                        <span className="px-1.5 py-0.5 rounded text-[7px] font-black uppercase bg-red-50 text-red-500 border border-red-100">
                          Pula
                        </span>
                      )}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Controle do Dado */}
          <div className="bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center gap-2 shrink-0">
            <Dice onRoll={handleRoll} disabled={isRollDisabled} />
            {diceValue !== undefined && !isRollDisabled && (
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">
                Último: {diceValue} casas
              </p>
            )}
          </div>

          {/* Histórico / Logs - flex grow with internal scroll */}
          <div className="flex-1 min-h-0">
            <GameLog />
          </div>
        </div>
      </div>
    </div>
  );
};
