import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { unidade } from "../config/unidade";
import { BotaoFormulario } from "./ui";

export const MENU = [
  { href: "#resultados", rotulo: "Antes e depois" },
  { href: "#avaliacoes", rotulo: "Avaliações" },
  { href: "#clinica", rotulo: "A clínica" },
];

export function Logo({ className = "h-8 w-auto sm:h-10" }: { className?: string }) {
  return <img src={unidade.logo} alt={`Logo ${unidade.nomeUnidade}`} className={className} width={438} height={92} />;
}

/** Cabeçalho em pílula branca flutuante (mesmo estilo da LP do Anhangabaú). O botão leva ao formulário. */
export function Header() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:top-5 sm:px-6">
      <div className="mx-auto max-w-[1280px] rounded-[2rem] bg-white/95 shadow-[0_10px_40px_-12px_rgba(20,15,59,0.25)] ring-1 ring-black/5 backdrop-blur">
        <div className="flex h-[60px] items-center justify-between gap-3 pl-4 pr-2.5 sm:h-[64px] sm:pl-5">
          <a href="#inicio" className="flex min-w-0 items-center gap-3 rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-celeste/30">
            <Logo className="h-7 w-auto sm:h-9" />
          </a>

          <nav aria-label="Menu principal" className="hidden items-center gap-9 font-btn text-[1.02rem] font-semibold text-tinta lg:flex">
            {MENU.map((m) => (
              <a key={m.href} href={m.href} className="rounded transition hover:text-celeste focus:outline-none focus-visible:ring-4 focus-visible:ring-celeste/30">
                {m.rotulo}
              </a>
            ))}
            <BotaoFormulario className="!min-h-[38px] !px-6 !py-1.5 !text-[0.98rem]">Agendar avaliação</BotaoFormulario>
          </nav>

          <div className="flex items-center gap-1.5 lg:hidden">
            <BotaoFormulario className="!min-h-[38px] whitespace-nowrap !px-4 !py-1.5 !text-sm">Agendar</BotaoFormulario>
            <button
              type="button"
              onClick={() => setAberto(!aberto)}
              aria-expanded={aberto}
              aria-controls="menu-mobile"
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-tinta hover:bg-nevoa focus:outline-none focus-visible:ring-4 focus-visible:ring-celeste/30"
            >
              {aberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {aberto && (
          <nav id="menu-mobile" aria-label="Menu" className="border-t border-nevoa px-5 pb-3 lg:hidden">
            <ul>
              {[...MENU, { href: "#agendar", rotulo: "Agendar avaliação" }].map((m) => (
                <li key={m.href}>
                  <a href={m.href} onClick={() => setAberto(false)} className="block py-3 font-btn text-lg font-semibold text-tinta">
                    {m.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
