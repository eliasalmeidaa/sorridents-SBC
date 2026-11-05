/**
 * ============================================================
 *  CONFIGURAÇÃO DA UNIDADE — edite SOMENTE este arquivo
 * ============================================================
 *  LP da Sorridents São Bernardo Centro, focada no formulário de agendamento.
 *  Topo + 4 seções:
 *    1. Antes e depois  2. Avaliações  3. Formulário  4. A clínica (vídeo)
 *  - "PENDENTE" = não preenchido (o site mostra o aviso ou esconde o dado).
 *  - Use apenas fotos, vídeos, avaliações e informações REAIS e autorizadas da unidade.
 *  - IDs de Pixel / GA4 / Google Ads ficam no .env (veja .env.example).
 */
import logoUnidade from "../assets/logo-sorridents-sbc.png";

export const PENDENTE = "PENDENTE";
export const isPendente = (v?: string | null): boolean =>
  !v || v.trim() === "" || v.trim().toUpperCase().startsWith(PENDENTE);

export type Foto = { src: string; alt: string; legenda?: string };
export type AntesDepois = { antes: string; depois: string; alt: string; tratamento?: string };
export type AvaliacaoGoogle = { nome: string; nota: 1 | 2 | 3 | 4 | 5; texto: string; quando?: string; foto?: string };

