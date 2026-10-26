/**
 * Minimal class-merge helper. Joins truthy strings with a single space.
 * No tailwind-merge dependency . keeps the template lean.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
