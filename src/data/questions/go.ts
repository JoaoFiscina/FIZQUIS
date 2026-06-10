import type { Question } from "../../types/questions";

export const goQuestions: Question[] = [
  {
    id: "go_01",
    area: "go",
    difficulty: "facil",
    statement: "Paciente com DUM (Data da Última Menstruação) em 10 de Janeiro de 2026. Utilizando a Regra de Naegele, qual será a DPP (Data Provável do Parto)?",
    options: {
      A: "17 de Outubro de 2026",
      B: "17 de Setembro de 2026",
      C: "20 de Outubro de 2026",
      D: "10 de Outubro de 2026"
    },
    correctAnswer: "A",
    explanation: "Pela Regra de Naegele, soma-se 7 dias ao primeiro dia da DUM e subtrai-se 3 meses ao mês da DUM (ou soma-se 9 meses). 10 + 7 = 17; Janeiro (mês 1) - 3 meses = Outubro (mês 10). Logo, 17 de Outubro de 2026.",
    source: "Manual de Pré-Natal do Ministério da Saúde"
  },
  {
    id: "go_02",
    area: "go",
    difficulty: "facil",
    statement: "Qual das seguintes infecções vulvovaginais cursa com corrimento esbranquiçado grumoso ('nata de leite'), prurido intenso, pH vaginal < 4,5 (ácido) e presença de pseudo-hifas ao exame microscópico direto?",
    options: {
      A: "Vaginose bacteriana",
      B: "Tricomoníase",
      C: "Candidíase vulvovaginal",
      D: "Clamídia"
    },
    correctAnswer: "C",
    explanation: "A candidíase é caracterizada por corrimento grumoso, prurido intenso, pH ácido (<4,5) e presença de esporos/hifas no exame microscópico direto.",
    source: "Diretrizes de IST do Ministério da Saúde"
  },
  {
    id: "go_03",
    area: "go",
    difficulty: "facil",
    statement: "Paciente com 32 semanas de gestação queixa-se de sangramento vaginal vermelho-escuro de início súbito, associado a dor abdominal intensa de forte intensidade e útero de consistência lenhosa à palpação (hipertonia). Qual o provável diagnóstico?",
    options: {
      A: "Placenta prévia",
      B: "Descolamento prematuro de placenta (DPP)",
      C: "Ruptura de vasa prévia",
      D: "Rotura uterina iminente"
    },
    correctAnswer: "B",
    explanation: "A presença de dor abdominal súbita, sangramento escuro e útero lenhoso (hipertonia uterina) é patognomônica do descolamento prematuro de placenta.",
    source: "Obstetrícia de Rezende"
  },
  {
    id: "go_04",
    area: "go",
    difficulty: "facil",
    statement: "Qual a conduta recomendada em relação ao aleitamento materno em uma paciente com diagnóstico de mastite puerperal unilateral não complicada?",
    options: {
      A: "Suspender a amamentação em ambas as mamas até a cura",
      B: "Manter a amamentação na mama saudável e suspender/ordenhar na mama afetada",
      C: "Manter a amamentação em ambas as mamas, iniciando pela mama afetada para esvaziamento completo",
      D: "Suspender definitivamente o aleitamento materno e prescrever cabergolina"
    },
    correctAnswer: "C",
    explanation: "A mastite não é contraindicação à amamentação. O esvaziamento adequado da mama é pilar do tratamento, devendo-se incentivar a mamada em ambas as mamas, iniciando pela afetada se tolerável.",
    source: "Febrasgo - Manual de Aleitamento Materno"
  },
  {
    id: "go_05",
    area: "go",
    difficulty: "facil",
    statement: "A pré-eclâmpsia é caracterizada pelo surgimento de hipertensão arterial sistêmica e proteinúria a partir de qual idade gestacional?",
    options: {
      A: "A partir da 12ª semana de gestação",
      B: "A partir da 20ª semana de gestação",
      C: "Apenas no terceiro trimestre (acima de 28 semanas)",
      D: "A partir da 16ª semana de gestação"
    },
    correctAnswer: "B",
    explanation: "A pré-eclâmpsia define-se como hipertensão de início recente associada a proteinúria (ou disfunção de órgãos-alvo) que se desenvolve após a 20ª semana de gestação.",
    source: "Febrasgo - Diretrizes de Hipertensão na Gestação"
  },
  {
    id: "go_06",
    area: "go",
    difficulty: "facil",
    statement: "Qual a recomendação etária de rastreamento do câncer do colo do útero por citologia oncótica (Papanicolau) no Brasil, segundo as diretrizes do INCA?",
    options: {
      A: "Mulheres de 15 a 49 anos, anualmente",
      B: "Mulheres de 25 a 64 anos que já iniciaram atividade sexual",
      C: "Mulheres de 20 a 70 anos, a cada 5 anos",
      D: "Toda mulher ativa sexualmente, anualmente, sem limite de idade"
    },
    correctAnswer: "B",
    explanation: "O rastreamento do câncer de colo uterino no Brasil é indicado para mulheres dos 25 aos 64 anos que já iniciaram atividade sexual, a cada 3 anos (após dois exames normais anuais consecutivos).",
    source: "Diretrizes de Rastreamento de Colo Uterino - INCA"
  },
  {
    id: "go_07",
    area: "go",
    difficulty: "facil",
    statement: "Qual dos seguintes métodos contraceptivos possui o menor índice de falha na prática clínica comum (maior eficácia de uso)?",
    options: {
      A: "Pílula anticoncepcional oral combinada",
      B: "Preservativo masculino",
      C: "Implante subcutâneo de etonogestrel (LARC)",
      D: "Dispositivo intrauterino de cobre (DIU)"
    },
    correctAnswer: "C",
    explanation: "Os LARCs (contraceptivos reversíveis de longa duração), especialmente o implante subcutâneo e o DIU hormonal (Mirena), têm os menores índices de falha (menores que o DIU de cobre e vasectomia) pois independem da adesão ativa da paciente.",
    source: "Manual de Anticoncepção da Febrasgo / Critérios OMS"
  },
  {
    id: "go_08",
    area: "go",
    difficulty: "facil",
    statement: "Qual o hormônio hipofisário que apresenta elevação acentuada no climatério, sendo considerado marcador laboratorial confirmatório de menopausa?",
    options: {
      A: "Hormônio Foliculoestimulante (FSH)",
      B: "Estradiol",
      C: "Progesterona",
      D: "Hormônio Luteinizante (LH) isolado"
    },
    correctAnswer: "A",
    explanation: "Com a falência ovariana, cessa o feedback negativo do estrogênio, provocando uma elevação acentuada e persistente dos níveis séricos de FSH (valores > 30-40 mIU/mL indicam menopausa).",
    source: "Consenso de Climatério da Febrasgo"
  },
  {
    id: "go_09",
    area: "go",
    difficulty: "facil",
    statement: "A suplementação profilática de ácido fólico na gestação é fundamental para prevenir defeitos do:",
    options: {
      A: "Tubo neural",
      B: "Coração fetal (PCA)",
      C: "Aparelho urinário (válvula de uretra posterior)",
      D: "Esqueleto axial"
    },
    correctAnswer: "A",
    explanation: "O ácido fólico (vitamina B9) é administrado no período periconcepcional (idealmente 3 meses antes de engravidar até as 12 semanas) para prevenção de defeitos do fechamento do tubo neural (como espinha bífida e anencefalia).",
    source: "Manual de Pré-Natal do Ministério da Saúde"
  },
  {
    id: "go_10",
    area: "go",
    difficulty: "facil",
    statement: "Qual a via de parto preferencial recomendada para gestantes vivendo com HIV que apresentam carga viral indetectável (menor que 50 cópias/mL) avaliada a partir da 34ª semana de gestação?",
    options: {
      A: "Cesariana eletiva obrigatoriamente",
      B: "Parto vaginal (via de indicação obstétrica)",
      C: "Cesariana de urgência no início do trabalho de parto",
      D: "Fórceps profilático obrigatório"
    },
    correctAnswer: "B",
    explanation: "Se a carga viral do HIV for indetectável (< 50 cópias/mL) após a 34ª semana, a via de parto é de indicação obstétrica (vaginal preferencial), sem necessidade de zidovudina (AZT) injetável no parto.",
    source: "Diretrizes de Transmissão Vertical do HIV - Ministério da Saúde"
  },
  {
    id: "go_11",
    area: "go",
    difficulty: "media",
    statement: "Paciente de 26 anos apresenta oligomenorreia, hirsutismo leve e acne. A ultrassonografia mostra múltiplos cistos ovarianos periféricos bilaterais. De acordo com os Critérios de Roterdã para Síndrome dos Ovários Policísticos (SOP), o diagnóstico exige:",
    options: {
      A: "Presença de todos os três critérios (clínicos, laboratoriais e de imagem)",
      B: "Presença de pelo menos 2 de 3 critérios: disfunção ovulatória, hiperandrogenismo (clínico/laboratorial) e ovários policísticos à USG, excluídas outras causas",
      C: "Apenas a comprovação ultrassonográfica de ovários policísticos",
      D: "Presença obrigatória de resistência insulínica"
    },
    correctAnswer: "B",
    explanation: "Os critérios de Roterdã exigem pelo menos 2 dos 3 critérios descritos, desde que descartadas outras causas de hiperandrogenismo e anovulação (como hiperplasia adrenal, hiperprolactininemia e disfunção tireoidiana).",
    source: "Consenso de SOP da Febrasgo / ESHRE"
  },
  {
    id: "go_12",
    area: "go",
    difficulty: "media",
    statement: "Qual dos seguintes critérios clínicos ou laboratoriais NÃO faz parte dos critérios de Amsel para o diagnóstico de Vaginose Bacteriana?",
    options: {
      A: "Corrimento vaginal homogêneo branco-acinzentado",
      B: "Presença de 'clue cells' (células-guia) na microscopia de lâmina a fresco",
      C: "pH vaginal < 4,5",
      D: "Teste do cheiro positivo (Whiff test / liberação de odor fétido com KOH 10%)"
    },
    correctAnswer: "C",
    explanation: "O pH vaginal na vaginose bacteriana é tipicamente alcalino/básico (> 4,5), não ácido (< 4,5). O restante dos itens compõe os critérios de Amsel (diagnóstico exige 3 de 4).",
    source: "Consenso de IST do Ministério da Saúde"
  },
  {
    id: "go_13",
    area: "go",
    difficulty: "media",
    statement: "A conduta profilática para prevenção de transmissão vertical do Streptococcus agalactiae (Estreptococo do grupo B) durante o trabalho de parto baseia-se em:",
    options: {
      A: "Administração de Ampicilina ou Penicilina cristalina venosa no trabalho de parto em pacientes com swab positivo rastreado entre 35-37 semanas",
      B: "Administração de Cefalotina VO 7 dias antes do parto",
      C: "Cesariana indicada profilaticamente em todas as portadoras",
      D: "Tratamento oral do casal no terceiro trimestre"
    },
    correctAnswer: "A",
    explanation: "A profilaxia intraparto para GBS é feita com Penicilina G cristalina (ou Ampicilina) endovenosa durante o trabalho de parto para gestantes colonizadas identificadas no rastreamento universal (swab retovaginal realizado entre 35 e 37 semanas).",
    source: "ACOG Committee Opinion - GBS prevention"
  },
  {
    id: "go_14",
    area: "go",
    difficulty: "media",
    statement: "A ocorrência de contrações uterinas rítmicas dolorosas associadas a dilatação cervical progressiva em uma gestação de 31 semanas define o Trabalho de Parto Prematuro (TPP). Qual a primeira medida terapêutica farmacológica (tocólise) recomendada no Brasil (sem contraindicações)?",
    options: {
      A: "Nifedipina via oral",
      B: "Terbutalina subcutânea contínua",
      C: "Sulfato de magnésio endovenoso",
      D: "Indometacina retal"
    },
    correctAnswer: "A",
    explanation: "A nifedipina oral é o agente tocolítico de primeira linha amplamente adotado no Brasil por sua eficácia e melhor perfil de efeitos colaterais comparado aos beta-agonistas.",
    source: "Febrasgo - Diretrizes de TPP"
  },
  {
    id: "go_15",
    area: "go",
    difficulty: "media",
    statement: "O rastreamento de Diabetes Mellitus Gestacional (DMG) é realizado rotineiramente em gestantes sem diabetes prévio através do TOTG (Teste Oral de Tolerância à Glicose) com 75g de glicose entre as semanas:",
    options: {
      A: "20ª e 22ª semanas",
      B: "24ª e 28ª semanas",
      C: "28ª e 32ª semanas",
      D: "12ª e 16ª semanas"
    },
    correctAnswer: "B",
    explanation: "O TOTG 75g de rastreamento universal para DMG deve ser realizado entre a 24ª e a 28ª semanas de gestação nas mulheres com glicemia de jejum inicial normal (< 92 mg/dL) no primeiro trimestre.",
    source: "Diretriz da SBD - Diabetes Gestacional"
  },
  {
    id: "go_16",
    area: "go",
    difficulty: "media",
    statement: "Paciente de 48 anos com queixa de fluxo menstrual aumentado há 1 ano. Ao exame físico e USG, constata-se presença de mioma uterino intramural que deforma a cavidade endometrial. Pela classificação da FIGO, qual o provável tipo de mioma?",
    options: {
      A: "FIGO tipo 0",
      B: "FIGO tipo 2",
      C: "FIGO tipo 5",
      D: "FIGO tipo 1 ou 2 (submucoso)"
    },
    correctAnswer: "D",
    explanation: "Miomas que deformam a cavidade endometrial têm componente submucoso. FIGO 0 é totalmente intracavitário pediculado; FIGO 1 é submucoso com componente intramural < 50%; FIGO 2 é submucoso com componente intramural >= 50%.",
    source: "Classificação da FIGO de Miomas Uterinos"
  },
  {
    id: "go_17",
    area: "go",
    difficulty: "media",
    statement: "Qual a recomendação de rastreamento mamográfico de câncer de mama em mulheres de risco habitual preconizada pelo Ministério da Saúde e pelo INCA?",
    options: {
      A: "Mamografia anual a partir dos 40 anos",
      B: "Mamografia bienal (a cada 2 anos) para a faixa etária de 50 a 69 anos",
      C: "Mamografia bienal a partir dos 35 anos",
      D: "Ultrassonografia de mamas anual associada a mamografia trienal dos 40 aos 70 anos"
    },
    correctAnswer: "B",
    explanation: "O Ministério da Saúde preconiza o rastreamento populacional organizado por mamografia de rastreamento bienal na faixa etária de 50 a 69 anos.",
    source: "Diretrizes de Rastreamento de Câncer de Mama - INCA/MS"
  },
  {
    id: "go_18",
    area: "go",
    difficulty: "media",
    statement: "Uma gestação gemelar monocoriônica e diamniótica é aquela em que os fetos compartilham:",
    options: {
      A: "A mesma placenta e a mesma bolsa amniótica",
      B: "A mesma placenta, mas possuem bolsas amnióticas separadas",
      C: "Placentas separadas e bolsas amnióticas separadas",
      D: "Duas placentas fundidas e a mesma bolsa"
    },
    correctAnswer: "B",
    explanation: "Monocoriônica = única placenta (córion). Diamniótica = duas bolsas amnióticas (âmnio) separadas por membrana.",
    source: "Obstetrícia de Rezende / Williams"
  },
  {
    id: "go_19",
    area: "go",
    difficulty: "media",
    statement: "Qual é o principal agente etiológico bacteriano causador da Doença Inflamatória Pélvica (DIP) aguda?",
    options: {
      A: "Chlamydia trachomatis e Neisseria gonorrhoeae",
      B: "Escherichia coli e Proteus mirabilis",
      C: "Streptococcus agalactiae e Staphylococcus aureus",
      D: "Gardnerella vaginalis"
    },
    correctAnswer: "A",
    explanation: "A DIP é uma síndrome clínica infecciosa polimicrobiana ascendente, sendo a Chlamydia trachomatis e a Neisseria gonorrhoeae os patógenos primários mais frequentes.",
    source: "Diretrizes de IST do CDC / Ministério da Saúde"
  },
  {
    id: "go_20",
    area: "go",
    difficulty: "media",
    statement: "Paciente com 8 semanas de atraso menstrual apresenta dor em fossa ilíaca direita de forte intensidade, sangramento vaginal discreto e instabilidade hemodinâmica (hipotensão e taquicardia). Ao exame, dor à mobilização do colo uterino e abaulamento de fundo de saco vaginal (Grito de Douglas). Qual o provável diagnóstico?",
    options: {
      A: "Apendicite aguda perfurada",
      B: "Gravidez ectópica rota",
      C: "Torção de anexo",
      D: "Abortamento incompleto"
    },
    correctAnswer: "B",
    explanation: "O quadro de dor pélvica aguda aguda unilateral, atraso menstrual, sangramento escasso e choque em mulher fértil sugere fortemente gravidez ectópica tubária rota.",
    source: "Rotinas em Obstetrícia"
  },
  {
    id: "go_21",
    area: "go",
    difficulty: "dificil",
    statement: "Paciente primigesta, Rh negativo com parceiro Rh positivo, apresenta exame de Coombs indireto negativo com 28 semanas de gestação. Qual a conduta recomendada?",
    options: {
      A: "Administrar imunoglobulina anti-D (anti-Rh) profilática com 28 semanas de gestação",
      B: "Induzir o parto imediatamente por risco de eritroblastose fetal",
      C: "Repetir o Coombs indireto semanalmente e não fazer imunoglobulina",
      D: "Realizar cordocentese para dosagem de hematócrito fetal"
    },
    correctAnswer: "A",
    explanation: "Para primigestas Rh negativo não sensibilizadas (Coombs indireto negativo), a imunoglobulina anti-D deve ser administrada profilaticamente por volta de 28 semanas de gestação e/ou até 72h pós-parto se o RN for Rh positivo.",
    source: "Diretriz de Aloimunização Rh da Febrasgo"
  },
  {
    id: "go_22",
    area: "go",
    difficulty: "dificil",
    statement: "Qual a manobra obstétrica de primeira escolha recomendada no manejo de distocia de ombros caracterizada por hiperflexão das pernas da gestante sobre o próprio abdome?",
    options: {
      A: "Manobra de Woods (saca-rolhas)",
      B: "Manobra de McRoberts",
      C: "Manobra de Zavanelli",
      D: "Pressão fúndica de Kristeller"
    },
    correctAnswer: "B",
    explanation: "A manobra de McRoberts consiste na hiperflexão das coxas maternas sobre o abdome, o que retifica o ângulo lombossacro e libera o ombro anterior impactado na sínfise púbica. Kristeller é formalmente contraindicada pelo risco de rotura uterina e trauma.",
    source: "Diretrizes de Assistência ao Parto - Ministério da Saúde"
  },
  {
    id: "go_23",
    area: "go",
    difficulty: "dificil",
    statement: "Em paciente na pós-menopausa com sangramento uterino anormal, qual a espessura máxima do endométrio à ultrassonografia transvaginal considerada como de baixo risco para malignidade endometrial (neoplasia de endométrio)?",
    options: {
      A: "Até 4 mm (sem terapia de reposição hormonal)",
      B: "Até 8 mm",
      C: "Até 10 mm",
      D: "Até 15 mm"
    },
    correctAnswer: "A",
    explanation: "Na pós-menopausa sem reposição hormonal, um endométrio com espessura menor ou igual a 4 mm tem alto valor preditivo negativo para câncer endometrial.",
    source: "Consenso de Oncologia Ginecológica da FEBRASGO"
  },
  {
    id: "go_24",
    area: "go",
    difficulty: "dificil",
    statement: "Qual das seguintes condições constitui uma contraindicação absoluta (Categoria 4 dos Critérios de Elegibilidade da OMS) ao uso de anticoncepcionais orais combinados contendo estrogênio?",
    options: {
      A: "Antecedente de trombose venosa profunda (TVP)",
      B: "Hipertensão arterial controlada em jovem",
      C: "Diabetes Mellitus sem vasculopatia",
      D: "Idade superior a 35 anos não fumante"
    },
    correctAnswer: "A",
    explanation: "O estrogênio aumenta fatores de coagulação, sendo contraindicado (Categoria 4) em pacientes com antecedente ou quadro ativo de TVP/TEP, mutações trombofílicas conhecidas ou enxaqueca com aura.",
    source: "Critérios de Elegibilidade Contraceptiva da OMS"
  },
  {
    id: "go_25",
    area: "go",
    difficulty: "dificil",
    statement: "Paciente gestante de 34 semanas com pré-eclâmpsia grave apresenta cefaleia refratária, distúrbios visuais e dor em hipocôndrio direito. Exames mostram plaquetopenia (78.000/mm³), DHL 800 U/L e AST 120 U/L. Qual o diagnóstico e conduta inicial?",
    options: {
      A: "Síndrome HELLP / Administração de Sulfato de Magnésio para prevenção de eclampsia e planejamento do parto",
      B: "Hepatite gestacional aguda / Corticoterapia contínua",
      C: "Plaquetopenia gestacional benigna / Transfusão imediata de plaquetas",
      D: "Colecistite calculosa / Colecistectomia videolaparoscópica de urgência"
    },
    correctAnswer: "A",
    explanation: "A Síndrome HELLP (hemólise, enzimas hepáticas elevadas e plaquetopenia) é uma complicação grave da pré-eclâmpsia. Exige sulfato de magnésio endovenoso (esquema de Pritchard ou Zuspan) para neuroproteção e prevenção de convulsões, seguido de estabilização materna e parto.",
    source: "Febrasgo - Protocolo de Gestação de Alto Risco"
  }
];
