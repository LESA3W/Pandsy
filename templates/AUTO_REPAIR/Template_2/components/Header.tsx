"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";
import { hoverLift } from "@/lib/animations";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

/**
 * Sticky header. Cream surface (light mode!).
 * Default logo: LOGO_URL_DARK (black logo on light).
 * On scroll: gains a stone bottom-rule + slightly more opaque cream.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
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
        // Constant frosted white matching the trust banner below (no
        // transparent-top), so nav + banner read as one bar.
        "fixed inset-x-0 top-0 z-30 transition-shadow duration-300 bg-white/95 backdrop-blur-sm",
        scrolled ? "shadow-sm" : "",
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="inline-flex items-center" aria-label="{{BUSINESS_NAME}} home">
          {/* Sign panel. The logo lives inside a defined field with object-contain
              so any client logo (wide wordmark, square mark, tall stack) holds its
              shape inside the same shop-sign proportions. Reuses the Heritage
              "enamel placard" atom seen in Hero.tsx. */}
          <span className="inline-flex h-10 w-[175px] max-w-full shrink-0 items-center overflow-hidden md:h-14 md:w-[230px]">
            <Logo variant="dark" className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-sans text-sm font-medium text-black/60 transition-colors hover:text-secondary"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 md:gap-4">
          <a
            href="tel:{{PHONE_DIGITS}}"
            aria-label="Call {{PHONE}}"
            className="inline-flex h-10 w-10 items-center justify-center text-black/60 transition-colors hover:text-secondary sm:hidden"
          >
            <Phone size={18} strokeWidth={2} />
          </a>
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="hidden items-center gap-2 font-sans text-sm font-medium text-black/60 transition-colors hover:text-secondary sm:inline-flex"
          >
            <Phone size={14} strokeWidth={2} />
            {"{{PHONE}}"}
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            className={cn(
              "group relative inline-flex min-h-[40px] items-center border border-secondary bg-secondary px-4 py-2 sm:min-h-0 sm:px-5 sm:py-2.5",
              "font-display text-[12px] sm:text-sm font-semibold uppercase tracking-[0.08em] text-secondary-text whitespace-nowrap",
              "transition-colors duration-200 hover:bg-secondary-text hover:text-secondary",
            )}
          >
            Get a Quote
            <span
              className="pointer-events-none absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100 sm:inset-x-5 sm:bottom-2"
              aria-hidden
            />
          </motion.a>
        </div>
      </div>

      <TrustBanner />
    </motion.header>
  );
}
