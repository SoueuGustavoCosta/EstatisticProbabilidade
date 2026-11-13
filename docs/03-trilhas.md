# 03 — Trilhas (roteiro de ensino)

> **Atualização 13/11/2026:** sem personagens. "Fala da Profª Sigma" = texto da etapa. "Aponta" = destaque azul (fundo `#E8F2FC` + contorno). "Dado pergunta" = bloco recolhível **Dúvida comum**. Layout de referência: tela "Trilha" do protótipo (lista de etapas à esquerda, conteúdo no centro, calculadora à direita).

## Regras gerais de toda trilha
- **Um conceito por card.** Card = fala da Profª Sigma + elemento visual + (opcional) interação.
- A Profª Sigma **aponta** (laser animado) para o que está explicando: termo da fórmula, célula da tabela, tecla da calculadora.
- O Dado pergunta o óbvio quando um passo poderia ser pulado ("Por que ordenar primeiro?"). A resposta vem do material.
- Todo cálculo aparece inteiro: substituição dos números na fórmula → conta intermediária → resultado → unidade → interpretação.
- Em cada card com conta, botão **"Fazer na calculadora"** abre a mini calculadora já com a sequência de teclas, tecla por tecla, com destaque neon na tecla atual.
- Fim da trilha: **Desafio** (3–6 questões do `data/exercicios.json` daquele tema) + XP + medalha.
- Todas as trilhas abertas desde o início. Ordem sugerida = numeração.
- Conteúdo, fórmulas e números: só do `docs/02`. As falas abaixo são rascunho de tom; podem ser ajustadas, mas sem acrescentar conteúdo.

Tipos de card (componentes):
`fala` · `formula` (KaTeX com termos clicáveis que mostram o significado) · `tabela-animada` (linhas aparecem uma a uma) · `passo-calculo` (com mini calculadora) · `arrasta-solta` (classificar) · `escolha` (quiz) · `preencher` (digitar o número) · `grafico` · `dica` (💡) · `aviso-material` (⚠️ erro do material).

---

## Mapa das trilhas
| # | Trilha | Fontes | Cards (aprox.) |
|---|---|---|---|
| 1 | O que é Estatística + Método estatístico | A1, AP p.11–12 | 8 |
| 2 | Amostragem (simples, sistemática, estratificada) | A1, A3, AP p.11, 21 | 10 |
| 3 | Tipos de variáveis | A1, AP p.11 | 7 |
| 4 | Organizando dados: brutos, rol, tabelas | A1, AP p.12 | 6 |
| 5 | Distribuição de frequências com classes | A1, A3, A4, AP p.13 | 12 |
| 6 | Tabelas e gráficos | A2, AP p.14–16 | 7 |
| 7 | Média (simples e ponderada) | A2, AP p.24–25 | 10 |
| 8 | Mediana e Moda | A2, AP p.25–27 | 10 |
| 9 | Amplitude total e Desvio médio | A3, AP p.32 | 10 |
| 10 | Variância e Desvio padrão | A4, A5, AP p.33–34 | 12 |
| 11 | Assimetria (formatos, Pearson, momento, quartis) | A6, AP p.39–41 | 12 |
| 12 | Probabilidade (espaço amostral, condicional, independência, Bayes, v.a.) | AP p.45–49 | 12 |
| 13 | Distribuições Binomial e Normal | AP p.54–57 | 12 |

---

## Trilha 1 — O que é Estatística
1. `fala` — "Estatística é a ciência de coletar, organizar, resumir, analisar e interpretar dados para apoiar decisões sob incerteza."
2. `fala` + animação de esteira: Coletar → Organizar → Resumir → Analisar → Interpretar (cada palavra acende com seu verbo: observar, estruturar, sintetizar, comparar, decidir).
3. `fala` — as 3 perguntas: O que aconteceu? (Descrever) · O que é provável? (Estimar) · O que fazer? (Agir).
4. `fala` — onde aparece em TI (cards: Data Science/EDA, ML e IA, Desempenho, SRE/SLOs, Qualidade de pipelines, Segurança).
5. `fala` — Método estatístico: 4 etapas (Planejamento, Coleta, Apuração/Apresentação, Análise/Interpretação).
6. `fala` — População, Amostra, Estratificação (definições do A1). Visual: 1000 pontinhos → seleção de 100 → separados por cor (curso).
7. `arrasta-solta` — exemplo do A1 (pesquisa de linguagens): arrastar "todos os alunos de TI", "100 alunos escolhidos", "separação por curso" para População / Amostra / Estratificação.
8. `escolha` — exemplo AP 1.1 (cidade 200.000, amostra 500): qual é a população e qual a amostra?

