/**
 * Parse the {{SERVICES}} CSV into an array of service entries with a
 * keyword-matched Lucide icon (per claude.md hard rule #15 ELECTRICIANS table).
 *
 * Matching is case-insensitive substring matching against the service name.
 * First match wins; `Zap` is the fallback.
 */
import {
  AlertTriangle,
  BatteryCharging,
  House,
  Lightbulb,
  Plug,
  Power,
  Search,
  ShieldCheck,
  Sun,
  Zap,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  name: string;
  icon: LucideIcon;
};

const RULES: Array<{ match: RegExp; icon: LucideIcon }> = [
  { match: /emergency|24\/7/i, icon: AlertTriangle },
  { match: /panel|breaker|service entrance|sub.?panel/i, icon: ShieldCheck },
  { match: /ev|charger/i, icon: BatteryCharging },
  { match: /generator|backup/i, icon: Power },
  { match: /lighting|light\b|fixture/i, icon: Lightbulb },
  { match: /outlet|switch|receptacle/i, icon: Plug },
  { match: /inspect|audit|certif/i, icon: Search },
  { match: /smart|wiring|rewire|whole.?home|home.?automation/i, icon: House },
  { match: /solar|battery storage/i, icon: Sun },
];

export function parseServices(csv: string): Service[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => {
      const rule = RULES.find((r) => r.match.test(name));
      return { name, icon: rule?.icon ?? Zap };
    });
}

/**
 * Auto-generated descriptors keyed by service-name fragments. Generic so they
 * work for any client's service list. Falls back to a universal description.
 * No tenure/heritage claims (claude.md rule #11).
 */
export function describeService(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("emergency") || n.includes("24/7"))
    return "Sparking outlet, dead breaker, half the house out. We pick up. Master electrician on call.";
  if (n.includes("panel") || n.includes("breaker") || n.includes("service entrance"))
    return "100A to 200A upgrades, sub-panel adds, breaker replacements. Permitted, inspected, labeled clean.";
  if (n.includes("ev") || n.includes("charger"))
    return "Level 2 EV charger installs. Clean conduit run, dedicated 240V circuit, NEC code-compliant.";
  if (n.includes("generator") || n.includes("backup"))
    return "Standby and portable generator install. Transfer switch wired, tested under load.";
  if (n.includes("lighting") || n.includes("light") || n.includes("fixture"))
    return "Recessed, pendant, landscape, under-cabinet. Switch logic that actually makes sense.";
  if (n.includes("outlet") || n.includes("switch") || n.includes("receptacle"))
    return "GFCI, AFCI, dedicated circuits. Replaced, added, or moved without tearing up the drywall.";
  if (n.includes("inspect") || n.includes("audit") || n.includes("certif"))
    return "Pre-purchase, insurance, or peace-of-mind. Written report with photos and prioritized fixes.";
  if (n.includes("smart") || n.includes("wiring") || n.includes("rewire") || n.includes("whole.home"))
    return "Smart switches, low-voltage runs, whole-home rewires. Permitted, code-compliant, future-ready.";
  if (n.includes("solar") || n.includes("battery storage"))
    return "Solar interconnects, battery backup, critical-load panels. Sized to your usage, not oversold.";
  return "Code-compliant. Permits pulled. Up-front pricing. Master electrician on every job.";
}
