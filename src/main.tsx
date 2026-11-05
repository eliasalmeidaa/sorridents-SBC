import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { capturarOrigem } from "./lib/utm";
import { aplicarSEO } from "./lib/seo";
import { iniciarRolagemAutomatica } from "./lib/autoscroll";
import "./index.css";

capturarOrigem();
aplicarSEO();
iniciarRolagemAutomatica();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
