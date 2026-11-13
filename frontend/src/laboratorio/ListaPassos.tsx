import Formula from "../componentes/Formula";
import MiniCalculadora from "../calculadora/MiniCalculadora";
import tabelaZ from "../../../data/tabela_z.json";
import { PassoApi, TabelaPasso } from "./tipos";

const Z = (tabelaZ as { tabela: Record<string, number> }).tabela;

function TabelaZ({ t }: { t: TabelaPasso }) {
  const linhas = Array.from({ length: 31 }, (_, i) => (i / 10).toFixed(1));
  return (
    <div className="max-h-64 overflow-auto rounded-xl border border-linha" role="table" aria-label={`Tabela Z: linha ${t.linha}, coluna ${t.coluna}`}>
      <table className="w-full border-collapse font-mono text-xs">
        <thead className="sticky top-0 bg-fundo"><tr><th className="p-1.5">z</th>{[..."0123456789"].map((c) => <th key={c} className={`p-1.5 ${c === t.coluna ? "bg-azul-claro text-azul" : ""}`}>0,0{c}</th>)}</tr></thead>
        <tbody>
          {linhas.map((l) => (
            <tr key={l} className={l === t.linha ? "bg-azul-claro" : ""}>
              <th className="p-1.5 text-left">{l.replace(".", ",")}</th>
              {[..."0123456789"].map((c) => {
                const alvo = l === t.linha && c === t.coluna;
                return <td key={c} className={`p-1.5 text-right ${alvo ? "bg-azul font-bold text-white" : c === t.coluna ? "bg-azul-claro" : ""}`}>{(Z[l + c]).toFixed(4).replace(".", ",")}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TabelaSimples({ t }: { t: TabelaPasso }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-linha">
      <table className="w-full border-collapse font-mono text-sm">
        <thead><tr className="bg-fundo">{t.colunas!.map((c) => <th key={c} className="px-3 py-2 text-right font-semibold first:text-left">{c}</th>)}</tr></thead>
        <tbody>
          {t.linhas!.map((l, i) => (
            <tr key={i} className={`border-t border-linha ${t.destaque_linhas?.includes(i) ? "bg-azul-claro outline outline-2 -outline-offset-2 outline-azul" : ""}`}>
              {l.map((c, j) => <td key={j} className="px-3 py-1.5 text-right first:text-left">{c}</td>)}
            </tr>
          ))}
          {t.rodape && <tr className="border-t-2 border-linha bg-fundo font-semibold">{t.rodape.map((c, j) => <td key={j} className="px-3 py-2 text-right first:text-left">{c}</td>)}</tr>}
        </tbody>
      </table>
    </div>
  );
}

export function CartaoPasso({ p }: { p: PassoApi }) {
  return (
    <article id={`passo-${p.n}`} className="flex scroll-mt-20 flex-col gap-3 rounded-[20px] bg-cartao p-6 shadow-cartao">
      <header className="flex items-baseline gap-3">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-azul-claro text-sm font-bold text-azul">{p.n}</span>
        <div><h3 className="m-0 text-xl font-semibold">{p.titulo}</h3><span className="text-[13px] text-texto-2">Fonte: {p.fonte}</span></div>
      </header>
      {p.formula_latex && <div className="overflow-x-auto rounded-xl bg-fundo px-4 py-2"><Formula latex={p.formula_latex} />{p.substituicao_latex && <Formula latex={p.substituicao_latex} />}</div>}
      {p.linhas.length > 0 && <div className="flex flex-col gap-1 font-mono text-[15px] leading-relaxed text-texto-3">{p.linhas.map((l, i) => <p key={i} className="m-0 break-words">{l}</p>)}</div>}
      {p.tabela && (p.tabela.tipo === "tabela_z" ? <TabelaZ t={p.tabela} /> : <TabelaSimples t={p.tabela} />)}
      {p.resultado && <p className="m-0 rounded-xl bg-azul-claro px-4 py-2 font-mono text-lg font-semibold text-link">Resultado: {p.resultado}</p>}
      {p.interpretacao && <p className="m-0 text-[15px]">{p.interpretacao}</p>}
      {p.dica && <p className="m-0 rounded-xl bg-aviso-fundo px-4 py-2 text-[14px] text-aviso">💡 {p.dica}</p>}
      {p.aviso_material && <p role="note" className="m-0 rounded-xl border border-aviso bg-aviso-fundo px-4 py-2 text-[14px] text-aviso">{p.aviso_material}</p>}
      {p.teclas_calculadora.length > 0 && (
        <details className="rounded-xl bg-fundo px-4 py-2">
          <summary className="cursor-pointer text-[15px] font-medium text-link">Fazer na calculadora</summary>
          <div className="pt-3"><MiniCalculadora teclas={p.teclas_calculadora} /></div>
        </details>
      )}
    </article>
  );
}

export default function ListaPassos({ passos }: { passos: PassoApi[] }) {
  return (
    <section aria-labelledby="passos" className="flex flex-col gap-4">
      <h2 id="passos" className="m-0 text-[28px] font-bold">Passo a passo</h2>
      {passos.map((p) => <CartaoPasso key={p.n} p={p} />)}
    </section>
  );
}
