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
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div 
        className="w-full max-w-lg rounded-3xl glass-premium p-8 md:p-12 text-center border border-indigo-500/20 shadow-2xl space-y-8 animate-scale-up"
        style={{
          boxShadow: `0 10px 50px -10px ${winnerTeam.color}35, 0 0 0 1px rgba(99, 102, 241, 0.1)`
        }}
      >
        {/* Ícone de Troféu Brilhante */}
        <div className="relative mx-auto w-24 h-24 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-yellow-400">
          <Trophy size={48} className="animate-bounce" />
          <div className="absolute inset-0 rounded-full border-2 border-yellow-400/20 animate-ping" />
        </div>

        {/* Informações da Vitória */}
        <div className="space-y-3">
          <span className="text-[10px] font-black text-indigo-400 tracking-widest uppercase bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            Temos uma vencedora!
          </span>
          <h2 className="text-3xl font-black text-white leading-tight uppercase">
            Vitória da Equipe
          </h2>
          <h3 className="text-2xl font-black uppercase tracking-wide" style={{ color: winnerTeam.color }}>
            {winnerTeam.name}
          </h3>
        </div>

        {/* Visual do Peão Vencedor */}
        <div className="flex justify-center">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center text-black shadow-2xl relative"
            style={{ 
              backgroundColor: winnerTeam.color,
              filter: `drop-shadow(0 0 15px ${winnerTeam.color}80)`
            }}
          >
            <PawnIcon type={winnerTeam.pawn} size={40} />
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto font-medium">
          O plantão finalmente acabou! Esta equipe demonstrou condutas impecáveis, superou as intercorrências do round e conquistou a tão sonhada vaga na residência.
        </p>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <button
            onClick={resetGame}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          >
            <RefreshCw size={16} />
            <span>Jogar Novamente</span>
          </button>
          
          <button
            onClick={resetGame}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar ao Menu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
