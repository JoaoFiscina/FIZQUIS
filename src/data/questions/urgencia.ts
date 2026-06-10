import type { Question } from "../../types/questions";

export const urgenciaQuestions: Question[] = [
  {
    id: "urg_01",
    area: "urgencia",
    difficulty: "facil",
    statement: "Durante o atendimento de uma Parada Cardiorrespiratória (PCR) em ambiente hospitalar, quais são os quatro ritmos de parada possíveis e quais são chocáveis?",
    options: {
      A: "FV/TV sem pulso (chocáveis) e Assistolia/AESP (não chocáveis)",
      B: "Fibrilação atrial, Flutter, Assistolia e AESP (todos chocáveis)",
      C: "Taquicardia ventricular com pulso, FV, Assistolia e AESP (não chocáveis)",
      D: "FV/TV com pulso (chocáveis) e Assistolia (não chocável)"
    },
    correctAnswer: "A",
    explanation: "Os ritmos de PCR são Fibrilação Ventricular (FV) e Taquicardia Ventricular (TV) sem pulso (chocáveis) e Assistolia e Atividade Elétrica Sem Pulso (AESP) (não chocáveis).",
    source: "Diretrizes de RCP e ACE da American Heart Association (AHA)"
  },
  {
    id: "urg_02",
    area: "urgencia",
    difficulty: "facil",
    statement: "Qual a manobra física indicada para desobstrução de vias aéreas por corpo estranho (engasgo grave) em adultos conscientes?",
    options: {
      A: "Manobra de McRoberts",
      B: "Manobra de Heimlich (compressões abdominais subdiafragmáticas)",
      C: "Manobra de Valsalva",
      D: "Golpes nas costas apenas"
    },
    correctAnswer: "B",
    explanation: "A manobra de Heimlich consiste em compressões abdominais rápidas abaixo do diafragma para elevar a pressão intratorácica e expelir o corpo estranho.",
    source: "AHA guidelines for choking"
  },
  {
    id: "urg_03",
    area: "urgencia",
    difficulty: "facil",
    statement: "Paciente com quadro clínico de anafilaxia grave (choque anafilático) após picada de inseto apresenta estridor laríngeo e hipotensão arterial. Qual o tratamento de primeira linha imediato?",
    options: {
      A: "Metilprednisolona venosa imediata",
      B: "Prometazina (anti-histamínico) intramuscular",
      C: "Adrenalina (Epinefrina) intramuscular no vasto lateral da coxa",
      D: "Inalação com fenoterol de resgate"
    },
    correctAnswer: "C",
    explanation: "A adrenalina intramuscular na coxa (vasto lateral) é a droga de escolha e tratamento salvador de primeira linha na anafilaxia grave, devendo ser dada imediatamente.",
    source: "Diretrizes Mundiais de Anafilaxia - WAO"
  },
  {
    id: "urg_04",
    area: "urgencia",
    difficulty: "facil",
    statement: "Qual a janela terapêutica máxima clássica recomendada para administração de trombolítico endovenoso (como alteplase/rtPA) no Acidente Vascular Cerebral (AVC) isquêmico agudo?",
    options: {
      A: "Até 3 horas do início dos sintomas",
      B: "Até 4,5 horas do início dos sintomas (salvo contraindicações)",
      C: "Até 6 horas do início dos sintomas",
      D: "Até 12 horas do início dos sintomas"
    },
    correctAnswer: "B",
    explanation: "A janela terapêutica padrão para trombólise endovenosa no AVC isquêmico agudo é de até 4,5 horas do início dos sintomas ou última vez visto bem.",
    source: "Diretriz de AVC da AHA/ASA"
  },
  {
    id: "urg_05",
    area: "urgencia",
    difficulty: "facil",
    statement: "Paciente de 55 anos apresenta dor torácica retroesternal opressiva com irradiação para membro superior esquerdo associada a sudorese e náuseas. Qual exame deve ser realizado e interpretado em até 10 minutos da chegada ao serviço de emergência?",
    options: {
      A: "Eletrocardiograma de 12 derivações (ECG)",
      B: "Dosagem de Troponina ultrassensível",
      C: "Radiografia de tórax portátil",
      D: "Ecocardiograma transtorácico"
    },
    correctAnswer: "A",
    explanation: "Em pacientes com dor torácica suspeita de origem coronariana, o ECG de 12 derivações deve ser realizado e interpretado em até 10 minutos (tempo porta-ECG).",
    source: "Diretrizes de Síndrome Coronariana Aguda da SBC"
  },
  {
    id: "urg_06",
    area: "urgencia",
    difficulty: "facil",
    statement: "Qual a principal diferença clínica que diferencia uma Emergência Hipertensiva de uma Urgência Hipertensiva diante de valores pressóricos muito elevados (ex: PA >= 180/120 mmHg)?",
    options: {
      A: "O valor exato da pressão sistólica (maior que 220 mmHg)",
      B: "Presença de lesão de órgão-alvo aguda em evolução (ex: edema agudo de pulmão, dissecção de aorta, encefalopatia)",
      C: "Presença de cefaleia e palpitação discreta",
      D: "Necessidade obrigatória de internação em UTI em ambas"
    },
    correctAnswer: "B",
    explanation: "A emergência hipertensiva é caracterizada pela elevação acentuada da PA associada a lesão de órgão-alvo aguda e progressiva, exigindo redução rápida da PA com drogas parenterais (venosas).",
    source: "Diretrizes Brasileiras de Hipertensão - SBC"
  },
  {
    id: "urg_07",
    area: "urgencia",
    difficulty: "facil",
    statement: "Criança vítima de incêndio apresenta queimaduras faciais, cílios e vibrissas nasais chamuscadas, escarro carbonáceo e estridor inspiratório discreto. Qual a conduta imediata preventiva de escolha?",
    options: {
      A: "Intubação orotraqueal preventiva antes de edema glótico obstrutivo",
      B: "Nebulização contínua com corticoide",
      C: "Oxigenoterapia por máscara de Venturi",
      D: "Apenas observação em enfermaria com hidratação oral"
    },
    correctAnswer: "A",
    explanation: "Sinais de queimadura inalatória por fumaça associados a estridor indicam risco iminente de obstrução de via aérea por edema. A conduta é a intubação precoce/imediata preventiva.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "urg_08",
    area: "urgencia",
    difficulty: "facil",
    statement: "No trauma, qual o diâmetro do dreno torácico e a localização anatômica clássica indicada para drenagem pleural fechada em selo d'água no adulto?",
    options: {
      A: "Quinto espaço intercostal, entre a linha axilar anterior e média (borda superior da costela inferior)",
      B: "Segundo espaço intercostal, linha hemiclavicular",
      C: "Nono espaço intercostal, linha axilar posterior",
      D: "Quarto espaço intercostal, linha paraesternal"
    },
    correctAnswer: "A",
    explanation: "A drenagem torácica de escolha é feita no 5º espaço intercostal (altura do mamilo), à frente da linha axilar média, inserido rente à borda superior da costela inferior para evitar feixe vasculonervoso cístico.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "urg_09",
    area: "urgencia",
    difficulty: "facil",
    statement: "Qual a sequência prioritária do atendimento inicial ao trauma estabelecida pelo ATLS?",
    options: {
      A: "A (via aérea e controle da coluna cervical), B (respiração e ventilação), C (circulação com controle de hemorragia), D (estado neurológico) e E (exposição/controle térmico)",
      B: "C (circulação), A (via aérea), B (respiração), D (neurológico), E (exposição)",
      C: "A (avaliação clínica geral), B (broncoaspiração), C (cirurgia imediata)",
      D: "D (descompressão), C (choque), B (sangue), A (analgesia)"
    },
    correctAnswer: "A",
    explanation: "O atendimento ao trauma segue a prioridade vital linear ABCDE. (Nota: em PCR o protocolo é CAB, mas no trauma mantém-se o ABCDE).",
    source: "ATLS 10ª Edição"
  },
  {
    id: "urg_10",
    area: "urgencia",
    difficulty: "facil",
    statement: "Paciente hipertenso e cardiopata apresenta dispneia intensa em repouso, ortopneia, estertores crepitantes até terço superior de ambos os pulmões, expectoração rósea e saturação de 82% em ar ambiente. Pressão arterial de 200/110 mmHg. Conduta imediata na sala de emergência inclui:",
    options: {
      A: "Oxigenoterapia/VNI, Nitroglicerina EV e Furosemida EV",
      B: "Metoprolol EV e reposição de volume venoso",
      C: "Antibioticoterapia e broncodilatador inalatório apenas",
      D: "Adrenalina IM e hidrocortisona EV"
    },
    correctAnswer: "A",
    explanation: "Trata-se de Edema Agudo de Pulmonar (EAP) hipertensivo. Requer suplementação de O2 (ideal VNI para recrutar alvéolos), vasodilatador venoso (Nitroglicerina ou Nitroprussiato) para reduzir pós-carga e diurético de alça (Furosemida) para reduzir pré-carga.",
    source: "Diretrizes de Emergência Cardiovascular da SBC"
  },
  {
    id: "urg_11",
    area: "urgencia",
    difficulty: "media",
    statement: "Durante a reanimação de um ritmo não chocável (Assistolia ou AESP), qual a recomendação em relação ao momento de administração da primeira dose de Adrenalina (1 mg)?",
    options: {
      A: "Administrar o mais rápido possível após estabelecer o acesso venoso/intraósseo",
      B: "Aguardar o segundo ciclo (após 4 minutos de RCP)",
      C: "Administrar somente após a primeira desfibrilação",
      D: "Administrar após três ciclos de massagem se não houver retorno do pulso"
    },
    correctAnswer: "A",
    explanation: "Nas diretrizes atuais do ACLS, para ritmos não chocáveis (Assistolia/AESP), a adrenalina deve ser administrada precocemente (o mais rápido possível) para aumentar fluxo coronariano.",
    source: "Diretrizes de RCP ACLS - AHA"
  },
  {
    id: "urg_12",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente com taquiarritmia apresenta-se instável hemodinamicamente (dor torácica anginosa, dispneia por congestão pulmonar, hipotensão e alteração de consciência). Qual a conduta de escolha de emergência?",
    options: {
      A: "Cardioversão elétrica sincronizada",
      B: "Desfibrilação elétrica imediata com carga máxima",
      C: "Administração de Amiodarona 150 mg EV em 10 minutos",
      D: "Manobra vagal (massagem do seio carotídeo)"
    },
    correctAnswer: "A",
    explanation: "Taquiarritmias com sinais de instabilidade (os '4 D's') exigem cardioversão elétrica sincronizada imediata (exceto ritmos chocáveis de PCR).",
    source: "Protocolo de Taquiarritmias do ACLS"
  },
  {
    id: "urg_13",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente de 72 anos apresenta bradicardia sintomática (FC 32 bpm) com hipotensão e tontura grave. Administrou-se Atropina 1 mg endovenosa sem resposta. Qual a próxima conduta recomendada?",
    options: {
      A: "Passagem imediata de marcapasso transcutâneo ou infusão de Adrenalina/Dopamina",
      B: "Repetir atropina até o limite máximo de 10 mg",
      C: "Iniciar infusão de Amiodarona endovenosa",
      D: "Realizar cardioversão elétrica sincronizada"
    },
    correctAnswer: "A",
    explanation: "Bradicardia sintomática refratária à dose inicial de atropina (limite máximo atual é de 3 mg) deve ser tratada com marcapasso transcutâneo ou infusão contínua de drogas cronotrópicas (adrenalina ou dopamina).",
    source: "Protocolo de Bradicardia do ACLS"
  },
  {
    id: "urg_14",
    area: "urgencia",
    difficulty: "media",
    statement: "No choque séptico, qual o volume de cristaloide preconizado para ressuscitação hemodinâmica inicial nas primeiras 3 horas?",
    options: {
      A: "30 mL/kg de peso corporal",
      B: "500 mL em bólus fixo para todos os adultos",
      C: "1.000 mL de soro glicosado a 5%",
      D: "10 mL/kg associado a albumina humana"
    },
    correctAnswer: "A",
    explanation: "A recomendação internacional do Surviving Sepsis Campaign é a infusão de pelo menos 30 mL/kg de cristaloides (soro fisiológico ou ringer lactato) dentro das primeiras 3 horas em caso de hipoperfusão induzida por sepse.",
    source: "Surviving Sepsis Campaign Guidelines"
  },
  {
    id: "urg_15",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente vítima de ferimento por arma branca no tórax apresenta ferida aberta de 3 cm com saída de ar e sangue. Qual o curativo de emergência indicado na cena antes da drenagem definitiva?",
    options: {
      A: "Curativo oclusivo de 3 pontas (valvulado)",
      B: "Oclusão hermética total com gaze e esparadrapo",
      C: "Deixar a ferida totalmente exposta sem mexer",
      D: "Sutura imediata da pele em caráter de urgência"
    },
    correctAnswer: "A",
    explanation: "O pneumotórax aberto é tratado inicialmente na cena com curativo de três pontas (valvulado), que impede a entrada de ar na inspiração, mas permite a sua saída na expiração.",
    source: "ATLS 10ª Edição"
  },
  {
    id: "urg_16",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente com crise convulsiva tônico-clônica ativa há 7 minutos na sala de emergência. Já foi posicionado e aspirado. Qual a primeira linha de tratamento medicamentoso venoso de escolha?",
    options: {
      A: "Diazepam EV ou Midazolam IM/EV",
      B: "Fenitoína dose de ataque diretamente em bólus rápido",
      C: "Fenobarbital venoso contínuo",
      D: "Sulfato de Magnésio EV"
    },
    correctAnswer: "A",
    explanation: "Para crises convulsivas ativas (status epilepticus inicial), os benzodiazepínicos de ação rápida (Diazepam EV ou Midazolam) são a primeira linha farmacológica.",
    source: "Diretrizes de Status Epilepticus - ABN"
  },
  {
    id: "urg_17",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente de 60 anos com infarto agudo do miocárdio com supra de ST. O hospital não dispõe de serviço de hemodinâmica (angioplastia). O tempo estimado de transporte para o hospital de referência é de 2 horas e meia. Qual a conduta de escolha recomendada?",
    options: {
      A: "Realizar trombólise química imediata no hospital local (salvo contraindicações)",
      B: "Encaminhar para angioplastia primária mesmo com o atraso de 150 minutos",
      C: "Apenas AAS e Clopidogrel e aguardar internação clínica",
      D: "Prescrever heparinização plena isolada"
    },
    correctAnswer: "A",
    explanation: "Em IAM com supra de ST, se a angioplastia primária não puder ser realizada em até 120 minutos do diagnóstico, a trombólise química (com tenecteplase ou alteplase) deve ser realizada imediatamente (dentro de 30 minutos).",
    source: "Diretrizes de IAM da SBC"
  },
  {
    id: "urg_18",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente jovem com dor torácica aguda súbita, dispneia e murmúrio vesicular abolido no hemitórax direito. Está normotenso e estável hemodinamicamente. Radiografia confirma pneumotórax espontâneo de 35% de volume (grande). Qual a conduta?",
    options: {
      A: "Drenagem pleural fechada em selo d'água à direita",
      B: "Toracocentese de alívio imediata com agulha grossa",
      C: "Apenas repouso e oxigenoterapia em alto fluxo em observação por 48h",
      D: "Toracotomia exploradora de urgência"
    },
    correctAnswer: "A",
    explanation: "Em pneumotórax simples volumoso (> 20-30%) em paciente estável, a conduta recomendada é a drenagem pleural fechada em selo d'água.",
    source: "Diretrizes de Tórax da SBPT"
  },
  {
    id: "urg_19",
    area: "urgencia",
    difficulty: "media",
    statement: "Paciente apresenta-se com suspeita clínica de sepse e hipotensão arterial. Coletou-se lactato que retornou elevado (3,8 mmol/L). Qual a principal utilidade clínica da dosagem seriada do lactato sérico na sepse?",
    options: {
      A: "Monitorar a eficácia da ressuscitação hemodinâmica (clearence de lactato)",
      B: "Identificar o foco infeccioso primário",
      C: "Substituir a necessidade de hemoculturas",
      D: "Indicar a necessidade imediata de corticoterapia"
    },
    correctAnswer: "A",
    explanation: "O clearance de lactato (redução dos níveis nas dosagens seriadas) é um forte indicador de melhora da perfusão tecidual e resposta ao tratamento reconstrutivo.",
    source: "Surviving Sepsis Campaign guidelines"
  },
  {
    id: "urg_20",
    area: "urgencia",
    difficulty: "media",
    statement: "Em relação ao manejo da Cetoacidose Diabética (CAD), qual critério laboratorial indica a resolução do quadro, permitindo a transição segura da insulina venosa contínua para insulina subcutânea?",
    options: {
      A: "Glicemia menor que 200 mg/dL associada a pH > 7,3, bicarbonato sérico >= 15 mEq/L e anion gap normal (< 12)",
      B: "Glicemia menor que 100 mg/dL e ausência completa de glicosúria",
      C: "Bicarbonato maior que 22 mEq/L apenas",
      D: "pH normal (> 7,35) independentemente da presença de cetonúria"
    },
    correctAnswer: "A",
    explanation: "A resolução da CAD é definida pelo controle da acidose: pH > 7,3, Bicarbonato >= 15 (ou 18 conforme referências) e fechamento do anion gap (< 12), associado a glicemia de controle < 200-250.",
    source: "Diretriz de Diabetes Mellitus - SBD / ADA"
  },
  {
    id: "urg_21",
    area: "urgencia",
    difficulty: "dificil",
    statement: "Paciente com potássio sérico de 7,8 mEq/L apresenta eletrocardiograma com ondas T apiculadas e alargamento do complexo QRS (iminência de PCR em assistolia). Qual a conduta imediata prioritária para estabilização de membrana miocárdica?",
    options: {
      A: "Administração de Gluconato de Cálcio a 10% endovenoso imediato",
      B: "Infusão de solução polarizada (insulina + glicose)",
      C: "Nebulização com beta-2 agonista em altas doses",
      D: "Furosemida venosa rápida"
    },
    correctAnswer: "A",
    explanation: "O gluconato de cálcio a 10% (ou cloreto de cálcio) endovenoso é o estabilizador de membrana miocárdica imediato na hipercalemia grave com alterações de ECG. Ele não reduz os níveis de potássio, mas protege o coração de arritmias letais.",
    source: "Medicina de Emergência USP"
  },
  {
    id: "urg_22",
    area: "urgencia",
    difficulty: "dificil",
    statement: "Um paciente politraumatizado grave apresenta-se instável hemodinamicamente devido a hemorragia maciça. Iniciou-se protocolo de transfusão maciça. Qual a proporção ideal recomendada para infusão de concentrado de hemácias, plasma fresco congelado e plaquetas?",
    options: {
      A: "Proporção de 1:1:1",
      B: "Proporção de 4:2:1",
      C: "Apenas concentrado de hemácias até a estabilização",
      D: "Proporção de 3:1 (hemácias para soro fisiológico)"
    },
    correctAnswer: "A",
    explanation: "O protocolo de transfusão maciça atual preconiza a proporção equilibrada de 1 unidade de concentrado de hemácias para 1 unidade de plasma fresco e 1 pool de plaquetas (1:1:1) para combater a coagulopatia indutiva pelo trauma.",
    source: "Protocolo de Transfusão Maciça no Trauma - ATLS / PROPPR trial"
  },
  {
    id: "urg_23",
    area: "urgencia",
    difficulty: "dificil",
    statement: "Paciente admitido na emergência com quadro de bradicardia, miose pupilar puntiforme, sialorreia intensa, broncorreia, diarreia e fasciculações musculares após exposição a inseticida agrícola organofosforado. Qual a síndrome toxicológica e o antídoto de primeira linha indicado?",
    options: {
      A: "Síndrome colinérgica / Atropina em doses repetidas até secar secreções respiratórias",
      B: "Síndrome anticolinérgica / Fisostigmina",
      C: "Síndrome simpaticomimética / Benzodiazepínicos",
      D: "Síndrome opioide / Naloxona"
    },
    correctAnswer: "A",
    explanation: "A intoxicação por organofosforados causa síndrome colinérgica (pela inibição da acetilcolinesterase). O tratamento de emergência baseia-se na atropinização imediata do paciente para antagonizar os efeitos muscarínicos (broncorreia e bradicardia).",
    source: "Toxicologia Clínica de Emergência"
  },
  {
    id: "urg_24",
    area: "urgencia",
    difficulty: "dificil",
    statement: "Na avaliação de trauma cranioencefálico (TCE) pela Escala de Coma de Glasgow atualizada, como é avaliada a reatividade pupilar?",
    options: {
      A: "Subtrai-se pontos do escore total obtido: -2 se ambas pupilas sem fotorreação, -1 se apenas uma pupila não reagir, e 0 se ambas reagirem",
      B: "Soma-se pontos ao total: +2 se pupilas isocóricas e reagentes",
      C: "A reatividade pupilar substituiu a abertura ocular",
      D: "Não faz parte do cálculo do escore de Glasgow (apenas avaliação acessória)"
    },
    correctAnswer: "A",
    explanation: "Na escala Glasgow-P (Pupilar), calcula-se o Glasgow tradicional (3 a 15) e subtrai-se a pontuação pupilar (0 a 2), gerando um escore final que varia de 1 a 15.",
    source: "Escala de Coma de Glasgow com Resposta Pupilar (GCS-P 2018)"
  },
  {
    id: "urg_25",
    area: "urgencia",
    difficulty: "dificil",
    statement: "Paciente com insuficiência cardíaca grave apresenta quadro de choque refratário a volume, com pressão arterial de 80/45 mmHg e sinais de hipoperfusão tecidual (choque cardiogênico). Qual o inotrópico de escolha para suporte imediato e qual seu principal mecanismo farmacológico de ação?",
    options: {
      A: "Dobutamina / Agonista beta-1 adrenérgico (aumenta inotrópismo com vasodilatação periférica reflexa leve)",
      B: "Noradrenalina / Agonista alfa-1 isolado",
      C: "Amiodarona / Bloqueador de canais de potássio",
      D: "Digoxina / Inibidor da bomba Na+/K+ ATPase venosa rápida"
    },
    correctAnswer: "A",
    explanation: "A dobutamina é um inotrópico positivo de escolha no choque cardiogênico, atuando principalmente em receptores beta-1 aumentando a contratilidade miocárdica e o débito cardíaco, podendo reduzir a pós-carga por efeito beta-2.",
    source: "Diretrizes de Choque Cardiogênico da SBC"
  }
];
