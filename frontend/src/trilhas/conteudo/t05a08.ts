// Trilhas 5 a 8. Fonte única: docs/02-conteudo-da-materia.md.
import { Trilha } from "../tipos";
import { T } from "./util";

export const T5: Trilha = {
  num: 5, titulo: "Distribuição de frequências com classes", fonte: "Aulas 01, 03 e 04 · Apostila p.13",
  cards: [
    { tipo: "fala", titulo: "O que são classes", texto: "Classes são grupos (intervalos) que reúnem dados com valores próximos. Usá-las reduz a informação, mostra padrões e a concentração dos dados e facilita comparar." },
    { tipo: "fala", titulo: "Parêntese e colchete", texto: "Parêntese ( ) = o limite NÃO está incluído. Colchete [ ] = o limite está incluído. Então (32, 48] é “maior que 32 e menor ou igual a 48”.",
      duvida: { p: "Por que isso importa?", r: "Para cada valor ser contado uma única vez. O 48 pertence à 1ª classe, (32, 48], e não à 2ª, (48, 64]." } },
    { tipo: "escolha", pergunta: "Em qual classe entra o valor 48?", opcoes: ["(32, 48]", "(48, 64]", "nas duas"], correta: 0, explicacao: "O colchete à direita inclui o 48 na 1ª classe. A 2ª começa depois do 48." },
    { tipo: "calculo", titulo: "Passo 01 · Organizar o rol", linhas: ["Rol: 33, 41, 41, 49, 50, 52, 56, 59, 65, 66, 67, 71, 74, 78, 80, 81, 84, 91, 94, 96", "Menor valor: 33 · Maior valor: 96 · Quantidade de dados: 20"], teclas: T("96-33"), resultado: "AT = 96 − 33 = 63", fonte: "Aula 04 · Passo 01" },
    { tipo: "formula", titulo: "Passo 02 · Número de classes", latex: "K \\cong \\sqrt{N}", termos: [["K", "quantidade de classes"], ["≅", "aproximadamente igual"], ["√", "raiz quadrada"], ["N", "total de dados"]], fonte: "Aula 04 · Passo 02" },
    { tipo: "formula", titulo: "Passo 03 · Amplitude de classe", latex: "h \\cong \\frac{AT}{K}", termos: [["h", "amplitude de classe"], ["AT", "amplitude total"], ["K", "número de classes"]], fonte: "Aula 04 · Passo 03", texto: "Se a divisão resultar em número quebrado, costuma-se arredondar para cima para garantir que o maior valor caiba na última classe." },
    { tipo: "aviso", texto: "Pendência P-03: o material não mostra a conta de K e h do exemplo; só o resultado final, (32, 48], (48, 64], (64, 80], (80, 96]. Duas leituras chegam nele: AT = 63 e 63 ÷ 4 = 15,75, arredondando para 16; ou, pela apostila, de 33 até 96 são 64 números inteiros e 64 ÷ 4 = 16. No Laboratório você pode ajustar K, h e o início." },
    { tipo: "tabela", titulo: "Passo 04 · Contar os valores de cada classe", colunas: ["Classe", "Valores", "ni"], fonte: "Aula 04 · Passo 04", animada: true, linhas: [
      ["(32, 48]", "33, 41, 41", "3"], ["(48, 64]", "49, 50, 52, 56, 59", "5"], ["(64, 80]", "65, 66, 67, 71, 74, 78, 80", "7"], ["(80, 96]", "81, 84, 91, 94, 96", "5"]] },
    { tipo: "calculo", titulo: "Passo 05 · Frequência relativa", linhas: ["fi (%) = ni ÷ n × 100", "1ª classe: 3 ÷ 20 × 100 = 15%", "2ª: 5 ÷ 20 × 100 = 25% · 3ª: 7 ÷ 20 × 100 = 35% · 4ª: 5 ÷ 20 × 100 = 25%"], teclas: T("3÷20×100"), resultado: "15%, 25%, 35%, 25%", fonte: "Aula 04 · Passo 05 / Apostila p.13", latex: "f_i\\,(\\%)=\\frac{n_i}{n}\\times 100" },
    { tipo: "tabela", titulo: "Conferências obrigatórias", colunas: ["Conferência", "Resultado"], linhas: [["Soma de ni = total de dados", "3 + 5 + 7 + 5 = 20 ✓"], ["Soma de fi = 100%", "15 + 25 + 35 + 25 = 100% ✓"], ["Nenhum valor fora das classes", "✓"], ["Nenhum valor em duas classes", "✓"]] },
    { tipo: "fala", titulo: "Passo 06 · Interpretar", texto: "A maior concentração está na classe (64, 80], com 35% dos dados." },
    { tipo: "preencher", pergunta: "Desafio (A4): tempos de 20 chamados, classes (10, 20], (20, 30], (30, 40], (40, 50]. Quantos chamados ficam em (20, 30]? (dados: 12, 18, 25, 31, 22, 15, 37, 41, 28, 33, 19, 45, 26, 38, 29, 17, 35, 43, 24, 32)", resposta: 6, explicacao: "(20, 30]: 22, 25, 26, 24, 28, 29 = 6. As classes dão ni = 5, 6, 6, 3 e fi = 25%, 30%, 30%, 15%." },
    { tipo: "preencher", pergunta: "E qual a frequência relativa (%) da classe (40, 50] nesse exercício?", resposta: 15, explicacao: "3 ÷ 20 × 100 = 15%.", unidade: "%" },
  ],
};

