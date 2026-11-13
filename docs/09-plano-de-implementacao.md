# 09 — Plano de implementação (para o Claude Code)

Execute uma fase por vez. Ao fim de cada fase: rodar testes, mostrar o resultado ao Gustavo e só então seguir.

> Antes de tudo: ler `docs/prototipo/LEIA-ME.md`. As telas do app devem ficar iguais ao protótipo aprovado.

## Fase 0 — Base
- [x] Criar o projeto Vite + React + TS em `frontend/` com Tailwind, Framer Motion, Recharts, KaTeX, Zustand, decimal.js, React Router.
- [x] Tokens do `07` em CSS variables + fontes (Inter, JetBrains Mono). *Orbitron e tema neon foram trocados pelo tema claro do `07` (decisão de 13/11/2026).*
- [x] Layout: menu com Início / Trilhas / Calculadora / Laboratório; tema claro; responsivo.
- [x] `api/index.py` com FastAPI e rota `/api/saude`; `vercel.json`.
- [ ] Deploy de teste na Vercel (precisa da conta do Gustavo: `vercel` na raiz).

## Fase 1 — Núcleo de cálculo em Python (com testes)
- [x] `api/core/` conforme `06`, só fórmulas do `02`.
- [x] Cada função devolve valor **e** passos (texto, LaTeX, tabela, teclas da calculadora).
- [x] `api/tests/test_exemplos_material.py` lendo `data/exemplos_material.json` — 100% verde (os exemplos com erro no material testam o valor **correto**, campo `valor_correto`).
- [x] Rota `POST /api/calcular` com os módulos do `05`.

## Fase 2 — Calculadora científica
- [x] Motor TS (parser, precedência, funções, modo SD) + testes vitest.
- [x] Layout fx-82MS conforme o protótipo (conferência com foto/manual oficial da Casio pendente: o MANUAL.pdf é de normas ABNT).
- [x] `<MiniCalculadora>` com replay de teclas e modo "Eu faço".

## Fase 3 — Laboratório
- [x] Formulários L1–L8, botão "Exemplo do material".
- [x] Painel de resultados no topo, gráfico, lista de passos com mini calculadora em cada passo.
- [x] Avisos de material (E-xx) e pendências (P-xx) exibidos quando aplicável.

## Fase 4 — Trilhas
- [x] ~~Personagens SVG~~ removidos por decisão de 13/11/2026 (docs/07): "dúvida comum" e destaque azul no lugar.
- [x] `TrilhaPlayer` com os tipos de card do `03` (fala, formula, tabela-animada, passo-calculo, arrasta-solta, escolha, preencher, grafico, dica, aviso-material) e o laser apontando.
- [x] Conteúdo das 13 trilhas (do `03` + `02`).
- [x] Desafios usando `data/exercicios.json`.

## Fase 5 — Gamificação e polimento
- [x] XP, streak, medalhas, progresso no localStorage.
- [x] Acessibilidade (reduced motion, foco visível, link para pular ao conteúdo, teclado); Lighthouse: ver testes finais.
- [ ] Revisão final: percorrer cada fórmula do app e conferir a fonte no `02`. Nada sem fonte.

## Fase 6 (opcional) — Supabase
- [ ] Login e sincronização do progresso (ver `06`).
