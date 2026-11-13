# CLAUDE.md — Trilha Estatística & Probabilidade

Leia este arquivo inteiro antes de escrever qualquer código.

## O que é o projeto
App web para estudar e revisar a matéria **Estatística e Probabilidade** (Centro Universitário Uniúnica).
Três partes:
1. **Trilhas**: aulas curtas, uma coisa de cada vez, mostrando todo cálculo. Visual claro estilo Apple, sem personagens (ver `docs/07`).
2. **Calculadora científica**: réplica funcional de uma calculadora científica física.
3. **Laboratório** (entrada de dados): o aluno digita os dados, aperta "Calcular" e vê: resultados no topo, gráfico, e abaixo todos os cálculos passo a passo, cada passo com uma mini calculadora mostrando as teclas.

Specs completas em `docs/`. Ordem de leitura: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → 09 → `docs/prototipo/`.

## REGRA Nº 1 — NUNCA INVENTAR
- Toda fórmula, definição, regra de arredondamento, exemplo e exercício vem **só** de `docs/02-conteudo-da-materia.md`, que foi extraído dos slides (aulas 1–6) e da apostila `estatistica.pdf`.
- Se precisar de algo que não está lá, **não crie**: adicione em `docs/08-divergencias-e-pendencias.md` como pendência e pergunte ao Gustavo.
- Dicas (💡) são permitidas, mas não podem trazer fórmula ou número novo.
- Cada fórmula exibida no app mostra a fonte (ex.: "Aula 04 · slide Variância Amostral" ou "Apostila p. 33").
- Os erros encontrados no material estão em `docs/08`. O app calcula o valor **correto** e mostra um aviso "⚠️ No material aparece X" quando o exemplo for usado.

## REGRA Nº 2 — O ÓBVIO TEM QUE SER DITO
Nenhum passo pulado. Ex.: média = mostrar a soma termo a termo, o total, a divisão e o resultado. Ordenar o rol = mostrar a lista antes e depois.

## Stack
- Frontend: React + Vite (TypeScript), Tailwind CSS, Framer Motion (animações), Recharts (gráficos), KaTeX (fórmulas).
- Visual: seguir `docs/07` e as telas aprovadas em `docs/prototipo/` (tema claro, estilo Apple). Ler `docs/prototipo/LEIA-ME.md` antes de criar qualquer tela. A lógica da calculadora e do laboratório no protótipo pode ser reaproveitada.
- Backend: Python (FastAPI) em `api/` como Serverless Function na Vercel. Funções puras em `api/core/` (sem dependências pesadas — só `math`, `fractions`, `decimal`).
- Hospedagem: Vercel (front estático + `/api/*`).
- Supabase: **não precisa** na v1. Progresso do aluno (XP, trilhas concluídas) fica no `localStorage`. Ver `docs/06`.

## Convenções
- Interface 100% em português do Brasil. Vírgula decimal na exibição (`66,4`), ponto internamente.
- Backend devolve sempre `{ resultados, grafico, passos[] }` — formato em `docs/05`.
- Cada passo tem `teclas_calculadora` (sequência de teclas) para a mini calculadora reproduzir.
- Testes: `api/tests/test_exemplos_material.py` usa `data/exemplos_material.json`. **Todos os exemplos do material têm que passar** antes de qualquer deploy.
- Não use texto com "cara de IA" na interface: frases curtas, tom de professora jovem, sem clichês.
