// Trilhas 9 a 13. Fonte única: docs/02-conteudo-da-materia.md.
import { Trilha } from "../tipos";
import { T } from "./util";

export const T9: Trilha = {
  num: 9, titulo: "Amplitude total e desvio médio", fonte: "Aula 03 · Apostila p.32",
  cards: [
    { tipo: "fala", titulo: "Por que medir a dispersão", texto: "O computador A leva 10, 10, 10, 10, 10 s. O B leva 2, 6, 10, 14, 18 s. As duas médias são 10 s, mas os comportamentos são bem diferentes. A dispersão mede o quanto os valores se afastam da média." },
    { tipo: "tabela", titulo: "As quatro medidas de dispersão", colunas: ["Medida", "O que representa"], fonte: "Aula 03 e 05", linhas: [["Amplitude total", "maior − menor (extremos)"], ["Desvio médio", "afastamento absoluto médio em relação à média"], ["Variância", "dispersão a partir dos desvios ao quadrado"], ["Desvio padrão", "raiz quadrada da variância, na unidade original"]] },
    { tipo: "formula", titulo: "Amplitude total", latex: "AT = x_{max} - x_{min}", termos: [["AT", "amplitude total"], ["xmax", "maior valor"], ["xmin", "menor valor"]], fonte: "Aula 03 · Amplitude total / Apostila p.32" },
    { tipo: "calculo", titulo: "Tempos 8, 10, 12, 15, 20 s", linhas: ["AT = 20 − 8 = 12 s"], teclas: T("20−8"), resultado: "AT = 12 s", fonte: "Aula 03" },
    { tipo: "calculo", titulo: "Rede: 50, 55, 60, 65, 90 Mbps", linhas: ["AT = 90 − 50 = 40 Mbps"], teclas: T("90−50"), resultado: "AT = 40 Mbps", fonte: "Aula 03" },
    { tipo: "dica", texto: "Limitação da AT: ela olha só os extremos. Os conjuntos A (10, 11, 12, 13, 30) e B (10, 15, 20, 25, 30) têm AT = 20, mas distribuições diferentes." },
    { tipo: "formula", titulo: "Desvio médio", latex: "dm = \\frac{|x_1-\\bar{x}|+\\dots+|x_k-\\bar{x}|}{k}=\\frac{\\sum_{i=1}^{k}|x_i-\\bar{x}|}{k}", termos: [["dm", "desvio médio"], ["| |", "módulo (valor absoluto)"], ["x̄", "média"], ["k", "quantidade de valores"]], fonte: "Aula 03 · Desvio médio / Apostila p.32",
      texto: "Cinco passos: 1) média; 2) diferença de cada valor para a média; 3) valor absoluto; 4) somar; 5) dividir pela quantidade." },
    { tipo: "calculo", titulo: "Por que o módulo? Valores 5, 10, 15", linhas: ["Média = 10. Diferenças: −5, 0, 5", "Sem módulo: −5 + 0 + 5 = 0 (se anulam)", "Com módulo: |−5| + |0| + |5| = 10"], teclas: T("5+0+5"), resultado: "soma dos módulos = 10", fonte: "Aula 03" },
    { tipo: "tabela", titulo: "Valores 4, 6, 8, 10 (média 7)", colunas: ["xi", "xi − x̄", "|xi − x̄|"], fonte: "Aula 03", animada: true, linhas: [["4", "−3", "3"], ["6", "−1", "1"], ["8", "1", "1"], ["10", "3", "3"], ["Total", "", "8"]] },
    { tipo: "calculo", titulo: "dm de 4, 6, 8, 10", linhas: ["Soma dos módulos = 8", "dm = 8 ÷ 4 = 2 s"], teclas: T("8÷4"), resultado: "dm = 2 s", fonte: "Aula 03" },
    { tipo: "calculo", titulo: "dm de 10, 12, 15, 18, 20", linhas: ["Média = 75 ÷ 5 = 15", "Diferenças em módulo: 5, 3, 0, 3, 5 → soma 16", "dm = 16 ÷ 5 = 3,2 min"], teclas: T("16÷5"), resultado: "dm = 3,2 min", fonte: "Aula 03" },
  ],
};

