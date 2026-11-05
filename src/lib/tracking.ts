/**
 * Rastreamento de conversões (Meta Pixel, GA4, Google Ads)
 * - IDs vêm do .env (nada é inventado; vazio = tag não carrega).
 * - Scripts só são carregados após consentimento de cookies (LGPD).
 * - Eventos só disparam quando a ação realmente acontece (clique / envio).
 */
import { obterOrigem } from "./utm";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
  }
}

const env = import.meta.env;
export const IDS = {
  metaPixel: (env.VITE_META_PIXEL_ID || "").trim(),
  ga4: (env.VITE_GA4_ID || "").trim(),
  gads: (env.VITE_GADS_ID || "").trim(),
  gadsLabelWhatsApp: (env.VITE_GADS_LABEL_WHATSAPP || "").trim(),
  gadsLabelForm: (env.VITE_GADS_LABEL_FORM || "").trim(),
};

export const temAlgumaTag = () => Boolean(IDS.metaPixel || IDS.ga4 || IDS.gads);

const CONSENT_KEY = "lp_consentimento";
export type Consentimento = "aceito" | "recusado" | null;

export function lerConsentimento(): Consentimento {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

export function salvarConsentimento(v: Exclude<Consentimento, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, v);
  } catch {
    /* ignore */
  }
  if (v === "aceito") iniciarTags();
}

let iniciado = false;

function carregarScript(src: string) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function iniciarTags() {
  if (iniciado || lerConsentimento() !== "aceito") return;
  iniciado = true;

  // Google tag (GA4 + Google Ads compartilham o mesmo gtag.js)
  const gtagId = IDS.ga4 || IDS.gads;
  if (gtagId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
    window.gtag("consent", "default", {
      ad_storage: "granted",
      analytics_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
    });
    window.gtag("js", new Date());
    if (IDS.ga4) window.gtag("config", IDS.ga4);
    if (IDS.gads) window.gtag("config", IDS.gads);
    carregarScript(`https://www.googletagmanager.com/gtag/js?id=${gtagId}`);
  }

  // Meta Pixel (pula se o pixel base do index.html já estiver ativo, para não duplicar init/PageView)
  if (IDS.metaPixel && !window.fbq) {
    /* eslint-disable */
    (function (f: any, b: Document, e: string, v: string) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = "2.0";
      n.queue = [];
      const t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      b.head.appendChild(t);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    /* eslint-enable */
    window.fbq!("init", IDS.metaPixel);
    window.fbq!("track", "PageView");
  }
}

/** Clique em qualquer botão de WhatsApp. `local` identifica o botão (hero, flutuante, tratamento...). */
export function rastrearWhatsApp(local: string, tratamento?: string) {
  // Meta Pixel: evento puro, sem nenhum parâmetro (site de saúde).
  window.fbq?.("track", "Contact");
  if (lerConsentimento() !== "aceito") return;
  const origem = obterOrigem();
  const params = { local, tratamento: tratamento || "geral", ...origem };

  window.gtag?.("event", "whatsapp_click", params);
  if (IDS.gads && IDS.gadsLabelWhatsApp) {
    window.gtag?.("event", "conversion", { send_to: `${IDS.gads}/${IDS.gadsLabelWhatsApp}` });
  }
}

/** Envio válido do formulário. Nenhum dado pessoal é enviado às plataformas. */
export function rastrearFormulario(tratamento: string) {
  // Meta Pixel: evento puro, sem nenhum parâmetro (site de saúde).
  window.fbq?.("track", "Lead");
  if (lerConsentimento() !== "aceito") return;
  const origem = obterOrigem();
  window.gtag?.("event", "generate_lead", { tratamento, ...origem });
  if (IDS.gads && IDS.gadsLabelForm) {
    window.gtag?.("event", "conversion", { send_to: `${IDS.gads}/${IDS.gadsLabelForm}` });
  }
}
