# 05 — Laboratório (entrada de dados)

## Layout da tela (sempre nesta ordem)
1. **Seletor de cálculo** (abas/cards neon): escolher o tipo de problema.
2. **Formulário de entrada** + botão grande **CALCULAR**.
3. Depois de calcular, a página rola para:
   - **Topo — Painel de resultados**: cards com todos os resultados (valor grande + nome + símbolo). Clicar num card leva ao passo correspondente.
   - **Gráfico** (Recharts) adequado ao tipo de dado.
   - **Passo a passo completo**: lista numerada de passos. Cada passo: título, fórmula (KaTeX) com fonte, substituição dos números, conta intermediária, resultado, interpretação, 💡 dica opcional e uma **mini calculadora** com as teclas daquele passo (`<MiniCalculadora>` do `04`).
4. Botões: "Copiar resultados", "Exportar PDF" (v2), "Exemplo do material" (preenche o formulário com um exemplo do `data/exemplos_material.json`).

Regras:
- **Nenhum passo pulado.** Ex.: na média, mostrar a soma termo a termo (`84 + 67 + 80 + …`), o total, a divisão e o resultado.
- Proibido usar fórmula fora do `docs/02`. Se o tipo de dado pedir algo que o material não tem, mostrar: "Este cálculo não está no material da disciplina" e não calcular.
- Exibição com vírgula decimal. Precisão interna total; arredondar só na exibição (padrão 2 casas, configurável 0–6). Quando arredondar, mostrar "≅".
- Validação amigável: aceitar números separados por vírgula+espaço, ponto-e-vírgula, espaço, quebra de linha ou traço (como "84 – 67 – 80" no material). Aceitar vírgula decimal ("56,75").

---

## Módulos do Laboratório

### L1. Dados brutos (lista de números) — o principal
**Entrada:** lista de valores; toggle **"Os dados são: ( ) População ( ) Amostra"** (obrigatório — define σ² ou s²); unidade opcional (s, min, ms, pontos…).
**Resultados (topo):** n, Σx, mínimo, máximo, AT, média, mediana, moda (+ classificação uni/bi/multi/amodal), desvio médio, variância (σ² ou s²), desvio padrão (σ ou s), Q1, Q2, Q3, coeficientes de assimetria (1º e 2º Pearson, momento, quartil) com a classificação (simétrica / positiva / negativa).
**Passos:**
1. Dados brutos (como digitados).
2. Rol (antes → depois, animado).
3. n (contagem, mostrando os índices x1…xn).
4. Σx (soma termo a termo).
5. Média.
6. Mediana (par/ímpar explicado; posição(ões) destacada(s)).
7. Moda (tabela de contagem de repetições → maior frequência → classificação).
8. Amplitude total.
9. Desvio médio (tabela: xi | xi − x̄ | |xi − x̄|; soma; divisão).
10. Variância (tabela: xi | xi − x̄ | (xi − x̄)²; soma; divide por n ou n − 1 conforme o toggle, explicando o porquê e a correção de Bessel se amostra).
11. Desvio padrão (raiz).
12. Quartis (metade inferior e superior, mediana de cada uma — método do material).
13. Assimetria: cada coeficiente com sua fórmula. **σ nos coeficientes = desvio padrão populacional** (ver D-03 no `08`); se a moda não existir ou houver mais de uma, o 1º Pearson mostra "não se aplica (distribuição amodal/bimodal)".
14. Tabela de frequência sem classes (xi | ni | fi%).
15. Tabela de frequência com classes (passos 01–06 do A4) — ver pendências P-01 e P-03.
**Gráficos:** barras de frequência (sem classes) e histograma (com classes); linhas verticais neon marcando média, mediana e moda (ajuda a ver a assimetria).

### L2. Tabela de frequência (valor xi + frequência ni)
Ex.: aula 5 ex. 2 (publicações 0–4 com 6, 8, 12, 10, 4 profissionais).
**Entrada:** tabela editável (adicionar/remover linhas) + toggle população/amostra.
**Resultados:** Σni, fi% de cada linha, média ponderada, mediana, moda, AT, desvio médio, variância, desvio padrão, percentuais acumulados por consulta ("% com menos de 3").
**Passos:** como L1, sempre mostrando a coluna `xi·ni`, e nas dispersões a coluna multiplicada por ni (cada valor conta ni vezes — regra do A4 "considerar quantas vezes cada valor ocorre").
**Gráfico:** barras (xi × ni).

