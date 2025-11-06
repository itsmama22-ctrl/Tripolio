import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2F80ED",
        beige: "#F5EDE3",
        accent: "#FF7A59",
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px rgba(47, 128, 237, 0.08)",
      },
      borderRadius: {
        xl: "24px",
      },
      spacing: {
        base: "1rem",
      },
    },
  },
  plugins: [],
};

export default config;
