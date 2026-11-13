import { Link } from "react-router-dom";
import { TRILHAS } from "../trilhas/lista";

export function ListaTrilhas() {
  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(320px,100%), 1fr))" }}>
      {TRILHAS.map((t) => (
        <Link key={t.num} to={`/trilhas/${t.num}`} className="flex items-center gap-4 rounded-[18px] bg-cartao px-[22px] py-5 text-texto transition hover:-translate-y-0.5 hover:shadow-lg">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-fundo font-bold text-texto-2">
            {t.num}
          </span>
          <span className="flex min-w-0 flex-1 flex-col gap-1.5">
            <strong className="text-[17px] font-semibold leading-snug">{t.nome}</strong>
            <span className="text-[13px] text-texto-2">{t.fonte}</span>
          </span>
          <span className="flex-none text-[13px] font-semibold text-texto-2">Nova</span>
        </Link>
      ))}
    </div>
  );
}

export default function Trilhas() {
  return (
    <section className="bg-fundo px-6 pb-20 pt-14">
      <div className="mx-auto flex max-w-[1080px] flex-col gap-7">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="m-0 text-[40px] font-bold">Trilhas</h1>
          <span className="text-texto-2">Todas abertas. A ordem é só uma sugestão.</span>
        </div>
        <ListaTrilhas />
      </div>
    </section>
  );
}