export const unidade = {
  // ---------- Identificação ----------
  marca: "Sorridents",
  nomeUnidade: "Sorridents São Bernardo Centro",
  bairroCurto: "São Bernardo", // usado em "Dentista São Bernardo/SP"
  cidadeCompleta: "São Bernardo do Campo",
  logo: logoUnidade,
  siteUrl: "PENDENTE", // endereço onde esta LP for publicada

  // ---------- Contato ----------
  // WhatsApp no formato 55 + DDD + número, só dígitos (ex.: 5511999998888). É para onde o formulário envia.
  whatsapp: "5511939583095",
  telefone: "(11) 4335-0570",

  // ---------- Endereço ----------
  endereco: {
    logradouro: "Rua Marechal Deodoro, 2080",
    referencia: "próximo ao Outlet da Adidas",
    bairro: "Centro",
    cidade: "São Bernardo do Campo",
    uf: "SP",
    cep: "PENDENTE", // diretórios divergem (09710-201 / 09710-192); confirmar com a unidade
  },
  googleMapsLink: "https://www.google.com/maps/search/?api=1&query=Sorridents+SBC+Centro+Rua+Marechal+Deodoro+2080+S%C3%A3o+Bernardo+do+Campo",
  horarios: ["Segunda à Sexta: das 08h às 20h", "Sábados: das 08h às 16h"] as string[],

  mensagens: {
    padrao: "Olá! Vim pelo site da Sorridents São Bernardo Centro e gostaria de agendar uma avaliação.",
  },

  // ---------- Topo ----------
  hero: {
    subtitulo: "você encontra atendimento odontológico completo no centro de São Bernardo do Campo.",
    texto: "Preencha o formulário e nossa equipe entra em contato para agendar sua avaliação.",
    fotoCirculo: "/img/hero-antes-depois.webp",
    fotoCirculoAlt: "Antes e depois de tratamento odontológico de paciente da unidade",
    fotoCirculoAntesDepois: true, // a foto é antes (em cima) / depois (embaixo), emenda em 50%
  },

  // ---------- Dentista em destaque (foto do post no celular do topo) ----------
  dentista: {
    nome: "Dra. Lucilene Chiachetti",
    cargo: "Dentista da unidade",
    foto: "/img/dra-luciene.webp",
    legenda: "Cuidando do seu sorriso aqui na Sorridents São Bernardo Centro. 💙",
  },

  // ---------- 1. Antes e depois ----------
  resultadosAutorizados: true, // true = há termo de autorização assinado de cada paciente (normas do CFO)
  resultados: [
    {
      antes: "/img/resultados/caso-1-antes.webp",
      depois: "/img/resultados/caso-1-depois.webp",
      alt: "reabilitação com implante dentário de paciente da unidade",
      tratamento: "Implante dentário",
    },
  ] as AntesDepois[],

  // ---------- 2. Avaliações do Google ----------
  google: {
    notaMedia: 4.6 as number | null, // nota REAL do perfil no Google (null = não exibe número)
    totalAvaliacoes: 263 as number | null,
    perfilUrl: "https://www.google.com/maps/search/?api=1&query=Sorridents+SBC+Centro+Rua+Marechal+Deodoro+2080+S%C3%A3o+Bernardo+do+Campo",
    // copiadas do perfil da unidade, sem editar o sentido
    avaliacoes: [
      { nome: "Sonia Defavari", nota: 5, quando: "6 dias atrás", texto: "Excelente atendimento unidade Marechal Deodoro em S.B.C todos Profissionais e Recepção também" },
      { nome: "Melissa Leal", nota: 5, quando: "2 meses atrás", texto: "As meninas da recepção são super atenciosas, o rapaz que faz as vendas também e a Dra Lilian é fantástica! Fiquei encantada com ela, uma querida!" },
      { nome: "Gleice Carvalho", nota: 5, quando: "4 meses atrás", texto: "Fui muito bem atendida por toda equipe. A Doutora Lilian é uma excelente profissional, sempre atenciosa e nos deixa muito confortáveis na clínica." },
      { nome: "Patricia Jesus", nota: 5, quando: "4 meses atrás", texto: "Estou fazendo meu tratamento no local e sempre fui bem atendida desde a recepção até o consultório, todos os funcionários são educados sempre tiram dúvidas e tratam super bem" },
      { nome: "Valéria Lange", nota: 5, quando: "3 meses atrás", texto: "Sempre maravilhosa. O atendimento é exemplar e os profissionais extremamente capacitados. Recomendo." },
      { nome: "Edilane Silva", nota: 5, quando: "um ano atrás", texto: "Ótima clínica! Minha família e eu somos pacientes desde 2018 e sempre fomos muito bem atendidos. A equipe de profissionais é excelente, e o atendimento, de modo geral, é impecável. Atualmente, estou realizando tratamentos na área de odontologia com a Dra. Andreza, que é simplesmente maravilhosa! Super indico a clínica!" },
    ] as AvaliacaoGoogle[],
  },

  // ---------- 3. Formulário ----------
  formulario: {
    titulo: "Agende sua **avaliação**",
    texto: "Deixe seus dados e escolha o tratamento. Ao enviar, você fala direto com a nossa equipe pelo WhatsApp para confirmar o melhor horário.",
    tratamentos: [
      "Implante dentário",
      "Prótese (dentadura / fixa)",
      "Clareamento dental",
      "Facetas",
      "Ortodontia (aparelho)",
      "Clínica geral / limpeza",
      "Urgência / dor de dente",
      "Ainda não sei",
    ],
    periodos: ["Manhã", "Tarde", "Noite", "Sábado"],
  },

  // ---------- 4. A clínica (vídeo) ----------
  clinica: {
    titulo: "Conheça a **Sorridents** São Bernardo Centro",
    textos: [
      "Uma clínica pensada para cuidar do seu sorriso com atenção em cada etapa, da avaliação ao final do tratamento.",
      "Nossa equipe explica cada passo, tira suas dúvidas e monta um plano de tratamento de acordo com a sua necessidade.",
    ],
    destaques: ["Avaliação com dentista", "Planejamento personalizado", "Equipe atenciosa", "No centro de São Bernardo"],
    video: "/videos/video-unidade.mp4", // vídeo horizontal (16:9) da fachada da unidade
    videoCapa: "/img/capa-video-unidade.webp",
  },

  // ---------- Rodapé ----------
  premios: { foto: "/img/premios.png", alt: "Selos de prêmios e certificações recebidos pela rede Sorridents" },

  // ---------- Responsável técnico (exigência do CFO) ----------
  responsavelTecnico: { nome: "Dra. Lilian Campos Bueno", cro: "CRO RT 118810" }, // fonte: sorridents.com.br/unidade/sbc-centro
  croClinica: "CRO 8022",
} as const;

export type Unidade = typeof unidade;

export function camposPendentes(): string[] {
  const u = unidade;
  const l: string[] = [];
  if (isPendente(u.whatsapp)) l.push("WhatsApp");
  if (isPendente(u.telefone)) l.push("Telefone");
  if (isPendente(u.endereco.logradouro)) l.push("Endereço");
  if (u.google.notaMedia === null) l.push("Nota do Google");
  if (!u.horarios.length) l.push("Horários");
  if (isPendente(u.responsavelTecnico.nome) || isPendente(u.croClinica)) l.push("Responsável técnico / CRO");
  return l;
}
