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
      const cx = targetCell.position.x * 1.2 * 10;
      const cy = targetCell.position.y * 10;
      const zoom = phase === "revealing_cell" ? 1.40 : 1.30;
      const maxOffsetX = 600 * (1 - 1 / zoom);
      const maxOffsetY = 475 * (1 - 1 / zoom);
      currentZoom = zoom;
      currentTx = Math.max(-maxOffsetX, Math.min(maxOffsetX, 600 - cx));
      currentTy = Math.max(-maxOffsetY, Math.min(maxOffsetY, 475 - cy));
    }
  }

  // Auto-scale to fit parent container
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const parent = containerRef.current.parentElement;
      if (!parent) return;
      const containerW = parent.clientWidth - 16;
      const containerH = parent.clientHeight - 16;
      const scaleX = containerW / 1200;
      const scaleY = containerH / 950;
      setScale(Math.min(scaleX, scaleY, 1.25));
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

  // Helper to build continuous curved path strings for SVG
  const buildPathD = (cells: typeof board) => {
    if (cells.length < 2) return "";
    let d = "";
    
    for (let i = 0; i < cells.length; i++) {
      const x = cells[i].position.x * 1.2 * 10;
      const y = cells[i].position.y * 10;
      
      if (i === 0) {
        d += `M ${x} ${y}`;
      } else {
        const prevX = cells[i - 1].position.x * 1.2 * 10;
        const prevY = cells[i - 1].position.y * 10;
        
        // If it's a straight horizontal line, draw straight line
        if (Math.abs(y - prevY) < 1) {
          d += ` L ${x} ${y}`;
        } else {
          // Curve it slightly
          const mx = (prevX + x) / 2;
          const my = (prevY + y) / 2;
          const dx = x - prevX;
          const dy = y - prevY;
          const len = Math.sqrt(dx * dx + dy * dy);
          const curveAmt = Math.min(len * 0.1, 15);
          const cx = mx + (-dy / len) * curveAmt;
          const cy = my + (dx / len) * curveAmt;
          
          d += ` Q ${cx} ${cy} ${x} ${y}`;
        }
      }
    }
    return d;
  };

  // Render soft, curved path connections as continuous roads
  const renderPaths = () => {
    const tracks = [
      // Main trunk 1 (Bottom row)
      {
        ids: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        roadColor: "#F8FAFC",
        borderColor: "#E2E8F0",
        shadowColor: "rgba(15, 23, 42, 0.03)"
      },
      // Shortcut 1 (Teal/Green shortcut)
      {
        ids: [12, 13, 14, 15, 16, 17, 18, 23],
        roadColor: "#ECFDF5",
        borderColor: "#A7F3D0",
        shadowColor: "rgba(4, 120, 87, 0.03)"
      },
      // Long 1 (Amber/Creme long path)
      {
        ids: [12, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 23],
        roadColor: "#FFFBEB",
        borderColor: "#FDE68A",
        shadowColor: "rgba(180, 83, 9, 0.03)"
      },
      // Main trunk 2 (Middle row)
      {
        ids: [23, 24, 25, 26, 27, 28, 29, 30],
        roadColor: "#F8FAFC",
        borderColor: "#E2E8F0",
        shadowColor: "rgba(15, 23, 42, 0.03)"
      },
      // Shortcut 2 (UTI shortcut)
      {
        ids: [30, 31, 32, 33, 40],
        roadColor: "#ECFDF5",
        borderColor: "#A7F3D0",
        shadowColor: "rgba(4, 120, 87, 0.03)"
      },
      // Long 2 (Enfermaria long path)
      {
        ids: [30, 301, 302, 303, 304, 305, 306, 307, 40],
        roadColor: "#FFFBEB",
        borderColor: "#FDE68A",
        shadowColor: "rgba(180, 83, 9, 0.03)"
      },
      // Main trunk 3 (Top row + final)
      {
        ids: [40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        roadColor: "#F8FAFC",
        borderColor: "#E2E8F0",
        shadowColor: "rgba(15, 23, 42, 0.03)"
      }
    ];

    return tracks.map((track, idx) => {
      const trackCells = track.ids
        .map(id => board.find(c => c.id === id))
        .filter((c): c is typeof board[0] => !!c);

      const pathD = buildPathD(trackCells);

      return (
        <g key={`track-${idx}`}>
          {/* Shadow */}
          <path
            d={pathD}
            fill="none"
            stroke={track.shadowColor}
            strokeWidth={92}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Border */}
          <path
            d={pathD}
            fill="none"
            stroke={track.borderColor}
            strokeWidth={80}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Road body */}
          <path
            d={pathD}
            fill="none"
            stroke={track.roadColor}
            strokeWidth={72}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      );
    });
  };

  const getCellFill = (cell: any, isStart: boolean, isFinal: boolean) => {
    if (isStart) return "url(#grad-start)";
    if (isFinal) return "url(#grad-final)";
    if (cell.specialEffect === "curinga") return "url(#grad-curinga)";
    if (cell.specialEffect) return "url(#grad-special)";
    if (cell.area) return `url(#grad-${cell.area})`;
    return "url(#grad-start)";
  };

  // Helper to calculate cell path angle
  const getCellAngle = (cell: any, board: any[]) => {
    const x = cell.position.x * 1.2 * 10;
    const y = cell.position.y * 10;

    let nextCell = cell.next && cell.next.length > 0 ? board.find((c) => c.id === cell.next[0]) : null;
    let prevCell = board.find((c) => c.next && c.next.includes(cell.id));

    let dx = 0;
    let dy = 0;

    if (prevCell && nextCell) {
      dx = (nextCell.position.x * 1.2 * 10) - (prevCell.position.x * 1.2 * 10);
      dy = (nextCell.position.y * 10) - (prevCell.position.y * 10);
    } else if (nextCell) {
      dx = (nextCell.position.x * 1.2 * 10) - x;
      dy = (nextCell.position.y * 10) - y;
    } else if (prevCell) {
      dx = x - (prevCell.position.x * 1.2 * 10);
      dy = y - (prevCell.position.y * 10);
    } else {
      return 0;
    }

    let angle = (Math.atan2(dy, dx) * 180) / Math.PI;

    // Normalize angle to keep rectangle oriented nicely
    if (angle > 90) angle -= 180;
    if (angle < -90) angle += 180;

    // Strict clamp: normal cell rotation must be between -4 and 4 degrees.
    // In straight horizontal segments (where vertical difference is negligible), set to exactly 0.
    if (Math.abs(dy) < 5) {
      return 0;
    }
    
    return Math.max(-4, Math.min(4, angle));
  };

  // Render board cells
  const renderCells = () => {
    const { choosePath } = useGameStore.getState();
    const activeTeam = teams[currentTeamIndex];
    const isPathChoice = phase === "choosing_path" && activeTeam;
    
    const activeCell = activeTeam ? board.find((c) => c.id === activeTeam.position) : null;
    const selectableCellIds = activeCell?.next && activeCell.next.length > 1 ? activeCell.next : [];

    return board.map((cell) => {
      const x = cell.position.x * 1.2 * 10;
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

      const cellW = isStart ? 84 : (isFinal ? 84 : 76);
      const cellH = isStart ? 56 : (isFinal ? 56 : 52);
      const cellX = -cellW / 2;
      const cellY = -cellH / 2;
      const cellRx = isStart || isFinal ? 14 : 12;
      const cellStrokeWidth = isFinal || isSpecial ? 2.5 : 2.0;
      const cellStroke = isFinal || isSpecial ? "url(#grad-gold-border)" : "#FFFFFF";

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
            <rect
              x={cellX}
              y={cellY}
              width={cellW}
              height={cellH}
              rx={cellRx}
              fill="none"
              stroke={color}
              className="pointer-events-none"
            >
              <animate attributeName="width" values={`${cellW};${cellW + 12}`} dur="1s" repeatCount="indefinite" />
              <animate attributeName="height" values={`${cellH};${cellH + 12}`} dur="1s" repeatCount="indefinite" />
              <animate attributeName="x" values={`${cellX};${cellX - 6}`} dur="1s" repeatCount="indefinite" />
              <animate attributeName="y" values={`${cellY};${cellY - 6}`} dur="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.7;0" dur="1s" repeatCount="indefinite" />
              <animate attributeName="stroke-width" values="4;1" dur="1s" repeatCount="indefinite" />
            </rect>
          )}

          {/* Origin cell highlight */}
          {isMoving && cell.id === originPosition && (
            <rect
              x={cellX - 3}
              y={cellY - 3}
              width={cellW + 6}
              height={cellH + 6}
              rx={cellRx + 3}
              fill="none"
              stroke="#6366f1"
              strokeWidth={2.0}
              opacity={0.7}
              className="animate-origin-highlight pointer-events-none"
            />
          )}

          {/* Selectable glow - soft drop shadow, no ring */}
          {isSelectable && (
            <rect
              x={cellX - 3}
              y={cellY - 3}
              width={cellW + 6}
              height={cellH + 6}
              rx={cellRx + 3}
              fill="none"
              stroke="#ec4899"
              strokeWidth={2.0}
              opacity={0.7}
              className="animate-gentle-pulse pointer-events-none"
            />
          )}

          {/* 3D shadow beneath cell */}
          <rect
            x={cellX}
            y={cellY + 3.0}
            width={cellW}
            height={cellH}
            rx={cellRx}
            fill="rgba(0, 0, 0, 0.12)"
            className="pointer-events-none transition-transform duration-200 group-hover:translate-y-[1px]"
          />

          {/* Main cell block */}
          <rect
            key={`rect-${cell.id}-${cellTeamsKey}-${landedCells[cell.id]?.key || "idle"}`}
            x={cellX}
            y={cellY}
            width={cellW}
            height={cellH}
            rx={cellRx}
            fill={isSelectable ? "url(#grad-curinga)" : getCellFill(cell, isStart, isFinal)}
            stroke={cellStroke}
            strokeWidth={cellStrokeWidth}
            className={`transition-all duration-300 ${
              isFinalCell 
                ? "animate-final-cell-highlight" 
                : (landedCells[cell.id] ? "animate-cell-land" : "")
            }`}
            style={{
              "--cell-color": color,
              "--cell-x": "0px",
              "--cell-y": "0px",
              "--hop-duration": `${landedCells[cell.id]?.delay || (isReturning ? 650 : 850)}ms`,
              "--hop-delay": `${isReturning ? "650ms" : "850ms"}`
            } as React.CSSProperties}
          />

          {/* Glossy highlight */}
          <rect
            x={cellX}
            y={cellY}
            width={cellW}
            height={cellH}
            rx={cellRx}
            fill="url(#cellGlossy)"
            className="pointer-events-none"
          />

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

            {/* Start text */}
            {isStart && (
              <text
                x={0}
                y={3.5}
                textAnchor="middle"
                fill="white"
                className="text-[9px] font-black tracking-wider uppercase select-none pointer-events-none"
              >
                INÍCIO
              </text>
            )}

            {/* Finish text */}
            {isFinal && (
              <g transform="translate(0, -2)">
                <text
                  x={0}
                  y={-2}
                  textAnchor="middle"
                  fill="white"
                  className="text-[12px] select-none pointer-events-none"
                >
                  🏆
                </text>
                <text
                  x={0}
                  y={10}
                  textAnchor="middle"
                  fill="white"
                  className="text-[8px] font-black tracking-wider uppercase select-none pointer-events-none"
                >
                  FIM
                </text>
              </g>
            )}
          </g>

          <title>{isSpecial ? `Casa Especial: ${cell.label} (${cell.id})\nEfeito: ${cell.label}` : `${cell.label} (Casa ${cell.id})`}</title>
        </g>
      );
    });
  };

  // Render pawns as 3D game pieces
  const renderPawns = () => {
    const hopDuration = isReturning ? 650 : 850;

    return board.map((cell) => {
      const teamsOnCell = teams.filter((t) => t.position === cell.id);
      if (teamsOnCell.length === 0) return null;

      const cx = cell.position.x * 1.2 * 10;
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
        {/* Scattered medical emojis as fun decoration - scaled X by 1.2 */}
        <g id="decorations" className="pointer-events-none select-none animate-fade-in" opacity={0.05}>
          <text x="180" y="450" fontSize="28">🩺</text>
          <text x="1020" y="500" fontSize="24">💉</text>
          <text x="600" y="150" fontSize="22">🏥</text>
          <text x="840" y="650" fontSize="20">🧬</text>
          <text x="360" y="700" fontSize="22">💊</text>
          <text x="1080" y="250" fontSize="20">🔬</text>
          <text x="120" y="200" fontSize="24">❤️</text>
          <text x="720" y="800" fontSize="20">🩹</text>
        </g>
        
        {/* Hospital wings decorative background badges - scaled X by 1.2 */}
        <g id="hospital-wings" className="pointer-events-none select-none animate-fade-in" opacity={0.7}>
          {/* Pronto-Socorro near bottom trail */}
          <g transform="translate(550, 920)">
            {/* 3D bottom shadow */}
            <rect x="-92" y="-12" width="184" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-90" y="-15" width="180" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#F58C3D" letterSpacing="1">🚨 PRONTO-SOCORRO</text>
            {/* Cute building Standee */}
            <g transform="translate(-112, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#F58C3D" stroke="#FFFFFF" strokeWidth={1.5} />
              <rect x="-4" y="4" width="8" height="10" fill="#FFFFFF" rx="1.5" />
              {/* Red Cross */}
              <rect x="-1.5" y="-10" width="3" height="9" fill="#FFFFFF" />
              <rect x="-4.5" y="-7" width="9" height="3" fill="#FFFFFF" />
            </g>
          </g>

          {/* Ambulatório near long path */}
          <g transform="translate(550, 805)">
            {/* 3D bottom shadow */}
            <rect x="-97" y="-12" width="194" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-95" y="-15" width="190" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#4F8EF7" letterSpacing="1">🩺 AMBULATÓRIO GERAL</text>
            {/* Cute building Standee */}
            <g transform="translate(-117, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#4F8EF7" stroke="#FFFFFF" strokeWidth={1.5} />
              <rect x="-4" y="4" width="8" height="10" fill="#FFFFFF" rx="1.5" />
              {/* Windows */}
              <rect x="-7" y="-7" width="5" height="5" fill="#FFFFFF" rx="1" />
              <rect x="2" y="-7" width="5" height="5" fill="#FFFFFF" rx="1" />
            </g>
          </g>

          {/* Centro Cirúrgico near middle trail */}
          <g transform="translate(550, 560)">
            {/* 3D bottom shadow */}
            <rect x="-92" y="-12" width="184" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-90" y="-15" width="180" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#F25C5C" letterSpacing="1">✂️ CENTRO CIRÚRGICO</text>
            {/* Cute building Standee */}
            <g transform="translate(-112, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#F25C5C" stroke="#FFFFFF" strokeWidth={1.5} />
              {/* Roof dome circle */}
              <path d="M-8,2 A8,8 0 0,1 8,2 Z" fill="#FFFFFF" />
              <rect x="-3" y="4" width="6" height="10" fill="#FFFFFF" rx="1" />
            </g>
          </g>

          {/* UTI near shortcut superior */}
          <g transform="translate(860, 315)">
            {/* 3D bottom shadow */}
            <rect x="-82" y="-12" width="164" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-80" y="-15" width="160" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#A56CF5" letterSpacing="1">💖 U.T.I. CORONÁRIA</text>
            {/* Cute building Standee */}
            <g transform="translate(98, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#A56CF5" stroke="#FFFFFF" strokeWidth={1.5} />
              {/* Pulse line drawing */}
              <path d="M -9,-2 L -4,-2 L -2,-8 L 1,4 L 3,-4 L 5,-2 L 9,-2" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>

          {/* Enfermaria near curvature */}
          <g transform="translate(920, 200)">
            {/* 3D bottom shadow */}
            <rect x="-87" y="-12" width="174" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-85" y="-15" width="170" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#34C78A" letterSpacing="1">🛌 ALA DE INTERNAÇÃO</text>
            {/* Cute building Standee */}
            <g transform="translate(-107, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#34C78A" stroke="#FFFFFF" strokeWidth={1.5} />
              {/* Bed shape representation */}
              <rect x="-10" y="2" width="20" height="6" fill="#FFFFFF" rx="1" />
              <rect x="-10" y="-4" width="6" height="6" fill="#FFFFFF" rx="1" />
              <circle cx="2" cy="-4" r="2.5" fill="#FFFFFF" />
            </g>
          </g>

          {/* Diretoria near final */}
          <g transform="translate(300, 95)">
            {/* 3D bottom shadow */}
            <rect x="-97" y="-12" width="194" height="30" rx="14" fill="rgba(0, 0, 0, 0.06)" />
            {/* Main badge */}
            <rect x="-95" y="-15" width="190" height="30" rx="12" fill="rgba(255, 255, 255, 0.85)" stroke="#E2E8F0" strokeWidth={1.5} />
            <text textAnchor="middle" y="4" fontSize="10" fontWeight="900" fill="#F5C042" letterSpacing="1">🏆 DIRETORIA DO HOSPITAL</text>
            {/* Cute building Standee */}
            <g transform="translate(-117, -22)" opacity={0.85}>
              <rect x="-14" y="-14" width="28" height="28" rx="8" fill="#F5C042" stroke="#FFFFFF" strokeWidth={1.5} />
              {/* Gold trophy mini silhouette */}
              <path d="M-6,-8 L6,-8 L4,-2 C3,1 1,2 1,4 L3,4 L3,7 L-3,7 L-3,4 L-1,4 C-1,2 -3,1 -4,-2 Z" fill="#FFFFFF" />
            </g>
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

      <div
        style={{
          width: "1200px",
          height: "950px",
          transform: `scale(${scale * currentZoom}) translate(${currentTx}px, ${currentTy}px)`,
          transformOrigin: "center center",
          flexShrink: 0,
          transition: `transform ${shouldZoom ? 800 : 900}ms cubic-bezier(0.25, 1, 0.5, 1)`
        }}
        className="relative select-none"
      >
        <svg
          viewBox="0 0 1200 950"
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
      <div className="absolute bottom-2.5 left-2.5 bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full flex flex-wrap gap-2 text-[9px] border border-slate-200/50 pointer-events-auto hover:opacity-10 transition-opacity duration-300 shadow-sm z-20">
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
