import React, { useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { areaNames, areaColors } from "../../data/board";
import { 
  Zap, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Flame, 
  ShieldAlert, 
  UserX, 
  Award, 
  Send, 
  RefreshCw, 
  CornerDownLeft,
  Stethoscope,
  Scissors,
  Activity,
  HeartHandshake,
  Play,
  Baby
} from "lucide-react";
import type { SpecialEffectType } from "../../types/game";
import type { MedicalArea } from "../../types/questions";

interface CellRevealCardProps {
  onComplete?: () => void;
}

const getEffectDetails = (effect?: SpecialEffectType): { title: string; desc: string; icon: React.ReactNode } => {
  const size = 36;
  switch (effect) {
    case "curinga":
      return {
        title: "Casa Curinga",
        desc: "Escolha a especialidade médica da sua pergunta!",
        icon: <HelpCircle size={size} className="text-white" />
      };
    case "plantao_tranquilo":
      return {
        title: "Plantão Tranquilo",
        desc: "Acerto: Joga novamente. Erro: Volta para a origem.",
        icon: <RotateCcw size={size} className="text-white" />
      };
    case "evolucao_perfeita":
      return {
        title: "Evolução Perfeita",
        desc: "Acerto: Avança +2 casas. Erro: Volta para a origem.",
        icon: <Zap size={size} className="text-white" />
      };
    case "alta_hospitalar":
      return {
        title: "Alta Hospitalar",
        desc: "Acerto: Pega um atalho salvador. Erro: Volta para a origem.",
        icon: <CheckCircle size={size} className="text-white" />
      };
    case "dupla_checagem":
      return {
        title: "Dupla Checagem",
        desc: "Bônus: Você pode eliminar duas alternativas incorretas da pergunta.",
        icon: <HeartHandshake size={size} className="text-white" />
      };
    case "plantao_caotico":
      return {
        title: "Plantão Caótico",
        desc: "Alta Volatilidade! Acerto: Avança +4 casas. Erro: Recua 4 casas da origem.",
        icon: <AlertTriangle size={size} className="text-white" />
      };
    case "caso_grave":
      return {
        title: "Caso Grave",
        desc: "Alerta Vermelho! Se errar, é mandado para a Enfermaria (caminho longo).",
        icon: <Flame size={size} className="text-white animate-pulse" />
      };
    case "risco_cirurgico":
      return {
        title: "Risco Cirúrgico",
        desc: "Dobre a aposta! Acerto: Avança o dobro do dado tirado. Erro: Volta para a origem.",
        icon: <ShieldAlert size={size} className="text-white" />
      };
    case "intercorrencia":
      return {
        title: "Intercorrência",
        desc: "Acerto: Escolha uma equipe para voltar 3 casas. Erro: Você volta 3 casas da origem.",
        icon: <UserX size={size} className="text-white" />
      };
    case "pergunta_r3":
      return {
        title: "Pergunta R3 (Residência)",
        desc: "Nível Avançado! Acerto: Avança +5 casas. Erro: Volta para a origem e perde a próxima jogada.",
        icon: <Award size={size} className="text-white" />
      };
    case "passa_plantao":
      return {
        title: "Passa o Plantão",
        desc: "Estratégia! Escolha outra equipe para responder a sua pergunta. Se ela errar, você fica seguro.",
        icon: <Send size={size} className="text-white" />
      };
    case "troca_leito":
      return {
        title: "Troca de Leito",
        desc: "Reviravolta! Acerto: Troque de posição com qualquer equipe à sua frente.",
        icon: <RefreshCw size={size} className="text-white" />
      };
    case "contra_referencia":
      return {
        title: "Contra-referência",
        desc: "Acerto: Escolha adversário à frente para voltar 2 casas. Erro: Você volta 2 casas da origem.",
        icon: <CornerDownLeft size={size} className="text-white" />
      };
    default:
      return {
        title: "Casa Comum",
        desc: "Resolva o caso clínico para manter sua posição no tabuleiro.",
        icon: <Stethoscope size={size} className="text-white" />
      };
  }
};

const getEffectConsequences = (effect: SpecialEffectType): { rule: string; consequences?: { correct: string; wrong: string } } => {
  switch (effect) {
    case "plantao_tranquilo":
      return {
        rule: "Alta tranquilidade no plantão!",
        consequences: {
          correct: "Avança e joga novamente (turno extra).",
          wrong: "Volta para a casa de origem."
        }
      };
    case "evolucao_perfeita":
      return {
        rule: "Evolução do paciente sem intercorrências!",
        consequences: {
          correct: "Avança +2 casas extras.",
          wrong: "Volta para a casa de origem."
        }
      };
    case "alta_hospitalar":
      return {
        rule: "O paciente recebeu alta!",
        consequences: {
          correct: "Pega um atalho salvador direto para a casa 23.",
          wrong: "Volta para a casa de origem."
        }
      };
    case "dupla_checagem":
      return {
        rule: "Bônus especial de segurança do paciente.",
        consequences: {
          correct: "Pode eliminar duas alternativas incorretas desta pergunta.",
          wrong: "Se errar, volta para a origem normalmente."
        }
      };
    case "plantao_caotico":
      return {
        rule: "Alta volatilidade no pronto-socorro!",
        consequences: {
          correct: "Avança +4 casas extras.",
          wrong: "Volta 4 casas a partir da origem."
        }
      };
    case "caso_grave":
      return {
        rule: "Alerta vermelho na enfermaria!",
        consequences: {
          correct: "Mantém a posição no tabuleiro.",
          wrong: "Recua para a Enfermaria (caminho longo)."
        }
      };
    case "risco_cirurgico":
      return {
        rule: "Dobre a aposta no centro cirúrgico!",
        consequences: {
          correct: "Avança o dobro do dado tirado.",
          wrong: "Volta para a casa de origem."
        }
      };
    case "intercorrencia":
      return {
        rule: "Intercorrência no setor!",
        consequences: {
          correct: "Escolha uma equipe adversária para voltar 3 casas.",
          wrong: "Sua equipe volta 3 casas a partir da origem."
        }
      };
    case "pergunta_r3":
      return {
        rule: "Pergunta avançada nível Residência!",
        consequences: {
          correct: "Avança +5 casas extras.",
          wrong: "Volta para a casa de origem e perde o próximo turno."
        }
      };
    case "passa_plantao":
      return {
        rule: "Estratégia clínica pura!",
        consequences: {
          correct: "Escolha outra equipe para responder a sua pergunta. Se ela errar, você fica seguro.",
          wrong: "Se ela acertar, você volta para a origem."
        }
      };
    case "troca_leito":
      return {
        rule: "Reviravolta na internação!",
        consequences: {
          correct: "Troque de posição com qualquer equipe à sua frente.",
          wrong: "Volta para a casa de origem."
        }
      };
    case "contra_referencia":
      return {
        rule: "Contra-referência do sistema!",
        consequences: {
          correct: "Escolha um adversário à frente para voltar 2 casas.",
          wrong: "Sua equipe volta 2 casas da origem."
        }
      };
    default:
      return {
        rule: "Resolva o caso clínico para manter sua posição."
      };
  }
};

const getAreaIcon = (area?: MedicalArea): React.ReactNode => {
  const size = 36;
  switch (area) {
    case "clinica":
      return <Stethoscope size={size} className="text-white" />;
    case "cirurgia":
      return <Scissors size={size} className="text-white" />;
    case "urgencia":
      return <Activity size={size} className="text-white animate-pulse" />;
    case "pediatria":
      return <Baby size={size} className="text-white" />;
    case "go":
      return <HeartHandshake size={size} className="text-white" />;
    case "preventiva":
      return <ShieldAlert size={size} className="text-white" />;
    default:
      return <HelpCircle size={size} className="text-white" />;
  }
};

const areaPhrases: Record<MedicalArea, string> = {
  clinica: "Hora de conduzir o caso clínico.",
  cirurgia: "Prepare o bisturi e mantenha a calma.",
  pediatria: "Atenção redobrada para os pequenos.",
  go: "Momento de conduzir o parto com segurança.",
  preventiva: "A prevenção é o melhor remédio.",
  urgencia: "Ação rápida e precisa salvam vidas."
};

export const CellRevealCard: React.FC<CellRevealCardProps> = ({ onComplete }) => {
  const { selectedCell, completeReveal, teams, currentTeamIndex, activeQuestion } = useGameStore();
  const [animationState, setAnimationState] = useState<'entering' | 'visible' | 'exiting'>('entering');
  const [progress, setProgress] = useState(100);

  const activeTeam = teams[currentTeamIndex];

  useEffect(() => {
    if (!selectedCell) return;

    // 1. Entrada do card: 500 ms
    setAnimationState("entering");
    const entryTimeout = setTimeout(() => {
      setAnimationState("visible");
    }, 500);

    // 2. Permanência na tela: 3500 ms (com barra de progresso decrementando)
    const permanenceDuration = 3500;
    const intervalTime = 20;
    const steps = permanenceDuration / intervalTime;
    let currentStep = steps;
    let progressInterval: any;

    const visibleTimeout = setTimeout(() => {
      progressInterval = setInterval(() => {
        currentStep -= 1;
        setProgress(Math.max(0, (currentStep / steps) * 100));
        if (currentStep <= 0) {
          clearInterval(progressInterval);
        }
      }, intervalTime);
    }, 500);

    // 3. Saída do card: 400 ms (depois da permanência)
    let exitTimeout: any;
    const autoDismissTimeout = setTimeout(() => {
      setAnimationState("exiting");
      exitTimeout = setTimeout(() => {
        if (onComplete) {
          onComplete();
        } else {
          completeReveal();
        }
      }, 400);
    }, 500 + permanenceDuration);

    return () => {
      clearTimeout(entryTimeout);
      clearTimeout(visibleTimeout);
      clearTimeout(autoDismissTimeout);
      if (progressInterval) clearInterval(progressInterval);
      if (exitTimeout) clearTimeout(exitTimeout);
    };
  }, [selectedCell, completeReveal, onComplete]);

  if (!selectedCell) return null;

  const isSpecial = !!selectedCell.specialEffect;
  const effectDetails = getEffectDetails(selectedCell.specialEffect);
  
  let themeColor = "#4F8EF7"; // Default
  if (selectedCell.id === 50) themeColor = areaColors.final;
  else if (selectedCell.specialEffect === "curinga") themeColor = areaColors.curinga;
  else if (selectedCell.specialEffect) themeColor = areaColors.special;
  else if (selectedCell.area) themeColor = areaColors[selectedCell.area];

  let cardTitle = "";
  let cardSubtitle = "";
  let cardIcon = null;
  let showAreaLine = false;
  let medicalAreaText = "";
  let consequencesHtml = null;

  if (selectedCell.id === 50) {
    cardTitle = "Plantão Final!";
    cardSubtitle = "A pergunta decisiva para a vitória!";
    cardIcon = <Award size={36} className="text-white" />;
    if (activeQuestion?.area) {
      showAreaLine = true;
      medicalAreaText = areaNames[activeQuestion.area];
    }
  } else if (selectedCell.specialEffect === "curinga") {
    cardTitle = "Casa Curinga";
    cardSubtitle = "Escolha a área da pergunta.";
    cardIcon = <HelpCircle size={36} className="text-white" />;
  } else if (isSpecial && selectedCell.specialEffect) {
    const consequences = getEffectConsequences(selectedCell.specialEffect);
    
    cardTitle = effectDetails.title;
    cardSubtitle = consequences.rule;
    cardIcon = effectDetails.icon;
    
    if (activeQuestion?.area) {
      showAreaLine = true;
      medicalAreaText = areaNames[activeQuestion.area];
    }
    
    if (consequences.consequences) {
      consequencesHtml = (
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-2.5 w-full">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Consequências da Conduta
          </span>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center text-[10px] font-black text-green-600 border border-green-100 shrink-0 mt-0.5">✓</span>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              <span className="text-green-600 font-black">Acertou:</span> {consequences.consequences.correct}
            </p>
          </div>
          <div className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-[10px] font-black text-red-600 border border-red-100 shrink-0 mt-0.5">✗</span>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              <span className="text-red-600 font-black">Errou:</span> {consequences.consequences.wrong}
            </p>
          </div>
        </div>
      );
    }
  } else if (selectedCell.area) {
    cardTitle = areaNames[selectedCell.area];
    cardSubtitle = areaPhrases[selectedCell.area];
    cardIcon = getAreaIcon(selectedCell.area);
  }

  const handleDismiss = () => {
    if (animationState !== "visible") return;
    
    setAnimationState("exiting");
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        completeReveal();
      }
    }, 400);
  };

  const backdropClasses = `fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ease-out ${
    animationState === "entering" 
      ? "bg-slate-900/0 backdrop-blur-none pointer-events-none" 
      : animationState === "visible" 
        ? "bg-slate-900/60 backdrop-blur-sm" 
        : "bg-slate-900/0 backdrop-blur-none duration-400 ease-in pointer-events-none"
  }`;

  const cardClasses = `relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white shadow-2xl rounded-[32px] border-[6px] border-slate-800 transition-all duration-500 ease-out flex flex-col ${
    animationState === "entering"
      ? "opacity-0 scale-90 translate-y-4"
      : animationState === "visible"
        ? "opacity-100 scale-100 translate-y-0"
        : "opacity-0 scale-90 translate-y-4 duration-400 ease-in"
  }`;

  return (
    <div className={backdropClasses}>
      <div className={cardClasses}>
        {/* Costura tracejada interna do card físico */}
        <div className="absolute inset-1.5 border-[2px] border-dashed border-slate-200 rounded-[22px] pointer-events-none z-10" />
        
        {/* Linha colorida decorativa no topo */}
        <div className="h-2 w-full shrink-0" style={{ backgroundColor: themeColor }} />

        <div className="p-8 flex flex-col items-center text-center relative flex-1 z-10">
          {activeTeam && (
            <div 
              style={{ backgroundColor: activeTeam.color }} 
              className="px-4 py-1 mb-5 text-[10px] font-black uppercase tracking-wider rounded-full shadow-md text-white"
            >
              Vez de: {activeTeam.name}
            </div>
          )}

          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 mb-5 text-white transition-transform hover:scale-105 duration-300"
            style={{ 
              backgroundColor: themeColor,
              boxShadow: `0 10px 25px -5px ${themeColor}50`
            }}
          >
            {cardIcon}
          </div>

          <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight uppercase">
            {cardTitle}
          </h3>
          
          <p className="mt-1.5 text-[10px] text-slate-400 font-extrabold uppercase tracking-wider bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-lg shadow-sm">
            Casa {selectedCell.id} • {
              selectedCell.region === "inicio" 
                ? "Região Inicial" 
                : selectedCell.region === "meio" 
                  ? "Região do Meio" 
                  : "Região Final"
            }
          </p>

          {showAreaLine && (
            <div className="flex items-center gap-2 justify-center mt-3">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">Área:</span>
              <span 
                className="px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wide text-white shadow-sm"
                style={{ backgroundColor: activeQuestion ? areaColors[activeQuestion.area] : themeColor }}
              >
                {medicalAreaText}
              </span>
            </div>
          )}

          <div className="w-12 h-1 bg-slate-100 rounded-full my-5 shrink-0" />

          <p className="text-slate-650 font-bold text-sm md:text-base leading-relaxed max-w-sm">
            “{cardSubtitle}”
          </p>

          {consequencesHtml}

          <div className="flex-grow min-h-[20px]" />

          <div className="w-full mt-6">
            <button
              onClick={handleDismiss}
              className="w-full py-3.5 px-6 text-white rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-100 flex items-center justify-center gap-2 group cursor-pointer hover:translate-y-[1px] active:translate-y-[4px]"
              style={{ 
                backgroundColor: themeColor, 
                boxShadow: `0 4px 0 rgba(0,0,0,0.18), 0 8px 16px -4px ${themeColor}40`
              }}
            >
              <Play size={14} className="fill-current text-white group-hover:translate-x-0.5 transition-transform" />
              Responder Pergunta
            </button>
          </div>
        </div>

        <div className="w-full h-1.5 bg-slate-50 relative shrink-0">
          <div 
            className="h-full transition-all duration-75 ease-linear"
            style={{ 
              width: `${progress}%`,
              backgroundColor: themeColor
            }}
          />
        </div>

      </div>
    </div>
  );
};
