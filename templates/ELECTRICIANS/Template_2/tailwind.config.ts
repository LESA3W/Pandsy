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
        // Auto-contrast text colors — computed at runtime based on bg luminance.
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-text": "var(--color-accent-text)",
        // Hairline divider rule — subtle black/10 border for card edges and separators.
        "white-rule": "rgba(0,0,0,0.08)",
        // Pure black/white used for all dark/light surfaces and text.
        // Tailwind's built-in `black` and `white` map to #000000 and #ffffff.
      },
      fontFamily: {
        // Display: Space Grotesk — technical-neutral grotesque. Set in regular
        // case (NOT UPPERCASE per T1 reservation). Distinct from T1's heavy
        // industrial geometric (Archivo Black).
        display: ["var(--font-brand, var(--font-display))", "Inter", "system-ui", "sans-serif"],
        // Body: Inter Tight — tighter horizontal width than T1's regular Inter,
        // more contemporary register.
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // Mono: IBM Plex Mono — humanist mono. Distinct from T1's JetBrains Mono.
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        tight: "-0.015em",
        tighter: "-0.025em",
        wider: "0.06em",
        widest: "0.16em",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "grid-breath": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.55" },
        },
        "alert-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.65" },
        },
        "rise-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticker-slide": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        ripple: "ripple 2.4s ease-out infinite",
        "grid-breath": "grid-breath 7s ease-in-out infinite",
        "alert-pulse": "alert-pulse 1.4s ease-in-out infinite",
        "rise-up": "rise-up 0.5s ease-out both",
        "ticker-slide": "ticker-slide 60s linear infinite",
      },
      backgroundImage: {
        // Blueprint grid — graph paper background pattern (24x24 cells with
        // a 4-cell major grid every 96px).
        "blueprint-grid":
          "linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
        // Dark variant for use on dark surfaces
        "blueprint-grid-dark":
          "linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px)",
        // Hazard tape — diagonal black-yellow stripes (jobsite hazard)
        "hazard-tape":
          "repeating-linear-gradient(135deg, var(--color-secondary) 0 12px, #000000 12px 24px)",
        // Primary rule — single accent line for short dividers
        "primary-rule":
          "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
      },
      backgroundSize: {
        "blueprint-grid": "24px 24px, 24px 24px, 96px 96px, 96px 96px",
        "blueprint-grid-dark": "24px 24px, 24px 24px, 96px 96px, 96px 96px",
      },
    },
  },
  plugins: [],
};

export default config;
