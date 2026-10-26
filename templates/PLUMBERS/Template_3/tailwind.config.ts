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
      },
      fontFamily: {
        display: ["var(--font-brand, var(--font-display))", "Helvetica Neue", "Arial Black", "Arial", "sans-serif"],
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "Consolas", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        "tight-display": "-0.025em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "lift-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "rescue-slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px) translateX(-50%)" },
          "100%": { opacity: "1", transform: "translateY(0) translateX(-50%)" },
        },
        "click-ripple": {
          "0%": { opacity: "0.6", transform: "scale(0.6)" },
          "100%": { opacity: "0", transform: "scale(2)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.4s ease-out both",
        "lift-in": "lift-in 0.35s ease-out both",
        "rescue-slide-up": "rescue-slide-up 0.4s ease-out both",
        "click-ripple": "click-ripple 0.6s ease-out forwards",
      },
      boxShadow: {
        "lift-soft":
          "0 1px 2px 0 rgba(0, 0, 0, 0.04), 0 4px 16px -4px color-mix(in srgb, var(--color-primary) 8%, transparent)",
        "lift": "0 2px 4px 0 rgba(0, 0, 0, 0.06), 0 12px 32px -8px color-mix(in srgb, var(--color-primary) 12%, transparent)",
        "lift-strong":
          "0 4px 8px 0 rgba(0, 0, 0, 0.08), 0 24px 48px -12px color-mix(in srgb, var(--color-primary) 18%, transparent)",
        "rescue":
          "0 4px 12px -2px color-mix(in srgb, var(--color-accent) 40%, transparent), 0 8px 24px -6px color-mix(in srgb, var(--color-accent) 20%, transparent)",
      },
      backgroundImage: {
        "wave-wash":
          "radial-gradient(ellipse at 15% 0%, color-mix(in srgb, var(--color-primary) 10%, transparent) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, color-mix(in srgb, var(--color-primary) 8%, transparent) 0%, transparent 60%)",
        "wave-wash-deep":
          "radial-gradient(ellipse at 20% 30%, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 50%), radial-gradient(ellipse at 80% 70%, color-mix(in srgb, var(--color-primary) 42%, transparent) 0%, transparent 55%)",
        "sky-wash":
          "linear-gradient(180deg, color-mix(in srgb, var(--color-primary) 6%, #fff) 0%, color-mix(in srgb, var(--color-primary) 12%, #fff) 100%)",
        "harbor-night":
          "linear-gradient(160deg, color-mix(in srgb, var(--color-primary) 35%, #000) 0%, color-mix(in srgb, var(--color-primary) 22%, #000) 100%)",
        "rescue-pill":
          "linear-gradient(180deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 80%, #000) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
