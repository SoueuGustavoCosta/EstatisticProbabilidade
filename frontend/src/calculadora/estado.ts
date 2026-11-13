// Estado e teclas da fx-82MS: `aperta(estado, idDaTecla)` é uma função pura (usada pela página e pela MiniCalculadora).
import Decimal from "decimal.js";
import { Ang, ErroCalc, Exib, Tok, avaliar, formatar, paraFracao } from "./motor";

type Menu = "mode0" | "mode1" | "mode2" | "fixdig" | "scidig" | "normsel" | "clr" | "svar" | "ssum";

export interface Estado {
  toks: Tok[];
  res: string;
  ans: Decimal;
  fresh: boolean;
  shift: boolean;
  alpha: boolean;
  pend: "sto" | "rcl" | null;
  sd: boolean;
  ang: Ang;
  exib: Exib;
  menu: Menu | null;
  dados: Decimal[];
  vars: Record<string, Decimal>;
  msg: string;
  erro: boolean;
  emFracao: boolean;
  hist: { e: string; r: string }[];
}

export const inicial = (): Estado => ({
  toks: [], res: "0", ans: new Decimal(0), fresh: false, shift: false, alpha: false, pend: null, sd: false,
  ang: "DEG", exib: { tipo: "norm", n: 1 }, menu: null, dados: [], vars: {}, msg: "", erro: false, emFracao: false, hist: [],
});

const OPERADORES = ["+", "-", "*", "/", "^", "²", "³", "i", "!", "C", "P", "R", "%"];
const LETRAS: Record<string, string> = { "(−)": "A", "°'\"": "B", hyp: "C", sin: "D", cos: "E", tan: "F", ")": "X", ",": "Y", "M+": "M" };
const MENUS: Record<Menu, string> = {
  mode0: "COMP 1  SD 2  REG 3", mode1: "Deg 1  Rad 2  Gra 3", mode2: "Fix 1  Sci 2  Norm 3",
  fixdig: "Fix 0~9?", scidig: "Sci 0~9?", normsel: "Norm 1~2?",
  clr: "Scl 1  Mode 2  All 3", svar: "x̄ 1  xσn 2  xσn-1 3", ssum: "Σx² 1  Σx 2  n 3",
};
export const textoMenu = (m: Menu) => MENUS[m];

/** Teclas que o app de trilhas descreve com um token só, mas que na calculadora são SHIFT + tecla. */
export const EXPANSAO: Record<string, string[]> = { "x!": ["SHIFT", "x⁻¹"], nPr: ["SHIFT", "nCr"], "π": ["SHIFT", "EXP"], "∛": ["SHIFT", "x³"] };
export const expandir = (teclas: string[]) => teclas.flatMap((t) => EXPANSAO[t] ?? [t]);

export const textoExpr = (s: Estado) => s.toks.map((x) => x.d).join("");

function inserir(s: Estado, tok: Tok): Estado {
  let toks = s.toks;
  if (s.fresh) toks = OPERADORES.includes(tok.i) ? [{ i: "Ans", d: "Ans" }] : [];
  return { ...s, toks: [...toks, tok], fresh: false, shift: false, alpha: false, msg: "", emFracao: false };
}

const ctx = (s: Estado) => ({ ang: s.ang, ans: s.ans, dados: s.dados, vars: s.vars });
const erroTexto = (e: unknown) => (e instanceof ErroCalc ? (e.tipo === "math" ? "Math ERROR" : e.tipo === "stack" ? "Stack ERROR" : "Syntax ERROR") : "Syntax ERROR");

function valorAtual(s: Estado): Decimal {
  return s.fresh ? s.ans : avaliar(s.toks, ctx(s));
}

function igual(s: Estado): Estado {
  try {
    const v = avaliar(s.toks, ctx(s));
    const r = formatar(v, s.exib);
    return { ...s, res: r, ans: v, fresh: true, shift: false, alpha: false, emFracao: false, hist: [{ e: textoExpr(s) || "0", r }, ...s.hist].slice(0, 8) };
  } catch (e) {
    return { ...s, res: erroTexto(e), fresh: true, shift: false, alpha: false, erro: true };
  }
}

