/**
 * Parse the {{SERVICES}} CSV into an array of service entries with a
 * keyword-matched Lucide icon (per the PLUMBERS table in claude.md hard rule #15).
 *
 * Matching is case-insensitive substring matching against the service name.
 * First match wins; `Droplet` is the fallback.
 */
import {
  AlertTriangle,
  Bath,
  Droplet,
  Pipette,
  Settings,
  ShowerHead,
  Thermometer,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  name: string;
  icon: LucideIcon;
};

const RULES: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /emergency|burst|24\/7/i, icon: AlertTriangle },
  { match: /water heater|tankless|boiler/i, icon: Thermometer },
  { match: /leak/i, icon: AlertTriangle },
  { match: /sewer|septic/i, icon: Pipette },
  { match: /repipe|piping|pipe/i, icon: ShowerHead },
  { match: /remodel|bathroom|kitchen|renovation/i, icon: Bath },
  { match: /toilet|faucet|fixture/i, icon: Settings },
  { match: /drain|clog|rooter/i, icon: Wrench },
];

export function parseServices(csv: string): Service[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const rule = RULES.find((r) => r.match.test(name));
      return { name, icon: rule?.icon ?? Droplet };
    });
}
