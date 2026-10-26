import { cn } from "@/lib/cn";
import { LogoWordmark } from "./LogoWordmark";

type Variant = "dark" | "light";

type LogoProps = {
  /**
   * "dark"  -> {{LOGO_URL_DARK}}  (BLACK logo, used on LIGHT surfaces)
   * "light" -> {{LOGO_URL_LIGHT}} (WHITE logo, used on DARK surfaces — T3 default)
   *
   * SODIUM LAMP is dark-mode primary, so most surfaces use "light".
   * Only inverse panels (the email card, any cream overlay) would use "dark".
   */
  variant?: Variant;
  className?: string;
  alt?: string;
};

export default function Logo({
  variant = "light",
  className,
  alt = "{{BUSINESS_NAME}}",
}: LogoProps) {
  const src: string = variant === "light" ? "{{LOGO_URL_LIGHT}}" : "{{LOGO_URL_DARK}}";
  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // Use FONT_LOGO when set by the Sheet; otherwise fall back to Bricolage
    // Grotesque via the --font-display CSS variable. Bricolage is loaded at
    // 600/700/800 — weight 800 gives the heaviest logotype feel without
    // needing font-bold on top (which would try 700, not 800).
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display)";
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={22}
        minFontPx={15}
        fontFamily={fontFamily}
        fontWeight={800}
        letterSpacing="0.04em"
        className={cn(variant === "light" ? "text-white" : "", className)}
      />
    );
  }

  return (
    // Native <img> — Drive (lh3.googleusercontent.com) blocks next/image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("block max-h-full w-auto select-none object-contain", className)}
      draggable={false}
    />
  );
}
