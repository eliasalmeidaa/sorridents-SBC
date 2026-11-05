import { useEffect, useRef, type ReactNode } from "react";
import { ImageIcon, Star, X } from "lucide-react";
import { isPendente } from "../config/unidade";
import { linkWhatsApp } from "../lib/whatsapp";
import { rastrearWhatsApp } from "../lib/tracking";

export function WhatsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.45 9.45 0 0 1-4.82-1.32l-.35-.21-3.58.94.96-3.49-.23-.36a9.44 9.44 0 0 1-1.45-5.03c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.91.99 6.7 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.46-9.47 9.46zm8.06-17.53A11.33 11.33 0 0 0 12.04.63C5.76.63.65 5.74.65 12.02c0 2.01.52 3.97 1.52 5.69L.55 23.6l6.04-1.58a11.36 11.36 0 0 0 5.44 1.39h.01c6.28 0 11.39-5.11 11.39-11.39 0-3.04-1.18-5.9-3.33-8.05z" />
    </svg>
  );
}

type Variante = "primario" | "whats" | "contorno" | "branco" | "verde";

const estilos: Record<Variante, string> = {
  primario:
    "bg-accent-500 text-brand-900 hover:bg-accent-400 shadow-[0_10px_24px_-10px_rgba(230,168,0,0.9)] focus-visible:ring-accent-300",
  whats: "bg-whats-600 text-white hover:bg-whats-700 focus-visible:ring-whats-500/50",
  contorno: "border-2 border-brand-600 text-brand-700 hover:bg-brand-50 focus-visible:ring-brand-200",
  branco: "bg-white text-brand-800 hover:bg-accent-300 focus-visible:ring-white/60",
  // botão verde em pílula com brilho (estilo do modelo Jardim Peri)
  verde:
    "!rounded-full bg-[#1E9A40] font-btn !font-semibold !tracking-normal text-white shadow-[0_8px_24px_-6px_rgba(30,154,64,0.75)] hover:bg-[#178534] focus-visible:ring-[#1E9A40]/40",
};

type BotaoWhatsProps = {
  mensagem?: string;
  local: string;
  tratamento?: string;
  variante?: Variante;
  tamanho?: "md" | "lg";
  children: ReactNode;
  className?: string;
  icone?: boolean;
};

