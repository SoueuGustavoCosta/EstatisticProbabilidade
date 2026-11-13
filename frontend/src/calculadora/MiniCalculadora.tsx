import { useEffect, useMemo, useRef, useState } from "react";
import Aparelho from "./Aparelho";
import { aperta, expandir, inicial } from "./estado";

interface Props {
  /** Teclas do passo, no formato do backend (docs/05): ["1","3","2","8","÷","2","0","="]. */
  teclas: string[];
  autoplay?: boolean;
  /** Milissegundos entre teclas no replay. */
  velocidade?: number;
}

/** Calculadora reduzida com replay tecla por tecla e modo "Eu faço" (o aluno digita e o app confere). */
export default function MiniCalculadora({ teclas, autoplay = false, velocidade = 700 }: Props) {
  const seq = useMemo(() => expandir(teclas), [teclas]);
  // estados[k] = estado depois de k teclas
  const estados = useMemo(() => seq.reduce((acc, t) => [...acc, aperta(acc[acc.length - 1], t)], [inicial()]), [seq]);
  const [k, setK] = useState(0);
  const [tocando, setTocando] = useState(autoplay);
  const [euFaco, setEuFaco] = useState(false);
  const [dica, setDica] = useState<string | null>(null);
  const [aluno, setAluno] = useState(inicial());
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { setK(0); setTocando(autoplay); setEuFaco(false); setAluno(inicial()); setDica(null); }, [seq, autoplay]);

  useEffect(() => {
    if (!tocando || euFaco) return;
    if (k >= seq.length) { setTocando(false); return; }
    timer.current = setTimeout(() => setK((v) => v + 1), velocidade);
    return () => clearTimeout(timer.current);
  }, [tocando, k, seq.length, velocidade, euFaco]);

  const reiniciar = () => { setTocando(false); setK(0); setAluno(inicial()); setDica(null); };
  const proxima = seq[k] ?? null;
  const fim = k >= seq.length;

  const apertarAluno = (id: string) => {
    if (!euFaco || fim) return;
    if (id === proxima) { setAluno(aperta(aluno, id)); setK(k + 1); setDica(null); }
    else setDica(`Ainda não: a próxima tecla é ${proxima}.`);
  };

  const mostrado = euFaco ? aluno : estados[k];
  const btn = "rounded-full bg-[#F0F0F3] px-3 py-1 text-[13px] font-medium text-link hover:bg-[#E4E4EA] disabled:opacity-40";
  return (
    <div className="flex w-full max-w-[300px] flex-col gap-2.5" aria-label="Mini calculadora">
      <Aparelho estado={mostrado} compacto destaque={fim ? null : proxima} aoApertar={apertarAluno} />
      <div className="flex flex-wrap gap-1.5">
        {!euFaco && (
          <>
            <button type="button" className={btn} onClick={() => { if (fim) setK(0); setTocando((t) => !t); }}>{tocando ? "⏸ Pausar" : "▶ Reproduzir"}</button>
            <button type="button" className={btn} disabled={fim} onClick={() => { setTocando(false); setK(k + 1); }}>⏭ Passo</button>
          </>
        )}
        <button type="button" className={btn} onClick={reiniciar}>↺ Reiniciar</button>
        <button type="button" className={btn} aria-pressed={euFaco} onClick={() => { reiniciar(); setEuFaco(!euFaco); }}>✋ Eu faço</button>
      </div>
      <p className="m-0 min-h-[20px] text-[13px] text-texto-2" aria-live="polite">
        {euFaco ? (fim ? "✓ Conferido: você apertou todas as teclas na ordem." : dica ?? `Aperte a tecla em azul (${k + 1} de ${seq.length}).`)
          : proxima ? `Próxima tecla: ${proxima} (${k + 1} de ${seq.length})` : "Pronto. O visor mostra o resultado."}
      </p>
    </div>
  );
}
