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
        // Pure black/white used for all dark/light surfaces and text.
        // Tailwind's built-in `black` and `white` map to #000000 and #ffffff.
      },
      fontFamily: {
        // Display: Archivo Black — heavy industrial geometric, reads like a panel-cover label.
        display: ["var(--font-brand, var(--font-display))", "Helvetica Neue", "Arial Black", "sans-serif"],
        // Body: Inter — proven technical readability.
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        // Mono: JetBrains Mono — breaker labels, panel meta strips, voltage readouts.
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.03em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "filament-breath": {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.85" },
        },
        "pulse-emergency": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "arc-shimmer": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        ripple: "ripple 2.4s ease-out infinite",
        "filament-breath": "filament-breath 8s ease-in-out infinite",
        "pulse-emergency": "pulse-emergency 1.6s ease-in-out infinite",
        "float-up": "float-up 0.5s ease-out both",
        "arc-shimmer": "arc-shimmer 8s ease-in-out infinite",
      },
      backgroundImage: {
        // Filament glow — warm amber halation, additive on top of ArcScrim
        "filament-glow":
          "radial-gradient(ellipse at 30% 20%, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 90%, color-mix(in srgb, var(--color-secondary) 10%, transparent) 0%, transparent 60%)",
        // Light variant for light surfaces
        "filament-glow-light":
          "radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--color-primary) 6%, transparent) 0%, transparent 60%)",
        // Voltage rule — primary gradient line (neutral black tints flank the primary stop)
        "voltage-rule":
          "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.08) 18%, var(--color-primary) 50%, rgba(0,0,0,0.08) 82%, transparent 100%)",
        // Primary rule — single accent line for short dividers
        "primary-rule": "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
        // Secondary rule — secondary accent variant
        "secondary-rule": "linear-gradient(90deg, transparent 0%, var(--color-secondary) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
