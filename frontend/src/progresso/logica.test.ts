import { describe, expect, it } from "vitest";
import { atualizaStreak, concluiTrilha, medalhas, pctTrilha, registraCard, vazio, XP } from "./logica";

describe("progresso", () => {
  it("streak: mesmo dia mantém, dia seguinte soma, buraco reinicia", () => {
    let p = atualizaStreak(vazio(), "2026-11-13");
    expect(p.streak).toBe(1);
    expect(atualizaStreak(p, "2026-11-13").streak).toBe(1);
    p = atualizaStreak(p, "2026-11-14"); expect(p.streak).toBe(2);
    p = atualizaStreak(p, "2026-11-30"); expect(p.streak).toBe(1);
  });
  it("streak atravessa virada de mês e de ano", () => {
    expect(atualizaStreak({ ...vazio(), streak: 4, ultimoDia: "2026-12-31" }, "2027-01-01").streak).toBe(5);
  });
  it("XP: card visto, acerto e desafio; sem XP repetido no mesmo card", () => {
    let p = registraCard(vazio(), 1, 0, null, false, "2026-11-13");
    expect(p.xp).toBe(XP.card);
    p = registraCard(p, 1, 0, null, false, "2026-11-13"); expect(p.xp).toBe(XP.card);
    p = registraCard(p, 1, 1, true, false, "2026-11-13"); expect(p.xp).toBe(2 * XP.card + XP.acerto);
    p = registraCard(p, 1, 2, true, true, "2026-11-13"); expect(p.xp).toBe(3 * XP.card + XP.acerto + XP.desafio);
    p = registraCard(p, 1, 3, false, false, "2026-11-13"); expect(p.xp).toBe(4 * XP.card + XP.acerto + XP.desafio);
  });
  it("trilha concluída dá medalha e XP uma vez só", () => {
    let p = concluiTrilha(vazio(), 3, "2026-11-13");
    p = concluiTrilha(p, 3, "2026-11-13");
    expect(p.xp).toBe(XP.trilha);
    expect(medalhas(p)).toEqual([3]);
    expect(pctTrilha(p, 3, 10)).toBe(100);
  });
  it("percentual parcial nunca chega a 100 sem concluir", () => {
    let p = vazio();
    for (let i = 0; i < 10; i++) p = registraCard(p, 2, i, null, false, "2026-11-13");
    expect(pctTrilha(p, 2, 10)).toBe(99);
  });
});
