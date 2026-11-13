# 02 — Conteúdo da matéria (FONTE DA VERDADE)

Tudo aqui foi extraído dos arquivos da pasta. **Nada fora deste arquivo pode virar fórmula, regra ou exemplo no app.**

Legenda de fontes:
- `A1`…`A6` = slides "aula 1.pdf" … "aula 06.pdf"
- `AP p.X` = apostila "estatistica.pdf", página X
- Fórmulas em LaTeX (renderizar com KaTeX).
- ⚠️ = ponto com erro ou divergência no material → detalhes em `08-divergencias-e-pendencias.md`.

---

## 1. Introdução à Estatística (A1, AP p.11–12)

**Definição (A1):** Estatística é a ciência de coletar, organizar, resumir, analisar e interpretar dados para apoiar decisões sob incerteza.
Fluxo: Coletar (observar) → Organizar (estruturar) → Resumir (sintetizar) → Analisar (comparar) → Interpretar (decidir).
Perguntas: O que aconteceu? (Descrever) · O que é provável que aconteça? (Estimar) · O que devemos fazer? (Agir).

**Aspectos de um levantamento (AP p.11):** Amostragem (coleta de dados representativos), Estatística Descritiva (organização e descrição), Inferência Estatística (análise e interpretação para conclusões mais amplas).

**Por que estudar (A1):** Data Science/EDA, Machine Learning e IA, Desempenho (latência, throughput, taxa de erro, disponibilidade), SRE e SLOs, Qualidade e pipelines (campos ausentes, formatos inconsistentes, duplicatas), Segurança (volumes de acesso fora do esperado).

### 1.1 Método estatístico — 4 etapas (A1, AP p.11)
1. **Planejamento** — define o que será pesquisado, quem será estudado, quais dados coletar.
   - **População**: conjunto de todos os elementos que fazem parte da pesquisa.
   - **Amostra**: parte (subconjunto) da população selecionada para representá-la.
   - **Estratificação**: divisão da população em subgrupos com características semelhantes (homogêneos) antes da seleção da amostra.
2. **Coleta de dados** — cada característica analisada é uma **variável**.
3. **Apuração dos dados e apresentação dos resultados** — organizar (tabelas/gráficos), classificar, verificar qualidade (descartar dados incorretos, incompletos ou coletados de forma inadequada).
4. **Análise e interpretação** — usar medidas (média, mediana, moda, porcentagem) para obter conclusões.

Exemplo A1: pesquisa de linguagens de programação dos alunos de TI. População = todos os alunos de TI; amostra = 100 alunos; estratificação = por curso (CC, ADS, SI) ou período.
Exemplo AP 1.1: cidade com 200.000 habitantes, amostra de 500. Regiões A e B com 50.000 cada e C com 100.000 → amostra 125, 125 e 250.

### 1.2 Tipos de amostragem (A1, A3 exercícios)
| Tipo | Definição | Exemplo do material |
|---|---|---|
| Aleatória simples | Todos os elementos têm a mesma chance; escolha por sorteio/mecanismo aleatório. | 500 estudantes, sorteio de 50. |
| Sistemática | Elementos em intervalos regulares; ponto de partida aleatório, depois cada elemento conforme o intervalo. | 1.000 usuários, amostra 100 → k = 10; partida aleatória entre 1 e 10, depois 1 a cada 10. |
| Estratificada | Divide em estratos semelhantes e seleciona de cada um, mantendo a proporção. | CC 400, SI 300, ADS 300 (total 1.000) → amostra 100: 40, 30, 30. |

**Intervalo da amostragem sistemática (A1):**
$$k = \frac{N}{n}$$
k = intervalo (passo); N = tamanho da população; n = tamanho da amostra.
Regra: se k não for inteiro, **arredondar para o inteiro menor**.

**Estratificada proporcional:** cada estrato recebe a mesma proporção da população. (O material mostra pelos exemplos: 400/1000 de 100 = 40.) Cálculo usado nos exemplos: `amostra_estrato = (tamanho_estrato / N) × n`. ⚠️ Arredondamento quando não dá inteiro: não definido no material (ver `08`).

