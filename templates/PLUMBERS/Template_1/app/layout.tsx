import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { EmergencyButton } from "@/components/EmergencyButton";
import { parseColors } from "@/lib/parseColors";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}} {{ZIP}}",
  description:
    "{{BUSINESS_NAME}} is the licensed and insured plumbing service {{CITY}} trusts. Drain cleaning, water heater service, leak detection, sewer service, and 24/7 emergency response. Up-front pricing. Master plumber on staff.",
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
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable}`}
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
      <body suppressHydrationWarning className="bg-white text-slate-900 antialiased">
        {children}
        <CookieConsent />
        <EmergencyButton />
      </body>
    </html>
  );
}
