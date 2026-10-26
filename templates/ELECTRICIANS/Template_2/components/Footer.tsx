"use client";

/**
 * Footer — RICH per claude.md hard rule #4b.
 * SafetyTape strip top (T2 signature). Manifesto + 4 socials. MeasureRule
 * divider. 4-col info grid: Where we are / Reach the desk / When we're open
 * / Site map. Bottom legal strip.
 *
 * Steel-ink (deepest navy/black) surface to anchor the page — distinct from
 * T1's volt-deep charcoal-blue.
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
import { MeasureRule } from "./ui/MeasureRule";
import { TargetMarker } from "./ui/TargetMarker";
import { SafetyTape } from "./ui/SafetyTape";
import {
  fadeUp,
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
  "h-11 w-11 flex items-center justify-center border border-white/20 text-white/80 hover:border-primary hover:text-primary transition-colors";

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
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Top hazard tape — T2 signature atmospheric atom */}
      <SafetyTape thickness="thin" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-10 sm:pt-14 md:pt-20 pb-8"
      >
        {/* Manifesto + logo + socials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 mb-10 sm:mb-14">
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <Logo variant="light" width={170} height={48} className="mb-5 sm:mb-7" />
            <p className="font-display text-2xl sm:text-4xl md:text-5xl text-white leading-[1.05] tracking-tight max-w-2xl font-bold">
              Tested. Tagged. Trusted.
              <br />
              <span className="text-primary">Wired right, the first time.</span>
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col lg:items-end justify-between gap-6">
            <p className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-white/40 lg:text-right max-w-sm font-medium">
              Licensed &amp; insured electrical service in {"{{CITY}}"}, {"{{STATE}}"}.
              Master electrician on staff. After-hours line on call.
            </p>
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href="{{INSTAGRAM_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={SOCIAL_BASE}
              >
                <Instagram size={18} strokeWidth={1.6} />
              </a>
              <a
                href="{{FACEBOOK_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={SOCIAL_BASE}
              >
                <Facebook size={18} strokeWidth={1.6} />
              </a>
              <a
                href="{{TIKTOK_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={SOCIAL_BASE}
              >
                <TikTokIcon size={18} />
              </a>
              <a
                href="{{TWITTER_URL}}"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className={SOCIAL_BASE}
              >
                <XIcon size={16} />
              </a>
            </div>
          </motion.div>
        </div>

        <MeasureRule width="full" tone="sapphire" className="mb-10 sm:mb-14" />

        {/* 4-col info grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-10 mb-10 sm:mb-14">
          {/* Where we are */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary font-medium">
                Office
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

          {/* Reach the desk */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <Phone size={14} strokeWidth={1.7} className="text-primary" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary font-medium">
                Reach the desk
              </h3>
            </div>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-xl text-white hover:text-primary transition-colors leading-snug font-semibold tracking-tight"
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
            {/* Mobile (hours.png style): no icon, accent title, 2-col day | time grid */}
            <div className="sm:hidden">
              <h3 className="font-mono text-[12px] uppercase tracking-widest text-primary font-semibold mb-3">
                Hours
              </h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 font-sans text-[13px]">
                {HOURS_LINES.map((line) => {
                  const idx = line.indexOf(" ");
                  const day = idx > 0 ? line.slice(0, idx) : line;
                  const time = idx > 0 ? line.slice(idx + 1) : "";
                  return (
                    <div key={line} className="contents">
                      <dt className="text-white">{day}</dt>
                      <dd className="text-white/70">{time}</dd>
                    </div>
                  );
                })}
              </dl>
            </div>

            {/* Tablet/Desktop unchanged */}
            <div className="hidden sm:block">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={14} strokeWidth={1.7} className="text-primary" />
                <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary font-medium">
                  When we&apos;re open
                </h3>
              </div>
              <ul className="space-y-1.5 font-sans text-[14px] text-white/85">
                {HOURS_LINES.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Site map */}
          <motion.div variants={fadeUp}>
            <div className="flex items-center gap-2 mb-4">
              <TargetMarker size={11} tone="sapphire" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-primary font-medium">
                Site map
              </h3>
            </div>
            <ul className="space-y-2 font-sans text-[14px] text-white/85">
              {SITE_MAP.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1 hover:text-primary transition-colors group py-1.5 -my-1.5"
                  >
                    <ChevronRight
                      size={11}
                      strokeWidth={1.7}
                      className="text-white/40 group-hover:text-primary transition-colors"
                    />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <MeasureRule width="full" tone="sapphire" className="mb-7" />

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