export const T6: Trilha = {
  num: 6, titulo: "Tabelas e gráficos", fonte: "Aula 02 · Apostila p.14–16",
  cards: [
    { tipo: "fala", titulo: "O que toda tabela tem", texto: "Uma tabela deve ter título, dados e fonte." },
    { tipo: "tabela", titulo: "Chamados por mês", colunas: ["Mês", "Chamados"], fonte: "Aula 02", animada: true, linhas: [["Jan", "120"], ["Fev", "95"], ["Mar", "140"], ["Abr", "110"], ["Mai", "160"]] },
    { tipo: "grafico", titulo: "Gráfico de barras: comparar quantidades", kind: "barras", fonte: "Aula 02", texto: "Barras (ou colunas) servem para comparar quantidades. Na vertical, são retângulos de bases iguais e alturas proporcionais à frequência.",
      dados: [{ x: "Jan", y: 120 }, { x: "Fev", y: 95 }, { x: "Mar", y: 140 }, { x: "Abr", y: 110 }, { x: "Mai", y: 160 }] },
    { tipo: "fala", titulo: "Gráfico de setores (pizza)", texto: "Mostra porcentagens e proporções: a parte do todo. O círculo, de raio arbitrário, representa o todo." },
    { tipo: "grafico", titulo: "Gráfico de linhas: mudanças ao longo do tempo", kind: "linhas", fonte: "Apostila 1.6 · venda de roupas femininas por mês", texto: "Linhas mostram evolução e tendência: pontos ligados por retas, usado para intervalos uniformes.",
      dados: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"].map((x, i) => ({ x, y: [132, 98, 127, 80, 152, 79, 81, 75, 79, 82, 90, 113][i] })) },
    { tipo: "tabela", titulo: "Como escolher o gráfico", colunas: ["Objetivo", "Gráfico"], fonte: "Aula 02", linhas: [["Comparar quantidades", "Barras ou colunas"], ["Mostrar porcentagens / proporções (parte do todo)", "Setores (pizza)"], ["Analisar mudanças ao longo do tempo (evolução, tendência)", "Linhas"]] },
    { tipo: "escolha", pergunta: "Quero mostrar a evolução de acessos por mês. Qual gráfico?", opcoes: ["Setores", "Barras", "Linhas"], correta: 2, explicacao: "Evolução ao longo do tempo = gráfico de linhas. (Barras também comparam meses, mas o objetivo aqui é tendência.)" },
  ],
};

export const T7: Trilha = {
  num: 7, titulo: "Média simples e ponderada", fonte: "Aula 02 · Apostila p.24–25",
  cards: [
    { tipo: "fala", titulo: "Medidas de posição", texto: "Três medidas dizem onde os dados se concentram: média, mediana e moda. Começamos pela média." },
    { tipo: "formula", titulo: "Média aritmética simples", latex: "\\bar{x}=\\frac{x_1+x_2+\\dots+x_k}{k}=\\frac{\\sum_{i=1}^{k}x_i}{k}", termos: [["x̄", "média"], ["xi", "cada valor"], ["k", "quantidade de valores"], ["Σ", "somatório: some todos os xi, de i = 1 até k"]], fonte: "Aula 02 · Média simples / Apostila p.24", texto: "Usada quando todos os valores têm o mesmo peso." },
    { tipo: "calculo", titulo: "Valores 6, 7, 8, 9, 10", linhas: ["Soma: 6 + 7 + 8 + 9 + 10 = 40", "Dividimos pela quantidade (5): 40 ÷ 5 = 8"], teclas: T("40÷5"), resultado: "x̄ = 8", fonte: "Aula 02 · Média simples" },
    { tipo: "calculo", titulo: "As 20 notas", linhas: ["Soma de todas as notas: 1328", "20 alunos: 1328 ÷ 20 = 66,4"], teclas: T("1328÷20"), resultado: "x̄ = 66,4", fonte: "Aula 02 / Apostila 2.1" },
    { tipo: "calculo", titulo: "Mais duas notas: 82 e 95", linhas: ["Não precisa somar tudo de novo: 1328 + 82 + 95 = 1505", "Agora são 22 notas: 1505 ÷ 22 ≅ 68,4"], teclas: T("(1328+82+95)÷22"), resultado: "x̄ ≅ 68,4", fonte: "Apostila 2.1",
      duvida: { p: "Preciso somar tudo de novo?", r: "Não. A soma anterior (1328) já vale; basta somar as duas notas novas e dividir por 22." } },
    { tipo: "dica", texto: "A média pode não coincidir com nenhum valor da pesquisa." },
    { tipo: "formula", titulo: "Média ponderada", latex: "\\bar{x}_p=\\frac{x_1 n_1+x_2 n_2+\\dots+x_k n_k}{n_1+n_2+\\dots+n_k}=\\frac{\\sum x_i n_i}{\\sum n_i}", termos: [["xi", "valor observado ou representativo"], ["ni", "frequência absoluta (ou peso)"]], fonte: "Aula 02 · Média ponderada / Apostila p.25", texto: "Com dados em classes, o valor representativo é o ponto médio de cada classe." },
    { tipo: "tabela", titulo: "Ponto médio de cada classe", colunas: ["Classe", "Ponto médio xi", "ni"], fonte: "Aula 02 / Apostila 2.2", animada: true, linhas: [["(32, 48]", "(33 + 48) ÷ 2 = 40,5", "3"], ["(48, 64]", "(49 + 64) ÷ 2 = 56,5", "5"], ["(64, 80]", "(65 + 80) ÷ 2 = 72,5", "7"], ["(80, 96]", "(81 + 96) ÷ 2 = 88,5", "5"]] },
    { tipo: "aviso", texto: "Por que 33 e não 32? Parêntese deixa o limite de fora e colchete deixa dentro, então o ponto médio usa o primeiro e o último valor que pertencem à classe. É por isso que (32, 48] vira (33 + 48) ÷ 2 = 40,5. Essa regra vale para classes como (32, 48] com dados inteiros. Em [16, 20) usamos (16 + 20) ÷ 2 = 18." },
    { tipo: "calculo", titulo: "Média ponderada das classes", linhas: ["40,5 × 3 + 56,5 × 5 + 72,5 × 7 + 88,5 × 5 = 1354", "Soma das frequências: 3 + 5 + 7 + 5 = 20", "1354 ÷ 20 = 67,7"], teclas: T("(40.5×3+56.5×5+72.5×7+88.5×5)÷20"), resultado: "x̄p = 67,7", fonte: "Aula 02 / Apostila 2.2" },
    { tipo: "dica", texto: "67,7 é diferente de 66,4 porque, com classes, não sabemos os valores exatos. A média com todas as notas é mais coerente." },
    { tipo: "tabela", titulo: "Simples × ponderada", colunas: ["", "Simples", "Ponderada"], fonte: "Aula 02", linhas: [["Pesos", "todos iguais", "cada valor tem seu peso ou frequência"], ["Conta", "soma e divide pela quantidade", "multiplica cada valor pelo peso e divide pela soma dos pesos"]] },
  ],
};

export const T8: Trilha = {
  num: 8, titulo: "Mediana e moda", fonte: "Aula 02 · Apostila p.25–27",
  cards: [
    { tipo: "fala", titulo: "Mediana", texto: "A mediana (Me) é o valor central dos dados ordenados. Atenção: ordene antes, senão o resultado pode estar incorreto." },
    { tipo: "formula", latex: "Me = x_{\\frac{n+1}{2}}\\ (n\\ \\text{ímpar}) \\qquad Me=\\frac{x_{\\frac{n}{2}}+x_{\\frac{n}{2}+1}}{2}\\ (n\\ \\text{par})", termos: [["n", "quantidade de valores"], ["x_k", "o valor na posição k do rol"]], fonte: "Aula 02 · Mediana / Apostila p.25" },
    { tipo: "calculo", titulo: "Ímpar: 12, 8, 15, 10, 20", linhas: ["Rol: 8, 10, 12, 15, 20", "n = 5: posição (5 + 1) ÷ 2 = 3", "O 3º valor do rol é 12"], teclas: T("(5+1)÷2"), resultado: "posição 3 → Me = 12 min", fonte: "Aula 02 · Mediana ímpar" },
    { tipo: "calculo", titulo: "Par: 15, 20, 10, 25, 30, 18", linhas: ["Rol: 10, 15, 18, 20, 25, 30", "n = 6: os valores do meio são o 3º (18) e o 4º (20)", "(18 + 20) ÷ 2 = 38 ÷ 2 = 19"], teclas: T("(18+20)÷2"), resultado: "Me = 19 min", fonte: "Aula 02 · Mediana par" },
    { tipo: "calculo", titulo: "Contas de luz (Apostila 2.3)", linhas: ["Rol: 45,92; 48,56; 56,75; 156,75; 465,40; 540,68", "(56,75 + 156,75) ÷ 2 = 106,75"], teclas: T("(56.75+156.75)÷2"), resultado: "Me = 106,75", fonte: "Apostila 2.3" },
    { tipo: "dica", texto: "A mediana não é afetada por valores discrepantes. Com grande discrepância, prefere-se a mediana." },
    { tipo: "fala", titulo: "Moda", texto: "Moda (Mo) é o valor que aparece com maior frequência. Exemplo: 7, 8, 9, 7, 6, 7, 10. O 7 aparece 3 vezes, então Mo = 7." },
    { tipo: "tabela", titulo: "Classificação da moda", colunas: ["Tipo", "Característica"], fonte: "Aula 02", linhas: [["Unimodal", "uma moda"], ["Bimodal", "duas modas"], ["Multimodal", "três ou mais modas"], ["Amodal", "não apresenta moda (todos com a mesma frequência)"]] },
    { tipo: "fala", titulo: "Bimodal e amodal", texto: "Chamados: Problemas de acesso 8, Falha na internet 5, Instalação de programas 8, Lentidão 3 → bimodal (acesso e instalação). Já 1, 2, 3, 4, 5 é amodal." },
    { tipo: "dica", texto: "A apostila (p.26) chama de amodal o caso de dois valores com frequência máxima igual; os slides chamam de bimodal. O app segue os slides." },
    { tipo: "fala", titulo: "Moda com variável qualitativa", texto: "Apostila 2.4: Estagiário 4 × R$ 700; Analista 9 × R$ 3.500; Gerente 3 × R$ 9.000; Presidente 1 × R$ 35.000. Mo(salário) = 3.500 e Mo(cargo) = analista. A moda é mais usada com variáveis qualitativas: identifica a maior preferência." },
  ],
};
