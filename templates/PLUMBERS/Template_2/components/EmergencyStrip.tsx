"use client";

import { Phone } from "lucide-react";

// EmergencyStrip — always-visible top strip per plan.
// Light surface (NOT crimson surface — softer than T1's hazard-tape feel).
// Crimson ring on the LEFT with phone glyph + Space Mono "24/7 EMERGENCY · {{PHONE}}".
// Hidden on print.
export function EmergencyStrip() {
  return (
    <div className="w-full bg-white border-b border-black/10 print:hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <a
          href="tel:{{PHONE_DIGITS}}"
          className="flex items-center gap-3 py-2 group"
          aria-label="Call our 24/7 emergency line at {{PHONE}}"
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-secondary/15 ring-1 ring-secondary/40 text-secondary shrink-0">
            <Phone size={12} strokeWidth={2.25} />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-widest text-secondary group-hover:opacity-70 transition-opacity">
            24/7 Emergency line
          </span>
          <span className="hidden sm:inline-block w-px h-3 bg-black/10" aria-hidden="true" />
          <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-wider text-black group-hover:text-primary transition-colors">
            {"{{PHONE}}"}
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-widest text-black/40 hidden md:inline">
            Tap to call
          </span>
        </a>
      </div>
    </div>
  );
}
