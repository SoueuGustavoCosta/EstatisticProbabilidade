// Configuração dos módulos do Laboratório (docs/05): campos do formulário <-> pedido da API.
import exemplosJson from "../../../data/exemplos_material.json";

type Valor = string | string[][];
interface Base { chave: string; rotulo: string; ajuda?: string; opcional?: boolean; aApi?: (v: any) => unknown; deApi?: (v: any) => Valor }
export type Campo =
  | (Base & { tipo: "area"; placeholder?: string })
  | (Base & { tipo: "texto"; placeholder?: string })
  | (Base & { tipo: "seg"; opcoes: [string, string][]; padrao: string })
  | (Base & { tipo: "linhas"; colunas: string[]; padrao: string[][] });

export interface Modulo { id: string; rotulo: string; api: string; exemploDe: string; campos: Campo[]; intro: string }

const PD: Campo = { chave: "tipo_dados", rotulo: "Os dados são", tipo: "seg", padrao: "amostra", opcoes: [["populacao", "População"], ["amostra", "Amostra"]] };
const UN: Campo = { chave: "unidade", rotulo: "Unidade (opcional)", tipo: "texto", opcional: true, placeholder: "s, min, ms, pontos…" };
const INTERVALO: Campo = { chave: "intervalo", rotulo: "Intervalo das classes", tipo: "seg", padrao: "(a,b]", opcoes: [["(a,b]", "( a, b ]"], ["[a,b)", "[ a, b )"], ["[a,b]", "[ a, b ]"], ["(a,b)", "( a, b )"]] };
const t = (chave: string, rotulo: string, extra: Partial<Base & { placeholder: string }> = {}): Campo => ({ chave, rotulo, tipo: "texto", ...extra });

const linhasVazias = (rows: string[][]) => rows.filter((r) => r.some((c) => c.trim() !== ""));

