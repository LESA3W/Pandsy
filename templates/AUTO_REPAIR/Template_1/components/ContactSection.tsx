"use client";

import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { BayLabel } from "@/components/ui/BayLabel";
import { ContactForm } from "@/components/forms/ContactForm";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-black/90 py-7 sm:py-12 md:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <BayLabel n="11" title="CONTACT" meta="FRONT DESK · STAFFED" hideOnMobile />
        </motion.div>
        <div className="mt-5 grid gap-8 sm:mt-6 sm:gap-10 md:gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Left — info block */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeLeft}
          >
            <h2 className="font-display text-3xl uppercase leading-none tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Drop by. Call. Or write.
            </h2>
            <p className="mt-5 max-w-md font-sans text-sm leading-relaxed text-white/70 sm:mt-7 sm:text-base">
              We&rsquo;re open six days a week. Walk-ins welcome, though a
              quick call ahead means we can have a bay ready when you arrive.
            </p>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={staggerContainer(0.08, 0.2)}
              className="mt-8 space-y-3 sm:mt-10 sm:space-y-4 md:mt-12 md:space-y-6"
            >
              <ContactRow
                Icon={MapPin}
                label="Address"
                value={"{{FULL_ADDRESS}}"}
                href={"{{GOOGLE_MAPS_URL}}"}
              />
              <ContactRow
                Icon={Phone}
                label="Phone"
                value={"{{PHONE}}"}
                href="tel:{{PHONE_DIGITS}}"
              />
              <ContactRow
                Icon={Mail}
                label="Email"
                value={"{{EMAIL}}"}
                href="mailto:{{EMAIL}}"
              />
              <ContactRow
                Icon={Clock}
                label="Hours"
                value={"{{HOURS}}"}
                hideOnMobile
              />
            </motion.ul>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={VP_ONCE}
            variants={fadeRight}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  Icon,
  label,
  value,
  href,
  hideOnMobile = false,
}: {
  Icon: React.ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
  /** Hide the row on mobile, show from md: breakpoint up. Used for the
      Hours row — hours render canonically in the Footer table on mobile. */
  hideOnMobile?: boolean;
}) {
  const content = (
    <div className="flex items-start gap-4 border-l-2 border-primary bg-black/40 px-5 py-4 transition-colors hover:border-white">
      <Icon size={20} strokeWidth={1.5} className="mt-1 shrink-0 text-primary" />
      <div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/70">
          {label}
        </div>
        <div className="mt-1 font-mono text-sm text-white">{value}</div>
      </div>
    </div>
  );
  return (
    <motion.li variants={staggerItem} className={hideOnMobile ? "hidden md:block" : undefined}>
      {href ? (
        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </motion.li>
  );
}
