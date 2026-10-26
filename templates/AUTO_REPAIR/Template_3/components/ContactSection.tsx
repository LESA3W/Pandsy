"use client";

import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import NightTag from "@/components/ui/NightTag";
import NightTitle from "@/components/ui/NightTitle";
import AmbientCard from "@/components/ui/AmbientCard";
import ContactForm from "@/components/forms/ContactForm";
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  staggerContainer,
  staggerItem,
  VP_ONCE,
} from "@/lib/animations";

/**
 * Contact section — info column with amber 2px left-bar on each row, plus
 * ContactForm in an AmbientCard on the right.
 */
export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-black/70 py-10 sm:py-14 md:py-20 lg:py-24"
      aria-label="Contact"
    >
      <div className="container-tight">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={VP_ONCE}
          variants={fadeUp}
        >
          <div className="grid gap-6 sm:gap-10 md:gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
            {/* LEFT — contact info */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={fadeLeft}
            >
              <NightTag>Reach the shop</NightTag>
              <NightTitle as="h2" size="lg" className="mt-5 text-balance">
                Drop by, call in, write us.
              </NightTitle>
              <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-white/60 sm:mt-6">
                The phone is answered during shop hours. Email gets a reply within
                one business day.
              </p>

              <motion.ul
                initial="hidden"
                whileInView="show"
                viewport={VP_ONCE}
                variants={staggerContainer(0.08, 0.2)}
                className="mt-7 flex flex-col gap-3 sm:mt-10 sm:gap-5"
              >
                <InfoRow
                  icon={MapPin}
                  label="Location"
                  href="{{GOOGLE_MAPS_URL}}"
                  external
                >
                  {"{{FULL_ADDRESS}}"}
                </InfoRow>
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  href="tel:{{PHONE_DIGITS}}"
                  external
                >
                  {"{{PHONE}}"}
                </InfoRow>
                <InfoRow
                  icon={Mail}
                  label="Email"
                  href="mailto:{{EMAIL}}"
                  external
                >
                  {"{{EMAIL}}"}
                </InfoRow>
                <div className="hidden md:contents">
                  <InfoRow icon={Clock} label="Hours">
                    {"{{HOURS}}"}
                  </InfoRow>
                </div>
              </motion.ul>
            </motion.div>

            {/* RIGHT — the form */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={VP_ONCE}
              variants={fadeRight}
            >
              <AmbientCard elevated className="p-4 sm:p-6 md:p-8">
                <ContactForm />
              </AmbientCard>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InfoRow({
  icon: Icon,
  label,
  href,
  external,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  href?: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const inner = (
    <div className="flex flex-1 items-start gap-4 border-l-2 border-primary pl-4">
      <Icon
        size={18}
        strokeWidth={1.75}
        className="mt-1 shrink-0 text-primary"
        aria-hidden
      />
      <div className="flex flex-col">
        <span className="small-caps text-[10px] text-white/60 md:text-[11px]">
          {label}
        </span>
        <span className="mt-1 font-sans text-base text-white/90">{children}</span>
      </div>
    </div>
  );

  if (href) {
    return (
      <motion.li variants={staggerItem}>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex py-2 transition-opacity hover:opacity-80"
        >
          {inner}
        </a>
      </motion.li>
    );
  }
  return (
    <motion.li variants={staggerItem} className="flex">
      {inner}
    </motion.li>
  );
}