export const T10: Trilha = {
  num: 10, titulo: "Variância e desvio padrão", fonte: "Aulas 04 e 05 · Apostila p.33–34",
  cards: [
    { tipo: "fala", titulo: "Os passos da variância", texto: "Média → subtrair a média de cada valor → elevar ao quadrado → somar → dividir pela quantidade adequada. Eleva-se ao quadrado para os desvios positivos e negativos não se anularem." },
    { tipo: "formula", titulo: "Variância populacional", latex: "\\sigma^2 = \\frac{\\sum_{i=1}^{k}(x_i-\\bar{x})^2}{k}", termos: [["σ²", "variância populacional"], ["xi", "cada valor"], ["x̄", "média"], ["k", "quantidade de elementos da população"]], fonte: "Aula 04 · Variância populacional" },
    { tipo: "formula", titulo: "Variância amostral", latex: "s^2 = \\frac{\\sum_{i=1}^{k}(x_i-\\bar{x})^2}{k-1}", termos: [["s²", "variância amostral"], ["k − 1", "correção de Bessel"]], fonte: "Aula 04 · Variância amostral", texto: "Dividimos por n − 1 como ajuste ao usar uma amostra para estimar a variabilidade da população. Quanto maior a amostra, menor a diferença entre k e k − 1.",
      duvida: { p: "Por que n − 1?", r: "É a correção de Bessel (Aula 04): ao estimar a variabilidade da população por uma amostra, perdemos informação, e o ajuste compensa." } },
    { tipo: "tabela", titulo: "Populacional × amostral", colunas: ["", "Populacional", "Amostral"], fonte: "Aula 04", linhas: [["Usa", "todos os elementos", "só uma amostra"], ["Divide por", "N", "n − 1"], ["Símbolo", "σ²", "s²"], ["Exemplo", "todos os computadores do laboratório", "30 de 500 computadores"]] },
    { tipo: "tabela", titulo: "Valores 2, 4, 6, 8, 10 (média 6)", colunas: ["xi", "xi − x̄", "(xi − x̄)²"], fonte: "Aula 04", animada: true, linhas: [["2", "−4", "16"], ["4", "−2", "4"], ["6", "0", "0"], ["8", "2", "4"], ["10", "4", "16"], ["Total", "", "40"]] },
    { tipo: "calculo", titulo: "Variância populacional", linhas: ["σ² = 40 ÷ 5 = 8 s²", "A unidade fica ao quadrado, por isso a interpretação é menos intuitiva."], teclas: T("40÷5"), resultado: "σ² = 8 s²", fonte: "Aula 04" },
    { tipo: "calculo", titulo: "Variância amostral", linhas: ["s² = 40 ÷ (5 − 1) = 40 ÷ 4 = 10 s²", "Maior que a populacional: dividir por n − 1 aumenta o resultado."], teclas: T("40÷4"), resultado: "s² = 10 s²", fonte: "Aula 04" },
    { tipo: "fala", titulo: "Dados agrupados por frequência", texto: "Precisamos considerar quantas vezes cada valor ocorre: cada xi entra ni vezes na soma. A apostila faz assim em 3.3: 2(41 − 66,4)², porque o 41 aparece 2 vezes. Exemplo do slide: falhas por teste xi = 1, 2, 3 com ni = 2, 3, 1 (total 6)." },
    { tipo: "aviso", texto: "Pendência P-04: o slide da Aula 04 para na tabela das falhas, sem o cálculo. O app mostra a soma repetindo cada valor ni vezes (a forma da apostila) e depois agrupando como ni·(xi − x̄)². Veja no Laboratório, em Tabela de frequência." },
    { tipo: "calculo", titulo: "Desvio padrão", linhas: ["σ = √σ² = √8 ≈ 2,83 s", "Está na mesma unidade dos dados."], teclas: T("√8"), resultado: "σ ≈ 2,83 s", fonte: "Aula 05 · Desvio padrão", latex: "\\sigma=\\sqrt{\\sigma^2}\\qquad s=\\sqrt{s^2}" },
    { tipo: "calculo", titulo: "Apostila 3.3 e 3.4: as 20 notas (amostra)", linhas: ["Soma dos quadrados dos desvios = 6514,8", "s² = 6514,8 ÷ 19 ≅ 342,88", "s = √342,88 ≅ 18,52"], teclas: T("√(6514.8÷19)"), resultado: "s ≅ 18,52", fonte: "Apostila 3.3 e 3.4" },
    { tipo: "dica", texto: "As notas ficam concentradas em [66,4 − 18,52 ; 66,4 + 18,52] = [47,88 ; 84,92]. Isso não significa que média ± desvio dá a maior e a menor nota." },
    { tipo: "fala", titulo: "Notação", texto: "A apostila usa σ também para a amostra; os slides usam s. O app usa a notação dos slides: s² e s para amostra, σ² e σ para população." },
    { tipo: "preencher", pergunta: "Atividade A5 nº 1: amostra 4, 6, 8, 10, 12 ms. Qual é a variância amostral (s²)?", resposta: 10, unidade: "ms²", explicacao: "Média 8; desvios −4, −2, 0, 2, 4; quadrados 16, 4, 0, 4, 16 = 40; s² = 40 ÷ 4 = 10 ms². E s = √10 ≈ 3,16 ms." },
  ],
};

