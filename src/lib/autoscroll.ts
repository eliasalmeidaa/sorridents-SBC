// Rolagem automática para gravar vídeo do site.
// Só ativa com ?rolagem na URL — visitantes normais não são afetados.
//   ?rolagem        → 110 px/s, começa após 2s
//   ?rolagem=50     → velocidade em px/s
//   &espera=4       → segundos antes de começar
// Toque/clique na tela pausa e retoma.
export function iniciarRolagemAutomatica() {
  const params = new URLSearchParams(window.location.search);
  if (!params.has("rolagem")) return;

  const velocidade = Number(params.get("rolagem")) || 110;
  const espera = (Number(params.get("espera")) || 2) * 1000;

  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);

  let pausado = false;
  let posicao = 0;
  let ultimo = 0;

  const passo = (agora: number) => {
    if (!ultimo) ultimo = agora;
    const dt = (agora - ultimo) / 1000;
    ultimo = agora;

    if (!pausado) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      posicao = Math.min(posicao + velocidade * dt, max);
      window.scrollTo(0, posicao);
      if (posicao >= max) return;
    }
    requestAnimationFrame(passo);
  };

  window.addEventListener("pointerdown", () => {
    pausado = !pausado;
    posicao = window.scrollY;
  });

  setTimeout(() => requestAnimationFrame(passo), espera);
}
