import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Grafico as G } from "./tipos";

const COR_MARCADOR: Record<string, string> = { "Média": "#0071E3", Mediana: "#BF4800", Moda: "#248A3D", "μ": "#0071E3" };
const virgula = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");

/** Barras com eixo numérico e linhas de média, mediana e moda (ajuda a ver a assimetria). */
function BarrasNumericas({ g }: { g: G }) {
  const W = 640, H = 270, P = { l: 36, r: 16, t: 28, b: 34 };
  const xs = g.series.map((s) => s.x as number);
  const lo = Math.min(...xs, ...g.marcadores.map((m) => m.x)), hi = Math.max(...xs, ...g.marcadores.map((m) => m.x));
  const folga = (hi - lo || 1) * 0.06;
  const x0 = lo - folga, x1 = hi + folga;
  const X = (v: number) => P.l + ((v - x0) / (x1 - x0)) * (W - P.l - P.r);
  const nmax = Math.max(...g.series.map((s) => s.n as number));
  const Y = (v: number) => H - P.b - (v / nmax) * (H - P.t - P.b);
  const largura = Math.max(3, Math.min(26, ((W - P.l - P.r) / (x1 - x0)) * (hi - lo) / Math.max(g.series.length, 1) * 0.7));
  const ticks = Array.from({ length: 6 }, (_, i) => lo + ((hi - lo) * i) / 5);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Gráfico de barras das frequências com média, mediana e moda" className="w-full">
      <line x1={P.l} x2={W - P.r} y1={H - P.b} y2={H - P.b} stroke="#D2D2D7" />
      {g.series.map((s, i) => <rect key={i} x={X(s.x) - largura / 2} y={Y(s.n)} width={largura} height={H - P.b - Y(s.n)} rx={2} fill="#B9D6F5" />)}
      {ticks.map((t, i) => <text key={i} x={X(t)} y={H - 12} textAnchor="middle" fontSize="11" fill="#6E6E73">{virgula(t)}</text>)}
      {[0, nmax].map((v) => <text key={v} x={P.l - 6} y={Y(v) + 4} textAnchor="end" fontSize="11" fill="#6E6E73">{v}</text>)}
      {g.marcadores.map((m, i) => (
        <g key={i}>
          <line x1={X(m.x)} x2={X(m.x)} y1={P.t - 6} y2={H - P.b} stroke={COR_MARCADOR[m.nome] ?? "#0071E3"} strokeWidth={2} strokeDasharray={m.nome === "Moda" ? "4 3" : undefined} />
          <text x={X(m.x)} y={12 + (i % 3) * 0} textAnchor={i % 2 ? "start" : "end"} dx={i % 2 ? 3 : -3} fontSize="11" fontWeight="600" fill={COR_MARCADOR[m.nome] ?? "#0071E3"}>{m.nome} {virgula(m.x)}</text>
        </g>
      ))}
    </svg>
  );
}

function Sino({ g }: { g: G }) {
  const W = 640, H = 240, P = 24;
  const xs = g.series.map((s) => s.x as number), ys = g.series.map((s) => s.y as number);
  const x0 = xs[0], x1 = xs[xs.length - 1], ymax = Math.max(...ys);
  const X = (v: number) => P + ((v - x0) / (x1 - x0)) * (W - 2 * P), Y = (v: number) => H - 28 - (v / ymax) * (H - 50);
  const curva = g.series.map((s, i) => `${i ? "L" : "M"}${X(s.x)},${Y(s.y)}`).join(" ");
  const [a, b] = g.area ?? [x0, x0];
  const dentro = g.series.filter((s) => s.x >= a && s.x <= b);
  const area = dentro.length ? `M${X(a)},${H - 28} ` + dentro.map((s) => `L${X(s.x)},${Y(s.y)}`).join(" ") + ` L${X(b)},${H - 28} Z` : "";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Curva normal com a área da probabilidade pintada" className="w-full">
      <path d={area} fill="#0071E3" opacity={0.3} />
      <path d={curva} fill="none" stroke="#0071E3" strokeWidth={2.5} />
      <line x1={P} x2={W - P} y1={H - 28} y2={H - 28} stroke="#D2D2D7" />
      {[a, b, ...g.marcadores.map((m) => m.x)].map((v, i) => <text key={i} x={X(v)} y={H - 10} textAnchor="middle" fontSize="11" fill="#6E6E73">{virgula(v)}</text>)}
    </svg>
  );
}

function Arvore({ g }: { g: G }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-2 p-0 font-mono text-[15px]">
      {g.series.map((s) => <li key={s.evento} className="rounded-xl bg-fundo px-4 py-2">Início → <b>{s.evento}</b> (P = {virgula(s.P)}) → evento observado (P = {virgula(s.P_cond)})</li>)}
    </ul>
  );
}

function Categorico({ g }: { g: G }) {
  const dados = g.tipo === "histograma" ? g.series.map((s) => ({ x: s.classe, n: s.ni, destaque: false })) : g.series.map((s) => ({ x: String(s.x), n: s.n, destaque: !!s.destaque }));
  const temDestaque = dados.some((d) => d.destaque);
  return (
    <div style={{ height: 260 }} role="img" aria-label="Gráfico de barras">
      <ResponsiveContainer>
        <BarChart data={dados} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#E8E8ED" />
          <XAxis dataKey="x" tick={{ fontSize: 12 }} /><YAxis tick={{ fontSize: 12 }} /><Tooltip />
          <Bar dataKey="n" radius={[4, 4, 0, 0]} isAnimationActive={false}>
            {dados.map((d, i) => <Cell key={i} fill={temDestaque ? (d.destaque ? "#0071E3" : "#B9D6F5") : "#0071E3"} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function Grafico({ g }: { g: G }) {
  const titulo = { barras: "Frequências", histograma: "Histograma", sino: "Curva normal", arvore: "Árvore de probabilidades" }[g.tipo] ?? "Gráfico";
  const numerico = g.tipo === "barras" && g.marcadores.length > 0 && typeof g.series[0]?.x === "number";
  return (
    <section aria-labelledby="grafico" className="flex flex-col gap-3 rounded-[20px] bg-cartao p-6 shadow-cartao">
      <h2 id="grafico" className="m-0 text-[22px] font-semibold">{titulo}</h2>
      {g.tipo === "sino" ? <Sino g={g} /> : g.tipo === "arvore" ? <Arvore g={g} /> : numerico ? <BarrasNumericas g={g} /> : <Categorico g={g} />}
      {g.histograma && <><h3 className="m-0 mt-2 text-lg font-semibold">Histograma das classes</h3><Categorico g={{ ...g, tipo: "histograma", series: g.histograma.map((h) => ({ classe: h.classe, ni: h.ni })) }} /></>}
    </section>
  );
}
