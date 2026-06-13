import React, { useRef, useEffect, useState } from "react";
import { useGameStore } from "../../store/gameStore";
import { areaColors } from "../../data/board";
import { PawnIcon } from "./PawnIcon";
import { 
  Zap, 
  CheckCircle, 
  ShieldAlert, 
  Award,
  Send,
  CornerDownLeft,
  Stethoscope,
  Scissors,
  Activity,
  Coffee,
  Star,
  HeartPulse,
  Sparkles,
  Siren,
  Search,
  ArrowLeftRight,
  Baby,
  Heart
} from "lucide-react";
import type { SpecialEffectType } from "../../types/game";

const getEffectIcon = (effect?: SpecialEffectType, area?: string, size = 15) => {
  switch (effect) {
    case "curinga":
      return <Sparkles size={size} className="text-white fill-yellow-100/30" />;
    case "plantao_tranquilo":
      return <Coffee size={size} className="text-white" />;
    case "evolucao_perfeita":
      return <Star size={size} className="text-white fill-yellow-300 stroke-yellow-500" />;
    case "alta_hospitalar":
      return <CheckCircle size={size} className="text-white" />;
    case "dupla_checagem":
      return <Search size={size} className="text-white" />;
    case "plantao_caotico":
      return <Zap size={size} className="text-white fill-amber-300 stroke-amber-500 animate-pulse" />;
    case "caso_grave":
      return <HeartPulse size={size} className="text-white" />;
    case "risco_cirurgico":
      return <ShieldAlert size={size} className="text-white" />;
    case "intercorrencia":
      return <Siren size={size} className="text-white fill-red-300/40" />;
    case "pergunta_r3":
      return <Award size={size} className="text-white fill-yellow-400 stroke-yellow-600" />;
    case "passa_plantao":
      return <Send size={size} className="text-white" />;
    case "troca_leito":
      return <ArrowLeftRight size={size} className="text-white" />;
    case "contra_referencia":
      return <CornerDownLeft size={size} className="text-white" />;
    default:
      if (area === "clinica") return <Stethoscope size={size - 2} className="opacity-95 text-white" />;
      if (area === "cirurgia") return <Scissors size={size - 2} className="opacity-95 text-white" />;
      if (area === "urgencia") return <Activity size={size - 2} className="opacity-95 text-white" />;
      if (area === "preventiva") return <ShieldAlert size={size - 2} className="opacity-95 text-white" />;
      if (area === "pediatria") return <Baby size={size - 2} className="opacity-95 text-white" />;
      if (area === "go") return <Heart size={size - 2} className="opacity-95 text-white" />;
      return null;
  }
};