## Trilha 2 — Amostragem
1. `fala` — "Vamos estudar 3 tipos: aleatória simples, sistemática e estratificada."
2. Aleatória simples — definição + exemplo 500 alunos/50 sorteados. Animação de sorteio.
3. Sistemática — definição (intervalos regulares, ponto de partida aleatório).
4. `formula` k = N/n, termos clicáveis (k, N, n).
5. `passo-calculo` — 1000 usuários, amostra 100: k = 1000/100 = 10. Mini calculadora: `1 0 0 0 ÷ 1 0 0 =`.
6. `dica` — regra do material: se k não for inteiro, arredondar para o inteiro menor.
7. Animação: partida aleatória entre 1 e 10 e seleção de 1 a cada 10.
8. Estratificada — definição + tabela CC 400 / SI 300 / ADS 300 → 40 / 30 / 30, mostrando para cada curso: 400 ÷ 1000 × 100 = 40 (passo a passo na mini calculadora).
9. `escolha` — exercícios A3 nº 1 (a: cartões sorteados → aleatória simples; b: 1 a cada 10 da fila → sistemática).
10. `preencher` — exercício A3 nº 4 (população 360, amostra 6, primeiro sorteado 45): k = 360 ÷ 6 = 60 → 45, 105, 165 → terceiro elemento = 165 (mostrar a sequência somando 60 a cada passo).

## Trilha 3 — Tipos de variáveis
1. `fala` — variável = cada característica analisada.
2. Qualitativa × quantitativa (definições).
3. Nominal (sem ordem) — exemplos do A1.
4. Ordinal (com ordem) — exemplos.
5. Discreta (contagem) — exemplos.
6. Contínua (medição) — exemplos.
7. `arrasta-solta` — classificar exemplos do A1 + AP (estado civil, grau de escolaridade, quantidade de filhos, altura, tempo de execução, nível de conhecimento…) + questão 5 do Fixando U1.

## Trilha 4 — Organizando dados
1. Dados brutos (definição) — mostra as 20 notas embaralhadas.
2. Rol — animação ordenando as 20 notas (cada número "voa" para sua posição).
3. Observações: população 100, amostra 20, menor 33, maior 96 (Profª aponta cada um).
4. Tabela simples (5 colunas, AP p.13).
5. Tabela de frequência (o que é).
6. `escolha` — qual a diferença entre dados brutos e rol?

## Trilha 5 — Distribuição de frequências com classes
1. O que são classes (A1).
2. Por que usar (A1: reduz informação, mostra padrões, concentração, comparação).
3. Notação ( ) e [ ] — card interativo: o aluno arrasta o número 48 e vê em qual classe ele "encaixa".
4. Passo 01: rol + menor, maior, quantidade (33, 96, 20).
5. Passo 02: K ≅ √N (fórmula + significado de cada símbolo, inclusive ≅ e √). Ver P-03 antes de mostrar o resultado numérico.
6. Passo 03: h ≅ AT/K + regra de arredondar para cima.
7. Passo 04: contagem por classe — tabela animada com os valores entrando na classe certa (33, 41, 41 → 1ª …).
8. Passo 05: fi = ni/n × 100, linha a linha com mini calculadora (3 ÷ 20 × 100 = 15).
9. Conferências: soma ni = 20; soma fi = 100% (check verde animado).
10. Passo 06: interpretação (maior concentração em (64, 80], 35%).
11. Cuidados ao construir a tabela (lista do A4).
12. Desafio: exercício dos 20 chamados (A4) — o aluno monta a tabela.

## Trilha 6 — Tabelas e gráficos
1. Tabela: título, dados, fonte (exemplo de chamados por mês, A2).
2. Gráfico de barras — quando usar + gráfico animado com os chamados.
3. Gráfico de setores — quando usar.
4. Gráfico de linhas — quando usar (vendas de roupas por mês, AP 1.6).
5. Tabela "Como escolher o gráfico" (A2).
6. `escolha` — "Quero mostrar a evolução de acessos por mês. Qual gráfico?"
7. `dica` — "Para memorizar" do A2.

## Trilha 7 — Média
1. Medidas de posição: média, mediana, moda.
2. `formula` média simples — termos clicáveis (x̄, xi, k, Σ). Card do glossário Σ (AP p.24).
3. `passo-calculo` 6, 7, 8, 9, 10 → 6+7+8+9+10 = 40 → 40 ÷ 5 = 8.
4. `passo-calculo` 1328 ÷ 20 = 66,4.
5. Incluindo duas notas (82 e 95): 1328 + 82 + 95 = 1505; 1505 ÷ 22 ≅ 68,4. Dado: "Preciso somar tudo de novo?" Profª: "Não!".
6. `dica` — a média pode não ser nenhum dos valores.
7. `formula` média ponderada.
8. Ponto médio das classes (tabela A2) — com `aviso-material` sobre o 33 (P-01).
9. `passo-calculo` 40,5×3 + 56,5×5 + 72,5×7 + 88,5×5 = 1354 → 1354 ÷ 20 = 67,7 (cada multiplicação separada na mini calculadora).
10. Simples × ponderada (tabela A2) + desafio (Fixando U2 Q1, Q4, Q8).

