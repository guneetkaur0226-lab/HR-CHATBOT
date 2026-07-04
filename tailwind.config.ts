import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16202B",
        "ink-light": "#1F2C3A",
        paper: "#EDEFEA",
        "paper-dim": "#E2E4DC",
        sage: "#5C7A5E",
        "sage-light": "#7C9A7E",
        brass: "#B08D57",
        "brass-light": "#C7A876",
        charcoal: "#2A2E35",
        rust: "#A8543F",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