function menuTecla(s: Estado, id: string): Estado {
  const m = s.menu!;
  const n = /^[0-9]$/.test(id) ? parseInt(id, 10) : -1;
  const base = { ...s, menu: null as Menu | null, shift: false };
  if (id === "MODE" && (m === "mode0" || m === "mode1")) return { ...s, menu: m === "mode0" ? "mode1" : "mode2" };
  if (m === "fixdig" || m === "scidig") {
    if (n < 0) return base;
    return { ...base, exib: { tipo: m === "fixdig" ? "fix" : "sci", n: m === "scidig" && n === 0 ? 10 : n } };
  }
  if (m === "normsel") return n === 1 || n === 2 ? { ...base, exib: { tipo: "norm", n } } : base;
  if (n < 1 || n > 3) return base;
  if (m === "mode0") return n === 3 ? { ...base, msg: "REG: fora da v1" } : { ...base, sd: n === 2, dados: n === 2 ? s.dados : [], toks: [], fresh: false };
  if (m === "mode1") return { ...base, ang: (["DEG", "RAD", "GRA"] as Ang[])[n - 1] };
  if (m === "mode2") return { ...base, menu: (["fixdig", "scidig", "normsel"] as Menu[])[n - 1] };
  if (m === "clr") {
    if (n === 1) return { ...base, dados: [], msg: "Stat clear" };
    if (n === 2) return { ...base, sd: false, ang: "DEG", exib: { tipo: "norm", n: 1 } };
    return { ...inicial() };
  }
  if (m === "svar") return inserir(base, [{ i: "x̄", d: "x̄" }, { i: "σn", d: "xσn" }, { i: "σs", d: "xσn-1" }][n - 1]);
  return inserir(base, [{ i: "Σx²", d: "Σx²" }, { i: "Σx", d: "Σx" }, { i: "n", d: "n" }][n - 1]);
}

function guardaDado(s: Estado): Estado {
  // SD: "x ; f" = valor x com frequência f (tecla SHIFT ,)
  try {
    const k = s.toks.findIndex((x) => x.i === ";");
    const v = k < 0 ? valorAtual(s) : avaliar(s.toks.slice(0, k), ctx(s));
    const f = k < 0 ? 1 : avaliar(s.toks.slice(k + 1), ctx(s)).toNumber();
    if (!Number.isInteger(f) || f < 1 || f > 1000) throw new ErroCalc("math");
    const dados = [...s.dados, ...Array<Decimal>(f).fill(v)];
    return { ...s, dados, toks: [], res: "n=" + dados.length, fresh: false, shift: false, msg: "" };
  } catch (e) {
    return { ...s, res: erroTexto(e), fresh: true, shift: false, erro: true };
  }
}

