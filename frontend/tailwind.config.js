/** Tokens do docs/07 expostos como cores/fontes do Tailwind (valores vêm das CSS variables). */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fundo: "var(--fundo)",
        "fundo-2": "var(--fundo-2)",
        cartao: "var(--cartao)",
        linha: "var(--linha)",
        campo: "var(--campo)",
        texto: "var(--texto)",
        "texto-2": "var(--texto-2)",
        "texto-3": "var(--texto-3)",
        azul: "var(--azul)",
        link: "var(--link)",
        "azul-claro": "var(--azul-claro)",
        verde: "var(--verde)",
        "verde-fundo": "var(--verde-fundo)",
        vermelho: "var(--vermelho)",
        "vermelho-fundo": "var(--vermelho-fundo)",
        aviso: "var(--aviso)",
        "aviso-fundo": "var(--aviso-fundo)",
        laranja: "var(--laranja)",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      borderRadius: { cartao: "22px", pilula: "980px" },
      boxShadow: { cartao: "0 2px 12px rgba(0,0,0,.05)" },
    },
  },
  plugins: [],
};
