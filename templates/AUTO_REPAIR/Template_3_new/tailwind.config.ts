import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Per-client colors from {{LOGO_COLORS}} parsed in app/layout.tsx.
        // Used in subtle accents only. Sodium amber is the locked T3 signature.
        primary: "var(--color-primary)",
        secondary: {
          DEFAULT: "var(--color-secondary)",
          deep: "color-mix(in srgb, var(--color-secondary) 75%, #000)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          deep: "color-mix(in srgb, var(--color-accent) 75%, #000)",
        },
        // SODIUM LAMP palette — locked across clients.
        // Deep slate-navy + sodium amber + warm haze. Reads as a service bay
        // still lit at midnight.
        night: {
          DEFAULT: "#0c1419",
          deep: "#080d12",
        },
        surface: {
          1: "#141c23",
          2: "#1e2830",
        },
        "slate-line": "#2a3540",
        chrome: "#a8b3bf",
        amber: {
          // BRAND ACCENT — routed to {{LOGO_COLORS}} primary
          DEFAULT: "var(--color-primary)",
          deep: "color-mix(in srgb, var(--color-primary) 75%, #000)",
        },
        haze: "#f4d8a3",
        bone: {
          DEFAULT: "#f0e9d8",
          soft: "#c9c4b8",
        },
        mute: "#7d7868",
      },
      fontFamily: {
        display: ["var(--font-display)", "Helvetica", "Arial", "sans-serif"],
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
        // Soft photographic vignette + sodium halation. Used as a Tailwind class
        // alternative to inline gradients on hero / CTA images.
        "sodium-vignette":
          "radial-gradient(ellipse at center, transparent 0%, rgba(12,20,25,0) 35%, rgba(12,20,25,0.85) 95%)",
        "sodium-halation":
          "radial-gradient(circle at 22% 28%, rgba(244,216,163,0.22) 0%, transparent 55%)",
        "ambient-card":
          "linear-gradient(155deg, #1e2830 0%, #141c23 100%)",
      },
      boxShadow: {
        // Soft inner depth on AmbientCards. NOT paper feel (T2). NOT clip-corner (T1).
        ambient:
          "inset 0 1px 0 rgba(232,161,78,0.05), 0 1px 2px rgba(0,0,0,0.4), 0 12px 32px rgba(0,0,0,0.35)",
        "sodium-glow":
          "0 0 24px rgba(232,161,78,0.35), 0 0 64px rgba(232,161,78,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
