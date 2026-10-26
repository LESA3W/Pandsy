import { cn } from "@/lib/cn";
import { LogoWordmark } from "./LogoWordmark";

type Variant = "dark" | "light";

type LogoProps = {
  /**
   * "dark" -> {{LOGO_URL_DARK}} (BLACK logo, used on LIGHT surfaces . the default)
   * "light" -> {{LOGO_URL_LIGHT}} (WHITE logo, used on DARK surfaces)
   *
   * Heritage Workshop is a light-mode template, so most surfaces use "dark".
   * Only the dark CtaSection overlay and the forest-deep Footer use "light".
   */
  variant?: Variant;
  className?: string;
  alt?: string;
};

export default function Logo({
  variant = "dark",
  className,
  alt = "{{BUSINESS_NAME}}",
}: LogoProps) {
  const src: string = variant === "light" ? "{{LOGO_URL_LIGHT}}" : "{{LOGO_URL_DARK}}";
  const hasLogo = src.length > 0 && !src.startsWith("{{");

  if (!hasLogo) {
    const businessName: string = "{{BUSINESS_NAME}}";
    const fontLogo: string = "{{FONT_LOGO}}";
    // Use FONT_LOGO when set by the Sheet; otherwise fall back to Zilla Slab
    // via the --font-display CSS variable. Zilla Slab at weight 700 is already
    // heavy — no need to push further with font-bold on top.
    const fontFamily: string =
      fontLogo.length > 0 && !fontLogo.startsWith("{{")
        ? fontLogo
        : "var(--font-display)";
    return (
      <LogoWordmark
        name={businessName}
        baseFontPx={26}
        minFontPx={15}
        fontFamily={fontFamily}
        fontWeight={700}
        letterSpacing="0"
        className={cn(variant === "light" ? "text-white" : "", "tracking-normal", className)}
      />
    );
  }

  return (
    // Native <img> . Drive (lh3.googleusercontent.com) blocks next/image optimizer.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={cn("block max-h-full w-auto select-none object-contain", className)}
      draggable={false}
    />
  );
}
