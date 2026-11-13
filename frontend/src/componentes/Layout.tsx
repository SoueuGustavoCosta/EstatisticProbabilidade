import { ReactNode } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useProgresso } from "../progresso/store";

const Icone = ({ children }: { children: ReactNode }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const links = [
  { para: "/", rotulo: "Início", fim: true, icone: <Icone><path d="M3 11l9-8 9 8" /><path d="M5 10v10h14V10" /></Icone> },
  { para: "/trilhas", rotulo: "Trilhas", icone: <Icone><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></Icone> },
  { para: "/calculadora", rotulo: "Calculadora", icone: <Icone><rect x="5" y="2" width="14" height="20" rx="2" /><rect x="8" y="5" width="8" height="4" /><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" /></Icone> },
  { para: "/laboratorio", rotulo: "Laboratório", icone: <Icone><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" /></Icone> },
];

export default function Layout() {
  const { xp, streak } = useProgresso();
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen pb-[calc(64px+env(safe-area-inset-bottom))] sm:pb-0">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-30 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2">Pular para o conteúdo</a>
      <header className="sticky top-0 z-20 border-b border-linha bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[52px] max-w-[1080px] items-center justify-between gap-4 px-4 sm:px-6">
          <NavLink to="/" className="flex min-h-11 items-center text-[17px] font-semibold tracking-tight text-texto">Estatística</NavLink>
          <nav aria-label="Principal" className="hidden gap-7 text-sm sm:flex">
            {links.map((l) => (
              <NavLink key={l.para} to={l.para} end={l.fim} className={({ isActive }) => `py-2 ${isActive ? "font-semibold text-texto" : "text-texto-3 hover:text-texto"}`}>{l.rotulo}</NavLink>
            ))}
          </nav>
          <span className="text-[13px] text-texto-2">{xp} XP · {streak} {streak === 1 ? "dia" : "dias"}<span className="hidden sm:inline"> {streak === 1 ? "seguido" : "seguidos"}</span></span>
        </div>
      </header>

      <main id="conteudo" key={pathname} className="entra"><Outlet /></main>

      <footer className="mx-auto max-w-[1080px] border-t border-linha px-4 py-6 text-xs text-texto-2 sm:px-6">
        Conteúdo baseado nos slides das aulas 1 a 6 e na apostila da disciplina.
      </footer>

      <nav aria-label="Principal (celular)" className="fixed inset-x-0 bottom-0 z-20 border-t border-linha bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur sm:hidden">
        <ul className="m-0 grid list-none grid-cols-4 p-0">
          {links.map((l) => (
            <li key={l.para}>
              <NavLink to={l.para} end={l.fim} className={({ isActive }) => `flex h-16 flex-col items-center justify-center gap-0.5 text-[11px] ${isActive ? "font-semibold text-[#0066CC]" : "text-texto-3"}`}>
                {l.icone}{l.rotulo}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
