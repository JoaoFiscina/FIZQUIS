import type { Question } from "../../types/questions";

export const cirurgiaQuestions: Question[] = [
  {
    id: "cir_01",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual o sinal propedêutico caracterizado por dor à descompressão súbita no ponto de McBurney, clássico de apendicite aguda?",
    options: {
      A: "Sinal de Murphy",
      B: "Sinal de Blumberg",
      C: "Sinal de Kehr",
      D: "Sinal de Courvoisier-Terrier"
    },
    correctAnswer: "B",
    explanation: "O sinal de Blumberg é a dor à descompressão súbita no ponto de McBurney, indicando irritação peritoneal localizada, clássico da apendicite.",
    source: "Sabiston - Tratado de Cirurgia"
  },
  {
    id: "cir_02",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Paciente com dor biliar típica de forte intensidade em hipocôndrio direito, associada a náuseas e parada temporária da inspiração profunda durante a palpação profunda sob o rebordo costal direito. Qual o nome deste sinal?",
    options: {
      A: "Sinal de Murphy",
      B: "Sinal de Kehr",
      C: "Sinal de Giordano",
      D: "Sinal de Courvoisier-Terrier"
    },
    correctAnswer: "A",
    explanation: "O Sinal de Murphy é positivo quando ocorre a interrupção súbita da inspiração do paciente durante a palpação do ponto cístico, indicando colecistite aguda.",
    source: "Cirurgia Geral - USP"
  },
  {
    id: "cir_03",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Uma ferida cirúrgica realizada em condições assépticas, em tecido não infectado, sem penetração nos tratos digestivo, respiratório ou geniturinário, é classificada como:",
    options: {
      A: "Limpa-contaminada",
      B: "Contaminada",
      C: "Limpa",
      D: "Infectada"
    },
    correctAnswer: "C",
    explanation: "Feridas limpas são cirurgias eletivas, não traumáticas, sem quebra de assepsia e sem abertura de tratos que contenham microbiota.",
    source: "Manual de Infecção Hospitalar - ANVISA"
  },
  {
    id: "cir_04",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual a conduta inicial imediata diante de um paciente com diagnóstico clínico de pneumotórax hipertensivo em franca insuficiência respiratória?",
    options: {
      A: "Radiografia de tórax em duas incidências",
      B: "Toracocentese de alívio (punção com agulha no segundo espaço intercostal)",
      C: "Intubação orotraqueal imediata",
      D: "Drenagem pleural fechada em selo d'água"
    },
    correctAnswer: "B",
    explanation: "O pneumotórax hipertensivo exige diagnóstico clínico e descompressão imediata por punção com agulha (toracocentese de alívio) antes de qualquer exame de imagem.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "cir_05",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Na estimativa de superfície corporal queimada em adultos pela 'Regra dos Noves' de Pulaski-Tennison, a queimadura de todo o membro superior esquerdo equivale a qual porcentagem?",
    options: {
      A: "9%",
      B: "18%",
      C: "4,5%",
      D: "14%"
    },
    correctAnswer: "A",
    explanation: "Pela Regra dos Noves, cada membro superior corresponde a 9% da superfície corporal total.",
    source: "Manual de Queimados da SBC"
  },
  {
    id: "cir_06",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual a tríade clássica que caracteriza o quadro clínico de obstrução intestinal mecânica alta?",
    options: {
      A: "Dor abdominal em cólica, flatulência e diarreia profusa",
      B: "Dor abdominal, vômitos precoces e parada de eliminação de gases e fezes",
      C: "Icterícia, febre e dor em quadrante superior direito",
      D: "Dor abdominal crônica, ascite e edema de MMII"
    },
    correctAnswer: "B",
    explanation: "O quadro clínico clássico de obstrução alta é marcado por dor abdominal em cólica, vômitos precoces frequentes e parada de eliminação de fezes e gases.",
    source: "Tratado de Cirurgia de Townsend"
  },
  {
    id: "cir_07",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual é o exame de imagem inicial de escolha na avaliação de suspeita de colelitíase sintomática?",
    options: {
      A: "Tomografia Computadorizada de abdome",
      B: "Ultrassonografia de abdome superior",
      C: "Colangiopancreatografia por Ressonância (CPRM)",
      D: "Radiografia simples de abdome"
    },
    correctAnswer: "B",
    explanation: "A ultrassonografia de abdome é o exame padrão-ouro inicial para detectar cálculos biliares devido à sua alta sensibilidade, custo e perfil de segurança.",
    source: "Diretrizes de Litíase Biliar da FBG"
  },
  {
    id: "cir_08",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Hérnias que protruem medialmente aos vasos epigástricos inferiores, através da fáscia transversal (triângulo de Hesselbach), são classificadas como:",
    options: {
      A: "Hérnias inguinais indiretas",
      B: "Hérnias femorais (crurais)",
      C: "Hérnias inguinais diretas",
      D: "Hérnias umbilicais"
    },
    correctAnswer: "C",
    explanation: "As hérnias inguinais diretas ocorrem na parede posterior do canal inguinal (triângulo de Hesselbach), medialmente aos vasos epigástricos inferiores, decorrentes de fraqueza adquirida.",
    source: "Anatomia Cirúrgica de Gray"
  },
  {
    id: "cir_09",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual a complicação pós-operatória precoce mais comum associada à cirurgia de tireoidectomia total decorrente de lesão acidental das glândulas paratireoides?",
    options: {
      A: "Hipercalcemia grave",
      B: "Crise tireotóxica",
      C: "Hipocalcemia com tetania",
      D: "Rouquidão persistente"
    },
    correctAnswer: "C",
    explanation: "A remoção ou desvascularização acidental das paratireoides causa hipoparatireoidismo transitório ou definitivo, provocando hipocalcemia aguda sintomática (sinal de Chvostek e Trousseau).",
    source: "Cirurgia Cabeça e Pescoço"
  },
  {
    id: "cir_10",
    area: "cirurgia",
    difficulty: "facil",
    statement: "Qual das seguintes alterações clínicas faz parte da avaliação neurológica imediata (letra D) do protocolo ABCDE do trauma?",
    options: {
      A: "Frequência respiratória",
      B: "Escala de Coma de Glasgow e reatividade pupilar",
      C: "Presença de enfisema subcutâneo",
      D: "Pressão arterial média"
    },
    correctAnswer: "B",
    explanation: "A letra D ('Disability' ou déficit neurológico) no trauma avalia o nível de consciência pela Escala de Coma de Glasgow, tamanho e reatividade das pupilas.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "cir_11",
    area: "cirurgia",
    difficulty: "media",
    statement: "Qual é a tríade clínica de Charcot, indicativa de colangite aguda não complicada?",
    options: {
      A: "Febre com calafrios, icterícia e dor abdominal em hipocôndrio direito",
      B: "Hipotensão, alteração do sensório e febre",
      C: "Icterícia, ascite e circulação colateral",
      D: "Massa palpável, dor biliar e perda ponderal"
    },
    correctAnswer: "A",
    explanation: "A tríade de Charcot consiste em febre com calafrios, dor abdominal em hipocôndrio direito e icterícia, indicando obstrução e infecção das vias biliares.",
    source: "Tokyo Guidelines 2018"
  },
  {
    id: "cir_12",
    area: "cirurgia",
    difficulty: "media",
    statement: "A pêntade de Reynolds é uma complicação grave da colangite supurativa. Quais sinais adicionais se somam à tríade de Charcot?",
    options: {
      A: "Bradicardia e hipotermia",
      B: "Hipotensão arterial e depressão do nível de consciência (confusão mental)",
      C: "Vômitos incoercíveis e diarreia sanguínea",
      D: "Insuficiência renal aguda e anúria"
    },
    correctAnswer: "B",
    explanation: "A pêntade de Reynolds adiciona choque/hipotensão e confusão mental/depressão neurológica à clássica tríade de Charcot.",
    source: "Tokyo Guidelines 2018"
  },
  {
    id: "cir_13",
    area: "cirurgia",
    difficulty: "media",
    statement: "Paciente de 62 anos com quadro de diverticulite aguda é submetido a tomografia, demonstrando abscesso pélvico loculado sem pneumoperitônio livre. De acordo com a classificação de Hinchey modificada, este quadro equivale a:",
    options: {
      A: "Hinchey I",
      B: "Hinchey II",
      C: "Hinchey III",
      D: "Hinchey IV"
    },
    correctAnswer: "B",
    explanation: "A classificação de Hinchey clássica/modificada define Hinchey I como abscesso pericólico e Hinchey II como abscesso pélvico, retroperitoneal ou a distância. Hinchey III é peritonite purulenta e IV peritonite fecal.",
    source: "Diretrizes de Diverticulite da SBCP"
  },
  {
    id: "cir_14",
    area: "cirurgia",
    difficulty: "media",
    statement: "A hérnia inguinal que acompanha o funículo espermático e protrui pelo anel inguinal interno, lateral aos vasos epigástricos inferiores, é denominada:",
    options: {
      A: "Hérnia direta",
      B: "Hérnia indireta",
      C: "Hérnia femoral",
      D: "Hérnia obturatória"
    },
    correctAnswer: "B",
    explanation: "A hérnia inguinal indireta resulta de defeito congênito (persistência do conduto peritoneovaginal) e se estende lateralmente aos vasos epigástricos pelo anel inguinal interno.",
    source: "Tratado de Hérnias de Nyhus"
  },
  {
    id: "cir_15",
    area: "cirurgia",
    difficulty: "media",
    statement: "Qual tipo de hérnia da parede abdominal apresenta maior risco de estrangulamento e encarceramento devido à rigidez anatômica do seu canal?",
    options: {
      A: "Hérnia inguinal direta",
      B: "Hérnia umbilical",
      C: "Hérnia epigástrica",
      D: "Hérnia femoral (crural)"
    },
    correctAnswer: "D",
    explanation: "As hérnias femorais têm o maior risco relativo de encarceramento e estrangulamento devido aos limites rígidos do anel femoral (ligamento lacunar, pectíneo).",
    source: "Clínicas Cirúrgicas da América do Norte"
  },
  {
    id: "cir_16",
    area: "cirurgia",
    difficulty: "media",
    statement: "Na classificação de Forrest para risco de ressangramento de úlceras pépticas na endoscopia digestiva alta, uma úlcera com 'sangramento em jato ativo' é descrita como:",
    options: {
      A: "Forrest I a",
      B: "Forrest I b",
      C: "Forrest II a",
      D: "Forrest III"
    },
    correctAnswer: "A",
    explanation: "Forrest Ia corresponde a sangramento ativo arterial em jato. Forrest Ib é sangramento ativo 'babando' (gotejamento). Forrest IIa indica vaso visível não sangrante.",
    source: "Diretrizes de HDA da SOBED"
  },
  {
    id: "cir_17",
    area: "cirurgia",
    difficulty: "media",
    statement: "Qual a conduta cirúrgica reconstrutiva de escolha recomendada após uma gastrectomia distal (antrectomia) por úlcera ou neoplasia gástrica inicial?",
    options: {
      A: "Reconstrução a Billroth I ou Billroth II",
      B: "Reconstrução em Y de Roux gástrico apenas",
      C: "Esofagojejunostomia",
      D: "Interposição de cólon"
    },
    correctAnswer: "A",
    explanation: "As reconstruções clássicas após antrectomia são Billroth I (gastroduodenostomia) ou Billroth II (gastrojejunostomia com alça aferente).",
    source: "Cirurgia do Estômago - Sabiston"
  },
  {
    id: "cir_18",
    area: "cirurgia",
    difficulty: "media",
    statement: "Paciente de 40 anos, com história de colelitíase, evolui com abdome agudo obstrutivo. A radiografia demonstra distensão de alças delgadas, pneumobilia e imagem calcificada na fossa ilíaca direita. Qual o diagnóstico?",
    options: {
      A: "Apendicite aguda complicada",
      B: "Íleo biliar",
      C: "Volvulo de sigmoide",
      D: "Intussuscepção intestinal por pólipo"
    },
    correctAnswer: "B",
    explanation: "A tríade de Rigler (obstrução de delgado, pneumobilia e cálculo radiopaco ectópico) é patognomônica de íleo biliar, uma complicação de fístula colecistoentérica.",
    source: "Radiologia Abdominal"
  },
  {
    id: "cir_19",
    area: "cirurgia",
    difficulty: "media",
    statement: "Um paciente jovem vítima de colisão automobilística apresenta-se com dispneia grave, hipotensão, murmúrio vesicular abolido à esquerda e desvio da traqueia para a direita. Qual o diagnóstico e conduta inicial?",
    options: {
      A: "Pneumotórax simples / Drenagem de tórax no 5º EIC",
      B: "Tamponamento cardíaco / Pericardiocenteese de emergência",
      C: "Pneumotórax hipertensivo à esquerda / Toracocentese de alívio imediata",
      D: "Hemotórax maciço / Autotransfusão"
    },
    correctAnswer: "C",
    explanation: "O desvio contralateral da traqueia, murmúrio abolido ipsilateral e hipotensão em paciente com trauma torácico fecham diagnóstico de pneumotórax hipertensivo, tratado com descompressão por agulha.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "cir_20",
    area: "cirurgia",
    difficulty: "media",
    statement: "Qual a melhor via de acesso cirúrgico de emergência para controle de via aérea em um paciente politraumatizado com fraturas maxilofaciais graves onde a intubação orotraqueal e nasotraqueal falhou?",
    options: {
      A: "Traqueostomia cirúrgica eletiva",
      B: "Cricotireoidostomia cirúrgica",
      C: "Máscara laríngea definitiva",
      D: "Cricotireoidostomia por agulha com jato de O2 de alta pressão"
    },
    correctAnswer: "B",
    explanation: "No cenário de 'não consigo intubar, não consigo ventilar' em trauma maxilofacial grave, a cricotireoidostomia cirúrgica é a via aérea cirúrgica de escolha rápida e preferível à traqueostomia.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "cir_21",
    area: "cirurgia",
    difficulty: "dificil",
    statement: "Qual tipo de hérnia estrangulada é caracterizada pelo pinçamento seletivo apenas da borda antimesentérica da alça intestinal, podendo sofrer isquemia e perfuração sem necessariamente provocar obstrução intestinal clínica mecânica?",
    options: {
      A: "Hérnia de Littre",
      B: "Hérnia de Richter",
      C: "Hérnia de Spiegel",
      D: "Hérnia de Amyand"
    },
    correctAnswer: "B",
    explanation: "A hérnia de Richter consiste no encarceramento apenas de parte da circunferência da borda antimesentérica da alça delgada. A hérnia de Littre contém um divertículo de Meckel.",
    source: "Hernioplastia Inguinal - Sociedade Brasileira de Hérnia"
  },
  {
    id: "cir_22",
    area: "cirurgia",
    difficulty: "dificil",
    statement: "Na pancreatite aguda, os critérios prognósticos de Ranson avaliados na admissão do paciente incluem quais das seguintes variáveis?",
    options: {
      A: "Idade > 55 anos, Leucócitos > 16.000, Glicemia > 200, DHL > 350, AST > 250",
      B: "Idade > 70 anos, Amilase > 3.000, Ureia > 50, Calcemia < 8",
      C: "Idade > 60 anos, Leucócitos > 12.000, PaO2 < 60, Hematócrito queda > 10%",
      D: "Idade > 55 anos, Proteína C reativa > 150, AST > 100, Glicemia > 150"
    },
    correctAnswer: "A",
    explanation: "Os critérios de Ranson de admissão (não biliar) são: Idade > 55 anos, Leucócitos > 16.000/mm³, Glicose > 200 mg/dL, DHL > 350 U/L e AST (TGO) > 250 U/L.",
    source: "Critérios de Ranson - Pancreatite"
  },
  {
    id: "cir_23",
    area: "cirurgia",
    difficulty: "dificil",
    statement: "A classificação de Bismuth-Corlette é utilizada para estadiamento anatômico de qual tipo de tumor do trato gastrointestinal?",
    options: {
      A: "Colangiocarcinoma hilar (Tumor de Klatskin)",
      B: "Adenocarcinoma de reto distal",
      C: "Tumores neuroendócrinos pancreáticos",
      D: "Câncer de vesícula biliar infiltrante"
    },
    correctAnswer: "A",
    explanation: "A classificação de Bismuth-Corlette avalia a extensão do colangiocarcinoma hilar (Tumor de Klatskin) na via biliar (tipo I a IV dependendo do acometimento dos ductos hepáticos direito e esquerdo).",
    source: "Oncologia Cirúrgica Abdominal"
  },
  {
    id: "cir_24",
    area: "cirurgia",
    difficulty: "dificil",
    statement: "Quais são os limites anatômicos que delimitam o Triângulo de Calot (tríade hepatocística), área crucial para dissecção segura na colecistectomia?",
    options: {
      A: "Ducto cístico, Ducto colédoco e borda inferior do lobo hepático direito",
      B: "Ducto cístico, Ducto hepático comum e face inferior do fígado",
      C: "Artéria cística, Ducto hepático direito e lobo caudado",
      D: "Ducto colédoco, Veia porta e Artéria hepática"
    },
    correctAnswer: "B",
    explanation: "O triângulo de Calot é delimitado pelo ducto cístico lateralmente, ducto hepático comum medialmente e borda inferior do fígado superiormente. A artéria cística passa em seu interior.",
    source: "Anatomia Cirúrgica do Aparelho Digestivo"
  },
  {
    id: "cir_25",
    area: "cirurgia",
    difficulty: "dificil",
    statement: "Uma fístula enterocutânea de alto débito é definida como aquela que drena uma quantidade diária de secreção gastrointestinal superior a:",
    options: {
      A: "200 mL/24h",
      B: "500 mL/24h",
      C: "1.000 mL/24h",
      D: "100 mL/24h"
    },
    correctAnswer: "B",
    explanation: "Fístulas de alto débito são aquelas que drenam mais de 500 mL de secreção em 24 horas. Aquelas com débito inferior a 200 mL são de baixo débito.",
    source: "Suporte Nutricional em Cirurgia - Diretriz BRASPEN"
  }
];
