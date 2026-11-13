import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { CartesianGrid, Line, LineChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import Formula from "../componentes/Formula";
import { Card, Duvida } from "./tipos";

const caixa = "flex min-w-0 flex-col gap-4 rounded-[22px] bg-cartao p-5 shadow-cartao sm:p-7";
const btn = "min-h-11 rounded-pilula bg-azul px-5 py-2.5 text-[15px] font-medium text-white hover:brightness-110 disabled:opacity-50";

export const Duvida_ = ({ d }: { d: Duvida }) => (
  <details className="rounded-xl bg-fundo px-4 py-3">
    <summary className="flex min-h-11 cursor-pointer items-center text-[15px] font-medium">Dúvida comum: {d.p}</summary>
    <p className="m-0 pt-2 text-[15px] text-texto-3">{d.r}</p>
  </details>
);
const Titulo = ({ t }: { t?: string }) => (t ? <h2 className="m-0 text-2xl font-semibold">{t}</h2> : null);
const Fonte = ({ f }: { f?: string }) => (f ? <span className="text-[13px] text-texto-2">Fonte: {f}</span> : null);
const Retorno = ({ ok, texto }: { ok: boolean; texto: string }) => (
  <p role="status" className={`entra m-0 rounded-xl px-4 py-3 text-[15px] ${ok ? "bg-verde-fundo text-verde" : "bg-vermelho-fundo text-vermelho"}`}>{ok ? "Certo. " : "Ainda não. "}{texto}</p>
);

function TabelaAnimada({ c }: { c: Extract<Card, { tipo: "tabela" }> }) {
  const reduzir = useReducedMotion();
  return (
    <div className="overflow-x-auto rounded-xl border border-linha">
      <table className="w-full border-collapse text-[15px]">
        <thead><tr className="bg-fundo">{c.colunas.map((h) => <th key={h} className="px-3 py-2 text-left font-semibold">{h}</th>)}</tr></thead>
        <tbody>
          {c.linhas.map((l, i) => (
            <motion.tr key={i} className="border-t border-linha" initial={c.animada && !reduzir ? { opacity: 0, y: 6 } : false} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.18, duration: 0.2 }}>
              {l.map((x, j) => <td key={j} className="px-3 py-2 align-top">{x}</td>)}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Escolha({ c, aoResponder }: { c: Extract<Card, { tipo: "escolha" }>; aoResponder: (ok: boolean) => void }) {
  const [sel, setSel] = useState<number | null>(null);
  const responder = (i: number) => { if (sel === null) { setSel(i); aoResponder(i === c.correta); } };
  return (
    <div className={caixa}>
      <h2 className="m-0 text-xl font-semibold">{c.pergunta}</h2>
      <div role="radiogroup" className="flex flex-col gap-2">
        {c.opcoes.map((o, i) => {
          const estado = sel === null ? "" : i === c.correta ? "border-verde bg-verde-fundo" : i === sel ? "border-vermelho bg-vermelho-fundo" : "opacity-60";
          return <button key={i} type="button" role="radio" aria-checked={sel === i} disabled={sel !== null} onClick={() => responder(i)} className={`min-h-12 rounded-xl border border-campo px-4 py-3 text-left text-[16px] ${estado}`}>{o}</button>;
        })}
      </div>
      {sel !== null && <Retorno ok={sel === c.correta} texto={c.explicacao} />}
    </div>
  );
}

function Preencher({ c, aoResponder }: { c: Extract<Card, { tipo: "preencher" }>; aoResponder: (ok: boolean) => void }) {
  const [v, setV] = useState("");
  const [ok, setOk] = useState<boolean | null>(null);
  const conferir = () => {
    const n = parseFloat(v.replace(",", "."));
    const certo = Math.abs(n - c.resposta) < 0.015;
    if (ok === null) aoResponder(certo);
    setOk(certo);
  };
  return (
    <form className={caixa} onSubmit={(e) => { e.preventDefault(); conferir(); }}>
      <h2 className="m-0 text-xl font-semibold">{c.pergunta}</h2>
      <div className="flex flex-wrap items-center gap-3">
        <input aria-label="Sua resposta" inputMode="decimal" value={v} onChange={(e) => { setV(e.target.value); }} className="min-h-11 w-32 rounded-xl border border-campo px-3.5 py-2.5 font-mono text-[17px] sm:w-40" />
        {c.unidade && <span className="text-texto-2">{c.unidade}</span>}
        <button type="submit" className={btn} disabled={!v.trim()}>Conferir</button>
      </div>
      {ok !== null && <Retorno ok={ok} texto={c.explicacao} />}
    </form>
  );
}

function Classificar({ c, aoResponder }: { c: Extract<Card, { tipo: "classificar" }>; aoResponder: (ok: boolean) => void }) {
  const [esc, setEsc] = useState<(number | null)[]>(c.itens.map(() => null));
  const [conf, setConf] = useState(false);
  const todos = esc.every((e) => e !== null);
  const acertos = esc.filter((e, i) => e === c.itens[i][1]).length;
  return (
    <div className={caixa}>
      <h2 className="m-0 text-xl font-semibold">{c.pergunta}</h2>
      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {c.itens.map(([texto, certa], i) => (
          <li key={i} className="flex flex-col gap-2 rounded-xl bg-fundo p-3">
            <span className="text-[16px]">{texto}</span>
            <div role="radiogroup" aria-label={texto} className="flex flex-wrap gap-2">
              {c.categorias.map((cat, k) => {
                const marcado = esc[i] === k;
                const cor = conf ? (k === certa ? "border-verde bg-verde-fundo" : marcado ? "border-vermelho bg-vermelho-fundo" : "") : marcado ? "border-azul bg-azul-claro" : "";
                return <button key={k} type="button" role="radio" aria-checked={marcado} disabled={conf} onClick={() => setEsc(esc.map((e, a) => (a === i ? k : e)))} className={`min-h-11 rounded-full border border-campo bg-white px-4 py-2 text-[15px] ${cor}`}>{cat}</button>;
              })}
            </div>
          </li>
        ))}
      </ul>
      {!conf && <button type="button" className={btn + " w-fit"} disabled={!todos} onClick={() => { setConf(true); aoResponder(acertos === c.itens.length); }}>Conferir</button>}
      {conf && <Retorno ok={acertos === c.itens.length} texto={`${acertos} de ${c.itens.length}. ${c.explicacao}`} />}
    </div>
  );
}

function GraficoCard({ c }: { c: Extract<Card, { tipo: "grafico" }> }) {
  return (
    <div className={caixa}>
      <Titulo t={c.titulo} />{c.texto && <p className="m-0 text-texto-3">{c.texto}</p>}
      <div style={{ height: 240 }} role="img" aria-label={c.titulo}>
        <ResponsiveContainer>
          {c.kind === "barras" ? (
            <BarChart data={c.dados}><CartesianGrid vertical={false} stroke="#E8E8ED" /><XAxis dataKey="x" /><YAxis /><Tooltip /><Bar dataKey="y" fill="#0071E3" radius={[4, 4, 0, 0]} isAnimationActive={false} /></BarChart>
          ) : (
            <LineChart data={c.dados}><CartesianGrid vertical={false} stroke="#E8E8ED" /><XAxis dataKey="x" /><YAxis /><Tooltip /><Line dataKey="y" stroke="#0071E3" strokeWidth={2.5} isAnimationActive={false} /></LineChart>
          )}
        </ResponsiveContainer>
      </div>
      <Fonte f={c.fonte} />
    </div>
  );
}

/** Um card da trilha. `aoResponder` só dispara nos cards interativos (primeira resposta). */
export default function CartaoTrilha(p: { c: Card; aoResponder: (ok: boolean) => void }) {
  return <div className="entra"><CartaoBase {...p} /></div>;
}

function CartaoBase({ c, aoResponder }: { c: Card; aoResponder: (ok: boolean) => void }) {
  switch (c.tipo) {
    case "fala":
      return (
        <div className={caixa}>
          <Titulo t={c.titulo} /><p className="m-0 text-[17px] leading-relaxed sm:text-[19px]">{c.texto}</p>
          {c.lista && <ol className="m-0 flex list-none flex-col gap-2 p-0">{c.lista.map((l, i) => <li key={i} className="rounded-xl bg-azul-claro px-4 py-2.5 text-[16px]">{l}</li>)}</ol>}
          {c.duvida && <Duvida_ d={c.duvida} />}
        </div>
      );
    case "formula":
      return (
        <div className={caixa}>
          <Titulo t={c.titulo} />
          <div className="overflow-x-auto rounded-xl bg-azul-claro px-4 py-3 text-xl"><Formula latex={c.latex} /></div>
          {c.texto && <p className="m-0 text-texto-3">{c.texto}</p>}
          <dl className="m-0 grid gap-x-4 gap-y-1.5 text-[15px]" style={{ gridTemplateColumns: "auto 1fr" }}>{c.termos.map(([s, m]) => <div key={s} className="contents"><dt className="font-mono font-semibold text-link">{s}</dt><dd className="m-0 text-texto-3">{m}</dd></div>)}</dl>
          <Fonte f={c.fonte} />{c.duvida && <Duvida_ d={c.duvida} />}
        </div>
      );
    case "tabela":
      return <div className={caixa}><Titulo t={c.titulo} />{c.texto && <p className="m-0">{c.texto}</p>}<TabelaAnimada c={c} /><Fonte f={c.fonte} /></div>;
    case "calculo":
      return (
        <div className={caixa}>
          <Titulo t={c.titulo} />
          {c.latex && <div className="rounded-xl bg-fundo px-4 py-2"><Formula latex={c.latex} /></div>}
          <div className="flex flex-col gap-1 font-mono text-[16px] leading-relaxed">{c.linhas.map((l, i) => <p key={i} className="m-0 break-words">{l}</p>)}</div>
          <p className="m-0 rounded-xl bg-azul-claro px-4 py-2.5 font-mono text-lg font-semibold text-link">{c.resultado}</p>
          <Fonte f={c.fonte} />{c.duvida && <Duvida_ d={c.duvida} />}
          <p className="m-0 text-[14px] text-texto-2">A calculadora ao lado mostra as teclas desta conta.</p>
        </div>
      );
    case "dica": return <div className="rounded-[22px] bg-aviso-fundo p-5 text-[17px] sm:p-7 sm:text-[18px] leading-relaxed text-aviso">💡 {c.texto}</div>;
    case "aviso": return <div role="note" className="rounded-[22px] border border-aviso bg-aviso-fundo p-5 text-[16px] sm:p-7 sm:text-[17px] leading-relaxed text-aviso">⚠️ {c.texto}</div>;
    case "escolha": return <Escolha c={c} aoResponder={aoResponder} />;
    case "preencher": return <Preencher c={c} aoResponder={aoResponder} />;
    case "classificar": return <Classificar c={c} aoResponder={aoResponder} />;
    case "grafico": return <GraficoCard c={c} />;
  }
}
