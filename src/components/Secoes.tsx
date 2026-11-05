import { useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  BadgeCheck,
  Bookmark,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronsLeftRight,
  Clock,
  Ellipsis,
  Heart,
  LoaderCircle,
  Lock,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Smile,
  Sparkles,
  Star,
} from "lucide-react";
import { isPendente, unidade } from "../config/unidade";
import { formatarWhatsApp, linkWhatsApp } from "../lib/whatsapp";
import { rastrearFormulario, rastrearWhatsApp } from "../lib/tracking";
import { Logo } from "./Header";
import { BarraStatus, BotaoFormulario, Foto, MockupCelular, MockupNotebook, WhatsIcon } from "./ui";

/* ---------- utilitários ---------- */

/** Converte **trecho** em <strong>. */
function B({ t, forte = "font-bold" }: { t: string; forte?: string }) {
  return (
    <>
      {t.split(/(\*\*[^*]+\*\*)/g).map((p, i) =>
        p.startsWith("**") ? <strong key={i} className={forte}>{p.slice(2, -2)}</strong> : <span key={i}>{p}</span>,
      )}
    </>
  );
}

const FUNDO_ESCURO =
  "bg-noite-900 bg-[radial-gradient(ellipse_70%_60%_at_8%_0%,rgba(52,42,160,0.45),transparent_60%),radial-gradient(ellipse_50%_50%_at_100%_100%,rgba(110,20,60,0.45),transparent_60%)]";

/** Faixa com as 4 cores da logo (mesma usada nos criativos da unidade). */
function FaixaCores({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`grid h-1.5 grid-cols-4 ${className}`}>
      <span className="bg-rosa" />
      <span className="bg-tinta" />
      <span className="bg-[#0E9A3E]" />
      <span className="bg-celeste" />
    </div>
  );
}

function TagEscura({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/[0.04] px-4 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.08em] text-white/90">
      <span className="h-1 w-1 rounded-full bg-white" aria-hidden="true" />
      {children}
    </span>
  );
}

function TagClara({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-noite-800 px-4 py-1.5 text-[0.66rem] font-semibold uppercase tracking-[0.06em] text-white">
      <span className="h-1 w-1 rounded-full bg-white" aria-hidden="true" />
      {children}
    </span>
  );
}

