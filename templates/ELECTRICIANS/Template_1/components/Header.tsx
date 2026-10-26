"use client";

/**
 * Header — sticky transparent → solid on scroll.
 * - Transparent over the hero (dark image): uses LOGO_URL_LIGHT (white logo)
 * - Solid volt-navy background after scroll: keeps LOGO_URL_LIGHT (background stays dark)
 *
 * The site is dark-mode primary, so the logo variant stays "light" throughout.
 */
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";
import { TrustBanner } from "./TrustBanner";
import { cn } from "@/lib/cn";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        // Blurred header in the SAME tone as the trust banner below it
        // (bg-black/55 + backdrop-blur-md) so nav + banner read as one bar.
        "fixed top-0 inset-x-0 z-30 transition-shadow duration-300 bg-black/80 backdrop-blur-md",
        scrolled ? "shadow-lg shadow-black/30" : "",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 sm:h-20 flex items-center justify-between">
        <a
          href="#top"
          aria-label="{{BUSINESS_NAME}} home"
          className="flex shrink-0 items-center max-w-[185px] sm:max-w-[215px] md:max-w-[250px]"
        >
          <span className="inline-flex h-10 w-auto max-w-full shrink-0 items-center overflow-hidden sm:h-14">
            <Logo variant="light" width={90} height={56} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
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
              className="font-mono text-[12px] uppercase tracking-widest text-white/85 hover:text-primary transition-colors"
            >
              {l.label}
            </motion.a>
          ))}
        </nav>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="flex items-center gap-2 border border-secondary/70 px-4 py-2.5 font-mono text-[12px] uppercase tracking-widest text-white/85 transition-colors hover:bg-secondary hover:text-secondary-text hover:border-secondary"
          >
            <Phone size={14} strokeWidth={1.8} />
            <span className="hidden xl:inline">{"{{PHONE}}"}</span>
          </a>
          <motion.a
            href="#quote"
            {...hoverLift}
            className="border border-primary bg-primary text-black px-4 py-2.5 font-mono text-[12px] uppercase tracking-widest transition-colors duration-200 hover:bg-primary-text hover:text-primary"
          >
            Get a quote
          </motion.a>
        </div>

        {/* Mobile right cluster: phone icon (tap-to-call) + burger */}
        <div className="lg:hidden flex items-center gap-1 -mr-2">
          <a
            href="tel:{{PHONE_DIGITS}}"
            aria-label="Call {{PHONE}}"
            className="h-11 w-11 inline-flex items-center justify-center text-white hover:text-primary transition-colors"
          >
            <Phone size={20} strokeWidth={1.7} />
          </a>
          <button
            onClick={() => setOpen(true)}
            className="h-11 w-11 inline-flex items-center justify-center text-white"
            aria-label="Open navigation"
          >
            <Menu size={24} strokeWidth={1.7} />
          </button>
        </div>
      </div>

      {/* Full-width Google trust banner, glued under the nav (sticky with header) */}
      <TrustBanner />
    </motion.header>

      {/* Mobile drawer — rendered as sibling of motion.header so its
          `fixed inset-0` anchors to the viewport, not to the header's
          transformed containing block (CSS: any `transform` value
          re-roots descendant fixed positioning). */}
      {open && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="px-4 sm:px-6 py-5 flex items-center justify-between border-b border-white/20">
            <span className="flex h-10 min-w-0 max-w-[220px] items-center overflow-hidden sm:h-12">
              <Logo variant="light" width={84} height={48} className="h-full w-auto max-h-full max-w-full object-contain object-left" />
            </span>
            <button
              onClick={() => setOpen(false)}
              className="h-11 w-11 inline-flex items-center justify-center text-white -mr-2"
              aria-label="Close navigation"
            >
              <X size={24} strokeWidth={1.7} />
            </button>
          </div>
          <nav className="px-4 sm:px-6 py-8 flex flex-col gap-1" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display text-2xl sm:text-3xl text-white hover:text-primary py-3 transition-colors uppercase tracking-tight"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-8 pt-8 border-t border-white/20 space-y-4">
              <a
                href="tel:{{PHONE_DIGITS}}"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 text-white"
              >
                <Phone size={20} strokeWidth={1.7} className="text-primary" />
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                    Call us
                  </div>
                  <div className="font-display text-xl uppercase tracking-tight">{"{{PHONE}}"}</div>
                </div>
              </a>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="block w-full border border-primary bg-primary text-black text-center py-4 font-mono text-[12px] uppercase tracking-widest transition-colors duration-200 hover:bg-primary-text hover:text-primary"
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
