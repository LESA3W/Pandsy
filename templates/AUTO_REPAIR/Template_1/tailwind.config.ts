import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Per-client colors injected via CSS vars in app/layout.tsx from {{LOGO_COLORS}}
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "primary-text": "var(--color-primary-text)",
        "secondary-text": "var(--color-secondary-text)",
        "accent-text": "var(--color-accent-text)",
      },
      fontFamily: {
        display: ["var(--font-brand, var(--font-display))", "Impact", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        wider: "0.08em",
        widest: "0.18em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        sweep: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        sweep: "sweep 1.4s ease-in-out infinite",
      },
      backgroundImage: {
        "primary-tape":
          "repeating-linear-gradient(45deg, var(--color-primary) 0 14px, #000000 14px 28px)",
        "primary-tape-thin":
          "repeating-linear-gradient(45deg, var(--color-primary) 0 6px, #000000 6px 12px)",
        "concrete":
          "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 1px, transparent 1px)",
      },
      backgroundSize: {
        "concrete": "24px 24px, 36px 36px",
      },
    },
  },
  plugins: [],
};

export default config;
