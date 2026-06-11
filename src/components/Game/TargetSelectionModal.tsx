import React from "react";
import { useGameStore } from "../../store/gameStore";
import { RefreshCw, UserMinus, CornerDownLeft } from "lucide-react";

export const TargetSelectionModal: React.FC = () => {
  const {
    teams,
    currentTeamIndex,
    phase,
    selectedCell,
    selectInteractionTarget,
    selectTrocaLeitoTarget
  } = useGameStore();

  if (phase !== "choosing_target" || !selectedCell) return null;

  const activeTeam = teams[currentTeamIndex];
  const effect = selectedCell.specialEffect;

  // Filtra candidatos com base no efeito
  let targetCandidates = teams.filter(t => t.id !== activeTeam.id);

  let title = "Escolha um Alvo";
  let description = "Selecione uma equipe adversária.";
  let Icon = UserMinus;

  if (effect === "troca_leito") {
    title = "Troca de Leito";
    description = "Selecione uma equipe à sua frente para trocar de posição no tabuleiro.";
    Icon = RefreshCw;
    // Somente equipes à frente
    targetCandidates = targetCandidates.filter(t => t.position > activeTeam.position);
  } else if (effect === "contra_referencia") {
    title = "Contra-referência";
    description = "Escolha uma equipe à sua frente para recuar 2 casas.";
    Icon = CornerDownLeft;
    // Somente equipes à frente
    targetCandidates = targetCandidates.filter(t => t.position > activeTeam.position);
  } else if (effect === "intercorrencia") {
    title = "Intercorrência";
    description = "Escolha um adversário para recuar 3 casas.";
    Icon = UserMinus;
  }

  const handleSelect = (targetId: string) => {
    if (effect === "troca_leito") {
      selectTrocaLeitoTarget(targetId);
    } else {
      selectInteractionTarget(targetId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-[32px] bg-white p-8 border-[6px] border-slate-800 text-center space-y-6 shadow-2xl animate-scale-up relative">
        {/* Costura tracejada interna do card físico */}
        <div className="absolute inset-1.5 border-[2px] border-dashed border-slate-200 rounded-[22px] pointer-events-none" />

        {/* Ícone Animado */}
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-inner relative z-10">
          <Icon size={28} className="animate-pulse" />
        </div>

        {/* Título e Descrição */}
        <div className="space-y-2 relative z-10">
          <h2 className="text-xl font-black text-slate-850 tracking-wide uppercase">{title}</h2>
          <p className="text-xs md:text-sm text-slate-500 font-bold leading-relaxed px-4">{description}</p>
        </div>

        {/* Candidatos a Alvo */}
        <div className="grid grid-cols-1 gap-3 relative z-10">
          {targetCandidates.length > 0 ? (
            targetCandidates.map(t => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className="w-full p-4 rounded-2xl border flex items-center justify-between hover:bg-slate-50 transition-all cursor-pointer font-bold btn-option-3d bg-white"
                style={{ borderColor: `${t.color}30`, borderLeft: `5px solid ${t.color}` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20 shadow-md"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-slate-800 text-sm font-black uppercase">{t.name}</span>
                </div>
                <span className="text-[10px] text-slate-550 font-black bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-lg shadow-sm">
                  Casa {t.position}
                </span>
              </button>
            ))
          ) : (
            <div className="p-5 text-xs text-slate-500 bg-slate-50 rounded-2xl border border-slate-150 font-bold leading-relaxed shadow-inner">
              Nenhuma equipe elegível encontrada no percurso! Passando a vez...
              <button
                onClick={() => handleSelect("")}
                className="mt-4 block w-full py-3 btn-3d-indigo text-white rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Continuar Jogando
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
