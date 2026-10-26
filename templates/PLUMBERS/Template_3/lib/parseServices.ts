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

// ServiceDot icon resolver per CLAUDE.md rule #15.
// Case-insensitive keyword match against service-name strings parsed from
// {{SERVICES}}. Returns a Lucide component used by ServiceMenu cards and the
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
  if (n.includes("sewer")) return Pipette;
  if (n.includes("drain")) return Wrench;
  if (n.includes("water heater") || n.includes("tankless")) return Thermometer;
  if (n.includes("toilet") || n.includes("faucet") || n.includes("fixture")) return Settings;
  if (n.includes("bath") || n.includes("remodel") || n.includes("kitchen")) return Bath;
  if (n.includes("repipe") || n.includes("repiping") || n.includes("shower")) return ShowerHead;
  return Droplet;
}

// T3 voice: residential clinical, "we won't ruin your floor". Service descriptors
// stay distinct from T1's "service-trade clipboard" voice and T2's "shop-ledger"
// voice — same factual register, different word choice.
function pickDescriptor(name: string): string {
  const n = name.toLowerCase();
  if (n.includes("drain")) return "Cleared on the first visit. Camera scope on request.";
  if (n.includes("water heater")) return "Tank, tankless, hybrid. Permitted, warrantied, on time.";
  if (n.includes("leak")) return "Found fast. Fixed once. Floors stay protected.";
  if (n.includes("toilet") || n.includes("faucet")) return "Repaired or replaced cleanly. Pressure verified before we leave.";
  if (n.includes("sewer")) return "Scoped, jetted, spot-repaired. No teardown unless needed.";
  if (n.includes("bath") || n.includes("remodel")) return "Rough-in to finish. Coordinated with your other trades.";
  if (n.includes("emergency")) return "On-call line, 24/7. Live dispatch, real arrival window.";
  if (n.includes("repipe") || n.includes("repiping")) return "Whole-home or partial. PEX or copper. Pressure tested twice.";
  return "Diagnosed, quoted in writing, verified before sign-off.";
}
