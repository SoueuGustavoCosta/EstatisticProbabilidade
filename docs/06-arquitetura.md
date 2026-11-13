# 06 — Arquitetura

## Visão
```
Navegador (React + Vite, SPA)
  ├─ Trilhas  ── conteúdo estático (JSON/TS) + MiniCalculadora + quizzes
  ├─ Calculadora ── motor 100% no front (TypeScript + decimal.js)
  └─ Laboratório ── POST /api/calcular ──► Vercel Serverless Function (Python / FastAPI)
                                              └─ api/core/*.py (funções puras)
Progresso: localStorage
```

## Por que o cálculo do Laboratório fica em Python
Pedido do projeto. As funções puras em `api/core/` geram os resultados **e** os passos (textos, tabelas, teclas da calculadora). Assim existe um único lugar com as fórmulas, testado contra os exemplos do material.

## Supabase: precisa?
**Não na v1.** Nada exige servidor de dados: conteúdo é estático, cálculos são sem estado, progresso cabe no localStorage.
Usar Supabase só se quiser depois (v2):
- login para salvar progresso entre dispositivos;
- ranking/turma (professor acompanhar alunos);
- salvar "minhas listas de dados".
Se for usar, criar tabelas `perfis`, `progresso_trilha`, `conjuntos_dados` com RLS por `auth.uid()`.

## Estrutura de pastas
```
trilha-estatistica/
├─ api/
│  ├─ index.py                 FastAPI app (rota /api/calcular, /api/saude)
│  ├─ core/
│  │  ├─ formatacao.py         vírgula decimal, "≅", frações
│  │  ├─ passos.py             dataclasses Passo, Resultado, Resposta
│  │  ├─ teclas.py             gera sequência de teclas da calculadora para uma conta
│  │  ├─ posicao.py            média, ponderada, mediana, moda
│  │  ├─ dispersao.py          AT, desvio médio, variância, desvio padrão
│  │  ├─ frequencia.py         tabelas sem/com classes, K, h, ponto médio
│  │  ├─ assimetria.py         Pearson 1 e 2, momento, quartis, coef. quartil
│  │  ├─ amostragem.py         sistemática, estratificada
│  │  ├─ probabilidade.py      clássica, condicional, independência, Bayes
│  │  └─ distribuicoes.py      binomial, normal (usa data/tabela_z.json)
│  ├─ modulos/                 um arquivo por módulo do Laboratório (monta a Resposta)
│  └─ tests/
│     └─ test_exemplos_material.py
├─ data/                       JSONs (tabela Z, exemplos, exercícios)
├─ frontend/
│  ├─ index.html
│  ├─ package.json, vite.config.ts, tailwind.config.ts, tsconfig.json
│  └─ src/
│     ├─ main.tsx, App.tsx, rotas.tsx
│     ├─ estilos/ (tokens neon do docs/07)
│     ├─ personagens/ (SVG Profª Sigma e Dado + poses)
│     ├─ componentes/ (Card, Formula, TabelaAnimada, Grafico, Balao, Laser, Quiz, Xp…)
│     ├─ calculadora/ (motor.ts, layout-fx82ms.ts, Calculadora.tsx, MiniCalculadora.tsx)
│     ├─ trilhas/ (conteúdo das 13 trilhas em TS/JSON + TrilhaPlayer.tsx)
│     ├─ laboratorio/ (formulários por módulo, PainelResultados, ListaPassos)
│     ├─ progresso/ (store com Zustand + persistência localStorage)
│     └─ api.ts
├─ vercel.json
└─ requirements.txt
```

## Vercel
- Framework: Vite (build em `frontend/`, saída `frontend/dist`).
- Python Functions em `api/` (runtime Python 3.12). `vercel.json` faz o rewrite de `/api/(.*)` para `api/index.py` e o resto para o SPA.
- Sem variáveis de ambiente na v1.

## Qualidade
- `pytest` nos exemplos do material (obrigatório verde).
- `vitest` no motor da calculadora.
- Lighthouse: acessibilidade ≥ 90 (contraste do neon, foco visível, navegação por teclado, `prefers-reduced-motion` desliga animações fortes).
- Responsivo: celular primeiro (alunos estudam no celular), calculadora ocupando a tela no mobile.
