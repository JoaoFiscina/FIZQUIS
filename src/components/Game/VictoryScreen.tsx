import React, { useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { PawnIcon } from "../Board/PawnIcon";
import { Trophy, RefreshCw, ArrowLeft } from "lucide-react";
import confetti from "canvas-confetti";

export const VictoryScreen: React.FC = () => {
  const { winnerTeamId, teams, resetGame } = useGameStore();

  const winnerTeam = teams.find(t => t.id === winnerTeamId);

  useEffect(() => {
    if (!winnerTeam) return;

    // Dispara rajadas de confete repetidas para uma comemoração premium
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetes das duas laterais
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, [winnerTeam]);

  if (!winnerTeam) return null;

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg rounded-[32px] bg-white p-8 md:p-12 text-center border-[6px] border-slate-800 shadow-2xl space-y-8 animate-scale-up relative"
        style={{
          boxShadow: `0 20px 50px -10px ${winnerTeam.color}30, 0 0 0 1px rgba(0, 0, 0, 0.02)`
        }}
      >
        {/* Costura tracejada interna do card físico */}
        <div className="absolute inset-1.5 border-[2px] border-dashed border-slate-200 rounded-[22px] pointer-events-none z-10" />

        {/* Ícone de Troféu Brilhante */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-yellow-50 border border-yellow-100 flex items-center justify-center text-yellow-600 z-10">
          <Trophy size={48} className="animate-bounce" />
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 animate-ping" />
        </div>

        {/* Informações da Vitória */}
        <div className="space-y-3 relative z-10">
          <span className="text-[9px] font-black text-indigo-755 tracking-widest uppercase bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full shadow-sm">
            Temos uma vencedora!
          </span>
          <h2 className="text-3xl font-black text-slate-800 leading-tight uppercase pt-2">
            Vitória da Equipe
          </h2>
          <h3 className="text-2xl font-black uppercase tracking-wide" style={{ color: winnerTeam.color }}>
            {winnerTeam.name}
          </h3>
        </div>

        {/* Visual do Peão Vencedor */}
        <div className="flex justify-center relative z-10">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-white shadow-lg relative border-4 border-white"
            style={{ 
              backgroundColor: winnerTeam.color,
              filter: `drop-shadow(0 8px 12px ${winnerTeam.color}40)`
            }}
          >
            <PawnIcon type={winnerTeam.pawn} size={40} />
          </div>
        </div>

        <p className="text-slate-650 text-sm leading-relaxed max-w-sm mx-auto font-semibold relative z-10">
          O plantão finalmente acabou! Esta equipe demonstrou condutas impecáveis, superou as intercorrências do round e conquistou a tão sonhada vaga na residência.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 relative z-10">
          <button
            onClick={resetGame}
            className="btn-3d-indigo w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Jogar Novamente</span>
          </button>
          
          <button
            onClick={resetGame}
            className="btn-3d-white w-full sm:w-auto px-6 py-3.5 rounded-2xl text-slate-700 font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Voltar ao Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
