# Protótipo das telas (aprovado em 13/11/2026)

Link do protótipo interativo (canvas no Claude):
https://claude.ai/artifact/EPkFZYU26HHC8dDf2Xpgyf

Esta pasta guarda uma cópia das telas aprovadas. **É a referência visual oficial do app.**

| Arquivo | Tela |
|---|---|
| `Main.dc.html` | Início: hero, 3 áreas, lista das 13 trilhas |
| `Trilha.dc.html` | Trilha (exemplo: Variância): etapas à esquerda, conteúdo no centro, calculadora com teclas à direita, "Dúvida comum", desafio com XP |
| `Calculadora.dc.html` | Casio fx-82MS funcional, com modo SD (MODE 2, M+ = DT, SHIFT 1 S-SUM, SHIFT 2 S-VAR) |
| `Laboratorio.dc.html` | Laboratório "Dados brutos": entrada, População/Amostra, resultados, gráfico do rol com média e mediana, passo a passo com mini calculadora |
| `canvas.json` | Índice do canvas (tamanhos das telas) |

## Como o Claude Code deve usar
- Os arquivos estão no formato `.dc.html` do canvas (não abrem direto no navegador). Use como **referência de layout, cores, textos e espaçamentos** — recriar em React + Tailwind seguindo `docs/07-design-system.md`.
- O bloco `<script type="text/x-dc">` de cada tela tem lógica reaproveitável:
  - `Calculadora.dc.html`: parser/avaliador da calculadora (precedência, x², x³, x⁻¹, x!, nCr, nPr, √, ∛, ^, ˣ√, log, ln, 10ˣ, eˣ, trigonometria em graus, Ans, EXP, π) e o modo SD. Portar para `frontend/src/calculadora/motor.ts`.
  - `Laboratorio.dc.html`: leitura dos valores, rol, média, mediana, moda, AT, desvio médio, variância (σ²/s²), desvio padrão e a montagem dos passos. No app final esses cálculos vão para o backend Python (`api/core/`), conferidos pelos testes do material.
- As outras abas do Laboratório (Tabela de frequência, Classes, Amostragem, Probabilidade, Binomial, Normal) e as outras 12 trilhas seguem o mesmo layout.
