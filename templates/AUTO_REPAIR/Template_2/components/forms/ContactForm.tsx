"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/cn";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(5, "A short note helps us reply faster"),
});

type FormValues = z.infer<typeof schema>;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again in a moment.");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5 sm:gap-4">
      <Field
        label="Your name"
        error={errors.name?.message}
        input={
          <input
            type="text"
            autoComplete="name"
            {...register("name")}
            className={inputCls}
          />
        }
      />
      <div className="grid gap-2.5 sm:gap-4 md:grid-cols-2">
        <Field
          label="Email"
          error={errors.email?.message}
          input={
            <input
              type="email"
              autoComplete="email"
              {...register("email")}
              className={inputCls}
            />
          }
        />
        <Field
          label="Phone (optional)"
          input={
            <input
              type="tel"
              autoComplete="tel"
              {...register("phone")}
              className={inputCls}
            />
          }
        />
      </div>
      <Field
        label="How can we help?"
        error={errors.message?.message}
        input={
          <textarea rows={3} {...register("message")} className={cn(inputCls, "min-h-[72px] sm:min-h-[96px] sm:rows-4")} />
        }
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "mt-1.5 sm:mt-2 inline-flex items-center justify-center bg-secondary px-6 py-2.5 sm:py-3",
          "font-display text-sm font-semibold uppercase tracking-wider text-secondary-text",
          "transition-colors hover:bg-secondary/80",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>

      {status === "ok" && (
        <p className="text-sm text-secondary">Thanks. We will be in touch soon.</p>
      )}
      {status === "error" && errorMsg && (
        <p className="text-sm text-primary/80">{errorMsg}</p>
      )}
    </form>
  );
}

const inputCls =
  "w-full border border-black/15 bg-white px-3 py-2.5 font-sans text-sm text-black outline-none transition-colors placeholder:text-black/50 focus:border-secondary";

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="flex flex-col gap-1 sm:gap-1.5">
      <span className="small-caps text-[11px] text-black/60">{label}</span>
      {input}
      {error && <span className="text-xs text-primary/80">{error}</span>}
    </label>
  );
}
