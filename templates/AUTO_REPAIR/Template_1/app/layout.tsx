import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { parseColors } from "@/lib/parseColors";
import { CookieConsent } from "@/components/CookieConsent";

// Display — signage / bay-number stencils
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Mono — work orders, telemetry strips, inspection readouts
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Body — paragraphs, forms, legal copy
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}, {{STATE}}",
  description:
    "{{BUSINESS_NAME}}. Trusted {{BUSINESS_TYPE}} serving {{CITY}}, {{STATE}}. Honest pricing, certified technicians, and warranty-backed work. Call {{PHONE}} or request a free quote.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "{{BUSINESS_NAME}} · {{BUSINESS_TYPE}} in {{CITY}}",
    description:
      "Honest pricing, certified technicians, warranty-backed work in {{CITY}}, {{STATE}}.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Parse {{LOGO_COLORS}} (resolved by the pipeline / preview script before
  // build) into the six CSS variables consumed by tailwind.config.ts.
  const c = parseColors("{{LOGO_COLORS}}");
  const fontLogoRaw: string = "{{FONT_LOGO}}";
  const hasBrandFont = fontLogoRaw.length > 0 && !fontLogoRaw.startsWith("{{");
  const brandFontFamily = hasBrandFont
    ? `'${fontLogoRaw.split(",")[0].trim().replace(/^["']|["']$/g, "")}'`
    : null;
  const fontBrandRule = brandFontFamily ? `--font-brand:${brandFontFamily};` : "";
  const cssVars = `:root{--color-primary:${c.primary};--color-secondary:${c.secondary};--color-accent:${c.accent};--color-primary-text:${c.primaryText};--color-secondary-text:${c.secondaryText};--color-accent-text:${c.accentText};${fontBrandRule}}`;

  return (
    <html
      lang="en"
      className={`${bebas.variable} ${mono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />
        {"{{GOOGLE_FONTS_HREF}}".startsWith("http") && (
          <link rel="stylesheet" href="{{GOOGLE_FONTS_HREF}}" />
        )}
      </head>
      <body className="bg-black text-white" suppressHydrationWarning>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