/** Botão que abre o WhatsApp da unidade e registra o clique como conversão. */
export function BotaoWhats({
  mensagem,
  local,
  tratamento,
  variante = "primario",
  tamanho = "md",
  children,
  className = "",
  icone = true,
}: BotaoWhatsProps) {
  const href = linkWhatsApp(mensagem);
  const base = `inline-flex items-center justify-center gap-2 rounded-xl font-extrabold tracking-wide transition
    focus:outline-none focus-visible:ring-4 active:scale-[0.98] text-center
    ${tamanho === "lg" ? "min-h-[56px] px-6 py-4 text-base sm:text-lg" : "min-h-[48px] px-5 py-3 text-sm sm:text-base"}
    ${estilos[variante]} ${className}`;

  if (!href) {
    // Número não configurado: não gera link quebrado; avisa quem está configurando.
    return (
      <button
        type="button"
        className={base}
        onClick={() => alert("Configure o número oficial de WhatsApp em src/config/unidade.ts (campo: whatsapp).")}
        title="WhatsApp pendente de configuração"
      >
        {icone && <WhatsIcon />}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={base}
      onClick={() => rastrearWhatsApp(local, tratamento)}
      data-track="whatsapp"
      data-local={local}
    >
      {icone && <WhatsIcon />}
      {children}
    </a>
  );
}

/** Botão verde em pílula que leva ao formulário de agendamento (ação principal da página). */
export function BotaoFormulario({ children = "Quero agendar minha avaliação", className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <a
      href="#agendar"
      className={`inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[#1E9A40] px-6 py-3 text-center font-btn text-base font-semibold text-white shadow-[0_8px_24px_-6px_rgba(30,154,64,0.75)] transition hover:bg-[#178534] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1E9A40]/40 active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}

/* ---------------- Mockups de aparelhos ---------------- */

/** Barra de status do celular (hora, sinal, wi-fi, bateria). */
export function BarraStatus({ clara = false }: { clara?: boolean }) {
  return (
    <div aria-hidden="true" className={`flex h-9 items-center justify-between px-6 pt-1 text-[0.72rem] font-bold ${clara ? "text-white" : "text-slate-900"}`}>
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg viewBox="0 0 18 12" className="h-2.5 w-[15px]" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1" /><rect x="5" y="5.5" width="3" height="6.5" rx="1" /><rect x="10" y="3" width="3" height="9" rx="1" /><rect x="15" y="0" width="3" height="12" rx="1" /></svg>
        <svg viewBox="0 0 16 12" className="h-2.5 w-[14px]" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.4 10.4 0 0 0 8 .4 10.4 10.4 0 0 0 .8 3.3L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.2-1.3A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.6 1.8l1.2 1.3c.9-.8 2.1-1.3 3.4-1.3zm0 3.5c-.5 0-1 .2-1.3.5L8 11.2l1.3-1.4c-.3-.3-.8-.5-1.3-.5z" /></svg>
        <span className="relative ml-0.5 inline-block h-[11px] w-[22px] rounded-[3px] border border-current p-[1.5px] opacity-90">
          <span className="block h-full w-[80%] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

/** Moldura de celular (estilo iPhone) para fotos e vídeos. */
export function MockupCelular({
  children,
  className = "",
  tela = "bg-white",
  deitado = false,
}: {
  children: ReactNode;
  className?: string;
  tela?: string;
  /** celular na horizontal (para vídeos 16:9) */
  deitado?: boolean;
}) {
  const botao = "absolute bg-[#2b2b35]";
  return (
    <div className={`relative rounded-[2.8rem] bg-gradient-to-b from-[#2b2b35] to-[#121218] p-[9px] shadow-[0_50px_90px_-30px_rgba(14,10,46,0.75),inset_0_0_0_1.5px_rgba(255,255,255,0.12)] ${deitado ? "!rounded-[2rem] sm:!rounded-[2.6rem]" : ""} ${className}`}>
      {deitado ? (
        <>
          <span aria-hidden="true" className={`${botao} -top-[3px] left-[18%] h-[3px] w-7 rounded-t-md`} />
          <span aria-hidden="true" className={`${botao} -top-[3px] left-[26%] h-[3px] w-12 rounded-t-md`} />
          <span aria-hidden="true" className={`${botao} -top-[3px] left-[35%] h-[3px] w-12 rounded-t-md`} />
          <span aria-hidden="true" className={`${botao} -bottom-[3px] left-[28%] h-[3px] w-16 rounded-b-md`} />
        </>
      ) : (
        <>
          <span aria-hidden="true" className={`${botao} -left-[3px] top-[18%] h-7 w-[3px] rounded-l-md`} />
          <span aria-hidden="true" className={`${botao} -left-[3px] top-[26%] h-12 w-[3px] rounded-l-md`} />
          <span aria-hidden="true" className={`${botao} -left-[3px] top-[35%] h-12 w-[3px] rounded-l-md`} />
          <span aria-hidden="true" className={`${botao} -right-[3px] top-[28%] h-16 w-[3px] rounded-r-md`} />
        </>
      )}
      <div className={`relative overflow-hidden ${deitado ? "rounded-[1.5rem] sm:rounded-[2rem]" : "rounded-[2.2rem]"} ${tela}`}>
        {deitado ? (
          <span aria-hidden="true" className="pointer-events-none absolute left-2 top-1/2 z-30 h-[30%] w-[18px] -translate-y-1/2 rounded-full bg-black sm:w-[22px]" />
        ) : (
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-2 z-30 h-[24px] w-[88px] -translate-x-1/2 rounded-full bg-black" />
        )}
        {children}
        {!deitado && (
          <span aria-hidden="true" className="pointer-events-none absolute bottom-1.5 left-1/2 z-30 h-[4px] w-[34%] -translate-x-1/2 rounded-full bg-white mix-blend-difference" />
        )}
      </div>
    </div>
  );
}

/**
 * Moldura de notebook com janela de navegador.
 * O notebook fica parado no centro da tela enquanto a pessoa rola, e a tampa abre conforme a rolagem
 * (assim dá para perceber a abertura). Ao terminar de abrir, chama onAberto (uma vez).
 */
export function MockupNotebook({
  children,
  url = "sorridents.com.br",
  className = "",
  onAberto,
  rodape,
}: {
  children: ReactNode;
  rodape?: ReactNode;
  url?: string;
  className?: string;
  onAberto?: () => void;
}) {
  const palco = useRef<HTMLDivElement>(null);
  const tampa = useRef<HTMLDivElement>(null);
  const sombra = useRef<HTMLDivElement>(null);
  const dica = useRef<HTMLDivElement>(null);
  const luz = useRef<HTMLDivElement>(null);
  const corpo = useRef<HTMLDivElement>(null);
  const avisou = useRef(false);
  const cbAberto = useRef(onAberto);
  cbAberto.current = onAberto;

  useEffect(() => {
    let quadro = 0;
    const atualizar = () => {
      quadro = 0;
      const el = palco.current;
      if (!el || !tampa.current || !sombra.current || !dica.current || !luz.current) return;
            const r = el.getBoundingClientRect();
      const fixo = el.firstElementChild as HTMLElement;
      const topoFixo = parseFloat(getComputedStyle(fixo).top) || 0;
      const percurso = Math.max(1, r.height - fixo.offsetHeight);
      // 0 = notebook acabou de fixar; abre nos primeiros 70% do percurso e segura aberto no resto
      const p = Math.min(1, Math.max(0, (topoFixo - r.top) / (percurso * 0.7)));
      const suave = p * p * (3 - 2 * p);
      const angulo = -80 * (1 - suave);
      tampa.current.style.transform = `rotateX(${angulo}deg)`;
      // no celular, sobe o notebook enquanto a tampa está fechada para não sobrar espaço vazio sob o título
      if (corpo.current) {
        const vazio = window.innerWidth < 768 ? tampa.current.offsetHeight * (1 - Math.cos((angulo * Math.PI) / 180)) : 0;
        corpo.current.style.transform = `translateY(${-vazio}px)`;
      }
      sombra.current.style.opacity = String(0.9 * (1 - suave));
      luz.current.style.opacity = String(suave);
      dica.current.style.opacity = String(Math.max(0, 1 - p * 3));
      if (suave > 0.97 && !avisou.current) {
        avisou.current = true;
        cbAberto.current?.();
      }
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(atualizar);
    };
    atualizar();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  return (
    <div ref={palco} className="relative h-[130vh] md:h-[200vh]">
      {/* celular: fixa logo abaixo do cabeçalho, colado no título; computador: fixa no centro da tela */}
      <div className="sticky top-24 flex flex-col items-center pt-12 md:top-0 md:h-[100svh] md:justify-center md:pt-16">
        <div ref={corpo} className="flex w-full flex-col items-center">
        <div className={`relative w-full [perspective:1600px] ${className}`}>
          {/* dica para rolar (some quando começa a abrir) */}
          <div ref={dica} aria-hidden="true" className="absolute bottom-8 left-1/2 z-20 inline-flex -translate-x-1/2 items-center whitespace-nowrap shadow-[0_10px_30px_-8px_rgba(0,159,227,0.6)] gap-2 rounded-full bg-celeste px-4 py-2 text-[0.8rem] font-semibold text-white ring-1 ring-white/40">
            <svg viewBox="0 0 24 24" className="dica-rolar h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7 6 5 5 5-5" /><path d="m7 13 5 5 5-5" /></svg>
            Role para abrir e ver o resultado
          </div>
          {/* luz da tela ligada */}
          <div ref={luz} aria-hidden="true" className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-[3rem] bg-celeste/35 blur-3xl" style={{ opacity: 0 }} />
      <div
        ref={tampa}
        style={{ transformOrigin: "50% 100%", transform: "rotateX(-80deg)", willChange: "transform" }}
        className="relative rounded-t-[1rem] bg-gradient-to-b from-[#2b2b35] to-[#16161c] p-[6px] pt-[14px] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.8),inset_0_0_0_1.5px_rgba(255,255,255,0.1)] sm:rounded-t-[1.3rem] sm:p-[12px] sm:pt-[22px]">
        <span aria-hidden="true" className="absolute left-1/2 top-[5px] h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#3b3b48] ring-1 ring-black sm:top-[8px] sm:h-[7px] sm:w-[7px]" />
        <div className="overflow-hidden rounded-[4px] bg-white sm:rounded-md">
          <div aria-hidden="true" className="flex items-center gap-2 border-b border-slate-200 bg-slate-100 px-2.5 py-1.5 sm:px-3 sm:py-2">
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-[#FF5F57]" />
              <span className="h-2 w-2 rounded-full bg-[#FEBC2E]" />
              <span className="h-2 w-2 rounded-full bg-[#28C840]" />
            </span>
            <span className="mx-auto flex max-w-[60%] flex-1 items-center justify-center gap-1 truncate rounded-md bg-white px-3 py-0.5 text-[0.62rem] text-slate-500 ring-1 ring-slate-200 sm:text-[0.7rem]">
              <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
              {url}
            </span>
          </div>
          {children}
        </div>
        {/* tela escurecida enquanto a tampa está fechando/abrindo */}
        <div ref={sombra} aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-t-[inherit] bg-black" style={{ opacity: 0.9 }} />
      </div>
      <div aria-hidden="true" className="relative z-10 -mx-[5%] h-3 rounded-b-[1rem] bg-gradient-to-b from-[#e4e6ec] via-[#c3c7d0] to-[#8e939e] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)] sm:h-4">
        <span className="absolute left-1/2 top-0 h-1.5 w-[16%] -translate-x-1/2 rounded-b-md bg-[#a3a8b2]" />
      </div>
        </div>
        {rodape}
        </div>
      </div>
    </div>
  );
}

/** Mostra foto autorizada ou um espaço reservado identificado. */
export function Foto({
  src,
  alt,
  className = "",
  rotulo = "Foto autorizada pendente",
  prioridade = false,
}: {
  src?: string;
  alt: string;
  className?: string;
  rotulo?: string;
  prioridade?: boolean;
}) {
  if (src && !isPendente(src)) {
    return (
      <img
        src={src}
        alt={alt}
        className={`object-cover ${className}`}
        loading={prioridade ? "eager" : "lazy"}
        decoding="async"
        {...(prioridade ? { fetchpriority: "high" } : {})}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`${alt} (espaço reservado)`}
      className={`flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-50 to-brand-100 text-brand-600 ${className}`}
    >
      <ImageIcon className="h-8 w-8 opacity-60" aria-hidden="true" />
      <span className="px-4 text-center text-xs font-semibold uppercase tracking-wider opacity-70">{rotulo}</span>
    </div>
  );
}

export function TituloSecao({
  sobretitulo,
  titulo,
  texto,
  claro = false,
  id,
}: {
  sobretitulo?: string;
  titulo: string;
  texto?: string;
  claro?: boolean;
  id?: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
      {sobretitulo && (
        <p className={`mb-2 text-sm font-bold uppercase tracking-[0.14em] ${claro ? "text-accent-400" : "text-brand-600"}`}>
          {sobretitulo}
        </p>
      )}
      <h2
        id={id}
        className={`font-display text-[1.75rem] font-extrabold leading-tight sm:text-4xl ${claro ? "text-white" : "text-brand-900"}`}
      >
        {titulo}
      </h2>
      {texto && <p className={`mt-4 text-base sm:text-lg ${claro ? "text-brand-100" : "text-slate-600"}`}>{texto}</p>}
    </div>
  );
}

export function Pendente({ children }: { children: ReactNode }) {
  return (
    <span className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-bold text-amber-800 ring-1 ring-amber-300">
      {children}
    </span>
  );
}

/** Retorna o valor ou um selo "pendente" visível. */
export function Valor({ v, rotulo }: { v: string; rotulo: string }) {
  return isPendente(v) ? <Pendente>{rotulo}: pendente</Pendente> : <>{v}</>;
}

/* ---------------- Visualizador ampliado (lightbox) ---------------- */
export type ItemAmpliado = { imagens: { src: string; alt: string; rotulo?: string }[]; titulo?: string } | null;

export function Lightbox({ item, onFechar }: { item: ItemAmpliado; onFechar: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);

  return (
    <dialog
      ref={ref}
      onClose={onFechar}
      onClick={(e) => e.target === ref.current && onFechar()}
      aria-label={item?.titulo || "Imagem ampliada"}
      className="m-auto max-h-[92vh] w-[min(96vw,1100px)] overflow-auto rounded-2xl bg-white p-0 shadow-2xl backdrop:bg-brand-900/80 backdrop:backdrop-blur-sm"
    >
      {item && (
        <div className="p-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-display text-lg font-extrabold text-brand-900">{item.titulo}</p>
            <button
              type="button"
              onClick={onFechar}
              autoFocus
              aria-label="Fechar"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className={`grid gap-3 ${item.imagens.length > 1 ? "sm:grid-cols-2" : ""}`}>
            {item.imagens.map((im) => (
              <figure key={im.src} className="relative">
                <img src={im.src} alt={im.alt} className="max-h-[78vh] w-full rounded-xl object-contain bg-slate-50" />
                {im.rotulo && (
                  <figcaption className="absolute left-3 top-3 rounded-full bg-brand-900/85 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-white">
                    {im.rotulo}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}
    </dialog>
  );
}

/** Estrelas com preenchimento parcial (ex.: 4,8). */
export function Estrelas({ nota, tamanho = "h-5 w-5" }: { nota: number; tamanho?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Nota ${nota.toLocaleString("pt-BR")} de 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, nota - i));
        return (
          <span key={i} className={`relative inline-block ${tamanho}`}>
            <Star className={`absolute inset-0 ${tamanho} text-slate-200`} aria-hidden="true" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className={`${tamanho} fill-accent-500 text-accent-500`} aria-hidden="true" />
            </span>
          </span>
        );
      })}
    </span>
  );
}