export function aperta(s: Estado, id: string): Estado {
  if (id === "ON") return inicial();
  if (id === "AC") return { ...s, toks: [], res: "0", shift: false, alpha: false, fresh: false, msg: "", menu: null, pend: null, erro: false, emFracao: false };
  if (s.erro) {
    return id === "DEL" ? { ...s, erro: false, res: "0", fresh: false, shift: false } : s;
  }
  if (s.menu) return menuTecla(s, id);
  if (s.pend) {
    const L = LETRAS[id];
    if (!L) return { ...s, pend: null };
    if (s.pend === "rcl") return inserir({ ...s, pend: null }, { i: "v:" + L, d: L });
    try {
      const v = valorAtual(s);
      return { ...s, pend: null, vars: { ...s.vars, [L]: v }, toks: [], ans: v, res: formatar(v, s.exib), fresh: true, shift: false };
    }
    catch (e) { return { ...s, pend: null, res: erroTexto(e), erro: true }; }
  }
  const sh = s.shift;
  switch (id) {
    case "SHIFT": return { ...s, shift: !sh, alpha: false };
    case "ALPHA": return { ...s, alpha: !s.alpha, shift: false };
    case "DEL": return { ...s, toks: s.fresh ? s.toks : s.toks.slice(0, -1), shift: false };
    case "=":
      if (sh) return inserir(s, { i: "%", d: "%" });
      return igual(s);
    case "MODE": return { ...s, menu: sh ? "clr" : "mode0", shift: false };
    case "RCL": return { ...s, pend: sh ? "sto" : "rcl", shift: false };
    case "Ans":
      if (sh) { const prox: Record<Ang, Ang> = { DEG: "RAD", RAD: "GRA", GRA: "DEG" }; return { ...s, ang: prox[s.ang], shift: false }; }
      return inserir(s, { i: "Ans", d: "Ans" });
    case "ab/c": {
      if (s.fresh && !s.erro) {
        if (s.emFracao) return { ...s, res: formatar(s.ans, s.exib), emFracao: false };
        const f = paraFracao(s.ans);
        return f ? { ...s, res: f, emFracao: true } : s;
      }
      return inserir(s, { i: "⌟", d: "⌟" });
    }
    case "M+": {
      if (s.sd && !sh) return guardaDado(s);
      try {
        const v = valorAtual(s);
        const m = (s.vars.M ?? new Decimal(0))[sh ? "minus" : "plus"](v);
        return { ...s, vars: { ...s.vars, M: m }, toks: [], res: formatar(v, s.exib), fresh: true, ans: v, shift: false };
      } catch (e) { return { ...s, res: erroTexto(e), erro: true, fresh: true }; }
    }
    case ",": return sh ? inserir(s, { i: ";", d: ";" }) : inserir(s, { i: ",", d: "," });
  }
  if (s.alpha && LETRAS[id]) return inserir(s, { i: "v:" + LETRAS[id], d: LETRAS[id] });
  if (sh && s.sd && (id === "1" || id === "2")) return { ...s, menu: id === "1" ? "ssum" : "svar", shift: false };
  if (/^[0-9]$/.test(id)) return inserir(s, { i: id, d: id });
  const mapa: Record<string, Tok> = {
    "x⁻¹": sh ? { i: "!", d: "!" } : { i: "i", d: "⁻¹" },
    nCr: sh ? { i: "P", d: "P" } : { i: "C", d: "C" },
    "x³": sh ? { i: "cbrt(", d: "∛(" } : { i: "³", d: "³" },
    "√": { i: "sqrt(", d: "√(" }, "x²": { i: "²", d: "²" },
    "^": sh ? { i: "R", d: "ˣ√" } : { i: "^", d: "^" },
    log: sh ? { i: "10^(", d: "10^(" } : { i: "log(", d: "log(" },
    ln: sh ? { i: "e^(", d: "e^(" } : { i: "ln(", d: "ln(" },
    "(−)": { i: "~", d: "−" },
    sin: sh ? { i: "asin(", d: "sin⁻¹(" } : { i: "sin(", d: "sin(" },
    cos: sh ? { i: "acos(", d: "cos⁻¹(" } : { i: "cos(", d: "cos(" },
    tan: sh ? { i: "atan(", d: "tan⁻¹(" } : { i: "tan(", d: "tan(" },
    "(": { i: "(", d: "(" }, ")": { i: ")", d: ")" },
    "+": { i: "+", d: "+" }, "−": { i: "-", d: "−" }, "×": { i: "*", d: "×" }, "÷": { i: "/", d: "÷" },
    EXP: sh ? { i: "π", d: "π" } : { i: "E", d: "E" },
    ".": sh ? { i: "ran", d: "Ran#" } : { i: ".", d: "." },
  };
  if (mapa[id]) return inserir(s, mapa[id]);
  return { ...s, msg: "Fora da v1", shift: false, alpha: false };
}

/** Texto das duas linhas do visor. */
export function visor(s: Estado) {
  return { linha1: s.menu ? MENUS[s.menu] : s.msg || textoExpr(s), linha2: s.menu ? "" : s.res };
}
