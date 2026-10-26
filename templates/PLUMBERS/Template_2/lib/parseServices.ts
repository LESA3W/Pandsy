import {
  Wrench,
  Thermometer,
  AlertTriangle,
  Settings,
  Pipette,
  Bath,
  ShowerHead,
  Droplet,
  type LucideIcon,
} from "lucide-react";

// PlumbingMark icon resolver per CLAUDE.md rule #15.
// Case-insensitive keyword match against service-name strings parsed from
// {{SERVICES}}. Returns a Lucide component used by ServiceSheet cards and the
// QuoteForm select.
export type ParsedService = {
  name: string;
  icon: LucideIcon;
  descriptor: string;
};

export function parseServices(csv: string): ParsedService[] {
  return csv
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({
      name,
      icon: pickIcon(name),
      descriptor: pickDescriptor(name),
    }));
}

function pickIcon(name: string): LucideIcon {
  const n = name.toLowerCase();
  if (n.includes("emergency")) return AlertTriangle;
  if (n.includes("leak")) return AlertTriangle;
  if (n.includes("drain") || n.includes("sewer")) {
    if (n.includes("sewer")) return Pipette;
    return Wrench;
  }
  if (n.includes("water heater") || n.includes("tankless")) return Thermometer;
  if (n.includes("toilet") || n.includes("faucet") || n.includes("fixture")) return Settings;
  if (n.includes("bath") || n.includes("remodel") || n.includes("kitchen")) return Bath;
  if (n.includes("repipe") || n.includes("repiping") || n.includes("shower")) return ShowerHead;
  return Droplet;
}

function pickDescriptor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("drain")) return "Snaked, scoped, cleared. Video log on request.";
  if (n.includes("water heater")) return "Tank, tankless, hybrid. Permitted install, full warranty.";
  if (n.includes("leak")) return "Pinpoint detection. Repair before damage spreads.";
  if (n.includes("toilet") || n.includes("faucet")) return "Repaired or replaced. Pressure tested before we leave.";
  if (n.includes("sewer")) return "Camera scope, hydro-jet, spot repair. No teardown unless needed.";
  if (n.includes("bath") || n.includes("remodel")) return "Rough-in, fixtures, finish. Coordinated with your other trades.";
  if (n.includes("emergency")) return "On-call line answered around the clock. We dispatch fast.";
  if (n.includes("repipe") || n.includes("repiping")) return "Whole-home or section. PEX or copper. Pressure tested twice.";
  return "Diagnosed, quoted in writing, and tested before sign-off.";
}
