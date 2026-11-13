// Tipos de card das trilhas (docs/03). Sem personagens (docs/07): "fala" é o texto da etapa e a
// "dúvida comum" (<details>) é onde o óbvio é dito.
export interface Duvida { p: string; r: string }

export type Card =
  | { tipo: "fala"; titulo?: string; texto: string; lista?: string[]; duvida?: Duvida }
  | { tipo: "formula"; titulo?: string; latex: string; termos: [string, string][]; fonte: string; texto?: string; duvida?: Duvida }
  | { tipo: "tabela"; titulo?: string; colunas: string[]; linhas: string[][]; fonte?: string; texto?: string; animada?: boolean; destaque?: number[] }
  | { tipo: "calculo"; titulo: string; linhas: string[]; teclas: string[]; resultado: string; fonte: string; latex?: string; duvida?: Duvida }
  | { tipo: "dica"; texto: string }
  | { tipo: "aviso"; texto: string }
  | { tipo: "escolha"; pergunta: string; opcoes: string[]; correta: number; explicacao: string }
  | { tipo: "preencher"; pergunta: string; resposta: number; explicacao: string; unidade?: string }
  | { tipo: "classificar"; pergunta: string; categorias: string[]; itens: [string, number][]; explicacao: string }
  | { tipo: "grafico"; titulo: string; kind: "barras" | "linhas"; dados: { x: string; y: number }[]; fonte: string; texto?: string };

export interface Trilha { num: number; titulo: string; fonte: string; cards: Card[] }
