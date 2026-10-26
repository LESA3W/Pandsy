"use client";

import { Fragment, useEffect, useState } from "react";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock, Compass } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import HaloRule from "@/components/ui/HaloRule";
import GlowDot from "@/components/ui/GlowDot";
import TikTokIcon from "@/components/ui/TikTokIcon";
import XIcon from "@/components/ui/XIcon";
import {
  fadeUp,
  hoverLift,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms-of-service" },
  { label: "Cookies", href: "/cookie-policy" },
];

const SOCIALS = [
  { url: "{{INSTAGRAM_URL}}", Icon: Instagram, label: "Instagram" },
  { url: "{{FACEBOOK_URL}}", Icon: Facebook, label: "Facebook" },
  { url: "{{TIKTOK_URL}}", Icon: TikTokIcon, label: "TikTok" },
  { url: "{{TWITTER_URL}}", Icon: XIcon, label: "X" },
];

const PAYMENTS = [
  { file: "visa", name: "Visa" },
  { file: "mastercard", name: "Mastercard" },
  { file: "amex", name: "American Express" },
  { file: "discover", name: "Discover" },
  { file: "paypal", name: "PayPal" },
];

/** ------- Hours parsing (preserved from previous Footer) ------- */
type HourRow = { day: string; morning: string; afternoon: string; closed: boolean };
const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const SHORT_TO_LONG: Record<string, (typeof DAY_ORDER)[number]> = {
  Mon: "Monday", Tue: "Tuesday", Tues: "Tuesday", Wed: "Wednesday", Weds: "Wednesday",
  Thu: "Thursday", Thur: "Thursday", Thurs: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday",
};
function splitTwoRanges(s: string): [string, string] {
  for (const sep of [" and ", " & ", " + ", " / ", "/", ";"]) {
    if (s.includes(sep)) {
      const [a, b] = s.split(sep);
      return [a.trim(), b.trim()];
    }
  }
  return [s.trim(), ""];
}
function parseHours(raw: string): HourRow[] {
  if (!raw || raw.includes("{{")) return [];
  const map: Partial<Record<(typeof DAY_ORDER)[number], HourRow>> = {};
  const entries = raw.split(/,/).map((s) => s.trim()).filter(Boolean);
  for (const entry of entries) {
    const match = entry.match(/^([A-Za-z]+)(?:\s*-\s*([A-Za-z]+))?\s+(.+)$/u);
    if (!match) continue;
    const [, startKey, endKey, timeStr] = match;
    const startCap = startKey.charAt(0).toUpperCase() + startKey.slice(1).toLowerCase();
    const start = SHORT_TO_LONG[startCap as keyof typeof SHORT_TO_LONG];
    const end = endKey
      ? SHORT_TO_LONG[(endKey.charAt(0).toUpperCase() + endKey.slice(1).toLowerCase()) as keyof typeof SHORT_TO_LONG]
      : start;
    if (!start || !end) continue;
    const startIdx = DAY_ORDER.indexOf(start);
    const endIdx = DAY_ORDER.indexOf(end);
    if (startIdx < 0 || endIdx < 0) continue;
    const isClosed = /^closed$/i.test(timeStr.trim());
    const [morning, afternoon] = isClosed ? ["", ""] : splitTwoRanges(timeStr);
    for (let i = startIdx; i <= endIdx; i++) {
      const day = DAY_ORDER[i];
      map[day] = { day, morning, afternoon, closed: isClosed };
    }
  }
  return DAY_ORDER.map((d) => map[d]).filter(Boolean) as HourRow[];
}
const HOURS_ROWS = parseHours("{{HOURS}}");

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-black pt-12 sm:pt-14 lg:pt-20">
      {/* Top amber glow rule */}
      <HaloRule className="absolute inset-x-0 top-0" align="center" />

      {/* Atmospheric sodium halation in the bottom-left corner */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-20 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 18%, transparent) 0%, transparent 65%)" }}
      />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={VP_ONCE}
        variants={staggerContainer(0.1, 0.05)}
        className="container-tight relative"
      >
        {/* MANIFESTO ROW */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16"
        >
          <div className="lg:max-w-2xl">
            <Logo variant="light" className="h-12 w-auto lg:h-14" />
            <p className="mt-6 font-display text-3xl font-bold leading-[1.05] text-white/90 sm:text-4xl lg:text-5xl">
              Lights on. Bay open.<br />
              <span className="text-primary">We&rsquo;re still working.</span>
            </p>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/60">
              Honest auto repair in {"{{CITY}}"}. ASE-certified, fairly priced,
              warrantied for 12 months on parts and labor.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <span className="small-caps text-[11px] text-secondary">Follow the shop</span>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ url, Icon, label }) => (
                <SocialLink key={label} href={url} label={label}>
                  <Icon size={16} strokeWidth={1.75} />
                </SocialLink>
              ))}
            </div>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <HaloRule className="my-10 lg:my-14" align="left" />

        {/* 4-COL INFO GRID */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <motion.div variants={fadeUp}>
            <ColumnHeader icon={MapPin}>Where we are</ColumnHeader>
            <a
              href="{{GOOGLE_MAPS_URL}}"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm leading-relaxed text-white/60 transition-colors hover:text-primary"
            >
              {"{{FULL_ADDRESS}}"}
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Phone} tone="secondary">Reach the bay</ColumnHeader>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="block font-display text-lg text-white/90 transition-colors hover:text-secondary"
            >
              {"{{PHONE}}"}
            </a>
            <a
              href="mailto:{{EMAIL}}"
              className="mt-2 inline-flex items-center gap-1.5 font-sans text-sm text-white/60 transition-colors hover:text-secondary"
            >
              <Mail size={12} strokeWidth={1.75} aria-hidden />
              <span className="break-all">{"{{EMAIL}}"}</span>
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Clock} tone="secondary">Hours</ColumnHeader>
            {HOURS_ROWS.length > 0 ? (() => {
              const hasAfternoon = HOURS_ROWS.some((r) => r.afternoon);
              if (!hasAfternoon) {
                return (
                  <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 font-mono text-[12px]">
                    {HOURS_ROWS.map((row) => (
                      <Fragment key={row.day}>
                        <span className="text-primary">{row.day}</span>
                        <span className={row.closed ? "text-white/50" : "text-white/90 whitespace-nowrap"}>
                          {row.closed ? "Closed" : row.morning}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                );
              }
              return (
                <div className="grid grid-cols-[auto_1fr_1fr] gap-x-3 gap-y-1.5 font-mono text-[11px]">
                  {HOURS_ROWS.map((row) => (
                    <Fragment key={row.day}>
                      <span className="text-primary">{row.day}</span>
                      {row.closed ? (
                        <span className="col-span-2 text-white/50">Closed</span>
                      ) : (
                        <>
                          <span className="text-white/90 whitespace-nowrap">{row.morning || "—"}</span>
                          <span className="text-white/90 whitespace-nowrap">{row.afternoon || "—"}</span>
                        </>
                      )}
                    </Fragment>
                  ))}
                </div>
              );
            })() : (
              <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-white/60">
                {"{{HOURS}}"}
              </p>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <ColumnHeader icon={Compass}>Explore</ColumnHeader>
            <ul className="flex flex-col gap-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-sans text-sm text-white/60 transition-colors hover:text-primary"
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
          className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-6 lg:mt-14 lg:flex-row lg:items-center lg:justify-between lg:pt-7"
        >
          <p className="font-mono text-[11px] uppercase tracking-wider text-white/50">
            © {year ?? ""} {"{{BUSINESS_NAME}}"} · {"{{CITY}}"}, {"{{STATE}}"}
          </p>
          <ul className="flex flex-wrap items-center gap-6">
            {LEGAL.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`font-mono text-[11px] uppercase tracking-wider text-white/50 transition-colors ${
                    i % 2 === 0 ? "hover:text-primary" : "hover:text-secondary"
                  }`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bottom spacer */}
        <div className="h-8 sm:h-10" aria-hidden />
      </motion.div>
    </footer>
  );
}

function ColumnHeader({
  icon: Icon,
  children,
  tone = "amber",
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
  tone?: "amber" | "secondary";
}) {
  const colorClass = tone === "secondary" ? "text-secondary" : "text-primary";
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon size={13} strokeWidth={1.75} className={colorClass} aria-hidden />
      <h3 className={`small-caps text-[11px] ${colorClass}`}>{children}</h3>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      {...hoverLift}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/60 transition-all hover:border-primary hover:bg-primary/10 hover:text-primary"
    >
      {children}
    </motion.a>
  );
}
