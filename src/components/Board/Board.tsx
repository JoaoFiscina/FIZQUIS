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

const getEffectIcon = (effect?: SpecialEffectType, area?: string) => {
  const size = 16;
  switch (effect) {
    case "curinga":
      return <HelpCircle size={size} className="text-white" />;
    case "plantao_tranquilo":
      return <RotateCcw size={size} className="text-white" />;
    case "evolucao_perfeita":
      return <Zap size={size} className="text-white" />;
    case "alta_hospitalar":
      return <CheckCircle size={size} className="text-white" />;
    case "dupla_checagem":
      return <Zap size={size} className="text-white" />;
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
      if (area === "clinica") return <Stethoscope size={12} className="opacity-90 text-white" />;
      if (area === "cirurgia") return <Scissors size={12} className="opacity-90 text-white" />;
      if (area === "urgencia") return <Activity size={12} className="opacity-90 text-white" />;
      if (area === "preventiva") return <ShieldAlert size={12} className="opacity-90 text-slate-700" />;
      return null;
  }
};

export const Board: React.FC = () => {
  const { board, teams, currentTeamIndex, phase } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // Auto-scale to fit parent container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const containerW = parent.clientWidth;
      const containerH = parent.clientHeight;
      const scaleX = containerW / 1050;
      const scaleY = containerH / 1050;
      setScale(Math.min(scaleX, scaleY, 1));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    const observer = new ResizeObserver(handleResize);
    if (containerRef.current?.parentElement) {
      observer.observe(containerRef.current.parentElement);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  // Render soft, curved path connections
  const renderPaths = () => {
    const lines: React.ReactNode[] = [];
    const drawn = new Set<string>();
    
    board.forEach((cell) => {
      if (!cell.next) return;
      
      cell.next.forEach((nextId) => {
        const key = `${Math.min(cell.id, nextId)}-${Math.max(cell.id, nextId)}`;
        if (drawn.has(key)) return;
        drawn.add(key);

        const targetCell = board.find((c) => c.id === nextId);
        if (!targetCell) return;

        const x1 = cell.position.x * 10;
        const y1 = cell.position.y * 10;
        const x2 = targetCell.position.x * 10;
        const y2 = targetCell.position.y * 10;

        const isShortcut = cell.pathGroup === "shortcut" || targetCell.pathGroup === "shortcut";
        const isLong = cell.pathGroup === "long" || targetCell.pathGroup === "long";
        
        let roadColor = "#E2E8F0";
        let borderColor = "#CBD5E1";

        if (isShortcut) {
          roadColor = "#DBEAFE";
          borderColor = "#93C5FD";
        } else if (isLong) {
          roadColor = "#EDE9FE";
          borderColor = "#C4B5FD";
        }

        // Small curve for organic feel
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.sqrt(dx * dx + dy * dy);
        const curveAmt = Math.min(len * 0.08, 12);
        const cx = mx + (-dy / len) * curveAmt;
        const cy = my + (dx / len) * curveAmt;

        const pathD = `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;

        lines.push(
          <g key={`path-${cell.id}-${nextId}`}>
            {/* Shadow */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(0, 0, 0, 0.04)"
              strokeWidth={28}
              strokeLinecap="round"
            />
            {/* Border */}
            <path
              d={pathD}
              fill="none"
              stroke={borderColor}
              strokeWidth={22}
              strokeLinecap="round"
            />
            {/* Road body */}
            <path
              d={pathD}
              fill="none"
              stroke={roadColor}
              strokeWidth={16}
              strokeLinecap="round"
            />
            {/* Center dashes */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,255,0.8)"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="3 7"
            />
          </g>
        );
      });
    });

    return lines;
  };

  // Render board cells
  const renderCells = () => {
    const { choosePath } = useGameStore.getState();
    const activeTeam = teams[currentTeamIndex];
    const isPathChoice = phase === "choosing_path" && activeTeam;
    
    const activeCell = activeTeam ? board.find((c) => c.id === activeTeam.position) : null;
    const selectableCellIds = activeCell?.next && activeCell.next.length > 1 ? activeCell.next : [];

    return board.map((cell) => {
      const x = cell.position.x * 10;
      const y = cell.position.y * 10;
      
      const isStart = cell.id === 0;
      const isFinal = cell.id === 50;
      const isSelectable = isPathChoice && selectableCellIds.includes(cell.id);
      
      // Color
      let color = areaColors.start;
      if (isFinal) color = areaColors.final;
      else if (cell.specialEffect === "curinga") color = areaColors.curinga;
      else if (cell.specialEffect) color = areaColors.special;
      else if (cell.area) color = areaColors[cell.area];

      const isSpecial = !!cell.specialEffect;
      const r = isStart || isFinal ? 24 : (isSpecial ? 20 : 16);

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
          {/* Selectable glow - soft drop shadow, no ring */}
          {isSelectable && (
            <circle
              cx={x}
              cy={y}
              r={r + 5}
              fill="none"
              stroke="#ec4899"
              strokeWidth={2.5}
              opacity={0.7}
              className="animate-gentle-pulse pointer-events-none"
            />
          )}

          {/* 3D shadow beneath cell */}
          <ellipse
            cx={x}
            cy={y + 3}
            rx={r}
            ry={r * 0.85}
            fill="rgba(0, 0, 0, 0.1)"
            className="pointer-events-none"
          />

          {/* Main cell circle */}
          <circle
            cx={x}
            cy={y}
            r={r}
            fill={isSelectable ? "#ec4899" : color}
            stroke="#FFFFFF"
            strokeWidth={2.5}
            className="transition-all duration-300"
          />

          {/* Glossy highlight */}
          <circle
            cx={x}
            cy={y}
            r={r}
            fill="url(#cellGlossy)"
            className="pointer-events-none"
          />

          {/* Special cell subtle inner ring */}
          {isSpecial && !isSelectable && (
            <circle
              cx={x}
              cy={y}
              r={r - 3}
              fill="none"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth={1}
              strokeDasharray="3 3"
              className="pointer-events-none"
            />
          )}

          {/* Icon or ID */}
          <g transform={`translate(${x}, ${y})`}>
            {cell.specialEffect || (cell.type === "normal" && cell.area) ? (
              <g transform={isSpecial ? "translate(-8, -8)" : "translate(-6, -6)"}>
                {getEffectIcon(cell.specialEffect, cell.area)}
              </g>
            ) : null}

            {/* Cell number */}
            {!isStart && !isFinal && !isSpecial && !cell.area && (
              <text
                x={0}
                y={4}
                textAnchor="middle"
                fill="#ffffff"
                className="text-[10px] font-black select-none pointer-events-none"
              >
                {cell.id}
              </text>
            )}

            {/* Start/End text */}
            {(isStart || isFinal) && (
              <text
                x={0}
                y={3}
                textAnchor="middle"
                fill="white"
                className="text-[8px] font-black tracking-wider uppercase select-none pointer-events-none"
              >
                {isStart ? "Início" : "🏆"}
              </text>
            )}
          </g>

          <title>{`${cell.label} (Casa ${cell.id})`}</title>
        </g>
      );
    });
  };

  // Render pawns as 3D game pieces
  const renderPawns = () => {
    return board.map((cell) => {
      const teamsOnCell = teams.filter((t) => t.position === cell.id);
      if (teamsOnCell.length === 0) return null;

      const cx = cell.position.x * 10;
      const cy = cell.position.y * 10;

      return (
        <g key={`pawns-group-${cell.id}`}>
          {teamsOnCell.map((team, index) => {
            const count = teamsOnCell.length;
            const activeTeam = teams[currentTeamIndex];
            const isActive = team.id === activeTeam.id && phase !== "game_over";

            let px = cx;
            let py = cy;
            
            if (count > 1) {
              const angle = (index * 2 * Math.PI) / count - Math.PI / 2;
              const radius = 14;
              px = cx + Math.cos(angle) * radius;
              py = cy + Math.sin(angle) * radius;
            }

            return (
              <g
                key={`pawn-${team.id}`}
                className="transition-pawn-hop"
                style={{
                  transform: `translate(${px}px, ${py}px)`,
                  "--glow-color": `${team.color}90`,
                } as React.CSSProperties}
              >
                {/* Pawn group with float animation for active */}
                <g className={isActive ? "animate-pawn-float animate-glow-pulse" : ""}>
                  {/* Base shadow */}
                  <ellipse
                    cx={0}
                    cy={13}
                    rx={9}
                    ry={3}
                    fill="rgba(0, 0, 0, 0.18)"
                    className="pointer-events-none"
                  />

                  {/* Pawn body */}
                  <circle
                    cx={0}
                    cy={0}
                    r={13}
                    fill={team.color}
                    stroke="#FFFFFF"
                    strokeWidth={2}
                    className="pointer-events-none"
                  />

                  {/* Glossy effect */}
                  <circle
                    cx={0}
                    cy={0}
                    r={13}
                    fill="url(#pawnGlossy)"
                    className="pointer-events-none"
                  />

                  {/* Pawn icon */}
                  <g transform="translate(-7, -7)" className="text-white pointer-events-none">
                    <PawnIcon type={team.pawn} size={14} />
                  </g>
                </g>

                <title>{team.name}</title>
              </g>
            );
          })}
        </g>
      );
    });
  };

  // Fun decorative elements
  const renderDecorations = () => {
    return (
      <g id="decorations" className="pointer-events-none select-none" opacity={0.15}>
        {/* Scattered medical emojis as fun decoration */}
        <text x="150" y="450" fontSize="28">🩺</text>
        <text x="850" y="500" fontSize="24">💉</text>
        <text x="500" y="150" fontSize="22">🏥</text>
        <text x="700" y="650" fontSize="20">🧬</text>
        <text x="300" y="700" fontSize="22">💊</text>
        <text x="900" y="250" fontSize="20">🔬</text>
        <text x="100" y="200" fontSize="24">❤️</text>
        <text x="600" y="800" fontSize="20">🩹</text>
      </g>
    );
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #eef2ff 100%)",
        border: "3px solid rgba(255,255,255,0.9)",
        boxShadow: "0 8px 32px -8px rgba(100, 116, 139, 0.15), inset 0 1px 0 rgba(255,255,255,0.8)"
      }}
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] bg-[size:18px_18px] pointer-events-none opacity-30" />
      
      {/* Soft gradient overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(248,250,252,0.4) 100%)"
      }} />

      {/* Scaled SVG container */}
      <div
        style={{
          width: "1050px",
          height: "1050px",
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          flexShrink: 0
        }}
        className="relative select-none"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Pawn glossy gradient */}
            <radialGradient id="pawnGlossy" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="95%" stopColor="#000000" stopOpacity="0.25" />
            </radialGradient>
            
            {/* Cell glossy gradient */}
            <radialGradient id="cellGlossy" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.1" />
            </radialGradient>
          </defs>

          {/* 1. Fun decorations */}
          {renderDecorations()}

          {/* 2. Path connections */}
          {renderPaths()}

          {/* 3. Board cells */}
          {renderCells()}

          {/* 4. Pawns */}
          {renderPawns()}
        </svg>
      </div>

      {/* Legend badge */}
      <div className="absolute bottom-3 left-3 right-3 md:right-auto bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl flex flex-wrap gap-2.5 text-[10px] border border-slate-200/70 pointer-events-none shadow-sm">
        {Object.entries(areaColors).map(([area, color]) => {
          if (["special", "start", "final"].includes(area)) return null;
          
          const names: Record<string, string> = {
            clinica: "Clínica",
            cirurgia: "Cirurgia",
            pediatria: "Pediatria",
            go: "G.O.",
            preventiva: "Preventiva",
            urgencia: "Urgência",
            curinga: "Curinga"
          };
          const name = names[area];
          if (!name) return null;

          return (
            <div key={area} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full border border-white/80 shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-500 font-bold">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
