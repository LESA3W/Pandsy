import type { Metadata } from "next";
import { Mona_Sans, Inter, Geist_Mono } from "next/font/google";
import { parseColors } from "@/lib/parseColors";
import { CookieConsent } from "@/components/CookieConsent";
import StickyRescue from "@/components/StickyRescue";
import "./globals.css";

const display = Mona_Sans({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const colors = parseColors("{{LOGO_COLORS}}");
const fontLogoRaw: string = "{{FONT_LOGO}}";
const hasBrandFont = fontLogoRaw.length > 0 && !fontLogoRaw.startsWith("{{");
const brandFontFamily = hasBrandFont
  ? `'${fontLogoRaw.split(",")[0].trim().replace(/^["']|["']$/g, "")}'`
  : null;

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}} {{ZIP}}",
  description:
    "Licensed plumbing in {{CITY}}, {{STATE}}. Up-front pricing, master plumber on staff, 24/7 emergency line. Drain cleaning, water heaters, leak detection, and full residential plumbing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
      suppressHydrationWarning
      style={
        {
          "--color-primary": colors.primary,
          "--color-secondary": colors.secondary,
          "--color-accent": colors.accent,
          "--color-primary-text": colors.primaryText,
          "--color-secondary-text": colors.secondaryText,
          "--color-accent-text": colors.accentText,
          ...(brandFontFamily ? { "--font-brand": brandFontFamily } : {}),
        } as React.CSSProperties
      }
    >
      <head>
        {"{{GOOGLE_FONTS_HREF}}".startsWith("http") && (
          <link rel="stylesheet" href="{{GOOGLE_FONTS_HREF}}" />
        )}
      </head>
      <body
        className="bg-white font-sans text-black antialiased"
        suppressHydrationWarning
      >
        {children}
        <StickyRescue />
        <CookieConsent />
      </body>
    </html>
  );
}
