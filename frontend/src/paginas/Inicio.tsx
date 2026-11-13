import { Link } from "react-router-dom";
import { medalhas } from "../progresso/logica";
import { useProgresso } from "../progresso/store";
import { ListaTrilhas } from "./Trilhas";

const areas = [
  { para: "/trilhas", titulo: "Trilhas", texto: "13 trilhas, da introdução à distribuição normal. Abra qualquer uma, quando quiser.", acao: "Ver trilhas ›" },
  { para: "/calculadora", titulo: "Calculadora", texto: "A Casio fx-82MS na tela, com as mesmas teclas e o modo SD.", acao: "Abrir calculadora ›" },
  { para: "/laboratorio", titulo: "Laboratório", texto: "Digite seus dados. Veja os resultados, o gráfico e cada passo do cálculo.", acao: "Calcular ›" },
];

export default function Inicio() {
  const meds = medalhas(useProgresso());
  return (
    <>
      <section className="flex flex-col items-center gap-4 px-4 pb-10 pt-12 text-center sm:gap-[18px] sm:px-6 sm:pb-16 sm:pt-[88px]">
        <span className="text-[17px] font-semibold text-laranja">Estatística e Probabilidade</span>
        <h1 className="m-0 max-w-[820px] text-[36px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[64px]">
          Cada conta, passo a passo.
        </h1>
        <p className="m-0 max-w-[640px] text-[18px] leading-[1.45] text-texto-2 sm:text-[21px]">
          Revise a matéria com trilhas curtas, uma calculadora igual à da prova e um laboratório que mostra todo o cálculo.
        </p>
        <div className="mt-2 flex w-full flex-col items-center justify-center gap-2 sm:w-auto sm:flex-row sm:gap-3.5">
          <Link to="/trilhas" className="flex min-h-12 w-full items-center justify-center rounded-pilula bg-azul px-[22px] py-3 text-[17px] font-medium text-white hover:brightness-110 sm:w-auto">
            Continuar trilha
          </Link>
          <Link to="/laboratorio" className="flex min-h-11 items-center text-[17px]">Abrir o laboratório ›</Link>
        </div>
      </section>

      <section aria-label="Áreas" className="mx-auto grid max-w-[1080px] gap-4 px-4 pb-12 sm:gap-5 sm:px-6 sm:pb-[72px]" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(280px,100%), 1fr))" }}>
        {areas.map((a) => (
          <Link key={a.para} to={a.para} className="flex min-h-[170px] flex-col gap-3 rounded-cartao bg-cartao p-6 sm:min-h-[220px] sm:p-8 text-texto shadow-cartao transition hover:-translate-y-0.5 hover:shadow-lg">
            <strong className="text-2xl font-semibold tracking-tight">{a.titulo}</strong>
            <span className="text-[17px] leading-[1.45] text-texto-2">{a.texto}</span>
            <span className="mt-auto text-[15px] text-link">{a.acao}</span>
          </Link>
        ))}
      </section>

      {meds.length > 0 && (
        <section aria-label="Medalhas" className="mx-auto flex max-w-[1080px] flex-wrap items-center gap-2 px-6 pb-10">
          <span className="text-[15px] font-semibold">Medalhas</span>
          {meds.map((n) => <span key={n} className="rounded-full bg-verde-fundo px-3 py-1 text-[13px] font-semibold text-verde" title={`Trilha ${n} concluída`}>Trilha {n}</span>)}
        </section>
      )}

      <section aria-labelledby="trilhas" className="bg-fundo px-4 pb-14 pt-12 sm:px-6 sm:pb-[88px] sm:pt-[72px]">
        <div className="mx-auto flex max-w-[1080px] flex-col gap-7">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="trilhas" className="m-0 text-[32px] font-bold sm:text-[40px]">Trilhas</h2>
            <span className="text-texto-2">Todas abertas. A ordem é só uma sugestão.</span>
          </div>
          <ListaTrilhas />
        </div>
      </section>
    </>
  );
}
