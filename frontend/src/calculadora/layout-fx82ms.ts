// Layout da Casio fx-82MS conforme o protótipo aprovado (docs/prototipo/Calculadora.dc.html).
// Pendente (docs/04): conferir com foto/manual oficial do aparelho — o MANUAL.pdf da pasta é de normas ABNT, não da Casio.
export type Estilo = "fn" | "shift" | "alpha" | "num" | "del" | "nav";
export interface Tecla { id: string; rotulo: string; shift?: string; alpha?: string; estilo: Estilo; col?: string }

const k = (id: string, rotulo: string, estilo: Estilo, shift = "", alpha = "", col?: string): Tecla => ({ id, rotulo, estilo, shift, alpha, col });

export const TECLAS_SUP: Tecla[] = [
  k("SHIFT", "SHIFT", "shift", "", "", "1"), k("ALPHA", "ALPHA", "alpha", "", "", "2"),
  k("REPLAY", "◀ ▲ ▼ ▶", "nav", "", "", "3 / span 2"), k("MODE", "MODE", "fn", "CLR", "", "5"), k("ON", "ON", "fn", "", "", "6"),
  k("x⁻¹", "x⁻¹", "fn", "x!", "", "1"), k("nCr", "nCr", "fn", "nPr", "", "2"),
  k("Pol(", "Pol(", "fn", "Rec(", ":", "5"), k("x³", "x³", "fn", "∛", "", "6"),
  k("ab/c", "a b/c", "fn", "d/c"), k("√", "√", "fn"), k("x²", "x²", "fn"), k("^", "^", "fn", "ˣ√"), k("log", "log", "fn", "10ˣ"), k("ln", "ln", "fn", "eˣ", "e"),
  k("(−)", "(−)", "fn", "", "A"), k("°'\"", "°'\"", "fn", "←", "B"), k("hyp", "hyp", "fn", "", "C"), k("sin", "sin", "fn", "sin⁻¹", "D"), k("cos", "cos", "fn", "cos⁻¹", "E"), k("tan", "tan", "fn", "tan⁻¹", "F"),
  k("RCL", "RCL", "fn", "STO"), k("ENG", "ENG", "fn", "←"), k("(", "(", "fn"), k(")", ")", "fn", "", "X"), k(",", ",", "fn", ";", "Y"), k("M+", "M+", "fn", "M−", "M"),
];

export const TECLAS_INF: Tecla[] = [
  k("7", "7", "num"), k("8", "8", "num"), k("9", "9", "num"), k("DEL", "DEL", "del", "INS"), k("AC", "AC", "del", "OFF"),
  k("4", "4", "num"), k("5", "5", "num"), k("6", "6", "num"), k("×", "×", "num"), k("÷", "÷", "num"),
  k("1", "1", "num", "S-SUM"), k("2", "2", "num", "S-VAR"), k("3", "3", "num"), k("+", "+", "num"), k("−", "−", "num"),
  k("0", "0", "num", "Rnd"), k(".", ".", "num", "Ran#"), k("EXP", "EXP", "num", "π"), k("Ans", "Ans", "num", "DRG▶"), k("=", "=", "num", "%"),
];

export const ESTILOS: Record<Estilo, string> = {
  fn: "background:linear-gradient(#3B3B45,#2A2A32);color:#ECECF3;box-shadow:0 3px 0 #111117",
  shift: "background:linear-gradient(#3B3B45,#2A2A32);color:#F5C542;box-shadow:0 3px 0 #111117",
  alpha: "background:linear-gradient(#3B3B45,#2A2A32);color:#F2606A;box-shadow:0 3px 0 #111117",
  num: "background:linear-gradient(#4A4A55,#383842);color:#FFFFFF;box-shadow:0 4px 0 #15151B",
  del: "background:linear-gradient(#F08A3C,#D46A1E);color:#1A0D02;box-shadow:0 4px 0 #6B3410",
  nav: "background:radial-gradient(circle,#4A4A55,#2A2A32);color:#9A9AB8;box-shadow:0 3px 0 #111117;border-radius:999px",
};

/** Teclas do teclado físico do PC (docs/04). */
export const TECLADO_PC: Record<string, string> = {
  Enter: "=", "=": "=", Backspace: "DEL", Escape: "AC", "+": "+", "-": "−", "*": "×", "/": "÷", "(": "(", ")": ")", ".": ".", ",": ".", "^": "^",
};
