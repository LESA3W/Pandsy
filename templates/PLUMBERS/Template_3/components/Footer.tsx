"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Instagram, Facebook, MapPin, Phone, Mail, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import TikTokIcon from "@/components/ui/TikTokIcon";
import XIcon from "@/components/ui/XIcon";
import AquaRule from "@/components/ui/AquaRule";
import WaterDot from "@/components/ui/WaterDot";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

// Footer — RICH per CLAUDE.md hard rule #4b.
// Dark black surface. Manifesto block + 4-col info grid + atmospheric WaveWash + bottom legal strip.

const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

// Split a line like "Mon-Fri 7am-7pm" or "Sat 8am-4pm" into { day, time }.
// First whitespace-separated token is the day (or day range), rest is the time spec.
const HOURS_ROWS = HOURS_LINES.map((line) => {
  const m = line.match(/^(\S+(?:\s*[-]\s*\S+)?)\s+(.+)$/u);
  return m ? { day: m[1], time: m[2] } : { day: line, time: "" };
});

const SITE_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Get a quote", href: "#quote" },
  { label: "Contact", href: "#contact" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* Atmospheric corner WaveWash — the one allowed atmospheric element per rule #4b */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-wave-wash-deep opacity-40"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 md:px-10 md:py-20 lg:px-8 lg:py-24"
      >
        {/* MANIFESTO BLOCK */}
        <div className="grid grid-cols-1 items-start gap-6 sm:gap-8 lg:grid-cols-12 lg:gap-10">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <Logo variant="light" className="h-9 w-auto sm:h-10" />
            {/* SLOT:FOOTER_MANIFESTO */}
            <p
              data-slot="FOOTER_MANIFESTO"
              className="mt-5 max-w-xl font-display text-2xl font-black leading-[1.08] tracking-tight-display text-white sm:mt-6 sm:text-3xl md:text-4xl lg:text-[2.4rem]"
            >
              We test the line. We tarp the floor.
              <br />
              <span className="text-primary">We close the work order.</span>
            </p>
          </motion.div>

          {/* 4 social icons opposite the manifesto */}
          <motion.div variants={fadeUp} className="lg:col-span-5 lg:flex lg:justify-end">
            <ul className="flex items-center gap-3">
              <SocialIcon href="{{INSTAGRAM_URL}}" label="Instagram">
                <Instagram size={18} strokeWidth={1.8} />
              </SocialIcon>
              <SocialIcon href="{{FACEBOOK_URL}}" label="Facebook">
                <Facebook size={18} strokeWidth={1.8} />
              </SocialIcon>
              <SocialIcon href="{{TIKTOK_URL}}" label="TikTok">
                <TikTokIcon className="h-[18px] w-[18px]" />
              </SocialIcon>
              <SocialIcon href="{{TWITTER_URL}}" label="X (Twitter)">
                <XIcon className="h-[16px] w-[16px]" />
              </SocialIcon>
            </ul>
          </motion.div>
        </div>

        {/* AquaRule divider */}
        <div className="mt-9 mb-9 sm:mt-12 sm:mb-12">
          <AquaRule tone="aqua" />
        </div>

        {/* 4-col info grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4 lg:gap-12">
          <motion.div variants={fadeUp}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <WaterDot size={12} tone="light" />
              Where we are
            </p>
            <p className="mt-3 text-sm text-white/80">
              <a
                href="{{GOOGLE_MAPS_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 py-2 hover:text-primary"
              >
                <MapPin size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                <span>{"{{FULL_ADDRESS}}"}</span>
              </a>
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <WaterDot size={12} tone="light" />
              Reach the team
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="tel:{{PHONE_DIGITS}}"
                  className="inline-flex min-h-[44px] items-center gap-2 py-2 hover:text-primary"
                >
                  <Phone size={14} strokeWidth={1.8} className="mt-0.5 shrink-0" />
                  <span>{"{{PHONE}}"}</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:{{EMAIL}}"
                  className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap py-2 text-[13px] hover:text-primary"
                >
                  <Mail size={14} strokeWidth={1.8} className="shrink-0" />
                  <span>{"{{EMAIL}}"}</span>
                </a>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <WaterDot size={12} tone="light" />
              Open hours
            </p>
            <ul className="mt-3 grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5">
              {HOURS_ROWS.map((row, i) => (
                <li key={i} className="contents">
                  <span className="font-display text-sm font-black tracking-tight-display text-primary">
                    {row.day}
                  </span>
                  <span className="font-mono text-[12px] text-white/90">
                    {row.time}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
              <WaterDot size={12} tone="light" />
              Site map
            </p>
            <ul className="mt-3 space-y-2 text-sm text-white/80">
              {SITE_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex min-h-[44px] items-center gap-1 py-2 hover:text-primary"
                  >
                    <ChevronRight size={12} strokeWidth={2} className="shrink-0" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* PAYMENT METHODS — example set; the client configures their own */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">Payment accepted</span>
            <ul className="flex flex-wrap items-center gap-2">
              {PAYMENTS.map((p) => (
                <li key={p.file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/payments/${p.file}.png`} alt={p.name} width={140} height={111} className="h-8 w-auto" />
                </li>
              ))}
            </ul>
          </div>
          <p className="font-sans text-[11px] italic leading-relaxed text-white/45">
            Example shown — set the payment methods you actually accept here.
          </p>
        </motion.div>

        {/* Bottom legal strip */}
        <motion.div variants={staggerItem} className="mt-10 sm:mt-14">
          <AquaRule tone="light" />
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
              &copy; {year ?? ""} {"{{BUSINESS_NAME}}"}. All rights reserved.
            </p>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
              <li>
                <Link href="/privacy-policy" className="inline-flex items-center py-3 hover:text-primary">
                  Privacy policy
                </Link>
              </li>
              <li aria-hidden className="text-white/30">·</li>
              <li>
                <Link href="/terms-of-service" className="inline-flex items-center py-3 hover:text-primary">
                  Terms of service
                </Link>
              </li>
              <li aria-hidden className="text-white/30">·</li>
              <li>
                <Link href="/cookie-policy" className="inline-flex items-center py-3 hover:text-primary">
                  Cookie policy
                </Link>
              </li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        {...hoverLift}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-white transition-all duration-150 ease-out hover:border-primary hover:bg-white/5 hover:text-primary"
      >
        {children}
      </motion.a>
    </li>
  );
}
