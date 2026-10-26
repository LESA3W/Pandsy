/**
 * category-detector.js
 *
 * Détecte la catégorie de business à partir du champ BUSINESS_TYPE
 * envoyé par n8n. Mapping case-insensitive avec keywords.
 *
 * Retourne "AUTO_REPAIR" | "PLUMBERS" | "ELECTRICIANS" | null
 *
 * Quand on ajoutera de nouvelles catégories (RESTAURANTS, BARBERS, etc.),
 * il suffira d'ajouter une ligne dans MAPPINGS.
 */

const MAPPINGS = [
  {
    category: 'AUTO_REPAIR',
    keywords: [
      'auto', 'mechanic', 'mechanics', 'garage', 'car repair', 'car service',
      'auto repair', 'auto shop', 'tire', 'brake', 'oil change', 'transmission',
      'auto body', 'collision', 'auto care', 'automotive', 'car wash',
    ],
  },
  {
    category: 'PLUMBERS',
    keywords: [
      'plumb', 'plumber', 'plumbing', 'drain', 'water heater', 'sewer',
      'pipe', 'leak', 'faucet', 'toilet', 'bathroom remodel', 'repipe',
    ],
  },
  {
    category: 'ELECTRICIANS',
    keywords: [
      'electric', 'electrician', 'electrical', 'wiring', 'panel', 'outlet',
      'ev charger', 'generator', 'lighting installation', 'smart home wiring',
    ],
  },
];

export function detectCategory(businessType) {
  if (!businessType || typeof businessType !== 'string') return null;
  const normalized = businessType.toLowerCase().trim();
  for (const mapping of MAPPINGS) {
    for (const keyword of mapping.keywords) {
      if (normalized.includes(keyword)) {
        return mapping.category;
      }
    }
  }
  return null;
}

export function pickRandomTemplate(category) {
  const n = Math.floor(Math.random() * 3) + 1;
  return `Template_${n}`;
}

export const SUPPORTED_CATEGORIES = MAPPINGS.map((m) => m.category);
