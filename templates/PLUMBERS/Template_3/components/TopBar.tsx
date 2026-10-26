"use client";

import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/animations";
import { TrustBanner } from "./TrustBanner";

// TopBar (Header) — sticky transparent -> white-solid with backdrop-blur on scroll.
// Dark logo on white surface. Mobile drawer.

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Quote", href: "#quote" },
  { label: "Service Areas", href: "#areas" },
  { label: "Contact", href: "#contact" },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "sticky top-0 z-30 transition-all duration-300 ease-out",
        scrolled
          ? "bg-white/85 shadow-lift-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:gap-6 sm:px-6 sm:py-4 md:px-10 lg:px-8">
        <a href="#top" className="inline-flex shrink-0 items-center max-w-[180px] sm:max-w-[210px] md:max-w-[240px]" aria-label="{{BUSINESS_NAME}} home">
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden sm:h-12">
            <Logo variant="dark" className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[11px] uppercase tracking-widest text-black/60 transition-colors hover:text-primary"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary transition-colors hover:opacity-70"
          >
            <Phone size={14} strokeWidth={2} />
            {"{{PHONE}}"}
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            className="inline-flex items-center gap-2 rounded-full border border-primary bg-primary px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-colors duration-200 hover:bg-primary-text hover:text-primary hover:shadow-lift"
          >
            Get a quote
          </motion.a>
        </div>
        <div className="flex items-center gap-1 lg:hidden">
          <a
            href="tel:{{PHONE_DIGITS}}"
            aria-label="Call {{PHONE}}"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors hover:opacity-70 sm:h-11 sm:w-11"
          >
            <Phone size={20} strokeWidth={2} />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black sm:h-11 sm:w-11"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      <TrustBanner />

      {open && (
        <div
          className="fixed inset-0 z-50 bg-white px-4 py-6 sm:px-6 md:px-10 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-10 min-w-0 max-w-[220px] items-center overflow-hidden sm:h-12">
              <Logo variant="dark" className="h-full w-auto max-h-full max-w-full object-contain object-left" />
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center text-black"
            >
              <X size={22} />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-5 sm:mt-12 sm:gap-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-black tracking-tight-display text-black sm:text-4xl"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-10 flex flex-col gap-2.5 sm:mt-12 sm:gap-3">
            <a
              href="tel:{{PHONE_DIGITS}}"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-secondary/70 px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-secondary transition-colors duration-150 hover:bg-secondary hover:text-secondary-text hover:border-secondary sm:text-xs"
            >
              <Phone size={14} strokeWidth={2} />
              Call {"{{PHONE}}"}
            </a>
            <a
              href="#quote"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary bg-primary px-5 py-3 font-mono text-[13px] uppercase tracking-widest text-primary-text shadow-lift-soft transition-colors duration-200 hover:bg-primary-text hover:text-primary sm:text-xs"
            >
              Get a quote
            </a>
          </div>
        </div>
      )}
    </motion.header>
  );
}
