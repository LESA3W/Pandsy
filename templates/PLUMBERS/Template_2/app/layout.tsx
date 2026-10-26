import type { Metadata } from "next";
import { IBM_Plex_Serif, Work_Sans, Space_Mono } from "next/font/google";
import { parseColors } from "@/lib/parseColors";
import { CookieConsent } from "@/components/CookieConsent";
import { EmergencyStrip } from "@/components/EmergencyStrip";
import { EmergencyCallButton } from "@/components/EmergencyCallButton";
import "./globals.css";

const display = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    "Licensed plumbing in {{CITY}}, {{STATE}}. Up-front pricing, master plumber on staff, 24/7 emergency line. Drain cleaning, water heaters, leak detection, and full service plumbing.",
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
        className="font-sans bg-white text-black antialiased"
        suppressHydrationWarning
      >
        <EmergencyStrip />
        {children}
        <EmergencyCallButton />
        <CookieConsent />
      </body>
    </html>
  );
}
