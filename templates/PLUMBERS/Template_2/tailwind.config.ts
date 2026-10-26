import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Per-client colors injected via CSS vars in app/layout.tsx from {{LOGO_COLORS}}.
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        // Auto-contrast text colors — black or white chosen at runtime for WCAG.
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-text": "var(--color-accent-text)",
        // Faint brand wash for light section backgrounds (rhythm).
        "surface-tint": "color-mix(in srgb, var(--color-primary) 6%, #fff)",
      },
      fontFamily: {
        display: ["var(--font-brand, var(--font-display))", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        wider: "0.08em",
        widest: "0.2em",
      },
      keyframes: {
        "tick-in": {
          "0%": { opacity: "0", transform: "translateX(-6px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "ink-spread": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "draft-slide": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "brass-shine": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "tick-in": "tick-in 0.5s ease-out both",
        "ink-spread": "ink-spread 0.4s ease-out both",
        "draft-slide": "draft-slide 0.5s ease-out both",
        "brass-shine": "brass-shine 14s ease-in-out infinite",
      },
      backgroundImage: {
        "brass-rule":
          "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
        "brass-shine":
          "linear-gradient(120deg, color-mix(in srgb, var(--color-primary) 60%, #000) 0%, var(--color-primary) 35%, color-mix(in srgb, var(--color-primary) 80%, #fff) 50%, var(--color-primary) 65%, color-mix(in srgb, var(--color-primary) 60%, #000) 100%)",
        "harbor-veil":
          "radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--color-primary) 50%, transparent) 0%, transparent 60%)",
        "paper-grain":
          "radial-gradient(circle at 25% 35%, color-mix(in srgb, var(--color-primary) 5%, transparent) 0%, transparent 40%), radial-gradient(circle at 75% 65%, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 45%)",
      },
    },
  },
  plugins: [],
};

export default config;
