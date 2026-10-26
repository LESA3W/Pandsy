import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { parseColors } from "@/lib/parseColors";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const geist = Geist({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} | {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}}",
  description:
    "{{BUSINESS_NAME}} is a trusted {{BUSINESS_TYPE}} serving {{CITY}}, {{STATE}} {{ZIP}}. Honest pricing, ASE-certified technicians, and a 12-month warranty on what we fix.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const c = parseColors("{{LOGO_COLORS}}");
  const fontLogoRaw: string = "{{FONT_LOGO}}";
  const hasBrandFont = fontLogoRaw.length > 0 && !fontLogoRaw.startsWith("{{");
  const brandFontFamily = hasBrandFont
    ? `'${fontLogoRaw.split(",")[0].trim().replace(/^["']|["']$/g, "")}'`
    : null;

  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {"{{GOOGLE_FONTS_HREF}}".startsWith("http") && (
          <link rel="stylesheet" href="{{GOOGLE_FONTS_HREF}}" />
        )}
      </head>
      <body
        suppressHydrationWarning
        style={
          {
            "--color-primary": c.primary,
            "--color-secondary": c.secondary,
            "--color-accent": c.accent,
            "--color-primary-text": c.primaryText,
            "--color-secondary-text": c.secondaryText,
            "--color-accent-text": c.accentText,
            ...(brandFontFamily ? { "--font-brand": brandFontFamily } : {}),
          } as React.CSSProperties
        }
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
