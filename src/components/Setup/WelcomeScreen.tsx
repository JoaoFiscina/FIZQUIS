import React, { useState } from "react";
import { Play, HelpCircle, Activity, Info, X, ShieldAlert, Award, RefreshCw, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStartSetup: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartSetup }) => {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center p-4 text-center space-y-8 animate-fade-in">
      {/* Elementos decorativos de fundo */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-200/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-200/20 rounded-full blur-[80px] pointer-events-none" />

      {/* Nome do Jogo & Subtítulo */}
      <div className="space-y-4 max-w-xl relative">
        {/* Ícone Pulsante */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm animate-pulse-slow">
          <Activity size={32} />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-black text-slate-800 tracking-wide uppercase select-none">
          Plantão <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Board</span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed px-4">
          A gincana médica onde conhecimento, sorte e caos de plantão decidem quem conquista a vaga de residente.
        </p>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none justify-center relative">
        <button
          onClick={onStartSetup}
          className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-indigo-100/50 hover:shadow-indigo-200/70"
        >
          <Play size={16} fill="white" />
          <span>Novo Jogo</span>
        </button>

        <button
          onClick={() => setShowHowToPlay(true)}
          className="px-8 py-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
        >
          <HelpCircle size={16} />
          <span>Como Jogar</span>
        </button>
      </div>

      {/* Rodapé Decorativo */}
      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-8 select-none">
        Plantão Board v1.0.0 • Desenvolvido para Vercel
      </div>

      {/* Modal "Como Jogar" */}
      {showHowToPlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl glass-premium max-h-[85vh] flex flex-col shadow-2xl animate-scale-up">
            
            {/* Header do Modal */}
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-2 text-indigo-600">
                <Info size={20} />
                <h3 className="text-sm font-black text-slate-800 tracking-wide uppercase">Manual de Instruções</h3>
              </div>
              <button
                onClick={() => setShowHowToPlay(false)}
                className="text-slate-400 hover:text-slate-700 p-1 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo com Scroll */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 text-left text-sm text-slate-600">
              
              {/* Regra Geral */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-base">1. Fluxo de Jogo ("Anda primeiro, responde depois")</h4>
                <p className="leading-relaxed text-slate-600">
                  Na sua vez, role o dado. Seu peão avançará o número de casas correspondente. Ao pousar, um caso clínico de residência médica surgirá na tela.
                </p>
                <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                  <li><strong className="text-green-600">Acertou:</strong> Você estabiliza o paciente, permanece na casa atual e ativa possíveis bônus.</li>
                  <li><strong className="text-red-600">Errou:</strong> Conduta questionável! Você é penalizado voltando para a casa de início da rodada (ou sofre punições maiores).</li>
                </ul>
              </div>

              {/* Dificuldade Progressiva */}
              <div className="space-y-2">
                <h4 className="font-extrabold text-slate-800 text-base">2. Dificuldade Progressiva</h4>
                <p className="leading-relaxed text-slate-600">
                  A dificuldade das perguntas médicas aumenta à medida que você progride no hospital:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-black text-slate-700 block">Início (Casas 0-12)</span>
                    <span className="text-slate-400">55% Fácil • 35% Média • 10% Difícil</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-black text-slate-700 block">Meio (Casas 13-32)</span>
                    <span className="text-slate-400">35% Fácil • 45% Média • 20% Difícil</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-black text-slate-700 block">Fim (Casas 33-49)</span>
                    <span className="text-slate-400">20% Fácil • 45% Média • 35% Difícil</span>
                  </div>
                  <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-100 text-yellow-700">
                    <span className="font-black block">Final (Casa 50)</span>
                    <span className="text-yellow-600">0% Fácil • 40% Média • 60% Difícil</span>
                  </div>
                </div>
              </div>

              {/* Casas Especiais */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-slate-800 text-base">3. Principais Casas Especiais</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <Sparkles size={16} className="text-cyan-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-700">Dupla Checagem:</strong>
                      <span className="text-slate-500 block mt-0.5">Permite eliminar duas alternativas incorretas antes de responder.</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <RefreshCw size={16} className="text-purple-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-700">Troca de Leito:</strong>
                      <span className="text-slate-500 block mt-0.5">Se acertar, você pode trocar de posição com qualquer equipe à sua frente.</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <ShieldAlert size={16} className="text-red-500 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-700">Risco Cirúrgico:</strong>
                      <span className="text-slate-500 block mt-0.5">Se acertar, avança o dobro das casas tiradas no dado da rodada.</span>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                    <Award size={16} className="text-yellow-600 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-slate-700">Pergunta de R3:</strong>
                      <span className="text-slate-500 block mt-0.5">Pergunta com 80% de chance de ser difícil. Se acertar, +5 casas. Se errar, perde o próximo turno!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Modal */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowHowToPlay(false)}
                className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm hover:shadow-indigo-100/50"
              >
                Entendido
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
