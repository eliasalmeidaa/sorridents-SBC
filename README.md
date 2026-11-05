# Landing Page Sorridents São Bernardo Centro

React + TypeScript + Tailwind + Lucide (mesma base técnica da LP do Anhangabaú), focada em **conversão pelo formulário**.

## Rodar

```bash
npm install
npm run dev            # desenvolvimento (mostra o aviso "Faltando" com o que precisa preencher)
npm run build          # produção -> dist/ (Cloudflare/Vercel/Netlify/Hostinger)
npm run build:single   # um único index.html -> dist-single/
```

## Estrutura (topo + 4 seções)

0. **Topo**: mesmo visual do Anhangabaú (cabeçalho em pílula, "Dentista São Bernardo/SP", borda curva e círculo orgânico com antes/depois)
1. **Antes e depois** (`#resultados`): comparador arrastável no computador, fotos empilhadas no celular
2. **Avaliações** (`#avaliacoes`): "Quem conhece, indica." com avaliações reais do Google
3. **Formulário** (`#agendar`): nome, WhatsApp, tratamento, período e autorização LGPD
4. **A clínica** (`#clinica`): texto, destaques e vídeo vertical

Todos os botões da página levam ao formulário.

## Como o formulário funciona

Não precisa de servidor. Ao enviar, o formulário valida os dados, registra o `Lead` (Meta Pixel, GA4 e Google Ads, se configurados)
e abre o WhatsApp da unidade com a mensagem já preenchida (nome, WhatsApp, interesse e período).
**Ele só funciona depois que o `whatsapp` estiver preenchido em `src/config/unidade.ts`.**

## O que falta preencher (`src/config/unidade.ts`)

- `whatsapp` (55 + DDD + número) e `telefone`
- `endereco.logradouro` e `cep`, e `horarios`
- `hero.fotoFachada`: enquanto estiver vazio, o topo mostra um painel com as cores da marca
- `google.notaMedia` / `totalAvaliacoes`: nota real do perfil
- `responsavelTecnico` e `croClinica` (exigência do CFO)
- `clinica.video`: hoje usa o vídeo `sorridents_sbc_1080p.mp4` (comprimido em 720p). Troque por um vídeo da clínica por dentro se tiver um.

## Rastreamento

Copie `.env.example` para `.env` e preencha os IDs (Meta Pixel, GA4, Google Ads). Vazio = a tag não carrega.
As tags só carregam depois que o visitante aceita os cookies.
