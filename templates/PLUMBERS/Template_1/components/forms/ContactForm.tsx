"use client";

/**
 * ContactForm — simpler companion to QuoteForm.
 * Per claude.md hard rule #4: Name + Email + Phone (optional) + Message.
 * POSTs to /api/contact.
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
  "block text-[11px] font-mono uppercase tracking-widest text-slate-600 mb-1 sm:mb-2";
const inputClass =
  "w-full bg-white border border-slate-200 focus:border-primary focus:outline-none text-slate-900 placeholder:text-slate-400 px-4 py-2 sm:py-3 font-sans text-[15px] leading-tight transition-colors";
const errorClass =
  "mt-1 sm:mt-1.5 text-[12px] text-secondary font-sans flex items-center gap-1.5";

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
      <div className="bg-white border border-primary/40 p-8 text-center">
        <CheckCircle2 size={42} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
        <h3 className="font-display text-2xl text-slate-900 mb-2">Message received.</h3>
        <p className="font-sans text-[15px] text-slate-600 leading-relaxed max-w-sm mx-auto">
          We&apos;ll get back to you shortly. For anything urgent, call{" "}
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="text-primary hover:opacity-70 underline"
          >
            {"{{PHONE}}"}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4" noValidate>
      <div>
        <label className={labelClass} htmlFor="contact-name">Your name</label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={cn(inputClass, errors.name && "border-secondary")}
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
          className={cn(inputClass, errors.email && "border-secondary")}
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className={errorClass}><AlertCircle size={12} />{errors.email.message}</p>
        )}
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-phone">
          Phone <span className="text-slate-500 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          className={cn(inputClass, errors.phone && "border-secondary")}
          placeholder="(555) 555-1234"
          {...register("phone")}
        />
      </div>
      <div>
        <label className={labelClass} htmlFor="contact-message">Message</label>
        <textarea
          id="contact-message"
          rows={4}
          className={cn(inputClass, "resize-y", errors.message && "border-secondary")}
          placeholder="What can we help with?"
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClass}><AlertCircle size={12} />{errors.message.message}</p>
        )}
      </div>

      {serverError && (
        <div className="border border-secondary/60 bg-secondary/5 px-4 py-3 text-[13px] text-secondary font-sans flex items-start gap-2">
          <AlertCircle size={16} className="mt-px flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-text font-display text-lg tracking-wide py-2.5 sm:py-3.5 px-6 transition-opacity"
      >
        {isSubmitting ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
