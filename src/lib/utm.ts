const CHAVES = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"] as const;
const STORAGE = "lp_origem";

export type Origem = Partial<Record<(typeof CHAVES)[number], string>>;

/** Captura UTMs/click IDs da URL na primeira visita da sessão. */
export function capturarOrigem(): Origem {
  let salva: Origem = {};
  try {
    salva = JSON.parse(sessionStorage.getItem(STORAGE) || "{}");
  } catch {
    /* storage indisponível */
  }
  const params = new URLSearchParams(window.location.search);
  const nova: Origem = {};
  CHAVES.forEach((k) => {
    const v = params.get(k);
    if (v) nova[k] = v.slice(0, 120);
  });
  const origem = Object.keys(nova).length ? nova : salva;
  try {
    sessionStorage.setItem(STORAGE, JSON.stringify(origem));
  } catch {
    /* ignore */
  }
  return origem;
}

export function obterOrigem(): Origem {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE) || "{}");
  } catch {
    return {};
  }
}
