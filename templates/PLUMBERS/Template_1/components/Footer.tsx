"use client";

import { useEffect, useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUpRight,
  Compass,
  Instagram,
  Facebook,
} from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { TikTokIcon } from "./ui/TikTokIcon";
import { XIcon } from "./ui/XIcon";
import { TideLine } from "./ui/TideLine";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const SITE_MAP = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Quote" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = [
  { Icon: Instagram, href: "{{INSTAGRAM_URL}}", label: "Instagram" },
  { Icon: Facebook, href: "{{FACEBOOK_URL}}", label: "Facebook" },
  { Icon: TikTokIcon, href: "{{TIKTOK_URL}}", label: "TikTok" },
  { Icon: XIcon, href: "{{TWITTER_URL}}", label: "X (Twitter)" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

/**
 * Footer — HARBOR. Dark surface, primary accents.
 * Rich layout per claude.md hard rule #4b: manifesto top, 4-col info grid,
 * legal strip bottom. Desktop is a balanced 4-column grid.
 */
export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Top primary hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-primary/40" aria-hidden />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20"
      >
        {/* MANIFESTO ROW */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="lg:max-w-2xl">
            <Logo variant="dark" width={180} height={56} className="h-12 w-auto lg:h-14" />
            <p className="mt-6 font-display text-3xl leading-[1.05] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Steady hands. Honest work.<br />
              <span className="text-primary">The water you trust.</span>
            </p>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-slate-500">
              Licensed &amp; insured plumbing service in {"{{CITY}}, {{STATE}}"}.
              Available 24/7 for emergencies.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Find us elsewhere
            </span>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  {...hoverLift}
                  className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon size={18} strokeWidth={1.6} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <TideLine className="my-10 lg:my-14" />

        {/* 4-COL INFO GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Where we are */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={MapPin}>Where we are</ColumnHeader>
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-start gap-1.5 font-sans text-sm leading-relaxed text-slate-600 transition-colors hover:text-primary"
            >
              <span>{"{{FULL_ADDRESS}}"}</span>
              <ArrowUpRight
                size={14}
                strokeWidth={1.7}
                className="mt-1 flex-shrink-0 opacity-60 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </a>
          </motion.div>

          {/* Reach our crew */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Phone}>Reach our crew</ColumnHeader>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-lg text-slate-900 transition-colors hover:text-primary"
            >
              {"{{PHONE}}"}
            </a>
            <a
              href="mailto:{{EMAIL}}"
              className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-slate-600 transition-colors hover:text-primary"
            >
              <Mail size={12} strokeWidth={1.7} aria-hidden />
              <span className="break-all">{"{{EMAIL}}"}</span>
            </a>
          </motion.div>

          {/* When we're open */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Clock}>When we&rsquo;re open</ColumnHeader>
            <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-slate-600">
              {"{{HOURS}}"}
            </p>
          </motion.div>

          {/* Site map */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Compass}>Site map</ColumnHeader>
            <ul className="flex flex-col gap-2">
              {SITE_MAP.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-sm text-slate-600 transition-colors hover:text-primary"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* PAYMENT METHODS — example set; the client configures their own */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">Payment accepted</span>
            <ul className="flex flex-wrap items-center gap-2">
              {PAYMENTS.map((p) => (
                <li key={p.file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/payments/${p.file}.png`} alt={p.name} width={140} height={111} className="h-8 w-auto" />
                </li>
              ))}
            </ul>
          </div>
          <p className="font-sans text-[11px] italic leading-relaxed text-slate-500">
            Example shown — set the payment methods you actually accept here.
          </p>
        </motion.div>

        {/* BOTTOM LEGAL STRIP */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:pt-7"
        >
          <p>
            © <span suppressHydrationWarning>{year ?? ""}</span>{" "}
            {"{{BUSINESS_NAME}}"} · All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <a href="/privacy-policy" className="transition-colors hover:text-primary">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="transition-colors hover:text-primary">
                Terms of service
              </a>
            </li>
            <li>
              <a href="/cookie-policy" className="transition-colors hover:text-primary">
                Cookie policy
              </a>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function ColumnHeader({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={13} strokeWidth={1.7} className="text-primary" aria-hidden />
      <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
        {children}
      </h3>
    </div>
  );
}
