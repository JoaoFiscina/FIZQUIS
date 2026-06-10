import React from "react";
import {
  Stethoscope,
  Scissors,
  Syringe,
  Ambulance,
  Bandage,
  Pill,
  Thermometer,
  Search
} from "lucide-react";
import type { PawnType } from "../../types/game";

interface PawnIconProps {
  type: PawnType;
  className?: string;
  size?: number;
}

export const PawnIcon: React.FC<PawnIconProps> = ({ type, className = "", size = 24 }) => {
  switch (type) {
    case "stethoscope":
      return <Stethoscope className={className} size={size} />;
    case "scalpel":
      return <Scissors className={className} size={size} />;
    case "syringe":
      return <Syringe className={className} size={size} />;
    case "ambulance":
      return <Ambulance className={className} size={size} />;
    case "bandage":
      return <Bandage className={className} size={size} />;
    case "pills":
      return <Pill className={className} size={size} />;
    case "thermometer":
      return <Thermometer className={className} size={size} />;
    case "otoscope":
      return <Search className={className} size={size} />;
    default:
      return <Stethoscope className={className} size={size} />;
  }
};
