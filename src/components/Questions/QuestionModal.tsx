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
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-white overflow-x-hidden border-[6px] border-slate-800 shadow-2xl animate-scale-up"
        style={{
          boxShadow: `0 20px 45px -10px ${areaColor}30, 0 0 0 1px rgba(0, 0, 0, 0.02)`
        }}
      >
        <div className="absolute inset-1.5 border-[2px] border-dashed border-slate-200 rounded-[22px] pointer-events-none" />

        <div 
          className="p-5 border-b-2 border-slate-100 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-500 relative z-10"
          style={{ background: `linear-gradient(to right, ${areaColor}08, transparent)` }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: areaColor }}
            />
            <span className="text-slate-800 text-base tracking-wide font-black uppercase">
              {areaNames[activeQuestion.area]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-sm ${diffInfo.className}`}>
              {diffInfo.label}
            </span>
            <span className="text-slate-350 font-black">•</span>
            <span className="text-indigo-650 font-black uppercase tracking-wider text-xs bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg shadow-sm">
              {selectedCell.label}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6 relative z-10">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="font-bold uppercase tracking-wider text-[10px]">Vez de: </span>
              <span className="font-black text-sm uppercase" style={{ color: activeTeam.color }}>
                {activeTeam.name}
              </span>
            </div>
            {passPlantaoTargetTeamId && (
              <div className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-xl font-bold shadow-sm">
                <Send size={12} />
                <span className="text-[10px] uppercase">Respondendo: {respondingTeam.name}</span>
              </div>
            )}
          </div>

          <p className="text-slate-700 text-base md:text-lg font-bold leading-relaxed bg-slate-50/75 p-5 rounded-[20px] border border-slate-100/80 shadow-inner">
            {activeQuestion.statement}
          </p>

          {isAnswering && !showTargetSelect && (
            <div className="flex flex-wrap gap-3">
              {selectedCell.specialEffect === "dupla_checagem" && eliminatedOptions.length === 0 && (
                <button
                  onClick={eliminateTwoOptions}
                  className="btn-3d-cyan flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide text-white cursor-pointer"
                >
                  <Sparkles size={14} />
                  <span>Dupla Checagem (Eliminar 2 Erradas)</span>
                </button>
              )}

              {selectedCell.specialEffect === "passa_plantao" && !passPlantaoTargetTeamId && (
                <button
                  onClick={() => setShowTargetSelect(true)}
                  className="btn-3d-purple flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black tracking-wide text-white cursor-pointer"
                >
                  <Send size={14} />
                  <span>Passar o Plantão</span>
                </button>
              )}
            </div>
          )}

          {showTargetSelect && (
            <div className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-3 shadow-inner">
              <p className="text-[10px] font-black text-purple-800 uppercase tracking-wider">Escolha quem responderá o plantão:</p>
              <div className="flex flex-wrap gap-2.5">
                {opponentTeams.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      passPlantao(t.id);
                      setShowTargetSelect(false);
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-800 cursor-pointer bg-white border border-slate-200 shadow-[0_3px_0_#e2e8f0]"
                    style={{ borderTop: `3px solid ${t.color}` }}
                  >
                    {t.name}
                  </button>
                ))}
                <button
                  onClick={() => setShowTargetSelect(false)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-3">
            {Object.entries(activeQuestion.options).map(([key, value]) => {
              const optKey = key as "A" | "B" | "C" | "D";
              const isEliminated = eliminatedOptions.includes(optKey);
              const isSelected = selectedOption === optKey;
              
              let cardStyle = "bg-white border-2 border-slate-250 text-slate-700 hover:bg-slate-50 shadow-[0_4px_0_#cbd5e1]";
              let badgeStyle = "bg-slate-100 text-slate-500 border border-slate-200";

              if (isEliminated) {
                cardStyle = "opacity-20 bg-slate-100 border-dashed border-slate-200 text-slate-300 cursor-not-allowed line-through shadow-none";
                badgeStyle = "bg-slate-100 text-slate-300 border-transparent";
              } else if (isAnswering) {
                if (isSelected) {
                  cardStyle = `bg-indigo-50 border-2 border-indigo-500 text-indigo-700 shadow-[0_4px_0_#4338ca] font-bold`;
                  badgeStyle = "bg-indigo-600 text-white border-indigo-650";
                }
              } else if (isResolving) {
                const isCorrectOpt = optKey === activeQuestion.correctAnswer;
                if (isCorrectOpt) {
                  cardStyle = "bg-green-50/60 border-2 border-green-500 text-green-800 shadow-[0_4px_0_#15803d] font-bold";
                  badgeStyle = "bg-green-600 text-white border-green-650";
                } else if (isSelected) {
                  cardStyle = "bg-red-50/60 border-2 border-red-500 text-red-800 shadow-[0_4px_0_#b91c1c] font-semibold";
                  badgeStyle = "bg-red-500 text-white border-red-650";
                }
              }

              return (
                <button
                  key={optKey}
                  onClick={() => handleOptionClick(optKey)}
                  disabled={!isAnswering || isEliminated}
                  className={`w-full text-left p-4 rounded-2xl flex items-center gap-4 transition-all ${cardStyle} ${
                    isAnswering && !isEliminated ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className={`w-7.5 h-7.5 flex items-center justify-center rounded-xl text-xs font-black transition-colors shadow-sm ${badgeStyle}`}>
                    {optKey}
                  </span>
                  <span className="flex-1 text-xs md:text-sm font-bold text-slate-700 leading-normal">{value}</span>

                  {isResolving && optKey === activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 border border-green-200 shadow-sm shrink-0">
                      <Check size={14} strokeWidth={3.5} />
                    </span>
                  )}
                  {isResolving && isSelected && optKey !== activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-100 text-red-700 border border-red-200 shadow-sm shrink-0">
                      <X size={14} strokeWidth={3.5} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {isResolving && (
            <div 
              className="p-5 rounded-2xl border-2 animate-slide-up space-y-2"
              style={{
                backgroundColor: `${areaColor}05`,
                borderColor: `${areaColor}15`
              }}
            >
              <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase" style={{ color: areaColor }}>
                <HelpCircle size={15} />
                <span>Discussão de Conduta / Justificativa</span>
              </div>
              <p className="text-slate-650 text-xs md:text-sm font-semibold leading-relaxed">
                {activeQuestion.explanation}
              </p>
              {activeQuestion.source && (
                <p className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider pt-1">
                  Fonte Oficial: {activeQuestion.source}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="p-5 bg-slate-50 border-t border-slate-100 flex justify-end gap-3.5 relative z-10">
          {isAnswering ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-7 py-3 rounded-2xl text-xs font-black tracking-wider uppercase transition-all ${
                selectedOption
                  ? "btn-3d-indigo text-white cursor-pointer"
                  : "bg-slate-100 text-slate-350 border border-slate-200/80 cursor-not-allowed shadow-none"
              }`}
            >
              Submeter Conduta
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="btn-3d-indigo px-7 py-3 rounded-2xl text-white font-black text-xs tracking-wider uppercase cursor-pointer"
            >
              Continuar Turno
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
