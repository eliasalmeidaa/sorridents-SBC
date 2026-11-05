import { Header } from "./components/Header";
import { Avaliacoes, Clinica, Formulario, Hero, Resultados, Rodape } from "./components/Secoes";
import { AvisoConfiguracao, CookieConsent, WhatsAppFlutuante } from "./components/Extras";

/** LP Sorridents São Bernardo Centro: topo + 4 seções, tudo levando ao formulário. */
export default function App() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[70] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-tinta focus:shadow-lg">
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Hero />
        <Resultados /> {/* 1. antes e depois */}
        <Avaliacoes /> {/* 2. avaliações */}
        <Formulario /> {/* 3. formulário */}
        <Clinica /> {/* 4. a clínica + vídeo */}
      </main>
      <Rodape />
      <WhatsAppFlutuante />
      <CookieConsent />
      {import.meta.env.DEV && <AvisoConfiguracao />}
    </>
  );
}
