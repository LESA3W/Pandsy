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
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
      },
      letterSpacing: {
        tighter: "-0.02em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        "tide-shimmer": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "pulse-emergency": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(1.15)" },
        },
        "float-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        ripple: "ripple 2.4s ease-out infinite",
        "tide-shimmer": "tide-shimmer 8s ease-in-out infinite",
        "pulse-emergency": "pulse-emergency 1.6s ease-in-out infinite",
        "float-up": "float-up 0.5s ease-out both",
      },
      backgroundImage: {
        "flow-wash":
          "radial-gradient(ellipse at 20% 0%, color-mix(in srgb, var(--color-secondary) 35%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 60%)",
        "flow-wash-light":
          "radial-gradient(ellipse at 0% 0%, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, color-mix(in srgb, var(--color-secondary) 10%, transparent) 0%, transparent 60%)",
        "tide-gradient":
          "linear-gradient(90deg, transparent 0%, color-mix(in srgb, var(--color-primary) 40%, transparent) 20%, var(--color-primary) 50%, color-mix(in srgb, var(--color-primary) 40%, transparent) 80%, transparent 100%)",
        "copper-rule": "linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
