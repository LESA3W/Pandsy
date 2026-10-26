"use client";

/**
 * Header — fixed top bar with permanent dark background.
 * Logo uses LOGO_URL_LIGHT (white) since the background is always dark.
 */
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { hoverLift } from "@/lib/animations";

const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#reviews", label: "Reviews" },
  { href: "#quote", label: "Quote" },
  { href: "#areas", label: "Service Areas" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm"
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          aria-label="{{BUSINESS_NAME}} home"
          className="flex shrink-0 items-center max-w-[200px] sm:max-w-[240px] md:max-w-[280px]"
        >
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden sm:h-14">
            <Logo variant="dark" width={58} height={56} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-9" aria-label="Primary">
          {NAV_LINKS.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[12px] uppercase tracking-widest text-slate-600 hover:text-primary transition-colors"
            >
              {l.label}
            </motion.a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-widest text-slate-600 hover:text-primary transition-colors"
          >
            <Phone size={14} strokeWidth={1.8} />
            <span className="hidden xl:inline">{"{{PHONE}}"}</span>
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            className="border border-primary bg-primary hover:bg-primary-text hover:text-primary text-primary-text px-4 py-2.5 font-mono text-[12px] uppercase tracking-widest transition-colors duration-200"
          >
            Get a quote
          </motion.a>
        </div>

        {/* Mobile/tablet right-side group */}
        <div className="flex lg:hidden items-center gap-1 -mr-2">
          <a
            href="tel:{{PHONE_DIGITS}}"
            aria-label="Call {{PHONE}}"
            className="md:hidden flex items-center justify-center h-11 w-11 text-slate-900 hover:text-primary transition-colors"
          >
            <Phone size={20} strokeWidth={1.8} />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="text-slate-900 h-11 w-11 flex items-center justify-center"
            aria-label="Open navigation"
          >
            <Menu size={24} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* Full-width Google trust banner, glued under the nav (sticky with header) */}
      <TrustBanner />
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="px-4 sm:px-6 md:px-10 py-5 flex items-center justify-between border-b border-slate-200">
            <span className="flex h-10 min-w-0 max-w-[220px] items-center overflow-hidden sm:h-12">
              <Logo variant="dark" width={54} height={48} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-900 p-2 -mr-2"
              aria-label="Close navigation"
            >
              <X size={24} strokeWidth={1.7} />
            </button>
          </div>
          <nav className="px-4 sm:px-6 md:px-10 py-8 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-3xl text-slate-900 hover:text-primary py-2 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-4">
              <a
                href="tel:{{PHONE_DIGITS}}"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-slate-900"
              >
                <Phone size={20} strokeWidth={1.7} className="text-primary" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    Call us
                  </div>
                  <div className="font-display text-xl">{"{{PHONE}}"}</div>
                </div>
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="block w-full border border-primary bg-primary hover:bg-primary-text hover:text-primary text-primary-text text-center py-3.5 font-mono text-[12px] uppercase tracking-widest transition-colors duration-200"
              >
                Get a quote
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
