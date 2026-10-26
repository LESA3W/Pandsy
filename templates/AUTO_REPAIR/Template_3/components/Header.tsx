"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";
import Logo from "@/components/ui/Logo";
import SodiumButton from "@/components/ui/SodiumButton";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

/**
 * Sticky header. Transparent over hero, then darkens to surface-2 on scroll.
 * Logo defaults to the LIGHT (white) variant since T3 is a dark-mode template.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      id="top"
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-30 transition-all duration-300 bg-black/80 backdrop-blur-md",
        scrolled ? "shadow-lg shadow-black/30" : "",
      )}
    >
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex shrink-0 items-center gap-3 max-w-[180px] sm:max-w-[210px] md:max-w-[240px]">
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden sm:h-14">
            <Logo variant="light" className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((item, i) => (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.2 + i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-sans text-sm font-medium text-white/60 transition-colors hover:text-primary"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile phone icon-only (<sm) — guarantees 44px touch target */}
          <a
            href="tel:{{PHONE_DIGITS}}"
            aria-label={"Call {{PHONE}}"}
            className="inline-flex w-11 py-3 items-center justify-center rounded-none border border-primary text-white/60 transition-colors hover:bg-primary hover:text-primary-text hover:border-primary sm:hidden"
          >
            <Phone size={16} strokeWidth={2} />
          </a>
          {/* Tablet+ phone with number */}
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="hidden items-center gap-2 font-sans text-sm font-medium text-white/60 transition-colors hover:text-primary sm:inline-flex"
          >
            <Phone size={14} strokeWidth={2} />
            {"{{PHONE}}"}
          </a>
          <SodiumButton href="#quote" size="sm">
            Get a Quote
          </SodiumButton>
        </div>
      </div>

      <TrustBanner />
    </motion.header>
  );
}
