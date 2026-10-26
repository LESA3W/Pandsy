"use client";

/**
 * ContactForm — simpler companion to QuoteForm (HOT WIRE / LIVE EDITORIAL).
 * Per claude.md hard rule #4: Name + Email + Phone (optional) + Message.
 * POSTs to /api/contact. No photo upload.
 */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please share a valid email"),
  phone: z.string().max(20).optional().or(z.literal("")),
  message: z.string().min(10, "A few lines helps us route your message right"),
});

type FormData = z.infer<typeof schema>;

const labelClass =
  "block text-[11px] font-mono uppercase tracking-[0.22em] text-accent mb-1 md:mb-1.5";
const inputClass =
  "w-full bg-white border border-accent focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-black placeholder:text-black/60/70 px-3 py-2 md:px-4 md:py-3 font-sans text-[15px] leading-tight transition-colors";
const errorClass =
  "mt-1 md:mt-1.5 text-[11px] md:text-[12px] text-primary font-sans flex items-center gap-1.5";

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      if (!res.ok) {
        setServerError(body.error ?? "Something went sideways. Try again or call us.");
        return;
      }
      setSuccess(true);
      reset();
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : "Network error. Please try again.",
      );
    }
  };

  if (success) {
    return (
      <div className="bg-white border border-accent p-8 text-center">
        <div className="inline-flex items-center justify-center bg-primary w-12 h-12 mx-auto mb-4">
          <CheckCircle2 size={26} className="text-primary-text" strokeWidth={1.8} />
        </div>
        <h3 className="font-display text-3xl text-black mb-2 font-bold tracking-tighter">
          Message stamped.
        </h3>
        <p className="font-sans text-[15px] text-black/60 leading-relaxed max-w-sm mx-auto">
          We&apos;ll get back to you shortly. For anything urgent, call{" "}
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="text-primary hover:text-primary underline font-medium"
          >
            {"{{PHONE}}"}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 md:space-y-4" noValidate>
      <div>
        <label className={labelClass} htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={cn(inputClass, errors.name && "border-primary")}
          placeholder="Jane Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className={errorClass}><AlertCircle size={12} />{errors.name.message}</p>
        )}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-email">Email</label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={cn(inputClass, errors.email && "border-primary")}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className={errorClass}><AlertCircle size={12} />{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-phone">
          Phone <span className="text-black/60/70 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className={cn(inputClass, errors.phone && "border-primary")}
          placeholder="(555) 555-1234"
          {...register("phone")}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={3}
          className={cn(inputClass, "resize-y min-h-0 md:min-h-[6rem]", errors.message && "border-primary")}
          placeholder="What can we help with?"
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClass}><AlertCircle size={12} />{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <div className="border border-primary/60 bg-primary/10 px-4 py-3 text-[13px] text-primary font-sans flex items-start gap-2">
          <AlertCircle size={16} className="mt-px flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black hover:bg-black disabled:bg-black/40 disabled:cursor-not-allowed text-white font-display text-base md:text-lg font-bold tracking-tight py-2.5 md:py-3.5 px-4 md:px-6 transition-colors"
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