export const T11: Trilha = {
  num: 11, titulo: "Assimetria: Pearson, momento e quartis", fonte: "Aula 06 · Apostila p.39–41",
  cards: [
    { tipo: "fala", titulo: "O que é assimetria", texto: "Indica se a distribuição está equilibrada em relação ao centro ou se concentra mais de um lado. É característica do formato e não mede dispersão." },
    { tipo: "tabela", titulo: "Os três formatos", colunas: ["Formato", "Característica", "Relação"], fonte: "Aula 06", animada: true, linhas: [
      ["Simétrica", "lados espelhados", "média = mediana = moda (ou muito próximas)"],
      ["Assimetria positiva (à direita)", "dados concentrados à esquerda, cauda longa à direita", "média > mediana > moda"],
      ["Assimetria negativa (à esquerda)", "dados concentrados à direita, cauda longa à esquerda", "média < mediana < moda"]] },
    { tipo: "dica", texto: "A cauda indica o sentido da assimetria. Não confunda a cauda com o lado onde os dados se concentram." },
    { tipo: "classificar", pergunta: "Atividade A6: classifique cada situação.", categorias: ["Simétrica", "Positiva", "Negativa"],
      itens: [["A) média 18, mediana 18, moda 18", 0], ["B) média 42, mediana 35, moda 30", 1], ["C) média 12, mediana 16, moda 20", 2]], explicacao: "A: três iguais → simétrica. B: média > mediana > moda → positiva. C: média < mediana < moda → negativa." },
    { tipo: "formula", titulo: "1º e 2º coeficientes de Pearson", latex: "A_s=\\frac{\\bar{x}-Mo}{\\sigma}\\qquad A_s=\\frac{3(\\bar{x}-Me)}{\\sigma}", termos: [["As", "coeficiente de assimetria"], ["Mo", "moda"], ["Me", "mediana"], ["σ", "desvio padrão"]], fonte: "Apostila p.39–40",
      texto: "As = 0: simétrica. As > 0: assimétrica positiva. As < 0: assimétrica negativa." },
    { tipo: "calculo", titulo: "Apostila 4.1: média 20, mediana 26, variância 9", linhas: ["σ = √9 = 3", "As = 3 × (20 − 26) ÷ 3 = −18 ÷ 3 = −6", "As < 0: assimétrica negativa"], teclas: T("3×(20−26)÷3"), resultado: "As = −6", fonte: "Apostila 4.1" },
    { tipo: "dica", texto: "Nos coeficientes de assimetria, σ é o desvio padrão populacional (é o que o exemplo 4.2 da apostila usa)." },
    { tipo: "formula", titulo: "Coeficiente do momento de assimetria", latex: "A_s=\\frac{\\sum_{i=1}^{k}(x_i-\\bar{x})^3}{k\\,\\sigma^3}", termos: [["Σ(xi − x̄)³/k", "momento de terceira ordem centrado na média"]], fonte: "Apostila p.40" },
    { tipo: "calculo", titulo: "Apostila 4.2: dados 2, 3, 4", linhas: ["x̄ = 3 · σ = √(2/3) ≅ 0,82", "Σ(xi − x̄)³ = (−1)³ + 0³ + 1³ = −1 + 0 + 1 = 0", "As = 0 ÷ (3 × σ³) = 0: simétrica"], teclas: T("(−1)x³+0x³+1x³"), resultado: "As = 0", fonte: "Apostila 4.2 (refeito)" },
    { tipo: "aviso", texto: "No material (apostila p.40, exemplo 4.2) aparece As ≅ 1,21 (positiva). Refazendo a conta, a soma dos cubos é zero, então As = 0. Faz sentido: 2, 3, 4 é um conjunto simétrico. (E-01)" },
    { tipo: "fala", titulo: "Quartis", texto: "Dividem a distribuição em 4 partes iguais. Q1 = mediana dos valores inferiores à mediana do conjunto. Q2 = a própria mediana. Q3 = mediana dos valores superiores à mediana do conjunto." },
    { tipo: "formula", titulo: "Coeficiente quartil", latex: "A_s=\\frac{Q_1+Q_3-2Me}{Q_3-Q_1}", termos: [["Q1", "1º quartil"], ["Q3", "3º quartil"], ["Me", "mediana"]], fonte: "Apostila p.41" },
    { tipo: "calculo", titulo: "Apostila 4.3: dados 2, 3, 4, 1, 2", linhas: ["Rol: 1, 2, 2, 3, 4 → Me = 2", "Q1 = (1 + 2) ÷ 2 = 1,5 · Q3 = (3 + 4) ÷ 2 = 3,5", "As = (1,5 + 3,5 − 2 × 2) ÷ (3,5 − 1,5) = 1 ÷ 2 = 0,5"], teclas: T("(1.5+3.5−2×2)÷(3.5−1.5)"), resultado: "As = 0,5 (positiva)", fonte: "Apostila 4.3 (refeito)" },
    { tipo: "aviso", texto: "No material (apostila p.41, exemplo 4.3) aparece As = 1,5, com “− 2” no numerador. O termo correto é 2·Me = 2 × 2 = 4, e o resultado é 0,5. (E-02)" },
    { tipo: "aviso", texto: "Gabarito da Unidade 4 (Q7 e Q8, dados 2, 2, 3, 4, 5, 5, 14): o material marca momento = 0,78 e 2º Pearson = 1,67. Com σ populacional (3,85) a conta dá momento ≅ 1,66 e 2º Pearson ≅ 0,78: as respostas estão trocadas. (E-04) Por isso essas duas questões ficam fora do desafio." },
  ],
};

