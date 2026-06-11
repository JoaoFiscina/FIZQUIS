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
      <div className="w-full max-w-xl rounded-3xl bg-white p-6 border border-slate-100 shadow-2xl animate-scale-up space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-600">
            <HelpCircle size={24} className="animate-pulse" />
          </div>
          <h2 className="text-xl font-black text-slate-800 tracking-wide">Efeito Curinga!</h2>
          <p className="text-sm text-slate-500 font-semibold">
            A equipe <span style={{ color: activeTeam.color }} className="font-extrabold">{activeTeam.name}</span> pode escolher de qual especialidade médica será a pergunta da rodada.
          </p>
        </div>

        {/* Grade de Áreas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {areas.map((area) => {
            const color = areaColors[area];
            const name = areaNames[area];
            
            return (
              <button
                key={area}
                onClick={() => handleSelect(area)}
                className="p-5 rounded-xl border text-left flex items-center gap-3.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group shadow-sm hover:bg-slate-50"
                style={{ 
                  borderColor: `${color}20`, 
                  backgroundColor: `${color}05`,
                }}
              >
                <span 
                  className="w-4.5 h-4.5 rounded-full border border-white/20 group-hover:scale-110 transition-transform shadow-inner"
                  style={{ backgroundColor: color }}
                />
                <span className="text-slate-800 text-base font-black group-hover:text-slate-950 transition-all">
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
