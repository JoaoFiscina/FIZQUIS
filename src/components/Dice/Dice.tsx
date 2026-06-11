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
      }, 90);
    } else if (diceValue !== undefined) {
      setDisplayValue(diceValue);
    }
    return () => clearInterval(interval);
  }, [isRolling, diceValue]);

  const renderDots = (val: number) => {
    const dotCls = "w-2.5 h-2.5 rounded-full bg-slate-700";
    
    switch (val) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-3 h-3 rounded-full bg-red-500" />
          </div>
        );
      case 2:
        return (
          <div className="flex justify-between w-full h-full p-2.5">
            <div className={`${dotCls} self-start`} />
            <div className={`${dotCls} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="flex justify-between w-full h-full p-2.5">
            <div className={`${dotCls} self-start`} />
            <div className={`${dotCls} self-center`} />
            <div className={`${dotCls} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 gap-3 w-full h-full p-2.5">
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
          </div>
        );
      case 5:
        return (
          <div className="relative w-full h-full p-2.5">
            <div className="grid grid-cols-2 gap-3 w-full h-full">
              <div className={dotCls} />
              <div className={dotCls} />
              <div className={dotCls} />
              <div className={dotCls} />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={dotCls} />
            </div>
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 w-full h-full p-2.5">
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
            <div className={dotCls} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Dado compacto */}
      <div
        className={`w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-white to-slate-50 flex items-center justify-center border-2 border-slate-200/80 transition-all duration-300 relative overflow-hidden ${
          isRolling ? "animate-roll" : "hover:scale-105 active:scale-95"
        }`}
        style={{
          boxShadow: isRolling
            ? "0 8px 20px -5px rgba(99, 102, 241, 0.3), inset 0 -2px 4px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,0.6)"
            : "0 4px 12px -3px rgba(0, 0, 0, 0.08), inset 0 -2px 4px rgba(0,0,0,0.04), inset 0 2px 4px rgba(255,255,255,0.6)"
        }}
      >
        <div className="w-full h-full relative select-none">
          {renderDots(displayValue)}
        </div>
      </div>

      {/* Botão Rolar */}
      <button
        onClick={onRoll}
        disabled={disabled || isRolling}
        className={`flex-1 py-2.5 px-4 rounded-xl font-black tracking-wider text-xs uppercase cursor-pointer ${
          disabled || isRolling
            ? "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
            : "btn-3d-indigo text-white"
        }`}
      >
        {isRolling ? "..." : "Rolar"}
      </button>
    </div>
  );
};
