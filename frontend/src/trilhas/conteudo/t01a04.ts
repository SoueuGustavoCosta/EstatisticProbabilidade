// Trilhas 1 a 4. Todo conteúdo vem de docs/02-conteudo-da-materia.md (REGRA Nº 1).
import { Trilha } from "../tipos";

const NOTAS = "84, 67, 80, 33, 78, 96, 49, 74, 65, 41, 81, 66, 50, 91, 59, 71, 94, 41, 52, 56";
const ROL = "33, 41, 41, 49, 50, 52, 56, 59, 65, 66, 67, 71, 74, 78, 80, 81, 84, 91, 94, 96";

export const T1: Trilha = {
  num: 1, titulo: "O que é Estatística e o método estatístico", fonte: "Aula 01 · Apostila p.11–12",
  cards: [
    { tipo: "fala", titulo: "Definição", texto: "Estatística é a ciência de coletar, organizar, resumir, analisar e interpretar dados para apoiar decisões sob incerteza.",
      duvida: { p: "O que é “decisão sob incerteza”?", r: "É decidir sem ter certeza do resultado. Os dados ajudam a escolher melhor mesmo assim." } },
    { tipo: "fala", titulo: "Um fluxo em cinco verbos", texto: "Os dados passam por cinco etapas, nesta ordem:", lista: ["Coletar (observar)", "Organizar (estruturar)", "Resumir (sintetizar)", "Analisar (comparar)", "Interpretar (decidir)"] },
    { tipo: "fala", titulo: "Três perguntas", texto: "A Estatística responde a três perguntas:", lista: ["O que aconteceu? (Descrever)", "O que é provável que aconteça? (Estimar)", "O que devemos fazer? (Agir)"] },
    { tipo: "fala", titulo: "Onde aparece em TI", texto: "Alguns exemplos da Aula 01:", lista: ["Data Science e análise exploratória (EDA)", "Machine Learning e IA", "Desempenho: latência, throughput, taxa de erro, disponibilidade", "SRE e SLOs", "Qualidade e pipelines: campos ausentes, formatos inconsistentes, duplicatas", "Segurança: volumes de acesso fora do esperado"] },
    { tipo: "fala", titulo: "Método estatístico: 4 etapas", texto: "Todo levantamento segue quatro etapas:", lista: ["Planejamento: o que será pesquisado, quem será estudado, quais dados coletar.", "Coleta de dados: cada característica analisada é uma variável.", "Apuração e apresentação: organizar em tabelas e gráficos, classificar e descartar dados incorretos ou incompletos.", "Análise e interpretação: usar medidas (média, mediana, moda, porcentagem) para chegar a conclusões."] },
    { tipo: "fala", titulo: "População, amostra e estratificação", texto: "População é o conjunto de todos os elementos da pesquisa. Amostra é uma parte dela, escolhida para representá-la. Estratificação divide a população em subgrupos parecidos antes de escolher a amostra.",
      duvida: { p: "Por que não pesquisar a população inteira?", r: "O material usa a amostra justamente para representar a população. Ex.: em vez de todos os alunos de TI, você pesquisa 100 deles." } },
    { tipo: "classificar", pergunta: "Pesquisa de linguagens de programação (Aula 01): onde cada item se encaixa?", categorias: ["População", "Amostra", "Estratificação"],
      itens: [["Todos os alunos de TI", 0], ["100 alunos escolhidos", 1], ["Separação por curso (CC, ADS, SI)", 2]], explicacao: "População = todos os alunos de TI; amostra = 100 alunos; estratificação = por curso (CC, ADS, SI) ou período." },
    { tipo: "escolha", pergunta: "Uma cidade tem 200.000 habitantes e a pesquisa ouve 500 pessoas (Apostila 1.1). Qual é a população?", opcoes: ["As 500 pessoas ouvidas", "Os 200.000 habitantes", "Uma das regiões da cidade"], correta: 1, explicacao: "A população é o conjunto todo (200.000). As 500 pessoas são a amostra." },
    { tipo: "preencher", pergunta: "Na mesma cidade, a região C tem 100.000 habitantes (A e B têm 50.000 cada). Quantas pessoas da amostra de 500 vêm da região C?", resposta: 250, explicacao: "(100.000 ÷ 200.000) × 500 = 250. Já A e B ficam com 125 cada." },
  ],
};

