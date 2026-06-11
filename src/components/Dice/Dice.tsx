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

  // Simula a rolagem de números aleatórios enquanto estiver no estado rolling
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

  // Renderiza as bolinhas do dado com base no valor
  const renderDots = (val: number) => {
    const dotClasses = "w-3 h-3 rounded-full bg-indigo-600 shadow-sm";
    
    // Mapeamento de posições para cada valor do dado
    switch (val) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className={dotClasses} />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between w-full h-full p-3.5">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="flex justify-between w-full h-full p-3.5">
            <div className={`${dotClasses} self-start`} />
            <div className={`${dotClasses} self-center`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-4 w-full h-full p-3.5">
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
            <div className={dotClasses} />
          </div>
        );
      case 5:
        return (
          <div className="relative w-full h-full p-3.5">
            <div className="grid grid-cols-2 gap-4 w-full h-full">
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5 w-full h-full p-3.5">
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
    <div className="flex flex-col items-center gap-4">
      {/* O Dado físico */}
      <div
        className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center border-4 border-slate-200 shadow-md transition-transform duration-300 ${
          isRolling ? "animate-roll" : "hover:scale-105 active:scale-95"
        }`}
        style={{
          boxShadow: isRolling 
            ? "0 10px 25px rgba(168, 85, 247, 0.25)" 
            : "0 4px 12px rgba(0, 0, 0, 0.08)"
        }}
      >
        <div className="w-full h-full relative select-none">
          {renderDots(displayValue)}
        </div>
      </div>

      {/* Botão de Rolagem */}
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`px-6 py-3 rounded-xl font-bold tracking-wider text-sm transition-all duration-300 transform active:scale-95 uppercase ${
          disabled || isRolling
            ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
            : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-95 shadow-md shadow-indigo-100/50 hover:shadow-indigo-200/50 cursor-pointer"
        }`}
      >
        {isRolling ? "Sorteando..." : "Rolar Dado"}
      </button>
    </div>
  );
};