### 1.3 Variáveis (A1, AP p.11)
- **Qualitativas** (categorias, não indicam quantidade)
  - **Nominal**: sem ordem. Ex.: curso, sistema operacional, linguagem preferida, estado civil, cor, sexo.
  - **Ordinal**: com ordem. Ex.: nível de conhecimento (básico, intermediário, avançado), grau de satisfação, grau de escolaridade, classe social.
- **Quantitativas** (números)
  - **Discreta**: valores específicos, geralmente inteiros, obtidos por **contagem**. Ex.: computadores no laboratório, alunos na turma, idade, quantidade de filhos.
  - **Contínua**: qualquer valor num intervalo, inclusive decimais, obtida por **medição**. Ex.: tempo de execução, velocidade de processamento, altura, peso.

---

## 2. Sumarização e apresentação de dados (A1, A3, A4, AP p.12–16)

- **Dados brutos**: obtidos na pesquisa, sem organização.
- **Rol**: dados em ordem crescente ou decrescente.
- **Tabela simples**: dados em linhas e colunas.
- **Tabela de frequência**: mostra quantas vezes cada valor/categoria aparece.

**Exemplo central (usado em todo o material)** — 20 notas de 100 alunos (prova de 100 pontos):
Dados brutos: 84, 67, 80, 33, 78, 96, 49, 74, 65, 41, 81, 66, 50, 91, 59, 71, 94, 41, 52, 56
Rol: 33, 41, 41, 49, 50, 52, 56, 59, 65, 66, 67, 71, 74, 78, 80, 81, 84, 91, 94, 96
População = 100; amostra = 20; menor = 33; maior = 96.

### 2.1 Distribuição de frequências com classes (A1, A3, A4, AP p.13)
**Classes**: grupos/intervalos que reúnem dados com valores próximos.

**Notação de intervalos:** parêntese `( )` = limite NÃO incluído; colchete `[ ]` = limite incluído.
`(32, 48]` = maior que 32 e menor ou igual a 48. O 48 pertence à 1ª classe e não à 2ª → cada valor é contado uma única vez.

**Passo a passo do material (A4):**
1. **Passo 01** – Organizar em rol; identificar menor valor, maior valor, quantidade de dados.
2. **Passo 02** – Número de classes:
$$K \cong \sqrt{N}$$
K = quantidade de classes; ≅ = aproximadamente igual; N = total de dados.
3. **Passo 03** – Amplitude de classe:
$$h \cong \frac{AT}{K}$$
h = amplitude de classe; AT = amplitude total; K = número de classes.
Regra (A4): *"Se a divisão resultar em um número quebrado, costuma-se arredondar para cima para garantir que o maior valor caiba na última."*
4. **Passo 04** – Contar os valores de cada classe (frequência absoluta `ni`).
5. **Passo 05** – Frequência relativa:
$$f_i\,(\%) = \frac{n_i}{n} \times 100$$
6. **Passo 06** – Interpretar (onde está a maior concentração).

**Conferências obrigatórias (A1, A4):** não deixar valores fora; não contar um valor em duas classes; respeitar ( e ]; soma de ni = total de dados; soma de fi = 100%.

**Resultado do exemplo das 20 notas (A1, A4, AP p.13):**
| Classe | Valores | ni | Cálculo | fi |
|---|---|---|---|---|
| (32, 48] | 33, 41, 41 | 3 | 3 ÷ 20 × 100 | 15% |
| (48, 64] | 49, 50, 52, 56, 59 | 5 | 5 ÷ 20 × 100 | 25% |
| (64, 80] | 65, 66, 67, 71, 74, 78, 80 | 7 | 7 ÷ 20 × 100 | 35% |
| (80, 96] | 81, 84, 91, 94, 96 | 5 | 5 ÷ 20 × 100 | 25% |
| Total | | 20 | | 100% |
Maior concentração: (64, 80] com 35%.
⚠️ Os números do exemplo (K = 4, h = 16, início em 32) não são mostrados calculados no material — ver `08` (P-03).

