"use client";

/**
 * Header — HOT WIRE / LIVE EDITORIAL
 *
 * Compact slim bar — 48px tall on desktop, 44px on mobile. Cream surface with
 * a transparent-on-hero / solid-on-scroll behavior. A thin crimson hairline
 * sits along the bottom edge as the brand signal.
 *
 * Logo left, inline editorial nav center (desktop), single crimson "Free
 * quote" CTA right + hamburger on mobile. The phone CTA lives in the
 * HotlineRail (bottom-right floating tag) so the header stays minimal.
 */
import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/animations";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Work" },
  { href: "#reviews", label: "Reviews" },
  { href: "#areas", label: "Service Areas" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-30",
        "bg-white/95 backdrop-blur",
      )}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 sm:h-[72px] md:px-10">
        {/* Logo */}
        <Link
          href="/"
          aria-label="{{BUSINESS_NAME}}"
          className="flex shrink-0 items-center max-w-[190px] sm:max-w-[225px] md:max-w-[260px]"
        >
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden sm:h-12">
            <Logo variant="dark" width={156} height={48} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </Link>

        {/* Inline editorial nav — absolutely centered between logo and buttons */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 lg:flex">
          {NAV.map((n, i) => (
            <motion.a
              key={n.href}
              href={n.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[15px] font-medium tracking-tight text-black transition-colors hover:text-primary"
            >
              {n.label}
            </motion.a>
          ))}
        </nav>

        {/* Right cluster — phone tag + Free quote CTA */}
        <div className="ml-auto hidden items-center gap-2.5 md:flex">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="inline-flex items-center gap-2 border border-secondary/70 bg-white/0 px-3 py-2 sm:px-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-colors hover:bg-secondary hover:border-secondary hover:text-secondary-text"
          >
            <Phone size={13} strokeWidth={2} /> {"{{PHONE}}"}
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            className="inline-flex items-center border border-primary bg-primary px-3 py-2 sm:px-4 font-mono text-[11px] uppercase tracking-[0.22em] text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary"
          >
            Free quote
          </motion.a>
        </div>

        {/* Mobile call button — yellow square + black phone icon (mobile only) */}
        <a
          href="tel:{{PHONE_DIGITS}}"
          aria-label="Call {{PHONE}}"
          className="group ml-auto flex h-10 w-10 items-center justify-center border border-primary bg-primary text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary md:hidden"
        >
          <Phone size={18} strokeWidth={2} className="text-current" />
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="ml-2 text-black lg:hidden md:ml-auto"
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={24} strokeWidth={1.8} />
        </button>
      </div>

      {/* Google social-proof strip — full-width, inside the fixed header */}
      <TrustBanner />

      {/* Crimson hairline — brand signal along the bottom edge */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-primary/60"
      />

      {/* Mobile menu — full-screen crimson overlay. Single solid color layer:
          no backdrop blur, no transparency stack, no drawer offset. Inline
          backgroundColor is the source of truth so it renders even if Tailwind
          JIT misses the class. Closes via X button, ESC key, or any nav click. */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{ backgroundColor: "var(--color-primary)" }}
            className="fixed inset-0 z-50 flex h-screen w-screen flex-col bg-primary lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* Header bar — logo light + close button */}
            <div className="flex h-16 shrink-0 items-center justify-between px-4 sm:h-[72px] sm:px-6">
              <span className="flex h-10 min-w-0 max-w-[240px] items-center overflow-hidden sm:h-12">
                <Logo variant="light" width={156} height={48} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="-mr-2 p-2 text-primary-text transition-opacity hover:opacity-80"
              >
                <X size={26} strokeWidth={1.8} />
              </button>
            </div>

            {/* Hairline divider — semi-transparent so it works on any primary fill */}
            <span
              aria-hidden="true"
              className="block h-px w-full bg-black/20"
            />

            {/* Nav — large editorial Fraunces, stagger-in */}
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6 sm:px-8">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="font-display text-4xl font-medium tracking-tighter text-primary-text transition-opacity hover:opacity-80 sm:text-5xl"
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>

            {/* CTA cluster — phone (outlined cream) + Free quote (filled cream) */}
            <div className="shrink-0 space-y-3 px-6 pb-8 sm:px-8 sm:pb-10">
              <motion.a
                href="tel:{{PHONE_DIGITS}}"
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.15 + NAV.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center gap-2 border border-black/40 px-4 py-3.5 font-mono text-[12px] uppercase tracking-[0.22em] text-primary-text transition-colors hover:bg-white hover:text-primary"
              >
                <Phone size={14} strokeWidth={2} /> {"{{PHONE}}"}
              </motion.a>
              <motion.a
                href="#quote"
                onClick={() => setMobileOpen(false)}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + NAV.length * 0.05, ease: [0.22, 1, 0.36, 1] }}
                style={{ backgroundColor: "var(--color-primary-text)" }}
                className="flex items-center justify-center bg-white px-4 py-3.5 font-mono text-[12px] uppercase tracking-[0.22em] text-primary transition-colors hover:bg-white"
              >
                Free quote
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
