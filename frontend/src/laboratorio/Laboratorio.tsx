import { useMemo, useRef, useState } from "react";
import { calcular } from "../api";
import Grafico from "./Grafico";
import ListaPassos from "./ListaPassos";
import { Campo, deExemplo, exemplosDo, MODULOS, padroes, paraPedido, Valores } from "./modulos";
import { RespostaApi } from "./tipos";

const entrada = "w-full rounded-xl border border-campo bg-white px-3.5 py-2.5 text-[17px] outline-none focus:border-azul focus:ring-2 focus:ring-azul-claro";

function CampoForm({ c, v, set }: { c: Campo; v: string | string[][]; set: (v: string | string[][]) => void }) {
  const id = `campo-${c.chave}`;
  const rot = <label htmlFor={id} className="text-[15px] font-medium">{c.rotulo}</label>;
  const ajuda = c.ajuda && <span className="text-[13px] text-texto-2">{c.ajuda}</span>;
  if (c.tipo === "seg")
    return (
      <div role="radiogroup" aria-label={c.rotulo} className="flex flex-col gap-1.5">
        <span className="text-[15px] font-medium">{c.rotulo}</span>
        <div className="inline-flex w-fit rounded-full bg-[#E8E8ED] p-0.5">
          {c.opcoes.map(([val, nome]) => (
            <button key={val} type="button" role="radio" aria-checked={v === val} onClick={() => set(val)}
              className={`rounded-full px-4 py-1.5 text-[15px] ${v === val ? "bg-white font-semibold shadow-sm" : "text-texto-3"}`}>{nome}</button>
          ))}
        </div>
      </div>
    );
  if (c.tipo === "area")
    return <div className="flex flex-col gap-1.5">{rot}<textarea id={id} rows={4} className={entrada + " font-mono"} placeholder={c.placeholder} value={v as string} onChange={(e) => set(e.target.value)} />{ajuda}</div>;
  if (c.tipo === "texto")
    return <div className="flex flex-col gap-1.5">{rot}<input id={id} className={entrada} placeholder={c.placeholder} value={v as string} onChange={(e) => set(e.target.value)} />{ajuda}</div>;
  const rows = v as string[][];
  const troca = (i: number, j: number, x: string) => set(rows.map((l, a) => (a === i ? l.map((y, b) => (b === j ? x : y)) : l)));
  return (
    <fieldset className="m-0 flex flex-col gap-1.5 border-0 p-0">
      <legend className="mb-1.5 text-[15px] font-medium">{c.rotulo}</legend>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${c.colunas.length}, minmax(0,1fr)) auto` }}>
        {c.colunas.map((n) => <span key={n} className="text-[13px] text-texto-2">{n}</span>)}<span />
        {rows.map((l, i) => (
          <div key={i} className="contents">
            {l.map((x, j) => <input key={j} aria-label={`${c.colunas[j]}, linha ${i + 1}`} className={entrada + " font-mono"} value={x} onChange={(e) => troca(i, j, e.target.value)} />)}
            <button type="button" aria-label={`Remover linha ${i + 1}`} className="px-2 text-texto-2 hover:text-vermelho" onClick={() => set(rows.filter((_, a) => a !== i))}>✕</button>
          </div>
        ))}
      </div>
      <button type="button" className="w-fit text-[15px] text-link" onClick={() => set([...rows, c.colunas.map(() => "")])}>+ Adicionar linha</button>
      {ajuda}
    </fieldset>
  );
}

export default function Laboratorio() {
  const [mid, setMid] = useState(MODULOS[0].id);
  const m = MODULOS.find((x) => x.id === mid)!;
  const [valores, setValores] = useState<Record<string, Valores>>(() => Object.fromEntries(MODULOS.map((x) => [x.id, padroes(x)])));
  const [casas, setCasas] = useState(2);
  const [resp, setResp] = useState<RespostaApi | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [copiado, setCopiado] = useState(false);
  const topo = useRef<HTMLDivElement>(null);
  const exemplos = useMemo(() => exemplosDo(m), [m]);
  const v = valores[mid];

  const trocaModulo = (id: string) => { setMid(id); setResp(null); setErro(null); };
  const executar = async () => {
    setCarregando(true); setErro(null);
    try {
      const r = (await calcular(paraPedido(m, v, casas))) as RespostaApi;
      setResp(r);
      setTimeout(() => topo.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }), 50);
    } catch (e) { setResp(null); setErro(e instanceof Error ? e.message : "Não foi possível calcular."); }
    setCarregando(false);
  };
  const copiar = async () => {
    if (!resp) return;
    await navigator.clipboard?.writeText(resp.resultados.map((r) => `${r.nome} (${r.simbolo}): ${r.exibicao}${r.unidade ? " " + r.unidade : ""}`).join("\n"));
    setCopiado(true); setTimeout(() => setCopiado(false), 1500);
  };

  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-8 px-6 pb-20 pt-10">
      <div><h1 className="m-0 text-[40px] font-bold">Laboratório</h1><p className="mt-2 text-texto-2">Digite seus dados. Veja os resultados, o gráfico e cada passo do cálculo.</p></div>

      <nav aria-label="Tipo de cálculo" className="flex flex-wrap gap-2">
        {MODULOS.map((x) => (
          <button key={x.id} type="button" aria-pressed={x.id === mid} onClick={() => trocaModulo(x.id)}
            className={`rounded-full px-4 py-2 text-[15px] ${x.id === mid ? "bg-azul font-medium text-white" : "bg-white text-texto-3 shadow-cartao hover:text-texto"}`}>{x.rotulo}</button>
        ))}
      </nav>

      <form className="flex flex-col gap-5 rounded-cartao bg-cartao p-7 shadow-cartao" onSubmit={(e) => { e.preventDefault(); executar(); }}>
        <p className="m-0 text-texto-2">{m.intro}</p>
        {m.campos.map((c) => <CampoForm key={c.chave} c={c} v={v[c.chave]} set={(x) => setValores({ ...valores, [mid]: { ...v, [c.chave]: x } })} />)}
        <div className="flex flex-wrap items-center gap-4">
          <button type="submit" disabled={carregando} className="rounded-pilula bg-azul px-8 py-3 text-[17px] font-semibold text-white hover:brightness-110 disabled:opacity-60">{carregando ? "Calculando…" : "Calcular"}</button>
          {exemplos.length > 0 && (
            <label className="flex items-center gap-2 text-[15px]">
              <span className="text-texto-2">Exemplo do material</span>
              <select className="rounded-full bg-[#F0F0F3] px-3 py-2 text-link" value="" onChange={(e) => { const ex = exemplos.find((x) => x.id === e.target.value); if (ex) setValores({ ...valores, [mid]: deExemplo(m, ex.entrada) }); }}>
                <option value="" disabled>Escolher…</option>
                {exemplos.map((x) => <option key={x.id} value={x.id}>{x.fonte}</option>)}
              </select>
            </label>
          )}
          <label className="ml-auto flex items-center gap-2 text-[15px] text-texto-2">Casas decimais
            <select className="rounded-full bg-[#F0F0F3] px-3 py-2 text-texto" value={casas} onChange={(e) => setCasas(Number(e.target.value))}>{[0, 1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}</select>
          </label>
        </div>
        {erro && <p role="alert" className="m-0 rounded-xl bg-vermelho-fundo px-4 py-3 text-vermelho">{erro}</p>}
      </form>

      <div ref={topo} className="scroll-mt-16" />
      {resp && (
        <>
          {resp.avisos.map((a, i) => <p key={i} role="note" className="m-0 rounded-xl bg-aviso-fundo px-4 py-3 text-[15px] text-aviso">⚠️ {a}</p>)}
          <section aria-labelledby="resultados" className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 id="resultados" className="m-0 text-[28px] font-bold">Resultados</h2>
              <button type="button" onClick={copiar} className="rounded-full bg-[#F0F0F3] px-4 py-2 text-[15px] text-link">{copiado ? "Copiado ✓" : "Copiar resultados"}</button>
            </div>
            <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(200px,100%), 1fr))" }}>
              {resp.resultados.map((r) => (
                <a key={r.id} href={r.passo_ref ? `#passo-${r.passo_ref}` : undefined} className="flex flex-col gap-1 rounded-[18px] bg-cartao p-4 text-texto shadow-cartao hover:-translate-y-0.5">
                  <span className="text-[13px] text-texto-2">{r.nome} <span className="font-mono">{r.simbolo}</span></span>
                  <strong className="break-words font-mono text-2xl font-semibold text-link" data-resultado={r.id}>{r.exibicao}</strong>
                  <span className="text-[13px] text-texto-2">{[r.unidade, r.classificacao].filter(Boolean).join(" · ")}</span>
                </a>
              ))}
            </div>
          </section>
          {resp.grafico && <Grafico g={resp.grafico} />}
          <ListaPassos passos={resp.passos} />
        </>
      )}
    </div>
  );
}
