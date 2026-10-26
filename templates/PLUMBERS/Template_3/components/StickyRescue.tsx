"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { cn } from "@/lib/cn";

// StickyRescue — sticky bottom-CENTER slim accent pill that fades in past
// ~50% scroll. CLAUDE.md rule #5b: emergency phone always reachable.
//
// CLEARLINE owns this lane: T1 = bottom-RIGHT button. T2 = always-visible top
// strip. T3 = bottom-CENTER slim pill that activates on scroll. Hero-row
// emergency pill covers the above-the-fold requirement.

export default function StickyRescue() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      const ratio = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      setVisible(ratio > 0.18);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <a
      href="tel:{{PHONE_DIGITS}}"
      className={cn(
        "fixed bottom-5 left-1/2 z-40 hidden animate-rescue-slide-up items-center gap-3 rounded-full bg-rescue-pill px-5 py-3.5 font-mono text-xs uppercase tracking-widest text-white shadow-rescue print:hidden sm:inline-flex",
        "transition-transform duration-150 ease-out hover:-translate-y-0.5",
      )}
      style={{ transform: "translateX(-50%)" }}
      aria-label="Call the 24/7 emergency line"
    >
      <span
        aria-hidden
        className="flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-white/15"
      >
        <Phone size={14} strokeWidth={2.4} />
      </span>
      <span className="hidden sm:inline">24/7 emergency</span>
      <span aria-hidden className="hidden h-3 w-px bg-white/40 sm:inline-block" />
      <span>{"{{PHONE}}"}</span>
    </a>
  );
}
