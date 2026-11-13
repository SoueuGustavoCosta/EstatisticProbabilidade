import { NavLink, Outlet } from "react-router-dom";
import { useProgresso } from "../progresso/store";

const links = [
  { para: "/", rotulo: "Início", fim: true },
  { para: "/trilhas", rotulo: "Trilhas" },
  { para: "/calculadora", rotulo: "Calculadora" },
  { para: "/laboratorio", rotulo: "Laboratório" },
];

export default function Layout() {
  const { xp, streak } = useProgresso();
  return (
    <div className="min-h-screen">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-20 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Pular para o conteúdo</a>
      <header className="sticky top-0 z-10 border-b border-linha bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-[52px] max-w-[1080px] items-center justify-between gap-4 px-6">
          <NavLink to="/" className="text-[17px] font-semibold tracking-tight text-texto">
            Estatística
          </NavLink>
          <nav aria-label="Principal" className="flex gap-5 text-sm sm:gap-7">
            {links.map((l) => (
              <NavLink
                key={l.para}
                to={l.para}
                end={l.fim}
                className={({ isActive }) =>
                  isActive ? "font-semibold text-texto" : "text-texto-3 hover:text-texto"
                }
              >
                {l.rotulo}
              </NavLink>
            ))}
          </nav>
          <span className="hidden text-[13px] text-texto-2 sm:inline">{xp} XP · {streak} {streak === 1 ? "dia seguido" : "dias seguidos"}</span>
        </div>
      </header>
      <main id="conteudo">
        <Outlet />
      </main>
      <footer className="mx-auto max-w-[1080px] border-t border-linha px-6 py-6 text-xs text-texto-2">
        Conteúdo baseado nos slides das aulas 1 a 6 e na apostila da disciplina.
      </footer>
    </div>
  );
}