**Exercício resolvido (A4):** tempos de 20 chamados: 12, 18, 25, 31, 22, 15, 37, 41, 28, 33, 19, 45, 26, 38, 29, 17, 35, 43, 24, 32 — classes (10,20], (20,30], (30,40], (40,50] → ni = 5, 6, 6, 3; fi = 25%, 30%, 30%, 15%.

**Apostila (AP p.13):** frequência relativa também como fração: f1 = 3/20 = 15%, f2 = 5/20 = 1/4 = 25%, f3 = 7/20 = 35%, f4 = 5/20 = 1/4 = 25%.

### 2.2 Tabelas e gráficos (A2, AP p.14–16)
Uma tabela deve ter **Título**, **Dados** e **Fonte**.
| Objetivo | Gráfico |
|---|---|
| Comparar quantidades | Barras ou colunas |
| Mostrar porcentagens / proporções (parte do todo) | Setores (pizza) |
| Analisar mudanças ao longo do tempo (evolução, tendência) | Linhas |
Detalhes (AP): barras vertical = retângulos de bases iguais e alturas proporcionais à frequência (horizontal = eixos trocados); setores = círculo de raio arbitrário representando o todo; linhas = pontos ligados por retas, usado para intervalos uniformes.
Exemplos: chamados por mês (Jan 120, Fev 95, Mar 140, Abr 110, Mai 160 — A2); venda de roupas femininas por mês 132, 98, 127, 80, 152, 79, 81, 75, 79, 82, 90, 113 (AP 1.6, gráfico de linhas); preferência musical por sexo (AP 1.5, tabela em %).

---

## 3. Medidas de posição (A2, AP p.24–27)

### 3.1 Média aritmética simples
$$\bar{x} = \frac{x_1 + x_2 + \dots + x_k}{k} = \frac{\sum_{i=1}^{k} x_i}{k}$$
x̄ = média; x1…xk = valores; k = quantidade de valores. Usada quando todos os valores têm o mesmo peso.
- Ex. A2: 6, 7, 8, 9, 10 → (6+7+8+9+10)/5 = 40/5 = 8.
- Ex. A2/AP 2.1: soma 1.328, 20 alunos → 1328/20 = 66,4.
- Ex. AP 2.1: incluir notas 82 e 95 → (1328 + 82 + 95)/22 = 1505/22 ≅ 68,4 (não precisa somar tudo de novo).
- 💡 (AP) A média pode não coincidir com nenhum valor da pesquisa.

### 3.2 Média aritmética ponderada
$$\bar{x}_p = \frac{x_1 n_1 + x_2 n_2 + \dots + x_k n_k}{n_1 + n_2 + \dots + n_k} = \frac{\sum_{i=1}^{k} x_i n_i}{\sum_{i=1}^{k} n_i}$$
xi = valor observado ou representativo; ni = frequência absoluta (ou peso).
**Dados em classes:** usar o **ponto médio** de cada classe como valor representativo.
Exemplo (A2, AP 2.2):
| Classe | Ponto médio xi | ni |
|---|---|---|
| (32, 48] | (33 + 48)/2 = 40,5 | 3 |
| (48, 64] | (49 + 64)/2 = 56,5 | 5 |
| (64, 80] | (65 + 80)/2 = 72,5 | 7 |
| (80, 96] | (81 + 96)/2 = 88,5 | 5 |
$$\bar{x}_p = \frac{40{,}5\times3 + 56{,}5\times5 + 72{,}5\times7 + 88{,}5\times5}{20} = \frac{1354}{20} = 67{,}7$$
⚠️ O ponto médio do material usa o **primeiro valor inteiro que pertence à classe** (33, não 32). Ver `08` (P-01).
💡 (AP) 67,7 ≠ 66,4 porque com classes não sabemos os valores exatos; a média com todas as notas é mais coerente.

**Média simples × ponderada (A2):** simples = todos com mesmo peso, soma e divide pela quantidade; ponderada = multiplica cada valor pelo peso/frequência e divide pela soma dos pesos.

