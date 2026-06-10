import React from "react";
import { useGameStore } from "../../store/gameStore";
import { ScrollText, Dice5, CheckCircle, XCircle, Sparkles } from "lucide-react";

export const GameLog: React.FC = () => {
  const { logs, teams } = useGameStore();

  const getLogStyle = (type: string) => {
    switch (type) {
      case "roll":
        return {
          icon: <Dice5 size={14} className="text-blue-400" />,
          bgColor: "bg-blue-500/10 border-blue-500/15 text-blue-300"
        };
      case "correct":
        return {
          icon: <CheckCircle size={14} className="text-green-400" />,
          bgColor: "bg-green-500/10 border-green-500/15 text-green-300"
        };
      case "wrong":
        return {
          icon: <XCircle size={14} className="text-red-400" />,
          bgColor: "bg-red-500/10 border-red-500/15 text-red-300"
        };
      case "bonus":
      case "effect":
        return {
          icon: <Sparkles size={14} className="text-purple-400 animate-pulse" />,
          bgColor: "bg-purple-500/10 border-purple-500/15 text-purple-300"
        };
      case "penalty":
        return {
          icon: <XCircle size={14} className="text-orange-400" />,
          bgColor: "bg-orange-500/10 border-orange-500/15 text-orange-300"
        };
      default:
        return {
          icon: <ScrollText size={14} className="text-gray-400" />,
          bgColor: "bg-gray-800/20 border-white/5 text-gray-400"
        };
    }
  };

  return (
    <div className="flex flex-col h-[280px] md:h-[400px] glass rounded-2xl border border-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center gap-2 bg-white/5">
        <ScrollText size={18} className="text-indigo-400" />
        <h3 className="text-sm font-black text-white tracking-wide uppercase">Diário do Plantão</h3>
      </div>

      {/* Logs List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-gray-500 font-semibold italic">
            Nenhuma ocorrência registrada até agora...
          </div>
        ) : (
          logs.map((log) => {
            const style = getLogStyle(log.type);
            const team = teams.find(t => t.id === log.teamId);

            return (
              <div
                key={log.id}
                className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs transition-all duration-200 hover:scale-[1.01] ${style.bgColor}`}
              >
                <span className="mt-0.5 shrink-0">{style.icon}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    {team && (
                      <span className="font-extrabold uppercase text-[10px]" style={{ color: team.color }}>
                        {team.name}
                      </span>
                    )}
                    <span className="text-[9px] text-gray-500 font-bold select-none">{log.timestamp}</span>
                  </div>
                  <p className="font-medium leading-relaxed">{log.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