### L3. Tabela com classes (intervalos + frequência)
Ex.: notas (32,48]…(80,96]; idades [16,20)…[28,32); salários [800;900)…
**Entrada:** linhas com limite inferior, limite superior, tipo de intervalo ( `(a,b]` ou `[a,b)` ) e ni; marcar se os dados são inteiros.
**Resultados:** pontos médios, fi%, média ponderada, AT, (dispersões usando pontos médios — ver P-02).
**Passos:** ponto médio de cada classe mostrado como no material (`(33+48)/2 = 40,5`), produtos xi·ni, soma, divisão.
**Gráfico:** histograma.

### L4. Montar distribuição de frequência a partir dos dados
Ex.: atividade A4 nº 1 (50 dias de montagem de galpão), nº 3 (100 alturas).
Usa K ≅ √N, AT, h ≅ AT/K (arredondar para cima), monta classes, conta ni, calcula fi, confere somas. Ver P-03 sobre arredondamento de K e ponto de partida da 1ª classe — o app deve deixar o aluno **escolher/ajustar** K, h e o limite inicial, mostrando a regra do material como dica.

### L5. Amostragem
- **Sistemática:** N, n, ponto de partida → k = N/n (arredondado para baixo se não inteiro, regra A1) e lista dos elementos selecionados.
- **Estratificada:** nome e tamanho de cada estrato + n → (estrato/N) × n para cada um; tabela final e conferência da soma. Ver P-07 (arredondamento).

### L6. Probabilidade
- **Clássica:** casos favoráveis e totais → P(A) em fração, decimal e %.
- **Condicional:** P(A ∩ B) e P(B) → P(A|B).
- **Independência:** P(A), P(B), P(A ∩ B) → verifica se P(A ∩ B) = P(A)·P(B).
- **Bayes:** tabela com eventos Bi, P(Bi) e P(A|Bi) → P(Bi|A) para cada i. Gráfico: árvore de probabilidades.

### L7. Binomial
**Entrada:** n, p (aceita fração "1/5"), k (ou faixa "k ≥ 3").
**Resultados:** q, P(k) (fração e decimal), média np, variância npq.
**Passos:** q = 1 − p; fatoriais expandidos (6! = 6·5·4·3·2·1); n!/(k!(n−k)!); p^k; q^(n−k); produto final. Para faixas, soma de cada P(k) mostrada separada.
**Gráfico:** barras de P(k) para k = 0…n, destacando o k pedido.

### L8. Normal
**Entrada:** μ, σ (ou σ² — converte com raiz e mostra o passo), limite a, limite b.
**Resultados:** Z de cada limite, valor(es) da tabela, probabilidade final em decimal e %.
**Passos:** Z = (X − μ)/σ para cada limite; arredondar Z para 2 casas (para usar a tabela); busca na tabela (mostrar a **Tabela Z com a linha e a coluna acendendo** até o cruzamento); simetria se Z negativo; combinação das áreas. Ver P-08 sobre os casos que o material não exemplifica.
**Gráfico:** curva em sino com a área pintada em neon.

---

## Contrato da API (Python)
`POST /api/calcular`
```json
{ "modulo": "dados_brutos", "tipo_dados": "amostra", "valores": [84, 67, 80], "casas": 2 }
```
Resposta:
```json
{
  "resultados": [ { "id": "media", "nome": "Média", "simbolo": "x̄", "valor": 66.4, "exibicao": "66,4", "unidade": "pontos", "passo_ref": 5 } ],
  "grafico": { "tipo": "barras", "series": [], "marcadores": [ {"nome":"Média","x":66.4} ] },
  "passos": [
    {
      "n": 5,
      "titulo": "Média aritmética",
      "fonte": "Aula 02 · Média aritmética simples / Apostila p.24",
      "formula_latex": "\\bar{x}=\\frac{\\sum x_i}{k}",
      "substituicao_latex": "\\bar{x}=\\frac{1328}{20}",
      "linhas": ["Somamos todos os valores: 1328", "Dividimos pela quantidade de valores: 20", "1328 ÷ 20 = 66,4"],
      "tabela": null,
      "resultado": "66,4",
      "interpretacao": "Em média, as notas foram de 66,4 pontos.",
      "dica": null,
      "aviso_material": null,
      "teclas_calculadora": ["1","3","2","8","÷","2","0","="]
    }
  ],
  "avisos": []
}
```
Cada módulo tem seu `modulo` (`dados_brutos`, `tabela_frequencia`, `tabela_classes`, `montar_classes`, `amostragem_sistematica`, `amostragem_estratificada`, `prob_classica`, `prob_condicional`, `independencia`, `bayes`, `binomial`, `normal`).