### 3.3 Mediana (Me)
Valor central dos dados **ordenados** (crescente ou decrescente). **Atenção (A2): ordenar antes, senão o resultado pode estar incorreto.**
$$Me = x_{\frac{n+1}{2}} \;(n \text{ ímpar}) \qquad Me = \frac{x_{\frac{n}{2}} + x_{\frac{n}{2}+1}}{2} \;(n \text{ par})$$
- Ímpar (A2): 12, 8, 15, 10, 20 → rol 8, 10, 12, 15, 20 → 3º valor → Me = 12 min.
- Par (A2): 15, 20, 10, 25, 30, 18 → rol 10, 15, 18, 20, 25, 30 → (18+20)/2 = 38/2 = 19 min.
- Par (AP 2.3, contas de luz): 45,92; 48,56; 56,75; 156,75; 465,40; 540,68 → (56,75 + 156,75)/2 = 106,75.
- 💡 (AP) A mediana não é afetada por valores discrepantes; por isso, com grande discrepância, prefere-se a mediana.
- Usos em TI (A2): tempo central de execução, tempo típico de atendimento, carregamento de páginas, tempo de resposta de rede.

### 3.4 Moda (Mo)
Valor que aparece com maior frequência (o que mais se repete).
| Classificação (A2) | Característica |
|---|---|
| Unimodal | uma moda |
| Bimodal | duas modas |
| Multimodal | três ou mais modas |
| Amodal | não apresenta moda (todos com a mesma frequência / nenhum se destaca) |
- Ex. A2: 7, 8, 9, 7, 6, 7, 10 → 7 aparece 3 vezes → Mo = 7.
- Ex. A2 (qualitativa): Problemas de acesso 8, Falha na internet 5, Instalação de programas 8, Lentidão 3 → bimodal (acesso e instalação).
- Ex. A2: 1, 2, 3, 4, 5 → amodal.
- Ex. AP 2.4: Estagiário 4 × 700; Analista 9 × 3.500; Gerente 3 × 9.000; Presidente 1 × 35.000 → Mo(salário) = 3.500; Mo(cargo) = analista.
- 💡 (AP) A moda é mais usada com variáveis qualitativas (identifica a maior preferência).
- ⚠️ Divergência slides × apostila sobre "duas modas" — ver `08` (D-01). App segue os slides.

---

## 4. Medidas de dispersão (A3, A4, A5, AP p.32–34)

Medem o quanto os valores estão afastados/espalhados em relação à média. Motivação (A3): Computador A (10,10,10,10,10 s) e B (2,6,10,14,18 s) têm a mesma média 10 s, mas comportamentos diferentes.
💡 (AP) Todas as medidas de dispersão são números positivos ou nulos.

### 4.1 Amplitude total (AT)
$$AT = x_{max} - x_{min}$$
- A3: 8, 10, 12, 15, 20 s → 20 − 8 = 12 s.
- A3: 50, 55, 60, 65, 90 Mbps → 90 − 50 = 40 Mbps.
- AP 3.1: contas de luz → 540,68 − 45,92 = 494,76.
- Limitação (A3): considera só os extremos. Conjunto A (10,11,12,13,30) e B (10,15,20,25,30) têm AT = 20 mas distribuições diferentes.
- Dados em classes (AP p.32): AT = maior ponto médio − menor ponto médio **ou** limite superior da última classe − limite inferior da primeira.

### 4.2 Desvio médio (dm)
$$dm = \frac{|x_1-\bar{x}| + |x_2-\bar{x}| + \dots + |x_k-\bar{x}|}{k} = \frac{\sum_{i=1}^{k}|x_i-\bar{x}|}{k}$$
Passos (A3): 1) média; 2) diferença de cada valor para a média; 3) valor absoluto (módulo); 4) somar; 5) dividir pela quantidade.
Por que o módulo (A3): 5, 10, 15 → média 10 → diferenças −5, 0, 5 → soma 0 (se anulam); com módulo |−5|+|0|+|5| = 10.
- A3: 4, 6, 8, 10 → x̄ = 7 → |−3|,|−1|,|1|,|3| → 8 → dm = 8/4 = 2 s.
- A3: 10, 12, 15, 18, 20 → x̄ = 75/5 = 15 → 5, 3, 0, 3, 5 → 16 → dm = 16/5 = 3,2 min.

