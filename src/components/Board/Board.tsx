import React, { useRef, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";
import { areaColors } from "../../data/board";
import { PawnIcon } from "./PawnIcon";
import { 
  Zap, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle, 
  ShieldAlert, 
  AlertTriangle,
  Flame,
  Award,
  Send,
  RefreshCw,
  CornerDownLeft,
  UserX,
  Stethoscope,
  Scissors,
  Activity,
  HeartPulse
} from "lucide-react";
import type { SpecialEffectType } from "../../types/game";

// Auxiliar para obter ícones de efeitos especiais das casas
const getEffectIcon = (effect?: SpecialEffectType, area?: string) => {
  const size = 18;
  switch (effect) {
    case "curinga":
      return <HelpCircle size={size} className="text-white" />;
    case "plantao_tranquilo":
      return <RotateCcw size={size} className="text-white animate-spin-slow" />;
    case "evolucao_perfeita":
      return <Zap size={size} className="text-white animate-bounce" />;
    case "alta_hospitalar":
      return <CheckCircle size={size} className="text-white" />;
    case "dupla_checagem":
      return <HeartPulse size={size} className="text-white" />;
    case "plantao_caotico":
      return <AlertTriangle size={size} className="text-white" />;
    case "caso_grave":
      return <Flame size={size} className="text-white" />;
    case "risco_cirurgico":
      return <ShieldAlert size={size} className="text-white" />;
    case "intercorrencia":
      return <UserX size={size} className="text-white" />;
    case "pergunta_r3":
      return <Award size={size} className="text-white" />;
    case "passa_plantao":
      return <Send size={size} className="text-white" />;
    case "troca_leito":
      return <RefreshCw size={size} className="text-white" />;
    case "contra_referencia":
      return <CornerDownLeft size={size} className="text-white" />;
    default:
      // Se for casa normal sem efeito, pode mostrar estetoscópio ou cirurgia dependendo da área
      if (area === "clinica") return <Stethoscope size={13} className="opacity-80 text-white" />;
      if (area === "cirurgia") return <Scissors size={13} className="opacity-80 text-white" />;
      if (area === "urgencia") return <Activity size={13} className="opacity-80 text-white" />;
      return null;
  }
};

export const Board: React.FC = () => {
  const { board, teams, currentTeamIndex, phase } = useGameStore();
  const boardRef = useRef<HTMLDivElement>(null);

  // Centraliza o peão ativo em dispositivos móveis
  useEffect(() => {
    if (teams.length === 0 || !boardRef.current) return;
    const activeTeam = teams[currentTeamIndex];
    const activeCell = board.find(c => c.id === activeTeam.position);
    if (!activeCell) return;

    // Calcular scroll
    const container = boardRef.current;
    const xPos = (activeCell.position.x / 100) * 1200; // Resolução base do SVG é 1200
    const yPos = (activeCell.position.y / 100) * 900;  // Altura base é 900

    container.scrollTo({
      left: xPos - container.clientWidth / 2,
      top: yPos - container.clientHeight / 2,
      behavior: "smooth"
    });
  }, [currentTeamIndex, teams, board]);

  // Renderiza as conexões (caminhos) entre as casas
  const renderPathLines = () => {
    const lines: React.ReactNode[] = [];
    
    board.forEach((cell) => {
      if (!cell.next) return;
      
      cell.next.forEach((nextId) => {
        const targetCell = board.find((c) => c.id === nextId);
        if (!targetCell) return;

        const x1 = cell.position.x * 12; // Mapeia 0-100 para 0-1200
        const y1 = cell.position.y * 9;  // Mapeia 0-100 para 0-900
        const x2 = targetCell.position.x * 12;
        const y2 = targetCell.position.y * 9;

        const isShortcut = cell.pathGroup === "shortcut" || targetCell.pathGroup === "shortcut";
        const isLong = cell.pathGroup === "long" || targetCell.pathGroup === "long";
        
        let strokeColor = "rgba(99, 102, 241, 0.4)"; // Padrão Indigo suave
        let strokeDash = undefined;

        if (isShortcut) {
          strokeColor = "rgba(6, 182, 212, 0.6)"; // Cyan para atalhos
          strokeDash = "4 4";
        } else if (isLong) {
          strokeColor = "rgba(107, 114, 128, 0.4)"; // Cinza para rotas mais longas
        }

        // Se for a conexão de salto da alta hospitalar (206 -> 23)
        if (cell.id === 206 && targetCell.id === 207) {
          // Normal line
        }

        lines.push(
          <g key={`path-${cell.id}-${targetCell.id}`}>
            {/* Brilho neon de fundo */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={8}
              strokeLinecap="round"
              className="opacity-20 blur-[2px]"
            />
            {/* Linha principal */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={strokeColor}
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray={strokeDash}
            />
          </g>
        );
      });
    });

    return lines;
  };

  // Renderiza as casas do tabuleiro
  const renderCells = () => {
    const { choosePath } = useGameStore.getState();
    const activeTeam = teams[currentTeamIndex];
    const isPathChoice = phase === "choosing_path" && activeTeam;
    
    // Identifica quais casas são opções de bifurcação válidas para o time ativo
    const activeCell = activeTeam ? board.find((c) => c.id === activeTeam.position) : null;
    const selectableCellIds = activeCell?.next && activeCell.next.length > 1 ? activeCell.next : [];

    return board.map((cell) => {
      const x = cell.position.x * 12;
      const y = cell.position.y * 9;
      
      const isStart = cell.id === 0;
      const isFinal = cell.id === 50;
      const isSelectable = isPathChoice && selectableCellIds.includes(cell.id);
      
      // Cor de preenchimento e borda
      let color = areaColors.start;
      if (isFinal) color = areaColors.final;
      else if (cell.specialEffect) color = areaColors.special;
      else if (cell.area) color = areaColors[cell.area];

      const isSpecial = !!cell.specialEffect;

      return (
        <g 
          key={`cell-${cell.id}`} 
          className={`group ${isSelectable ? "cursor-pointer" : "cursor-default"}`}
          onClick={() => {
            if (isSelectable) {
              choosePath(cell.id);
            }
          }}
        >
          {/* Anelação pulsante rosa se a casa puder ser selecionada na bifurcação */}
          {isSelectable && (
            <circle
              cx={x}
              cy={y}
              r={28}
              fill="none"
              stroke="#ec4899"
              strokeWidth={3}
              className="animate-pulse-ring"
            />
          )}

          {/* Brilho da casa ativa caso tenha equipe nela */}
          <circle
            cx={x}
            cy={y}
            r={isStart || isFinal ? 34 : 26}
            fill={isSelectable ? "#ec4899" : color}
            className={`opacity-15 blur-[4px] group-hover:opacity-30 transition-all duration-300 ${
              isSelectable ? "animate-pulse" : ""
            }`}
          />

          {/* Círculo Principal */}
          <circle
            cx={x}
            cy={y}
            r={isStart || isFinal ? 28 : 22}
            fill="#111827"
            stroke={isSelectable ? "#ec4899" : color}
            strokeWidth={isSelectable ? 4 : (isSpecial ? 4 : 2.5)}
            className="group-hover:stroke-white transition-all duration-300"
          />

          {/* Destaque interno em degradê */}
          <circle
            cx={x}
            cy={y}
            r={isStart || isFinal ? 25 : 19}
            fill={isSelectable ? "#ec4899" : color}
            className="opacity-10 group-hover:opacity-20 transition-all duration-300"
          />

          {/* Ícone ou ID da casa */}
          <g transform={`translate(${x}, ${y})`}>
            {cell.specialEffect || cell.type === "normal" && cell.area ? (
              <g transform="translate(-9, -9)">
                {getEffectIcon(cell.specialEffect, cell.area)}
              </g>
            ) : null}

            {/* Número da casa */}
            {!isStart && !isFinal && !cell.specialEffect && (
              <text
                x={0}
                y={4}
                textAnchor="middle"
                fill="#9ca3af"
                className="text-[10px] font-bold select-none group-hover:fill-white transition-colors duration-300"
              >
                {cell.id}
              </text>
            )}

            {/* Texto Início/Fim */}
            {(isStart || isFinal) && (
              <text
                x={0}
                y={4}
                textAnchor="middle"
                fill="white"
                className="text-[9px] font-black tracking-wider uppercase select-none"
              >
                {isStart ? "Início" : "Final"}
              </text>
            )}
          </g>

          {/* Nome da casa no Hover */}
          <title>{`${cell.label} (Casa ${cell.id})`}</title>
        </g>
      );
    });
  };

  // Renderiza os peões sobre as casas, resolvendo colisões
  const renderPawns = () => {
    return board.map((cell) => {
      // Filtrar times nesta casa
      const teamsOnCell = teams.filter((t) => t.position === cell.id);
      if (teamsOnCell.length === 0) return null;

      const cx = cell.position.x * 12;
      const cy = cell.position.y * 9;

      return (
        <g key={`pawns-group-${cell.id}`}>
          {teamsOnCell.map((team, index) => {
            const count = teamsOnCell.length;
            const activeTeam = teams[currentTeamIndex];
            const isActive = team.id === activeTeam.id && phase !== "game_over";

            // Calcula offset dos peões na mesma casa
            let px = cx;
            let py = cy;
            
            if (count > 1) {
              const angle = (index * 2 * Math.PI) / count;
              const radius = 16;
              px = cx + Math.cos(angle) * radius;
              py = cy + Math.sin(angle) * radius;
            }

            return (
              <g
                key={`pawn-${team.id}`}
                className="transition-all duration-500 ease-out"
                style={{
                  transform: `translate(${px}px, ${py}px)`,
                  transformOrigin: `${px}px ${py}px`
                }}
              >
                {/* Anelação de pulso para a equipe da vez */}
                {isActive && (
                  <circle
                    cx={0}
                    cy={0}
                    r={20}
                    fill="none"
                    stroke={team.color}
                    strokeWidth={1.5}
                    className="animate-pulse-ring"
                  />
                )}

                {/* Fundo do Peão */}
                <circle
                  cx={0}
                  cy={0}
                  r={14}
                  fill={team.color}
                  className="shadow-lg stroke-black stroke-2"
                  style={{
                    filter: `drop-shadow(0 0 6px ${team.color}80)`
                  }}
                />

                {/* Ícone do Peão */}
                <g transform="translate(-8, -8)" className="text-black">
                  <PawnIcon type={team.pawn} size={16} />
                </g>

                {/* Mini Tooltip com Nome da Equipe */}
                <title>{team.name}</title>
              </g>
            );
          })}
        </g>
      );
    });
  };

  return (
    <div className="relative w-full h-[450px] md:h-[600px] rounded-2xl glass-premium overflow-hidden border border-indigo-500/20">
      {/* Grid de fundo */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Container de scroll para arrastar tabuleiro */}
      <div
        ref={boardRef}
        className="w-full h-full overflow-auto cursor-grab active:cursor-grabbing scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-gray-800"
      >
        <div className="relative min-w-[1200px] min-h-[900px] mx-auto p-8">
          <svg
            viewBox="0 0 1200 900"
            className="w-full h-full select-none"
            style={{ minWidth: "1200px", minHeight: "900px" }}
          >
            {/* 1. Conexões */}
            {renderPathLines()}

            {/* 2. Casas do tabuleiro */}
            {renderCells()}

            {/* 3. Peões */}
            {renderPawns()}
          </svg>
        </div>
      </div>

      {/* Indicador de Legenda de Áreas */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto glass p-3 rounded-xl flex flex-wrap gap-2 text-xs border border-white/5 pointer-events-none">
        {Object.entries(areaColors).map(([area, color]) => {
          if (["special", "start", "final"].includes(area)) return null;
          
          let name = "";
          if (area === "clinica") name = "Clínica";
          else if (area === "cirurgia") name = "Cirurgia";
          else if (area === "pediatria") name = "Pediatria";
          else if (area === "go") name = "G.O.";
          else if (area === "preventiva") name = "Preventiva";
          else if (area === "urgencia") name = "Urgência";
          else if (area === "curinga") name = "Curinga";

          return (
            <div key={area} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full border border-white/10"
                style={{ backgroundColor: color }}
              />
              <span className="text-gray-300 font-medium">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
