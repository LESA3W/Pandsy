import { cn } from "@/lib/cn";
import { LogoWordmark } from "./LogoWordmark";

// Dual logo system per CLAUDE.md rule #3 + smart fallback:
// `variant="dark"` = LOGO_URL_DARK (black logo on light bg)
// `variant="light"` = LOGO_URL_LIGHT (white logo on dark bg)
// If the Sheet has no logo URL, the pipeline substitutes an empty string here,
// and this component renders BUSINESS_NAME as text in {{FONT_LOGO}} (or the
// template's display font if no Sheet font is provided).
// Native <img> only — Drive blocks the next/image optimizer.
export function Logo({
  variant,
  className,
  alt = "{{BUSINESS_NAME}}",
}: {
  variant: "dark" | "light";
  className?: string;
  alt?: string;
}) {
  const src: string = variant === "dark" ? "{{LOGO_URL_DARK}}" : "{{LOGO_URL_LIGHT}}";
  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // Prefer FONT_LOGO from Sheet when provided; fall back to IBM Plex Serif display variable.
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display), 'IBM Plex Serif', 'Georgia', serif";
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={22}
        minFontPx={13}
        fontFamily={fontFamily}
        fontWeight={700}
        letterSpacing="0.01em"
        className={`${variant === "light" ? "text-white " : ""}${className ?? ""}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("block max-h-full w-auto select-none object-contain", className)}
      draggable={false}
    />
  );
}
