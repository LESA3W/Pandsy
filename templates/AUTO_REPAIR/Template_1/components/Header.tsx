"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/animations";

const NAV_ITEMS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        // Blurred header in the SAME tone as the trust banner below it,
        // so nav + banner read as one bar.
        "fixed inset-x-0 top-0 z-50 transition-shadow duration-300 bg-black/55 backdrop-blur-md",
        scrolled || menuOpen ? "shadow-lg shadow-black/30" : "",
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link href="/" className="flex shrink-0 items-center max-w-[190px] sm:max-w-[225px] md:max-w-[260px]" aria-label="Home">
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden md:h-12">
            <Logo variant="light" priority width={140} height={48} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 font-mono text-xs uppercase tracking-widest text-white/70 md:flex">
          {NAV_ITEMS.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="transition-colors hover:text-primary"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black/40 text-white/80 transition-colors hover:text-primary md:hidden"
            aria-label="Call {{PHONE}}"
          >
            <Phone size={16} aria-hidden="true" />
          </a>
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="hidden items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:text-primary md:inline-flex"
            aria-label="Call {{PHONE}}"
          >
            <Phone size={14} aria-hidden="true" />
            {"{{PHONE}}"}
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            aria-label="Request a free quote"
            className="inline-flex min-h-[44px] items-center border border-primary bg-primary px-4 py-3 font-display text-sm uppercase tracking-wider text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary md:min-h-0 md:px-6 md:py-2.5 md:text-base"
          >
            Get Quote
          </motion.a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/15 bg-black/40 text-white transition-colors hover:border-primary hover:text-primary md:hidden"
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Full-width Google trust banner, glued under the nav (sticky with header) */}
      <TrustBanner />

      {menuOpen && (
        <motion.div
          id="mobile-nav"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/15 bg-black md:hidden"
        >
          <nav className="mx-auto flex max-w-[1400px] flex-col px-4 py-2 sm:px-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-[48px] items-center border-b border-white/10 font-display text-lg uppercase tracking-wider text-white transition-colors last:border-b-0 hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <a
              href="tel:{{PHONE_DIGITS}}"
              onClick={() => setMenuOpen(false)}
              aria-label="Call {{PHONE}}"
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 border border-secondary/70 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary"
            >
              <Phone size={14} aria-hidden="true" />
              {"{{PHONE}}"}
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
