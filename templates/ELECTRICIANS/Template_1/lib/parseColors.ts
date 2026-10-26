/**
 * Parse the {{LOGO_COLORS}} CSV (e.g. "#0369a1,#fbbf24,#f59e0b")
 * into the three CSS-variable slots used by the template.
 *
 * Tailwind config references these via `var(--color-primary)` etc.
 * Called from app/layout.tsx (NOT globals.css — placeholders are not
 * resolved inside CSS files).
 *
 * VOLTAGE / LIVE WIRE fallback ramp (voltage yellow / amber / burnt-amber)
 * keeps the layout coherent even if the placeholder is empty in dev.
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

  // VOLTAGE / LIVE WIRE fallback ramp — all-yellow (no orange):
  //   [0] primary  — #f5b50a  voltage yellow (main brand fill)
  //   [1] secondary — #fbbf24  amber-yellow (hover tints, secondary fills)
  //   [2] accent   — #eab308  deep yellow (accent, depth fills) — black text
  const fallback = ["#f5b50a", "#fbbf24", "#eab308"];
  // Position-by-position fallback so a client with 1-2 brand colors still
  // gets their primary applied (only missing slots use template defaults).
  const primary = parts[0] ?? fallback[0];
  // <3 client colors: derive the missing slots from the colors the client DID
  // provide (never the template signature). Only ZERO colors uses the signature.
  const secondary = parts[1] ?? parts[0] ?? fallback[1];
  const accent = secondary; // strict 2-color theme: 3rd slot always follows the 2nd color

  return {
    primary,
    secondary,
    accent,
    primaryText: getContrastText(primary),
    secondaryText: getContrastText(secondary),
    accentText: getContrastText(accent),
  };
}
