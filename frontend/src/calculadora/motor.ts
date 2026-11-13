// Motor da calculadora (fx-82MS): parser com precedência, funções, frações e estatística SD.
// Aritmética com decimal.js: 0,1 + 0,2 dá exatamente 0,3 (docs/04).
import Decimal from "decimal.js";

Decimal.set({ precision: 24, rounding: Decimal.ROUND_HALF_UP });

export type Ang = "DEG" | "RAD" | "GRA";
export interface Tok { i: string; d: string }
export interface Ctx {
  ang: Ang;
  ans: Decimal;
  dados: Decimal[];
  vars: Record<string, Decimal>;
}
export class ErroCalc extends Error {
  constructor(public tipo: "math" | "syntax" | "stack") { super(tipo); }
}

const PI = Decimal.acos(-1);
const D = (x: number | string | Decimal) => new Decimal(x);
const math = () => new ErroCalc("math");
const ehDigito = (c?: string) => c !== undefined && /^[0-9.]$/.test(c);

function fatorial(x: Decimal): Decimal {
  if (x.isNeg() || !x.isInteger() || x.gt(69)) throw math();
  let r = D(1);
  for (let k = 2; k <= x.toNumber(); k++) r = r.times(k);
  return r;
}

function checa(v: Decimal): Decimal {
  if (!v.isFinite()) throw math();
  return v;
}

/** Ângulo -> radianos, com valores exatos nos múltiplos de 90° (sin 180 = 0, não 1e-24). */
function trig(f: "sin" | "cos" | "tan", x: Decimal, ang: Ang): Decimal {
  if (ang !== "RAD") {
    const volta = ang === "DEG" ? 360 : 400;
    const quarto = volta / 4;
    let r = x.mod(volta);
    if (r.isNeg()) r = r.plus(volta);
    if (r.mod(quarto).isZero()) {
      const k = r.div(quarto).toNumber();
      if (f === "sin") return D([0, 1, 0, -1][k]);
      if (f === "cos") return D([1, 0, -1, 0][k]);
      if (k % 2) throw math();
      return D(0);
    }
    x = x.times(PI).div(volta / 2);
  }
  const r = D(Decimal[f](x));
  return r.abs().lt("1e-18") ? D(0) : r; // sin π = 0, como na calculadora real
}

function arco(f: "asin" | "acos" | "atan", x: Decimal, ang: Ang): Decimal {
  if (f !== "atan" && x.abs().gt(1)) throw math();
  const r = D(Decimal[f](x));
  if (ang === "RAD") return r;
  return r.times(ang === "DEG" ? 180 : 200).div(PI);
}

