"use client";

/**
 * Footer — RICH per claude.md hard rule #4b.
 * Top: amber-glow strip + Logo + manifesto + 4 social icons.
 * VoltageRule divider.
 * 4-col info grid: Where we are / Reach the crew / When we're open / Site map.
 * Bottom legal strip: copyright (year via useEffect) + 3 legal links.
 */
import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Instagram,
  Facebook,
} from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { TikTokIcon } from "./ui/TikTokIcon";
import { XIcon } from "./ui/XIcon";
import { VoltageRule } from "./ui/VoltageRule";
import { VoltageMeter } from "./ui/VoltageMeter";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const HOURS_LINES = "{{HOURS}}".split(",").map((s) => s.trim()).filter(Boolean);

const SITE_MAP = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Quote" },
  { href: "#contact", label: "Contact" },
];

const SOCIAL_BASE =
  "h-11 w-11 flex items-center justify-center border border-white/30 text-white/85 hover:border-primary hover:text-primary transition-colors";

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

export function Footer() {
  // Year set on client only (claude.md rule #12 hydration safety)
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="relative bg-black overflow-hidden">
      {/* Atmospheric amber-glow strip near top */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-primary-rule"
        aria-hidden="true"
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-20 pb-6 sm:pb-8"
      >
        {/* Manifesto + logo + socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 mb-7 sm:mb-12 md:mb-14">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <Logo variant="light" width={170} height={48} className="mb-5 sm:mb-7" />
            <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white leading-[1.05] tracking-tighter max-w-2xl uppercase">
              Lights stay on. Permits pulled.
              <br />
              Code-compliant.
              <br />
              <span className="text-primary">The power you trust.</span>
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-5 sm:gap-6">
            <p className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-white/50 lg:text-right max-w-sm">
              Licensed &amp; insured electrical service in {"{{CITY}}"}, {"{{STATE}}"}.
              Master electrician on staff. Available 24/7 for emergencies.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <motion.a
                href="{{INSTAGRAM_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                {...hoverLift}
                className={SOCIAL_BASE}
              >
                <Instagram size={18} strokeWidth={1.6} />
              </motion.a>
              <motion.a
                href="{{FACEBOOK_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                {...hoverLift}
                className={SOCIAL_BASE}
              >
                <Facebook size={18} strokeWidth={1.6} />
              </motion.a>
              <motion.a
                href="{{TIKTOK_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                {...hoverLift}
                className={SOCIAL_BASE}
              >
                <TikTokIcon size={18} />
              </motion.a>
              <motion.a
                href="{{TWITTER_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                {...hoverLift}
                className={SOCIAL_BASE}
              >
                <XIcon size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <VoltageRule width="full" tone="amber" className="mb-7 sm:mb-12 md:mb-14" />

        {/* 4-col info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10 mb-7 sm:mb-12 md:mb-14">
          {/* Where we are */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Where we are
              </h3>
            </div>
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-1.5 font-sans text-[15px] text-white/85 hover:text-primary leading-relaxed transition-colors"
            >
              <span>{"{{FULL_ADDRESS}}"}</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="mt-1 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
              />
            </a>
          </motion.div>

          {/* Reach the crew */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <Phone size={14} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Reach the crew
              </h3>
            </div>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-lg sm:text-xl text-white hover:text-primary transition-colors leading-snug uppercase tracking-tight"
            >
              {"{{PHONE}}"}
            </a>
            <a
              href="mailto:{{EMAIL}}"
              className="inline-flex items-center gap-1.5 mt-2 font-sans text-[14px] text-white/85 hover:text-primary transition-colors"
            >
              <Mail size={13} strokeWidth={1.7} />
              {"{{EMAIL}}"}
            </a>
          </motion.div>

          {/* When we're open */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <Clock size={14} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary">
                When we&apos;re open
              </h3>
            </div>
            {/* Mobile: compact 2-col Day | Hours table */}
            <dl className="sm:hidden grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
              {HOURS_LINES.map((line) => {
                const spaceIdx = line.indexOf(" ");
                const day = spaceIdx === -1 ? line : line.slice(0, spaceIdx);
                const hours = spaceIdx === -1 ? "" : line.slice(spaceIdx + 1);
                return (
                  <div key={line} className="contents">
                    <dt className="font-mono text-[11px] uppercase tracking-widest text-primary leading-snug">
                      {day}
                    </dt>
                    <dd className="font-sans text-[13px] text-white/85 leading-snug">
                      {hours}
                    </dd>
                  </div>
                );
              })}
            </dl>
            {/* Tablet+: original stacked list */}
            <ul className="hidden sm:block space-y-1.5 font-sans text-[14px] text-white/85">
              {HOURS_LINES.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </motion.div>

          {/* Site map */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <VoltageMeter size={11} tone="amber" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary">
                Site map
              </h3>
            </div>
            <ul className="space-y-2 font-sans text-[14px] text-white/85">
              {SITE_MAP.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors group"
                  >
                    <ChevronRight
                      size={11}
                      strokeWidth={1.7}
                      className="text-white/50 group-hover:text-primary transition-colors"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <VoltageRule width="full" tone="amber" className="mb-5 sm:mb-7" />

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
        <motion.div
          variants={staggerItem}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-white/50"
        >
          <p>
            &copy; <span suppressHydrationWarning>{year ?? ""}</span>{" "}
            {"{{BUSINESS_NAME}}"}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-primary transition-colors"
              >
                Privacy policy
              </a>
            </li>
            <li>
              <a
                href="/terms-of-service"
                className="hover:text-primary transition-colors"
              >
                Terms of service
              </a>
            </li>
            <li>
              <a
                href="/cookie-policy"
                className="hover:text-primary transition-colors"
              >
                Cookie policy
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}
