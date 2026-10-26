"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  Clock,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import TikTokIcon from "@/components/ui/TikTokIcon";
import XIcon from "@/components/ui/XIcon";
import { cn } from "@/lib/cn";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const SOCIALS = [
  { url: "{{INSTAGRAM_URL}}", Icon: Instagram, label: "Instagram" },
  { url: "{{FACEBOOK_URL}}", Icon: Facebook, label: "Facebook" },
  { url: "{{TIKTOK_URL}}", Icon: TikTokIcon, label: "TikTok" },
  { url: "{{TWITTER_URL}}", Icon: XIcon, label: "X" },
];

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About the shop", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Get a quote", href: "#quote" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

/**
 * Footer — HERITAGE WORKSHOP. Forest-deep dark surface, cream text.
 * Rich layout per claude.md hard rule #4b: manifesto top, 4-col info grid,
 * legal strip bottom. Desktop is a deliberate 4-column balance — each column
 * has matching small-caps clay-accent label + content density.
 */
export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-secondary/80 text-secondary">
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
            <Logo variant="dark" className="h-12 w-auto lg:h-14" />
            <p className="mt-6 font-display text-3xl leading-[1.1] text-secondary sm:text-4xl lg:text-[44px]">
              Pull in.<br />
              <span className="text-primary">We&rsquo;ll take it from there.</span>
            </p>
            <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-secondary/65">
              {"{{BUSINESS_NAME}}"}. A {"{{BUSINESS_TYPE}}"} in {"{{CITY}}, {{STATE}}"}.
              Honest work, twelve-month warranty, walk-ins welcome.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <FooterHeading>Follow the shop</FooterHeading>
            <ul className="flex items-center gap-3">
              {SOCIALS.map(({ url, Icon, label }) => (
                <li key={label}>
                  <motion.a
                    href={url}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...hoverLift}
                    className={socialCls}
                  >
                    <Icon size={18} strokeWidth={1.75} />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* DIVIDER — thin clay hairline */}
        <div className="my-10 h-px bg-primary/30 lg:my-14" />

        {/* 4-COL INFO GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Where we are */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={MapPin}>Where we are</ColumnHeader>
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm leading-relaxed text-secondary/80 transition-colors hover:text-primary"
            >
              {"{{FULL_ADDRESS}}"}
            </a>
          </motion.div>

          {/* Reach us */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Phone}>Reach us</ColumnHeader>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-lg text-secondary transition-colors hover:text-primary"
            >
              {"{{PHONE}}"}
            </a>
            <a
              href="mailto:{{EMAIL}}"
              className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-secondary/75 transition-colors hover:text-primary"
            >
              <Mail size={12} strokeWidth={1.75} aria-hidden />
              <span className="break-all">{"{{EMAIL}}"}</span>
            </a>
          </motion.div>

          {/* When we're open */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Clock}>When we&rsquo;re open</ColumnHeader>
            <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-secondary/80">
              {"{{HOURS}}"}
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Compass}>Explore</ColumnHeader>
            <ul className="flex flex-col gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-sans text-sm text-secondary/85 transition-colors hover:text-secondary"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* PAYMENT METHODS — example set; the client configures their own */}
        <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 border-t border-secondary/15 pt-6 lg:mt-14 lg:pt-7">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary/40">Payment accepted</span>
            <ul className="flex flex-wrap items-center gap-2">
              {PAYMENTS.map((p) => (
                <li key={p.file}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`/payments/${p.file}.png`} alt={p.name} width={140} height={111} className="h-8 w-auto" />
                </li>
              ))}
            </ul>
          </div>
          <p className="font-sans text-[11px] italic leading-relaxed text-secondary/45">
            Example shown — set the payment methods you actually accept here.
          </p>
        </motion.div>

        {/* BOTTOM LEGAL STRIP */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col gap-3 border-t border-secondary/15 pt-6 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:pt-7"
        >
          <p className="font-sans text-xs text-secondary/55">
            © {year ?? ""} {"{{BUSINESS_NAME}}"} · All rights reserved
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-xs text-secondary/65">
            <li>
              <Link href="/privacy-policy" className="transition-colors hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms-of-service" className="transition-colors hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="transition-colors hover:text-primary">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

function ColumnHeader({
  icon: Icon,
  children,
  iconColor = "clay",
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
  iconColor?: "clay" | "secondary";
}) {
  const colorCls = iconColor === "secondary" ? "text-secondary" : "text-primary";
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={13} strokeWidth={1.75} className={colorCls} aria-hidden />
      <h3 className={`font-sans text-[11px] uppercase tracking-[0.18em] ${colorCls}`}>
        {children}
      </h3>
    </div>
  );
}

const socialCls = cn(
  "inline-flex h-11 w-11 items-center justify-center border border-secondary/25 text-secondary transition-colors",
  "hover:border-primary hover:text-primary"
);