## Trilha 8 — Mediana e Moda
1. Mediana: definição + atenção: ordenar antes.
2. Fórmulas ímpar/par.
3. Exemplo ímpar (12, 8, 15, 10, 20) com rol animado e destaque no centro.
4. Exemplo par (15, 20, 10, 25, 30, 18) → (18 + 20)/2 = 19.
5. Exemplo contas de luz (AP 2.3) + dica sobre valores discrepantes.
6. Moda: definição + exemplo 7, 8, 9, 7, 6, 7, 10 (tabela de contagem).
7. Bimodal (tipos de problema) e amodal (1, 2, 3, 4, 5).
8. Tabela de classificação (unimodal, bimodal, multimodal, amodal).
9. Moda com qualitativa (cargos/salários AP 2.4).
10. Desafio: Fixando U2 Q2, Q3, Q6, Q7.

## Trilha 9 — Amplitude total e Desvio médio
1. Por que dispersão: Computador A × B (mesma média 10 s). Gráfico de pontos lado a lado.
2. As 4 medidas (visão geral).
3. AT = xmax − xmin + exemplo 20 − 8 = 12 s.
4. Exemplo da rede: 90 − 50 = 40 Mbps.
5. Limitação: conjuntos A e B com AT = 20.
6. Desvio médio: os 5 passos.
7. Por que o módulo (5, 10, 15 → soma 0 sem módulo).
8. `passo-calculo` 4, 6, 8, 10 (tabela com diferença e módulo; dm = 2).
9. `passo-calculo` 10, 12, 15, 18, 20 (dm = 3,2).
10. Comparação AT × dm + desafio (Fixando U3 Q2, Q5).

## Trilha 10 — Variância e Desvio padrão
1. Passos da variância; por que elevar ao quadrado.
2. Populacional (σ², divide por k).
3. Amostral (s², divide por k − 1) + correção de Bessel.
4. Tabela populacional × amostral + quando usar cada uma (exemplos do A4).
5. `passo-calculo` 2, 4, 6, 8, 10 → tabela de desvios e quadrados → soma 40.
6. σ² = 40 ÷ 5 = 8 s² (+ unidade ao quadrado).
7. s² = 40 ÷ 4 = 10 s² e comparação.
8. Dados agrupados por frequência (tabela de falhas) — ver P-04.
9. Desvio padrão: raiz da variância; √8 ≈ 2,83 s (tecla √ na mini calculadora).
10. Intervalo [x̄ − s ; x̄ + s] das notas (AP 3.4) + dica de interpretação.
11. Resumo das 4 medidas e aplicações em TI.
12. Desafio: exercício A5 nº 1 (4, 6, 8, 10, 12) e Fixando U3 Q3, Q6, Q7, Q8.

## Trilha 11 — Assimetria
1. Revisão: posição × dispersão × assimetria.
2. O que é assimetria (formato, não dispersão).
3. Simétrica — gráfico em sino espelhado.
4. Positiva — cauda à direita, média > mediana > moda (exemplo 1, 1, 2, …, 20).
5. Negativa — cauda à esquerda.
6. Dica: cauda indica o sentido.
7. `escolha` — Atividade A6 (situações A, B, C).
8. 1º e 2º coeficientes de Pearson + exemplo AP 4.1 (−6).
9. Coeficiente do momento + exemplo AP 4.2 com `aviso-material` (E-01).
10. Quartis (Q1, Q2, Q3) — animação dividindo o rol.
11. Coeficiente quartil + exemplo AP 4.3 com `aviso-material` (E-02).
12. Desafio: Fixando U4 (ver E-04 sobre o gabarito das Q7/Q8).

## Trilha 12 — Probabilidade
1. Experimento aleatório (moeda).
2. Espaço amostral e eventos; certo, impossível, elementar.
3. Dado de 6 faces: eventos pares, primos, {2,5}.
4. P(A) = favoráveis/totais + exemplo 3/6, 3/6, 2/6.
5. Propriedades (0 ≤ P ≤ 1, P(Ω) = 1, P(∅) = 0).
6. União e interseção (diagrama de conjuntos animado) + disjuntos.
7. Condicional — fórmula + intuição das bolas.
8. Exemplo sem reposição → 4/9.
9. Independência — com reposição → 1/2; P(A ∩ B) = P(A)·P(B).
10. Bayes — exemplo das caixas de calçados com árvore de probabilidades animada → ≅ 78%.
11. Variáveis aleatórias discretas × contínuas.
12. Desafio: Fixando U5.

## Trilha 13 — Distribuições
1. O que é uma distribuição de probabilidade.
2. Binomial: condições (2 resultados, tentativas independentes).
3. Fórmula + fatorial (glossário).
4. `passo-calculo` exemplo da prova de 6 questões (6! ÷ (3!·3!) = 20; (1/5)³; (4/5)³; produto ≅ 0,08). Tecla x! na mini calculadora.
5. Média np e variância npq.
6. Normal: forma de sino, simétrica, área total 1, e ≈ 2,71828, π ≈ 3,14159.
7. Função densidade (só mostrar; não é preciso calcular).
8. Padronização Z = (X − μ)/σ.
9. Como ler a tabela Z (linha + coluna, animação de "cruzar").
10. Exemplo da lâmpada (com `aviso-material` E-03: 47,72%).
11. Simetria para Z negativo.
12. Desafio: Fixando U6.
