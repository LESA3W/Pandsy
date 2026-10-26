import type { Metadata } from "next";
import { Fraunces, Mona_Sans, Geist_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { HotlineRail } from "@/components/HotlineRail";
import { parseColors } from "@/lib/parseColors";
import "./globals.css";

// Display: Fraunces — slab-soft variable serif, editorial-bold register.
// NEVER uppercased. Distinct from T1 Archivo Black (UPPERCASE) and T2
// Space Grotesk (regular case sans).
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700", "900"],
  display: "swap",
});

// Body: Mona Sans — confident humanist sans. NOT Inter (T1) or Inter Tight (T2).
const monaSans = Mona_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono: Geist Mono — modern monospace. NOT JetBrains Mono (T1), NOT IBM Plex
// Mono (T2).
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}} {{ZIP}}",
  description:
    "{{BUSINESS_NAME}} is the licensed and insured electrical crew {{CITY}} keeps on call. Panel work, EV chargers, generator installs, smart wiring, after-hours response. Hand-stamped tickets, up-front pricing, master electrician on staff.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Parse {{LOGO_COLORS}} into CSS vars per claude.md hard rule #16.
  // Tailwind references these via var(--color-primary) etc.
  const colors = parseColors("{{LOGO_COLORS}}");
  const fontLogoRaw: string = "{{FONT_LOGO}}";
  const hasBrandFont = fontLogoRaw.length > 0 && !fontLogoRaw.startsWith("{{");
  const brandFontFamily = hasBrandFont
    ? `'${fontLogoRaw.split(",")[0].trim().replace(/^["']|["']$/g, "")}'`
    : null;
  const fontBrandRule = brandFontFamily ? `--font-brand:${brandFontFamily};` : "";

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${monaSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--color-primary:${colors.primary};--color-secondary:${colors.secondary};--color-accent:${colors.accent};--color-primary-text:${colors.primaryText};--color-secondary-text:${colors.secondaryText};--color-accent-text:${colors.accentText};${fontBrandRule}}`,
          }}
        />
        {"{{GOOGLE_FONTS_HREF}}".startsWith("http") && (
          <link rel="stylesheet" href="{{GOOGLE_FONTS_HREF}}" />
        )}
      </head>
      <body suppressHydrationWarning className="bg-white text-black antialiased">
        {children}
        <HotlineRail />
        <CookieConsent />
      </body>
    </html>
  );
}
