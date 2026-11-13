import { useEffect, useReducer } from "react";
import MiniCalculadora from "./MiniCalculadora";
import Aparelho from "./Aparelho";
import { aperta, inicial } from "./estado";
import { TECLADO_PC } from "./layout-fx82ms";

const PASSOS_SD = [
  ["MODE", "2", ": aparece SD no visor."],
  ["SHIFT MODE", "1", "(Scl): limpa dados antigos."],
  ["", "", "Digite um valor e aperte M+ (DT). Repita para cada valor."],
  ["SHIFT 2", "", "(S-VAR): 1 x̄ · 2 xσn · 3 xσn-1, depois =."],
  ["SHIFT 1", "", "(S-SUM): 1 Σx² · 2 Σx · 3 n."],
];

export default function Calculadora() {
  const [estado, tecla] = useReducer(aperta, undefined, inicial);

  useEffect(() => {
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const id = /^[0-9]$/.test(e.key) ? e.key : TECLADO_PC[e.key];
      if (id) { e.preventDefault(); tecla(id); }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, []);

  return (
    <div className="mx-auto flex max-w-[1240px] flex-wrap items-start justify-center gap-8 px-3 pb-10 pt-4 sm:gap-10 sm:px-6 sm:pb-16 sm:pt-10">
      <section aria-label="Calculadora Casio fx-82MS" className="w-full max-w-[420px] flex-[0_1_420px]">
        <Aparelho estado={estado} aoApertar={tecla} />
      </section>
      <aside className="flex max-w-[520px] flex-[1_1_380px] flex-col gap-5">
        <div>
          <h1 className="m-0 px-1 text-[32px] font-bold sm:px-0 sm:text-[40px]">Calculadora</h1>
          <p className="mt-2 leading-relaxed text-texto-2">
            Mesmo layout da Casio fx-82MS. As funções em amarelo usam <b className="text-texto">SHIFT</b> antes. O teclado do computador também funciona
            (Enter = “=”, Backspace = DEL, Esc = AC).
          </p>
        </div>
        <div className="flex flex-col gap-3.5 rounded-[20px] bg-cartao p-6">
          <strong className="text-[19px] font-semibold">Modo SD: média e desvio padrão</strong>
          <ol className="m-0 flex list-decimal flex-col gap-2 pl-5 text-[15px] leading-normal text-texto-3">
            {PASSOS_SD.map(([a, b, c], i) => <li key={i}>{a && <b className="text-texto">{a}</b>}{b && <>, depois <b className="text-texto">{b}</b></>} {c}</li>)}
          </ol>
          <div className="grid grid-cols-2 gap-2.5 text-sm leading-snug">
            <div className="rounded-[14px] bg-fundo px-3.5 py-3"><b className="font-mono">xσn</b> = σ populacional<br /><span className="text-texto-2">divide por N</span></div>
            <div className="rounded-[14px] bg-azul-claro px-3.5 py-3"><b className="font-mono text-[#004E9E]">xσn-1</b> = s amostral<br /><span className="text-texto-3">divide por n − 1</span></div>
          </div>
          <span className="text-sm text-texto-2">Teste com 2, 4, 6, 8, 10 (Aula 04): xσn = 2.828427125 e xσn-1 = 3.16227766.</span>
        </div>
        <div className="flex flex-col gap-3 rounded-[20px] bg-cartao p-6">
          <strong className="text-[19px] font-semibold">Veja uma conta, tecla por tecla</strong>
          <span className="text-[15px] text-texto-2">Média das 20 notas (Aula 02): 1328 ÷ 20. Use “Eu faço” para treinar.</span>
          <MiniCalculadora teclas={["1", "3", "2", "8", "÷", "2", "0", "="]} />
        </div>
        <div className="flex flex-col gap-1.5 rounded-[20px] bg-cartao p-6">
          <strong className="mb-1.5 text-[19px] font-semibold">Histórico</strong>
          {estado.hist.map((h, i) => (
            <div key={i} className="flex justify-between gap-3 border-t border-linha py-2.5 font-mono text-[15px]">
              <span className="break-all text-texto-2">{h.e}</span><b>{h.r}</b>
            </div>
          ))}
          {estado.hist.length === 0 && <span className="text-[15px] text-texto-2">Suas contas aparecem aqui.</span>}
        </div>
      </aside>
    </div>
  );
}
