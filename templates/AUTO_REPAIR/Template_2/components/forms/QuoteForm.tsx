"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ChevronDown, ImagePlus, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { parseServices } from "@/lib/parseServices";
import {
  compressImage,
  formatBytes,
  MAX_PHOTOS,
  MAX_BYTES_TOTAL,
} from "@/lib/imageCompress";

// Service options come from the same {{SERVICES}} placeholder used by the
// Services section, so the dropdown stays in sync with what the site
// actually advertises. The pipeline substitutes {{SERVICES}} at build time.
const SERVICE_OPTIONS = parseServices("{{SERVICES}}").map((s) => s.name);

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter your phone"),
  vehicleMake: z.string().min(1, "Please enter the make"),
  vehicleModel: z.string().min(1, "Please enter the model"),
  vehicleYear: z
    .string()
    .regex(/^\d{4}$/u, "4-digit year please")
    .refine((y) => {
      const n = Number(y);
      return n >= 1950 && n <= new Date().getFullYear() + 1;
    }, "Please enter a realistic year"),
  service: z.string().min(1, "Please pick a service"),
  message: z.string().min(5, "A short note helps us prepare"),
});

type FormValues = z.infer<typeof schema>;

type Photo = {
  id: string;
  file: File;
  previewUrl: string;
};

export default function QuoteForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoError, setPhotoError] = useState<string>("");
  const [compressing, setCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

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

  async function onSubmit(values: FormValues) {
    setStatus("loading");
    setErrorMsg(null);
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
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
      setPhotos([]);
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
          label="Phone"
          error={errors.phone?.message}
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

      {/* Vehicle: Make + Model + Year, three SEPARATE fields per claude.md hard rule #14b */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-[1fr_1fr_120px] [&>label:nth-child(3)]:col-span-2 sm:[&>label:nth-child(3)]:col-span-1">
        <Field
          label="Make"
          error={errors.vehicleMake?.message}
          input={
            <input
              type="text"
              placeholder="Toyota"
              {...register("vehicleMake")}
              className={inputCls}
            />
          }
        />
        <Field
          label="Model"
          error={errors.vehicleModel?.message}
          input={
            <input
              type="text"
              placeholder="Camry"
              {...register("vehicleModel")}
              className={inputCls}
            />
          }
        />
        <Field
          label="Year"
          error={errors.vehicleYear?.message}
          input={
            <input
              type="text"
              inputMode="numeric"
              placeholder="2018"
              {...register("vehicleYear")}
              className={inputCls}
            />
          }
        />
      </div>

      <Field
        label="Service requested"
        error={errors.service?.message}
        input={
          <div className="relative">
            <select
              defaultValue=""
              {...register("service")}
              className={cn(inputCls, "appearance-none pr-10")}
            >
              <option value="" disabled>
                Pick a service
              </option>
              {SERVICE_OPTIONS.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
              <option value="Other">Other (describe below)</option>
            </select>
            <ChevronDown
              size={16}
              strokeWidth={1.75}
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black/50"
            />
          </div>
        }
      />

      <Field
        label="Anything else we should know?"
        error={errors.message?.message}
        input={
          <textarea rows={3} {...register("message")} className={cn(inputCls, "min-h-[72px] sm:min-h-[96px]")} />
        }
      />

      {/* Photos drop-zone — Heritage Workshop styling: cream/stone/forest/clay */}
      <div className="border border-black/15 bg-white">
        <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border-b border-black/15 bg-black/5">
          <div className="flex items-center gap-2">
            <ImagePlus size={13} strokeWidth={1.75} className="text-secondary" aria-hidden />
            <span className="small-caps text-[11px] text-secondary">
              Photos · optional
            </span>
          </div>
          <span className="small-caps text-[10px] text-black/50">
            {photoCount}/{MAX_PHOTOS} · {formatBytes(totalBytes)}/{formatBytes(MAX_BYTES_TOTAL)}
          </span>
        </div>
        <div className="px-3 sm:px-4 py-3 sm:py-4">
          <p className="text-xs text-black/60 leading-relaxed">
            Pictures help us bring the right gear and quote faster. Up to{" "}
            {MAX_PHOTOS} photos, {formatBytes(MAX_BYTES_TOTAL)} total — compressed
            in your browser before upload.
          </p>

          {photos.length > 0 && (
            <ul className="mt-3 sm:mt-4 grid grid-cols-3 sm:grid-cols-5 gap-1.5 sm:gap-2">
              {photos.map((p) => (
                <li key={p.id} className="relative group border border-black/15 bg-white overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.previewUrl} alt="" className="w-full h-20 object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(p.id)}
                    aria-label={`Remove ${p.file.name}`}
                    className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 bg-black/80 text-white hover:bg-primary transition-colors"
                  >
                    <X size={12} strokeWidth={2.5} />
                  </button>
                  <div className="px-1.5 py-0.5 bg-black/5 border-t border-black/15 small-caps text-[10px] text-secondary text-center">
                    {formatBytes(p.file.size)}
                  </div>
                </li>
              ))}
            </ul>
          )}

          <label
            className={cn(
              "mt-3 inline-flex items-center justify-center gap-2 cursor-pointer border border-secondary px-4 py-2 small-caps text-[11px] text-secondary hover:bg-secondary hover:text-secondary-text transition-colors",
              (compressing || remaining === 0) && "opacity-50 cursor-not-allowed pointer-events-none",
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
                {photos.length === 0 ? "Add photos" : `Add more (${remaining} left)`}
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
            <p className="mt-2 text-xs text-primary/80 border-l-2 border-primary pl-3">
              {photoError}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={status === "loading" || compressing}
        className={cn(
          "mt-1.5 sm:mt-2 inline-flex items-center justify-center bg-secondary px-6 py-2.5 sm:py-3",
          "font-display text-sm font-semibold uppercase tracking-wider text-secondary-text",
          "transition-colors hover:bg-secondary/80",
          "disabled:cursor-not-allowed disabled:opacity-60",
        )}
      >
        {status === "loading" ? "Sending..." : "Send my quote request"}
      </button>

      {status === "ok" && (
        <p className="text-sm text-secondary">
          Got it. We will reach out within one business day.
        </p>
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
