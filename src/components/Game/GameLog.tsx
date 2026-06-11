import React from "react";
import { useGameStore } from "../../store/gameStore";
import { ScrollText, Dice5, CheckCircle, XCircle, Sparkles } from "lucide-react";

export const GameLog: React.FC = () => {
  const { logs, teams } = useGameStore();

  const getLogStyle = (type: string) => {
    switch (type) {
      case "roll":
        return {
          icon: <Dice5 size={14} className="text-blue-600" />,
          bgColor: "bg-blue-50 border-blue-100 text-blue-800"
        };
      case "correct":
        return {
          icon: <CheckCircle size={14} className="text-green-600" />,
          bgColor: "bg-green-50 border-green-100 text-green-800"
        };
      case "wrong":
        return {
          icon: <XCircle size={14} className="text-red-650" />,
          bgColor: "bg-red-50 border-red-100 text-red-800"
        };
      case "bonus":
      case "effect":
        return {
          icon: <Sparkles size={14} className="text-purple-600" />,
          bgColor: "bg-purple-50 border-purple-100 text-purple-800"
        };
      case "penalty":
        return {
          icon: <XCircle size={14} className="text-orange-600" />,
          bgColor: "bg-orange-50 border-orange-100 text-orange-850"
        };
      default:
        return {
          icon: <ScrollText size={14} className="text-slate-400" />,
          bgColor: "bg-slate-50 border-slate-100 text-slate-600"
        };
    }
  };

  return (
    <div className="flex flex-col h-[280px] md:h-[400px] bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
        <ScrollText size={18} className="text-indigo-600" />
        <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Diário do Plantão</h3>
      </div>

      {/* Logs List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-2.5">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs text-slate-400 font-semibold italic">
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
                    <span className="text-[9px] text-slate-400 font-bold select-none">{log.timestamp}</span>
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
