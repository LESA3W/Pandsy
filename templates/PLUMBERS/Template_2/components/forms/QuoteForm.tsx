"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { parseServices } from "@/lib/parseServices";
import {
  compressImage,
  formatBytes,
  MAX_PHOTOS,
  MAX_BYTES_PER_FILE,
  MAX_BYTES_TOTAL,
} from "@/lib/imageCompress";
import { cn } from "@/lib/cn";

// PLUMBERS QuoteForm per CLAUDE.md rule #14b + photo attachments via Resend.
// Fields: name, email, phone, address, propertyType, urgency, service, message + 0-5 photos.
// Service is a <select> populated from parseServices("{{SERVICES}}") plus an
// "Other (describe below)" entry. service: z.string().min(1) so the empty
// default option fails and forces a pick.
//
// Photos: client-side compression to JPEG @ 1600px max, capped per-file and total.
// Submitted as multipart/form-data so /api/quote can pass them to Resend.attachments.
// No database — files live in memory until the email is sent, then they are gone.

const services = parseServices("{{SERVICES}}").map((s) => s.name);

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("A valid email is required"),
  phone: z
    .string()
    .min(7, "Phone is required")
    .regex(/^[+()0-9 -]+$/u, "Use digits, spaces, and ( ) - + only"),
  address: z.string().min(4, "Service address is required"),
  propertyType: z.string().min(1, "Pick a property type"),
  urgency: z.string().min(1, "Pick an urgency level"),
  service: z.string().min(1, "Please pick a service"),
  message: z.string().min(10, "Tell us a bit about the job (10+ characters)"),
});

type FormValues = z.infer<typeof schema>;

type Photo = {
  id: string;
  file: File;
  previewUrl: string;
  originalSize: number;
};

