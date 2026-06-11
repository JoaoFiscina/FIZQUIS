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
import { RefreshCw, VolumeX } from "lucide-react";

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
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6 md:space-y-8 animate-fade-in">
      {/* Modais e Overlays */}
      <QuestionModal />
      <AreaSelector />
      <TargetSelectionModal />
      {phase === "revealing_cell" && <CellRevealCard />}

      {/* Header do Jogo */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 md:px-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 text-indigo-600">
            <VolumeX size={20} className="opacity-40" /> {/* Ícone decorativo */}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-wide uppercase">Plantão Board</h1>
            <p className="text-xs text-slate-400 font-bold tracking-wider uppercase">Gincana Médica de Residência</p>
          </div>
        </div>

        {/* Botão de Reiniciar Partida */}
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black text-slate-500 border border-slate-200 bg-white hover:bg-red-50 hover:text-red-600 hover:border-red-200 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          <RefreshCw size={14} />
          <span>Reiniciar Jogo</span>
        </button>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Painel Esquerdo / Central: Tabuleiro, Status e Dado */}
        <div className="lg:col-span-3 space-y-6">
          {/* Status do Turno Ativo */}
          <div 
            className="p-5 rounded-2xl bg-white border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300"
            style={{
              borderColor: `${activeTeam.color}35`,
              boxShadow: `0 8px 30px -10px ${activeTeam.color}15`
            }}
          >
            <div className="flex items-center gap-4 text-center sm:text-left">
              {/* Círculo do Peão */}
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ 
                  backgroundColor: activeTeam.color,
                  filter: `drop-shadow(0 4px 6px ${activeTeam.color}40)`
                }}
              >
                <PawnIcon type={activeTeam.pawn} size={24} />
              </div>
              
              <div className="space-y-1">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">RODADA DA EQUIPE</span>
                <h2 className="text-lg font-black uppercase" style={{ color: activeTeam.color }}>
                  {activeTeam.name}
                </h2>
              </div>
            </div>

            {/* Status da Ação */}
            <div className="text-sm font-semibold text-slate-600">
              {phase === "waiting_roll" && (
                <span className="text-indigo-600 font-bold uppercase tracking-wider animate-pulse text-xs bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-lg">
                  Aguardando Rolar Dado
                </span>
              )}
              {phase === "rolling" && (
                <span className="text-purple-600 font-bold uppercase tracking-wider animate-pulse text-xs bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-lg">
                  Sorteando Dado...
                </span>
              )}
              {phase === "moving" && (
                <span className="text-cyan-600 font-bold uppercase tracking-wider animate-pulse text-xs bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded-lg">
                  Peão se movimentando...
                </span>
              )}
              {phase === "choosing_path" && (
                <span className="text-pink-600 font-bold uppercase tracking-wider animate-bounce text-xs bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-lg">
                  Escolha um Caminho no Mapa!
                </span>
              )}
              {phase === "choosing_target" && (
                <span className="text-orange-600 font-bold uppercase tracking-wider animate-bounce text-xs bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg">
                  Escolha o Alvo da Penalidade!
                </span>
              )}
              {phase === "choosing_area" && (
                <span className="text-pink-600 font-bold uppercase tracking-wider animate-pulse text-xs bg-pink-50 border border-pink-100 px-3 py-1.5 rounded-lg">
                  Escolhendo Área da Pergunta
                </span>
              )}
              {phase === "answering" && (
                <span className="text-yellow-700 font-bold uppercase tracking-wider animate-pulse text-xs bg-yellow-50 border border-yellow-100 px-3 py-1.5 rounded-lg">
                  Respondendo Plantão Médico...
                </span>
              )}
            </div>
          </div>

          {/* O Tabuleiro */}
          <Board />
        </div>

        {/* Painel Direito: Placar / Equipes e Logs */}
        <div className="space-y-6 flex flex-col justify-between">
          {/* Placar de Equipes */}
          <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase border-b border-slate-100 pb-2.5">
              Quadro de Plantonistas
            </h3>
            
            <div className="space-y-2.5">
              {teams.map((t, idx) => {
                const isActive = idx === currentTeamIndex && phase !== "game_over";

                return (
                  <div
                    key={t.id}
                    className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-300 ${
                      isActive
                        ? "bg-slate-50 border-slate-200 shadow-sm font-semibold"
                        : "bg-white border-transparent opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Círculo do Peão */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: t.color }}
                      >
                        <PawnIcon type={t.pawn} size={16} />
                      </div>
                      
                      <div className="min-w-0">
                        <p className="text-sm font-black truncate w-32 md:w-40" style={{ color: t.color }}>
                          {t.name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          Casa {t.position}
                        </p>
                      </div>
                    </div>

                    {/* Alertas (ex: Pular rodada) */}
                    <div className="flex items-center gap-1.5">
                      {t.skipNextTurn && (
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase bg-red-50 text-red-600 border border-red-100">
                          Dobrou Plantão
                        </span>
                      )}
                      {isActive && (
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* O Controle do Dado (Centralizado/Grande na Lateral) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
            <h4 className="text-xs font-black text-slate-450 uppercase tracking-widest">
              Controle de Jogada
            </h4>
            <Dice onRoll={handleRoll} disabled={isRollDisabled} />
            {diceValue !== undefined && !isRollDisabled && (
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Última rolagem: {diceValue} casas
              </p>
            )}
          </div>

          {/* Histórico / Logs */}
          <GameLog />
        </div>
      </div>
    </div>
  );
};
