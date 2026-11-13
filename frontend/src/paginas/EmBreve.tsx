export default function EmBreve({ titulo, fase }: { titulo: string; fase?: string }) {
  return (
    <section className="mx-auto max-w-[1080px] px-6 py-24 text-center">
      <h1 className="m-0 text-[40px] font-bold">{titulo}</h1>
      {fase && <p className="mt-3 text-texto-2">Esta tela entra na Fase {fase} do plano.</p>}
    </section>
  );
}
