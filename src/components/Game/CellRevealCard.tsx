import React, { useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { areaNames } from "../../data/board";
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
  Play
} from "lucide-react";
import type { SpecialEffectType } from "../../types/game";
import type { MedicalArea } from "../../types/questions";

interface CellRevealCardProps {
  onComplete?: () => void;
}

const getEffectDetails = (effect?: SpecialEffectType): { title: string; desc: string; icon: React.ReactNode } => {
  const size = 32;
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
        icon: <RotateCcw size={size} className="text-white animate-spin-slow" />
      };
    case "evolucao_perfeita":
      return {
        title: "Evolução Perfeita",
        desc: "Acerto: Avança +2 casas. Erro: Volta para a origem.",
        icon: <Zap size={size} className="text-white animate-bounce" />
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
        icon: <Flame size={size} className="text-white text-orange-500 animate-pulse" />
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

const getAreaIcon = (area?: MedicalArea): React.ReactNode => {
  const size = 32;
  switch (area) {
    case "clinica":
      return <Stethoscope size={size} className="text-white" />;
    case "cirurgia":
      return <Scissors size={size} className="text-white" />;
    case "urgencia":
      return <Activity size={size} className="text-white animate-pulse" />;
    case "pediatria":
      return <Activity size={size} className="text-white" />;
    case "go":
      return <Award size={size} className="text-white" />;
    case "preventiva":
      return <ShieldAlert size={size} className="text-white" />;
    default:
      return <HelpCircle size={size} className="text-white" />;
  }
};

export const CellRevealCard: React.FC<CellRevealCardProps> = ({ onComplete }) => {
  const { selectedCell, completeReveal, teams, currentTeamIndex } = useGameStore();
  const [progress, setProgress] = useState(100);

  const activeTeam = teams[currentTeamIndex];

  useEffect(() => {
    if (!selectedCell) return;

    const duration = 1800;
    const intervalTime = 18;
    const steps = duration / intervalTime;
    let currentStep = steps;

    const interval = setInterval(() => {
      currentStep -= 1;
      setProgress(Math.max(0, (currentStep / steps) * 100));
      if (currentStep <= 0) {
        clearInterval(interval);
        handleDismiss();
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, [selectedCell]);

  if (!selectedCell) return null;

  const isSpecial = !!selectedCell.specialEffect;
  const effectDetails = getEffectDetails(selectedCell.specialEffect);
  
  let bgGradient = "from-blue-500 to-indigo-600";
  let cellName = selectedCell.label;
  let subtitle = "Hora de conduzir o caso clínico!";
  let icon = selectedCell.area ? getAreaIcon(selectedCell.area) : effectDetails.icon;

  if (selectedCell.id === 50) {
    bgGradient = "from-emerald-500 to-teal-600 animate-pulse";
    cellName = "Plantão Final!";
    subtitle = "A pergunta decisiva para a vitória!";
  } else if (isSpecial) {
    bgGradient = `from-cyan-500 to-blue-600`;
    cellName = effectDetails.title;
    subtitle = effectDetails.desc;
    icon = effectDetails.icon;
  } else if (selectedCell.area) {
    const areaName = areaNames[selectedCell.area];
    cellName = areaName;
    
    if (selectedCell.area === "clinica") bgGradient = "from-blue-500 to-blue-600";
    else if (selectedCell.area === "cirurgia") bgGradient = "from-red-500 to-rose-600";
    else if (selectedCell.area === "pediatria") bgGradient = "from-emerald-500 to-teal-600";
    else if (selectedCell.area === "go") bgGradient = "from-purple-500 to-fuchsia-600";
    else if (selectedCell.area === "preventiva") bgGradient = "from-amber-500 to-yellow-600";
    else if (selectedCell.area === "urgencia") bgGradient = "from-orange-500 to-red-600";
  }

  const handleDismiss = () => {
    if (onComplete) {
      onComplete();
    } else {
      completeReveal();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl rounded-3xl animate-scale-up border border-slate-100">
        
        <div className={`p-8 bg-gradient-to-br ${bgGradient} text-white flex flex-col items-center text-center relative overflow-hidden`}>
          <div className="absolute w-32 h-32 bg-white/10 rounded-full -top-10 -right-10 pointer-events-none" />
          <div className="absolute w-24 h-24 bg-white/10 rounded-full -bottom-8 -left-8 pointer-events-none" />

          {activeTeam && (
            <div 
              style={{ backgroundColor: activeTeam.color }} 
              className="px-3 py-1 mb-4 text-[10px] font-black uppercase tracking-wider rounded-full shadow-md text-white border border-white/20 animate-bounce"
            >
              Vez de: {activeTeam.name}
            </div>
          )}

          <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-white/15 backdrop-blur-md shadow-inner border border-white/20">
            {icon}
          </div>

          <h3 className="text-2xl font-black tracking-tight leading-tight">
            {cellName}
          </h3>
          
          <p className="mt-1 text-xs text-white/80 font-medium">
            Casa {selectedCell.id} • {selectedCell.region === "inicio" ? "Região Inicial" : selectedCell.region === "meio" ? "Região do Meio" : "Região Final"}
          </p>
        </div>

        <div className="p-6 text-center">
          <p className="text-slate-600 font-semibold text-sm leading-relaxed mb-6">
            {isSpecial ? "Esta é uma casa com evento especial. Prepare-se para as consequências:" : subtitle}
          </p>

          {isSpecial && (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">Impacto do Efeito</span>
              <p className="text-slate-700 text-xs font-bold leading-relaxed">
                {effectDetails.desc}
              </p>
            </div>
          )}

          <button
            onClick={handleDismiss}
            className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-sm shadow-lg shadow-slate-900/10 hover:shadow-slate-900/20 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <Play size={14} className="fill-current text-white group-hover:translate-x-0.5 transition-transform" />
            Responder Pergunta
          </button>
        </div>

        <div className="w-full h-1.5 bg-slate-100 relative">
          <div 
            className={`h-full bg-gradient-to-r ${bgGradient} transition-all duration-75 ease-linear`}
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
};
