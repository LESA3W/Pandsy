import type { Metadata } from "next";
import { Zilla_Slab, Inter } from "next/font/google";
import { parseColors } from "@/lib/parseColors";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const zilla = Zilla_Slab({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} | {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}}",
  description:
    "{{BUSINESS_NAME}} is a trusted {{BUSINESS_TYPE}} serving {{CITY}}, {{STATE}} {{ZIP}} and the surrounding area. Honest pricing, ASE-certified technicians, and same-day service on most repairs.",
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
      className={`${zilla.variable} ${inter.variable}`}
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
