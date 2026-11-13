# 08 — Erros do material, divergências e pendências

Conferi os exemplos e gabaritos do material fazendo as contas. O app **nunca reproduz um resultado errado como certo**: calcula o valor correto e, quando usar aquele exemplo, mostra o card `aviso-material` ("⚠️ No material aparece X; refazendo a conta dá Y").

## Erros encontrados (E)
| ID | Onde | O que o material diz | Conta correta |
|---|---|---|---|
| E-01 | Apostila p.40, Exemplo 4.2 (momento de assimetria, dados 2, 3, 4) | As ≅ 2/1,65 ≅ 1,21 (assimétrica positiva) | Σ(xi − x̄)³ = (−1)³ + 0³ + 1³ = 0 → **As = 0 (simétrica)**. Faz sentido: 2, 3, 4 é simétrico. |
| E-02 | Apostila p.41, Exemplo 4.3 (coef. quartil, dados 2, 3, 4, 1, 2) | (1,5 + 3,5 − 2)/(3,5 − 1,5) = 3/2 = 1,5 | O termo é 2·Me = 2·2 = 4 → (1,5 + 3,5 − 4)/2 = **0,5** (positiva). |
| E-03 | Apostila p.57, Exemplo 6.2 (lâmpada) | 0,4772 = 42,72% | 0,4772 = **47,72%** (erro de digitação). |
| E-04 | Apostila p.43 + gabarito p.60, Unidade 4 Q7 e Q8 (dados {2,2,3,4,5,5,14}) | Q7 (momento) = C (0,78); Q8 (2º Pearson) = D (1,67) | Calculando com σ populacional (3,85): **momento ≅ 1,66** e **2º Pearson ≅ 0,78** → as respostas estão trocadas entre Q7 e Q8. |
| E-05 | Apostila p.58–59, Unidade 6 Q5 (binomial n = 10, p = 0,05, k = 2) | Gabarito B = 7,65% | Conta exata = 0,0746 = **7,46%**. B é a alternativa mais próxima. Mostrar a conta exata e avisar. |
| E-06 | Apostila p.33, Exemplo 3.2 (desvio médio das 20 notas) | Diz "vamos calcular o desvio médio" mas mostra as frequências relativas (erro de diagramação); não traz o resultado | Aplicando a fórmula do material: Σ|xi − 66,4| = 304 → dm = 304/20 = **15,2**. Mostrar com o aviso "o material não traz este resultado". |

## Divergências entre slides e apostila (D) — decisão tomada
| ID | Assunto | Slides | Apostila | Decisão |
|---|---|---|---|---|
| D-01 | Duas modas | "Bimodal" (A2) | "Se tivermos dois valores com frequência máxima igual … amodal" (p.26) | **Seguir os slides** (unimodal, bimodal, multimodal, amodal). Na trilha, card de dica citando que a apostila usa outra convenção. |
| D-02 | Símbolo da variância/desvio amostral | s² e s | σ² e σ para os dois casos | Usar **s² / s** para amostra e **σ² / σ** para população (slides). |
| D-03 | σ nos coeficientes de assimetria | — | "σ o desvio padrão" | Usar **σ populacional**: é o que o Exemplo 4.2 usa (σ = √(2/3)) e o que bate com os valores do gabarito da U4. Mostrar isso como dica no passo. |
| D-04 | Mediana da apostila (Exemplo 2.3) | — | usa índices x_{n/2} e x_{n/2+1} | Igual aos slides; sem conflito. |

## Pendências (P) — perguntar ao Gustavo/professor antes de fechar
| ID | Assunto | O que o material mostra | O que falta | Proposta |
|---|---|---|---|---|
| ~~P-01~~ ✅ | Ponto médio de classe | (32,48] → (33 + 48)/2 = 40,5: usa o **primeiro inteiro dentro da classe**, não 32 | Regra para classes `[a,b)` (ex.: idades [16,20) na A6, salários [800;900) na A4) e para dados contínuos — o material não resolve esses | Implementar como opção: "Regra do material (dados inteiros)" vs "(limite inferior + limite superior)/2". **Não escolher sozinho** — confirmar. |
| P-02 | Desvio médio/variância com classes | Exercício A6 nº 3 pede, mas o material não mostra a resolução | Confirmar que se usa o ponto médio como valor representativo (como na média ponderada, A2) | Usar ponto médio × ni, com dica explicando a origem (A2). Confirmar. |
| P-03 | K, h e início da 1ª classe | K ≅ √N; h ≅ AT/K arredondando h para cima; exemplo final (32,48]…(80,96] | Como arredondar K (√20 ≅ 4,47 → 4?) e por que a 1ª classe começa em 32 (a apostila diz "de 33 até 96 temos 64 números inteiros", 64/4 = 16) | No L4 o app sugere e o aluno pode ajustar K, h e o limite inicial; mostrar as duas leituras do exemplo (AT = 63 → 63/4 = 15,75 → 16; ou 64 inteiros/4 = 16). |
| P-04 | Variância com tabela de frequência | Slide A4 para na tabela (falhas 1, 2, 3 com ni 2, 3, 1); apostila 3.3 repete o termo `2(41 − 66,4)²` | A fórmula com ni não aparece escrita | Mostrar a soma **repetindo cada valor ni vezes** (exatamente a forma do material) e depois agrupar como ni·(xi − x̄)². |
| ~~P-06~~ ✅ | Modelo da calculadora | Não citado | Qual calculadora a turma usa | Padrão fx-82MS; confirmar. |
| ~~P-07~~ ✅ | Arredondamento na estratificada | Exemplos dão inteiros (40/30/30; 125/125/250) | Exercício A3 nº 3 (35/250 × 40 = 5,6…) não dá inteiro | Mostrar o valor exato e a conferência da soma; não arredondar sozinho até confirmar a regra. |
| ~~P-08~~ ✅ | Casos da Normal | P(0 ≤ Z ≤ z), simetria para Z negativo, área total = 1 (U6 Q2), exercício somando dois lados (−0,10 e 0,20) | Os casos "mesmo lado da média" (subtrair áreas) e "cauda" (0,5 − área) não aparecem como exemplo | Liberar na v1 só: [0, z], [−z, 0] e intervalo que cruza a média (soma). Os outros ficam desligados até confirmar. |

Atualizar este arquivo sempre que uma pendência for resolvida (anotar data e quem decidiu).

## Decisões do Gustavo (13/11/2026)
- **P-01 — Ponto médio.** Parêntese = limite NÃO conta; colchete = limite conta. Então o ponto médio usa o **primeiro e o último valor que pertencem à classe**:
  - `(32, 48]` → 32 não conta, 48 conta → (33 + 48) ÷ 2 = 40,5 (igual ao material).
  - `[16, 20)` → 16 conta, 20 não conta → (16 + 19) ÷ 2 = 17,5.
  - Vale para dados inteiros (como nos exemplos do material). Para dados com decimais, o material não tem exemplo: manter como pendência se aparecer.
- **P-06 — Calculadora.** Casio fx-82MS.
- **P-07 — Estratificada.** Quando não der inteiro, **arredondar para cima**. Mostrar o valor exato, o arredondado e um aviso se a soma da amostra passar de n.
- **P-08 — Normal.** Só os casos da apostila: P(0 ≤ Z ≤ z), simetria para Z negativo e intervalo que cruza a média (soma das duas áreas, como no exercício U6 Q8). Os outros casos ficam fora.
