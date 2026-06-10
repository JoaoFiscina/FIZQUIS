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
        return { label: "Fácil", className: "bg-green-500/10 text-green-400 border-green-500/20" };
      case "media":
        return { label: "Média", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
      case "dificil":
        return { label: "Difícil", className: "bg-red-500/10 text-red-400 border-red-500/20" };
      default:
        return { label: "Média", className: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" };
    }
  };

  const diffInfo = getDifficultyLabel(activeQuestion.difficulty);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        className="w-full max-w-2xl rounded-2xl glass-premium overflow-hidden border border-indigo-500/20 shadow-2xl animate-fade-in"
        style={{
          boxShadow: `0 10px 50px -10px ${areaColor}30, 0 0 0 1px rgba(99, 102, 241, 0.1)`
        }}
      >
        {/* Header da Pergunta */}
        <div 
          className="p-5 border-b border-white/5 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-gray-400"
          style={{ background: `linear-gradient(to right, ${areaColor}15, transparent)` }}
        >
          <div className="flex items-center gap-2">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/20"
              style={{ backgroundColor: areaColor }}
            />
            <span className="text-white text-base tracking-wide font-black">
              {areaNames[activeQuestion.area]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${diffInfo.className}`}>
              {diffInfo.label}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-indigo-400 font-bold uppercase tracking-wider text-xs">
              {selectedCell.label}
            </span>
          </div>
        </div>

        {/* Corpo da Pergunta */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Turno da equipe */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div>
              <span>Vez da equipe: </span>
              <span className="font-bold text-white text-sm" style={{ color: activeTeam.color }}>
                {activeTeam.name}
              </span>
            </div>
            {passPlantaoTargetTeamId && (
              <div className="flex items-center gap-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded-md font-bold">
                <Send size={12} />
                <span>Respondendo: {respondingTeam.name}</span>
              </div>
            )}
          </div>

          {/* Enunciado do caso clínico */}
          <p className="text-white text-base md:text-lg font-medium leading-relaxed bg-white/5 p-5 rounded-xl border border-white/5 shadow-inner">
            {activeQuestion.statement}
          </p>

          {/* Botões de Ação Especiais (Dupla Checagem e Passa o Plantão) */}
          {isAnswering && !showTargetSelect && (
            <div className="flex flex-wrap gap-3">
              {/* Dupla Checagem */}
              {selectedCell.specialEffect === "dupla_checagem" && eliminatedOptions.length === 0 && (
                <button
                  onClick={eliminateTwoOptions}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-600/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-600/35 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(6,182,212,0.3)]"
                >
                  <Sparkles size={14} />
                  <span>Dupla Checagem (Eliminar 2 Erradas)</span>
                </button>
              )}

              {/* Passa o Plantão */}
              {selectedCell.specialEffect === "passa_plantao" && !passPlantaoTargetTeamId && (
                <button
                  onClick={() => setShowTargetSelect(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-purple-600/20 text-purple-400 border border-purple-500/30 hover:bg-purple-600/35 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                >
                  <Send size={14} />
                  <span>Passar o Plantão</span>
                </button>
              )}
            </div>
          )}

          {/* Menu de seleção de Alvo do Passa Plantão */}
          {showTargetSelect && (
            <div className="p-4 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-3">
              <p className="text-xs font-bold text-purple-400 uppercase tracking-wider">Escolha quem responderá o plantão:</p>
              <div className="flex flex-wrap gap-2">
                {opponentTeams.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      passPlantao(t.id);
                      setShowTargetSelect(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-semibold border text-white transition-all cursor-pointer"
                    style={{ borderColor: t.color, backgroundColor: `${t.color}15` }}
                  >
                    {t.name}
                  </button>
                ))}
                <button
                  onClick={() => setShowTargetSelect(false)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold bg-gray-800 text-gray-400 hover:bg-gray-700 cursor-pointer"
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
              
              let cardStyle = "bg-white/5 border-white/5 text-gray-300 hover:bg-white/10 hover:border-white/10";
              let badgeStyle = "bg-white/10 text-gray-400";

              if (isEliminated) {
                cardStyle = "opacity-30 bg-black/40 border-transparent text-gray-600 cursor-not-allowed line-through";
                badgeStyle = "bg-black/20 text-gray-700";
              } else if (isAnswering) {
                if (isSelected) {
                  cardStyle = `bg-indigo-500/10 border-indigo-500 text-white`;
                  badgeStyle = "bg-indigo-500 text-white";
                }
              } else if (isResolving) {
                const isCorrectOpt = optKey === activeQuestion.correctAnswer;
                if (isCorrectOpt) {
                  cardStyle = "bg-green-500/15 border-green-500 text-green-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  badgeStyle = "bg-green-500 text-white";
                } else if (isSelected) {
                  cardStyle = "bg-red-500/15 border-red-500 text-red-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]";
                  badgeStyle = "bg-red-500 text-white";
                }
              }

              return (
                <button
                  key={optKey}
                  onClick={() => handleOptionClick(optKey)}
                  disabled={!isAnswering || isEliminated}
                  className={`w-full text-left p-4 rounded-xl border flex items-center gap-4 transition-all duration-200 ${cardStyle} ${
                    isAnswering && !isEliminated ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className={`w-7 h-7 flex items-center justify-center rounded-lg text-sm font-black transition-colors ${badgeStyle}`}>
                    {optKey}
                  </span>
                  <span className="flex-1 text-sm font-medium">{value}</span>

                  {/* Icones de Feedback de Acerto/Erro */}
                  {isResolving && optKey === activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <Check size={14} strokeWidth={3} />
                    </span>
                  )}
                  {isResolving && isSelected && optKey !== activeQuestion.correctAnswer && (
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-red-500/20 text-red-400">
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
                backgroundColor: `${areaColor}08`,
                borderColor: `${areaColor}20`
              }}
            >
              <div className="flex items-center gap-2 text-sm font-black tracking-wider uppercase" style={{ color: areaColor }}>
                <HelpCircle size={16} />
                <span>Discussão de Conduta / Justificativa</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                {activeQuestion.explanation}
              </p>
              {activeQuestion.source && (
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider pt-2">
                  Fonte: {activeQuestion.source}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer do Modal */}
        <div className="p-5 bg-black/40 border-t border-white/5 flex justify-end gap-3">
          {isAnswering ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOption}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all ${
                selectedOption
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                  : "bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed"
              }`}
            >
              Submeter Conduta
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="px-6 py-2.5 rounded-xl text-sm font-bold tracking-wide bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] animate-pulse"
            >
              Continuar Turno
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
