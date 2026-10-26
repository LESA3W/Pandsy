"use client";

// Client-side image compression for QuoteForm photo attachments.
//
// Vercel Hobby request body limit = 4.5 MB. We target:
//   - Max 5 photos per submission
//   - Max 1 MB per compressed file
//   - Max 3.5 MB total (leaves 1 MB headroom for JSON payload + multipart overhead)
//
// Strategy: re-encode to JPEG @ quality 0.85 with the longest edge clamped to
// MAX_DIM. This shrinks a typical iPhone HEIC/JPEG (5–8 MB) to ~400–800 KB
// while staying visually clean for diagnostic purposes (sparking outlet, melted
// breaker, flickering panel — the kind of photo that makes an electrical lead
// 10x more useful).

export const MAX_PHOTOS = 5;
export const MAX_BYTES_PER_FILE = 1_000_000; // 1 MB hard cap after compression
export const MAX_BYTES_TOTAL = 3_500_000;    // 3.5 MB total (Vercel Hobby safe)
export const ACCEPTED_MIME = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

const MAX_DIM = 1600;
const QUALITY = 0.85;

export type CompressionResult =
  | { ok: true; file: File; originalSize: number }
  | { ok: false; reason: string };

export async function compressImage(file: File): Promise<CompressionResult> {
  const mime = file.type.toLowerCase();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isImage =
    ACCEPTED_MIME.includes(mime) ||
    ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(ext);
  if (!isImage) {
    return { ok: false, reason: `Unsupported file type: ${mime || ext || "unknown"}` };
  }

  if (file.size > 25 * 1024 * 1024) {
    return { ok: false, reason: "File over 25 MB. Please pick a smaller photo" };
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    return { ok: false, reason: "Could not read this file as an image" };
  }

  const { width: srcW, height: srcH } = bitmap;
  const ratio = Math.min(1, MAX_DIM / Math.max(srcW, srcH));
  const w = Math.round(srcW * ratio);
  const h = Math.round(srcH * ratio);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return { ok: false, reason: "Browser does not support canvas 2D" };
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", QUALITY),
  );
  if (!blob) return { ok: false, reason: "Compression failed" };

  if (blob.size > MAX_BYTES_PER_FILE) {
    const retry: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.7),
    );
    if (!retry || retry.size > MAX_BYTES_PER_FILE) {
      return {
        ok: false,
        reason: `Photo still too large after compression (${formatBytes(
          (retry ?? blob).size,
        )} > 1 MB)`,
      };
    }
    return {
      ok: true,
      file: new File([retry], renameToJpeg(file.name), { type: "image/jpeg" }),
      originalSize: file.size,
    };
  }

  return {
    ok: true,
    file: new File([blob], renameToJpeg(file.name), { type: "image/jpeg" }),
    originalSize: file.size,
  };
}

function renameToJpeg(name: string): string {
  const stem = name.replace(/\.[^.]+$/, "");
  return `${stem}.jpg`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_000_000) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1_000_000).toFixed(1)} MB`;
}
