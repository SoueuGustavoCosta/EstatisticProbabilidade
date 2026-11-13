import { Link } from "react-router-dom";
import { CONTEUDO } from "../trilhas/conteudo";
import { pctTrilha } from "../progresso/logica";
import { useProgresso } from "../progresso/store";
import { TRILHAS } from "../trilhas/lista";

export function ListaTrilhas() {
  const p = useProgresso();
  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(320px,100%), 1fr))" }}>
      {TRILHAS.map((t) => {
        const total = CONTEUDO.find((c) => c.num === t.num)?.cards.length ?? 1;
        const pct = pctTrilha(p, t.num, total);
        const cor = pct === 100 ? "#248A3D" : pct > 0 ? "#0066CC" : "#6E6E73";
        return (
        <Link key={t.num} to={`/trilhas/${t.num}`} className="flex min-h-[76px] items-center gap-3 rounded-[18px] bg-cartao px-4 py-4 sm:gap-4 sm:px-[22px] sm:py-5 text-texto transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-fundo font-bold text-texto-2">
            {t.num}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <strong className="text-[17px] font-semibold leading-snug">{t.nome}</strong>
            <span className="text-[13px] text-texto-2">{t.fonte}</span>
            <span className="h-1 overflow-hidden rounded-full bg-linha" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`Progresso da trilha ${t.num}`}>
              <span className="block h-1 rounded-full" style={{ width: `${pct}%`, background: cor }} />
            </span>
          </span>
          <span className="flex-none text-[13px] font-semibold" style={{ color: cor }}>{pct === 100 ? "Concluída" : pct > 0 ? `${pct}%` : "Nova"}</span>
        </Link>
        );
      })}
    </div>
  );
}

export default function Trilhas() {
  return (
    <section className="bg-fundo px-4 pb-12 pt-8 sm:px-6 sm:pb-20 sm:pt-14">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="m-0 text-[32px] font-bold sm:text-[40px]">Trilhas</h1>
          <span className="text-texto-2">Todas abertas. A ordem é só uma sugestão.</span>
        </div>
        <ListaTrilhas />
      </div>
    </section>
  );
}
