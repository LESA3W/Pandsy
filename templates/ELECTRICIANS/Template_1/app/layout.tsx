import type { Metadata } from "next";
import { Archivo_Black, Inter, JetBrains_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { EmergencyButton } from "@/components/EmergencyButton";
import { parseColors } from "@/lib/parseColors";
import "./globals.css";

// Display: Archivo Black — heavy industrial geometric, reads like a panel-cover label.
const archivoBlack = Archivo_Black({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

// Body: Inter — proven technical readability.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono: JetBrains Mono — breaker labels, panel meta strips, voltage readouts.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}} {{ZIP}}",
  description:
    "{{BUSINESS_NAME}} is the licensed and insured electrical service {{CITY}} trusts. Panel upgrades, EV chargers, generator install, smart wiring, and 24/7 emergency response. Up-front pricing. Master electrician on staff.",
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

  return (
    <html
      lang="en"
      className={`${archivoBlack.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--color-primary:${colors.primary};--color-secondary:${colors.secondary};--color-accent:${colors.accent};--color-primary-text:${colors.primaryText};--color-secondary-text:${colors.secondaryText};--color-accent-text:${colors.accentText};${brandFontFamily ? `--font-brand:${brandFontFamily};` : ""}}`,
          }}
        />
        {"{{GOOGLE_FONTS_HREF}}".startsWith("http") && (
          <link rel="stylesheet" href="{{GOOGLE_FONTS_HREF}}" />
        )}
      </head>
      <body suppressHydrationWarning className="bg-white text-black antialiased">
        {children}
        <CookieConsent />
        <EmergencyButton />
      </body>
    </html>
  );
}
