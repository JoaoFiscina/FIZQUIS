import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Team, BoardCell, GamePhase, GameLogEntry, PawnType } from "../types/game";
import type { Question, MedicalArea } from "../types/questions";
import { boardCells } from "../data/board";
import { getQuestion, getRandomDifficulty } from "../lib/questionEngine";

interface GameState {
  // State
  teams: Team[];
  currentTeamIndex: number;
  board: BoardCell[];
  usedQuestionIds: string[];
  diceValue?: number;
  phase: GamePhase;
  activeQuestion?: Question;
  originPosition?: number;
  selectedCell?: BoardCell;
  winnerTeamId?: string;
  logs: GameLogEntry[];

  // Choice and action states
  remainingStepsAfterChoice?: number;
  doubleDiceNextTurn: boolean; // Se a equipe dobrou o avanço
  extraTurnActive: boolean;    // Se ganha jogada extra (Plantão Tranquilo)
  eliminatedOptions: ("A" | "B" | "C" | "D")[]; // Opções eliminadas por Dupla Checagem
  passPlantaoTargetTeamId?: string; // Equipe alvo do "Passa o Plantão"
  isMoving: boolean;
  isReturning: boolean;

  // Actions
  initializeGame: (teamsData: { name: string; color: string; pawn: PawnType }[]) => void;
  rollDice: () => Promise<void>;
  moveActiveTeam: (steps: number) => Promise<void>;
  choosePath: (nextCellId: number) => Promise<void>;
  chooseArea: (area: MedicalArea) => void;
  answerQuestion: (answer: "A" | "B" | "C" | "D") => void;
  eliminateTwoOptions: () => void;
  passPlantao: (targetTeamId: string) => void;
  applyResolution: () => Promise<void>;
  selectInteractionTarget: (targetTeamId: string) => void;
  selectTrocaLeitoTarget: (targetTeamId: string) => void;
  resetGame: () => void;
  addLog: (text: string, type: GameLogEntry["type"]) => void;
  completeReveal: () => void;
  animateReturnToOrigin: (targetPosition: number) => Promise<void>;
}

const getPreviousCellId = (currentId: number, origin: number): number => {
  if (currentId === 0) return 0;
  if (currentId === 201) return 12;
  if (currentId >= 202 && currentId <= 210) return currentId - 1;
  if (currentId === 23) {
    return (origin >= 201 && origin <= 210) ? 210 : 18;
  }
  if (currentId === 13) return 12;
  if (currentId >= 14 && currentId <= 18) return currentId - 1;
  
  if (currentId === 301) return 30;
  if (currentId >= 302 && currentId <= 307) return currentId - 1;
  if (currentId === 40) {
    return (origin >= 301 && origin <= 307) ? 307 : 33;
  }
  if (currentId === 31) return 30;
  if (currentId >= 32 && currentId <= 33) return currentId - 1;
  
  return currentId - 1;
};

