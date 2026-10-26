// Parses {{LOGO_COLORS}} CSV (e.g. "#b8923f,#b1271f,#7e6028") into the trio
// of CSS variables the rest of the app references.
//
// Also derives auto-contrast text colors (black or white) based on
// background luminance so text on colored backgrounds stays WCAG-acceptable.
//
// Inject in app/layout.tsx — globals.css cannot see template placeholders
// because the preview script only substitutes inside .ts/.tsx files.

// Water fallback: primary=sky-600, secondary=sky-400, accent=sky-700.
const FALLBACK = ["#0284c7", "#38bdf8", "#0369a1"];

function getContrastText(hex: string): string {
  const c = hex.replace("#", "").padEnd(6, "0");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#000000" : "#ffffff";
}

export function parseColors(csv: string): {
  primary: string;
  secondary: string;
  accent: string;
  primaryText: string;
  secondaryText: string;
  accentText: string;
} {
  const list = (csv as string)
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^#[0-9a-f]{3,8}$/i.test(s));

  const primary = list[0] ?? FALLBACK[0];
  // <3 client colors: derive the missing slots from the colors the client DID
  // provide (never the template signature). Only ZERO colors uses the signature.
  const secondary = list[1] ?? list[0] ?? FALLBACK[1];
  const accent = secondary;

  return {
    primary,
    secondary,
    accent,
    primaryText: getContrastText(primary),
    secondaryText: getContrastText(secondary),
    accentText: getContrastText(accent),
  };
}
