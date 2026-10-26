"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, MapPin, Phone, Mail, Clock, Compass } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { HazardDivider } from "@/components/ui/HazardDivider";
import { TikTokIcon } from "@/components/ui/TikTokIcon";
import { XIcon } from "@/components/ui/XIcon";
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
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Get a Quote", href: "#quote" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

export function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative bg-black">
      <HazardDivider thin />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-20"
      >
        {/* MANIFESTO ROW — logo + signature line left, socials right */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="lg:max-w-2xl">
            <Logo variant="light" width={180} height={56} className="h-12 w-auto lg:h-14" />
            <p className="mt-6 font-display text-3xl uppercase leading-[1.05] tracking-tight text-white sm:text-4xl lg:text-5xl">
              Open the bay.<br />
              <span className="text-primary">Close the work order.</span>
            </p>
            <p className="mt-5 max-w-lg font-sans text-sm leading-relaxed text-white/55">
              {"{{BUSINESS_NAME}}"}. A {"{{CITY}}"} {"{{BUSINESS_TYPE}}"} built on honest pricing,
              certified work, and word-of-mouth you can&rsquo;t buy.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              Follow the shop
            </span>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ url, Icon, label }) => (
                <motion.a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  {...hoverLift}
                  className="group inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black transition-colors hover:border-primary hover:bg-primary"
                >
                  <Icon
                    size={16}
                    strokeWidth={1.75}
                    className="text-white/70 transition-colors group-hover:text-primary-text"
                  />
                </motion.a>
              ))}
            </div>
            <p className="hidden lg:block font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
              ASE-Certified · Licensed · Insured
            </p>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <HazardDivider thin className="my-10 lg:my-14" />

        {/* 4-COL INFO GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Where we are */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-2">
              <MapPin size={13} strokeWidth={2} className="text-secondary" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                Where we are
              </h3>
            </div>
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm leading-relaxed text-white/80 transition-colors hover:text-primary"
            >
              {"{{FULL_ADDRESS}}"}
            </a>
          </motion.div>

          {/* Reach the bay */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-2">
              <Phone size={13} strokeWidth={2} className="text-primary" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Reach the bay
              </h3>
            </div>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-lg uppercase tracking-tight text-white transition-colors hover:text-primary"
            >
              {"{{PHONE}}"}
            </a>
            <a
              href="mailto:{{EMAIL}}"
              className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-white/75 transition-colors hover:text-primary"
            >
              <Mail size={12} strokeWidth={2} aria-hidden />
              <span className="break-all">{"{{EMAIL}}"}</span>
            </a>
          </motion.div>

          {/* When we're open */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-2">
              <Clock size={13} strokeWidth={2} className="text-secondary" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-secondary">
                When we&rsquo;re open
              </h3>
            </div>
            <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-white/80">
              {"{{HOURS}}"}
            </p>
          </motion.div>

          {/* Explore */}
          <motion.div variants={fadeUp}>
            <div className="mb-4 flex items-center gap-2">
              <Compass size={13} strokeWidth={2} className="text-primary" aria-hidden />
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                Explore
              </h3>
            </div>
            <ul className="flex flex-col gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-display text-base uppercase tracking-tight text-white/85 transition-colors hover:text-primary"
                  >
                    {n.label}
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

        {/* BOTTOM LEGAL STRIP */}
        <motion.div
          variants={staggerItem}
          className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:pt-7"
        >
          <p>
            © {year ?? ""} {"{{BUSINESS_NAME}}"} · {"{{CITY}}"}, {"{{STATE}}"}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
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