export function avaliar(toks: Tok[], ctx: Ctx): Decimal {
  const t = toks.map((x) => x.i);
  let p = 0;
  const dados = ctx.dados;
  const n = dados.length;
  const soma = dados.reduce((a, b) => a.plus(b), D(0));
  const media = n ? soma.div(n) : D(NaN);
  const sq = dados.reduce((a, b) => a.plus(b.minus(media).pow(2)), D(0));
  const consts: Record<string, () => Decimal> = {
    "π": () => PI,
    Ans: () => ctx.ans,
    ran: () => D(Math.floor(Math.random() * 1000)).div(1000),
    "x̄": () => media,
    "σn": () => sq.div(n).sqrt(),
    "σs": () => sq.div(n - 1).sqrt(),
    "Σx": () => soma,
    "Σx²": () => dados.reduce((a, b) => a.plus(b.pow(2)), D(0)),
    n: () => D(n),
  };
  for (const v of Object.keys(ctx.vars)) consts["v:" + v] = () => ctx.vars[v];
  for (const v of "ABCDEFXYM") if (!consts["v:" + v]) consts["v:" + v] = () => D(0);

  const funcs: Record<string, (x: Decimal) => Decimal> = {
    "sqrt(": (x) => { if (x.isNeg()) throw math(); return x.sqrt(); },
    "cbrt(": (x) => x.cbrt(),
    "sin(": (x) => trig("sin", x, ctx.ang), "cos(": (x) => trig("cos", x, ctx.ang), "tan(": (x) => trig("tan", x, ctx.ang),
    "asin(": (x) => arco("asin", x, ctx.ang), "acos(": (x) => arco("acos", x, ctx.ang), "atan(": (x) => arco("atan", x, ctx.ang),
    "log(": (x) => { if (x.lte(0)) throw math(); return x.log(10); },
    "ln(": (x) => { if (x.lte(0)) throw math(); return x.ln(); },
    "10^(": (x) => D(10).pow(x), "e^(": (x) => x.exp(),
  };
  const comeca = (c?: string) => c !== undefined && (ehDigito(c) || c === "(" || c in funcs || c in consts);

  const expr = (): Decimal => {
    let v = term();
    while (t[p] === "+" || t[p] === "-") { const o = t[p++]; const r = term(); v = o === "+" ? v.plus(r) : v.minus(r); }
    return v;
  };
  const term = (): Decimal => {
    let v = comb();
    for (;;) {
      if (t[p] === "*" || t[p] === "/") {
        const o = t[p++]; const r = comb();
        if (o === "/" && r.isZero()) throw math();
        v = o === "*" ? v.times(r) : v.div(r);
      } else if (comeca(t[p])) v = v.times(comb());
      else break;
    }
    return v;
  };
  const comb = (): Decimal => {
    let v = unary();
    while (t[p] === "C" || t[p] === "P" || t[p] === "R") {
      const o = t[p++]; const r = unary();
      if (o === "R") { // x√y: v é o índice da raiz
        if (v.isZero()) throw math();
        v = checa(r.pow(D(1).div(v)));
      } else {
        if (!v.isInteger() || !r.isInteger() || r.gt(v) || r.isNeg()) throw math();
        v = o === "C" ? fatorial(v).div(fatorial(r).times(fatorial(v.minus(r)))) : fatorial(v).div(fatorial(v.minus(r)));
      }
    }
    return v;
  };
  const unary = (): Decimal => { if (t[p] === "~") { p++; return unary().neg(); } return pot(); };
  const pot = (): Decimal => {
    const b = post();
    if (t[p] === "^") {
      p++; const e = unary();
      if (b.isZero() && e.lte(0)) throw math();
      if (b.isNeg() && !e.isInteger()) throw math();
      return checa(b.pow(e));
    }
    return b;
  };
  const post = (): Decimal => {
    let v = prim();
    for (;;) {
      const c = t[p];
      if (c === "²") v = v.pow(2);
      else if (c === "³") v = v.pow(3);
      else if (c === "i") { if (v.isZero()) throw math(); v = D(1).div(v); }
      else if (c === "!") v = fatorial(v);
      else if (c === "%") v = v.div(100);
      else break;
      p++;
    }
    return v;
  };
  const inteiro = (): Decimal => {
    let s = "";
    while (ehDigito(t[p]) && t[p] !== ".") s += t[p++];
    if (!s) throw new ErroCalc("syntax");
    return D(s);
  };
  const prim = (): Decimal => {
    const c = t[p];
    if (ehDigito(c)) {
      let s = "";
      while (ehDigito(t[p])) s += t[p++];
      if ((s.match(/\./g) || []).length > 1) throw new ErroCalc("syntax");
      let v = D(s === "." ? "0" : s);
      if (t[p] === "⌟") { // fração a⌟b ou número misto a⌟b⌟c (tecla ab/c)
        p++; const b = inteiro();
        if (t[p] === "⌟") { p++; const c2 = inteiro(); if (c2.isZero()) throw math(); return v.plus(b.div(c2)); }
        if (b.isZero()) throw math();
        return v.div(b);
      }
      if (t[p] === "E") {
        p++; let sg = 1;
        if (t[p] === "~" || t[p] === "-") { sg = -1; p++; }
        let e = "";
        while (ehDigito(t[p])) e += t[p++];
        if (!e) throw new ErroCalc("syntax");
        v = v.times(D(10).pow(sg * parseInt(e, 10)));
      }
      return v;
    }
    if (c === "(") { p++; const v = expr(); if (t[p] === ")") p++; return v; }
    if (c in funcs) { p++; const v = checa(funcs[c](expr())); if (t[p] === ")") p++; return v; }
    if (c in consts) { p++; const v = consts[c](); if (v.isNaN()) throw math(); return v; }
    throw new ErroCalc("syntax");
  };

  if (!t.length) return D(0);
  const v = expr();
  if (p < t.length) throw new ErroCalc("syntax");
  return checa(v).toSignificantDigits(12);
}

// ---------- exibição ----------
export type Exib = { tipo: "norm"; n: 1 | 2 } | { tipo: "fix" | "sci"; n: number };

export function formatar(v: Decimal, e: Exib): string {
  return bruto(v, e).replace(/^-/, "−");
}

function bruto(v: Decimal, e: Exib): string {
  if (v.isZero()) return e.tipo === "fix" ? D(0).toFixed(e.n) : "0";
  const sci = (x: Decimal, dig: number) => {
    const [m, ex] = x.toExponential(dig).split("e");
    return `${m}×10^${parseInt(ex, 10)}`;
  };
  if (e.tipo === "fix") return v.toDecimalPlaces(e.n).toFixed(e.n);
  if (e.tipo === "sci") return sci(v.toSignificantDigits(e.n), e.n - 1).replace(/(\.\d*?)0+×/, "$1×").replace(/\.×/, "×");
  const a = v.abs();
  const limiteBaixo = e.n === 1 ? D("0.01") : D("1e-9");
  if (a.gte("1e10") || a.lt(limiteBaixo)) return sci(v.toSignificantDigits(10), 9).replace(/(\.\d*?)0+×/, "$1×").replace(/\.×/, "×");
  return v.toSignificantDigits(10).toFixed().replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

/** Decimal -> fração (tecla ab/c), por frações contínuas. null se não houver fração simples (denominador até 999). */
export function paraFracao(v: Decimal): string | null {
  if (v.isInteger()) return null;
  const x = v.abs();
  const inteiro = x.floor();
  const y = x.minus(inteiro);
  let [h2, h1, k2, k1] = [0, 1, 1, 0];
  let z = y;
  for (let i = 0; i < 30; i++) {
    const a = z.floor().toNumber();
    [h2, h1, k2, k1] = [h1, a * h1 + h2, k1, a * k1 + k2];
    if (k1 > 999) return null;
    if (D(h1).div(k1).minus(y).abs().lt("1e-11")) {
      const s = v.isNeg() ? "−" : "";
      return inteiro.isZero() ? `${s}${h1}⌟${k1}` : `${s}${inteiro}⌟${h1}⌟${k1}`;
    }
    const resto = z.minus(a);
    if (resto.isZero()) return null;
    z = D(1).div(resto);
  }
  return null;
}
