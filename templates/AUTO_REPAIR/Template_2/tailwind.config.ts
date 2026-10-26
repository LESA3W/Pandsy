import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Per-client colors from {{LOGO_COLORS}} parsed in app/layout.tsx
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-text": "var(--color-accent-text)",
      },
      fontFamily: {
        display: ["var(--font-brand, var(--font-display))", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        wider: "0.06em",
        widest: "0.16em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "extend-rule": {
          "0%": { width: "32px" },
          "100%": { width: "48px" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms ease-out both",
        "extend-rule": "extend-rule 800ms ease-out forwards",
      },
      backgroundImage: {
        // Subtle warm paper grain - applied to body in globals.css.
        "paper-grain":
          "radial-gradient(circle at 30% 40%, rgba(0,0,0,0.025) 1px, transparent 1.5px), radial-gradient(circle at 75% 65%, rgba(0,0,0,0.018) 1px, transparent 1.5px)",
      },
      backgroundSize: {
        "paper-grain": "32px 32px, 44px 44px",
      },
      boxShadow: {
        paper: "0 1px 2px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.05)",
        "paper-lg":
          "0 2px 4px rgba(0,0,0,0.05), 0 12px 32px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
