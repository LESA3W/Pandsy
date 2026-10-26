"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send } from "lucide-react";
import { cn } from "@/lib/cn";
import PipeTick from "@/components/ui/PipeTick";

// CLAUDE.md hard rule #4.2 — Contact form is the simpler engine.
// Name + Email + Phone (optional) + Message. JSON only, no photo upload.

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+()0-9 -]{7,}$/u.test(v),
      "Use digits, spaces, and ( ) - + only",
    ),
  message: z.string().min(10, "Tell us a bit more (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Send failed");
      }
      setStatus("ok");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="px-4 py-10 text-center">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
          <PipeTick /> Message received
        </p>
        <p className="mt-3 font-display text-2xl font-black tracking-tight-display text-black">
          Thanks. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4" noValidate>
      <Field label="Your name" error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          placeholder="Jane Doe"
          className={inputCls}
          autoComplete="name"
        />
      </Field>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={inputCls}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone (optional)" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(503) 555-0184"
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="Drop us a line and we'll respond on the next business day."
          className={cn(inputCls, "min-h-[88px] resize-y sm:min-h-[120px]")}
        />
      </Field>

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-black/60">For real emergencies, call directly.</p>
        <button
          type="submit"
          disabled={isSubmitting || status === "sending"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 sm:py-3"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <Send size={14} strokeWidth={2.4} />
        </button>
      </div>

      {status === "error" && (
        <p className="rounded-lg border-l-4 border-accent bg-accent/5 px-3 py-2 text-sm text-accent">
          Couldn&apos;t send: {errorMsg}. Try again or call us at{" "}
          <a href="tel:{{PHONE_DIGITS}}" className="underline">
            {"{{PHONE}}"}
          </a>
          .
        </p>
      )}
    </form>
  );
}

const inputCls =
  "w-full rounded-xl bg-white border border-black/10 px-3 py-2 text-black placeholder:text-black/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors sm:px-3.5 sm:py-2.5";

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
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-primary sm:mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent">{error}</span>}
    </label>
  );
}
