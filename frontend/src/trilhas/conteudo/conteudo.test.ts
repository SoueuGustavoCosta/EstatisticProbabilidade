import { describe, expect, it } from "vitest";
import { aperta, expandir, inicial } from "../../calculadora/estado";
import { desafioDaTrilha } from "../desafio";
import { CONTEUDO } from "./index";

const numeros = (s: string) => (s.replace(/−/g, "-").match(/-?\d+(?:[.,]\d+)?/g) ?? []).map((n) => parseFloat(n.replace(",", ".")));

describe("conteúdo das trilhas", () => {
  it("tem 13 trilhas numeradas", () => expect(CONTEUDO.map((t) => t.num)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));

  it("toda tecla de conta produz o resultado escrito no card", () => {
    const falhas: string[] = [];
    for (const t of CONTEUDO) for (const c of t.cards) {
      if (c.tipo !== "calculo") continue;
      const e = expandir(c.teclas).reduce(aperta, inicial());
      const v = parseFloat(e.res.replace("−", "-"));
      const alvo = numeros(c.resultado.replace(/\d+\/\d+/g, ""));
      // aceita fração (1/2 = 0,5) e arredondamento do material (≅)
      const frac = [...c.resultado.matchAll(/(\d+)\/(\d+)/g)].map((m) => +m[1] / +m[2]);
      const ok = e.res !== "Syntax ERROR" && [...alvo, ...frac].some((a) => Math.abs(a - v) <= 0.01 + Math.abs(a) * 0.002);
      if (!ok) falhas.push(`T${t.num} "${c.titulo}": teclas dão ${e.res}, card diz "${c.resultado}"`);
    }
    expect(falhas).toEqual([]);
  });

  it("desafios: gabarito existe nas alternativas e as questões E-04 ficam de fora", () => {
    for (let n = 1; n <= 13; n++) for (const d of desafioDaTrilha(n)) expect(d.opcoes[d.correta]).toBeTruthy();
    expect(desafioDaTrilha(11).some((d) => d.pergunta.includes("U4 Q7") || d.pergunta.includes("U4 Q8"))).toBe(false);
  });

  it("toda fórmula/conta mostra a fonte (regra nº 1)", () => {
    for (const t of CONTEUDO) for (const c of t.cards) if (c.tipo === "formula" || c.tipo === "calculo") expect(c.fonte, `T${t.num}`).toBeTruthy();
  });
});