export const MODULOS: Modulo[] = [
  { id: "dados_brutos", rotulo: "Dados brutos", api: "dados_brutos", exemploDe: "dados_brutos", intro: "Lista de números: média, mediana, moda, dispersão, quartis e assimetria.",
    campos: [{ chave: "valores", rotulo: "Valores", tipo: "area", placeholder: "84, 67, 80, 33…  (vírgula, ponto e vírgula, espaço, linha nova ou traço)", ajuda: "Vírgula decimal vale: 56,75." }, PD, UN] },
  { id: "tabela_frequencia", rotulo: "Tabela de frequência", api: "tabela_frequencia", exemploDe: "tabela_frequencia", intro: "Valores xi com a frequência ni de cada um.",
    campos: [{ chave: "tabela", rotulo: "Tabela", tipo: "linhas", colunas: ["xi", "ni"], padrao: [["", ""], ["", ""], ["", ""]], aApi: (r: string[][]) => linhasVazias(r), deApi: (v: unknown[][]) => v.map((l) => l.map(String)) }, PD, UN,
      t("menos_de", "% com menos de… (opcional)", { opcional: true })] },
  { id: "tabela_classes", rotulo: "Tabela com classes", api: "tabela_classes", exemploDe: "tabela_classes", intro: "Classes com limites e frequência. O valor de cada classe é o ponto médio.",
    campos: [{ chave: "classes", rotulo: "Classes", tipo: "linhas", colunas: ["limite inferior", "limite superior", "ni"], padrao: [["", "", ""], ["", "", ""], ["", "", ""]], aApi: (r: string[][]) => linhasVazias(r), deApi: (v: unknown[][]) => v.map((l) => l.map(String)) },
      INTERVALO, { chave: "dados_inteiros", rotulo: "Os dados são", tipo: "seg", padrao: "true", opcoes: [["true", "Inteiros"], ["false", "Com decimais"]], aApi: (v: string) => v === "true", deApi: (v: boolean) => String(v) }, PD, UN] },
  { id: "montar_classes", rotulo: "Montar classes", api: "montar_classes", exemploDe: "tabela_classes_a_partir_dados", intro: "A partir dos dados: K, h, classes, ni e fi. Você pode ajustar K, h e o início.",
    campos: [{ chave: "valores", rotulo: "Valores", tipo: "area", placeholder: "84, 67, 80, 33…" }, INTERVALO,
      t("K", "K (nº de classes)", { opcional: true, ajuda: "Em branco = sugestão √N." }), t("h", "h (amplitude)", { opcional: true }), t("inicio", "Início da 1ª classe", { opcional: true }),
      { chave: "classes", rotulo: "Ou classes prontas", tipo: "linhas", colunas: ["limite inferior", "limite superior"], padrao: [["", ""], ["", ""]], opcional: true, aApi: (r: string[][]) => linhasVazias(r), deApi: (v: unknown[][]) => v.map((l) => l.map(String)) }] },
  { id: "amostragem_sistematica", rotulo: "Amostragem sistemática", api: "amostragem_sistematica", exemploDe: "amostragem_sistematica", intro: "k = N ÷ n, arredondado para baixo.",
    campos: [t("N", "N (população)"), t("n", "n (amostra)"), t("inicio", "Ponto de partida (opcional)", { opcional: true })] },
  { id: "amostragem_estratificada", rotulo: "Amostragem estratificada", api: "amostragem_estratificada", exemploDe: "amostragem_estratificada", intro: "Cada estrato entra com (estrato ÷ N) × n. Se não der inteiro, arredonda sem mudar o total da amostra.",
    campos: [{ chave: "estratos", rotulo: "Estratos", tipo: "linhas", colunas: ["nome", "tamanho"], padrao: [["", ""], ["", ""]],
      aApi: (r: string[][]) => Object.fromEntries(linhasVazias(r).map(([a, b]) => [a.trim(), b])), deApi: (v: Record<string, number>) => Object.entries(v).map(([a, b]) => [a, String(b)]) }, t("n", "n (amostra)")] },
  { id: "prob_classica", rotulo: "Probabilidade clássica", api: "prob_classica", exemploDe: "prob_classica", intro: "Casos favoráveis ÷ casos totais.",
    campos: [{ ...t("favoraveis", "Casos favoráveis", { ajuda: "Pode ser mais de um evento: 3, 3, 2" }), aApi: (v: string) => { const p = v.split(/[;,\s]+/).filter(Boolean); return p.length > 1 ? p : p[0]; }, deApi: (v: unknown) => (Array.isArray(v) ? v.join(", ") : String(v)) }, t("total", "Casos totais")] },
  { id: "prob_condicional", rotulo: "Probabilidade condicional", api: "prob_condicional", exemploDe: "prob_condicional", intro: "P(A|B) = P(A ∩ B) ÷ P(B). Aceita fração (1/10) e produto (1/10*4/9).",
    campos: [t("P_A_inter_B", "P(A ∩ B)"), t("P_B", "P(B)")] },
  { id: "independencia", rotulo: "Independência", api: "independencia", exemploDe: "independencia", intro: "Confere se P(A ∩ B) = P(A) · P(B).",
    campos: [t("P_A", "P(A)"), t("P_B", "P(B)"), t("P_A_inter_B", "P(A ∩ B)")] },
  { id: "bayes", rotulo: "Bayes", api: "bayes", exemploDe: "bayes", intro: "Eventos Bi (disjuntos, somando 1) e a chance do evento observado em cada um.",
    campos: [{ chave: "eventos", rotulo: "Eventos Bi", tipo: "linhas", colunas: ["nome", "P(Bi)", "P(evento | Bi)"], padrao: [["A", "", ""], ["B", "", ""]],
      aApi: (r: string[][]) => Object.fromEntries(linhasVazias(r).map(([n, p, c]) => [n.trim(), { P: p, P_dado: c }])),
      deApi: (v: Record<string, Record<string, number>>) => Object.entries(v).map(([n, o]) => [n, String(o.P), String(Object.entries(o).find(([k]) => k !== "P")![1])]) },
      t("alvo", "Evento Bi que você quer (nome)", { ajuda: "Ex.: A" }), t("evento", "Nome do evento observado (opcional)", { opcional: true, placeholder: "D" })] },
  { id: "binomial", rotulo: "Binomial", api: "binomial", exemploDe: "binomial", intro: "n tentativas, probabilidade de sucesso p e k sucessos.",
    campos: [t("n", "n (tentativas)"), t("p", "p (sucesso)", { ajuda: "Aceita fração: 1/5" }), t("k", "k", { ajuda: "Um número (3) ou faixa (≥ 3, ≤ 2)." })] },
  { id: "normal", rotulo: "Normal", api: "normal", exemploDe: "normal", intro: "P(a ≤ X ≤ b). Só os casos da apostila: [0, z], [−z, 0] e intervalo que cruza a média.",
    campos: [t("mu", "μ (média)"), t("sigma", "σ (desvio padrão)", { opcional: true }), t("variancia", "σ² (variância)", { opcional: true, ajuda: "Preencha σ ou σ²." }), t("a", "Limite a"), t("b", "Limite b")] },
];

export interface ExemploJson { id: string; fonte: string; modulo: string; entrada: Record<string, unknown> }
export const exemplosDo = (m: Modulo): ExemploJson[] => (exemplosJson.exemplos as ExemploJson[]).filter((e) => e.modulo === m.exemploDe);

export type Valores = Record<string, Valor>;
export const padroes = (m: Modulo): Valores => Object.fromEntries(m.campos.map((c) => [c.chave, c.tipo === "seg" ? c.padrao : c.tipo === "linhas" ? c.padrao.map((l) => [...l]) : ""]));

export function deExemplo(m: Modulo, entrada: Record<string, unknown>): Valores {
  const base = padroes(m);
  for (const c of m.campos) {
    const v = entrada[c.chave];
    if (v === undefined) continue;
    if (c.deApi) base[c.chave] = c.deApi(v);
    else if (c.tipo === "area") base[c.chave] = Array.isArray(v) ? v.join(", ") : String(v);
    else base[c.chave] = String(v);
  }
  return base;
}

export function paraPedido(m: Modulo, valores: Valores, casas: number): Record<string, unknown> {
  const p: Record<string, unknown> = { modulo: m.api, casas };
  for (const c of m.campos) {
    const v = valores[c.chave];
    const vazio = typeof v === "string" ? v.trim() === "" : v.every((l) => l.every((x) => x.trim() === ""));
    if (vazio && c.opcional) continue;
    p[c.chave] = c.aApi ? c.aApi(v) : v;
  }
  return p;
}
