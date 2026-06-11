import React, { useState, useEffect } from "react";
import { useGameStore } from "../../store/gameStore";

interface DiceProps {
  onRoll: () => void;
  disabled: boolean;
}

export const Dice: React.FC<DiceProps> = ({ onRoll, disabled }) => {
  const { diceValue, phase } = useGameStore();
  const [displayValue, setDisplayValue] = useState<number>(1);
  const isRolling = phase === "rolling";

  useEffect(() => {
    let interval: any;
    if (isRolling) {
      interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 70);
    } else if (diceValue !== undefined) {
      setDisplayValue(diceValue);
    }
    return () => clearInterval(interval);
  }, [isRolling, diceValue]);

  // Renderiza as bolinhas do dado com visual realista
  const renderDots = (val: number) => {
    const dotClasses = "w-3.5 h-3.5 rounded-full bg-slate-800 shadow-inner relative after:content-[''] after:absolute after:w-1 after:h-1 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 after:opacity-60";
    
    switch (val) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-5 h-5 rounded-full bg-red-600 shadow-inner relative after:content-[''] after:absolute after:w-1.5 after:h-1.5 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 after:opacity-60" />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between w-full h-full p-4">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="flex justify-between w-full h-full p-4">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-center`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-5 w-full h-full p-4">
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
          </div>
        );
      case 5:
        return (
          <div className="relative w-full h-full p-4">
            <div className="grid grid-cols-2 gap-5 w-full h-full">
              <div className={dotClasses} />
              <div className={dotClasses} />
              <div className={dotClasses} />
              <div className={dotClasses} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={dotClasses} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 gap-x-5 gap-y-3 w-full h-full p-4">
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* O Dado físico 3D */}
      <div
        className={`w-24 h-24 rounded-[28px] bg-gradient-to-br from-white via-slate-50 to-slate-100 flex items-center justify-center border-4 border-slate-200/80 transition-all duration-300 relative overflow-hidden ${
          isRolling ? "animate-roll" : "hover:scale-105 active:scale-95 cursor-grab active:cursor-grabbing"
        }`}
        style={{
          boxShadow: isRolling 
            ? "0 20px 30px -10px rgba(99, 102, 241, 0.4), inset 0 -4px 8px rgba(0,0,0,0.05), inset 0 4px 8px rgba(255,255,255,0.8)" 
            : "0 10px 20px -5px rgba(0, 0, 0, 0.1), inset 0 -4px 8px rgba(0,0,0,0.05), inset 0 4px 8px rgba(255,255,255,0.8)"
        }}
      >
        {/* Efeito de relevo de plástico */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10 pointer-events-none" />
        <div className="w-full h-full relative select-none">
          {renderDots(displayValue)}
        </div>
      </div>

      {/* Botão de Rolagem */}
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`w-full max-w-[200px] py-3.5 px-6 rounded-2xl font-black tracking-wider text-sm transition-all duration-350 transform active:scale-[0.97] uppercase flex items-center justify-center gap-2 cursor-pointer ${
          disabled || isRolling
            ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300"
        }`}
      >
        {isRolling ? (
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        ) : (
          "Rolar Dado"
        )}
      </button>
    </div>
  );
};
