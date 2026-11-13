// Desafio de cada trilha: exercícios de data/exercicios.json com alternativas e gabarito (docs/03).
import dados from "../../../data/exercicios.json";
import { Card } from "./tipos";

interface Ex { id: string; fonte: string; trilha: number; enunciado: string; alternativas?: string[] | Record<string, string>; gabarito: string | null; obs?: string; depende_de_imagem?: boolean }

export function desafioDaTrilha(num: number, max = 6): Extract<Card, { tipo: "escolha" }>[] {
  return (dados.exercicios as Ex[])
    .filter((e) => e.trilha === num && e.alternativas && e.gabarito && !e.depende_de_imagem && !e.obs?.startsWith("E-04")) // E-04: gabarito trocado (docs/08)
    .slice(0, max)
    .map((e) => {
      const arr = Array.isArray(e.alternativas);
      const chaves = arr ? (e.alternativas as string[]) : Object.keys(e.alternativas!);
      const opcoes = arr ? (e.alternativas as string[]) : Object.entries(e.alternativas!).map(([k, v]) => `${k}) ${v}`);
      const correta = chaves.findIndex((c) => c.toLowerCase() === String(e.gabarito).toLowerCase());
      return {
        tipo: "escolha" as const, pergunta: `${e.enunciado} (${e.fonte})`, opcoes, correta,
        explicacao: e.obs ? `Gabarito do material: ${e.gabarito}. ${e.obs.replace(/^E-05:\s*/, "⚠️ ")}` : `Gabarito do material: ${e.gabarito}.`,
      };
    })
    .filter((c) => c.correta >= 0);
}
