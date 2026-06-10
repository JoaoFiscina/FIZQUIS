import type { Question } from "../../types/questions";

export const clinicaQuestions: Question[] = [
  {
    id: "cli_01",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual é o valor de glicemia de jejum em duas ocasiões diferentes considerado diagnóstico para Diabetes Mellitus?",
    options: {
      A: ">= 100 mg/dL",
      B: ">= 110 mg/dL",
      C: ">= 126 mg/dL",
      D: ">= 200 mg/dL"
    },
    correctAnswer: "C",
    explanation: "O diagnóstico de Diabetes Mellitus por glicemia de jejum é confirmado com valores maiores ou iguais a 126 mg/dL obtidos em duas ocasiões diferentes.",
    source: "Diretriz da Sociedade Brasileira de Diabetes (SBD)"
  },
  {
    id: "cli_02",
    area: "clinica",
    difficulty: "facil",
    statement: "Paciente masculino, 65 anos, apresenta dispneia aos pequenos esforços, edema de membros inferiores e turgência jugular patológica. Qual a principal suspeita clínica?",
    options: {
      A: "Embolia pulmonar crônica",
      B: "Insuficiência cardíaca congestiva",
      C: "Cirrose hepática",
      D: "Insuficiência renal crônica"
    },
    correctAnswer: "B",
    explanation: "A tríade de dispneia aos esforços, edema periférico e turgência jugular é clássica de insuficiência cardíaca de predomínio congestivo.",
    source: "Diretrizes de IC da SBC"
  },
  {
    id: "cli_03",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual dos seguintes marcadores de necrose miocárdica é o mais específico para o diagnóstico de infarto agudo do miocárdio?",
    options: {
      A: "Mioglobina",
      B: "CK-MB atividade",
      C: "LDH",
      D: "Troponina"
    },
    correctAnswer: "D",
    explanation: "As troponinas cardíacas (I e T) são os biomarcadores mais específicos e sensíveis para detecção de lesão miocárdica.",
    source: "IV Diretriz de IAM da SBC"
  },
  {
    id: "cli_04",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual é a principal causa de anemia microcítica e hipocrômica em adultos?",
    options: {
      A: "Deficiência de ácido fólico",
      B: "Deficiência de ferro (Ferropriva)",
      C: "Anemia de doença crônica",
      D: "Deficiência de vitamina B12"
    },
    correctAnswer: "B",
    explanation: "A anemia ferropriva é a principal causa mundial de anemia microcítica e hipocrômica, sendo frequentemente secundária a sangramentos crônicos em adultos.",
    source: "Tratado de Clínica Médica"
  },
  {
    id: "cli_05",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual o agente etiológico mais comum da pneumonia adquirida na comunidade (PAC) em adultos?",
    options: {
      A: "Mycoplasma pneumoniae",
      B: "Haemophilus influenzae",
      C: "Streptococcus pneumoniae",
      D: "Klebsiella pneumoniae"
    },
    correctAnswer: "C",
    explanation: "O Streptococcus pneumoniae (pneumococo) é o agente bacteriano mais comum da pneumonia adquirida na comunidade em todas as faixas etárias de adultos.",
    source: "SBPT - Diretrizes de PAC"
  },
  {
    id: "cli_06",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual das seguintes alterações no eletrocardiograma é considerada sinal clássico de hipercalemia grave?",
    options: {
      A: "Ondas T apiculadas e simétricas (onda T em tenda)",
      B: "Presença de onda U proeminente",
      C: "Intervalo QT prolongado",
      D: "Inversão generalizada de onda T"
    },
    correctAnswer: "A",
    explanation: "A onda T apiculada, estreita e simétrica (em tenda) é a manifestação eletrocardiográfica inicial mais comum da hipercalemia.",
    source: "Medicina de Emergência - USP"
  },
  {
    id: "cli_07",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual o medicamento de escolha para reversão imediata de intoxicação aguda por benzodiazepínicos?",
    options: {
      A: "Naloxona",
      B: "Flumazenil",
      C: "Atropina",
      D: "N-acetilcisteína"
    },
    correctAnswer: "B",
    explanation: "O flumazenil é um antagonista competitivo dos receptores de benzodiazepínicos e é o antídoto indicado em intoxicações com depressão respiratória/neurológica grave.",
    source: "Toxicologia Clínica"
  },
  {
    id: "cli_08",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual a causa mais comum de hipotireoidismo primário em áreas com suficiência de iodo?",
    options: {
      A: "Tireoidite de Hashimoto",
      B: "Bócio endêmico",
      C: "Tireoidite de Quervain",
      D: "Uso crônico de amiodarona"
    },
    correctAnswer: "A",
    explanation: "A tireoidite autoimune de Hashimoto é a causa disparada mais frequente de hipotireoidismo primário em regiões onde o iodo é adequadamente suplementado.",
    source: "Endocrinologia Básica e Clínica"
  },
  {
    id: "cli_09",
    area: "clinica",
    difficulty: "facil",
    statement: "Qual é o principal sintoma e manifestação clínica da Doença do Refluxo Gastroesofágico (DRGE)?",
    options: {
      A: "Disfagia e dor torácica",
      B: "Dispepsia e náuseas",
      C: "Pirose e regurgitação ácida",
      D: "Hematêmese e melena"
    },
    correctAnswer: "C",
    explanation: "A pirose (queimação retroesternal) e a regurgitação ácida são os sintomas típicos e mais comuns da DRGE.",
    source: "Federação Brasileira de Gastroenterologia"
  },
  {
    id: "cli_10",
    area: "clinica",
    difficulty: "facil",
    statement: "A deficiência de qual vitamina está classicamente associada ao Beribéri e à Encefalopatia de Wernicke?",
    options: {
      A: "Vitamina B12 (Cobalamina)",
      B: "Vitamina B1 (Tiamina)",
      C: "Vitamina B6 (Piridoxina)",
      D: "Vitamina C (Ácido ascórbico)"
    },
    correctAnswer: "B",
    explanation: "A deficiência de tiamina (Vitamina B1) causa a Encefalopatia de Wernicke e a psicose de Korsakoff, muito comum em alcoolistas, além do Beribéri.",
    source: "Tratado de Medicina Interna de Harrison"
  },
  {
    id: "cli_11",
    area: "clinica",
    difficulty: "media",
    statement: "Paciente de 45 anos, tabagista, apresenta tosse produtiva crônica há 3 anos com duração de mais de 3 meses por ano. O diagnóstico clínico mais provável é:",
    options: {
      A: "Asma persistente moderada",
      B: "Bronquiectasias de repetição",
      C: "Bronquite crônica (subtipo DPOC)",
      D: "Tuberculose pulmonar cavitária"
    },
    correctAnswer: "C",
    explanation: "A definição clínica de bronquite crônica é tosse produtiva por pelo menos 3 meses por ano, em dois anos consecutivos, excluídas outras causas.",
    source: "GOLD DPOC Diretrizes"
  },
  {
    id: "cli_12",
    area: "clinica",
    difficulty: "media",
    statement: "Qual dos seguintes exames é considerado o padrão-ouro (método confirmatório definitivo) para o diagnóstico de embolia pulmonar?",
    options: {
      A: "Angiotomografia computadorizada de artérias pulmonares",
      B: "D-dímero quantitativo plasmático",
      C: "Cintilografia pulmonar de ventilação/perfusão",
      D: "Arteriografia pulmonar por cateterismo"
    },
    correctAnswer: "D",
    explanation: "Embora a Angio-TC seja o exame de escolha no dia a dia por ser menos invasiva, a arteriografia pulmonar convencional continua sendo o padrão-ouro histórico.",
    source: "Diretrizes de TEP da SBC"
  },
  {
    id: "cli_13",
    area: "clinica",
    difficulty: "media",
    statement: "A presença de anticorpos anti-DNA de dupla hélice (anti-dsDNA) e anti-Sm está fortemente associada a qual patologia autoimune?",
    options: {
      A: "Esclerose Sistêmica",
      B: "Lúpus Eritematoso Sistêmico (LES)",
      C: "Artrite Reumatoide",
      D: "Síndrome de Sjögren"
    },
    correctAnswer: "B",
    explanation: "O anticorpo anti-dsDNA é altamente específico para o LES e se relaciona com atividade de doença (nefrite), e o anti-Sm é o anticorpo mais específico para o diagnóstico de Lúpus.",
    source: "Consenso Brasileiro de Lúpus"
  },
  {
    id: "cli_14",
    area: "clinica",
    difficulty: "media",
    statement: "Um sopro holossistólico áspero em foco aórtico que se irradia para as artérias carótidas sugere fortemente o diagnóstico de:",
    options: {
      A: "Insuficiência mitral grave",
      B: "Estenose aórtica",
      C: "Persistência do canal arterial",
      D: "Insuficiência aórtica crônica"
    },
    correctAnswer: "B",
    explanation: "A estenose aórtica cursa tipicamente com sopro sistólico ejetivo áspero, crescendo-decrescendo em foco aórtico com irradiação carotídea.",
    source: "Semiologia Médica de Porto"
  },
  {
    id: "cli_15",
    area: "clinica",
    difficulty: "media",
    statement: "Qual das seguintes drogas reduz comprovadamente a mortalidade a longo prazo em pacientes com insuficiência cardíaca com fração de ejeção reduzida?",
    options: {
      A: "Furosemida",
      B: "Digoxina",
      C: "Carvedilol",
      D: "Dobutamina"
    },
    correctAnswer: "C",
    explanation: "Os betabloqueadores (como carvedilol, succinato de metoprolol e bisoprolol) reduzem comprovadamente a mortalidade e internações na ICFER.",
    source: "Diretrizes de IC da SBC"
  },
  {
    id: "cli_16",
    area: "clinica",
    difficulty: "media",
    statement: "Nos critérios de Jones para o diagnóstico de Febre Reumática, qual das alternativas representa um critério maior?",
    options: {
      A: "Febre",
      B: "Artralgia",
      C: "Elevação de VHS ou PCR",
      D: "Coreia de Sydenham"
    },
    correctAnswer: "D",
    explanation: "A Coreia de Sydenham, a cardite, a artrite (poliartrite migratória), os nódulos subcutâneos e o eritema marginado constituem os critérios maiores de Jones.",
    source: "Tratado de Pediatria e Reumatologia"
  },
  {
    id: "cli_17",
    area: "clinica",
    difficulty: "media",
    statement: "Qual marcador sorológico confirma imunidade ao vírus da Hepatite B decorrente exclusivamente da vacinação?",
    options: {
      A: "Anti-HBs isolado positivo",
      B: "Anti-HBc total e Anti-HBs positivos",
      C: "HBsAg e Anti-HBc total positivos",
      D: "Anti-HBe positivo"
    },
    correctAnswer: "A",
    explanation: "A presença de anticorpos Anti-HBs isolados (sem Anti-HBc) indica imunidade induzida por vacinação (que utiliza o antígeno de superfície HBsAg purificado).",
    source: "Ministério da Saúde - Manual de Hepatites"
  },
  {
    id: "cli_18",
    area: "clinica",
    difficulty: "media",
    statement: "Qual a complicação mais temida da reposição excessivamente rápida de sódio em pacientes com hiponatremia crônica grave?",
    options: {
      A: "Edema cerebral agudo",
      B: "Mielinólise pontina central (síndrome de desmielinização osmótica)",
      C: "Hemorragia alveolar",
      D: "Insuficiência renal aguda por rabdomiólise"
    },
    correctAnswer: "B",
    explanation: "A correção rápida de hiponatremia crônica pode desidratar células cerebrais rapidamente, levando à mielinólise pontina central (desmielinização osmótica).",
    source: "Nefrologia Clínica"
  },
  {
    id: "cli_19",
    area: "clinica",
    difficulty: "media",
    statement: "Para estimar o risco cardiovascular a longo prazo em prevenção primária, o escore de risco de escolha adotado pela SBC é:",
    options: {
      A: "Escore de risco global de Framingham",
      B: "Escore de Risco Cardiovascular de ASCVD (AHA)",
      C: "Escore de Risco de Reynolds",
      D: "Escore de Cálcio Coronário"
    },
    correctAnswer: "A",
    explanation: "A SBC recomenda a utilização do Escore de Risco Global de Framingham adaptado para a população brasileira para rastreamento de risco.",
    source: "Diretriz de Dislipidemias da SBC"
  },
  {
    id: "cli_20",
    area: "clinica",
    difficulty: "media",
    statement: "Qual das seguintes nefropatias glomerulares se apresenta tipicamente com hematúria macrocítica recorrente coincidindo com infecções respiratórias (hematúria sinfaríngea)?",
    options: {
      A: "Glomerulonefrite pós-estreptocócica (GNPE)",
      B: "Nefropatia por IgA (Doença de Berger)",
      C: "Glomerulosclerose segmentar e focal (GESF)",
      D: "Doença de Lesões Mínimas"
    },
    correctAnswer: "B",
    explanation: "A Doença de Berger é caracterizada por episódios de hematúria macroscópica que coincidem ou ocorrem 24-48h após infecções das vias aéreas (sinfaríngea). A GNPE leva 1-3 semanas (período de incubação).",
    source: "KDIGO Glomerulonephritis guidelines"
  },
  {
    id: "cli_21",
    area: "clinica",
    difficulty: "dificil",
    statement: "Quais são as três variáveis clínicas clássicas que compõem a Tríade de Beck no tamponamento cardíaco?",
    options: {
      A: "Hipotensão, taquicardia e estase jugular unilateral",
      B: "Hipotensão, abafamento de bulhas cardíacas e turgência jugular patológica",
      C: "Hipertensão, bradicardia e bradipneia (reflexo de Cushing)",
      D: "Hipotensão, dispneia intensa e pulso paradoxal"
    },
    correctAnswer: "B",
    explanation: "A tríade de Beck é composta por hipotensão arterial, bulhas cardíacas hipofonéticas/abafadas e turgência (ingurgitamento) jugular bilateral.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "cli_22",
    area: "clinica",
    difficulty: "dificil",
    statement: "De acordo com os critérios de Light para análise do líquido pleural, qual das seguintes relações classifica um derrame como exsudato?",
    options: {
      A: "Relação de proteínas do líquido pleural/proteína sérica > 0,5",
      B: "Relação de proteínas do líquido pleural/proteína sérica < 0,5",
      C: "Relação de DHL do líquido pleural/DHL sérico < 0,6",
      D: "DHL do líquido pleural menor que 1/3 do limite superior do DHL sérico"
    },
    correctAnswer: "A",
    explanation: "Os critérios de Light definem exsudato se: Prot PL/Sérica > 0,5; DHL PL/Sérico > 0,6 ou DHL PL > 2/3 do limite superior sérico normal.",
    source: "Pneumologia de Oxford"
  },
  {
    id: "cli_23",
    area: "clinica",
    difficulty: "dificil",
    statement: "Paciente feminina apresenta fraqueza muscular simétrica ascendente progressiva com arreflexia global, 2 semanas após infecção diarreica por Campylobacter jejuni. Qual a principal hipótese diagnóstica?",
    options: {
      A: "Miastenia Gravis",
      B: "Esclerose Lateral Amiotrófica",
      C: "Síndrome de Guillain-Barré (SGB)",
      D: "Esclerose Múltipla surto-remissão"
    },
    correctAnswer: "C",
    explanation: "A SGB é uma polineuropatia desmielinizante inflamatória aguda, classicamente manifestada por paralisia flácida, simétrica e ascendente com arreflexia, frequentemente após infecção por C. jejuni.",
    source: "Neurologia do Harrison"
  },
  {
    id: "cli_24",
    area: "clinica",
    difficulty: "dificil",
    statement: "A tríade clássica de cefaleia episódica, sudorese profusa e palpitações em um paciente hipertenso grave de difícil controle clínico sugere o diagnóstico de:",
    options: {
      A: "Hiperaldosteronismo primário",
      B: "Estenose de artéria renal",
      C: "Feocromocitoma",
      D: "Coartação de aorta"
    },
    correctAnswer: "C",
    explanation: "O feocromocitoma (tumor produtor de catecolaminas) se apresenta classicamente com crises paroxísticas de hipertensão associada à tríade de cefaleia, sudorese e taquicardia/palpitação.",
    source: "Endocrinologia Básica de Vilar"
  },
  {
    id: "cli_25",
    area: "clinica",
    difficulty: "dificil",
    statement: "Qual a conduta inicial em relação ao uso de glicocorticoides na meningite bacteriana aguda suspeita ou confirmada por Streptococcus pneumoniae?",
    options: {
      A: "Administrar dexametasona apenas após os resultados das culturas do líquor",
      B: "Administrar dexametasona imediatamente antes ou concomitante à primeira dose de antibiótico",
      C: "Não há recomendação de corticoide em adultos, apenas em crianças com H. influenzae",
      D: "Administrar dexametasona continuamente por 21 dias"
    },
    correctAnswer: "B",
    explanation: "A dexametasona reduz a resposta inflamatória meníngea e a perda auditiva/complicações neurológicas. Deve ser dada antes ou junto com o antibiótico (não após, pois a lise bacteriana pós-antibiótico exacerba a inflamação).",
    source: "CDC - Meningitis Guidelines"
  }
];