export function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string>("");
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      urgency: "",
      service: "",
      message: "",
    },
  });

  const totalBytes = photos.reduce((sum, p) => sum + p.file.size, 0);
  const photoCount = photos.length;
  const remainingSlots = MAX_PHOTOS - photoCount;

  async function onPhotosPicked(files: FileList | null) {
    setPhotoError("");
    if (!files || files.length === 0) return;
    if (photoCount + files.length > MAX_PHOTOS) {
      setPhotoError(`Max ${MAX_PHOTOS} photos. You picked ${files.length}, ${remainingSlots} slot(s) left.`);
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
          `Total photo size would exceed ${formatBytes(MAX_BYTES_TOTAL)}. ` +
          `Stopped at ${next.length} new photo(s).`,
        );
        break;
      }
      runningTotal += result.file.size;
      next.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        file: result.file,
        previewUrl: URL.createObjectURL(result.file),
        originalSize: result.originalSize,
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

  async function onSubmit(values: FormValues) {
    setStatus("sending");
    setErrorMsg("");
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
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Send failed");
      }
      // Cleanup blob URLs before resetting
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPhotos([]);
      setStatus("ok");
      reset();
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  if (status === "ok") {
    return (
      <div className="px-2 py-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-primary">
          QUOTE TICKET / FILED
        </p>
        <p className="mt-3 font-display text-2xl text-black">Thanks. We have your job.</p>
        <p className="mt-2 text-black/60">
          A licensed plumber will be in touch shortly with a written quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4" noValidate>
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <Field label="Your name" error={errors.name?.message}>
          <input
            {...register("name")}
            type="text"
            placeholder="Jane Doe"
            className={inputCls}
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            placeholder="you@example.com"
            className={inputCls}
            autoComplete="email"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        <Field label="Phone" error={errors.phone?.message}>
          <input
            {...register("phone")}
            type="tel"
            placeholder="(503) 555-0184"
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
        <Field label="Service address" error={errors.address?.message}>
          <input
            {...register("address")}
            type="text"
            placeholder="2841 SE Division Street"
            className={inputCls}
            autoComplete="street-address"
          />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-3">
        <Field label="Property" error={errors.propertyType?.message}>
          <select {...register("propertyType")} className={selectCls}>
            <option value="">Pick one</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Property management">Property management</option>
          </select>
        </Field>
        <Field label="Urgency" error={errors.urgency?.message}>
          <select {...register("urgency")} className={selectCls}>
            <option value="">Pick one</option>
            <option value="Emergency (now)">Emergency (now)</option>
            <option value="Urgent (today)">Urgent (today)</option>
            <option value="Soon (this week)">Soon (this week)</option>
            <option value="Planned project">Planned project</option>
          </select>
        </Field>
        <Field label="Service" error={errors.service?.message}>
          <select {...register("service")} className={selectCls}>
            <option value="">Pick a service</option>
            {services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
            <option value="Other (describe below)">Other (describe below)</option>
          </select>
        </Field>
      </div>

      <Field label="Tell us what's wrong" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={3}
          placeholder="Slow drain, water heater pilot won't stay lit, leak under the sink..."
          className={cn(inputCls, "resize-y min-h-[70px] sm:min-h-[110px]")}
        />
      </Field>

      {/* Photos drop-zone */}
      <PhotosBlock
        photos={photos}
        photoError={photoError}
        compressing={compressing}
        photoCount={photoCount}
        totalBytes={totalBytes}
        fileInputRef={fileInputRef}
        onPick={onPhotosPicked}
        onRemove={removePhoto}
      />

      <div className="flex flex-col items-stretch gap-2 sm:gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[11px] sm:text-xs text-black/60">
          We respond on business days within a few hours. For real emergencies, call directly.
        </p>
        <button
          type="submit"
          disabled={isSubmitting || status === "sending" || compressing}
          className="inline-flex items-center justify-center gap-2 bg-primary px-5 sm:px-6 py-2.5 sm:py-3 font-mono text-[11px] sm:text-xs uppercase tracking-widest text-primary-text hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
        >
          {status === "sending" ? "Sending..." : "File the quote ticket"}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-secondary border-l-2 border-secondary pl-3">
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

function PhotosBlock({
  photos,
  photoError,
  compressing,
  photoCount,
  totalBytes,
  fileInputRef,
  onPick,
  onRemove,
}: {
  photos: Photo[];
  photoError: string;
  compressing: boolean;
  photoCount: number;
  totalBytes: number;
  fileInputRef: React.MutableRefObject<HTMLInputElement | null>;
  onPick: (files: FileList | null) => void;
  onRemove: (id: string) => void;
}) {
  const remaining = MAX_PHOTOS - photoCount;
  const totalCap = formatBytes(MAX_BYTES_TOTAL);
  return (
    <fieldset className="relative bg-white border border-black/10">
      <legend className="ml-3 px-2 font-mono text-[10px] uppercase tracking-widest text-primary">
        Attachments / Optional
      </legend>
      <CornerTick className="top-0 left-0" rotate={0} />
      <CornerTick className="top-0 right-0" rotate={90} />
      <CornerTick className="bottom-0 right-0" rotate={180} />
      <CornerTick className="bottom-0 left-0" rotate={270} />

      <div className="px-2.5 sm:px-4 pt-2 sm:pt-3 pb-2.5 sm:pb-4">
        <div className="flex items-start gap-2 sm:gap-3 text-[10px] sm:text-xs text-black/60 leading-snug sm:leading-normal">
          <ImagePlus size={14} strokeWidth={1.75} className="text-primary mt-0.5 shrink-0" aria-hidden />
          <p>
            <span className="hidden sm:inline">Pictures help us quote faster. </span>
            Up to {MAX_PHOTOS} photos, {totalCap} total.
            <span className="hidden sm:inline"> We compress them in your browser before upload — no need to resize.</span>
          </p>
        </div>

        {photos.length > 0 && (
          <ul className="mt-3 sm:mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
            {photos.map((p) => (
              <li
                key={p.id}
                className="relative group border border-black/10 overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.previewUrl}
                  alt=""
                  className="w-full h-24 object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove ${p.file.name}`}
                  className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 bg-black/85 text-white hover:bg-secondary transition-colors"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
                <div className="px-1.5 py-1 bg-white border-t border-black/10 font-mono text-[9px] uppercase tracking-wider text-primary flex items-center justify-between">
                  <span className="truncate">{formatBytes(p.file.size)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <label
            className={cn(
              "inline-flex items-center justify-center gap-2 cursor-pointer border border-primary px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors",
              (compressing || remaining === 0) && "opacity-60 cursor-not-allowed pointer-events-none",
            )}
          >
            {compressing ? (
              <>
                <Loader2 size={14} strokeWidth={2} className="animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <ImagePlus size={14} strokeWidth={2} />
                {photos.length === 0 ? "Add photos" : `Add more (${remaining} left)`}
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(e) => onPick(e.target.files)}
              disabled={compressing || remaining === 0}
            />
          </label>
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">
            {photoCount}/{MAX_PHOTOS} photos · {formatBytes(totalBytes)} / {totalCap}
          </p>
        </div>

        {photoError && (
          <p className="mt-3 text-xs text-secondary border-l-2 border-secondary pl-3">
            {photoError}
          </p>
        )}
      </div>
    </fieldset>
  );
}

function CornerTick({ className, rotate }: { className?: string; rotate: number }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute w-2.5 h-2.5 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <span className="absolute top-0 left-0 w-2.5 h-px bg-primary" />
      <span className="absolute top-0 left-0 w-px h-2.5 bg-primary" />
    </span>
  );
}

const inputCls =
  "w-full bg-white border border-black/10 px-2.5 sm:px-3 py-1.5 sm:py-2.5 text-[16px] sm:text-base text-black placeholder:text-black/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors";

const selectCls = inputCls + " appearance-none bg-no-repeat bg-[right_0.85rem_center] pr-10";

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
      <span className="mb-0.5 sm:mb-1.5 block font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-primary">
        {label}
      </span>
      {children}
      {error && <span className="mt-0.5 sm:mt-1 block text-[10px] sm:text-xs text-secondary">{error}</span>}
    </label>
  );
}

// Suppress unused import warning if MAX_BYTES_PER_FILE is referenced only via
// the imageCompress module — keep the export visible for tests.
void MAX_BYTES_PER_FILE;
