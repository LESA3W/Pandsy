"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Loader2, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { parseServices } from "@/lib/parseServices";
import {
  compressImage,
  formatBytes,
  MAX_PHOTOS,
  MAX_BYTES_TOTAL,
} from "@/lib/imageCompress";

const currentYear = new Date().getFullYear();

const schema = z.object({
  name: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Required"),
  service: z.string().min(1, "Pick a service"),
  vehicleMake: z.string().min(1, "Required"),
  vehicleModel: z.string().min(1, "Required"),
  vehicleYear: z.coerce
    .number()
    .int()
    .min(1950, "Min 1950")
    .max(currentYear + 1, `Max ${currentYear + 1}`),
  description: z.string().min(10, "At least 10 characters"),
});

type FormData = z.infer<typeof schema>;

type Photo = {
  id: string;
  file: File;
  previewUrl: string;
};

const fieldClass =
  "w-full bg-black/90 border border-white/15 px-4 py-3 font-mono text-sm text-white placeholder:text-white/55 focus:border-primary focus:outline-none";

const labelClass =
  "block font-mono text-[10px] uppercase tracking-widest text-white/75 mb-2";

export function QuoteForm() {
  const services = parseServices("{{SERVICES}}");
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string>("");
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const totalBytes = photos.reduce((sum, p) => sum + p.file.size, 0);
  const photoCount = photos.length;
  const remaining = MAX_PHOTOS - photoCount;

  async function onPhotosPicked(files: FileList | null) {
    setPhotoError("");
    if (!files || files.length === 0) return;
    if (photoCount + files.length > MAX_PHOTOS) {
      setPhotoError(`Max ${MAX_PHOTOS} photos. ${remaining} slot(s) left.`);
      return;
    }
    setCompressing(true);
    const next: Photo[] = [];
    let runningTotal = totalBytes;
    for (const file of Array.from(files)) {
      const result = await compressImage(file);
      if (!result.ok) {
        setPhotoError(`${file.name}: ${result.reason}`);
        continue;
      }
      if (runningTotal + result.file.size > MAX_BYTES_TOTAL) {
        setPhotoError(
          `Total photo size would exceed ${formatBytes(MAX_BYTES_TOTAL)}. Stopped at ${next.length} new photo(s).`,
        );
        break;
      }
      runningTotal += result.file.size;
      next.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file: result.file,
        previewUrl: URL.createObjectURL(result.file),
      });
    }
    setPhotos((prev) => [...prev, ...next]);
    setCompressing(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
    setPhotoError("");
  }

  async function onSubmit(values: FormData) {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(values));
      for (const p of photos) {
        formData.append("photos", p.file, p.file.name);
      }
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Try again.");
        return;
      }
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPhotos([]);
      setSubmitted(true);
    } catch {
      setServerError("Network error. Try again.");
    }
  }

  if (submitted) {
    return (
      <div className="border border-primary bg-black/90 p-5 sm:p-6 md:p-8 lg:p-10 text-center">
        <div className="font-mono text-[10px] uppercase tracking-widest text-primary mb-3 sm:mb-4">
          STATUS: QUOTE-001 · RECEIVED
        </div>
        <CheckCircle2 className="mx-auto mb-4 text-primary sm:mb-5 sm:[&]:size-14" size={44} strokeWidth={1.5} />
        <p className="font-display text-2xl uppercase text-white tracking-wide sm:text-3xl md:text-4xl">
          Quote received
        </p>
        <p className="mt-3 font-sans text-sm text-white/85 leading-relaxed max-w-sm mx-auto sm:mt-4 sm:text-[15px]">
          A technician will review your request and reach out within one
          business day with a quote. For urgent issues, call us directly.
        </p>

        <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <a
            href="tel:{{PHONE_DIGITS}}"
            className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3 font-display text-sm uppercase tracking-wider text-primary-text hover:bg-primary/90 transition-colors"
          >
            CALL {"{{PHONE}}"}
          </a>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="inline-flex items-center justify-center border border-white/30 px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/80 hover:border-primary hover:text-primary transition-colors"
          >
            Submit another quote
          </button>
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-white/50">
          Confirmation sent to your email · check spam if missing
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 border border-white/15 bg-black/60 p-5 backdrop-blur-sm sm:gap-5 sm:p-6 md:p-7"
      noValidate
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-white/50">
        FORM ID: QUOTE-001 · ALL FIELDS REQUIRED
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input
            className={fieldClass}
            placeholder="Jane Doe"
            {...register("name")}
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            className={fieldClass}
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input
            className={fieldClass}
            type="tel"
            placeholder="(555) 555-0100"
            {...register("phone")}
          />
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select
            className={cn(fieldClass, "appearance-none")}
            defaultValue=""
            {...register("service")}
          >
            <option value="" disabled>
              Select service…
            </option>
            {services.map((s) => (
              <option key={s.name} value={s.name} className="bg-black">
                {s.name}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid gap-3 sm:gap-4 md:grid-cols-3">
        <Field label="Vehicle Make" error={errors.vehicleMake?.message}>
          <input
            className={fieldClass}
            placeholder="Honda"
            {...register("vehicleMake")}
          />
        </Field>
        <Field label="Model" error={errors.vehicleModel?.message}>
          <input
            className={fieldClass}
            placeholder="Civic"
            {...register("vehicleModel")}
          />
        </Field>
        <Field label="Year" error={errors.vehicleYear?.message}>
          <input
            className={fieldClass}
            type="number"
            placeholder={String(currentYear - 5)}
            {...register("vehicleYear")}
          />
        </Field>
      </div>

      <Field label="Describe the issue" error={errors.description?.message}>
        <textarea
          className={cn(fieldClass, "min-h-[96px] resize-y sm:min-h-[120px]")}
          placeholder="Symptoms, noises, when it started…"
          {...register("description")}
        />
      </Field>

      {/* Photos drop-zone — BAY 04 / hazard-yellow on ink-panel */}
      <div className="border border-white/15 bg-black/60">
        <div className="flex items-center justify-between gap-2 px-4 py-2 border-b border-white/15 bg-black/90">
          <div className="flex items-center gap-2">
            <ImagePlus size={13} strokeWidth={2} className="text-primary" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
              ATTACH-01 · PHOTOS · OPTIONAL
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50">
            {photoCount}/{MAX_PHOTOS} · {formatBytes(totalBytes)}/{formatBytes(MAX_BYTES_TOTAL)}
          </span>
        </div>
        <div className="px-4 py-4">
          <p className="text-xs text-white/70 leading-relaxed font-sans">
            Pictures of the issue speed up diagnosis. Up to {MAX_PHOTOS} photos,
            {" "}{formatBytes(MAX_BYTES_TOTAL)} total — compressed in your browser before upload.
          </p>

          {photos.length > 0 && (
            <ul className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
              {photos.map((p) => (
                <li key={p.id} className="relative group border border-white/15 bg-black overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.previewUrl} alt="" className="w-full h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.id)}
                    aria-label={`Remove ${p.file.name}`}
                    className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 bg-black/85 text-white hover:bg-primary hover:text-primary-text transition-colors"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  <div className="px-1.5 py-0.5 bg-black/90 border-t border-white/15 font-mono text-[9px] uppercase tracking-wider text-primary text-center">
                    {formatBytes(p.file.size)}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <label
            className={cn(
              "mt-3 inline-flex items-center justify-center gap-2 cursor-pointer border border-primary bg-transparent px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors",
              (compressing || remaining === 0) && "opacity-50 cursor-not-allowed pointer-events-none",
            )}
          >
            {compressing ? (
              <>
                <Loader2 size={13} strokeWidth={2} className="animate-spin" />
                COMPRESSING…
              </>
            ) : (
              <>
                <ImagePlus size={13} strokeWidth={2} />
                {photos.length === 0 ? "ADD PHOTOS" : `ADD MORE (${remaining} LEFT)`}
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => onPhotosPicked(e.target.files)}
              disabled={compressing || remaining === 0}
            />
          </label>

          {photoError && (
            <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-red-400 border-l-2 border-red-400 pl-3">
              {photoError}
            </p>
          )}
        </div>
      </div>

      {serverError ? (
        <p
          role="alert"
          className="font-mono text-xs uppercase tracking-widest text-red-400"
        >
          {serverError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting || compressing}
        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-primary px-6 py-4 font-display text-lg uppercase tracking-wider text-primary-text transition disabled:opacity-60 sm:px-8 sm:text-xl"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin" size={18} />
            Submitting…
          </>
        ) : (
          <>SUBMIT QUOTE</>
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
