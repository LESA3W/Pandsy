/**
 * Parse the {{LOGO_COLORS}} CSV (e.g. "#b06a3b,#dc2626,#864e2a")
 * into the three CSS-variable slots used by the template.
 *
 * Also derives auto-contrast text colors (black or white) based on
 * background luminance so text on colored backgrounds stays WCAG-acceptable.
 *
 * Tailwind config references these via `var(--color-primary)` etc.
 * Called from app/layout.tsx (NOT globals.css — placeholders are not
 * resolved inside CSS files).
 *
 * Tidewater fallback: copper primary, emergency red secondary, dark copper accent.
 */

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
  // Accept hex codes only; tolerates noise (Sheet sometimes writes "[red #e01e25, white #ffffff]")
  const parts = (csv as string)
    .split(",")
    .map((c) => c.trim().match(/#[0-9a-fA-F]{3,8}/)?.[0])
    .filter((c): c is string => Boolean(c));

  // Tidewater fallback: copper / emergency red / dark copper.
  const fallback = ["#0284c7", "#38bdf8", "#0369a1"];
  const primary = parts[0] ?? fallback[0];
  // <3 client colors: derive the missing slots from the colors the client DID
  // provide (never the template signature). Only ZERO colors uses the signature.
  const secondary = parts[1] ?? parts[0] ?? fallback[1];
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