### 4.3 Variância
Passos (A4): média → subtrair a média de cada valor → elevar ao quadrado → somar → dividir pela quantidade adequada. Eleva ao quadrado para os desvios positivos e negativos não se anularem.

**Populacional** (todos os elementos da população):
$$\sigma^2 = \frac{\sum_{i=1}^{k}(x_i-\bar{x})^2}{k}$$
**Amostral** (apenas uma amostra):
$$s^2 = \frac{\sum_{i=1}^{k}(x_i-\bar{x})^2}{k-1}$$
Por que n − 1 (A4): ajuste ao usar uma amostra para estimar a variabilidade da população → **correção de Bessel**. (AP: perdemos informação; quanto maior a amostra, menor a diferença entre k e k−1.)
| | Populacional | Amostral |
|---|---|---|
| Usa | todos os elementos | só uma amostra |
| Divide por | N | n − 1 |
| Símbolo | σ² | s² |
Ex. de quando usar (A4): todos os computadores do laboratório → populacional; 30 de 500 computadores → amostral.

- A4: 2, 4, 6, 8, 10 → x̄ = 6 → desvios −4, −2, 0, 2, 4 → quadrados 16, 4, 0, 4, 16 → soma 40 → σ² = 40/5 = 8 s²; s² = 40/(5−1) = 10 s².
- AP 3.3 (20 notas, amostra): soma dos quadrados 6514,8 → s² = 6514,8/19 ≅ 342,88.
- A4: a unidade da variância fica ao quadrado (s²) → interpretação menos intuitiva.

**Dados agrupados por frequência (A4):** "precisamos considerar quantas vezes cada valor ocorre". Cada valor xi entra ni vezes na soma (como a apostila faz em 3.3: `2(41 − 66,4)²` porque 41 aparece 2 vezes). Exemplo do slide: falhas por teste xi = 1, 2, 3 com ni = 2, 3, 1 (total 6). ⚠️ O slide para na tabela (sem o cálculo) — ver `08` (P-04).

### 4.4 Desvio padrão
$$\sigma = \sqrt{\sigma^2} \qquad s = \sqrt{s^2}$$
Na mesma unidade dos dados (resolve a unidade ao quadrado da variância).
- A5: σ² = 8 → σ = √8 ≈ 2,83 s.
- A5 exercício (amostra 4, 6, 8, 10, 12 ms): média 8; AT 8; s² = 10 ms²; s ≈ 3,16 ms.
- AP 3.4: σ = √342,88 ≅ 18,52 → notas concentradas em [66,4 − 18,52 ; 66,4 + 18,52] = [47,88 ; 84,92]. 💡 Isso **não** significa que média ± desvio dá a maior e a menor nota.
- ⚠️ A apostila usa o símbolo σ também para a amostra; os slides usam s. App usa a notação dos slides (D-02).

### 4.5 Resumo (A3, A5)
| Medida | O que representa |
|---|---|
| Amplitude total | maior − menor (extremos) |
| Desvio médio | afastamento absoluto médio em relação à média |
| Variância | dispersão a partir dos desvios ao quadrado |
| Desvio padrão | raiz quadrada da variância, na unidade original |
Aplicações em TI (A5): tempo de execução, rede, segurança (tentativas de acesso), suporte, banco de dados, nuvem.

---

## 5. Medidas de assimetria (A6, AP p.39–41)

Assimetria: indica se a distribuição está equilibrada em relação ao centro ou se concentra mais de um lado. É característica do **formato**; **não mede dispersão**.
| Formato | Característica | Relação (unimodal típica) |
|---|---|---|
| Simétrica | lados espelhados, equilíbrio em torno do centro | média = mediana = moda (ou muito próximas) |
| Assimetria positiva (à direita) | dados concentrados à esquerda, cauda longa à direita (poucos valores altos) | média > mediana > moda |
| Assimetria negativa (à esquerda) | dados concentrados à direita, cauda longa à esquerda (poucos valores baixos) | média < mediana < moda |
💡 (A6) A cauda indica o sentido da assimetria — não confunda cauda com o lado onde os dados se concentram.
Exemplos A6: notas próximas de 7 (simétrica); tempo de espera com poucos casos muito demorados (positiva); tempos 1, 1, 2, 3, 4, 5, 6, 7, 20 s (positiva); prova muito fácil com poucas notas muito baixas (negativa).
Atividade A6: A) média 18, mediana 18, moda 18; B) 42, 35, 30; C) 12, 16, 20.

