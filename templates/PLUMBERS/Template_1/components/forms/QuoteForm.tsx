"use client";

/**
 * QuoteForm — primary lead engine for PLUMBERS T1 (TIDEWATER / SLATE & COPPER).
 *
 * Per claude.md hard rule #14b PLUMBERS spec:
 *   name, email, phone, address, propertyType, urgency, service, message.
 *
 * `service` is a <select> populated from parseServices("{{SERVICES}}"),
 * with "Other (describe below)" appended. propertyType and urgency are
 * also <select>s validated as `z.string().min(1)` so the empty default
 * fails validation, forcing the user to pick.
 *
 * Photos: client-side compression to JPEG @ 1600px max, capped per-file and
 * total. Submitted as multipart/form-data so /api/quote can pass them to
 * Resend.attachments. No database — files live in memory until the email is
 * sent, then they are gone.
 */
import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, AlertCircle, ImagePlus, X, Loader2 } from "lucide-react";
import { parseServices } from "@/lib/parseServices";
import {
  compressImage,
  formatBytes,
  MAX_PHOTOS,
  MAX_BYTES_TOTAL,
} from "@/lib/imageCompress";
import { cn } from "@/lib/cn";

const services = parseServices("{{SERVICES}}").map((s) => s.name);

const schema = z.object({
  name: z.string().min(2, "Please share your name"),
  email: z.string().email("Please share a valid email"),
  phone: z
    .string()
    .min(7, "Please share a phone number we can reach you at")
    .max(20, "That phone number looks too long"),
  address: z.string().min(4, "Please share the service address"),
  propertyType: z.string().min(1, "Please pick a property type"),
  urgency: z.string().min(1, "Please pick an urgency level"),
  service: z.string().min(1, "Please pick a service"),
  message: z
    .string()
    .min(10, "A few lines about the issue helps us prepare the right gear"),
});

type FormData = z.infer<typeof schema>;

type Photo = {
  id: string;
  file: File;
  previewUrl: string;
};

const labelClass =
  "block text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-slate-600 mb-0.5 sm:mb-2";
const inputClass =
  "w-full bg-white border border-slate-200 focus:border-primary focus:outline-none text-slate-900 placeholder:text-slate-400 px-3 sm:px-4 py-1.5 sm:py-3 font-sans text-[14px] sm:text-[15px] leading-tight transition-colors";
const errorClass = "mt-1 sm:mt-1.5 text-[12px] text-secondary font-sans flex items-center gap-1.5";

