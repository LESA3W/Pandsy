import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
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
        // Display: Fraunces — slab-soft variable serif, editorial-bold register.
        // NEVER uppercased (mixed case keeps editorial feel). Distinct from
        // T1 Archivo Black UPPERCASE and T2 Space Grotesk regular-case sans.
        display: ["var(--font-brand, var(--font-display))", "Georgia", "Times New Roman", "serif"],
        // Body: Mona Sans — confident humanist sans. NOT Inter (T1) or Inter Tight (T2).
        sans: ["var(--font-sans)", "Helvetica Neue", "Arial", "system-ui", "sans-serif"],
        // Mono: Geist Mono. NOT JetBrains Mono (T1), NOT IBM Plex Mono (T2).
        mono: ["var(--font-mono)", "ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        tight: "-0.012em",
        tighter: "-0.022em",
        wider: "0.06em",
        widest: "0.16em",
      },
      keyframes: {
        // HotlineRail live-wire dot pulse
        "wire-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.55", transform: "scale(1.18)" },
        },
        // EmberHalo ambient warm halation breath
        "halo-breath": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.04)" },
        },
        // Stamp press micro-press on tap
        "stamp-press": {
          "0%": { transform: "scale(1)" },
          "55%": { transform: "scale(0.97)" },
          "100%": { transform: "scale(1)" },
        },
        // Card rise-up on enter
        "rise-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Ribbon shimmer (faint)
        "ribbon-drift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "120px 0" },
        },
      },
      animation: {
        "wire-pulse": "wire-pulse 2.4s ease-in-out infinite",
        "halo-breath": "halo-breath 9s ease-in-out infinite",
        "stamp-press": "stamp-press 0.22s ease-out",
        "rise-up": "rise-up 0.5s ease-out both",
        "ribbon-drift": "ribbon-drift 18s linear infinite",
      },
      backgroundImage: {
        // Editorial grain — subtle warm noise via radial gradient
        "cream-grain":
          "radial-gradient(circle at 25% 30%, color-mix(in srgb, var(--color-primary) 4%, transparent) 0%, transparent 40%), radial-gradient(circle at 75% 70%, color-mix(in srgb, var(--color-accent) 5%, transparent) 0%, transparent 40%)",
        // Primary ribbon stripe — ribbon dividers
        "primary-stripe":
          "repeating-linear-gradient(90deg, var(--color-primary) 0 60px, color-mix(in srgb, var(--color-primary) 75%, #000) 60px 62px, var(--color-primary) 62px 122px)",
        // Accent rule — single accent line
        "accent-rule":
          "linear-gradient(90deg, transparent 0%, var(--color-accent) 50%, transparent 100%)",
        // Secondary halo radial — atmospheric warm halation
        "secondary-halo":
          "radial-gradient(circle at center, color-mix(in srgb, var(--color-secondary) 32%, transparent) 0%, color-mix(in srgb, var(--color-primary) 16%, transparent) 35%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
