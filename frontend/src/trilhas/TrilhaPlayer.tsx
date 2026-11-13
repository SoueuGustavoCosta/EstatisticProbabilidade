import { AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import MiniCalculadora from "../calculadora/MiniCalculadora";
import CartaoTrilha from "./Cartoes";
import { desafioDaTrilha } from "./desafio";
import { Card, Trilha } from "./tipos";

const rotulo = (c: Card, i: number) => {
  if (c.tipo === "fala" || c.tipo === "formula" || c.tipo === "calculo" || c.tipo === "tabela" || c.tipo === "grafico") return c.titulo ?? ("texto" in c && c.texto ? c.texto.slice(0, 34) + "…" : `Etapa ${i + 1}`);
  return { dica: "Dica", aviso: "Aviso do material", escolha: "Pergunta", preencher: "Preencha", classificar: "Classifique" }[c.tipo];
};

interface Props {
  trilha: Trilha;
  /** Chamado a cada card visto (acertou = null) ou respondido (true/false), uma vez por card. */
  aoCard?: (indice: number, acertou: boolean | null, ehDesafio: boolean) => void;
  aoTerminar?: () => void;
  concluidos?: number[];
}

function useDesktop() {
  const q = "(min-width: 1024px)";
  const [d, setD] = useState(() => window.matchMedia(q).matches);
  useEffect(() => { const m = window.matchMedia(q); const f = () => setD(m.matches); m.addEventListener("change", f); return () => m.removeEventListener("change", f); }, []);
  return d;
}

export default function TrilhaPlayer({ trilha, aoCard, aoTerminar, concluidos = [] }: Props) {
  const desafio = useMemo(() => desafioDaTrilha(trilha.num), [trilha.num]);
  const todos: Card[] = useMemo(() => [...trilha.cards, ...desafio], [trilha.cards, desafio]);
  const desktop = useDesktop();
  const [i, setI] = useState(0);
  const [vistos, setVistos] = useState<Set<number>>(new Set());
  const fim = i >= todos.length;
  const card = todos[i];
  const interativo = card && ["escolha", "preencher", "classificar"].includes(card.tipo);
  const ehDesafio = i >= trilha.cards.length;
  const pct = Math.round((Math.min(i, todos.length) / todos.length) * 100);

  const registra = (acertou: boolean | null) => {
    if (vistos.has(i)) return;
    setVistos(new Set(vistos).add(i));
    aoCard?.(i, acertou, ehDesafio);
  };
  const vai = (n: number) => { if (!interativo) registra(null); setI(Math.max(0, Math.min(todos.length, n))); if (n >= todos.length) aoTerminar?.(); window.scrollTo({ top: 0 }); };

  return (
    <div className="mx-auto grid max-w-[1240px] grid-cols-[minmax(0,1fr)] gap-4 px-4 pb-8 pt-4 sm:px-6 sm:pt-8 lg:grid-cols-[280px_minmax(0,1fr)_320px] lg:gap-6">
      <aside aria-label="Etapas" className="order-1 flex min-w-0 flex-col gap-3 lg:order-none">
        <Link to="/trilhas" className="inline-flex min-h-11 items-center text-[15px]">‹ Todas as trilhas</Link>
        <div>
          <span className="text-[15px] font-semibold text-laranja">Trilha {trilha.num}</span>
          <h1 className="m-0 text-[22px] font-bold leading-tight sm:text-[26px]">{trilha.titulo}</h1>
          <span className="text-[13px] text-texto-2">{trilha.fonte}</span>
        </div>
        <div role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Progresso da trilha" className="h-1.5 overflow-hidden rounded-full bg-linha"><div className="h-full rounded-full bg-azul transition-[width] duration-700 ease-out" style={{ width: `${pct}%` }} /></div>
        <details open={desktop} key={String(desktop)} className="group rounded-xl lg:contents">
          <summary className="flex min-h-11 cursor-pointer items-center justify-between rounded-xl bg-white px-4 text-[15px] font-medium lg:hidden">Etapas ({Math.min(i + 1, todos.length)} de {todos.length})<span aria-hidden="true" className="text-texto-2 group-open:rotate-180">⌄</span></summary>
        <ol className="m-0 flex max-h-[50vh] list-none flex-col gap-1 overflow-y-auto p-0 pt-2 lg:pt-0">
          {todos.map((c, k) => (
            <li key={k}>
              {k === trilha.cards.length && <div className="px-3 pb-1 pt-3 text-[12px] font-semibold uppercase tracking-wide text-texto-2">Desafio</div>}
              <button type="button" onClick={() => vai(k)} aria-current={k === i ? "step" : undefined}
                className={`flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[14px] ${k === i ? "bg-azul-claro font-semibold text-[#004E9E]" : "hover:bg-white"}`}>
                <span className={`flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] ${vistos.has(k) || concluidos.includes(k) ? "bg-verde text-white" : "bg-linha text-texto-3"}`}>{vistos.has(k) || concluidos.includes(k) ? "✓" : k + 1}</span>
                <span className="truncate">{rotulo(c, k)}</span>
              </button>
            </li>
          ))}
        </ol>
        </details>
      </aside>

      <section aria-live="polite" className="order-2 flex min-w-0 flex-col gap-4 lg:order-none">
        {fim ? (
          <div className="entra flex flex-col items-start gap-4 rounded-[22px] bg-cartao p-8 shadow-cartao">
            <h2 className="m-0 text-3xl font-bold">Trilha concluída</h2>
            <p className="m-0 text-texto-3">Você passou por {todos.length} etapas de “{trilha.titulo}”.</p>
            <div className="flex gap-3"><Link to="/trilhas" className="rounded-pilula bg-azul px-5 py-2.5 font-medium text-white">Voltar às trilhas</Link>
              <button type="button" className="rounded-pilula bg-[#F0F0F3] px-5 py-2.5 text-link" onClick={() => setI(0)}>Rever do início</button></div>
          </div>
        ) : (
          <>
            <div className="text-[13px] text-texto-2">{ehDesafio ? "Desafio" : "Etapa"} {i + 1} de {todos.length}</div>
            <AnimatePresence mode="wait" initial={false}><CartaoTrilha key={i} c={card} aoResponder={(ok) => registra(ok)} /></AnimatePresence>
            <div className="sticky bottom-[calc(64px+env(safe-area-inset-bottom))] z-10 -mx-4 flex justify-between gap-3 bg-fundo-2/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:bg-transparent sm:p-0">
              <button type="button" disabled={i === 0} onClick={() => vai(i - 1)} className="min-h-11 flex-1 rounded-pilula bg-[#F0F0F3] px-5 py-2.5 text-link disabled:opacity-40 sm:flex-none">‹ Anterior</button>
              <button type="button" onClick={() => vai(i + 1)} className="min-h-11 flex-1 rounded-pilula bg-azul px-6 py-2.5 font-medium text-white sm:flex-none">{i === todos.length - 1 ? "Concluir" : "Próxima ›"}</button>
            </div>
          </>
        )}
      </section>

      <aside aria-label="Calculadora" className="order-3 flex min-w-0 flex-col items-center gap-3 lg:sticky lg:top-16 lg:order-none lg:self-start">
        {card?.tipo === "calculo" ? (
          <><h2 className="m-0 self-start text-[17px] font-semibold">Faça na calculadora</h2><MiniCalculadora key={i} teclas={card.teclas} /></>
        ) : <p className="m-0 text-center text-[14px] text-texto-2">Nas etapas com conta, a calculadora mostra as teclas.</p>}
      </aside>
    </div>
  );
}