**Interpretação dos coeficientes (AP):** As = 0 → simétrica; As > 0 → assimétrica positiva; As < 0 → assimétrica negativa.

### 5.1 1º coeficiente de Pearson
$$A_s = \frac{\bar{x} - Mo}{\sigma}$$
### 5.2 2º coeficiente de Pearson
$$A_s = \frac{3(\bar{x} - Me)}{\sigma}$$
Precisam de média, moda ou mediana e desvio padrão.
- AP 4.1: média 20, mediana 26, variância 9 → σ = 3 → As = 3(20 − 26)/3 = −6 → assimétrica negativa.

### 5.3 Coeficiente do momento de assimetria
$$A_s = \frac{\sum_{i=1}^{k}(x_i-\bar{x})^3}{k\,\sigma^3}$$
$\frac{\sum (x_i-\bar{x})^3}{k}$ = momento de terceira ordem centrado na média.
- AP 4.2: 2, 3, 4 → x̄ = 3, σ = √(2/3) ≅ 0,82. ⚠️ O material dá As ≅ 1,21, mas a soma dos cubos é (−1)³ + 0³ + 1³ = 0 → As = 0 (simétrica). Ver `08` (E-01).

### 5.4 Quartis e coeficiente quartil
Quartis dividem a distribuição em 4 partes iguais (0% | Q1 25% | Q2 50% | Q3 75% | 100%).
- **Q1** = mediana dos valores **inferiores** à mediana do conjunto.
- **Q2** = mediana.
- **Q3** = mediana dos valores **superiores** à mediana do conjunto.
$$A_s = \frac{Q_1 + Q_3 - 2Me}{Q_3 - Q_1}$$
- AP 4.3: 2, 3, 4, 1, 2 → rol 1, 2, 2, 3, 4 → Me = 2; Q1 = (1+2)/2 = 1,5; Q3 = (3+4)/2 = 3,5. ⚠️ O material dá As = 1,5; o correto é (1,5 + 3,5 − 4)/(3,5 − 1,5) = 1/2 = 0,5 (positiva). Ver `08` (E-02).
- Gabarito confirma o método (AP U4 Q2/Q4): {2,2,3,4,5,5,14} → Q3 = 5; notas 6,6,7,5,10,8,8,6,5,8,8 → Q1 = 6, Q2 = 7, Q3 = 8.

---

## 6. Probabilidade (AP p.45–49)

**Experimento aleatório:** repetido nas mesmas condições pode dar resultados diferentes (ex.: moeda).
**Espaço amostral (Ω):** conjunto de todos os resultados possíveis. **Eventos:** subconjuntos de Ω.
- Evento certo = Ω; evento impossível = ∅; evento elementar = 1 elemento.
- Moeda: Ω = {cara, coroa}; eventos A = Ω, B = {cara}, C = {coroa}, D = ∅.
- Dado: Ω = {1,2,3,4,5,6}; 64 eventos possíveis. A = {2,4,6} pares; B = {2,3,5} primos; C = {2,5}.

**Probabilidade (eventos elementares finitos e equiprováveis):**
$$P(A) = \frac{\text{nº de elementos de } A}{\text{nº de elementos de } \Omega} = \frac{\text{casos favoráveis}}{\text{casos totais}}$$
Ex.: P(A) = 3/6 = 1/2; P(B) = 3/6 = 1/2; P(C) = 2/6 = 1/3. Importa a quantidade de elementos, não os valores.
Propriedades: 0 ≤ P(A) ≤ 1; P(Ω) = 1; P(∅) = 0; se A ∩ B = ∅ (disjuntos): P(A ∪ B) = P(A) + P(B).
União = juntar todos os elementos; interseção = elementos que estão nos dois.

