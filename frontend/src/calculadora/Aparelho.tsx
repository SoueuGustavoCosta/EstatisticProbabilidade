import { CSSProperties } from "react";
import { Estado, visor } from "./estado";
import { ESTILOS, TECLAS_INF, TECLAS_SUP, Tecla } from "./layout-fx82ms";

const css = (s: string): CSSProperties =>
  Object.fromEntries(s.split(";").map((p) => p.split(/:(.+)/)).map(([a, b]) => [a.replace(/-(\w)/g, (_, c) => c.toUpperCase()), b]));

interface Props {
  estado: Estado;
  aoApertar?: (id: string) => void;
  /** Tecla a destacar em azul (replay / "Eu faço"). */
  destaque?: string | null;
  compacto?: boolean;
}

export function Visor({ estado, compacto }: { estado: Estado; compacto?: boolean }) {
  const { linha1, linha2 } = visor(estado);
  const on = (b: boolean) => ({ opacity: b ? 1 : 0.15 });
  return (
    <div className="rounded-xl bg-[#111117] p-2.5">
      <div
        role="status" aria-live="polite"
        className="flex flex-col justify-between rounded-md font-mono text-[#18200F]"
        style={{ background: "linear-gradient(#C5D3AE,#AEBE95)", padding: "6px 10px 8px", height: compacto ? 70 : 92 }}
      >
        <div className="flex gap-2 text-[10px] font-bold" style={{ height: 12 }}>
          <span style={on(estado.shift)}>S</span><span style={on(estado.alpha)}>A</span><span style={on((estado.vars.M?.isZero() ?? true) === false)}>M</span>
          <span style={on(estado.sd)}>SD</span><span>{estado.ang === "DEG" ? "D" : estado.ang === "RAD" ? "R" : "G"}</span>
          {estado.exib.tipo !== "norm" && <span>{estado.exib.tipo === "fix" ? "FIX" : "SCI"}</span>}
        </div>
        <div className="overflow-hidden whitespace-nowrap text-left" style={{ fontSize: compacto ? 13 : 17, direction: "rtl" }}><bdi>{linha1 || " "}</bdi></div>
        <div className="text-right font-bold" style={{ fontSize: compacto ? 22 : 30 }}>{linha2}</div>
      </div>
    </div>
  );
}

function Botao({ t, h, fonte, aoApertar, destaque }: { t: Tecla; h: number; fonte: number; aoApertar?: (id: string) => void; destaque?: boolean }) {
  const estilo = css(ESTILOS[t.estilo]);
  return (
    <div className="flex flex-col items-center gap-[3px]" style={{ gridColumn: t.col }}>
      <span className="h-[10px] whitespace-nowrap text-[10px] font-bold leading-none">
        <span style={{ color: "#F5C542" }}>{t.shift}</span> <span style={{ color: "#F2606A" }}>{t.alpha}</span>
      </span>
      <button
        type="button" aria-label={t.id} data-tecla={t.id} onClick={() => aoApertar?.(t.id)}
        className="w-full cursor-pointer border-0 font-bold transition active:translate-y-0.5 hover:brightness-110"
        style={{
          height: h, fontSize: fonte, borderRadius: "9px 9px 14px 14px", ...estilo,
          ...(destaque ? { background: "#0071E3", color: "#fff", boxShadow: "0 0 0 3px #7DB7F5, 0 3px 0 #004E9E" } : {}),
        }}
      >
        {t.rotulo}
      </button>
    </div>
  );
}

export default function Aparelho({ estado, aoApertar, destaque, compacto }: Props) {
  return (
    <div
      className="w-full"
      style={{
        background: "linear-gradient(170deg,#3A3A42 0%,#26262D 45%,#1C1C22 100%)", borderRadius: "34px 34px 46px 46px",
        padding: compacto ? "14px 14px 20px" : "22px 22px 30px", border: "1px solid #4A4A56",
        boxShadow: "0 30px 60px rgba(0,0,0,.18),0 8px 18px rgba(0,0,0,.12),inset 0 1px 0 rgba(255,255,255,.08)",
      }}
    >
      <div className="flex items-end justify-between px-1.5 pb-2.5">
        <span className="font-extrabold tracking-[.12em] text-[#D8D8E2]" style={{ fontSize: compacto ? 13 : 17 }}>CASIO</span>
        <span className="flex flex-col items-end gap-0.5"><b className="text-[15px] text-[#D8D8E2]" style={{ fontSize: compacto ? 12 : 15 }}>fx-82MS</b>
          {!compacto && <span className="text-[9px] tracking-[.08em] text-[#A1A1AA]">S-V.P.A.M.</span>}</span>
      </div>
      <Visor estado={estado} compacto={compacto} />
      <div style={{ height: 14 }} />
      <div className="grid grid-cols-6 items-end" style={{ gap: "12px 8px" }}>
        {TECLAS_SUP.map((t) => <Botao key={t.id} t={t} h={compacto ? 28 : 34} fonte={compacto ? 11 : 13} aoApertar={aoApertar} destaque={destaque === t.id} />)}
      </div>
      <div style={{ height: 16 }} />
      <div className="grid grid-cols-5" style={{ gap: "12px 10px" }}>
        {TECLAS_INF.map((t) => <Botao key={t.id} t={t} h={compacto ? 36 : 46} fonte={compacto ? 16 : 20} aoApertar={aoApertar} destaque={destaque === t.id} />)}
      </div>
    </div>
  );
}
