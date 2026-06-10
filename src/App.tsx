import React, { useState, useEffect } from "react";
import { useGameStore } from "./store/gameStore";
import { WelcomeScreen } from "./components/Setup/WelcomeScreen";
import { SetupScreen } from "./components/Setup/SetupScreen";
import { GameScreen } from "./components/Game/GameScreen";
import { VictoryScreen } from "./components/Game/VictoryScreen";

const App: React.FC = () => {
  const { phase, teams } = useGameStore();
  const [showSetup, setShowSetup] = useState(false);

  // Se o jogo for reiniciado, voltar para a tela inicial
  useEffect(() => {
    if (phase === "setup") {
      setShowSetup(false);
    }
  }, [phase]);

  // Se já houver um jogo em andamento no localStorage, pula a tela inicial
  useEffect(() => {
    if (phase !== "setup" && teams.length > 0) {
      setShowSetup(true);
    }
  }, [phase, teams]);

  const renderActiveScreen = () => {
    switch (phase) {
      case "setup":
        if (!showSetup) {
          return <WelcomeScreen onStartSetup={() => setShowSetup(true)} />;
        }
        return <SetupScreen />;
      case "game_over":
        return <VictoryScreen />;
      default:
        return <GameScreen />;
    }
  };

  return (
    <main className="min-h-screen py-4 md:py-8 transition-all duration-500 text-gray-100">
      {renderActiveScreen()}
    </main>
  );
};

export default App;
