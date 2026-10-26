import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Per-client colors from {{LOGO_COLORS}} parsed in app/layout.tsx.
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-text": "var(--color-accent-text)",
      },
      fontFamily: {
        display: ["var(--font-brand, var(--font-display))", "Helvetica", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        wider: "0.06em",
        widest: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "halo-pulse": {
          "0%, 100%": { opacity: "0.85" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 700ms cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 600ms ease-out both",
        "halo-pulse": "halo-pulse 4s ease-in-out infinite",
      },
      backgroundImage: {
        // Soft photographic vignette + sodium halation.
        "sodium-vignette":
          "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.85) 95%)",
        "sodium-halation":
          "radial-gradient(circle at 22% 28%, color-mix(in srgb, var(--color-primary) 24%, transparent) 0%, transparent 55%)",
        "ambient-card":
          "linear-gradient(155deg, color-mix(in srgb, var(--color-primary) 8%, #000) 0%, #000000 100%)",
      },
      boxShadow: {
        // Soft inner depth on AmbientCards.
        ambient:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.4), 0 12px 32px rgba(0,0,0,0.35)",
        "sodium-glow":
          "0 0 24px color-mix(in srgb, var(--color-primary) 35%, transparent), 0 0 64px color-mix(in srgb, var(--color-primary) 18%, transparent)",
      },
    },
  },
  plugins: [],
};

export default config;
