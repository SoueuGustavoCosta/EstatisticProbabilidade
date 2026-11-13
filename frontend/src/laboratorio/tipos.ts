// Contrato da resposta de POST /api/calcular (docs/05).
export interface Resultado { id: string; nome: string; simbolo: string; valor: unknown; exibicao: string; unidade: string | null; passo_ref: number | null; classificacao?: string }
export interface TabelaPasso { colunas?: string[]; linhas?: string[][]; rodape?: string[] | null; destaque_linhas?: number[]; tipo?: string; linha?: string; coluna?: string; chave?: string; valor?: number }
export interface PassoApi {
  n: number; titulo: string; fonte: string; formula_latex: string | null; substituicao_latex: string | null; linhas: string[]; tabela: TabelaPasso | null;
  resultado: string | null; interpretacao: string | null; dica: string | null; aviso_material: string | null; teclas_calculadora: string[];
}
export interface Grafico { tipo: string; series: Record<string, any>[]; marcadores: { nome: string; x: number }[]; area?: number[]; histograma?: { classe: string; ni: number; fi: number }[] | null }
export interface RespostaApi { resultados: Resultado[]; grafico: Grafico | null; passos: PassoApi[]; avisos: string[] }
