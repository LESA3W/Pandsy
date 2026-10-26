import type { Metadata } from "next";
import { Space_Grotesk, Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { EmergencyBanner } from "@/components/EmergencyBanner";
import { CallTab } from "@/components/CallTab";
import { parseColors } from "@/lib/parseColors";
import "./globals.css";

// Display: Space Grotesk — technical-neutral grotesque. Set in regular case
// (NOT UPPERCASE per T1 reservation). Distinct from T1's heavy industrial.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

// Body: Inter Tight — tighter horizontal width than T1's regular Inter.
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
  display: "swap",
});

// Mono: IBM Plex Mono — humanist mono. Distinct from T1's JetBrains Mono.
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}} {{ZIP}}",
  description:
    "{{BUSINESS_NAME}} is the licensed and insured electrical service {{CITY}} trusts. Service upgrades, EV chargers, generator install, smart wiring, after-hours response. Up-front pricing. Master electrician on staff.",
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
      className={`${spaceGrotesk.variable} ${interTight.variable} ${ibmPlexMono.variable}`}
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
        <EmergencyBanner />
        {children}
        <CookieConsent />
        <CallTab />
      </body>
    </html>
  );
}