export function QuoteForm() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string>("");
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      propertyType: "",
      urgency: "",
      service: "",
    },
  });

  const totalBytes = photos.reduce((sum, p) => sum + p.file.size, 0);
  const photoCount = photos.length;
  const remainingSlots = MAX_PHOTOS - photoCount;

  async function onPhotosPicked(files: FileList | null) {
    setPhotoError("");
    if (!files || files.length === 0) return;
    if (photoCount + files.length > MAX_PHOTOS) {
      setPhotoError(
        `Max ${MAX_PHOTOS} photos. You picked ${files.length}, ${remainingSlots} slot(s) left.`,
      );
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

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      const formData = new FormData();
      formData.append("payload", JSON.stringify(data));
      for (const p of photos) {
        formData.append("photos", p.file, p.file.name);
      }
      const res = await fetch("/api/quote", {
        method: "POST",
        body: formData,
      });
      const body = await res.json();
      if (!res.ok) {
        setServerError(body.error ?? "Something went sideways. Try again or call us.");
        return;
      }
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPhotos([]);
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
      <div className="bg-surface-tint border border-primary/40 p-8 md:p-10 text-center">
        <CheckCircle2 size={48} className="text-primary mx-auto mb-5" strokeWidth={1.5} />
        <h3 className="font-display text-2xl text-slate-900 mb-3">
          Got it. We&apos;re on it.
        </h3>
        <p className="font-sans text-[15px] text-slate-600 leading-relaxed max-w-sm mx-auto">
          A licensed plumber will reach out within the hour during business hours,
          or first thing tomorrow morning. For emergencies, call us directly at{" "}
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-5" noValidate>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass} htmlFor="quote-name">Your name</label>
          <input
            id="quote-name"
            type="text"
            placeholder="Jane Doe"
            autoComplete="name"
            className={cn(inputClass, errors.name && "border-secondary")}
            {...register("name")}
          />
          {errors.name && (
            <p className={errorClass}><AlertCircle size={12} />{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="quote-email">Email</label>
          <input
            id="quote-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            className={cn(inputClass, errors.email && "border-secondary")}
            {...register("email")}
          />
          {errors.email && (
            <p className={errorClass}><AlertCircle size={12} />{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass} htmlFor="quote-phone">Phone</label>
          <input
            id="quote-phone"
            type="tel"
            placeholder="(555) 555-1234"
            autoComplete="tel"
            className={cn(inputClass, errors.phone && "border-secondary")}
            {...register("phone")}
          />
          {errors.phone && (
            <p className={errorClass}><AlertCircle size={12} />{errors.phone.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="quote-address">Service address</label>
          <input
            id="quote-address"
            type="text"
            placeholder="Street, city"
            autoComplete="street-address"
            className={cn(inputClass, errors.address && "border-secondary")}
            {...register("address")}
          />
          {errors.address && (
            <p className={errorClass}><AlertCircle size={12} />{errors.address.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className={labelClass} htmlFor="quote-property">Property type</label>
          <select
            id="quote-property"
            className={cn(inputClass, "appearance-none cursor-pointer", errors.propertyType && "border-secondary")}
            {...register("propertyType")}
          >
            <option value="">Pick one</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Property management">Property management</option>
          </select>
          {errors.propertyType && (
            <p className={errorClass}><AlertCircle size={12} />{errors.propertyType.message}</p>
          )}
        </div>
        <div>
          <label className={labelClass} htmlFor="quote-urgency">How urgent?</label>
          <select
            id="quote-urgency"
            className={cn(inputClass, "appearance-none cursor-pointer", errors.urgency && "border-secondary")}
            {...register("urgency")}
          >
            <option value="">Pick one</option>
            <option value="Emergency (now)">Emergency (now)</option>
            <option value="Urgent (today)">Urgent (today)</option>
            <option value="Soon (this week)">Soon (this week)</option>
            <option value="Planned project">Planned project</option>
          </select>
          {errors.urgency && (
            <p className={errorClass}><AlertCircle size={12} />{errors.urgency.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-service">Service needed</label>
        <select
          id="quote-service"
          className={cn(inputClass, "appearance-none cursor-pointer", errors.service && "border-secondary")}
          {...register("service")}
        >
          <option value="">Pick a service</option>
          {services.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
          <option value="Other (describe below)">Other (describe below)</option>
        </select>
        {errors.service && (
          <p className={errorClass}><AlertCircle size={12} />{errors.service.message}</p>
        )}
      </div>

      <div>
        <label className={labelClass} htmlFor="quote-message">What&apos;s going on?</label>
        <textarea
          id="quote-message"
          rows={2}
          placeholder="Tell us what you&apos;re seeing. Slow drain, water under the sink, knocking pipes, anything we should know before we show up."
          className={cn(inputClass, "resize-y", errors.message && "border-secondary")}
          {...register("message")}
        />
        {errors.message && (
          <p className={errorClass}><AlertCircle size={12} />{errors.message.message}</p>
        )}
      </div>

      {/* Photos drop-zone */}
      <div className="border border-slate-200 bg-surface-tint">
        <div className="flex items-center gap-2 px-3 sm:px-4 pt-2 sm:pt-3 pb-1.5 sm:pb-2 border-b border-slate-200">
          <ImagePlus size={14} strokeWidth={1.75} className="text-primary" aria-hidden />
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
            Photos · optional
          </span>
        </div>
        <div className="px-3 sm:px-4 pt-2 sm:pt-3 pb-3 sm:pb-4">
          <p className="hidden sm:block text-[12px] text-slate-600 leading-relaxed">
            Pictures help us bring the right gear and quote faster. Up to {MAX_PHOTOS} photos,
            {" "}{formatBytes(MAX_BYTES_TOTAL)} total. We compress them in your browser before upload.
          </p>

          {photos.length > 0 && (
            <ul className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
              {photos.map((p) => (
                <li
                  key={p.id}
                  className="relative group border border-slate-200 overflow-hidden bg-white"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.previewUrl} alt="" className="w-full h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.id)}
                    aria-label={`Remove ${p.file.name}`}
                    className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 bg-slate-900/85 text-white hover:bg-secondary hover:text-secondary-text transition-colors"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  <div className="px-1.5 py-1 bg-surface-tint border-t border-slate-200 font-mono text-[9px] uppercase tracking-wider text-primary text-center">
                    {formatBytes(p.file.size)}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <label
              className={cn(
                "inline-flex items-center justify-center gap-2 cursor-pointer border border-primary/70 px-4 py-2 font-mono text-[11px] uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-text transition-colors",
                (compressing || remainingSlots === 0) && "opacity-50 cursor-not-allowed pointer-events-none",
              )}
            >
              {compressing ? (
                <>
                  <Loader2 size={13} strokeWidth={2} className="animate-spin" />
                  Compressing…
                </>
              ) : (
                <>
                  <ImagePlus size={13} strokeWidth={2} />
                  {photos.length === 0 ? "Add photos" : `Add more (${remainingSlots} left)`}
                </>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                onChange={(e) => onPhotosPicked(e.target.files)}
                disabled={compressing || remainingSlots === 0}
              />
            </label>
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {photoCount}/{MAX_PHOTOS} photos · {formatBytes(totalBytes)} / {formatBytes(MAX_BYTES_TOTAL)}
            </p>
          </div>

          {photoError && (
            <p className="mt-2 text-[12px] text-secondary border-l-2 border-secondary pl-3">
              {photoError}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <div className="border border-secondary/60 bg-secondary/10 px-4 py-3 text-[13px] text-secondary font-sans flex items-start gap-2">
          <AlertCircle size={16} className="mt-px flex-shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting || compressing}
        className="group relative w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-text font-display text-base sm:text-lg tracking-wide py-2.5 sm:py-4 px-6 transition-opacity"
      >
        {isSubmitting ? "Sending…" : "Request my quote"}
      </button>

      <p className="hidden sm:block text-[11px] text-slate-500 font-mono uppercase tracking-widest text-center">
        Licensed &amp; insured · Up-front pricing · No surprise fees
      </p>
    </form>
  );
}
