import { isPendente, unidade } from "../config/unidade";

export const whatsappConfigurado = (): boolean => /^\d{12,13}$/.test(unidade.whatsapp);

/** Monta o link wa.me. Se o número estiver pendente, retorna null (botão mostra aviso). */
export function linkWhatsApp(mensagem: string = unidade.mensagens.padrao): string | null {
  if (isPendente(unidade.whatsapp) || !whatsappConfigurado()) return null;
  return `https://wa.me/${unidade.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Formata 5511999998888 -> (11) 99999-8888 */
export function formatarWhatsApp(num: string): string {
  const m = num.replace(/\D/g, "").match(/^55(\d{2})(\d{4,5})(\d{4})$/);
  return m ? `(${m[1]}) ${m[2]}-${m[3]}` : num;
}
