# 04 — Calculadora científica

## Objetivo
Uma calculadora científica que parece e funciona **igual a uma física**, para o aluno treinar as mesmas teclas que vai usar na prova.

## Modelo de referência
O material da disciplina não cita um modelo. **Modelo: Casio fx-82MS** (confirmado pelo Gustavo em 13/11/2026).
Visual: corpo grafite fiel ao aparelho, sobre a página clara do app; **o layout das teclas, as cores das funções secundárias (SHIFT amarelo, ALPHA vermelho) e o display de 2 linhas seguem o modelo real**.

## Layout (fx-82MS) — linhas de cima para baixo
```
[ Display: linha 1 = expressão (rolagem) | linha 2 = resultado (10 dígitos) | indicadores S A M STO RCL SD REG DEG RAD GRA FIX SCI ]

SHIFT   ALPHA        [  ◄  ▲  ▼  ►  ]        MODE    ON
x⁻¹     nCr          Pol(   x³               (cursor)
ab/c    √            x²     ^      log      ln
(−)     °'"          hyp    sin    cos      tan
RCL     ENG          (      )      ,        M+
7       8            9      DEL    AC
4       5            6      ×      ÷
1       2            3      +      −
0       .            EXP    Ans    =
```
Funções SHIFT (texto amarelo acima da tecla): x! (sobre x⁻¹), nPr (sobre nCr), Rec( (sobre Pol(), ∛ (sobre x³), d/c (sobre ab/c), 10ˣ (sobre log), eˣ (sobre ln), sin⁻¹ cos⁻¹ tan⁻¹, STO (sobre RCL), Rnd, Ran#, π (sobre EXP), DRG►, %, ⁿ√ etc.
O Claude Code deve conferir o layout exato pela foto/manual oficial do fx-82MS antes de desenhar e documentar aqui qualquer ajuste.

## Funcionalidades obrigatórias (v1)
- Modo COMP: + − × ÷, parênteses, precedência correta, (−) negativo, Ans, DEL, AC, ON.
- x², x³, ^, √, ∛, x⁻¹, x!, nCr, nPr, log, ln, 10ˣ, eˣ, π, e, %, frações ab/c ↔ decimal (S⇔D no ES / ab/c no MS), EXP.
- sin/cos/tan e inversas, modos DEG/RAD/GRA.
- Memória: M+, M−, MR, STO/RCL A–F, X, Y.
- **Modo SD (estatística)** — muito importante para a matéria: MODE → SD, entrada de dados com `DT` (tecla M+), frequência com `;`, e recuperação de: n, Σx, Σx², x̄, xσn (populacional), xσn−1 (amostral) via SHIFT S-SUM / S-VAR. Na tela, mostrar legenda ligando `xσn` → σ (populacional, divide por N) e `xσn−1` → s (amostral, divide por n − 1), como no material.
- FIX/SCI/NORM e arredondamento de exibição.
- Teclado físico do PC também funciona (números, operadores, Enter = "=", Backspace = DEL, Esc = AC).

## Comportamento
- Feedback de tecla pressionada (afunda + brilho neon + som opcional de clique, desligável).
- Mensagens de erro iguais às da calculadora: `Math ERROR`, `Syntax ERROR`, `Stack ERROR`.
- Histórico lateral (fora do "corpo" da calculadora) com as últimas contas — opcional, pode ser escondido.

## Componente reutilizável `<MiniCalculadora>`
A mesma calculadora em tamanho reduzido é usada nas Trilhas e no Laboratório:
- Props: `teclas: string[]` (ex.: `["1","3","2","8","÷","2","0","="]`), `autoplay`, `velocidade`.
- Modo **replay**: acende tecla por tecla (neon), o display vai mostrando a digitação e o resultado final. Botões: ▶ Reproduzir, ⏭ Passo, ↺ Reiniciar, ✋ "Eu faço" (o aluno digita e o app confere).
- A Profª Sigma aponta para a tecla atual durante o replay.

## Implementação
- Motor de cálculo no **frontend** (TypeScript), com parser próprio e precisão decimal (usar `decimal.js` para não ter erro de ponto flutuante tipo 0,1 + 0,2).
- Testes unitários do motor: precedência, fatorial, nCr, modo SD conferindo com os exemplos do material (ex.: 2,4,6,8,10 → xσn = 2,828427125; xσn−1 = 3,16227766).
