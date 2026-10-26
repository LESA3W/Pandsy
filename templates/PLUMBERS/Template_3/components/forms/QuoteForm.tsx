"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ImagePlus, X, Loader2, ChevronRight } from "lucide-react";
import { parseServices } from "@/lib/parseServices";
import {
  compressImage,
  formatBytes,
  MAX_PHOTOS,
  MAX_BYTES_PER_FILE,
  MAX_BYTES_TOTAL,
} from "@/lib/imageCompress";
import { cn } from "@/lib/cn";
import PipeTick from "@/components/ui/PipeTick";

// PLUMBERS QuoteForm per CLAUDE.md rule #14b + photo attachments per #14c.
// Fields: name, email, phone, address, propertyType, urgency, service, message + 0-5 photos.
// Service is a <select> populated from parseServices("{{SERVICES}}") plus an
// "Other (describe below)" entry. service: z.string().min(1) so the empty
// default option fails and forces a pick.
//
// Photos: client-side compression to JPEG @ 1600px max, capped per-file and total.
// Submitted as multipart/form-data so /api/quote can pass them to Resend.attachments.

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
      const res = await fetch("/api/quote", { method: "POST", body: formData });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error ?? "Send failed");
      }
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
      <div className="px-4 py-12 text-center">
        <p className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary">
          <PipeTick /> Request received
        </p>
        <p className="mt-4 font-display text-3xl font-black tracking-tight-display text-black">
          Got it. We&apos;re on it.
        </p>
        <p className="mt-3 text-black/60">
          A licensed plumber will reach out shortly with a written quote.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
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

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4">
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

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-4">
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
          rows={4}
          placeholder="Slow drain, water heater pilot won't stay lit, leak under the sink..."
          className={cn(inputCls, "min-h-[80px] resize-y sm:min-h-[110px]")}
        />
      </Field>

      {/* Photos drop-zone — CLEARLINE styling: bordered MeterPanel block */}
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

      <div className="flex flex-col items-stretch gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <p className="text-xs text-black/60">
          We respond on business days within a few hours. For real emergencies, call directly.
        </p>
        <button
          type="submit"
          disabled={isSubmitting || status === "sending" || compressing}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary-text shadow-lift-soft transition-all duration-150 ease-out hover:-translate-y-0.5 hover:opacity-90 hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-60 sm:px-6 sm:py-4"
        >
          {status === "sending" ? "Sending..." : "Request a quote"}
          <ChevronRight size={14} strokeWidth={2.4} />
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
    <fieldset className="rounded-2xl border border-black/10 bg-white p-3 shadow-lift-soft sm:p-5">
      <legend className="sr-only">Photo attachments. Optional.</legend>
      <p className="mb-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary sm:mb-3">
        <PipeTick />
        Attachments · optional
      </p>

      <div className="">
        <div className="flex items-start gap-3 text-xs text-black/60">
          <ImagePlus size={16} strokeWidth={1.75} className="mt-0.5 shrink-0 text-primary" aria-hidden />
          <p>
            A photo helps us quote faster. Up to {MAX_PHOTOS} photos, {totalCap} total.
            We compress them in your browser before upload. No need to resize.
          </p>
        </div>

        {photos.length > 0 && (
          <ul className="mt-3 grid grid-cols-3 gap-2 sm:mt-4 sm:grid-cols-3 sm:gap-3 md:grid-cols-5">
            {photos.map((p) => (
              <li
                key={p.id}
                className="group relative overflow-hidden rounded-xl border border-black/10 bg-white shadow-lift-soft"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.previewUrl} alt="" className="h-16 w-full object-cover sm:h-24" />
                <button
                  type="button"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove ${p.file.name}`}
                  className="absolute right-1.5 top-1.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/80 text-white transition-colors hover:bg-accent"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
                <div className="flex items-center justify-between border-t border-black/10 bg-white px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">
                  <span className="truncate">{formatBytes(p.file.size)}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-3 flex flex-col gap-2.5 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <label
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-primary px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary transition-all duration-150 ease-out hover:bg-primary hover:text-primary-text",
              (compressing || remaining === 0) &&
                "pointer-events-none cursor-not-allowed opacity-60",
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-black/60">
            {photoCount}/{MAX_PHOTOS} photos · {formatBytes(totalBytes)} / {totalCap}
          </p>
        </div>

        {photoError && (
          <p className="mt-3 rounded-lg border-l-4 border-accent bg-accent/5 px-3 py-2 text-xs text-accent">
            {photoError}
          </p>
        )}
      </div>
    </fieldset>
  );
}

const inputCls =
  "w-full rounded-xl bg-white border border-black/10 px-3 py-2 text-black placeholder:text-black/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors sm:px-3.5 sm:py-2.5";

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
      <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-primary sm:mb-1.5">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-accent">{error}</span>}
    </label>
  );
}

// Suppress unused import warning if MAX_BYTES_PER_FILE is referenced only via
// the imageCompress module — keep the export visible for tests.
void MAX_BYTES_PER_FILE;
