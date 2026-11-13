# 01 — Visão geral do produto

## Objetivo
Ajudar o aluno a aprender e revisar Estatística e Probabilidade do jeito mais fácil possível, usando **apenas** o conteúdo dos slides (aulas 1–6) e da apostila. Público: alunos de TI do 1º período (Ciência da Computação, SI, ADS) — por isso os exemplos dos slides são de TI.

> **Atualização 13/11/2026:** visual mudou para tema claro estilo Apple e os personagens foram removidos (ver `07`). Onde este documento ou o `03` falar em Profª Sigma, Dado, laser ou neon, troque por: texto da etapa + destaque azul no elemento explicado + bloco "Dúvida comum".

## Tom e identidade
- Jovem, gamificado, visual neon "cyber", mas sério no conteúdo.
- Frases curtas. Uma ideia por tela.
- Sem cara de template genérico ou de texto gerado: nada de "Vamos mergulhar", "No mundo de hoje", emojis em excesso.

## Personagens (originais)
- **Profª Sigma** — professora. Cabelo com mechas neon ciano, óculos, jaqueta roxa, segura uma caneta-laser. Ela **aponta** (laser/seta animada) para o elemento da tela que está explicando: a fórmula, a célula da tabela, a tecla da calculadora.
- **Dado** — o aluno (avatar do usuário). Um personagem em forma de cubo/dado com rosto, que reage: dúvida (?), acerto (✨), erro (😵 leve, nunca humilhante).
- Diálogo estilo balão: Profª Sigma fala, Dado às vezes pergunta o "óbvio" ("Por que dividir por 5?") e ela responde. Isso força o app a dizer o óbvio.
- Personagens em SVG próprio (ilustração original), com poses: `explicando`, `apontando`, `comemorando`, `pensando`. Dado: `neutro`, `duvida`, `feliz`, `errou`.

## As 3 partes (menu principal)
| Área | O que faz | Spec |
|---|---|---|
| 🧭 Trilhas | Mapa de fases (12 trilhas). Qualquer trilha liberada a qualquer momento. Cada trilha = sequência de "cards" curtos + mini-desafios. | `03-trilhas.md` |
| 🧮 Calculadora | Calculadora científica completa, idêntica a uma física, usável sozinha. | `04-calculadora-cientifica.md` |
| 🧪 Laboratório | Entrada de dados → resultados no topo + gráfico + todos os cálculos passo a passo com mini calculadora em cada passo. | `05-laboratorio-entrada-de-dados.md` |

## Gamificação (sem bloquear conteúdo)
- XP por card concluído e por desafio acertado.
- Sequência de dias (streak) e medalhas por trilha concluída.
- Barra de progresso por trilha. Nada fica trancado: o aluno pode abrir qualquer trilha.
- Progresso salvo no navegador (localStorage). Opção futura de login (ver `06`).

## Fora do escopo da v1
- Conteúdo que não está no material (ex.: Poisson, intervalos de confiança, teste de hipótese, correlação).
- O conteúdo do MANUAL.pdf (normas ABNT).