export const T12: Trilha = {
  num: 12, titulo: "Probabilidade, condicional e Bayes", fonte: "Apostila p.45–49",
  cards: [
    { tipo: "fala", titulo: "Experimento aleatório", texto: "É um experimento que, repetido nas mesmas condições, pode dar resultados diferentes. Ex.: lançar uma moeda." },
    { tipo: "fala", titulo: "Espaço amostral e eventos", texto: "Espaço amostral (Ω) é o conjunto de todos os resultados possíveis. Eventos são subconjuntos de Ω. Evento certo = Ω; impossível = ∅; elementar = 1 elemento. Moeda: Ω = {cara, coroa}." },
    { tipo: "fala", titulo: "Dado de 6 faces", texto: "Ω = {1, 2, 3, 4, 5, 6} e há 64 eventos possíveis. A = {2, 4, 6} (pares), B = {2, 3, 5} (primos), C = {2, 5}." },
    { tipo: "formula", titulo: "Probabilidade", latex: "P(A)=\\frac{\\text{nº de elementos de }A}{\\text{nº de elementos de }\\Omega}=\\frac{\\text{casos favoráveis}}{\\text{casos totais}}", termos: [["P(A)", "probabilidade do evento A"], ["Ω", "espaço amostral"]], fonte: "Apostila p.45–46", texto: "Vale para eventos elementares finitos e equiprováveis. Importa a quantidade de elementos, não os valores." },
    { tipo: "calculo", titulo: "Dado: A, B e C", linhas: ["P(A) = 3 ÷ 6 = 1/2", "P(B) = 3 ÷ 6 = 1/2", "P(C) = 2 ÷ 6 = 1/3"], teclas: T("3÷6"), resultado: "1/2, 1/2 e 1/3", fonte: "Apostila 5.3" },
    { tipo: "tabela", titulo: "Propriedades", colunas: ["Propriedade"], fonte: "Apostila p.46", linhas: [["0 ≤ P(A) ≤ 1"], ["P(Ω) = 1"], ["P(∅) = 0"], ["Se A ∩ B = ∅ (disjuntos): P(A ∪ B) = P(A) + P(B)"]] },
    { tipo: "fala", titulo: "União e interseção", texto: "União = juntar todos os elementos. Interseção = os elementos que estão nos dois eventos. Disjuntos não têm elementos em comum." },
    { tipo: "formula", titulo: "Probabilidade condicional", latex: "P(A|B)=\\frac{P(A\\cap B)}{P(B)}", termos: [["P(A|B)", "lê-se “A dado B”"], ["P(A ∩ B)", "probabilidade de A e B juntos"], ["P(B)", "precisa ser maior que 0"]], fonte: "Apostila p.46" },
    { tipo: "calculo", titulo: "Caixa com bolas 1 a 10, sem reposição", linhas: ["A = par; B = sair a 2 na 1ª retirada", "P(A ∩ B) = 1/10 × 4/9", "P(A|B) = (1/10 × 4/9) ÷ (1/10) = 4/9"], teclas: T("(1÷10×4÷9)÷(1÷10)"), resultado: "P(A|B) = 4/9", fonte: "Apostila 5.4" },
    { tipo: "formula", titulo: "Independência", latex: "P(A\\cap B)=P(A)\\cdot P(B)", termos: [["A independe de B", "se P(A|B) = P(A)"]], fonte: "Apostila p.47", texto: "Com reposição (Apostila 5.5): P(A|B) = P(A) = 5/10 = 1/2." },
    { tipo: "formula", titulo: "Teorema de Bayes", latex: "P(B_i|A)=\\frac{P(A|B_i)\\,P(B_i)}{\\sum_{k=1}^{n}P(A|B_k)P(B_k)}", termos: [["B1…Bn", "eventos disjuntos, de probabilidade positiva, com união = Ω"], ["A", "evento observado"]], fonte: "Apostila p.48" },
    { tipo: "calculo", titulo: "Caixas de calçados (Apostila 5.6)", linhas: ["Caixa A: 70% botas, 30% sandálias. Caixa B: 30% botas, 70% sandálias. P(A) = 0,6 e P(B) = 0,4.", "Saiu bota (D): P(A|D) = (0,7 × 0,6) ÷ (0,7 × 0,6 + 0,3 × 0,4)", "= 0,42 ÷ 0,54 ≅ 0,78 (≈ 78%)"], teclas: T("(0.7×0.6)÷(0.7×0.6+0.3×0.4)"), resultado: "P(A|D) ≅ 0,78", fonte: "Apostila 5.6" },
    { tipo: "fala", titulo: "Variáveis aleatórias", texto: "São funções que relacionam elementos de Ω com números reais. Discreta: assume apenas valores inteiros e finitos (moeda: X(cara) = 1, X(coroa) = 0). Contínua: pode assumir valores reais e infinitos (altura de uma pessoa sorteada); a probabilidade é a área sob a curva da função densidade no intervalo." },
  ],
};