### 6.1 Probabilidade condicional (P(B) > 0)
$$P(A|B) = \frac{P(A \cap B)}{P(B)}$$
Lê-se "A dado B".
- AP 5.4 (sem reposição): caixa com bolas 1 a 10; A = par, B = sair a 2 na 1ª retirada. P(A ∩ B) = 1/10 × 4/9 → P(A|B) = (1/10 × 4/9)/(1/10) = 4/9.

### 6.2 Independência
A independe de B se P(A|B) = P(A); equivalentemente
$$P(A \cap B) = P(A)\cdot P(B)$$
- AP 5.5 (com reposição): P(A|B) = P(A) = 5/10 = 1/2.

### 6.3 Teorema de Bayes
B1…Bn disjuntos, probabilidade positiva, união = Ω. Para um evento A:
$$P(B_i|A) = \frac{P(A|B_i)\,P(B_i)}{P(A|B_1)P(B_1) + \dots + P(A|B_n)P(B_n)} = \frac{P(A|B_i)\,P(B_i)}{\sum_{k=1}^{n} P(A|B_k)P(B_k)}$$
- AP 5.6: caixas tipo A (70% botas, 30% sandálias) e tipo B (30% botas, 70% sandálias); P(A) = 0,6, P(B) = 0,4. Saiu bota (D):
  P(A|D) = (0,7 × 0,6)/(0,7 × 0,6 + 0,3 × 0,4) = 0,42/0,54 ≅ 0,78 (≈ 78%).

### 6.4 Variáveis aleatórias
Funções que relacionam elementos de Ω com números reais.
- **Discreta**: assume apenas valores inteiros e finitos (AP 5.7: moeda, X(cara) = 1, X(coroa) = 0).
- **Contínua**: pode assumir valores reais e infinitos (AP 5.8: altura de uma pessoa sorteada). Probabilidade = área sob a curva da função densidade no intervalo.

---

## 7. Distribuições (AP p.54–57)

### 7.1 Binomial (variável discreta)
n tentativas independentes, só sucesso (p) ou fracasso (q = 1 − p). Probabilidade de k sucessos:
$$P(k) = \frac{n!}{k!\,(n-k)!}\cdot p^{k}\cdot q^{\,n-k}$$
Fatorial: n! = n·(n−1)·(n−2)·…·3·2·1. Importa só a **quantidade** de sucessos, não a ordem.
Média $\bar{x} = np$; variância $\sigma^2 = npq$.
- AP 6.1: prova de 6 questões, 5 alternativas, chute. p = 1/5, q = 4/5, k = 3:
  P(3) = 6!/(3!·3!) · (1/5)³ · (4/5)³ = 20 · 1/125 · 64/125 = 1280/15625 ≅ 0,08 (8%).

### 7.2 Normal (variável contínua)
Simétrica em relação à média; gráfico em forma de sino; área total sob a curva = 1.
$$f(x) = \frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}}$$
μ = média; σ = desvio padrão; e ≈ 2,71828; π ≈ 3,14159.
**Padronização:**
$$Z = \frac{X - \mu}{\sigma}$$
Z tem média 0 e variância 1 (normal padrão).
**Tabela:** `data/tabela_z.json` (Tabela 6, AP p.56) dá P(0 ≤ Z ≤ z). Linha = unidade e 1ª casa decimal; coluna = 2ª casa decimal.
**Simetria (AP p.57):** P(−x ≤ Z ≤ 0) = P(0 ≤ Z ≤ x).
- AP 6.2: lâmpada μ = 2000 h, σ = 200 h. P(2000 ≤ X ≤ 2400): Z = (2000−2000)/200 = 0; Z = (2400−2000)/200 = 400/200 = 2 → P(0 ≤ Z ≤ 2,00) = 0,4772 = **47,72%**. ⚠️ O material escreve 42,72% (E-03).
- Exercícios (AP p.59, gabarito): μ = 80, σ = 5, entre 80 e 85 → Z = 1 → 0,3413 = 34,13%. μ = 100, σ² = 0,04 (σ = 0,2), entre 99,98 e 100,04 → Z = −0,10 e 0,20 → 0,0398 + 0,0793 = 0,1191 = 11,91%.

---

## 8. Exercícios
Todos os exercícios (aulas e "Fixando o conteúdo") com dados e gabarito estão em `data/exercicios.json`.
