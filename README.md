# Trilha Estatística & Probabilidade

App de estudo e revisão gamificado (neon) baseado nos slides e na apostila da disciplina.

## Estrutura
```
trilha-estatistica/
├─ CLAUDE.md                 ← regras para o Claude Code (ler primeiro)
├─ docs/
│  ├─ 01-visao-geral.md            produto, as 3 partes, personagens
│  ├─ 02-conteudo-da-materia.md    FONTE DA VERDADE: todo o conteúdo, fórmulas e exemplos
│  ├─ 03-trilhas.md                roteiro de cada trilha (falas da professora, passos, quizzes)
│  ├─ 04-calculadora-cientifica.md
│  ├─ 05-laboratorio-entrada-de-dados.md
│  ├─ 06-arquitetura.md            React+Vite, Python/FastAPI, Vercel, Supabase (não precisa)
│  ├─ 07-design-system.md          neon, cores, fontes, animações, gamificação
│  ├─ 08-divergencias-e-pendencias.md  erros do material + decisões em aberto
│  ├─ 09-plano-de-implementacao.md     fases e tarefas para o Claude Code
│  └─ prototipo/                       TELAS APROVADAS (referência visual + lógica da calculadora)
├─ data/
│  ├─ tabela_z.json                Tabela 6 da apostila (P(0≤Z≤z)), conferida
│  ├─ exemplos_material.json       todos os exemplos resolvidos (viram testes)
│  └─ exercicios.json              exercícios das aulas e "Fixando o conteúdo" com gabarito
├─ api/                            backend Python (esqueleto)
├─ frontend/                       frontend React (esqueleto)
├─ vercel.json
└─ requirements.txt
```

## Como começar no Claude Code
1. Abra esta pasta no Claude Code.
2. Peça: *"Leia o CLAUDE.md e os docs na ordem e execute a Fase 1 do docs/09-plano-de-implementacao.md"*.
3. Siga fase por fase, rodando os testes do material ao fim de cada uma.

## Material usado
`aula 1.pdf` a `aula 06.pdf` (slides) e `estatistica.pdf` (apostila, Profa. Luana Amaral Gurgel, Editora Prominas, 2024).
`MANUAL.pdf` é o manual de normas ABNT da faculdade — não tem conteúdo da matéria, então não entra no app.
