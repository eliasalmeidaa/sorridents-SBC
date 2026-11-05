import { isPendente, unidade } from "../config/unidade";

/**
 * Ajusta o título e injeta dados estruturados (Dentist)
 * SOMENTE quando nome, endereço e telefone/WhatsApp reais estiverem preenchidos.
 * Obs.: title/description/Open Graph estáticos ficam no index.html (lidos por Meta/Google sem JS).
 */
export function aplicarSEO() {
  document.title = `Dentista ${unidade.bairroCurto}/SP | ${unidade.nomeUnidade}`;

  const e = unidade.endereco;
  const enderecoOk = ![e.logradouro, e.bairro, e.cidade, e.uf].some(isPendente);
  const contatoOk = !isPendente(unidade.telefone) || !isPendente(unidade.whatsapp);
  if (!enderecoOk || !contatoOk) return;

  const dados: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: unidade.nomeUnidade,
    telephone: !isPendente(unidade.telefone) ? unidade.telefone : `+${unidade.whatsapp}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: e.logradouro,
      addressLocality: e.cidade,
      addressRegion: e.uf,
      ...(isPendente(e.cep) ? {} : { postalCode: e.cep }),
      addressCountry: "BR",
    },
  };
  if (!isPendente(unidade.siteUrl)) dados.url = unidade.siteUrl;
  dados.hasMap = unidade.googleMapsLink;

  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.text = JSON.stringify(dados);
  document.head.appendChild(s);
}