const getRandomArea = (): MedicalArea => {
  const areas: MedicalArea[] = ["clinica", "cirurgia", "pediatria", "go", "preventiva", "urgencia"];
  return areas[Math.floor(Math.random() * areas.length)];
};

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Initial state
      teams: [],
      currentTeamIndex: 0,
      board: boardCells,
      usedQuestionIds: [],
      diceValue: undefined,
      phase: "setup",
      activeQuestion: undefined,
      originPosition: undefined,
      selectedCell: undefined,
      winnerTeamId: undefined,
      logs: [],

      remainingStepsAfterChoice: undefined,
      doubleDiceNextTurn: false,
      extraTurnActive: false,
      eliminatedOptions: [],
      passPlantaoTargetTeamId: undefined,
      isMoving: false,
      isReturning: false,

      // Actions
      addLog: (text, type) => {
        const activeTeam = get().teams[get().currentTeamIndex];
        const newLog: GameLogEntry = {
          id: Math.random().toString(36).substring(2, 9),
          text,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          type,
          teamId: activeTeam?.id
        };
        set((state) => ({ logs: [newLog, ...state.logs].slice(0, 100) }));
      },

      initializeGame: (teamsData) => {
        const initializedTeams: Team[] = teamsData.map((t, idx) => ({
          id: `team_${idx + 1}`,
          name: t.name,
          color: t.color,
          pawn: t.pawn,
          position: 0,
          previousPosition: 0,
          skipNextTurn: false,
          score: 0
        }));

        set({
          teams: initializedTeams,
          currentTeamIndex: 0,
          usedQuestionIds: [],
          diceValue: undefined,
          phase: "waiting_roll",
          activeQuestion: undefined,
          originPosition: undefined,
          selectedCell: undefined,
          winnerTeamId: undefined,
          logs: [],
          doubleDiceNextTurn: false,
          extraTurnActive: false,
          eliminatedOptions: [],
          passPlantaoTargetTeamId: undefined,
          isMoving: false,
          isReturning: false
        });

        get().addLog("Partida iniciada! Que vença a melhor equipe.", "system");
      },

      rollDice: async () => {
        const state = get();
        if (state.phase !== "waiting_roll" || state.isMoving) return;

        const activeTeam = state.teams[state.currentTeamIndex];
        
        // Se a equipe deve pular o turno
        if (activeTeam.skipNextTurn) {
          get().addLog(`${activeTeam.name} estava de plantão dobrado e pulou a rodada!`, "system");
          const updatedTeams = state.teams.map((t, idx) => 
            idx === state.currentTeamIndex ? { ...t, skipNextTurn: false } : t
          );
          
          set({ 
            teams: updatedTeams,
            currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length
          });
          return;
        }

        set({ phase: "rolling" });

        // Simula animação de rolagem de dado
        await new Promise((resolve) => setTimeout(resolve, 1400));

        const rolled = Math.floor(Math.random() * 6) + 1;
        
        get().addLog(`${activeTeam.name} rolou o dado e tirou ${rolled}.`, "roll");

        set({
          diceValue: rolled,
          originPosition: activeTeam.position,
          phase: "moving",
          isMoving: true,
          isReturning: false
        });

        // Inicia movimento passo a passo
        await get().moveActiveTeam(rolled);
      },

      moveActiveTeam: async (stepsLeft: number) => {
        const state = get();
        const activeTeam = state.teams[state.currentTeamIndex];
        const currentCell = state.board.find((c) => c.id === activeTeam.position);

        // Se chegou ao fim ou esgotou os passos
        if (stepsLeft <= 0 || activeTeam.position === 50) {
          set({ isMoving: false });
          
          // Resolver o pouso na casa
          const destinationCell = state.board.find((c) => c.id === activeTeam.position)!;
          set({ selectedCell: destinationCell });

          // Aguarda a pulsação/destaque da casa no tabuleiro antes de abrir a revelação
          await new Promise((resolve) => setTimeout(resolve, 850));

          // Se cair na casa final 50
          if (destinationCell.id === 50) {
            const difficulty = getRandomDifficulty("final", true, false);
            const question = getQuestion(getRandomArea(), difficulty, state.usedQuestionIds);
            
            get().addLog(`${activeTeam.name} chegou ao Plantão Final! Pergunta Decisiva à vista!`, "system");
            set({
              activeQuestion: question,
              phase: "revealing_cell",
              eliminatedOptions: []
            });
            return;
          }

          // Se cair em casa curinga
          if (destinationCell.specialEffect === "curinga") {
            set({
              activeQuestion: undefined,
              phase: "revealing_cell",
              eliminatedOptions: []
            });
            return;
          }

          // Seleciona pergunta normalmente
          const isR3 = destinationCell.specialEffect === "pergunta_r3";
          const difficulty = getRandomDifficulty(destinationCell.region, false, isR3);
          const area = destinationCell.area || getRandomArea();
          const question = getQuestion(area, difficulty, state.usedQuestionIds);

          set({
            activeQuestion: question,
            phase: "revealing_cell",
            eliminatedOptions: []
          });
          return;
        }

        if (!currentCell || !currentCell.next || currentCell.next.length === 0) {
          set({ isMoving: false });
          return;
        }

        // Se houver bifurcação na próxima casa
        if (currentCell.next.length > 1) {
          set({
            phase: "choosing_path",
            remainingStepsAfterChoice: stepsLeft,
            isMoving: false
          });
          return;
        }

        // Move 1 casa
        const nextCellId = currentCell.next[0];
        const updatedTeams = state.teams.map((t, idx) =>
          idx === state.currentTeamIndex ? { ...t, position: nextCellId } : t
        );

        set({ teams: updatedTeams });

        // Atraso de 950ms por casa para animação (pulo de 800ms + pausa de 150ms)
        await new Promise((resolve) => setTimeout(resolve, 950));

        // Recursão
        await get().moveActiveTeam(stepsLeft - 1);
      },

      choosePath: async (nextCellId: number) => {
        const state = get();
        if (state.phase !== "choosing_path") return;

        const stepsLeft = state.remainingStepsAfterChoice || 0;

        const updatedTeams = state.teams.map((t, idx) =>
          idx === state.currentTeamIndex ? { ...t, position: nextCellId } : t
        );

        set({
          teams: updatedTeams,
          phase: "moving",
          remainingStepsAfterChoice: undefined,
          isMoving: true,
          isReturning: false
        });

        // Atraso antes do próximo passo (respeitando o tempo de pulo de 800ms + pausa de 150ms)
        await new Promise((resolve) => setTimeout(resolve, 950));
        await get().moveActiveTeam(stepsLeft - 1);
      },

      chooseArea: (area) => {
        const state = get();
        if (state.phase !== "choosing_area" || !state.selectedCell) return;

        const isR3 = state.selectedCell.specialEffect === "pergunta_r3";
        const difficulty = getRandomDifficulty(state.selectedCell.region, false, isR3);
        const question = getQuestion(area, difficulty, state.usedQuestionIds);

        set({
          activeQuestion: question,
          phase: "answering",
          eliminatedOptions: []
        });
      },

      eliminateTwoOptions: () => {
        const state = get();
        if (state.phase !== "answering" || !state.activeQuestion || state.eliminatedOptions.length > 0) return;

        const correct = state.activeQuestion.correctAnswer;
        const options: ("A" | "B" | "C" | "D")[] = ["A", "B", "C", "D"];
        const incorrect = options.filter((o) => o !== correct);

        // Escolhe 2 incorretas aleatoriamente
        const toEliminate: ("A" | "B" | "C" | "D")[] = [];
        while (toEliminate.length < 2) {
          const randOpt = incorrect[Math.floor(Math.random() * incorrect.length)];
          if (!toEliminate.includes(randOpt)) {
            toEliminate.push(randOpt);
          }
        }

        set({ eliminatedOptions: toEliminate });
        get().addLog("Dupla Checagem ativada! Duas alternativas incorretas foram eliminadas.", "effect");
      },

      passPlantao: (targetTeamId) => {
        const state = get();
        if (state.phase !== "answering" || !state.activeQuestion) return;

        const targetTeam = state.teams.find((t) => t.id === targetTeamId);
        if (!targetTeam) return;

        set({ passPlantaoTargetTeamId: targetTeamId });
        get().addLog(`Plantão passado! A equipe ${targetTeam.name} responderá em nome de ${state.teams[state.currentTeamIndex].name}.`, "effect");
      },

      answerQuestion: (answer) => {
        const state = get();
        if (state.phase !== "answering" || !state.activeQuestion) return;

        const isCorrect = answer === state.activeQuestion.correctAnswer;
        const activeTeam = state.teams[state.currentTeamIndex];

        // Adiciona id da pergunta ao histórico
        const updatedUsedQuestions = [...state.usedQuestionIds, state.activeQuestion.id];

        // Definindo quem respondeu (em caso de Passa o Plantão)
        const responderTeam = state.passPlantaoTargetTeamId
          ? state.teams.find((t) => t.id === state.passPlantaoTargetTeamId)!
          : activeTeam;

        if (isCorrect) {
          get().addLog(`Conduta correta de ${responderTeam.name}! Resposta correta: [${state.activeQuestion.correctAnswer}].`, "correct");
        } else {
          get().addLog(`Paciente complicou! Conduta errada de ${responderTeam.name}. Resposta correta era [${state.activeQuestion.correctAnswer}].`, "wrong");
        }

        set({
          phase: "resolving",
          usedQuestionIds: updatedUsedQuestions
        });

        // Salvar resultado temporariamente no estado ativo
        // Usamos a função de resolução de efeitos
      },

      applyResolution: async () => {
        const state = get();
        if (state.phase !== "resolving" || !state.activeQuestion || !state.selectedCell) return;

        const isCorrect = state.logs[0]?.type === "correct";
        const cell = state.selectedCell;
        const activeTeam = state.teams[state.currentTeamIndex];
        const origin = state.originPosition ?? activeTeam.position;

        // Se houve Passa o Plantão
        if (state.passPlantaoTargetTeamId) {
          const targetTeamId = state.passPlantaoTargetTeamId;
          const targetTeam = state.teams.find((t) => t.id === targetTeamId)!;

          if (isCorrect) {
            // O outro time respondeu certo: O time da vez volta para a origem, o outro avança 2
            get().addLog(`${targetTeam.name} respondeu corretamente! ${activeTeam.name} volta para a origem. ${targetTeam.name} avança +2 casas.`, "effect");
            
            // Move o outro time +2 casas (simplificado/direto)
            const updatedTeams = state.teams.map((t) => {
              if (t.id === targetTeam.id) {
                const targetCell = state.board.find((c) => c.id === t.position)!;
                const nextId = targetCell.next?.[0] ?? t.position;
                const nextCell = state.board.find((c) => c.id === nextId)!;
                const finalNextId = nextCell.next?.[0] ?? nextId;
                return { ...t, position: Math.min(50, finalNextId) };
              }
              return t;
            });

            set({
              teams: updatedTeams,
              passPlantaoTargetTeamId: undefined,
              activeQuestion: undefined,
              selectedCell: undefined,
              phase: "moving",
              isMoving: true,
              isReturning: true
            });

            await get().animateReturnToOrigin(origin);
            return;
          } else {
            // O outro time errou: O time da vez permanece na casa. O outro time fica onde está.
            get().addLog(`${targetTeam.name} errou o plantão. ${activeTeam.name} permanece seguro na casa ${cell.id}.`, "effect");
            
            set({
              passPlantaoTargetTeamId: undefined,
              activeQuestion: undefined,
              selectedCell: undefined,
              phase: "waiting_roll",
              currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length
            });
            return;
          }
        }

        // --- TRATAMENTO DOS EFEITOS ESPECIAIS (CASO COMUM OU OUTRAS CASAS) ---
        let finalPosition = activeTeam.position;
        let isCorrectBonusMovement = false;
        let bonusSteps = 0;
        let skipTurn = false;
        let selectTarget = false;
        let selectTroca = false;

        if (isCorrect) {
          // --- ACERTO ---
          if (cell.id === 50) {
            // VITÓRIA
            get().addLog(`PARABÉNS! A equipe ${activeTeam.name} concluiu o Plantão Final com sucesso e venceu o jogo!`, "system");
            set({
              winnerTeamId: activeTeam.id,
              phase: "game_over",
              activeQuestion: undefined,
              selectedCell: undefined
            });
            return;
          }

          switch (cell.specialEffect) {
            case "plantao_tranquilo":
              get().addLog(`Plantão tranquilo! ${activeTeam.name} ganha um turno extra imediato.`, "bonus");
              set({ extraTurnActive: true });
              break;

            case "evolucao_perfeita":
              get().addLog(`Evolução perfeita! Avança +2 casas.`, "bonus");
              isCorrectBonusMovement = true;
              bonusSteps = 2;
              break;

            case "alta_hospitalar":
              // Atalho da casa 206 para a 23
              if (activeTeam.position === 206) {
                get().addLog(`Alta hospitalar concedida! Atalho pegado para a casa 23!`, "bonus");
                finalPosition = 23;
              } else {
                get().addLog(`Alta concedida, mas nenhum atalho disponível nesta posição.`, "system");
              }
              break;

            case "plantao_caotico":
              get().addLog(`Bônus caótico! Avança +4 casas.`, "bonus");
              isCorrectBonusMovement = true;
              bonusSteps = 4;
              break;

            case "risco_cirurgico":
              // Avança o valor do dado originalmente tirado
              const diceVal = state.diceValue || 1;
              get().addLog(`Risco Cirúrgico superado! Dobra o dado: avança +${diceVal} casas extras.`, "bonus");
              isCorrectBonusMovement = true;
              bonusSteps = diceVal;
              break;

            case "pergunta_r3":
              get().addLog(`Nível R3 demonstrado! Avança +5 casas.`, "bonus");
              isCorrectBonusMovement = true;
              bonusSteps = 5;
              break;

            case "intercorrencia":
            case "contra_referencia":
              // Requer selecionar um alvo
              selectTarget = true;
              break;

            case "troca_leito":
              // Requer selecionar um alvo à frente para trocar
              const hasTeamAhead = state.teams.some((t) => t.id !== activeTeam.id && t.position > activeTeam.position);
              if (hasTeamAhead) {
                selectTroca = true;
              } else {
                get().addLog(`${activeTeam.name} já está na liderança. Efeito de Troca de Leito cancelado.`, "system");
              }
              break;

            default:
              get().addLog(`${activeTeam.name} permanece na casa ${cell.label}.`, "system");
              break;
          }
        } else {
          // --- ERRO ---
          if (cell.id === 50) {
            // Erro na casa final volta pra origem
            get().addLog(`Erro crítico no Plantão Final! ${activeTeam.name} volta para a casa ${origin}.`, "penalty");
            finalPosition = origin;
          } else {
            switch (cell.specialEffect) {
              case "plantao_caotico":
                // Volta 4 casas a partir da origem
                const penaltyPos = Math.max(0, origin - 4);
                get().addLog(`Plantão Caótico cobrou o preço: ${activeTeam.name} recua para a casa ${penaltyPos}.`, "penalty");
                finalPosition = penaltyPos;
                break;

              case "caso_grave":
                // Vai para o caminho mais longo (cai na casa 301)
                get().addLog(`Conduta inadequada no Caso Grave! Equipe recuada para a enfermaria (casa 301).`, "penalty");
                finalPosition = 301;
                break;

              case "intercorrencia":
                // Própria equipe volta 3 casas da origem
                const intercorrrenciaPos = Math.max(0, origin - 3);
                get().addLog(`Intercorrência não resolvida! ${activeTeam.name} recua para a casa ${intercorrrenciaPos}.`, "penalty");
                finalPosition = intercorrrenciaPos;
                break;

              case "contra_referencia":
                // Própria equipe volta 2 casas da origem
                const contraPos = Math.max(0, origin - 2);
                get().addLog(`Contra-referência falhou: ${activeTeam.name} recua para a casa ${contraPos}.`, "penalty");
                finalPosition = contraPos;
                break;

              case "pergunta_r3":
                // Volta pra origem e perde o próximo turno
                get().addLog(`Erro na pergunta R3! ${activeTeam.name} volta para ${origin} e perderá a próxima jogada.`, "penalty");
                finalPosition = origin;
                skipTurn = true;
                break;

              default:
                // Erro comum volta para a origem
                get().addLog(`Conduta errada! ${activeTeam.name} volta para a casa de origem (${origin}).`, "penalty");
                finalPosition = origin;
                break;
            }
          }
        }

        if (isCorrect) {
          // Aplica posições e modificadores básicos apenas se acertou
          let updatedTeams = state.teams.map((t, idx) => {
            if (idx === state.currentTeamIndex) {
              return {
                ...t,
                position: finalPosition,
                skipNextTurn: t.skipNextTurn || skipTurn
              };
            }
            return t;
          });

          set({
            teams: updatedTeams,
            activeQuestion: undefined,
            selectedCell: undefined
          });

          // Se precisa de escolha de alvo (Intercorrência, Contra-referência, Troca de Leito)
          if (selectTarget || selectTroca) {
            set({ phase: "choosing_target" });
            return;
          }

          // Se tem movimento de bônus por acerto (Evolução Perfeita, Plantão Caótico, Risco Cirúrgico, R3)
          if (isCorrectBonusMovement && bonusSteps > 0) {
            set({
              phase: "moving",
              isMoving: true
            });
            await get().moveActiveTeam(bonusSteps);
            return;
          }

          // Finaliza o turno e passa para a próxima equipe
          const nextTeamIndex = get().extraTurnActive
            ? state.currentTeamIndex // Mantém a vez se ativou extraTurnActive
            : (state.currentTeamIndex + 1) % state.teams.length;

          set({
            phase: "waiting_roll",
            extraTurnActive: false,
            currentTeamIndex: nextTeamIndex
          });
        } else {
          // --- SE ERROU ---
          // Aplica modificadores (como skipNextTurn) mas NÃO a posição final imediata (será animada de volta)
          let updatedTeams = state.teams.map((t, idx) => {
            if (idx === state.currentTeamIndex) {
              return {
                ...t,
                skipNextTurn: t.skipNextTurn || skipTurn
              };
            }
            return t;
          });

          set({
            teams: updatedTeams,
            activeQuestion: undefined,
            selectedCell: undefined
          });

          // Inicia a movimentação de volta
          set({
            phase: "moving",
            isMoving: true,
            isReturning: true
          });
          await get().animateReturnToOrigin(finalPosition);
        }
      },

      selectInteractionTarget: (targetTeamId) => {
        const state = get();
        if (state.phase !== "choosing_target" || !state.selectedCell) return;

        const cell = state.selectedCell;
        const targetTeam = state.teams.find((t) => t.id === targetTeamId)!;
        const activeTeam = state.teams[state.currentTeamIndex];

        let penaltySteps = 0;
        if (cell.specialEffect === "intercorrencia") {
          penaltySteps = 3;
        } else if (cell.specialEffect === "contra_referencia") {
          penaltySteps = 2;
        }

        const targetNewPos = Math.max(0, targetTeam.position - penaltySteps);

        get().addLog(`${activeTeam.name} aplicou penalidade em ${targetTeam.name}. ${targetTeam.name} recuou ${penaltySteps} casas (vai para a casa ${targetNewPos}).`, "effect");

        const updatedTeams = state.teams.map((t) => {
          if (t.id === targetTeamId) {
            return { ...t, position: targetNewPos };
          }
          return t;
        });

        const nextTeamIndex = state.extraTurnActive
          ? state.currentTeamIndex
          : (state.currentTeamIndex + 1) % state.teams.length;

        set({
          teams: updatedTeams,
          phase: "waiting_roll",
          extraTurnActive: false,
          currentTeamIndex: nextTeamIndex
        });
      },

      selectTrocaLeitoTarget: (targetTeamId) => {
        const state = get();
        if (state.phase !== "choosing_target") return;

        const activeTeam = state.teams[state.currentTeamIndex];
        const targetTeam = state.teams.find((t) => t.id === targetTeamId)!;

        get().addLog(`${activeTeam.name} ativou Troca de Leito e trocou de posição com ${targetTeam.name}! (Casa ${activeTeam.position} <-> Casa ${targetTeam.position})`, "effect");

        const activePos = activeTeam.position;
        const targetPos = targetTeam.position;

        const updatedTeams = state.teams.map((t) => {
          if (t.id === activeTeam.id) return { ...t, position: targetPos };
          if (t.id === targetTeam.id) return { ...t, position: activePos };
          return t;
        });

        const nextTeamIndex = state.extraTurnActive
          ? state.currentTeamIndex
          : (state.currentTeamIndex + 1) % state.teams.length;

        set({
          teams: updatedTeams,
          phase: "waiting_roll",
          extraTurnActive: false,
          currentTeamIndex: nextTeamIndex
        });
      },

      resetGame: () => {
        set({
          teams: [],
          currentTeamIndex: 0,
          usedQuestionIds: [],
          diceValue: undefined,
          phase: "setup",
          activeQuestion: undefined,
          originPosition: undefined,
          selectedCell: undefined,
          winnerTeamId: undefined,
          logs: [],
          doubleDiceNextTurn: false,
          extraTurnActive: false,
          eliminatedOptions: [],
          passPlantaoTargetTeamId: undefined,
          isMoving: false,
          isReturning: false
        });
      },

      completeReveal: () => {
        const state = get();
        if (state.phase !== "revealing_cell" || !state.selectedCell) return;

        if (state.selectedCell.specialEffect === "curinga") {
          set({ phase: "choosing_area" });
        } else {
          set({ phase: "answering" });
        }
      },

      animateReturnToOrigin: async (targetPosition: number) => {
        const state = get();
        const activeTeam = state.teams[state.currentTeamIndex];

        if (activeTeam.position === targetPosition) {
          set({ isMoving: false, isReturning: false });

          // Finaliza o turno e passa para a próxima equipe
          const nextTeamIndex = state.extraTurnActive
            ? state.currentTeamIndex
            : (state.currentTeamIndex + 1) % state.teams.length;

          set({
            phase: "waiting_roll",
            extraTurnActive: false,
            currentTeamIndex: nextTeamIndex
          });
          return;
        }

        // Determina a posição anterior
        const prevId = getPreviousCellId(activeTeam.position, state.originPosition ?? 0);

        const updatedTeams = state.teams.map((t, idx) =>
          idx === state.currentTeamIndex ? { ...t, position: prevId } : t
        );

        set({ teams: updatedTeams });

        // Atraso de 600ms por casa (tempo de pulo de 500ms + pausa de 100ms no retorno)
        await new Promise((resolve) => setTimeout(resolve, 600));

        // Recursão
        await get().animateReturnToOrigin(targetPosition);
      }
    }),
    {
      name: "plantao-board-save"
    }
  )
);
