/**
 * Parse {{SERVICES}} CSV into entries with a keyword-matched Lucide icon
 * (per the AUTO_REPAIR map in claude.md hard rule #15).
 *
 * Matching is case-insensitive substring matching against the service name.
 * First match wins; Car is the fallback.
 */
import {
  Battery,
  Car,
  CircleDot,
  Cog,
  Disc,
  Droplet,
  Settings,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  name: string;
  icon: LucideIcon;
};

const RULES: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /brake/i, icon: Disc },
  { match: /\boil\b/i, icon: Droplet },
  { match: /engine|diagnos/i, icon: Cog },
  { match: /transmission/i, icon: Settings },
  { match: /suspension/i, icon: Wrench },
  { match: /\bac\b|air|cooling|hvac/i, icon: Wind },
  { match: /battery|electrical/i, icon: Battery },
  { match: /tire|wheel|alignment/i, icon: CircleDot },
];

export function parseServices(csv: string): Service[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const rule = RULES.find((r) => r.match.test(name));
      return { name, icon: rule?.icon ?? Car };
    });
}
