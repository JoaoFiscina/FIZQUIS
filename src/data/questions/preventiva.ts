import type { Question } from "../../types/questions";

export const preventivaQuestions: Question[] = [
  {
    id: "pre_01",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual dos seguintes princípios doutrinários do SUS garante que 'toda e qualquer pessoa tem direito aos serviços de saúde, sem distinção de raça, gênero ou classe social'?",
    options: {
      A: "Integralidade",
      B: "Equidade",
      C: "Universalidade",
      D: "Descentralização"
    },
    correctAnswer: "C",
    explanation: "A universalidade garante o acesso universal e gratuito a todas as ações e serviços de saúde a todos os cidadãos.",
    source: "Lei Orgânica da Saúde 8.080/90"
  },
  {
    id: "pre_02",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual dos níveis de prevenção de Leavell & Clark tem como objetivo central detectar precocemente uma doença e iniciar o tratamento o quanto antes para evitar complicações (ex: realização de mamografia de rastreamento)?",
    options: {
      A: "Prevenção Primária",
      B: "Prevenção Secundária",
      C: "Prevenção Terciária",
      D: "Prevenção Quaternária"
    },
    correctAnswer: "B",
    explanation: "A prevenção secundária atua na detecção precoce de patologias em indivíduos assintomáticos (ex: rastreamentos) e tratamento imediato.",
    source: "História Natural da Doença de Leavell & Clark"
  },
  {
    id: "pre_03",
    area: "preventiva",
    difficulty: "facil",
    statement: "O princípio organizacional do SUS que transfere responsabilidades e poder de decisão sobre os serviços de saúde para o nível municipal é a:",
    options: {
      A: "Regionalização",
      B: "Descentralização",
      C: "Universalização",
      D: "Hierarquização"
    },
    correctAnswer: "B",
    explanation: "A descentralização consiste na redistribuição das responsabilidades de gestão dos serviços de saúde entre os entes federados, com ênfase na municipalização.",
    source: "Artigo 198 da Constituição Federal de 1988"
  },
  {
    id: "pre_04",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual a lei orgânica da saúde que dispõe sobre a participação da comunidade na gestão do SUS e sobre as transferências intergovernamentais de recursos financeiros?",
    options: {
      A: "Lei 8.080/90",
      B: "Lei 8.142/90",
      C: "Decreto 7.508/11",
      D: "Constituição Federal de 1988"
    },
    correctAnswer: "B",
    explanation: "A Lei 8.142/90 regula a participação social (Conselhos e Conferências de Saúde) e a transferência de recursos federais fundo a fundo para estados e municípios.",
    source: "Legislação do SUS"
  },
  {
    id: "pre_05",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual o atributo essencial da Atenção Primária à Saúde (APS) caracterizado pelo acompanhamento do paciente ao longo do tempo por profissionais de referência, independentemente da presença ou ausência de doença?",
    options: {
      A: "Acesso de primeiro contato",
      B: "Longitudinalidade (vínculo)",
      C: "Coordenação do cuidado",
      D: "Integralidade"
    },
    correctAnswer: "B",
    explanation: "A longitudinalidade refere-se à existência de uma relação terapêutica contínua ao longo do tempo entre o usuário e a equipe de saúde na APS.",
    source: "PNAB - Política Nacional de Atenção Básica"
  },
  {
    id: "pre_06",
    area: "preventiva",
    difficulty: "facil",
    statement: "Em epidemiologia, a medida que expressa o número total de casos existentes (novos e antigos) de uma doença em uma população em um determinado ponto no tempo é a:",
    options: {
      A: "Incidência",
      B: "Prevalência",
      C: "Taxa de letalidade",
      D: "Mortalidade proporcional"
    },
    correctAnswer: "B",
    explanation: "A prevalência mede a proporção de indivíduos em uma população que apresentam a doença em um dado momento. A incidência foca apenas em casos novos.",
    source: "Epidemiologia Básica da OMS"
  },
  {
    id: "pre_07",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual sistema de informação do Ministério da Saúde é responsável pelo registro e notificação de doenças de notificação compulsória no Brasil?",
    options: {
      A: "SIM (Sistema de Informações sobre Mortalidade)",
      B: "SINASC (Sistema de Informações sobre Nascidos Vivos)",
      C: "SINAN (Sistema de Informação de Agravos de Notificação)",
      D: "SIA-SUS"
    },
    correctAnswer: "C",
    explanation: "O SINAN é alimentado principalmente pela notificação compulsória de doenças e agravos constantes na lista nacional oficial.",
    source: "Vigilância em Saúde - Ministério da Saúde"
  },
  {
    id: "pre_08",
    area: "preventiva",
    difficulty: "facil",
    statement: "Qual o conceito de Prevenção Quaternária proposto por Marc Jamoulle na prática médica?",
    options: {
      A: "Prevenir a reabilitação física inadequada",
      B: "Detectar e evitar intervenções médicas excessivas, protegendo o paciente de iatrogenias e exames desnecessários",
      C: "Vacinar populações de risco extremo",
      D: "Rastrear doenças incuráveis na atenção primária"
    },
    correctAnswer: "B",
    explanation: "A prevenção quaternária identifica o paciente em risco de sobrediagnóstico ou sobretratamento (medicalização desnecessária) para sugerir alternativas eticamente aceitáveis.",
    source: "Tratado de Medicina de Família e Comunidade"
  },
  {
    id: "pre_09",
    area: "preventiva",
    difficulty: "facil",
    statement: "Em um hospital, um paciente falece de causas naturais sob cuidados de seu médico assistente particular por doença crônica conhecida. Quem é o responsável legal pelo preenchimento e assinatura da Declaração de Óbito?",
    options: {
      A: "O médico assistente do paciente",
      B: "O Serviço de Verificação de Óbitos (SVO)",
      C: "O Instituto Médico Legal (IML)",
      D: "O diretor clínico do hospital obrigatoriamente"
    },
    correctAnswer: "A",
    explanation: "Em óbitos por causas naturais de pacientes sob assistência médica regular, a obrigação de emitir a Declaração de Óbito é do médico que vinha prestando assistência.",
    source: "Resolução do CFM sobre Declaração de Óbito"
  },
  {
    id: "pre_10",
    area: "preventiva",
    difficulty: "facil",
    statement: "O Pacto pela Saúde estabelecido em 2006 organizou-se em três componentes principais. Quais são eles?",
    options: {
      A: "Pacto pela Vida, Pacto em Defesa do SUS e Pacto de Gestão do SUS",
      B: "Pacto da Atenção Básica, Pacto de Média e Pacto de Alta Complexidade",
      C: "Pacto da Saúde Coletiva, Pacto da Assistência Hospitalar e Pacto de Vigilância",
      D: "Pacto Federal, Pacto Estadual e Pacto Municipal"
    },
    correctAnswer: "A",
    explanation: "O Pacto de 2006 subdividiu-se em três eixos: Pacto pela Vida (prioridades em saúde), Pacto em Defesa do SUS (financiamento e controle social) e Pacto de Gestão (descentralização e regionalização).",
    source: "Portaria MS/GM nº 399/2006"
  },
  {
    id: "pre_11",
    area: "preventiva",
    difficulty: "media",
    statement: "Qual tipo de desenho de estudo epidemiológico parte de indivíduos saudáveis expostos e não expostos a um determinado fator de risco, acompanhando-os prospectivamente ao longo do tempo para comparar a ocorrência de casos novos da doença?",
    options: {
      A: "Estudo de Caso-Controle",
      B: "Estudo de Coorte",
      C: "Estudo Ecológico",
      D: "Estudo Seccional (Transversal)"
    },
    correctAnswer: "B",
    explanation: "O estudo de coorte é observacional, longitudinal e geralmente prospectivo, partindo da exposição em busca do desfecho (ideal para calcular incidência e risco relativo).",
    source: "Metodologia Científica e Epidemiologia"
  },
  {
    id: "pre_12",
    area: "preventiva",
    difficulty: "media",
    statement: "Para avaliar a associação entre tabagismo e câncer de bexiga, realizou-se um estudo de caso-controle. Qual a medida de associação estatística apropriada a ser calculada?",
    options: {
      A: "Risco Relativo (RR)",
      B: "Razão de Chances (Odds Ratio - OR)",
      C: "Redução Absoluta do Risco (RAR)",
      D: "Razão de Prevalência (RP)"
    },
    correctAnswer: "B",
    explanation: "Estudos de caso-controle partem do desfecho para investigar exposições passadas. Não medem incidência diretamente, impossibilitando cálculo do RR, restando calcular o Odds Ratio (razão de chances).",
    source: "Epidemiologia de Gordis"
  },
  {
    id: "pre_13",
    area: "preventiva",
    difficulty: "media",
    statement: "A capacidade de um teste diagnóstico identificar corretamente os verdadeiros doentes (proporção de resultados positivos entre os indivíduos que realmente têm a doença) é a definição de:",
    options: {
      A: "Especificidade",
      B: "Sensibilidade",
      C: "Valor Preditivo Positivo",
      D: "Acurácia global"
    },
    correctAnswer: "B",
    explanation: "A sensibilidade mede a taxa de verdadeiros-positivos entre os doentes. Um teste altamente sensível é ideal para triagens por apresentar poucos falsos-negativos.",
    source: "Epidemiologia Clínica"
  },
  {
    id: "pre_14",
    area: "preventiva",
    difficulty: "media",
    statement: "Se a prevalência de uma determinada doença aumenta significativamente em uma população, o que acontece com os valores preditivos de um mesmo teste diagnóstico aplicado a esta população?",
    options: {
      A: "O VPP aumenta e o VPN diminui",
      B: "O VPP diminui e o VPN aumenta",
      C: "Ambos aumentam proporcionalmente",
      D: "Os valores preditivos não sofrem influência da prevalência"
    },
    correctAnswer: "A",
    explanation: "O Valor Preditivo Positivo (VPP) é diretamente proporcional à prevalência. Se a doença é comum, a chance de um teste positivo ser um verdadeiro-positivo aumenta. O VPN diminui.",
    source: "Medicina Baseada em Evidências"
  },
  {
    id: "pre_15",
    area: "preventiva",
    difficulty: "media",
    statement: "O Indicador de Swaroop-Uemura (Razão de Mortalidade Proporcional) é um importante indicador de nível de vida de populações. Ele calcula a proporção de mortes ocorridas em indivíduos com idade igual ou superior a:",
    options: {
      A: "1 ano de idade",
      B: "50 anos de idade",
      C: "65 anos de idade",
      D: "70 anos de idade"
    },
    correctAnswer: "B",
    explanation: "O índice de Swaroop-Uemura mede a porcentagem de óbitos de pessoas com 50 anos ou mais em relação ao total de óbitos. Quanto mais próximo de 100%, melhor o nível de saúde da região.",
    source: "Indicadores de Saúde no Brasil - RIPSA"
  },
  {
    id: "pre_16",
    area: "preventiva",
    difficulty: "media",
    statement: "Em um ensaio clínico randomizado, a técnica de cegamento em duplo-cego significa que:",
    options: {
      A: "Nem o paciente nem o médico assistente/pesquisador que avalia o desfecho sabem qual intervenção foi recebida",
      B: "O paciente e o estatístico não sabem o tratamento",
      C: "Dois grupos diferentes recebem placebos idênticos",
      D: "O estudo foi randomizado eletronicamente em duas etapas"
    },
    correctAnswer: "A",
    explanation: "Estudos duplo-cegos ocultam a designação de tratamento dos participantes e dos investigadores que coletam/avaliam dados para evitar viés de aferição.",
    source: "Metodologia de Ensaios Clínicos"
  },
  {
    id: "pre_17",
    area: "preventiva",
    difficulty: "media",
    statement: "Qual das seguintes infecções de relevância epidemiológica nacional exige notificação compulsória imediata (em até 24 horas) pelos serviços de saúde?",
    options: {
      A: "Dengue sem sinais de alarme em área endêmica",
      B: "Raiva humana ou suspeita de exposição ao vírus rábico",
      C: "Hanseníase",
      D: "Esquistossomose em área de transmissão"
    },
    correctAnswer: "B",
    explanation: "A raiva humana e suspeitas de raiva são agravos graves de notificação compulsória imediata devido ao risco letal iminente.",
    source: "Portaria de Consolidação nº 4/2017 - MS"
  },
  {
    id: "pre_18",
    area: "preventiva",
    difficulty: "media",
    statement: "O cálculo do Número Necessário para Tratar (NNT) em um estudo clínico terapêutico é obtido por qual das fórmulas?",
    options: {
      A: "1 / Redução Absoluta do Risco (RAR)",
      B: "1 - Risco Relativo (RR)",
      C: "Redução do Risco Relativo / Odds Ratio",
      D: "Incidência nos expostos / Incidência nos não expostos"
    },
    correctAnswer: "A",
    explanation: "O NNT (número de doentes que precisam ser tratados para evitar 1 desfecho indesejável) é o inverso da redução absoluta do risco (1/RAR).",
    source: "Epidemiologia e Estatística Clínica"
  },
  {
    id: "pre_19",
    area: "preventiva",
    difficulty: "media",
    statement: "O financiamento atual da Atenção Primária no Brasil estruturou-se pelo programa Previne Brasil. Quais são os eixos de custeio adotados?",
    options: {
      A: "PAB Fixo e PAB Variável por emendas",
      B: "Capitação ponderada, pagamento por desempenho e incentivo para ações estratégicas",
      C: "Financiamento direto por número de leitos e consultas",
      D: "Transferência fixa de 15% da receita líquida do município"
    },
    correctAnswer: "B",
    explanation: "O Previne Brasil (com alterações subsequentes) baseia seu repasse na capitação ponderada (cadastro de usuários), pagamento por desempenho (metas de indicadores) e incentivo a ações específicas.",
    source: "Ministério da Saúde - Portaria nº 2.979/2019"
  },
  {
    id: "pre_20",
    area: "preventiva",
    difficulty: "media",
    statement: "A taxa de mortalidade infantil neonatal precoce abrange os óbitos ocorridos no período de:",
    options: {
      A: "Do nascimento até 6 dias completos de vida",
      B: "Do nascimento até 27 dias completos de vida",
      C: "Dos 7 dias aos 28 dias de vida",
      D: "Do nascimento até o final do primeiro ano"
    },
    correctAnswer: "A",
    explanation: "O período neonatal precoce vai de 0 a 6 dias de vida. O neonatal tardio vai de 7 a 27 dias de vida. A mortalidade infantil neonatal total inclui ambos (0 a 27 dias).",
    source: "RIPSA - Conceitos Básicos de Indicadores"
  },
  {
    id: "pre_21",
    area: "preventiva",
    difficulty: "dificil",
    statement: "Um estudo clínico avaliou um novo anti-hipertensivo. A redução da pressão sistólica média no grupo tratamento foi de 12 mmHg e no grupo controle de 4 mmHg, com valor-p < 0,01. O intervalo de confiança de 95% para a diferença de médias foi de [5,2 a 10,8 mmHg]. Qual a correta interpretação estatística?",
    options: {
      A: "Há menos de 1% de chance de a hipótese nula ser verdadeira; a diferença observada é estatisticamente significante.",
      B: "A eficácia clínica é garantida em exatamente 95% de todos os hipertensos do país.",
      C: "O valor-p indica que o medicamento cura 99% dos doentes.",
      D: "A hipótese nula foi aceita, pois o intervalo de confiança inclui o valor zero."
    },
    correctAnswer: "A",
    explanation: "O valor-p < 0,01 (rejeita-se hipótese nula com p < 0,05) e o IC95% que não engloba o zero (valor nulo para diferença de médias) atestam significância estatística do achado.",
    source: "Bioestatística Básica"
  },
  {
    id: "pre_22",
    area: "preventiva",
    difficulty: "dificil",
    statement: "Em uma triagem para detecção de hepatite C crônica em um banco de sangue, utilizou-se um teste com Sensibilidade de 90% e Especificidade de 95%. Se testarmos 1.000 pessoas onde a prevalência real da doença é de 10% (100 doentes), qual será o número de resultados Falsos-Negativos obtidos?",
    options: {
      A: "10 pessoas",
      B: "45 pessoas",
      C: "90 pessoas",
      D: "5 pessoas"
    },
    correctAnswer: "A",
    explanation: "Com 100 doentes reais e sensibilidade de 90%, o teste detectará 90 verdadeiros-positivos. Os outros 10% dos doentes (10 pessoas) terão resultado negativo falso (Falsos-Negativos).",
    source: "Estatística Aplicada à Saúde"
  },
  {
    id: "pre_23",
    area: "preventiva",
    difficulty: "dificil",
    statement: "No contexto da validade de estudos epidemiológicos, a presença de uma variável estranha que se associa tanto à exposição quanto ao desfecho, podendo distorcer a verdadeira relação causal estudada se não controlada, denomina-se:",
    options: {
      A: "Fator de confusão (confundimento)",
      B: "Viés de aferição",
      C: "Efeito placebo tardio",
      D: "Viés de seleção por atrito"
    },
    correctAnswer: "A",
    explanation: "O confundidor é uma variável associada à exposição e, independentemente disso, causadora do desfecho, induzindo associação espúria caso não haja ajuste ou pareamento.",
    source: "Epidemiologia Moderna de Rothman"
  },
  {
    id: "pre_24",
    area: "preventiva",
    difficulty: "dificil",
    statement: "Na avaliação de testes diagnósticos contínuos, qual parâmetro estatístico é representado pela Área Sob a Curva ROC (Receiver Operating Characteristic) para avaliar a performance global do teste?",
    options: {
      A: "A sensibilidade máxima do teste",
      B: "O poder discriminatório global do teste (acurácia), variando de 0,5 (sem discriminação) a 1,0 (discriminação perfeita)",
      C: "A prevalência média estimada na população",
      D: "A taxa de falsos-positivos aceitável"
    },
    correctAnswer: "B",
    explanation: "A AUC (Area Under Curve) da curva ROC representa a probabilidade de o teste discriminar corretamente um indivíduo doente de um saudável. Quanto maior a área (próxima a 1,0), melhor a acurácia global.",
    source: "Acurácia de Testes Diagnósticos"
  },
  {
    id: "pre_25",
    area: "preventiva",
    difficulty: "dificil",
    statement: "Qual comissão permanente do SUS, criada pela Lei 12.401/11, assessora o Ministério da Saúde na incorporação, exclusão ou alteração de tecnologias em saúde e medicamentos no âmbito do SUS?",
    options: {
      A: "CONASS (Conselho Nacional de Secretários de Saúde)",
      B: "CONITEC (Comissão Nacional de Incorporação de Tecnologias no SUS)",
      C: "ANVISA",
      D: "CNS (Conselho Nacional de Saúde)"
    },
    correctAnswer: "B",
    explanation: "A CONITEC é a comissão responsável pela avaliação de evidências de eficácia, segurança e custo-efetividade para incorporação de tecnologias e tratamentos no SUS.",
    source: "Lei 12.401/2011"
  }
];
