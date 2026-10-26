import { LogoWordmark } from "./LogoWordmark";

type Variant = "light" | "dark";

type Props = {
  /**
   * "light" → use {{LOGO_URL_LIGHT}} (white logo, for dark backgrounds).
   * "dark"  → use {{LOGO_URL_DARK}} (black logo, for light backgrounds).
   * NEVER use brightness-0 invert hacks — pick the variant explicitly.
   * Fallback: if the Sheet provides no logo URL, this component renders
   * BUSINESS_NAME as text using {{FONT_LOGO}} (or the template's display font
   * if no Sheet font is set).
   */
  variant: Variant;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function Logo({
  variant,
  className,
  width = 160,
  height = 48,
  priority = false,
}: Props) {
  const src: string =
    variant === "light"
      ? "{{LOGO_URL_LIGHT}}"
      : "{{LOGO_URL_DARK}}";

  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // Use FONT_LOGO when set by the Sheet; otherwise fall back to Bebas Neue
    // via the --font-display CSS variable. Bebas Neue is weight 400 only —
    // applying font-bold (700) would break the glyph, so we omit it.
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display)";
    // Header passes a small height; floor the base so the wordmark stays bold
    // and legible, and let the footer's larger height scale it up.
    const baseFontPx = Math.max(30, Math.round(height * 0.75));
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={baseFontPx}
        minFontPx={16}
        fontFamily={fontFamily}
        fontWeight={400}
        letterSpacing="0.1em"
        className={`uppercase ${variant === "light" ? "text-white" : ""} ${className ?? ""}`}
      />
    );
  }

  // Native <img> — Drive (lh3.googleusercontent.com) blocks next/image optimizer
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="{{BUSINESS_NAME}}"
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      className={`block max-h-full w-auto object-contain ${className ?? ""}`}
      draggable={false}
    />
  );
}
