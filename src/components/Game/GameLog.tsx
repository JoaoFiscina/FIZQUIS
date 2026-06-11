import React from "react";
import { useGameStore } from "../../store/gameStore";
import { ScrollText, Dice5, CheckCircle, XCircle, Sparkles } from "lucide-react";

export const GameLog: React.FC = () => {
  const { logs, teams } = useGameStore();

  const getLogStyle = (type: string) => {
    switch (type) {
      case "roll":
        return {
          icon: <Dice5 size={12} className="text-blue-500" />,
          bgColor: "bg-blue-50/80 border-blue-100 text-blue-700"
        };
      case "correct":
        return {
          icon: <CheckCircle size={12} className="text-green-500" />,
          bgColor: "bg-green-50/80 border-green-100 text-green-700"
        };
      case "wrong":
        return {
          icon: <XCircle size={12} className="text-red-500" />,
          bgColor: "bg-red-50/80 border-red-100 text-red-700"
        };
      case "bonus":
      case "effect":
        return {
          icon: <Sparkles size={12} className="text-purple-500" />,
          bgColor: "bg-purple-50/80 border-purple-100 text-purple-700"
        };
      case "penalty":
        return {
          icon: <XCircle size={12} className="text-orange-500" />,
          bgColor: "bg-orange-50/80 border-orange-100 text-orange-700"
        };
      default:
        return {
          icon: <ScrollText size={12} className="text-slate-400" />,
          bgColor: "bg-slate-50/80 border-slate-100 text-slate-600"
        };
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/95 backdrop-blur-sm rounded-[20px] border-2 border-slate-100 overflow-hidden shadow-md">
      {/* Header */}
      <div className="px-3 py-2 bg-slate-50/50 border-b border-slate-100 flex items-center gap-1.5 shrink-0">
        <ScrollText size={14} className="text-indigo-500" />
        <h3 className="text-[10px] font-black text-slate-600 tracking-wider uppercase">Diário de Ocorrências</h3>
      </div>

      {/* Logs List - scrollable */}
      <div className="flex-1 p-2 overflow-y-auto space-y-1.5 min-h-0">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[10px] text-slate-400 font-semibold italic">
            Nenhuma ocorrência...
          </div>
        ) : (
          logs.map((log) => {
            const style = getLogStyle(log.type);
            const team = teams.find(t => t.id === log.teamId);

            return (
              <div
                key={log.id}
                className={`p-2 rounded-xl border flex items-start gap-2 text-[10px] ${style.bgColor}`}
              >
                <span className="mt-0.5 shrink-0">{style.icon}</span>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    {team && (
                      <span className="font-extrabold uppercase text-[9px] truncate" style={{ color: team.color }}>
                        {team.name}
                      </span>
                    )}
                    <span className="text-[8px] text-slate-400 font-bold select-none shrink-0">{log.timestamp}</span>
                  </div>
                  <p className="font-medium leading-snug text-[10px]">{log.text}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
