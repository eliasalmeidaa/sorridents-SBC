/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ajuste para os tons oficiais do manual de marca da unidade
        // Paleta oficial Sorridents (extraída da logo real da marca)
        brand: {
          50: "#F2EEFC",
          100: "#E3D9F7",
          200: "#C7B3EF",
          500: "#6B4FC2",
          600: "#4A2E9E",
          700: "#302683", // roxo/índigo oficial da logo
          800: "#241C66",
          900: "#1A1550",
        },
        accent: {
          300: "#FFE07A",
          400: "#FFD23F",
          500: "#FFC20E",
          600: "#E6A800",
        },
        whats: { 500: "#25D366", 600: "#1EBE5A", 700: "#128C4A" },
        // paleta do modelo
        tinta: "#302683", // roxo/índigo oficial dos títulos (mesmo tom da logo)
        celeste: "#009FE3", // azul-ciano oficial de destaque (mesmo tom da logo)
        noite: { 900: "#0E0A2E", 800: "#140F3B", 700: "#1C1650" }, // fundos escuros
        rosa: "#E30512", // vermelho oficial da logo, nos números dos cards
        nevoa: "#E9EEFA", // fundos claros

      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        btn: ['"Baloo 2"', '"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      boxShadow: { card: "0 8px 30px -12px rgba(10, 45, 94, 0.18)" },
    },
  },
  plugins: [],
};
