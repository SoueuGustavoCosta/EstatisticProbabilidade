import { create } from "zustand";
import { persist } from "zustand/middleware";
import { concluiTrilha, Progresso, registraCard, vazio } from "./logica";

interface Store extends Progresso {
  card: (trilha: number, indice: number, acertou: boolean | null, ehDesafio: boolean) => void;
  concluir: (trilha: number) => void;
  zerar: () => void;
}

// Progresso só no navegador (localStorage). Supabase é opcional e fica para a v2 (docs/06).
export const useProgresso = create<Store>()(
  persist(
    (set) => ({
      ...vazio(),
      card: (t, i, a, d) => set((s) => registraCard(s, t, i, a, d)),
      concluir: (t) => set((s) => concluiTrilha(s, t)),
      zerar: () => set(vazio()),
    }),
    { name: "trilha-estatistica-progresso", partialize: ({ xp, streak, ultimoDia, trilhas }) => ({ xp, streak, ultimoDia, trilhas }) },
  ),
);
