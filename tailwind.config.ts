import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // ⚡ essentiel pour ton bouton dark mode
  content: ["./*.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        day: "#f8fafc",
        night: "#0f172a",
      },
    },
  },
  plugins: [],
} satisfies Config;
