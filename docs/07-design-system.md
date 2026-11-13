# 07 — Design system (claro, estilo Apple)

Decisão do Gustavo (13/11/2026): tema **claro**, limpo, estilo Apple. **Sem personagens.**
Referência visual: telas do protótipo "Trilha Estatística — Telas" (canvas no Claude).

## Princípios
- Muito espaço em branco, tipografia grande, poucos elementos por tela.
- Fundo cinza bem claro, conteúdo em cartões brancos com cantos arredondados.
- Uma cor de destaque (azul). Cores de estado só para acerto, erro e aviso.
- Gamificação discreta: XP, sequência de dias e progresso aparecem pequenos, sem confete nem brilho.

## Cores
| Token | Hex | Uso |
|---|---|---|
| `--fundo` | `#F5F5F7` | fundo das páginas internas |
| `--fundo-2` | `#FBFBFD` | fundo da página inicial |
| `--cartao` | `#FFFFFF` | cartões |
| `--linha` | `#E8E8ED` | bordas e divisórias |
| `--campo` | `#D2D2D7` | borda de campos |
| `--texto` | `#1D1D1F` | texto principal |
| `--texto-2` | `#6E6E73` | texto secundário |
| `--texto-3` | `#424245` | texto de apoio |
| `--azul` | `#0071E3` | botões, destaque, tecla atual |
| `--link` | `#0066CC` | links, resultados |
| `--azul-claro` | `#E8F2FC` | destaque suave (termo da fórmula em foco) |
| `--verde` | `#248A3D` (fundo `#E8F6EC`) | acerto, concluído |
| `--vermelho` | `#D70015` (fundo `#FDECEC`) | erro |
| `--aviso` | `#8A4B00` (fundo `#FFF4E5`) | dicas e avisos do material |
| `--laranja` | `#BF4800` / `#C93400` | sobretítulo, linha da mediana no gráfico |

## Tipografia
- **Inter** (substituto livre da SF Pro), pesos 400/500/600/700. Títulos com `letter-spacing: -0.02em`.
- Tamanhos: título da página 40–64px, seção 28px, cartão 20–24px, texto 17px, legenda 13px.
- **JetBrains Mono** para contas, fórmulas, tabelas de cálculo e teclas.
- Números com `font-variant-numeric: tabular-nums`.

## Componentes
- Barra superior branca translúcida, 52px, links de texto (sem botões coloridos).
- Botão principal: pílula azul (`border-radius: 980px`). Secundário: pílula cinza `#F0F0F3` com texto azul. Link: texto azul com "›".
- Cartões: branco, raio 18–22px, sombra mínima `0 2px 12px rgba(0,0,0,.05)`.
- Controle segmentado (População | Amostra) no estilo iOS.
- Destaque do que está sendo explicado: fundo `--azul-claro` + contorno azul de 2px (substitui a "professora apontando").
- "Dúvida comum": bloco recolhível cinza (`<details>`) — é onde o óbvio é dito.
- Calculadora: o aparelho continua fiel à Casio fx-82MS (corpo grafite, visor verde). Só o entorno é claro.
- Mini calculadora dos passos: visor verde + teclas em chips cinza; a tecla atual fica azul.

## Movimento
Suave e curto (150–250 ms). `prefers-reduced-motion` desliga tudo.
