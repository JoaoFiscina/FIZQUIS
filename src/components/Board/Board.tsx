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
  const size = 18;
  switch (effect) {
    case "curinga":
      return <HelpCircle size={size} className="text-white" />;
    case "plantao_tranquilo":
      return <RotateCcw size={size} className="text-white" />;
    case "evolucao_perfeita":
      return <Zap size={size} className="text-white animate-bounce" />;
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
      if (area === "clinica") return <Stethoscope size={13} className="opacity-90 text-white" />;
      if (area === "cirurgia") return <Scissors size={13} className="opacity-90 text-white" />;
      if (area === "urgencia") return <Activity size={13} className="opacity-90 text-white animate-pulse" />;
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
      setScale(Math.min(scaleX, scaleY));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Renderiza decorações de fundo lúdicas
  const renderDecorations = () => {
    return (
      <g id="decorations" className="pointer-events-none select-none">
        {/* UPA */}
        <g opacity="0.35" transform="translate(140, 810)">
          <rect x="-60" y="-16" width="120" height="32" rx="16" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#2563EB" className="text-xs font-black tracking-widest uppercase">🚑 UPA</text>
        </g>

        {/* Consultórios */}
        <g opacity="0.35" transform="translate(840, 810)">
          <rect x="-80" y="-16" width="160" height="32" rx="16" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#16A34A" className="text-xs font-black tracking-widest uppercase">🩺 CONSULTÓRIOS</text>
        </g>

        {/* Enfermaria */}
        <g opacity="0.35" transform="translate(480, 700)">
          <rect x="-85" y="-16" width="170" height="32" rx="16" fill="#FDF4FF" stroke="#F5D0FE" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#D946EF" className="text-xs font-black tracking-widest uppercase">🛏️ ENFERMARIA</text>
        </g>

        {/* Hospital Central */}
        <g opacity="0.45" transform="translate(480, 560)">
          <rect x="-100" y="-18" width="200" height="36" rx="18" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <text x="0" y="5" textAnchor="middle" fill="#475569" className="text-sm font-black tracking-widest uppercase">🏢 HOSPITAL CENTRAL</text>
        </g>

        {/* UTI */}
        <g opacity="0.35" transform="translate(740, 310)">
          <rect x="-70" y="-16" width="140" height="32" rx="16" fill="#FFF5F5" stroke="#FEB2B2" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#E53E3E" className="text-xs font-black tracking-widest uppercase">🚨 UTI ADULTO</text>
        </g>

        {/* Centro Cirúrgico */}
        <g opacity="0.35" transform="translate(240, 310)">
          <rect x="-85" y="-16" width="170" height="32" rx="16" fill="#F0FDFA" stroke="#99F6E4" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#0D9488" className="text-xs font-black tracking-widest uppercase">🥼 BLOC CIRÚRGICO</text>
        </g>

        {/* Emergência */}
        <g opacity="0.35" transform="translate(240, 100)">
          <rect x="-95" y="-16" width="190" height="32" rx="16" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />
          <text x="0" y="5" textAnchor="middle" fill="#EA580C" className="text-xs font-black tracking-widest uppercase">⚡ SALA DE EMERGÊNCIA</text>
        </g>
      </g>
    );
  };

  // Renderiza as conexões como uma "estrada" larga, colorida e contínua
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
        
        let roadColor = "#F1F5F9"; // Cor do piso comum (Slate 100)
        let borderColor = "#CBD5E1"; // Borda cinza sutil (Slate 300)

        if (isShortcut) {
          roadColor = "#E0F2FE"; // Sky 100 para atalhos
          borderColor = "#BAE6FD";
        } else if (isLong) {
          roadColor = "#F5F3FF"; // Purple 50 para caminhos longos
          borderColor = "#DDD6FE";
        }

        lines.push(
          <g key={`path-${cell.id}-${targetCell.id}`}>
            {/* 1. Sombra da estrada */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(0, 0, 0, 0.03)"
              strokeWidth={38}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 2. Borda externa do piso */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={borderColor}
              strokeWidth={30}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 3. Corpo interno do piso (pista contínua) */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={roadColor}
              strokeWidth={24}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* 4. Linha tracejada central lúdica */}
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#FFFFFF"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="4 8"
              className="opacity-95"
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
      
      // Cor de preenchimento e tipo
      let color = areaColors.start;
      if (isFinal) color = areaColors.final;
      else if (cell.specialEffect === "curinga") color = areaColors.curinga;
      else if (cell.specialEffect) color = areaColors.special;
      else if (cell.area) color = areaColors[cell.area];

      const isSpecial = !!cell.specialEffect;
      const r = isStart || isFinal ? 28 : (isSpecial ? 23 : 19);

      return (
        <g 
          key={`cell-${cell.id}`} 
          className={`group ${isSelectable ? "cursor-pointer animate-pulse-slow" : "cursor-default"}`}
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
              r={r + 8}
              fill="none"
              stroke="#ec4899"
              strokeWidth={3}
              className="animate-pulse-ring pointer-events-none"
            />
          )}

          {/* Anel Dourado para casas especiais */}
          {isSpecial && !isSelectable && (
            <circle
              cx={x}
              cy={y}
              r={r + 4}
              fill="none"
              stroke="#F59E0B"
              strokeWidth={2}
              className="animate-pulse-slow pointer-events-none"
            />
          )}

          {/* Sombra de profundidade 3D da casa */}
          <circle
            cx={x}
            cy={y + 3}
            r={r}
            fill="rgba(0, 0, 0, 0.12)"
            className="pointer-events-none"
          />

          {/* Círculo principal colorido */}
          <circle
            cx={x}
            cy={y}
            r={r}
            fill={isSelectable ? "#ec4899" : color}
            stroke="#FFFFFF"
            strokeWidth={3}
            className="group-hover:brightness-105 transition-all duration-300"
          />

          {/* Efeito Glossy 3D (Brilho Interno) */}
          <circle
            cx={x}
            cy={y}
            r={r}
            fill="url(#cellGlossy)"
            className="pointer-events-none"
          />

          {/* Ícone ou ID da casa */}
          <g transform={`translate(${x}, ${y})`}>
            {cell.specialEffect || (cell.type === "normal" && cell.area) ? (
              <g transform={isSpecial ? "translate(-9, -9)" : "translate(-6.5, -6.5)"}>
                {getEffectIcon(cell.specialEffect, cell.area)}
              </g>
            ) : null}

            {/* Número da casa */}
            {!isStart && !isFinal && !isSpecial && (
              <text
                x={0}
                y={4}
                textAnchor="middle"
                fill={cell.area === "preventiva" ? "#1e293b" : "#ffffff"}
                className="text-[10px] font-black select-none pointer-events-none"
              >
                {cell.id}
              </text>
            )}

            {/* Texto Início/Fim */}
            {(isStart || isFinal) && (
              <text
                x={0}
                y={3}
                textAnchor="middle"
                fill="white"
                className="text-[9px] font-black tracking-wider uppercase select-none pointer-events-none"
              >
                {isStart ? "Início" : "Final"}
              </text>
            )}
          </g>

          <title>{`${cell.label} (Casa ${cell.id})`}</title>
        </g>
      );
    });
  };

  // Renderiza os peões sobre as casas, simulando peças físicas 3D com bounce
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
                className="transition-pawn-spring"
                style={{
                  transform: `translate(${px}px, ${py}px)`,
                }}
              >
                {/* Grupo com a base e o corpo que recebe o bounce de turno ativo */}
                <g className={isActive ? "animate-pawn-bounce" : ""}>
                  {/* Sombra oval do peão na base */}
                  <ellipse
                    cx={0}
                    cy={15}
                    rx={11}
                    ry={3.5}
                    fill="rgba(0, 0, 0, 0.22)"
                    className="pointer-events-none"
                  />

                  {/* Corpo do Peão (Bolinha com volume e borda branca) */}
                  <circle
                    cx={0}
                    cy={0}
                    r={16}
                    fill={team.color}
                    stroke="#FFFFFF"
                    strokeWidth={2.5}
                    className="pointer-events-none"
                  />

                  {/* Efeito Glossy 3D de plástico */}
                  <circle
                    cx={0}
                    cy={0}
                    r={16}
                    fill="url(#pawnGlossy)"
                    className="pointer-events-none"
                  />

                  {/* Anelação pulsante de borda se for a equipe ativa */}
                  {isActive && (
                    <circle
                      cx={0}
                      cy={0}
                      r={19}
                      fill="none"
                      stroke={team.color}
                      strokeWidth={2}
                      className="animate-pulse-ring pointer-events-none"
                    />
                  )}

                  {/* Ícone do Peão no Centro */}
                  <g transform="translate(-8, -8)" className="text-white pointer-events-none">
                    <PawnIcon type={team.pawn} size={16} />
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

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[650px] rounded-[32px] bg-gradient-to-b from-slate-50 to-slate-100 border-4 border-white overflow-hidden flex items-center justify-center shadow-lg shadow-slate-200/50"
    >
      {/* Grid de fundo lúdico */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1.5px,transparent_1.5px)] bg-[size:20px_20px] pointer-events-none opacity-60" />

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
          <defs>
            {/* Gradiente 3D para os peões */}
            <radialGradient id="pawnGlossy" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="45%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="90%" stopColor="#000000" stopOpacity="0.35" />
            </radialGradient>
            
            {/* Gradiente 3D para as casas */}
            <radialGradient id="cellGlossy" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
            </radialGradient>
          </defs>

          {/* 1. Decorações de Fundo */}
          {renderDecorations()}

          {/* 2. Conexões (Estrada) */}
          {renderPathLines()}

          {/* 3. Casas do tabuleiro */}
          {renderCells()}

          {/* 4. Peões */}
          {renderPawns()}
        </svg>
      </div>

      {/* Legenda de Áreas em badge flutuante */}
      <div className="absolute bottom-4 left-4 right-4 md:right-auto bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl flex flex-wrap gap-3 text-xs border border-slate-200 pointer-events-none shadow-md">
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
                className="w-3.5 h-3.5 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-slate-600 font-extrabold">{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
