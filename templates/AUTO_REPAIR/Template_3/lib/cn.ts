/**
 * Minimal class-merge helper. Joins truthy strings with a single space.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