function Estrelas({ n = 5, tam = "h-4 w-4" }: { n?: number; tam?: string }) {
  return (
    <span className="inline-flex" role="img" aria-label={`${n.toLocaleString("pt-BR")} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, n - i)); // permite estrela parcial (ex.: 4,6)
        return (
          <span key={i} className={`relative inline-block ${tam}`}>
            <Star className={`absolute inset-0 ${tam} fill-slate-200 text-slate-200`} aria-hidden="true" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${tam} fill-[#F6B800] text-[#F6B800]`} aria-hidden="true" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

function SeloAntes({ className = "" }: { className?: string }) {
  return <span className={`rounded-full bg-tinta px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-white shadow-md ${className}`}>Antes</span>;
}
function SeloDepois({ className = "" }: { className?: string }) {
  return <span className={`rounded-full bg-[#0E9A3E] px-3 py-0.5 text-[0.7rem] font-bold uppercase tracking-wider text-white shadow-md ${className}`}>Depois</span>;
}

/* =============== TOPO =============== */
export function Hero() {
  const h = unidade.hero;
  const dentista = unidade.dentista;
  const g = unidade.google;
  const destaque = g.avaliacoes.find((a) => a.texto.length < 120) ?? g.avaliacoes[0];
  const cores = ["#8D6E63", "#5C6BC0", "#26A69A"];

  return (
    <section id="inicio" aria-labelledby="hero-titulo" className="relative overflow-hidden bg-[#EDF1FA]">
      {/* fundo: brilhos suaves, grade de pontos e o "sorriso" da marca */}
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_45%_55%_at_0%_80%,rgba(244,197,214,0.6),transparent_70%),radial-gradient(ellipse_45%_60%_at_100%_10%,rgba(0,159,227,0.18),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,#000_30%,#000_70%,transparent)]" />
      <svg aria-hidden="true" viewBox="0 0 400 220" className="absolute -right-24 -top-6 w-[520px] text-white/70">
        <path d="M0 0 H400 A200 200 0 0 1 0 0 Z M100 70 H300 A100 100 0 0 1 100 70 Z" fill="currentColor" fillRule="evenodd" />
      </svg>

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-y-9 px-5 pb-20 pt-24 sm:px-8 sm:pt-28 lg:min-h-[800px] lg:grid-cols-[1.05fr_1fr] lg:grid-rows-[auto_auto] lg:gap-x-10 lg:gap-y-0 lg:pt-32">
        {/* texto: título (no celular aparece antes da foto) */}
        <div className="relative z-10 order-1 text-center lg:order-none lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full bg-tinta px-4 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white shadow-[0_8px_20px_-8px_rgba(48,38,131,0.6)]">
            <MapPin className="h-3.5 w-3.5 text-accent-400" aria-hidden="true" />
            Dentista {unidade.bairroCurto}/SP
          </span>

          <h1 id="hero-titulo" className="mt-5 font-display text-[2.15rem] font-extrabold leading-[1.08] tracking-tight text-tinta sm:text-[3.2rem] lg:text-[3rem] xl:text-[3.25rem]">
            Volte a sorrir{" "}
            <span className="relative inline-block text-celeste">
              sem vergonha
              <svg aria-hidden="true" viewBox="0 0 200 14" preserveAspectRatio="none" className="absolute -bottom-2 left-0 h-3 w-full text-accent-500">
                <path d="M3 10 C 50 3, 140 2, 197 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            em São Bernardo
          </h1>

          <p className="mx-auto mt-4 max-w-[520px] lg:mt-6 text-[1.05rem] leading-relaxed text-tinta/80 sm:text-[1.2rem] lg:mx-0">
            Na <strong className="font-bold text-tinta">{unidade.nomeUnidade}</strong> {h.subtitulo}
          </p>
        </div>

        {/* texto: benefícios e botões (no celular aparece depois da foto) */}
        <div className="relative z-10 order-3 text-center lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
          <ul className="mx-auto mt-0 grid max-w-[480px] grid-cols-2 gap-2.5 text-left lg:mx-0 lg:mt-6">
            {["Avaliação com dentista", "Implantes e próteses", "Plano de tratamento claro", "Agendamento rápido"].map((t) => (
              <li
                key={t}
                className="flex min-h-[54px] items-center gap-2 rounded-2xl bg-white px-3 py-2.5 text-[0.82rem] font-semibold leading-tight text-tinta shadow-[0_10px_24px_-14px_rgba(20,15,59,0.35)] ring-1 ring-tinta/10 sm:gap-2.5 sm:px-4 sm:text-[0.92rem]"
              >
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0E9A3E]" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <BotaoFormulario className="w-full max-w-[340px] !min-h-[56px] !text-[1.15rem] sm:w-auto">Agendar minha avaliação</BotaoFormulario>
            <a
              href="#resultados"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-full px-6 font-btn text-[1.05rem] font-semibold text-tinta ring-2 ring-inset ring-tinta/20 transition hover:bg-white hover:ring-tinta/40"
            >
              Ver antes e depois <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          {/* prova social */}
          <a href="#avaliacoes" className="mt-8 inline-flex items-center gap-3 rounded-2xl text-left">
            <span className="flex -space-x-2.5">
              {g.avaliacoes.slice(0, 3).map((a, i) => (
                <span key={a.nome} className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-[#EDF1FA] text-sm font-bold text-white" style={{ background: cores[i] }}>
                  {a.nome.charAt(0)}
                </span>
              ))}
            </span>
            <span>
              <Estrelas n={g.notaMedia ?? 5} tam="h-4 w-4" />
              <span className="block text-[0.82rem] font-semibold text-tinta/80">
                {g.notaMedia ? `Nota ${g.notaMedia.toLocaleString("pt-BR")} no Google${g.totalAvaliacoes ? ` · ${g.totalAvaliacoes.toLocaleString("pt-BR")} avaliações` : ""}` : "Pacientes que indicam no Google"}
              </span>
            </span>
          </a>
        </div>

        {/* cartão de antes e depois */}
        <div className="relative order-2 mx-auto w-full max-w-[440px] lg:order-none lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mr-4">
          {/* aura colorida pulsando atrás do celular */}
          <div aria-hidden="true" className="aura absolute left-1/2 top-1/2 h-[95%] w-[115%] rounded-full bg-[conic-gradient(from_90deg,#E30512,#302683,#0E9A3E,#009FE3,#E30512)] blur-3xl" />
          {/* faixas com as 4 cores da logo atrás do cartão */}
          <div aria-hidden="true" className="absolute inset-x-3 inset-y-14 -rotate-6 overflow-hidden rounded-[2.5rem] opacity-90 sm:-inset-x-6 sm:inset-y-10">
            <div className="grid h-full grid-cols-4">
              <span className="bg-rosa" />
              <span className="bg-tinta" />
              <span className="bg-[#0E9A3E]" />
              <span className="bg-celeste" />
            </div>
          </div>

          <div className="flutuar relative">
            <MockupCelular className="relative mx-auto w-[min(76vw,300px)] sm:w-[330px] rotate-[3deg] transition duration-500 hover:rotate-0">
              <BarraStatus />
              {/* post da unidade */}
              <div className="flex items-center gap-2.5 px-3.5 pb-2.5 pt-1">
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(#E30512,#302683,#0E9A3E,#009FE3,#E30512)] p-[2px]">
                  <span className="block h-full w-full overflow-hidden rounded-full bg-white p-[2px]">
                    <img src="/img/icone-sorridents.png" alt="" className="h-full w-full rounded-full object-cover" />
                  </span>
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <span className="flex items-center gap-1 text-[0.8rem] font-bold text-slate-900">
                    <span className="truncate">{unidade.nomeUnidade}</span>
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 fill-celeste text-white" aria-hidden="true" />
                  </span>
                  <span className="block text-[0.68rem] text-slate-500">{unidade.cidadeCompleta}</span>
                </span>
                <Ellipsis className="h-4 w-4 text-slate-700" aria-hidden="true" />
              </div>
              {/* foto do post: dentista da unidade */}
              <div className="relative aspect-[700/780] overflow-hidden">
                <Foto src={dentista.foto} alt={`${dentista.nome}, ${dentista.cargo.toLowerCase()} da ${unidade.nomeUnidade}`} rotulo="Foto da dentista (pendente)" className="h-full w-full object-[50%_20%]" prioridade />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-noite-900/85 via-noite-900/30 to-transparent" />
                <div className="absolute inset-x-3 bottom-3 text-left text-white">
                  <span className="inline-flex items-center gap-1 rounded-full bg-celeste px-2.5 py-0.5 text-[0.6rem] font-extrabold uppercase tracking-wider">
                    <BadgeCheck className="h-3 w-3" aria-hidden="true" /> {dentista.cargo}
                  </span>
                  <span className="mt-1 block font-display text-[1.15rem] font-extrabold leading-tight drop-shadow">{dentista.nome}</span>
                </div>
                {/* reflexo passando pela foto */}
                <span aria-hidden="true" className="brilho pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
              <div aria-hidden="true" className="flex items-center gap-3.5 px-3.5 pt-2.5 text-slate-900">
                <span className="relative inline-flex">
                  <Heart className="batida h-6 w-6 fill-rosa text-rosa" />
                  <Heart className="coracao-sobe absolute left-1 top-0 h-4 w-4 fill-rosa text-rosa" style={{ animationDelay: "0s", ["--dx" as string]: "-14px" }} />
                  <Heart className="coracao-sobe absolute left-1 top-0 h-4 w-4 fill-celeste text-celeste" style={{ animationDelay: "0.9s", ["--dx" as string]: "10px" }} />
                  <Heart className="coracao-sobe absolute left-1 top-0 h-4 w-4 fill-accent-500 text-accent-500" style={{ animationDelay: "1.7s", ["--dx" as string]: "-4px" }} />
                </span>
                <MessageCircle className="h-[22px] w-[22px]" />
                <Send className="h-[21px] w-[21px]" />
                <Bookmark className="ml-auto h-[21px] w-[21px]" />
              </div>
              <p className="px-3.5 pb-3 pt-2 text-[0.76rem] leading-snug text-slate-700">
                <strong className="font-bold text-slate-900">{dentista.nome}</strong> · {dentista.legenda}
              </p>
              <div className="px-3.5 pb-7">
                <a href="#agendar" className="flex min-h-[42px] items-center justify-center gap-1.5 rounded-xl bg-tinta text-[0.85rem] font-bold text-white transition hover:bg-celeste">
                  <CalendarCheck className="h-4 w-4" aria-hidden="true" /> Agendar minha avaliação
                </a>
              </div>
            </MockupCelular>
          </div>

          {/* avaliação flutuante */}
          {destaque && (
            <figure className="absolute -bottom-10 -left-2 hidden w-[220px] sm:block rounded-2xl bg-white p-3.5 text-left shadow-[0_20px_40px_-15px_rgba(20,15,59,0.45)] ring-1 ring-black/5 sm:-left-12 sm:w-[250px]">
              <div className="flex items-center gap-1.5">
                <Estrelas n={destaque.nota} tam="h-3.5 w-3.5" />
                <span className="text-[0.7rem] font-semibold text-slate-500">Google</span>
              </div>
              <blockquote className="mt-1.5 line-clamp-3 text-[0.8rem] leading-snug text-slate-700">“{destaque.texto}”</blockquote>
              <figcaption className="mt-1.5 text-[0.75rem] font-bold text-tinta">{destaque.nome}</figcaption>
            </figure>
          )}

          {/* selo flutuante */}
          <div className="absolute -right-2 -top-5 flex items-center gap-2 rounded-full bg-white py-2 pl-2 pr-4 shadow-[0_14px_30px_-12px_rgba(20,15,59,0.45)] ring-1 ring-black/5 sm:-right-8">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-tinta">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <span className="text-[0.8rem] font-bold leading-tight text-tinta">
              Sorriso
              <br />
              renovado
            </span>
          </div>
        </div>
      </div>
      <FaixaCores />
    </section>
  );
}

/* =============== 1. ANTES E DEPOIS =============== */
export function Resultados() {
  const casos = unidade.resultadosAutorizados ? unidade.resultados : [];
  if (!casos.length) return null;

  return (
    <section id="resultados" aria-labelledby="res-titulo" className={`scroll-mt-24 overflow-x-clip py-14 text-white sm:py-20 ${FUNDO_ESCURO}`}>
      <div className="mx-auto max-w-[900px] px-5 text-center">
        <TagEscura>Antes e depois</TagEscura>
        <h2 id="res-titulo" className="mt-6 font-display text-[1.9rem] font-extrabold leading-tight tracking-tight sm:text-[2.4rem]">
          Seu sorriso de volta. <span className="block text-celeste sm:inline">Sua confiança também.</span>
        </h2>
        <p className="mx-auto mt-3 max-w-[620px] text-[0.95rem] leading-relaxed text-white/85">
          Casos reais de pacientes da <strong className="font-bold text-white">{unidade.nomeUnidade}</strong>, publicados com autorização.
        </p>

        <ul className="mt-6 space-y-10 md:mt-10">
          {casos.map((c, i) => (
            <li key={i}>
              <CasoAntesDepois
                caso={c}
                chamada={
                  i === casos.length - 1 ? (
                    <div className="mt-6 text-center md:mt-8">
                      <p className="text-[1rem] text-white/90">
                        Seu novo sorriso <strong className="font-bold text-white">pode ser o próximo.</strong>
                      </p>
                      <BotaoFormulario className="mt-4" />
                    </div>
                  ) : null
                }
              />
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}

function CasoAntesDepois({ caso, chamada }: { caso: (typeof unidade.resultados)[number]; chamada?: ReactNode }) {
  const [pos, setPos] = useState(50);
  const mexeu = useRef(false);

  /** Quando a tampa termina de abrir, o comparador "passeia" sozinho para mostrar o antes e o depois. */
  const demonstrar = () => {
    const ini = performance.now();
    const dur = 2800;
    const e = (k: number) => k * k * (3 - 2 * k);
    const passo = (t: number) => {
      if (mexeu.current) return;
      const k = Math.min(1, (t - ini) / dur);
      const v = k < 0.33 ? 50 - 40 * e(k / 0.33) : k < 0.75 ? 10 + 80 * e((k - 0.33) / 0.42) : 90 - 40 * e((k - 0.75) / 0.25);
      setPos(v);
      if (k < 1) requestAnimationFrame(passo);
    };
    requestAnimationFrame(passo);
  };

  return (
    <figure>
      <MockupNotebook
        url="sorridents.com.br/sao-bernardo-centro"
        className="mx-auto max-w-[860px]"
        onAberto={demonstrar}
        rodape={
          <>
            <figcaption className="mt-5 flex flex-wrap items-center justify-center gap-2 text-[0.75rem] text-white/70 md:mt-8">
              {caso.tratamento && <span className="rounded-full bg-white px-3 py-0.5 font-bold uppercase tracking-wider text-tinta">{caso.tratamento}</span>}
              <span>
                Caso real de paciente da unidade<span className="hidden md:inline"> · arraste para comparar</span>
              </span>
            </figcaption>
            {chamada}
          </>
        }
      >
        {/* celular: uma foto em cima da outra (como nos criativos) */}
        <div className="space-y-[3px] bg-white md:hidden">
          <div className="relative aspect-[1000/330]">
            <img src={caso.antes} alt={`Antes: ${caso.alt}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <SeloAntes className="absolute left-2 top-2 !text-[0.62rem]" />
          </div>
          <div className="relative aspect-[1000/330]">
            <img src={caso.depois} alt={`Depois: ${caso.alt}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
            <SeloDepois className="absolute left-2 top-2 !text-[0.62rem]" />
          </div>
        </div>

        {/* computador: comparador arrastável */}
        <div className="relative hidden aspect-[1000/330] select-none md:block">
          <img src={caso.depois} alt={`Depois: ${caso.alt}`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" />
          <img src={caso.antes} alt={`Antes: ${caso.alt}`} loading="lazy" decoding="async" draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
          <SeloAntes className="absolute left-3 top-3" />
          <SeloDepois className="absolute right-3 top-3" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.35)]" style={{ left: `${pos}%` }}>
            <span className="absolute left-1/2 top-1/2 inline-flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-tinta shadow-lg">
              <ChevronsLeftRight className="h-5 w-5" />
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => {
              mexeu.current = true;
              setPos(Number(e.target.value));
            }}
            aria-label="Arraste para comparar antes e depois"
            className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
      </MockupNotebook>
    </figure>
  );
}

/* =============== 2. AVALIAÇÕES =============== */
function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.8z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

export function Avaliacoes() {
  const g = unidade.google;
  if (!g.avaliacoes.length) return null;
  const cores = ["#8D6E63", "#5C6BC0", "#26A69A", "#EF6C00", "#7E57C2"];

  return (
    <section id="avaliacoes" aria-labelledby="aval-titulo" className="relative scroll-mt-24 overflow-hidden bg-nevoa py-14 sm:py-20">
      <div aria-hidden="true" className="absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-celeste/10 blur-3xl" />
      <div className="relative mx-auto max-w-[1080px] px-5 text-center">
        <TagClara>Avaliações</TagClara>
        <h2 id="aval-titulo" className="mt-4 font-display text-[2rem] font-extrabold leading-tight tracking-tight text-tinta sm:text-[2.5rem]">
          Quem conhece, <span className="text-rosa">indica.</span>
        </h2>
        <a
          href={g.perfilUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[0.85rem] font-semibold text-tinta shadow-sm ring-1 ring-black/5 hover:ring-celeste/40"
        >
          <GoogleG />
          {g.notaMedia ? (
            <>
              <strong>{g.notaMedia.toLocaleString("pt-BR")}</strong>
              <Estrelas n={g.notaMedia} tam="h-3.5 w-3.5" />
              {g.totalAvaliacoes ? <span className="font-normal text-tinta/70">{g.totalAvaliacoes.toLocaleString("pt-BR")} avaliações</span> : null}
            </>
          ) : (
            "Avaliações reais no Google"
          )}
        </a>

        <ul className="mt-10 grid gap-5 text-left md:grid-cols-3">
          {g.avaliacoes.map((a, i) => (
            <li key={a.nome} className="flex flex-col rounded-2xl bg-white p-5 shadow-[0_14px_40px_-18px_rgba(20,15,59,0.3)] ring-1 ring-black/5">
              <div className="flex items-center gap-3">
                {a.foto ? (
                  <img src={a.foto} alt="" className="h-10 w-10 rounded-full" loading="lazy" />
                ) : (
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white" style={{ background: cores[i % cores.length] }}>
                    {a.nome.charAt(0)}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.95rem] font-bold text-slate-800">{a.nome}</p>
                  {a.quando && <p className="text-[0.75rem] text-slate-500">{a.quando}</p>}
                </div>
                <GoogleG className="h-5 w-5" />
              </div>
              <div className="mt-3 flex items-center gap-1">
                <Estrelas n={a.nota} />
                <BadgeCheck className="h-4 w-4 fill-[#1A73E8] text-white" aria-hidden="true" />
              </div>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-slate-700">“{a.texto}”</p>
            </li>
          ))}
        </ul>

        <BotaoFormulario className="mt-10">Quero ser o próximo a sorrir</BotaoFormulario>
      </div>
    </section>
  );
}

/* =============== 3. FORMULÁRIO =============== */
function mascaraTelefone(v: string) {
  const d = v.replace(/\D/g, "").replace(/^55(?=\d{10,11}$)/, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

type CampoForm = "nome" | "telefone" | "tratamento" | "aceite";
type Erros = Partial<Record<CampoForm | "geral", string>>;
type Valores = { nome: string; telefone: string; tratamento: string; aceite: boolean };
const CAMPOS: CampoForm[] = ["nome", "telefone", "tratamento", "aceite"];

function validar(c: CampoForm, v: Valores): string | undefined {
  switch (c) {
    case "nome": {
      const n = v.nome.trim();
      if (!n) return "Como podemos te chamar?";
      if (n.length < 3 || !/[a-zA-ZÀ-ÿ]{2,}/.test(n)) return "Digite seu nome.";
      return;
    }
    case "telefone": {
      const d = v.telefone.replace(/\D/g, "");
      if (!d) return "Informe seu WhatsApp para confirmarmos o horário.";
      if (d.length < 10) return "Número incompleto. Inclua o DDD.";
      if (Number(d.slice(0, 2)) < 11) return "DDD inválido.";
      if (d.length === 11 && d[2] !== "9") return "Celular deve começar com 9 depois do DDD.";
      return;
    }
    case "tratamento":
      return v.tratamento ? undefined : "Escolha uma opção (pode ser “Ainda não sei”).";
    case "aceite":
      return v.aceite ? undefined : "Marque para podermos falar com você.";
  }
}

export function Formulario() {
  const f = unidade.formulario;
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tratamento, setTratamento] = useState("");
  const [periodo, setPeriodo] = useState("");
  const [aceite, setAceite] = useState(false);
  const [tocados, setTocados] = useState<Partial<Record<CampoForm, boolean>>>({});
  const [erros, setErros] = useState<Erros>({});
  const [enviando, setEnviando] = useState(false);
  const [enviadoLink, setEnviadoLink] = useState<string | null>(null);

  const valores: Valores = { nome, telefone, tratamento, aceite };
  const ok = (c: CampoForm) => !validar(c, valores);
  const progresso = (["nome", "telefone", "tratamento"] as const).filter(ok).length;

  /** Marca o campo como visitado e valida. */
  const tocar = (c: CampoForm, v: Valores = valores) => {
    setTocados((t) => ({ ...t, [c]: true }));
    setErros((e) => ({ ...e, [c]: validar(c, v) }));
  };
  /** Ao digitar, só revalida campos já visitados (não mostra erro enquanto a pessoa ainda está escrevendo). */
  const atualizar = (c: CampoForm, v: Valores) => {
    if (tocados[c] || erros[c]) setErros((e) => ({ ...e, [c]: validar(c, v) }));
  };

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const er: Erros = {};
    CAMPOS.forEach((c) => {
      const m = validar(c, valores);
      if (m) er[c] = m;
    });
    const msg = [
      `Olá! Vim pelo site da ${unidade.nomeUnidade} e gostaria de agendar uma avaliação.`,
      ``,
      `*Nome:* ${nome.trim()}`,
      `*WhatsApp:* ${telefone}`,
      `*Interesse:* ${tratamento}`,
      periodo ? `*Melhor período:* ${periodo}` : "",
    ]
      .filter((l, i) => l !== "" || i === 1)
      .join("\n");
    const link = linkWhatsApp(msg);
    if (!link && !Object.keys(er).length) {
      er.geral = "O WhatsApp da unidade ainda não foi configurado (src/config/unidade.ts → whatsapp).";
    }
    setErros(er);
    setTocados({ nome: true, telefone: true, tratamento: true, aceite: true });
    const primeiro = CAMPOS.find((c) => er[c]);
    if (primeiro) {
      const el = document.getElementById(`f-${primeiro}`);
      el?.focus({ preventScroll: true });
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    if (!link) return;

    rastrearFormulario(tratamento);
    setEnviando(true);
    const janela = window.open(link, "_blank", "noopener,noreferrer");
    window.setTimeout(() => {
      setEnviando(false);
      setEnviadoLink(link);
      if (!janela) window.location.href = link;
    }, 500);
  };

  const campo = (c: CampoForm) =>
    `block w-full rounded-xl border-0 py-3.5 pl-4 pr-11 text-[1rem] text-slate-800 shadow-sm ring-1 ring-inset placeholder:text-slate-400 transition focus:outline-none focus:ring-2 ${
      erros[c]
        ? "bg-rose-50/60 ring-rosa/60 focus:ring-rosa"
        : tocados[c] && ok(c)
          ? "bg-white ring-[#0E9A3E]/50 focus:ring-[#0E9A3E]"
          : "bg-white ring-slate-200 focus:ring-celeste"
    }`;
  const rotulo = "mb-1.5 flex items-center justify-between gap-2 text-[0.85rem] font-bold text-tinta";
  const erro = (c: CampoForm) =>
    erros[c] ? (
      <p id={`f-${c}-erro`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-[0.78rem] font-semibold text-rosa">
        <span aria-hidden="true" className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rosa text-[0.65rem] font-black text-white">!</span>
        {erros[c]}
      </p>
    ) : null;
  const iconeOk = (c: CampoForm) =>
    tocados[c] && ok(c) && !erros[c] ? (
      <span aria-hidden="true" className="pointer-events-none absolute right-3.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-[#0E9A3E] text-white">
        <Check className="h-3 w-3" strokeWidth={3.5} />
      </span>
    ) : null;
  const primeiroNome = nome.trim().split(" ")[0];

  return (
    <section id="agendar" aria-labelledby="form-titulo" className={`relative scroll-mt-20 overflow-hidden py-14 text-white sm:py-20 ${FUNDO_ESCURO}`}>
      <div className="relative mx-auto grid max-w-[1080px] items-center gap-10 px-5 lg:grid-cols-[1fr_480px] lg:gap-14">
        <div className="text-center lg:text-left">
          <TagEscura>Agendamento</TagEscura>
          <h2 id="form-titulo" className="mt-5 font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.7rem]">
            <B t={f.titulo} forte="font-extrabold text-celeste" />
          </h2>
          <p className="mx-auto mt-4 max-w-[480px] text-[1rem] leading-relaxed text-white/85 lg:mx-0">{f.texto}</p>
          <ol className="mx-auto mt-7 max-w-[420px] space-y-4 text-left lg:mx-0">
            {[
              { Icone: CalendarCheck, t: "Preencha em menos de 1 minuto", s: "Nome, WhatsApp e o que você procura." },
              { Icone: WhatsIcon, t: "Envie pelo WhatsApp", s: "A mensagem já vai pronta com seus dados." },
              { Icone: ShieldCheck, t: "Confirmamos seu horário", s: "Nossa equipe responde e agenda sua avaliação." },
            ].map(({ Icone, t, s }, i) => (
              <li key={t} className="flex items-start gap-3.5">
                <span className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <Icone className="h-[18px] w-[18px] text-celeste" />
                  <span className="absolute -right-1 -top-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[0.62rem] font-black text-tinta">{i + 1}</span>
                </span>
                <span>
                  <span className="block text-[0.98rem] font-bold text-white">{t}</span>
                  <span className="block text-[0.85rem] text-white/70">{s}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative">
          <div aria-hidden="true" className="absolute -inset-3 rotate-2 rounded-[2rem] bg-gradient-to-br from-celeste/40 to-rosa/30 blur-sm" />
          <div className="relative overflow-hidden rounded-[1.6rem] bg-[#F5F7FD] text-left text-slate-800 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)]">
            <FaixaCores />
            {enviadoLink ? (
              <div className="p-7 text-center sm:p-9" role="status">
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#0E9A3E]/10">
                  <CheckCircle2 className="h-10 w-10 text-[#0E9A3E]" aria-hidden="true" />
                </span>
                <p className="mt-4 font-display text-[1.5rem] font-extrabold text-tinta">Quase lá{primeiroNome ? `, ${primeiroNome}` : ""}!</p>
                <p className="mt-2 text-[0.95rem] text-slate-600">
                  Abrimos o WhatsApp com seus dados. Agora é só <strong>tocar em enviar</strong> para nossa equipe confirmar seu horário.
                </p>
                <ul className="mx-auto mt-5 max-w-[300px] space-y-1.5 rounded-xl bg-white p-4 text-left text-[0.85rem] ring-1 ring-slate-200">
                  <li>
                    <span className="text-slate-500">Interesse:</span> <strong className="text-tinta">{tratamento}</strong>
                  </li>
                  {periodo && (
                    <li>
                      <span className="text-slate-500">Período:</span> <strong className="text-tinta">{periodo}</strong>
                    </li>
                  )}
                  <li>
                    <span className="text-slate-500">WhatsApp:</span> <strong className="text-tinta">{telefone}</strong>
                  </li>
                </ul>
                <a
                  href={enviadoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => rastrearWhatsApp("form-reabrir")}
                  className="mt-6 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-whats-600 px-6 font-btn text-[1.1rem] font-semibold text-white hover:bg-whats-700"
                >
                  <WhatsIcon /> Abrir o WhatsApp novamente
                </a>
                <button type="button" onClick={() => setEnviadoLink(null)} className="mt-3 text-[0.85rem] font-semibold text-tinta/70 underline underline-offset-2">
                  Corrigir meus dados
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="p-6 sm:p-8">
                {/* cabeçalho do cartão */}
                <div className="flex items-center gap-3">
                  <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-tinta text-white">
                    <Smile className="h-5 w-5" aria-hidden="true" />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-whats-500 ring-2 ring-[#F5F7FD]" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-display text-[1.2rem] font-extrabold leading-tight text-tinta">Preencha e agende</p>
                    <p className="text-[0.8rem] text-slate-500">Equipe {unidade.marca} · resposta pelo WhatsApp</p>
                  </div>
                </div>

                {/* progresso */}
                <div className="mt-5" aria-live="polite">
                  <div className="flex items-center justify-between text-[0.72rem] font-semibold text-slate-500">
                    <span>{progresso === 3 ? "Tudo pronto! É só enviar." : `Passo ${progresso + 1} de 3`}</span>
                    <span aria-hidden="true">{Math.round((progresso / 3) * 100)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
                    <div className="h-full rounded-full bg-gradient-to-r from-celeste to-[#0E9A3E] transition-all duration-500" style={{ width: `${(progresso / 3) * 100}%` }} />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="f-nome" className={rotulo}>
                      Seu nome
                    </label>
                    <div className="relative">
                      <input
                        id="f-nome"
                        name="nome"
                        autoComplete="name"
                        autoCapitalize="words"
                        enterKeyHint="next"
                        value={nome}
                        onChange={(e) => {
                          setNome(e.target.value);
                          atualizar("nome", { ...valores, nome: e.target.value });
                        }}
                        onBlur={() => nome && tocar("nome")}
                        placeholder="Como podemos te chamar?"
                        className={campo("nome")}
                        aria-invalid={!!erros.nome}
                        aria-describedby={erros.nome ? "f-nome-erro" : undefined}
                      />
                      {iconeOk("nome")}
                    </div>
                    {erro("nome")}
                  </div>

                  <div>
                    <label htmlFor="f-telefone" className={rotulo}>
                      WhatsApp com DDD
                      <span className="inline-flex items-center gap-1 text-[0.72rem] font-semibold text-whats-700">
                        <WhatsIcon className="h-3.5 w-3.5" /> confirmamos por aqui
                      </span>
                    </label>
                    <div className="relative">
                      <input
                        id="f-telefone"
                        name="telefone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        enterKeyHint="next"
                        value={telefone}
                        onChange={(e) => {
                          const v = mascaraTelefone(e.target.value);
                          setTelefone(v);
                          const nv = { ...valores, telefone: v };
                          if (v.replace(/\D/g, "").length === 11) tocar("telefone", nv);
                          else atualizar("telefone", nv);
                        }}
                        onBlur={() => telefone && tocar("telefone")}
                        placeholder="(11) 99999-9999"
                        className={campo("telefone")}
                        aria-invalid={!!erros.telefone}
                        aria-describedby={erros.telefone ? "f-telefone-erro" : undefined}
                      />
                      {iconeOk("telefone")}
                    </div>
                    {erro("telefone")}
                  </div>

                  <fieldset>
                    <legend className={rotulo}>O que você procura?</legend>
                    <div
                      id="f-tratamento"
                      tabIndex={-1}
                      role="radiogroup"
                      aria-invalid={!!erros.tratamento}
                      aria-describedby={erros.tratamento ? "f-tratamento-erro" : undefined}
                      className={`grid grid-cols-2 gap-2 rounded-xl focus:outline-none ${erros.tratamento ? "ring-2 ring-rosa/40 ring-offset-4 ring-offset-[#F5F7FD]" : ""}`}
                    >
                      {f.tratamentos.map((t) => {
                        const sel = tratamento === t;
                        return (
                          <label
                            key={t}
                            className={`relative flex min-h-[48px] cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-[0.82rem] font-semibold leading-tight ring-1 ring-inset transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-celeste ${
                              sel ? "bg-tinta text-white shadow-[0_8px_18px_-10px_rgba(48,38,131,0.9)] ring-tinta" : "bg-white text-tinta ring-slate-200 hover:ring-celeste"
                            }`}
                          >
                            <input
                              type="radio"
                              name="tratamento"
                              value={t}
                              checked={sel}
                              onChange={() => {
                                setTratamento(t);
                                tocar("tratamento", { ...valores, tratamento: t });
                              }}
                              className="sr-only"
                            />
                            <span
                              aria-hidden="true"
                              className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${sel ? "bg-accent-500 text-tinta ring-accent-500" : "ring-slate-300"}`}
                            >
                              {sel && <Check className="h-3 w-3" strokeWidth={3.5} />}
                            </span>
                            {t}
                          </label>
                        );
                      })}
                    </div>
                    {erro("tratamento")}
                  </fieldset>

                  <fieldset>
                    <legend className={rotulo}>
                      <span>
                        Melhor período <span className="font-normal text-slate-400">(opcional)</span>
                      </span>
                    </legend>
                    <div className="grid grid-cols-4 gap-2">
                      {f.periodos.map((p) => (
                        <button
                          key={p}
                          type="button"
                          aria-pressed={periodo === p}
                          onClick={() => setPeriodo(periodo === p ? "" : p)}
                          className={`min-h-[44px] rounded-xl px-1 text-[0.82rem] font-semibold ring-1 ring-inset transition focus:outline-none focus-visible:ring-2 focus-visible:ring-celeste ${
                            periodo === p ? "bg-celeste text-white ring-celeste" : "bg-white text-tinta ring-slate-200 hover:ring-celeste"
                          }`}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </fieldset>

                  <div>
                    <label className="flex cursor-pointer items-start gap-2.5 text-[0.78rem] leading-snug text-slate-600">
                      <input
                        id="f-aceite"
                        type="checkbox"
                        checked={aceite}
                        onChange={(e) => {
                          setAceite(e.target.checked);
                          tocar("aceite", { ...valores, aceite: e.target.checked });
                        }}
                        className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-tinta"
                        aria-invalid={!!erros.aceite}
                        aria-describedby={erros.aceite ? "f-aceite-erro" : undefined}
                      />
                      Autorizo a {unidade.nomeUnidade} a falar comigo pelo WhatsApp sobre o agendamento.
                    </label>
                    {erro("aceite")}
                  </div>

                  {erros.geral && <p className="rounded-lg bg-amber-50 p-3 text-[0.8rem] font-semibold text-amber-800 ring-1 ring-amber-200">{erros.geral}</p>}

                  <button
                    type="submit"
                    disabled={enviando}
                    className="inline-flex min-h-[58px] w-full items-center justify-center gap-2 rounded-full bg-[#1E9A40] px-6 font-btn text-[1.2rem] font-semibold text-white shadow-[0_8px_24px_-6px_rgba(30,154,64,0.75)] transition hover:bg-[#178534] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1E9A40]/40 active:scale-[0.98] disabled:cursor-wait disabled:opacity-80"
                  >
                    {enviando ? (
                      <>
                        <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" /> Abrindo o WhatsApp…
                      </>
                    ) : (
                      <>
                        <WhatsIcon /> Quero agendar minha avaliação
                      </>
                    )}
                  </button>
                  <p className="flex items-center justify-center gap-1.5 text-center text-[0.74rem] text-slate-500">
                    <Lock className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    Sem compromisso · seus dados são usados só para o agendamento
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============== 4. A CLÍNICA (vídeo) =============== */
export function Clinica() {
  const c = unidade.clinica;
  const e = unidade.endereco;
  return (
    <section id="clinica" aria-labelledby="clinica-titulo" className="relative scroll-mt-24 overflow-hidden bg-[#ECF1FB] py-14 sm:py-20">
      <div aria-hidden="true" className="absolute -left-24 top-1/3 h-[380px] w-[380px] rounded-full bg-[#F4C5D6]/50 blur-3xl" />
      <div aria-hidden="true" className="absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full bg-celeste/15 blur-3xl" />
      <div className="relative mx-auto max-w-[980px] px-5 text-center">
        <TagClara>A clínica</TagClara>
        <h2 id="clinica-titulo" className="mt-4 font-display text-[1.9rem] font-light leading-[1.1] tracking-tight text-tinta sm:text-[2.4rem]">
          <B t={c.titulo} forte="font-extrabold" />
        </h2>
        <p className="mx-auto mt-4 max-w-[640px] text-[1rem] leading-relaxed text-tinta/80">{c.textos[0]}</p>

        {/* vídeo institucional no centro da seção */}
        {!isPendente(c.video) && (
          <div className="relative mx-auto mt-10 w-full max-w-[720px] sm:mt-12">
            <div aria-hidden="true" className="absolute -inset-4 rotate-2 rounded-[3rem] bg-gradient-to-br from-celeste/30 to-[#F4C5D6]/70 sm:-inset-7" />
            <MockupCelular deitado className="-rotate-1 transition duration-500 hover:rotate-0" tela="bg-noite-900">
              <video
                src={c.video}
                poster={c.videoCapa || undefined}
                controls
                playsInline
                preload="none"
                aria-label={`Vídeo da fachada da ${unidade.nomeUnidade}`}
                className="relative block aspect-video w-full bg-noite-900 object-cover"
              />
            </MockupCelular>
          </div>
        )}

        {c.textos.slice(1).map((t) => (
          <p key={t} className="mx-auto mt-10 max-w-[640px] text-[1rem] leading-relaxed text-tinta/80 sm:mt-12">{t}</p>
        ))}
        <ul className="mx-auto mt-6 grid max-w-[820px] grid-cols-2 gap-2.5 text-left md:grid-cols-4">
          {c.destaques.map((d) => (
            <li key={d} className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-[0.85rem] font-semibold text-tinta shadow-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0E9A3E]" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-5 max-w-[640px] text-[0.9rem] leading-relaxed text-tinta/80">
          <MapPin className="mr-1 inline h-4 w-4 -translate-y-px text-celeste" aria-hidden="true" />
          {isPendente(e.logradouro) ? `${e.bairro}, ${e.cidade} – ${e.uf}` : `${e.logradouro}${e.referencia ? ` (${e.referencia})` : ""} – ${e.bairro}, ${e.cidade} – ${e.uf}`}
          <a href={unidade.googleMapsLink} target="_blank" rel="noopener noreferrer" className="ml-1.5 whitespace-nowrap font-semibold text-celeste underline underline-offset-2">
            Como chegar
          </a>
        </p>
        <BotaoFormulario className="mt-6" />
      </div>
    </section>
  );
}

/* =============== RODAPÉ =============== */
export function Rodape() {
  const rt = unidade.responsavelTecnico;
  const temRT = !isPendente(rt.nome) && !isPendente(rt.cro);
  return (
    <footer className={`text-white ${FUNDO_ESCURO}`}>
      <FaixaCores />
      <div className="mx-auto grid max-w-[980px] gap-8 px-5 pb-24 pt-12 text-center sm:grid-cols-3 sm:pb-10 sm:text-left">
        <div>
          <span className="inline-flex rounded-lg bg-white px-3 py-2">
            <Logo className="h-9 w-auto" />
          </span>
          <p className="mt-4 text-[0.8rem] text-white/85">
            Clínica odontológica no <strong className="font-bold text-white">centro de São Bernardo do Campo</strong>.
          </p>
        </div>
        <div>
          <h2 className="font-display text-[1.05rem] font-semibold">Atendimento</h2>
          <ul className="mt-2 space-y-1.5 text-[0.8rem] tracking-wide text-white/90">
            {unidade.horarios.map((h) => (
              <li key={h} className="flex items-center justify-center gap-2 sm:justify-start">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {h}
              </li>
            ))}
            {!isPendente(unidade.whatsapp) && (
              <li>
                <a href={`https://wa.me/${unidade.whatsapp}`} target="_blank" rel="noopener noreferrer" onClick={() => rastrearWhatsApp("rodape")} className="flex items-center justify-center gap-2 hover:text-white sm:justify-start">
                  <WhatsIcon className="h-3.5 w-3.5" /> {formatarWhatsApp(unidade.whatsapp)}
                </a>
              </li>
            )}
            {!isPendente(unidade.telefone) && (
              <li>
                <a href={`tel:+55${unidade.telefone.replace(/\D/g, "")}`} className="flex items-center justify-center gap-2 hover:text-white sm:justify-start">
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {unidade.telefone}
                </a>
              </li>
            )}
            <li>
              <a href="#agendar" className="flex items-center justify-center gap-2 font-semibold text-celeste hover:text-white sm:justify-start">
                <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" /> Agendar pelo formulário
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-display text-[1.05rem] font-semibold">Prêmios e Honras</h2>
          {!isPendente(unidade.premios.foto) && (
            <img src={unidade.premios.foto} alt={unidade.premios.alt} className="mx-auto mt-3 w-full max-w-[280px] mix-blend-lighten sm:mx-0" loading="lazy" />
          )}
        </div>
      </div>
      <div className="mx-auto max-w-[980px] border-t border-white/20 px-5 pb-24 pt-6 text-center text-[0.68rem] tracking-wide text-white/80 sm:pb-8">
        <p>{new Date().getFullYear()} {unidade.nomeUnidade} © Todos os direitos reservados</p>
        {temRT && (
          <p className="mt-1 text-white/60">
            Responsável técnico: {rt.nome} · {rt.cro}
            {!isPendente(unidade.croClinica) && <> · Clínica: {unidade.croClinica}</>}
          </p>
        )}
        <p className="mt-3 text-white/60">
          Desenvolvido por <strong className="font-bold tracking-wider text-white">MARTINS DEV</strong>
        </p>
      </div>
    </footer>
  );
}
