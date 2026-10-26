"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/animations";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Standards", href: "#standards" },
  { label: "Reviews", href: "#reviews" },
  { label: "Service Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

// MastHeader — sticky transparent -> white solid on scroll. Mobile drawer.
// Dark logo (LOGO_URL_DARK) on light surface throughout.
export function MastHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-40 transition-colors duration-300",
        scrolled || open
          ? "bg-white backdrop-blur"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="flex shrink-0 items-center max-w-[180px] sm:max-w-[210px] md:max-w-[240px]" aria-label="{{BUSINESS_NAME}} home">
            <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden">
              <Logo variant="dark" className="h-full w-auto max-h-full max-w-full object-contain object-left" />
            </span>
          </a>

          {/* Menu links centered with equal spacing between the logo (left)
              and the Get-a-quote button (right). */}
          <nav className="hidden lg:flex flex-1 items-center justify-center gap-7">
            {NAV.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-mono text-[11px] uppercase tracking-widest text-black hover:text-primary transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
          </nav>

          <div className="hidden lg:flex shrink-0 items-center gap-5">
            <motion.a
              href="#quote"
              {...hoverLift}
              className="inline-flex items-center border border-primary bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary"
            >
              Get a quote
            </motion.a>
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-secondary hover:opacity-70 transition-opacity"
            >
              <Phone size={14} strokeWidth={2.25} />
              {"{{PHONE}}"}
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <a
              href="tel:{{PHONE_DIGITS}}"
              aria-label="Call {{PHONE}}"
              className="inline-flex items-center justify-center w-11 h-11 text-secondary hover:opacity-70 transition-opacity"
            >
              <Phone size={20} strokeWidth={2.25} />
            </a>
            <button
              type="button"
              className="inline-flex items-center justify-center w-11 h-11 text-black"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <TrustBanner />

      {open && (
        <div className="lg:hidden border-t border-black/10 bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-5 space-y-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block font-mono text-xs uppercase tracking-widest text-black hover:text-primary"
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-black/10">
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="block border border-primary bg-primary px-4 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-primary-text transition-colors duration-200 hover:bg-primary-text hover:text-primary"
              >
                Get a quote
              </a>
              <a
                href="tel:{{PHONE_DIGITS}}"
                onClick={() => setOpen(false)}
                className="block border border-secondary/70 px-4 py-2.5 text-center font-mono text-xs uppercase tracking-widest text-secondary hover:bg-secondary hover:text-secondary-text hover:border-secondary transition-colors"
              >
                Call {"{{PHONE}}"}
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.header>
  );
}
