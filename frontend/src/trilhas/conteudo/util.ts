// Mesma tokenização de api/core/teclas.py: "1328÷20" -> ["1","3","2","8","÷","2","0","="]
const TOKEN = /x²|x³|x⁻¹|x!|nCr|nPr|Ans|EXP|\d|./gu;
const ANTES_DE_NEGATIVO = new Set([undefined, "+", "−", "×", "÷", "(", "^"]);

export function T(expr: string, igual = true): string[] {
  const e = expr.replace(/\s/g, "").replace(/,/g, ".").replace(/\*/g, "×").replace(/\//g, "÷").replace(/-/g, "−");
  const saida: string[] = [];
  for (const t of e.match(TOKEN) ?? []) saida.push(t === "−" && ANTES_DE_NEGATIVO.has(saida[saida.length - 1]) ? "(−)" : t);
  if (igual) saida.push("=");
  return saida;
}
