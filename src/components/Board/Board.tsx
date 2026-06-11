import React, { useRef, useEffect, useState } from "react";
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
  Activity
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
      return <Zap size={size} className="text-white" />; // Reaproveitando Zap ou similar
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
      if (area === "clinica") return <Stethoscope size={13} className="opacity-90 text-white" />;
      if (area === "cirurgia") return <Scissors size={13} className="opacity-90 text-white" />;
      if (area === "urgencia") return <Activity size={13} className="opacity-90 text-white" />;
      if (area === "preventiva") return <ShieldAlert size={13} className="opacity-90 text-slate-800" />;
      return null;
  }
};

export const Board: React.FC = () => {
  const { board, teams, currentTeamIndex, phase } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Calcula escala responsiva para caber todo o tabuleiro de 1200x900
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth;
      const containerH = containerRef.current.clientHeight;
      const scaleX = containerW / 1200;
      const scaleY = containerH / 900;
      // Usamos a menor escala para garantir que o tabuleiro caiba inteiro sem scroll
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Renderiza as conexões como uma "estrada" larga e contínua
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
        
        let roadColor = "#E2E8F0"; // Pista cinza padrão

        if (isShortcut) {
          roadColor = "#CFFAFE"; // Azul ciano claro para atalhos
        } else if (isLong) {
          roadColor = "#E0F2FE"; // Azul muito claro para rotas mais longas
        }

        lines.push(
          <g key={`path-${cell.id}-${targetCell.id}`}>
            {/* Sombra da estrada */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(0, 0, 0, 0.04)"
              strokeWidth={32}
              strokeLinecap="round"
            />
            {/* Corpo da pista */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={roadColor}
              strokeWidth={24}
              strokeLinecap="round"
            />
            {/* Linha tracejada central lúdica */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeDasharray="6 6"
              className="opacity-70"
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

          {/* Sombra suave de profundidade */}
          <circle
            cx={x}
            cy={y + 2}
            r={isStart || isFinal ? 28 : 22}
            fill="rgba(0, 0, 0, 0.15)"
            className="pointer-events-none"
          />

          {/* Círculo Principal colorido */}
          <circle
            cx={x}
            cy={y}
            r={isStart || isFinal ? 28 : 22}
            fill={isSelectable ? "#ec4899" : color}
            stroke="#FFFFFF"
            strokeWidth={3}
            className="group-hover:brightness-105 transition-all duration-300"
          />

          {/* Brilho interno em degradê sutil */}
          <circle
            cx={x}
            cy={y}
            r={isStart || isFinal ? 24 : 18}
            fill="#FFFFFF"
            className="opacity-15 pointer-events-none"
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
                fill={cell.area === "preventiva" ? "#1e293b" : "#ffffff"}
                className="text-[10px] font-black select-none transition-colors duration-300"
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

  // Renderiza os peões sobre as casas, simulando peças físicas 3D
  const renderPawns = () => {
    return board.map((cell) => {
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
                  transformOrigin: `${px}px ${py}px`,
                  filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
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
                    strokeWidth={2}
                    className="animate-pulse-ring"
                  />
                )}

                {/* Base do Peão */}
                <circle
                  cx={0}
                  cy={0}
                  r={15}
                  fill={team.color}
                  stroke="#FFFFFF"
                  strokeWidth={2.5}
                />

                {/* Brilho 3D na peça física */}
                <circle
                  cx={-4}
                  cy={-4}
                  r={4}
                  fill="#FFFFFF"
                  className="opacity-30"
                />

                {/* Ícone do Peão */}
                <g transform="translate(-8, -8)" className="text-white">
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
    <div 
      ref={containerRef}
      className="relative w-full h-[450px] md:h-[600px] rounded-3xl bg-white border border-slate-100 overflow-hidden flex items-center justify-center shadow-sm"
    >
      {/* Grid de fundo lúdico */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none opacity-60" />

      {/* Container escalado responsivamente */}
      <div
        style={{
          width: "1200px",
          height: "900px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0
        }}
        className="relative select-none transition-transform duration-300 ease-out"
      >
        <svg
          viewBox="0 0 1200 900"
          className="w-full h-full"
        >
          {/* 1. Conexões (Estrada) */}
          {renderPathLines()}

          {/* 2. Casas do tabuleiro */}
          {renderCells()}

          {/* 3. Peões */}
          {renderPawns()}
        </svg>
      </div>

      {/* Indicador de Legenda de Áreas */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/90 backdrop-blur-sm p-3 rounded-2xl flex flex-wrap gap-2 text-xs border border-slate-200 pointer-events-none shadow-sm">
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
                className="w-3 h-3 rounded-full border border-slate-350"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-600 font-bold">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