export const T13: Trilha = {
  num: 13, titulo: "Distribuições binomial e normal", fonte: "Apostila p.54–57",
  cards: [
    { tipo: "fala", titulo: "Binomial", texto: "Variável discreta com n tentativas independentes, cada uma com só dois resultados: sucesso (p) ou fracasso (q = 1 − p). Importa só a quantidade de sucessos, não a ordem." },
    { tipo: "formula", latex: "P(k)=\\frac{n!}{k!\\,(n-k)!}\\cdot p^{k}\\cdot q^{\\,n-k}", termos: [["n", "tentativas"], ["k", "sucessos"], ["p", "probabilidade de sucesso"], ["q", "1 − p"], ["n!", "fatorial: n·(n−1)·(n−2)·…·3·2·1"]], fonte: "Apostila p.54–55" },
    { tipo: "calculo", titulo: "Prova de 6 questões, 5 alternativas, chute (k = 3)", linhas: ["p = 1/5, q = 4/5, k = 3", "6!/(3!·3!) = 720 ÷ 36 = 20", "P(3) = 20 × (1/5)³ × (4/5)³ = 20 × 1/125 × 64/125 = 1280/15625 ≅ 0,08 (8%)"], teclas: T("6x!÷(3x!×3x!)×(1÷5)x³×(4÷5)x³"), resultado: "P(3) ≅ 0,08", fonte: "Apostila 6.1",
      duvida: { p: "Como faço x! na calculadora?", r: "Digite o número, aperte SHIFT e depois x⁻¹ (a função x! fica em amarelo acima dessa tecla)." } },
    { tipo: "fala", titulo: "Média e variância da binomial", texto: "Média x̄ = np e variância σ² = npq." },
    { tipo: "fala", titulo: "Normal", texto: "Variável contínua, simétrica em relação à média, com gráfico em forma de sino. A área total sob a curva é 1. Na fórmula, μ é a média, σ é o desvio padrão, e ≈ 2,71828 e π ≈ 3,14159." },
    { tipo: "formula", titulo: "Função densidade (só para ver)", latex: "f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}", termos: [["μ", "média"], ["σ", "desvio padrão"]], fonte: "Apostila p.56", texto: "Não é preciso calcular essa função à mão: usamos a padronização e a tabela." },
    { tipo: "formula", titulo: "Padronização", latex: "Z = \\frac{X - \\mu}{\\sigma}", termos: [["Z", "valor padronizado (média 0 e variância 1)"], ["X", "valor original"]], fonte: "Apostila p.56" },
    { tipo: "fala", titulo: "Como ler a Tabela Z", texto: "A Tabela 6 (apostila p.56) dá P(0 ≤ Z ≤ z). A linha traz a unidade e a 1ª casa decimal de z; a coluna, a 2ª casa decimal. O valor está no cruzamento. Para Z negativo, use a simetria: P(−x ≤ Z ≤ 0) = P(0 ≤ Z ≤ x). Abra o Laboratório (Normal) para ver a tabela com a linha e a coluna acesas." },
    { tipo: "calculo", titulo: "Lâmpada: μ = 2000 h, σ = 200 h, P(2000 ≤ X ≤ 2400)", linhas: ["Z = (2000 − 2000) ÷ 200 = 0", "Z = (2400 − 2000) ÷ 200 = 400 ÷ 200 = 2", "Tabela: P(0 ≤ Z ≤ 2,00) = 0,4772 = 47,72%"], teclas: T("(2400−2000)÷200"), resultado: "Z = 2 → 0,4772 = 47,72%", fonte: "Apostila 6.2" },
    { tipo: "aviso", texto: "O material escreve 0,4772 = 42,72%. É erro de digitação: 0,4772 é 47,72%. (E-03)" },
    { tipo: "calculo", titulo: "Intervalo que cruza a média (U6 Q8)", linhas: ["μ = 100, σ² = 0,04, então σ = 0,2. Entre 99,98 e 100,04:", "Z = (99,98 − 100) ÷ 0,2 = −0,10 e Z = (100,04 − 100) ÷ 0,2 = 0,20", "0,0398 + 0,0793 = 0,1191 = 11,91%"], teclas: T("(99.98−100)÷0.2"), resultado: "Z = −0,10 e 0,20 → 11,91%", fonte: "Apostila · Fixando U6 Q8" },
    { tipo: "preencher", pergunta: "Fixando U6 Q7: μ = 80, σ = 5. Qual a probabilidade (%) de X ficar entre 80 e 85?", resposta: 34.13, unidade: "%", explicacao: "Z = (85 − 80) ÷ 5 = 1 → tabela 0,3413 = 34,13%." },
  ],
};
