import { useEffect, useState } from "react";
import { AlertTriangle, Cookie, X } from "lucide-react";
import { camposPendentes } from "../config/unidade";
import { iniciarTags, lerConsentimento, rastrearWhatsApp, salvarConsentimento, temAlgumaTag } from "../lib/tracking";
import { linkWhatsApp } from "../lib/whatsapp";
import { WhatsIcon } from "./ui";

/* ---------------- Botão flutuante ---------------- */
export function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisivel(true);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = linkWhatsApp();
  const classe = `fixed bottom-4 right-4 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-whats-500 text-white
    shadow-[0_10px_30px_-6px_rgba(18,140,74,0.7)] transition-all duration-300 hover:scale-105 hover:bg-whats-600
    focus:outline-none focus-visible:ring-4 focus-visible:ring-whats-500/50 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16
    ${visivel ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`;

  // Sem WhatsApp configurado o botão não aparece (a página continua levando ao formulário).
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Sorridents no WhatsApp" className={classe}
      onClick={() => rastrearWhatsApp("flutuante")} data-track="whatsapp" data-local="flutuante" tabIndex={visivel ? 0 : -1}>
      <WhatsIcon className="h-8 w-8" />
    </a>
  );
}

/* ---------------- Consentimento de cookies (LGPD) ---------------- */
export function CookieConsent() {
  const [aberto, setAberto] = useState(false);
  useEffect(() => {
    if (!temAlgumaTag()) return; // sem tags configuradas, não há o que consentir
    if (lerConsentimento() === "aceito") iniciarTags();
    else if (lerConsentimento() === null) setAberto(true);
  }, []);
  if (!aberto) return null;

  const decidir = (v: "aceito" | "recusado") => {
    salvarConsentimento(v);
    setAberto(false);
  };

  return (
    <div role="region" aria-label="Aviso de cookies"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-slate-200 sm:p-5">
      <div className="flex gap-3">
        <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
        <p className="text-sm text-slate-600">
          Usamos cookies para medir o desempenho dos nossos anúncios e melhorar sua experiência. Você pode aceitar ou recusar.
        </p>
      </div>
      <div className="mt-3 flex justify-end gap-2">
        <button onClick={() => decidir("recusado")} className="min-h-[40px] rounded-lg px-4 text-sm font-bold text-slate-600 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-slate-200">
          Recusar
        </button>
        <button onClick={() => decidir("aceito")} className="min-h-[40px] rounded-lg bg-brand-600 px-4 text-sm font-bold text-white hover:bg-brand-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200">
          Aceitar
        </button>
      </div>
    </div>
  );
}

/* ---------------- Aviso de configuração (some quando tudo estiver preenchido) ---------------- */
export function AvisoConfiguracao() {
  const [fechado, setFechado] = useState(false);
  const pend = camposPendentes();
  if (!pend.length || fechado) return null;
  return (
    <div role="status" className="fixed bottom-4 left-4 z-[55] max-w-[300px] rounded-xl bg-amber-50 p-3 pr-9 text-xs text-amber-900 shadow-lg ring-1 ring-amber-200">
      <p>
        <AlertTriangle className="mr-1 inline h-3.5 w-3.5 -translate-y-px" aria-hidden="true" />
        <strong>Faltando</strong> (src/config/unidade.ts): {pend.join(" · ")}
      </p>
      <button onClick={() => setFechado(true)} aria-label="Fechar aviso" className="absolute right-2 top-2 rounded p-1 hover:bg-amber-100">
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
