/**
 * Tiny classname concat helper. Falsy values are dropped.
 * Avoids the clsx dependency for this single use case.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
