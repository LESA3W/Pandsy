/**
 * Parse the {{SERVICES}} CSV into an array of service entries with a
 * keyword-matched Lucide icon (per claude.md hard rule #15 ELECTRICIANS table).
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
 * Auto-generated descriptors keyed by service-name fragments. Spec-sheet
 * register matching the BLUEPRINT / GRID brand voice. No tenure claims.
 */
export function describeService(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("emergency") || n.includes("24/7"))
    return "After-hours response. Master electrician on call. Quoted before we drive over.";
  if (n.includes("panel") || n.includes("breaker") || n.includes("service entrance"))
    return "100, 200, and 400-amp service work. Permitted, inspected, drawings filed with the city.";
  if (n.includes("ev") || n.includes("charger"))
    return "Level 2 dedicated 240V install. Load calculated, run clean, dialed in.";
  if (n.includes("generator") || n.includes("backup"))
    return "Standby and portable. Transfer switch, ATS, battery backup. Tested under load.";
  if (n.includes("lighting") || n.includes("light") || n.includes("fixture"))
    return "Recessed, pendant, landscape, low-voltage. Switch logic mapped, scene plans available.";
  if (n.includes("outlet") || n.includes("switch") || n.includes("receptacle"))
    return "GFCI, AFCI, dedicated runs. Replaced or added without tearing up the drywall.";
  if (n.includes("inspect") || n.includes("audit") || n.includes("certif"))
    return "Pre-purchase, insurance, NEC compliance. Written report, photo log, prioritized fixes.";
  if (n.includes("smart") || n.includes("wiring") || n.includes("rewire") || n.includes("whole.home"))
    return "Smart switches, low-voltage runs, whole-home rewires. Permits pulled, plans on file.";
  if (n.includes("solar") || n.includes("battery storage"))
    return "Solar interconnects, battery backup, critical-load panels. Sized to your usage.";
  return "Spec-sheet pricing. Permits handled. Tested, tagged, and signed off before we leave.";
}
