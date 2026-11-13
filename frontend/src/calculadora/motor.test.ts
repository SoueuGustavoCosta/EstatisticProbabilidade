import { describe, expect, it } from "vitest";
import { aperta, expandir, inicial, Estado } from "./estado";

const teclar = (teclas: string[], e: Estado = inicial()) => expandir(teclas).reduce(aperta, e);
const num = (n: string) => n.split("");
const res = (teclas: string[], e?: Estado) => teclar(teclas, e).res;

describe("COMP", () => {
  it("precedência", () => {
    expect(res([..."2+3×4=".split("")])).toBe("14");
    expect(res([..."(2+3)×4=".split("")])).toBe("20");
    expect(res(["(−)", "2", "x²", "="])).toBe("−4");
  });
  it("sem erro de ponto flutuante", () => expect(res([..."0.1+0.2=".split("")])).toBe("0.3"));
  it("sequência de teclas do backend (docs/05): média 1328 ÷ 20", () => expect(res(["1", "3", "2", "8", "÷", "2", "0", "="])).toBe("66.4"));
  it("fatorial, nCr, nPr", () => {
    expect(res(["6", "x!", "="])).toBe("720");
    expect(res(["5", "nCr", "2", "="])).toBe("10");
    expect(res(["5", "nPr", "2", "="])).toBe("20");
    expect(res(["6", "x!", "÷", "(", "3", "x!", "×", "3", "x!", ")", "="])).toBe("20"); // exemplo da binomial
  });
  it("potências e raízes", () => {
    expect(res(["√", "8", "="])).toBe("2.828427125");
    expect(res(["2", "^", "1", "0", "="])).toBe("1024");
    expect(res(["(", "1", "÷", "5", ")", "x³", "="])).toBe("8×10^-3");
    expect(res(["SHIFT", "x³", "8", "="])).toBe("2"); // ∛8
    expect(res(["3", "x⁻¹", "="])).toBe("0.3333333333");
  });
  it("trigonometria em graus", () => {
    expect(res(["sin", "3", "0", "="])).toBe("0.5");
    expect(res(["sin", "1", "8", "0", "="])).toBe("0");
    expect(res(["tan", "4", "5", "="])).toBe("1");
    expect(res(["tan", "9", "0", "="])).toBe("Math ERROR");
  });
  it("log, ln, 10ˣ, eˣ", () => {
    expect(res(["log", "1", "0", "0", "="])).toBe("2");
    expect(res(["SHIFT", "log", "2", "="])).toBe("100");
    expect(res(["ln", "1", "="])).toBe("0");
    expect(res(["SHIFT", "ln", "0", "="])).toBe("1");
  });
  it("erros", () => {
    expect(res(["1", "÷", "0", "="])).toBe("Math ERROR");
    expect(res(["2", "+", "="])).toBe("Syntax ERROR");
    expect(res(["7", "0", "x!", "="])).toBe("Math ERROR");
  });
  it("Ans e EXP", () => {
    expect(res(["2", "+", "3", "=", "×", "2", "="])).toBe("10");
    expect(res(["2", "EXP", "3", "="])).toBe("2000");
    expect(res(["SHIFT", "EXP", "="])).toBe("3.141592654");
  });
  it("fração ab/c ↔ decimal", () => {
    const e = teclar(["1", "ab/c", "4", "="]);
    expect(e.res).toBe("0.25");
    expect(aperta(e, "ab/c").res).toBe("1⌟4");
    expect(teclar(["2", "ab/c", "1", "ab/c", "2", "="]).res).toBe("2.5");
  });
  it("memória STO/RCL e M+", () => {
    const e = teclar(["4", "SHIFT", "RCL", "sin"]); // STO D
    expect(res(["RCL", "sin", "×", "2", "="], e)).toBe("8");
    expect(res(["5", "M+", "3", "M+", "RCL", "M+", "="])).toBe("8");
  });
});

describe("modo SD (Aula 04)", () => {
  const sd = () => {
    let e = teclar(["MODE", "2"]);
    e = teclar(["SHIFT", "MODE", "1"], e);
    for (const v of ["2", "4", "6", "8", "10"]) e = teclar([...num(v), "M+"], e);
    return e;
  };
  it("xσn e xσn-1 de 2,4,6,8,10", () => {
    expect(res(["SHIFT", "2", "2", "="], sd())).toBe("2.828427125");
    expect(res(["SHIFT", "2", "3", "="], sd())).toBe("3.16227766");
  });
  it("média, Σx, Σx² e n", () => {
    expect(res(["SHIFT", "2", "1", "="], sd())).toBe("6");
    expect(res(["SHIFT", "1", "2", "="], sd())).toBe("30");
    expect(res(["SHIFT", "1", "1", "="], sd())).toBe("220");
    expect(res(["SHIFT", "1", "3", "="], sd())).toBe("5");
  });
  it("frequência com ;", () => {
    let e = teclar(["MODE", "2"]);
    e = teclar(["1", "SHIFT", ",", "2", "M+", "3", "M+"], e);
    expect(res(["SHIFT", "1", "3", "="], e)).toBe("3");
    expect(res(["SHIFT", "2", "1", "="], e)).toBe("1.666666667");
  });
});

describe("exibição", () => {
  it("Fix 2, Sci 3, Norm", () => {
    expect(res(["1", "÷", "3", "="], teclar(["MODE", "MODE", "MODE", "1", "2"]))).toBe("0.33");
    expect(res(["1", "2", "3", "4", "5", "="], teclar(["MODE", "MODE", "MODE", "2", "3"]))).toBe("1.23×10^4");
    expect(res(["1", "÷", "1", "0", "0", "0", "="])).toBe("1×10^-3"); // Norm 1
  });
  it("Rad", () => expect(res(["sin", "SHIFT", "EXP", "="], teclar(["MODE", "MODE", "2"]))).toBe("0"));
});
