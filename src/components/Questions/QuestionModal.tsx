import React, { useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { areaColors, areaNames } from "../../data/board";
import { HelpCircle, Sparkles, Send, Check, X } from "lucide-react";

export const QuestionModal: React.FC = () => {
  const {
    activeQuestion,
    teams,
    currentTeamIndex,
    phase,
    selectedCell,
    eliminatedOptions,
    passPlantaoTargetTeamId,
    eliminateTwoOptions,
    passPlantao,
    answerQuestion,
    applyResolution
  } = useGameStore();

  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | "D" | null>(null);
  const [showTargetSelect, setShowTargetSelect] = useState(false);

  if (!activeQuestion || !selectedCell) return null;

  const activeTeam = teams[currentTeamIndex];
  const isAnswering = phase === "answering";
  const isResolving = phase === "resolving";
  const areaColor = areaColors[activeQuestion.area];
  
  // Equipe que de fato está respondendo (no caso de passar o plantão)
  const respondingTeam = passPlantaoTargetTeamId
    ? teams.find(t => t.id === passPlantaoTargetTeamId)!
    : activeTeam;

  const handleOptionClick = (opt: "A" | "B" | "C" | "D") => {
    if (!isAnswering || eliminatedOptions.includes(opt)) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || !isAnswering) return;
    answerQuestion(selectedOption);
  };

  const handleContinue = () => {
    applyResolution();
    setSelectedOption(null);
  };

  // Filtra outros times para passar o plantão
  const opponentTeams = teams.filter(t => t.id !== activeTeam.id);

  const getDifficultyLabel = (diff: string) => {
    switch (diff) {
      case "facil":
        return { label: "Fácil", className: "bg-green-50 text-green-700 border-green-200" };
      case "media":
        return { label: "Média", className: "bg-yellow-50 text-yellow-700 border-yellow-200" };
      case "dificil":
        return { label: "Difícil", className: "bg-red-50 text-red-700 border-red-200" };
      default:
        return { label: "Média", className: "bg-yellow-50 text-yellow-700 border-yellow-200" };
    }
  };

  const diffInfo = getDifficultyLabel(activeQuestion.difficulty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white overflow-x-hidden border border-slate-100 shadow-2xl animate-scale-up"
        style={{
          boxShadow: `0 15px 40px -10px ${areaColor}25, 0 0 0 1px rgba(0, 0, 0, 0.02)`
        }}
      >
        {/* Header da Pergunta */}
        <div 
          className="p-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-500"
          style={{ background: `linear-gradient(to right, ${areaColor}08, transparent)` }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/20"
              style={{ backgroundColor: areaColor }}
            />
            <span className="text-slate-800 text-base tracking-wide font-black">
              {areaNames[activeQuestion.area]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${diffInfo.className}`}>
              {diffInfo.label}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-650 font-bold uppercase tracking-wider text-xs">
              {selectedCell.label}
            </span>
          </div>
        </div>

        {/* Corpo da Pergunta */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Turno da equipe */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="font-semibold">Vez da equipe: </span>
              <span className="font-bold text-sm" style={{ color: activeTeam.color }}>
                {activeTeam.name}
              </span>
            </div>
            {passPlantaoTargetTeamId && (
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100 px-2 py-0.5 rounded-md font-bold">
                <Send size={12} />
                <span>Respondendo: {respondingTeam.name}</span>
              </div>
            )}
          </div>

          {/* Enunciado do caso clínico */}
          <p className="text-slate-700 text-base md:text-lg font-semibold leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-100">
            {activeQuestion.statement}
          </p>

          {/* Botões de Ação Especiais (Dupla Checagem e Passa o Plantão) */}
          {isAnswering && !showTargetSelect && (
            <div className="flex flex-wrap gap-3">
              {/* Dupla Checagem */}
              {selectedCell.specialEffect === "dupla_checagem" && eliminatedOptions.length === 0 && (
                <button
                  onClick={eliminateTwoOptions}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100/70 transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles size={14} />
                  <span>Dupla Checagem (Eliminar 2 Erradas)</span>
                </button>
              )}

              {/* Passa o Plantão */}
              {selectedCell.specialEffect === "passa_plantao" && !passPlantaoTargetTeamId && (
                <button
                  onClick={() => setShowTargetSelect(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100/70 transition-all cursor-pointer shadow-sm"
                >
                  <Send size={14} />
                  <span>Passar o Plantão</span>
                </button>
              )}
            </div>
          )}

          {/* Menu de seleção de Alvo do Passa Plantão */}
          {showTargetSelect && (
            <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3">
              <p className="text-xs font-bold text-purple-750 uppercase tracking-wider">Escolha quem responderá o plantão:</p>
              <div className="flex flex-wrap gap-2">
                {opponentTeams.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      passPlantao(t.id);
                      setShowTargetSelect(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold border text-slate-800 hover:bg-white transition-all cursor-pointer shadow-sm"
                    style={{ borderColor: `${t.color}30`, backgroundColor: `${t.color}05` }}
                  >
                    {t.name}
                  </button>
                ))}
                <button
                  onClick={() => setShowTargetSelect(false)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Alternativas A, B, C e D */}
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(activeQuestion.options).map(([key, value]) => {
              const optKey = key as "A" | "B" | "C" | "D";
              const isEliminated = eliminatedOptions.includes(optKey);
              const isSelected = selectedOption === optKey;
              
              let cardStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300";
              let badgeStyle = "bg-slate-200 text-slate-600";

              if (isEliminated) {
                cardStyle = "opacity-20 bg-slate-100 border-transparent text-slate-350 cursor-not-allowed line-through";
                badgeStyle = "bg-slate-150 text-slate-400";
              } else if (isAnswering) {
                if (isSelected) {
                  cardStyle = `bg-indigo-50 border-indigo-500 text-indigo-700 ring-2 ring-indigo-100 font-bold`;
                  badgeStyle = "bg-indigo-600 text-white";
                }
              } else if (isResolving) {
                const isCorrectOpt = optKey === activeQuestion.correctAnswer;
                if (isCorrectOpt) {
                  cardStyle = "bg-green-50 border-green-500 text-green-800 shadow-sm font-bold";
                  badgeStyle = "bg-green-600 text-white";
                } else if (isSelected) {
                  cardStyle = "bg-red-50 border-red-500 text-red-850 shadow-sm font-semibold";
                  badgeStyle = "bg-red-500 text-white";
                }
              }

              return (
                <button
                  key={optKey}
                  onClick={() => handleOptionClick(optKey)}
                  disabled={!isAnswering || isEliminated}
                  className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-205 ${cardStyle} ${
                    isAnswering && !isEliminated ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-black transition-colors ${badgeStyle}`}>
                    {optKey}
                  </span>
                  <span className="flex-1 text-sm font-semibold text-slate-750">{value}</span>

                  {/* Icones de Feedback de Acerto/Erro */}
                  {isResolving && optKey === activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  {isResolving && isSelected && optKey !== activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-700">
                      <X size={14} strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback de Resposta e Explicação do Caso Clínico */}
          {isResolving && (
            <div 
              className="p-5 rounded-xl border animate-slide-up space-y-2"
              style={{
                backgroundColor: `${areaColor}05`,
                borderColor: `${areaColor}15`
              }}
            >
              <div className="flex items-center gap-2 text-sm font-black tracking-wider uppercase" style={{ color: areaColor }}>
                <HelpCircle size={16} />
                <span>Discussão de Conduta / Justificativa</span>
              </div>
              <p className="text-slate-600 text-sm font-medium leading-relaxed">
                {activeQuestion.explanation}
              </p>
              {activeQuestion.source && (
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-2">
                  Fonte: {activeQuestion.source}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          {isAnswering ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                selectedOption
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-md shadow-indigo-100/50 hover:shadow-indigo-200/50"
                  : "bg-slate-200 text-slate-400 border border-slate-350 cursor-not-allowed"
              }`}
            >
              Submeter Conduta
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white cursor-pointer shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/70"
            >
              Continuar Turno
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
