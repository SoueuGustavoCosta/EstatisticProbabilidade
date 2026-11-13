// Regras de gamificação (docs/01): XP por card e por acerto, sequência de dias e medalha por trilha. Nada fica trancado.
export const XP = { card: 5, acerto: 10, desafio: 20, trilha: 50 } as const;

export interface Progresso {
  xp: number;
  streak: number;
  ultimoDia: string | null; // AAAA-MM-DD
  trilhas: Record<number, { cards: number[]; concluida: boolean }>;
}
export const vazio = (): Progresso => ({ xp: 0, streak: 0, ultimoDia: null, trilhas: {} });

export const dia = (d: Date = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const dias = (a: string, b: string) => Math.round((Date.parse(b + "T00:00:00Z") - Date.parse(a + "T00:00:00Z")) / 86400000);

/** Conta o dia de hoje na sequência: mesmo dia mantém, dia seguinte soma, buraco reinicia em 1. */
export function atualizaStreak(p: Progresso, hoje: string): Progresso {
  if (p.ultimoDia === hoje) return p;
  return { ...p, ultimoDia: hoje, streak: p.ultimoDia && dias(p.ultimoDia, hoje) === 1 ? p.streak + 1 : 1 };
}

/** Registra um card visto (acertou = null) ou respondido. XP só na primeira vez que o card conta. */
export function registraCard(p: Progresso, trilha: number, indice: number, acertou: boolean | null, ehDesafio: boolean, hoje = dia()): Progresso {
  const t = p.trilhas[trilha] ?? { cards: [], concluida: false };
  const q = atualizaStreak(p, hoje);
  if (t.cards.includes(indice)) return q;
  const ganho = XP.card + (acertou ? (ehDesafio ? XP.desafio : XP.acerto) : 0);
  return { ...q, xp: q.xp + ganho, trilhas: { ...q.trilhas, [trilha]: { ...t, cards: [...t.cards, indice] } } };
}

export function concluiTrilha(p: Progresso, trilha: number, hoje = dia()): Progresso {
  const t = p.trilhas[trilha] ?? { cards: [], concluida: false };
  const q = atualizaStreak(p, hoje);
  if (t.concluida) return q;
  return { ...q, xp: q.xp + XP.trilha, trilhas: { ...q.trilhas, [trilha]: { ...t, concluida: true } } };
}

export const pctTrilha = (p: Progresso, trilha: number, total: number) =>
  p.trilhas[trilha]?.concluida ? 100 : Math.min(99, Math.round(((p.trilhas[trilha]?.cards.length ?? 0) / total) * 100));
export const medalhas = (p: Progresso) => Object.entries(p.trilhas).filter(([, t]) => t.concluida).map(([n]) => Number(n)).sort((a, b) => a - b);