export const T2: Trilha = {
  num: 2, titulo: "Amostragem simples, sistemática e estratificada", fonte: "Aulas 01 e 03 · Apostila p.11",
  cards: [
    { tipo: "fala", texto: "Vamos ver três tipos de amostragem: aleatória simples, sistemática e estratificada." },
    { tipo: "fala", titulo: "Aleatória simples", texto: "Todos os elementos têm a mesma chance. A escolha é por sorteio ou outro mecanismo aleatório. Exemplo: 500 estudantes, sorteio de 50." },
    { tipo: "fala", titulo: "Sistemática", texto: "Os elementos são escolhidos em intervalos regulares. O ponto de partida é aleatório e, depois dele, vem um elemento a cada intervalo." },
    { tipo: "formula", latex: "k=\\frac{N}{n}", termos: [["k", "intervalo (passo)"], ["N", "tamanho da população"], ["n", "tamanho da amostra"]], fonte: "Aula 01 · Amostragem sistemática" },
    { tipo: "calculo", titulo: "1.000 usuários, amostra de 100", linhas: ["k = N ÷ n", "k = 1000 ÷ 100 = 10"], teclas: ["1", "0", "0", "0", "÷", "1", "0", "0", "="], resultado: "k = 10", fonte: "Aula 01 · Amostragem sistemática",
      duvida: { p: "E depois do k?", r: "Sorteie um ponto de partida entre 1 e 10. Depois pegue 1 a cada 10 usuários." } },
    { tipo: "dica", texto: "Regra do material: se k não for inteiro, arredonda-se para o inteiro menor." },
    { tipo: "fala", titulo: "Estratificada", texto: "Divide a população em estratos parecidos e seleciona de cada um, mantendo a proporção. Exemplo: CC 400, SI 300 e ADS 300 (total 1.000), amostra de 100." },
    { tipo: "calculo", titulo: "Estrato CC: 400 de 1.000", linhas: ["amostra do estrato = (tamanho do estrato ÷ N) × n", "(400 ÷ 1000) × 100 = 40", "SI: 300 ÷ 1000 × 100 = 30 · ADS: 300 ÷ 1000 × 100 = 30"], teclas: ["4", "0", "0", "÷", "1", "0", "0", "0", "×", "1", "0", "0", "="], resultado: "40, 30 e 30", fonte: "Aula 01 · Amostragem estratificada" },
    { tipo: "escolha", pergunta: "Exercício A3 nº 1b: pega-se uma pessoa a cada 10 de uma fila. Qual amostragem?", opcoes: ["Aleatória simples", "Sistemática", "Estratificada"], correta: 1, explicacao: "Intervalos regulares (1 a cada 10) = sistemática." },
    { tipo: "preencher", pergunta: "Exercício A3 nº 4: população de 360, amostra de 6, primeiro sorteado = 45. Qual é o 3º elemento?", resposta: 165, explicacao: "k = 360 ÷ 6 = 60. Sequência: 45, 45 + 60 = 105, 105 + 60 = 165." },
  ],
};

export const T3: Trilha = {
  num: 3, titulo: "Tipos de variáveis", fonte: "Aula 01 · Apostila p.11",
  cards: [
    { tipo: "fala", texto: "Cada característica analisada na pesquisa é uma variável. Elas se dividem em qualitativas (categorias) e quantitativas (números)." },
    { tipo: "tabela", titulo: "Os quatro tipos", colunas: ["Tipo", "Como é", "Exemplos do material"], fonte: "Aula 01", animada: true, linhas: [
      ["Qualitativa nominal", "categorias sem ordem", "curso, sistema operacional, linguagem preferida, estado civil, cor"],
      ["Qualitativa ordinal", "categorias com ordem", "nível de conhecimento (básico, intermediário, avançado), grau de satisfação, grau de escolaridade"],
      ["Quantitativa discreta", "contagem, valores específicos (em geral inteiros)", "computadores no laboratório, alunos na turma, idade, quantidade de filhos"],
      ["Quantitativa contínua", "medição, qualquer valor num intervalo", "tempo de execução, velocidade de processamento, altura, peso"]] },
    { tipo: "dica", texto: "Dica de bolso: contou? discreta. Mediu? contínua. Tem ordem entre as categorias? ordinal." },
    { tipo: "classificar", pergunta: "Classifique cada variável.", categorias: ["Nominal", "Ordinal", "Discreta", "Contínua"],
      itens: [["Estado civil", 0], ["Grau de escolaridade", 1], ["Quantidade de filhos", 2], ["Altura", 3], ["Tempo de execução", 3], ["Nível de conhecimento (básico, intermediário, avançado)", 1], ["Sistema operacional", 0]],
      explicacao: "Nominal: sem ordem. Ordinal: com ordem. Discreta: contagem. Contínua: medição." },
  ],
};

export const T4: Trilha = {
  num: 4, titulo: "Dados brutos, rol e tabelas", fonte: "Aula 01 · Apostila p.12",
  cards: [
    { tipo: "fala", titulo: "Dados brutos", texto: `Dados brutos são os dados obtidos na pesquisa, sem organização. Exemplo: 20 notas de 100 alunos (prova de 100 pontos): ${NOTAS}.` },
    { tipo: "fala", titulo: "Rol", texto: `Rol são os dados em ordem crescente ou decrescente. As mesmas notas em ordem crescente: ${ROL}.`,
      duvida: { p: "Por que ordenar primeiro?", r: "Com o rol fica fácil achar o menor, o maior e o valor do meio. Para a mediana, ordenar é obrigatório." } },
    { tipo: "fala", titulo: "O que dá para ver no rol", texto: "População = 100 alunos. Amostra = 20 notas. Menor valor = 33. Maior valor = 96." },
    { tipo: "fala", titulo: "Tabela simples e tabela de frequência", texto: "Tabela simples mostra os dados em linhas e colunas. Tabela de frequência mostra quantas vezes cada valor ou categoria aparece." },
    { tipo: "escolha", pergunta: "Qual é a diferença entre dados brutos e rol?", opcoes: ["O rol está em ordem crescente ou decrescente", "Dados brutos têm menos valores", "O rol só vale para população"], correta: 0, explicacao: "Os valores são os mesmos. No rol eles estão ordenados." },
    { tipo: "preencher", pergunta: "Qual é o menor valor das 20 notas?", resposta: 33, explicacao: "É o primeiro do rol: 33. O maior é 96." },
  ],
};
