"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";

// ContactForm — simpler than QuoteForm. Used in ContactCard.
// Fields: name, email, phone (optional), message.

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z
    .string()
    .optional()
    .refine(
      (v) => !v || /^[+()0-9 -]+$/u.test(v),
      "Use digits, spaces, and ( ) - + only",
    ),
  message: z.string().min(10, "Add a short message (10+ characters)"),
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
      <div className="px-2 py-8 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          MESSAGE / RECEIVED
        </p>
        <p className="mt-3 font-display text-xl text-black">Got it. We&apos;ll be in touch.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <Field label="Your name" error={errors.name?.message}>
        <input
          {...register("name")}
          type="text"
          placeholder="Jane Doe"
          className={inputCls}
          autoComplete="name"
        />
      </Field>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
          rows={4}
          placeholder="What can we help with?"
          className={cn(inputCls, "resize-y min-h-[110px]")}
        />
      </Field>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-black/60">For service emergencies, call instead.</p>
        <button
          type="submit"
          disabled={isSubmitting || status === "sending"}
          className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-mono text-xs uppercase tracking-widest text-primary-text hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {status === "sending" ? "Sending..." : "Send message"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-secondary border-l-2 border-secondary pl-3">
          Couldn&apos;t send: {errorMsg}. Try again or call{" "}
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
  "w-full bg-white border border-black/10 px-3 py-2.5 text-black placeholder:text-black/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

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
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-primary">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-secondary">{error}</span>}
    </label>
  );
}
