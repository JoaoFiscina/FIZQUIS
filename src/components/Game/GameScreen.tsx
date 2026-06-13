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



  return (
    <div className="h-screen flex flex-col overflow-hidden px-3 py-2 gap-2">
      {/* Modais e Overlays */}
      <QuestionModal />
      <AreaSelector />
      <TargetSelectionModal />
      {phase === "revealing_cell" && <CellRevealCard />}
      {/* Header compacto */}
      <div className="flex items-center justify-between bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-[18px] border-2 border-slate-100/80 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7.5 h-7.5 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100/70 text-indigo-650 shadow-inner">
            <Gamepad2 size={14} />
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-black text-slate-800 tracking-wide uppercase leading-none">Plantão Board</h1>
            <p className="text-[7px] md:text-[8px] text-slate-400 font-extrabold tracking-widest uppercase mt-0.5">Gincana Universitária</p>
          </div>
        </div>

        <button
          onClick={resetGame}
          className="btn-3d-white flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[8px] md:text-[9px] font-black tracking-wider uppercase text-slate-500 hover:text-red-500 cursor-pointer shadow-sm"
        >
          <RefreshCw size={9} />
          <span>Reiniciar</span>
        </button>
      </div>

      {/* Grid Principal - flex grow */}
      <div className="flex-1 flex gap-2.5 min-h-0">
        {/* Tabuleiro - ocupa o espaço principal e contém controles flutuantes */}
        <div className="flex-1 min-w-0 relative h-full flex items-center justify-center">
          <Board />

          {/* Turn Badge - Floating Top-Center */}
          <div className="absolute top-3.5 left-1/2 transform -translate-x-1/2 z-10 flex items-center gap-2.5 bg-white/95 backdrop-blur-md py-1.5 px-4 rounded-full border border-slate-200/50 shadow-md">
            <div
              className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-white shadow-sm shrink-0"
              style={{ backgroundColor: activeTeam.color }}
            >
              <PawnIcon type={activeTeam.pawn} size={10} />
            </div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Turno atual:</span>
            <span className="text-xs font-black uppercase tracking-wide" style={{ color: activeTeam.color }}>
              {activeTeam.name}
            </span>
            <span className="text-slate-350 font-bold">•</span>
            <span className={`text-[9px] font-black uppercase tracking-widest ${
              phase === "waiting_roll" ? "text-indigo-650" :
              phase === "rolling" ? "text-purple-650 animate-pulse" :
              phase === "moving" ? "text-cyan-600 animate-pulse" :
              phase === "choosing_path" ? "text-pink-600 animate-bounce" :
              phase === "choosing_target" ? "text-orange-600" :
              phase === "choosing_area" ? "text-pink-600" :
              "text-amber-700"
            }`}>
              {phase === "waiting_roll" ? "Aguardando Dado" :
               phase === "rolling" ? "Sorteando..." :
               phase === "moving" ? "Movimentando..." :
               phase === "choosing_path" ? "Escolha a Rota!" :
               phase === "choosing_target" ? "Escolha o Alvo" :
               phase === "choosing_area" ? "Escolha a Área" :
               phase === "revealing_cell" ? "Revelando Casa" :
               "Respondendo..."}
            </span>
          </div>

          {/* Dice Control - Floating Top-Right */}
          <div className="absolute top-3.5 right-3.5 z-10 bg-white/95 backdrop-blur-md p-2.5 rounded-[22px] border border-slate-200/60 shadow-lg w-52 flex flex-col items-center gap-1.5 select-none">
            <Dice onRoll={handleRoll} disabled={isRollDisabled} />
            {diceValue !== undefined && !isRollDisabled && (
              <p className="text-[8px] text-slate-400 font-extrabold uppercase tracking-widest bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full shadow-inner">
                Último Giro: {diceValue} casas
              </p>
            )}
          </div>
        </div>

        {/* Painel Lateral Direito */}
        <div className="w-[250px] shrink-0 flex flex-col gap-2.5 min-h-0">
          {/* Placar de Equipes */}
          <div className="bg-white/95 backdrop-blur-sm p-2.5 rounded-[20px] border-2 border-slate-100 shadow-md shrink-0">
            <h3 className="text-[9px] font-black text-slate-450 tracking-widest uppercase mb-2 block text-left">
              Plantonistas
            </h3>
            <div className="space-y-1">
              {teams.map((t, idx) => {
                const isActive = idx === currentTeamIndex && phase !== "game_over";
                return (
                  <div
                    key={t.id}
                    className={`p-1.5 px-2 rounded-xl border flex items-center justify-between transition-all duration-250 ${
                      isActive
                        ? "bg-slate-50 border-slate-200 shadow-sm font-bold scale-[1.01]"
                        : "bg-white border-slate-50 opacity-60"
                    }`}
                    style={isActive ? { borderLeft: `4px solid ${t.color}` } : undefined}
                  >
                    <div className="flex items-center gap-2 min-w-0 text-left">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0"
                        style={{ backgroundColor: t.color }}
                      >
                        <PawnIcon type={t.pawn} size={9} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] font-black truncate w-28" style={{ color: t.color }}>
                          {t.name}
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold leading-none mt-0.5">Casa {t.position}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {t.skipNextTurn && (
                        <span className="px-1.5 py-0.5 rounded-md text-[7px] font-black uppercase bg-red-50 text-red-500 border border-red-100">
                          Pula
                        </span>
                      )}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse border-2 border-white shadow-sm" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Diário de Ocorrências / Logs */}
          <div className="flex-1 min-h-0">
            <GameLog />
          </div>
        </div>
      </div>
    </div>
  );
};