export const Board: React.FC = () => {
  const { board, teams, currentTeamIndex, phase, isMoving, isReturning, originPosition, selectedCell } = useGameStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const activeTeam = teams[currentTeamIndex];
  const shouldZoom = (
    phase === "moving" || 
    phase === "revealing_cell" || 
    phase === "choosing_path" || 
    phase === "choosing_area" || 
    phase === "answering" || 
    phase === "resolving" || 
    isMoving
  ) && activeTeam;

  let currentZoom = 1.0;
  let currentTx = 0;
  let currentTy = 0;

  if (shouldZoom) {
    const targetCell = board.find((c) => c.id === activeTeam.position);
    if (targetCell) {
      const cx = targetCell.position.x * 10;
      const cy = targetCell.position.y * 10;
      const zoom = phase === "revealing_cell" ? 1.50 : 1.38;
      const maxOffset = 500 * (1 - 1 / zoom);
      currentZoom = zoom;
      currentTx = Math.max(-maxOffset, Math.min(maxOffset, 500 - cx));
      currentTy = Math.max(-maxOffset, Math.min(maxOffset, 500 - cy));
    }
  }

  // Auto-scale to fit parent container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const containerW = parent.clientWidth;
      const containerH = parent.clientHeight;
      const scaleX = (containerW - 20) / 1050;
      const scaleY = (containerH - 20) / 1050;
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

  const [landedCells, setLandedCells] = useState<Record<number, { delay: number; key: number }>>({});
  const prevPositionsRef = useRef<Record<string, number>>({});

  useEffect(() => {
    teams.forEach((team) => {
      const prevPos = prevPositionsRef.current[team.id];
      if (prevPos !== undefined && prevPos !== team.position) {
        const nextPos = team.position;
        if (nextPos > 0 || prevPos > 0) {
          const delay = isReturning ? 600 : 750;
          setLandedCells((prev) => ({
            ...prev,
            [nextPos]: { delay, key: Date.now() + Math.random() }
          }));

          // Remove after animation completes
          setTimeout(() => {
            setLandedCells((prev) => {
              const copy = { ...prev };
              delete copy[nextPos];
              return copy;
            });
          }, delay + 450);
        }
      }
      prevPositionsRef.current[team.id] = team.position;
    });
  }, [teams, isReturning]);

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
        
        let roadColor = "#F3E8FF"; // Lilás claro macio para caminho comum
        let borderColor = "#E9D5FF"; // Borda lilás para caminho comum

        if (isShortcut) {
          roadColor = "#E0F2FE"; // Azul claro macio para atalhos
          borderColor = "#BAE6FD";
        } else if (isLong) {
          roadColor = "#FEF3C7"; // Creme para o caminho longo
          borderColor = "#FDE68A";
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
              stroke="rgba(0, 0, 0, 0.05)"
              strokeWidth={60}
              strokeLinecap="round"
            />
            {/* Border */}
            <path
              d={pathD}
              fill="none"
              stroke={borderColor}
              strokeWidth={52}
              strokeLinecap="round"
            />
            {/* Road body */}
            <path
              d={pathD}
              fill="none"
              stroke={roadColor}
              strokeWidth={44}
              strokeLinecap="round"
            />
          </g>
        );
      });
    });

    return lines;
  };const getCellFill = (cell: any, isStart: boolean, isFinal: boolean) => {
  if (isStart) return "url(#grad-start)";
  if (isFinal) return "url(#grad-final)";
  if (cell.specialEffect === "curinga") return "url(#grad-curinga)";
  if (cell.specialEffect) return "url(#grad-special)";
  if (cell.area) return `url(#grad-${cell.area})`;
  return "url(#grad-start)";
};

  // Helper to calculate cell path angle
  const getCellAngle = (cell: any, board: any[]) => {
    const x = cell.position.x * 10;
    const y = cell.position.y * 10;

    let nextCell = cell.next && cell.next.length > 0 ? board.find((c) => c.id === cell.next[0]) : null;
    let prevCell = board.find((c) => c.next && c.next.includes(cell.id));

    let dx = 0;
    let dy = 0;

    if (prevCell && nextCell) {
      dx = (nextCell.position.x * 10) - (prevCell.position.x * 10);
      dy = (nextCell.position.y * 10) - (prevCell.position.y * 10);
    } else if (nextCell) {
      dx = (nextCell.position.x * 10) - x;
      dy = (nextCell.position.y * 10) - y;
    } else if (prevCell) {
      dx = x - (prevCell.position.x * 10);
      dy = y - (prevCell.position.y * 10);
    } else {
      return 0;
    }

    return (Math.atan2(dy, dx) * 180) / Math.PI;
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


      const teamsOnCell = teams.filter((t) => t.position === cell.id);
      const cellTeamsKey = teamsOnCell.map((t) => t.id).join("_");

      const isFinalCell = phase === "revealing_cell" && cell.id === activeTeam.position;
      const isLandedCell = selectedCell && selectedCell.id === cell.id && (phase === "moving" || phase === "revealing_cell");

      const angle = getCellAngle(cell, board);

      return (
        <g 
          key={`cell-${cell.id}`} 
          className={`group transition-all duration-200 origin-center ${
            isSelectable ? "cursor-pointer hover:scale-110" : "hover:scale-[1.05]"
          }`}
          style={{
            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
            transformOrigin: "0px 0px",
          } as React.CSSProperties}
          onClick={() => {
            if (isSelectable) {
              choosePath(cell.id);
            }
          }}
        >
          {/* Landing highlight pulse */}
          {isLandedCell && (
            isStart || isFinal ? (
              <circle
                cx={0}
                cy={0}
                r={24}
                fill="none"
                stroke={color}
                className="pointer-events-none"
              >
                <animate attributeName="r" values="24;36" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="stroke-width" values="5;1" dur="1.2s" repeatCount="indefinite" />
              </circle>
            ) : (
              <rect
                x={-29}
                y={-20}
                width={58}
                height={40}
                rx={10}
                fill="none"
                stroke={color}
                className="pointer-events-none"
              >
                <animate attributeName="width" values="58;74" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="height" values="40;56" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="x" values="-29;-37" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="y" values="-20;-28" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="1.2s" repeatCount="indefinite" />
                <animate attributeName="stroke-width" values="5;1" dur="1.2s" repeatCount="indefinite" />
              </rect>
            )
          )}

          {/* Origin cell highlight */}
          {isMoving && cell.id === originPosition && (
            isStart || isFinal ? (
              <circle
                cx={0}
                cy={0}
                r={28}
                fill="none"
                stroke="#6366f1"
                strokeWidth={2.2}
                opacity={0.8}
                className="animate-origin-highlight pointer-events-none"
              />
            ) : (
              <rect
                x={-33}
                y={-24}
                width={66}
                height={48}
                rx={14}
                fill="none"
                stroke="#6366f1"
                strokeWidth={2.2}
                opacity={0.8}
                className="animate-origin-highlight pointer-events-none"
              />
            )
          )}

          {/* Selectable glow - soft drop shadow, no ring */}
          {isSelectable && (
            isStart || isFinal ? (
              <circle
                cx={0}
                cy={0}
                r={29}
                fill="none"
                stroke="#ec4899"
                strokeWidth={2.5}
                opacity={0.7}
                className="animate-gentle-pulse pointer-events-none"
              />
            ) : (
              <rect
                x={-33}
                y={-24}
                width={66}
                height={48}
                rx={14}
                fill="none"
                stroke="#ec4899"
                strokeWidth={2.5}
                opacity={0.7}
                className="animate-gentle-pulse pointer-events-none"
              />
            )
          )}

          {/* 3D shadow beneath cell */}
          {isStart || isFinal ? (
            <ellipse
              cx={0}
              cy={3.5}
              rx={24}
              ry={20.4}
              fill="rgba(0, 0, 0, 0.12)"
              className="pointer-events-none transition-transform duration-200 group-hover:translate-y-[1px]"
            />
          ) : (
            <rect
              x={-29}
              y={-16.5}
              width={58}
              height={40}
              rx={10}
              fill="rgba(0, 0, 0, 0.12)"
              className="pointer-events-none transition-transform duration-200 group-hover:translate-y-[1px]"
            />
          )}

          {/* Special cell outer gold glow ring */}
          {isSpecial && !isSelectable && (
            <rect
              x={-32}
              y={-23}
              width={64}
              height={46}
              rx={13}
              fill="none"
              stroke="url(#grad-gold-border)"
              strokeWidth={1.5}
              opacity={0.7}
              className="pointer-events-none animate-gentle-pulse"
            />
          )}

          {/* Main cell circle or rect */}
          {isStart || isFinal ? (
            <circle
              key={`circle-${cell.id}-${cellTeamsKey}-${landedCells[cell.id]?.key || "idle"}`}
              cx={0}
              cy={0}
              r={24}
              fill={isSelectable ? "url(#grad-curinga)" : getCellFill(cell, isStart, isFinal)}
              stroke={isSpecial ? "url(#grad-gold-border)" : "#FFFFFF"}
              strokeWidth={isSpecial ? 3.5 : 3.0}
              className={`transition-all duration-300 ${
                isFinalCell 
                  ? "animate-final-cell-highlight" 
                  : (landedCells[cell.id] ? "animate-cell-land" : "")
              }`}
              style={{
                "--cell-color": color,
                "--cell-x": "0px",
                "--cell-y": "0px",
                "--hop-duration": `${landedCells[cell.id]?.delay || (isReturning ? 500 : 800)}ms`
              } as React.CSSProperties}
            />
          ) : (
            <rect
              key={`rect-${cell.id}-${cellTeamsKey}-${landedCells[cell.id]?.key || "idle"}`}
              x={-29}
              y={-20}
              width={58}
              height={40}
              rx={10}
              fill={isSelectable ? "url(#grad-curinga)" : getCellFill(cell, isStart, isFinal)}
              stroke={isSpecial ? "url(#grad-gold-border)" : "#FFFFFF"}
              strokeWidth={isSpecial ? 3.5 : 3.0}
              className={`transition-all duration-300 ${
                isFinalCell 
                  ? "animate-final-cell-highlight" 
                  : (landedCells[cell.id] ? "animate-cell-land" : "")
              }`}
              style={{
                "--cell-color": color,
                "--cell-x": "0px",
                "--cell-y": "0px",
                "--hop-duration": `${landedCells[cell.id]?.delay || (isReturning ? 500 : 800)}ms`
              } as React.CSSProperties}
            />
          )}

          {/* Glossy highlight */}
          {isStart || isFinal ? (
            <circle
              cx={0}
              cy={0}
              r={24}
              fill="url(#cellGlossy)"
              className="pointer-events-none"
            />
          ) : (
            <rect
              x={-29}
              y={-20}
              width={58}
              height={40}
              rx={10}
              fill="url(#cellGlossy)"
              className="pointer-events-none"
            />
          )}

          {/* Special cell subtle inner ring */}
          {isSpecial && !isSelectable && (
            <rect
              x={-26}
              y={-17}
              width={52}
              height={34}
              rx={7}
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth={1}
              strokeDasharray="3 3"
              className="pointer-events-none"
            />
          )}

          {/* Small gold star seal badge for special cells */}
          {isSpecial && !isSelectable && (
            <g transform="translate(26, -17)" className="pointer-events-none">
              <circle r={5.5} fill="#D4AF37" stroke="#FFFFFF" strokeWidth={1} />
              <polygon points="0,-2.5 0.7,-0.7 2.5,-0.7 1,0.4 1.5,2.2 0,1.1 -1.5,2.2 -1,0.4 -2.5,-0.7 -0.7,-0.7" fill="#FFFFFF" />
            </g>
          )}

          {/* Icon or ID - rotation cancelled to keep text/icon upright */}
          <g transform={`rotate(${-angle})`} className="pointer-events-none">
            {cell.specialEffect || (cell.type === "normal" && cell.area) ? (
              <g transform={`translate(-${(isSpecial ? 20 : 14) / 2}, -${(isSpecial ? 20 : 14) / 2})`}>
                {getEffectIcon(cell.specialEffect, cell.area, isSpecial ? 20 : 14)}
              </g>
            ) : null}

            {/* Cell number */}
            {!isStart && !isFinal && !isSpecial && !cell.area && (
              <text
                x={0}
                y={3.5}
                textAnchor="middle"
                fill="#ffffff"
                className="text-[9px] font-black tracking-tighter select-none pointer-events-none"
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

          <title>{isSpecial ? `Casa Especial: ${cell.label} (${cell.id})\nEfeito: ${cell.label}` : `${cell.label} (Casa ${cell.id})`}</title>
        </g>
      );
    });
  };

  // Render pawns as 3D game pieces
  const renderPawns = () => {
    const hopDuration = isReturning ? 500 : 800;

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
                  "--hop-duration": `${hopDuration}ms`,
                } as React.CSSProperties}
              >
                {/* Remounts on position changes to restart jump keyframes */}
                <g key={team.position} className="animate-pawn-hop">
                  {/* Float wrapper - only active when NOT moving */}
                  <g className={isActive && !isMoving ? "animate-active-pawn" : ""}>
                    {/* Glow wrapper - active all the time */}
                    <g className={isActive ? "animate-active-glow" : ""}>
                      {/* Base shadow with blur */}
                      <ellipse
                        cx={0}
                        cy={14}
                        rx={9}
                        ry={3}
                        fill="rgba(0, 0, 0, 0.25)"
                        filter="url(#shadowBlur)"
                        className="pawn-shadow-anim pointer-events-none"
                      />

                      {/* Pawn body wrapper (handles hop vertical translate & scale) */}
                      <g className="pawn-body-anim">
                        {/* 1. Base (flat ring on board) */}
                        <ellipse
                          cx={0}
                          cy={9}
                          rx={12}
                          ry={4.5}
                          fill="#FFFFFF"
                          className="pointer-events-none"
                        />
                        <ellipse
                          cx={0}
                          cy={9}
                          rx={10.5}
                          ry={3.2}
                          fill={team.color}
                          className="pointer-events-none"
                        />

                        {/* 2. Body Cone */}
                        <polygon
                          points="-10,9 -5,-2 5,-2 10,9"
                          fill="#FFFFFF"
                          className="pointer-events-none"
                        />
                        <polygon
                          points="-8.5,8.5 -4,-1.5 4,-1.5 8.5,8.5"
                          fill={team.color}
                          className="pointer-events-none"
                        />

                        {/* Glossy overlay on cone */}
                        <polygon
                          points="-8.5,8.5 -4,-1.5 4,-1.5 8.5,8.5"
                          fill="url(#pawnGlossy)"
                          opacity={0.35}
                          className="pointer-events-none"
                        />

                        {/* 3. Head Sphere */}
                        <circle
                          cx={0}
                          cy={-5}
                          r={9}
                          fill="#FFFFFF"
                          className="pointer-events-none"
                        />
                        <circle
                          cx={0}
                          cy={-5}
                          r={7.5}
                          fill={team.color}
                          className="pointer-events-none"
                        />

                        {/* Specular highlights for 3D sphere look */}
                        <circle
                          cx={0}
                          cy={-5}
                          r={7.5}
                          fill="url(#pawnGlossy)"
                          className="pointer-events-none"
                        />
                        <ellipse
                          cx={-2.5}
                          cy={-7.5}
                          rx={2.5}
                          ry={1.5}
                          fill="#ffffff"
                          opacity={0.6}
                          transform="rotate(-30, -2.5, -7.5)"
                          className="pointer-events-none"
                        />

                        {/* Pawn icon on the body cone */}
                        <g transform="translate(-6, -2.5)" className="text-white pointer-events-none">
                          <PawnIcon type={team.pawn} size={12} />
                        </g>
                      </g>
                    </g>
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
      <>
        {/* Scattered medical emojis as fun decoration */}
        <g id="decorations" className="pointer-events-none select-none animate-fade-in" opacity={0.13}>
          <text x="150" y="450" fontSize="28">🩺</text>
          <text x="850" y="500" fontSize="24">💉</text>
          <text x="500" y="150" fontSize="22">🏥</text>
          <text x="700" y="650" fontSize="20">🧬</text>
          <text x="300" y="700" fontSize="22">💊</text>
          <text x="900" y="250" fontSize="20">🔬</text>
          <text x="100" y="200" fontSize="24">❤️</text>
          <text x="600" y="800" fontSize="20">🩹</text>
        </g>
        
        {/* Hospital wings decorative background badges */}
        <g id="hospital-wings" className="pointer-events-none select-none animate-fade-in" opacity={0.85}>
          {/* Pronto-Socorro near bottom trail */}
          <g transform="translate(500, 930)">
            <rect x="-90" y="-15" width="180" height="30" rx="12" fill="#F58C3D" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">🚨 PRONTO-SOCORRO</text>
          </g>

          {/* Ambulatório near long path */}
          <g transform="translate(500, 810)">
            <rect x="-95" y="-15" width="190" height="30" rx="12" fill="#4F8EF7" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">🩺 AMBULATÓRIO GERAL</text>
          </g>

          {/* Centro Cirúrgico near middle trail */}
          <g transform="translate(480, 600)">
            <rect x="-90" y="-15" width="180" height="30" rx="12" fill="#F25C5C" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">✂️ CENTRO CIRÚRGICO</text>
          </g>

          {/* UTI near shortcut superior */}
          <g transform="translate(740, 440)">
            <rect x="-80" y="-15" width="160" height="30" rx="12" fill="#A56CF5" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">💖 U.T.I. CORONÁRIA</text>
          </g>

          {/* Enfermaria near curvature */}
          <g transform="translate(820, 200)">
            <rect x="-85" y="-15" width="170" height="30" rx="12" fill="#34C78A" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">🛌 ALA DE INTERNAÇÃO</text>
          </g>

          {/* Diretoria near final */}
          <g transform="translate(300, 160)">
            <rect x="-95" y="-15" width="190" height="30" rx="12" fill="#F5C042" />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#FFFFFF" letterSpacing="1">🏆 DIRETORIA DO HOSPITAL</text>
          </g>
        </g>
      </>
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
          transform: `scale(${scale * currentZoom}) translate(${currentTx}px, ${currentTy}px)`,
          transformOrigin: "center center",
          flexShrink: 0,
          transition: "transform 800ms cubic-bezier(0.25, 1, 0.5, 1)"
        }}
        className="relative select-none"
      >
        <svg
          viewBox="0 0 1000 1000"
          className="w-full h-full"
          style={{ overflow: "visible" }}
        >
          <defs>
            {/* Soft shadow blur filter */}
            <filter id="shadowBlur" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" />
            </filter>

            {/* Cell Drop Shadow Filter */}
            <filter id="cellShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="3" stdDeviation="2" floodOpacity="0.15" />
            </filter>

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
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </radialGradient>

            {/* Gold border gradient */}
            <linearGradient id="grad-gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE07D" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#F5C042" />
            </linearGradient>

            {/* 3D gradients for each area */}
            <linearGradient id="grad-clinica" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#76A9FF" />
              <stop offset="100%" stopColor="#3B7AE6" />
            </linearGradient>

            <linearGradient id="grad-cirurgia" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFA1A1" />
              <stop offset="100%" stopColor="#D93A3A" />
            </linearGradient>

            <linearGradient id="grad-pediatria" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5BE6AA" />
              <stop offset="100%" stopColor="#27A36E" />
            </linearGradient>

            <linearGradient id="grad-go" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C295FF" />
              <stop offset="100%" stopColor="#834DE0" />
            </linearGradient>

            <linearGradient id="grad-preventiva" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE07D" />
              <stop offset="100%" stopColor="#DCA524" />
            </linearGradient>

            <linearGradient id="grad-urgencia" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFAE6B" />
              <stop offset="100%" stopColor="#D97021" />
            </linearGradient>

            <linearGradient id="grad-special" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6BE8EB" />
              <stop offset="100%" stopColor="#26A0A3" />
            </linearGradient>

            <linearGradient id="grad-start" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>

            <linearGradient id="grad-final" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>

            {/* Multicolored gradient for wildcard / curinga */}
            <linearGradient id="grad-curinga" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#E85AAD" />
              <stop offset="35%" stopColor="#A56CF5" />
              <stop offset="70%" stopColor="#4F8EF7" />
              <stop offset="100%" stopColor="#3CBCBF" />
            </linearGradient>
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
      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl flex flex-wrap gap-2 text-[9px] border border-slate-200/70 pointer-events-auto hover:opacity-10 transition-opacity duration-300 shadow-sm z-20">
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
            <div key={area} className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/80 shadow-sm animate-fade-in"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-500 font-extrabold">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
