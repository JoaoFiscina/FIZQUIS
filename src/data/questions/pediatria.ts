import type { Question } from "../../types/questions";

export const pediatriaQuestions: Question[] = [
  {
    id: "ped_01",
    area: "pediatria",
    difficulty: "facil",
    statement: "Até qual idade a Organização Mundial da Saúde (OMS) e o Ministério da Saúde recomendam o aleitamento materno exclusivo?",
    options: {
      A: "Até os 4 meses de idade",
      B: "Até os 6 meses de idade",
      C: "Até 1 ano de idade",
      D: "Até os 2 anos de idade"
    },
    correctAnswer: "B",
    explanation: "A recomendação nacional e internacional é o aleitamento materno exclusivo até os 6 meses, com introdução de alimentação complementar saudável a partir deste período, mantendo o leite materno até os 2 anos ou mais.",
    source: "Sociedade Brasileira de Pediatria (SBP)"
  },
  {
    id: "ped_02",
    area: "pediatria",
    difficulty: "facil",
    statement: "Qual das seguintes vacinas é aplicada rotineiramente ao nascer e deixa uma cicatriz característica no braço direito?",
    options: {
      A: "Vacina contra Hepatite B",
      B: "Vacina BCG",
      C: "Vacina Pentavalente",
      D: "Vacina Rotavírus"
    },
    correctAnswer: "B",
    explanation: "A vacina BCG (Bacilo Calmette-Guérin), indicada para prevenção das formas graves de tuberculose (miliar e meníngea), é administrada em dose única ao nascer por via intradérmica no braço direito, gerando a clássica cicatriz.",
    source: "Manual de Imunizações do Ministério da Saúde"
  },
  {
    id: "ped_03",
    area: "pediatria",
    difficulty: "facil",
    statement: "Quais são os 5 parâmetros avaliados no Boletim de Apgar para avaliação do recém-nascido na sala de parto?",
    options: {
      A: "Frequência cardíaca, esforço respiratório, tônus muscular, irritabilidade reflexa e cor da pele",
      B: "Peso, estatura, perímetro cefálico, temperatura e saturação de O2",
      C: "Frequência respiratória, choro, sucção, reflexo de Moro e cor",
      D: "Tônus flexor, batimento de asas de nariz, temperatura axilar, choro e frequência cardíaca"
    },
    correctAnswer: "A",
    explanation: "O escore de APGAR avalia 5 parâmetros objetivos: Frequência cardíaca, Esforço respiratório, Tônus muscular, Irritabilidade reflexa (resposta à sonda/tapa) e Cor da pele.",
    source: "Diretrizes de Reanimação Neonatal da SBP"
  },
  {
    id: "ped_04",
    area: "pediatria",
    difficulty: "facil",
    statement: "Menino de 4 anos apresenta febre alta de início súbito seguida por crise convulsiva tônico-clônica generalizada com duração de 3 minutos. Retorna ao estado de alerta habitual rapidamente. Qual a conduta inicial mais adequada diante deste provável quadro de crise convulsiva febril simples?",
    options: {
      A: "Iniciar imediatamente fenobarbital de uso contínuo por 1 ano",
      B: "Orientar medidas de controle térmico (antitérmicos) e acalmar os pais, explicando o caráter benigno do quadro",
      C: "Solicitar tomografia de crânio e líquor imediatamente",
      D: "Prescrever anticonvulsivante profilático como ácido valproico profilático"
    },
    correctAnswer: "B",
    explanation: "A convulsão febril simples é benigna, autolimitada e comum dos 6 meses aos 5 anos. A conduta é o tratamento sintomático da febre e orientação familiar, dispensando anticonvulsivantes profiláticos crônicos.",
    source: "Tratado de Pediatria Nelson"
  },
  {
    id: "ped_05",
    area: "pediatria",
    difficulty: "facil",
    statement: "Qual o achado patognomônico na cavidade oral de pacientes com sarampo, caracterizado por pequenos pontos brancos com halo eritematoso na mucosa jugal na altura dos molares?",
    options: {
      A: "Manchas de Koplik",
      B: "Língua em morango",
      C: "Sinal de Filatov",
      D: "Manchas de Forchheimer"
    },
    correctAnswer: "A",
    explanation: "As manchas de Koplik são enantemas clássicos e patognomônicos do sarampo, surgindo na fase prodrômica (antes do exantema maculopapular morbiliforme).",
    source: "Guia de Vigilância Epidemiológica - MS"
  },
  {
    id: "ped_06",
    area: "pediatria",
    difficulty: "facil",
    statement: "De acordo com as diretrizes de desidratação por diarreia aguda na infância, qual o plano de tratamento indicado para uma criança que não apresenta sinais de desidratação (hidratada com perdas continuadas)?",
    options: {
      A: "Plano A (tratamento domiciliar com aumento de líquidos e soro de reidratação oral após evacuações)",
      B: "Plano B (terapia de reidratação oral supervisionada no serviço de saúde)",
      C: "Plano C (reidratação parenteral venosa rápida)",
      D: "Prescrição imediata de loperamida e ciprofloxacino"
    },
    correctAnswer: "A",
    explanation: "O Plano A destina-se a prevenir a desidratação em domicílio, oferecendo soro de reidratação oral (SRO) pós-evacuação, mantendo alimentação habitual e zinco por 10-14 dias.",
    source: "Manual de Doenças Diarreicas - OMS/MS"
  },
  {
    id: "ped_07",
    area: "pediatria",
    difficulty: "facil",
    statement: "Qual o principal agente etiológico responsável pela bronquiolite viral aguda em lactentes com menos de 2 anos?",
    options: {
      A: "Adenovírus",
      B: "Vírus Sincicial Respiratório (VSR)",
      C: "Influenza A",
      D: "Rinovírus"
    },
    correctAnswer: "B",
    explanation: "O Vírus Sincicial Respiratório (VSR) é responsável por cerca de 60 a 80% de todos os casos de bronquiolite viral aguda na infância.",
    source: "Diretrizes de Bronquiolite da SBP"
  },
  {
    id: "ped_08",
    area: "pediatria",
    difficulty: "facil",
    statement: "O reflexo primitivo neonatal caracterizado pela extensão e abdução dos membros superiores seguida por flexão e adução, frequentemente desencadeado por queda súbita da cabeça em relação ao tronco ou barulho forte, é o reflexo de:",
    options: {
      A: "Moro",
      B: "Galant",
      C: "Preensão palmar",
      D: "Marcha reflexa"
    },
    correctAnswer: "A",
    explanation: "O Reflexo de Moro é um dos principais reflexos primitivos do recém-nascido, cujo desaparecimento simétrico deve ocorrer até os 4-6 meses.",
    source: "Desenvolvimento Neuropsicomotor - Puericultura SBP"
  },
  {
    id: "ped_09",
    area: "pediatria",
    difficulty: "facil",
    statement: "Lactente de 10 meses apresenta tosse metálica ('tosse de cachorro'), estridor inspiratório à agitação e rouquidão moderada há 1 dia. Diagnóstico provável de laringotraqueíte viral aguda (Crupe). Qual o principal agente envolvido?",
    options: {
      A: "Vírus Parainfluenza",
      B: "Bordetella pertussis",
      C: "Mycoplasma pneumoniae",
      D: "Coronavírus"
    },
    correctAnswer: "A",
    explanation: "Os vírus Parainfluenza (especialmente tipos 1, 2 e 3) são os principais causadores da laringotraqueobronquite viral aguda (Crupe).",
    source: "Tratado Nelson de Pediatria"
  },
  {
    id: "ped_10",
    area: "pediatria",
    difficulty: "facil",
    statement: "Qual a suplementação profilática de ferro elementar recomendada pela SBP para lactentes nascidos a termo, de peso adequado, em aleitamento materno exclusivo a partir do 3º mês de vida (conforme consensos mais recentes)?",
    options: {
      A: "1 mg/kg/dia",
      B: "2 mg/kg/dia",
      C: "Não precisa de suplementação se mamar exclusivo",
      D: "15 mg/dia dose fixa"
    },
    correctAnswer: "A",
    explanation: "Lactentes a termo com peso adequado ao nascer devem receber 1 mg/kg/dia de ferro elementar profilático a partir dos 3 meses de vida até os 24 meses (independentemente do aleitamento).",
    source: "Consenso de Anemia Ferropriva - SBP 2021"
  },
  {
    id: "ped_11",
    area: "pediatria",
    difficulty: "media",
    statement: "Lactente de 3 semanas apresenta vômitos não-biliosos em jato, progressivos pós-mamadas. À palpação de abdome, observa-se onda peristáltica visível e uma pequena oliva palpável no quadrante superior direito. Qual o diagnóstico provável?",
    options: {
      A: "Estenose hipertrófica de piloro",
      B: "Atresia de esôfago",
      C: "Refluxo gastroesofágico fisiológico do lactente",
      D: "Volvo de intestino médio por má-rotação"
    },
    correctAnswer: "A",
    explanation: "A estenose hipertrófica de piloro se manifesta com vômitos alimentares não-biliosos em jato nas primeiras semanas e oliva pilórica palpável devido à hipertrofia do esfíncter.",
    source: "Cirurgia Pediátrica Sabiston"
  },
  {
    id: "ped_12",
    area: "pediatria",
    difficulty: "media",
    statement: "Criança de 18 meses com episódios súbitos de dor abdominal em cólica intensa, choro inconsolável e vômitos biliares. Apresentou evacuação contendo fezes com aspecto de 'geleia de morango' (sangue e muco). Qual a principal suspeita clínica?",
    options: {
      A: "Divertículo de Meckel perfurado",
      B: "Intussuscepção intestinal (invaginação)",
      C: "Apendicite aguda obstrutiva",
      D: "Gastroenterite aguda bacteriana por Shigella"
    },
    correctAnswer: "B",
    explanation: "A tríade de cólica abdominal intermitente grave, massa palpável em salsicha e fezes em 'geleia de morango' é típica da intussuscepção intestinal.",
    source: "Urgências Pediátricas Nelson"
  },
  {
    id: "ped_13",
    area: "pediatria",
    difficulty: "media",
    statement: "Em relação ao diagnóstico de Doença Celíaca em crianças, qual o teste sorológico de triagem inicial mais sensível e recomendado em menores de 2 anos (ou triagem geral)?",
    options: {
      A: "Anticorpo anti-endomísio IgA",
      B: "Anticorpo antitransglutaminase tecidual recombinante humana IgA (anti-tTG)",
      C: "Anticorpo anti-gliadina deaminada IgG (anti-DGP)",
      D: "Anticorpo anti-gliadina IgA nativa"
    },
    correctAnswer: "B",
    explanation: "O anticorpo antitransglutaminase tecidual classe IgA (anti-tTG IgA) é o exame de triagem diagnóstica mais recomendado pela alta sensibilidade e especificidade.",
    source: "Diretriz de Doença Celíaca da SBP / ESPGHAN"
  },
  {
    id: "ped_14",
    area: "pediatria",
    difficulty: "media",
    statement: "Uma criança de 4 anos apresenta febre diária há 6 dias associada a conjuntivite bilateral não-purulenta, eritema labial com fissuras, língua em morango, exantema polimorfo e linfadenopatia cervical não supurativa de 2 cm. Qual o provável diagnóstico e maior risco a longo prazo?",
    options: {
      A: "Escarlatina / Febre reumática",
      B: "Doença de Kawasaki / Aneurismas de artérias coronárias",
      C: "Mononucleose infecciosa / Ruptura esplênica",
      D: "Sarampo complicado / Encefalite esclerosante subaguda"
    },
    correctAnswer: "B",
    explanation: "A Doença de Kawasaki (vasculite multissistêmica febril aguda) cursa com febre prolongada e alterações mucocutâneas, cujo principal risco é o desenvolvimento de aneurismas coronarianos.",
    source: "Diretrizes de Cardiologia Pediátrica da SBP"
  },
  {
    id: "ped_15",
    area: "pediatria",
    difficulty: "media",
    statement: "Criança de 2 anos, desidratada grave secundária a diarreia aguda, necessita de hidratação parenteral venosa rápida de emergência (Plano C). Qual o volume e velocidade preconizados na primeira etapa da expansão rápida no Brasil segundo o Ministério da Saúde?",
    options: {
      A: "20 mL/kg de Soro Fisiológico a correr em 20 a 30 minutos (repetir se necessário)",
      B: "50 mL/kg de Soro Glicosado a 5% em 2 horas",
      C: "100 mL/kg de Ringer Lactato em 6 horas",
      D: "10 mL/kg de Soro Fisiológico em 1 hora"
    },
    correctAnswer: "A",
    explanation: "A conduta de expansão rápida do Plano C em crianças no Brasil é de 20 mL/kg de cristaloides (Soro Fisiológico ou Ringer Lactato) infundidos em 20 a 30 minutos em ambiente hospitalar.",
    source: "Manual de AIDPI - Ministério da Saúde"
  },
  {
    id: "ped_16",
    area: "pediatria",
    difficulty: "media",
    statement: "Qual a idade considerada como limite inferior de normalidade para o início dos caracteres sexuais secundários (puberdade precoce) em meninas e meninos, respectivamente?",
    options: {
      A: "8 anos em meninas e 9 anos em meninos",
      B: "9 anos em meninas e 10 anos em meninos",
      C: "7 anos em meninas e 8 anos em meninos",
      D: "10 anos em meninas e 11 anos em meninos"
    },
    correctAnswer: "A",
    explanation: "Define-se puberdade precoce como o aparecimento de caracteres sexuais secundários antes dos 8 anos em meninas (telarca) e antes dos 9 anos em meninos (aumento testicular).",
    source: "Consenso de Puberdade Precoce da SBEM"
  },
  {
    id: "ped_17",
    area: "pediatria",
    difficulty: "media",
    statement: "Lactente de 18 meses com febre alta há 3 dias. A febre desaparece subitamente e surge um exantema maculopapular róseo difuso, não pruriginoso, com início no tronco, poupando extremidades. Qual o diagnóstico?",
    options: {
      A: "Exantema Súbito (Roséola Infantil)",
      B: "Eritema Infeccioso (Quinta Doença)",
      C: "Escarlatina",
      D: "Rubéola"
    },
    correctAnswer: "A",
    explanation: "A roséola infantil (exantema súbito), causada pelos herpesvírus humanos 6 e 7, cursa com exantema máculo-papular que surge clássica e subitamente logo após o desaparecimento da febre alta.",
    source: "Exantemáticas na Infância - SBP"
  },
  {
    id: "ped_18",
    area: "pediatria",
    difficulty: "media",
    statement: "Qual das seguintes parasitoses intestinais está intimamente associada à síndrome de Löeffler (tosse, infiltrados pulmonares migratórios e eosinofilia na fase de ciclo pulmonar)?",
    options: {
      A: "Ascaris lumbricoides",
      B: "Enterobius vermicularis",
      C: "Giardia lamblia",
      D: "Trichuris trichiura"
    },
    correctAnswer: "A",
    explanation: "A Síndrome de Löeffler ocorre no ciclo pulmonar de parasitas com ciclo de Loss (Ascaris lumbricoides, Necator americanus, Ancylostoma duodenale e Strongyloides stercoralis).",
    source: "Parasitologia Médica de Rey"
  },
  {
    id: "ped_19",
    area: "pediatria",
    difficulty: "media",
    statement: "Qual a infecção congênita clássica caracterizada pela tríade clínica de catarata, surdez neurosensorial e cardiopatia congênita (Persistência do Canal Arterial ou Estenose de Artéria Pulmonar)?",
    options: {
      A: "Rubéola congênita",
      B: "Toxoplasmose congênita",
      C: "Sífilis congênita precoce",
      D: "Citomegalovírus congênito"
    },
    correctAnswer: "A",
    explanation: "A síndrome da rubéola congênita cursa com a clássica tríade de Gregg: catarata/microftalmia, surdez coclear e cardiopatia congênita (comumente PCA).",
    source: "Infectologia Pediátrica Nelson"
  },
  {
    id: "ped_20",
    area: "pediatria",
    difficulty: "media",
    statement: "Qual a conduta vacinal recomendada em uma criança de 4 anos que sofreu acidente com cão de rua desconhecido, com mordedura profunda no membro inferior esquerdo?",
    options: {
      A: "Soroterapia antirrábica e 4 doses de vacina antirrábica",
      B: "Apenas observação do animal por 10 dias, sem vacina",
      C: "Esquema profilático pós-exposição com 4 doses de vacina antirrábica; soro se o cão sumir, adoecer ou morrer",
      D: "Administração isolada de imunoglobulina humana antitetânica"
    },
    correctAnswer: "C",
    explanation: "Acidentes graves (mordedura profunda em extremidades) por cão observável requerem início imediato de vacina (4 doses). O soro antirrábico é indicado se o animal sumir, morrer ou desenvolver raiva durante os 10 dias de observação.",
    source: "Guia de Profilaxia da Raiva Humana - MS"
  },
  {
    id: "ped_21",
    area: "pediatria",
    difficulty: "dificil",
    statement: "Qual o tumor sólido abdominal mais comum em lactentes, caracterizado por originar-se das células da crista neural da medula suprarrenal e apresentar-se como massa abdominal firme, irregular, que frequentemente ultrapassa a linha média?",
    options: {
      A: "Tumor de Wilms (Nefroblastoma)",
      B: "Neuroblastoma",
      C: "Hepatoblastoma",
      D: "Teratoma sacrococcígeo"
    },
    correctAnswer: "B",
    explanation: "O neuroblastoma é o tumor extracraniano sólido mais comum na infância. Tipicamente se apresenta como massa abdominal dura que cruza a linha média, diferenciando-se do Tumor de Wilms (rim), que raramente cruza a linha média.",
    source: "Oncologia Pediátrica Nelson"
  },
  {
    id: "ped_22",
    area: "pediatria",
    difficulty: "dificil",
    statement: "Qual a tríade clássica indicativa de diagnóstico de Toxoplasmose Congênita no lactente (Tríade de Sabin)?",
    options: {
      A: "Coriorretinite, calcificações intracranianas difusas e hidrocefalia",
      B: "Catarata, surdez e microcefalia",
      C: "Pênfigo palmoplantar, osteocondrite e hepatoesplenomegalia",
      D: "Cardiopatia congênita, icterícia precoce e catarata"
    },
    correctAnswer: "A",
    explanation: "A tríade de Sabin é patognomônica da toxoplasmose congênita: coriorretinite (lesão ocular mais comum), calcificações intracranianas intracerebrais difusas e hidrocefalia obstrutiva.",
    source: "Infectologia Neonatal da SBP"
  },
  {
    id: "ped_23",
    area: "pediatria",
    difficulty: "dificil",
    statement: "Menina de 5 anos apresenta artrite crônica persistente em joelho esquerdo e tornozelo direito por mais de 6 semanas, associada a FAN (fator antinuclear) positivo. Qual o maior risco extra-articular a longo prazo nesta forma de Artrite Idiopática Juvenil (AIJ) oligoarticular?",
    options: {
      A: "Uveíte anterior crônica (iridociclite assintomática)",
      B: "Amiloidose renal secundária",
      C: "Valvulite mitral reumática",
      D: "Pericardite constritiva crônica"
    },
    correctAnswer: "A",
    explanation: "Pacientes com AIJ oligoarticular e FAN positivo têm alto risco de uveíte anterior crônica assintomática, necessitando de exames de lâmpada de fenda periódicos para evitar cegueira.",
    source: "Reumatologia Pediátrica Nelson"
  },
  {
    id: "ped_24",
    area: "pediatria",
    difficulty: "dificil",
    statement: "Em pediatria, a reposição hidroeletrolítica venosa de manutenção baseia-se na regra de Holiday-Segar. Qual a quantidade calórica/líquida necessária para uma criança de 24 kg de peso corporal nas 24h?",
    options: {
      A: "1.580 mL/dia",
      B: "2.400 mL/dia",
      C: "1.200 mL/dia",
      D: "1.800 mL/dia"
    },
    correctAnswer: "A",
    explanation: "Pela regra de Holiday-Segar: até 10kg = 100 mL/kg; de 11 a 20kg = + 50 mL/kg; acima de 20kg = + 20 mL/kg. Para 24kg: 1000 + 500 + 4*(20) = 1.580 mL/24h.",
    source: "Holiday & Segar original formula / Hidratação SBP"
  },
  {
    id: "ped_25",
    area: "pediatria",
    difficulty: "dificil",
    statement: "Qual teste laboratorial confirmatório, baseado na dosagem de cloro, é considerado o padrão-ouro para o diagnóstico de Fibrose Cística?",
    options: {
      A: "Teste de Cloreto no Suor por iontoforese por pilocarpina",
      B: "Dosagem de tripsina imunorreativa (IRT) no teste do pezinho",
      C: "Genotipagem completa do gene CFTR",
      D: "Pesquisa de gordura fecal quantitativa"
    },
    correctAnswer: "A",
    explanation: "O teste de cloreto no suor (valores de cloro >= 60 mEq/L em duas amostras) confirma o diagnóstico de Fibrose Cística, sendo o padrão-ouro estabelecido.",
    source: "Diretrizes Brasileiras de Fibrose Cística"
  }
];
