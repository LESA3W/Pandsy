"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "At least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const fieldClass =
  "w-full bg-black/90 border border-white/15 px-3.5 py-2.5 font-mono text-sm text-white placeholder:text-white/55 focus:border-primary focus:outline-none sm:px-4 sm:py-3";

const labelClass =
  "block font-mono text-[10px] uppercase tracking-widest text-white/75 mb-1.5 sm:mb-2";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setServerError("Network error. Try again.");
    }
  }

  if (submitted) {
    return (
      <div className="border border-primary bg-black/90 p-5 sm:p-6 md:p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 text-primary sm:mb-4 sm:[&]:size-10" size={32} />
        <p className="font-display text-xl uppercase text-white sm:text-2xl">Message received</p>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-white/60 sm:mt-3 sm:text-xs">
          We&rsquo;ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-3 border border-white/15 bg-black/60 p-4 backdrop-blur-sm sm:gap-5 sm:p-6 md:p-7"
      noValidate
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
        FORM ID: CONTACT-001
      </div>

      <Field label="Name" error={errors.name?.message}>
        <input className={fieldClass} placeholder="Jane Doe" {...register("name")} />
      </Field>

      <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input className={fieldClass} type="email" placeholder="jane@example.com" {...register("email")} />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input className={fieldClass} type="tel" placeholder="(555) 555-0100" {...register("phone")} />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea className={cn(fieldClass, "min-h-[72px] resize-y sm:min-h-[120px]")} placeholder="How can we help?" {...register("message")} />
      </Field>

      {serverError ? (
        <p role="alert" className="font-mono text-xs uppercase tracking-widest text-red-400">
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-3.5 font-display text-base uppercase tracking-wider text-primary-text transition hover:bg-white disabled:opacity-60 sm:py-4 sm:px-8 sm:text-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Sending…
          </>
        ) : (
          <>Send message</>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
      {error ? (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-red-400">
          {error}
        </span>
      ) : null}
    </label>
  );
}
