const DESCRIPTIONS: Array<{ keywords: string[]; copy: string }> = [
  {
    keywords: ["engine diagnostic", "engine", "check engine", "diagnostic"],
    copy: "Misfires, check-engine lights, weird sounds. Real diagnostics, no guesswork.",
  },
  {
    keywords: ["brake"],
    copy: "Pads, rotors, fluid, lines. Stops that hold the first time, every time.",
  },
  {
    keywords: ["oil change", "oil", "fluid"],
    copy: "Right oil weight, right filter, every fluid checked. In and out fast.",
  },
  {
    keywords: ["transmission"],
    copy: "Slipping, hard shifts, leaks. Diagnosed, serviced, or rebuilt by spec.",
  },
  {
    keywords: ["suspension", "steering", "alignment"],
    copy: "Shocks, struts, bushings, alignment. We make the ride feel new again.",
  },
  {
    keywords: ["ac", "air conditioning", "heating", "climate"],
    copy: "Recharge, leak detection, compressor work. Cold air on the hottest days.",
  },
  {
    keywords: ["pre-purchase", "inspection", "used car"],
    copy: "Independent inspection before you buy. We tell you what it really needs.",
  },
  {
    keywords: ["fleet", "commercial"],
    copy: "Scheduled maintenance for vans, trucks, and crew vehicles. Keep them rolling.",
  },
  {
    keywords: ["battery", "electrical", "alternator", "starter"],
    copy: "Battery test, charging system, starter, parasitic draws. We find the dead spot.",
  },
  {
    keywords: ["tire", "wheel"],
    copy: "Rotation, balance, patches, replacement. Honest answer on what's safe.",
  },
  {
    keywords: ["exhaust", "muffler", "catalytic"],
    copy: "Leaks, sensors, cat replacements. Pass inspection, sound right.",
  },
  {
    keywords: ["cooling", "radiator", "thermostat"],
    copy: "Overheating, coolant leaks, thermostat, water pump. Stop the boil.",
  },
];

const FALLBACK = "Honest diagnostics, transparent pricing, warranty-backed work.";

export function getServiceDescription(serviceName: string): string {
  const name = serviceName.toLowerCase();
  for (const entry of DESCRIPTIONS) {
    if (entry.keywords.some((k) => name.includes(k))) {
      return entry.copy;
    }
  }
  return FALLBACK;
}
