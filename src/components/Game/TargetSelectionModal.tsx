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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl glass-premium p-6 border border-indigo-500/20 text-center space-y-6 shadow-2xl animate-scale-up">
        {/* Ícone Animado */}
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
          <Icon size={28} className="animate-pulse" />
        </div>

        {/* Título e Descrição */}
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white tracking-wide">{title}</h2>
          <p className="text-sm text-gray-400 leading-relaxed px-4">{description}</p>
        </div>

        {/* Candidatos a Alvo */}
        <div className="grid grid-cols-1 gap-2.5">
          {targetCandidates.length > 0 ? (
            targetCandidates.map(t => (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                className="w-full p-4 rounded-xl border text-left flex items-center justify-between hover:bg-white/5 transition-all cursor-pointer font-bold"
                style={{ borderColor: `${t.color}30`, backgroundColor: `${t.color}05` }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-4 h-4 rounded-full border border-white/20"
                    style={{ backgroundColor: t.color }}
                  />
                  <span className="text-white text-base">{t.name}</span>
                </div>
                <span className="text-xs text-gray-400 font-medium bg-white/5 px-2 py-0.5 rounded">
                  Casa {t.position}
                </span>
              </button>
            ))
          ) : (
            <div className="p-4 text-sm text-gray-500 bg-white/5 rounded-xl border border-white/5 font-semibold">
              Nenhuma equipe elegível encontrada! Passando a vez...
              <button
                onClick={() => handleSelect("")}
                className="mt-3 block w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Continuar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
