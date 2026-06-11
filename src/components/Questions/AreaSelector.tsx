import React from "react";
import { useGameStore } from "../../store/gameStore";
import { areaColors, areaNames } from "../../data/board";
import { HelpCircle } from "lucide-react";
import type { MedicalArea } from "../../types/questions";

export const AreaSelector: React.FC = () => {
  const { phase, chooseArea, teams, currentTeamIndex } = useGameStore();

  if (phase !== "choosing_area") return null;

  const activeTeam = teams[currentTeamIndex];

  const handleSelect = (area: MedicalArea) => {
    chooseArea(area);
  };

  const areas: MedicalArea[] = [
    "clinica",
    "cirurgia",
    "pediatria",
    "go",
    "preventiva",
    "urgencia"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[32px] bg-white p-8 border-[6px] border-slate-800 shadow-2xl animate-scale-up space-y-6 relative">
        {/* Costura tracejada interna do card físico */}
        <div className="absolute inset-1.5 border-[2px] border-dashed border-slate-200 rounded-[22px] pointer-events-none z-10" />

        {/* Header */}
        <div className="text-center space-y-2 relative z-10">
          <div className="mx-auto w-14 h-14 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600 shadow-inner">
            <HelpCircle size={26} className="animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-slate-850 tracking-wide uppercase pt-2">Efeito Curinga!</h2>
          <p className="text-xs md:text-sm text-slate-500 font-bold max-w-md mx-auto leading-relaxed">
            A equipe <span style={{ color: activeTeam.color }} className="font-black uppercase">{activeTeam.name}</span> pode escolher de qual especialidade médica será a pergunta da rodada.
          </p>
        </div>

        {/* Grade de Áreas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
          {areas.map((area) => {
            const color = areaColors[area];
            const name = areaNames[area];
            
            return (
              <button
                key={area}
                onClick={() => handleSelect(area)}
                className="p-4 rounded-2xl border flex items-center gap-3.5 cursor-pointer font-bold btn-option-3d bg-white transition-all duration-150"
                style={{ 
                  borderColor: `${color}30`, 
                  borderLeft: `5px solid ${color}`
                }}
              >
                <span 
                  className="w-4.5 h-4.5 rounded-full border border-white/20 shadow-md shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-slate-800 text-sm font-black uppercase text-left">
                  {name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
