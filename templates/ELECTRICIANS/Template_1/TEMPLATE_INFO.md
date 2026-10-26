# ELECTRICIANS / Template_1 — VOLTAGE / LIVE WIRE

The licensed master electrician's panel-cover identity. Deep voltage navy, voltage amber, arc-flash cyan as a single high-energy signal color, emergency red reserved for the sticky 24/7 button. Every section reads like a labeled circuit on a service-panel cover.

---

## Color palette

### Per-client (CSS vars from `{{LOGO_COLORS}}`)
| Token | Slot | Voltage Electric default |
|-------|------|--------------------------|
| `--color-primary` | Brand 1 | `#0369a1` (sky blue) |
| `--color-secondary` | Brand 2 | `#fbbf24` (voltage amber) |
| `--color-accent` | Brand 3 | `#f59e0b` (warm orange) |

### Locked palette (independent of client)
| Token | Hex | Role |
|-------|-----|------|
| `volt.DEFAULT` | `#0a1929` | Primary surface (deep voltage navy) |
| `volt.deep` | `#050d17` | Deepest punch / scrim base |
| `volt.panel` | `#11243a` | Raised panel |
| `volt.border` | `#1f3a52` | Hairline rule on dark |
| `volt.rule` | `#2c4a66` | Mid rule |
| `volt.mute` | `#7891a8` | Muted text on dark |
| `volt.cream` | `#e2e8f0` | Filament-white body text |
| `bone.DEFAULT` | `#f4f6f8` | Pale steel-bone (relief surface) |
| `bone.deep` | `#dde3e8` | Bone edge |
| `bone.rule` | `#c8d1d8` | Light surface rule |
| `bone.ink` | `#2a3a4a` | Navy ink for body on bone |
| `bone.mute` | `#6b7d8d` | Muted text on bone |
| `amber.DEFAULT` | `#fbbf24` | Voltage amber (primary trade accent) |
| `amber.bright` | `#fcd34d` | Hover / focus |
| `amber.deep` | `#d97706` | Pressed / warm-orange |
| `amber.glow` | `#fde68a` | Lifted highlights |
| `arc.DEFAULT` | `#22d3ee` | Arc-flash cyan (high-energy signal — sparing) |
| `arc.deep` | `#0891b2` | Deeper cyan |
| `arc.glow` | `#67e8f9` | Lifted cyan |
| `emergency.DEFAULT` | `#dc2626` | Reserved for emergency CTAs only |
| `emergency.deep` | `#991b1b` | Pressed |
| `emergency.glow` | `#ef4444` | Pulse glow |
| `night` | `#020611` | Deepest dim for image scrims |

---

## Typography

| Role | Font | Why |
|------|------|-----|
| Display (`--font-display`) | **Archivo Black** | Heavy industrial geometric. Reads like the printed label on a service-panel cover. Set in UPPERCASE throughout for that signage register. Outlook fallback: `'Arial Black', Helvetica, sans-serif`. |
| Body (`--font-sans`) | **Inter** | Proven technical readability. Weights 400 / 500 / 600. Outlook fallback: `Arial, Helvetica, sans-serif`. |
| Mono (`--font-mono`) | **JetBrains Mono** | Breaker labels, panel meta strips, voltage readouts, kicker tags. Weights 400 / 500. Outlook fallback: `'Courier New', monospace`. |

---

## Sections (12, in order per claude.md hard rule #4)

| # | Section | File |
|---|---------|------|
| 1 | Header | `components/Header.tsx` |
| 2 | Hero | `components/Hero.tsx` |
| 3 | TrustBar | `components/TrustBar.tsx` |
| 4 | Services | `components/Services.tsx` |
| 5 | About | `components/About.tsx` |
| 6 | WhyChooseUs | `components/WhyChooseUs.tsx` |
| 7 | Gallery (single cell — no GALLERY_2) | `components/Gallery.tsx` |
| 8 | Reviews (2x2 grid + Google badge) | `components/Reviews.tsx` |
| 9 | QuoteSection | `components/QuoteSection.tsx` |
| 10 | CtaSection | `components/CtaSection.tsx` |
| 11 | ContactSection | `components/ContactSection.tsx` |
| 12 | Footer (rich per #4b) | `components/Footer.tsx` |

Plus the chrome:
- `components/CookieConsent.tsx` (banner + modal + floating button, claude.md #6 visibility logic)
- `components/EmergencyButton.tsx` (sticky bottom-right 24/7 phone)

---

## Placeholders used (verified via grep — all 46 honored where applicable)

**Business identity:** `{{BUSINESS_NAME}}`, `{{BUSINESS_TYPE}}`, `{{CITY}}`, `{{STATE}}`, `{{ZIP}}`, `{{FULL_ADDRESS}}`, `{{TARGET_DESCRIPTION}}`

**Contact:** `{{PHONE}}`, `{{PHONE_DIGITS}}`, `{{EMAIL}}`, `{{HOURS}}`

**Brand assets:** `{{LOGO_URL_LIGHT}}`, `{{LOGO_URL_DARK}}`, `{{LOGO_COLORS}}`

**Services list:** `{{SERVICES}}` (parsed via `lib/parseServices.ts`)

**Images (5 — ELECTRICIANS spec, no GALLERY_2):** `{{HERO}}`, `{{ABOUT}}`, `{{SERVICES_IMAGE}}`, `{{GALLERY_1}}`, `{{CTA}}`

**Google Business:** `{{GOOGLE_LOGO_URL}}`, `{{GOOGLE_RATING}}`, `{{GOOGLE_REVIEW_COUNT}}`, `{{GOOGLE_REVIEW_URL}}`, `{{GOOGLE_MAPS_URL}}`

**Social:** `{{INSTAGRAM_URL}}`, `{{FACEBOOK_URL}}`, `{{TIKTOK_URL}}`, `{{TWITTER_URL}}`

**Reviews (4 sets of 4 = 16):** `REVIEW_1`..`REVIEW_4` plus the matching `_NAME`, `_STARS`, `_DATE` for each (all wrapped in double curly braces in source).

---

## SLOT markers (rewritable copy at customization time)

| Slot | Where | Default |
|------|-------|---------|
| `HERO_HEADLINE` | `Hero.tsx` | "Lights on. / Power steady. / The licensed crew {{CITY}} calls when it matters." |
| `ABOUT_HEADLINE` | `About.tsx` | "We answer the phone. / We pull the panel cover. / Then we tell you the price." |
| `WHY_TILE_01_ORDINAL` | `WhyChooseUs.tsx` | "01" |
| `WHY_TILE_01_HEADLINE` | `WhyChooseUs.tsx` | "Licensed & insured" |
| `WHY_TILE_02_ORDINAL` | `WhyChooseUs.tsx` | "02" |
| `WHY_TILE_02_HEADLINE` | `WhyChooseUs.tsx` | "24/7 emergency line" |
| `WHY_TILE_03_ORDINAL` | `WhyChooseUs.tsx` | "03" |
| `WHY_TILE_03_HEADLINE` | `WhyChooseUs.tsx` | "Up-front pricing" |
| `WHY_TILE_04_ORDINAL` | `WhyChooseUs.tsx` | "04" |
| `WHY_TILE_04_HEADLINE` | `WhyChooseUs.tsx` | "Master electrician on staff" |
| `CTA_HEADLINE` | `CtaSection.tsx` | "Sparking outlet? Half the house out? / Don't wait. Don't guess." |

---

## Animation philosophy

Light, mechanical, deliberate. Voltage-pulse on the emergency button (red glow 1.6s), filament-glow ambient breath on the Hero (8s, very subtle), float-up on cards (0.5s). Reduced-motion guard kills all animations to ~0.001ms via `prefers-reduced-motion: reduce` in `app/globals.css`. The site reads as a **steady-current** brand — not a flashy one. Animation should feel like a panel meter, not a screensaver.

---

## Inspiration & references

- Service-panel cover labels (the printed strip with circuit numbers and amperage)
- Industrial equipment signage (heavy condensed grotesque, mono detail strips)
- Emergency-services dispatch UIs (hazard color pinned to the high-stakes action only)
- Wiring diagrams and conduit-bracket fittings (corner brackets in ConduitFrame)
- Filament glow at dusk (warm amber breathing slowly behind the dark navy)

---

## Notes for Templates 2 and 3 ELECTRICIANS — DO NOT do

T2 and T3 ELECTRICIANS must pick **fresh visual atoms** and **locked color palettes**. They cannot reuse T1 ELECTRICIANS':

### Reserved atoms (DO NOT reuse names)
- `<PanelLabel />` — breaker-panel-style badge
- `<ConduitFrame />` — corner-bracket image frame
- `<ArcScrim />` — image dim layer (T2/T3 must invent their own dim-layer name and atom)
- `<FilamentGlow />` — atmospheric amber halation
- `<VoltageRule />` — hairline divider with tick mark
- `<CircuitDivider />` — circuit-trace SVG section divider
- `<VoltageMeter />` — vertical-bar SVG glyph
- `<EmergencyButton />` — name reserved (T2/T3 can have an emergency CTA, different name)

### Reserved typography (DO NOT reuse pairing)
- Archivo Black (display) + Inter (body) + JetBrains Mono (mono)
- Display font set in UPPERCASE throughout

### Reserved palette (DO NOT reuse as primary)
- Voltage navy family (`#0a1929` etc.)
- Voltage amber family (`#fbbf24` etc.)
- Arc-flash cyan as accent

### Reserved language tokens (DO NOT reuse)
- "Live", "200A", "breaker", "circuit", "conduit", "panel cover", "service entrance", "wired clean", "code-compliant", "labeled clean"
- "Lights on. Power steady." (Hero) and "Lights stay on. Permits pulled." (Footer manifesto)

### Reserved layout signatures
- PanelLabel as universal section header
- Single hero card Gallery (PLUMBERS pattern — also valid for T2/T3 since spec mandates single GALLERY_1)
- Service grid with image-card on the left + 2x grid on the right (asymmetric 5/7)
- Bottom-right pulsing red emergency button

### Reserved directions for T2 and T3 ELECTRICIANS
- **NEON / LATE NIGHT** — deep black + neon cyan + warm filament glow. Photographic / atmospheric. Stronger 24/7 emergency framing.
- **SPARK / IGNITION** — warm cream + copper wire orange + matte navy. Residential warmth. (Caveat: avoid visual collision with PLUMBERS T1's copper-on-tide; pair copper with a different surface tone.)
- **CURRENT / HIGH POWER** — dark slate + arc-flash blue/cyan + warning amber. Industrial / commercial.
- **GRID / INFRASTRUCTURE** — clinical white + steel grey + voltage blue + safety yellow.
- **OUTLET / RESIDENTIAL** — soft warm grey + copper + cream. Homey + reliable.

T2 and T3 should pick TWO of those, leaving the third as a future option. Pair each with a fresh display font (NOT Archivo Black) and a fresh atom set.

---

## Build status

```
$ pnpm run build
Errors: 0 | Warnings: 0
```

Verified: 46 placeholders kept literal, no heritage-locked copy in user-facing text, no em-dashes in user-facing text, no "Family-Owned", no ETA values, no GALLERY_2 placeholder, no wrong-industry framing (vehicle / garage / plumbing), Resend env fallback present, emailTemplate used by both routes, hydration safety on html+body, cookie button visibility keyed on `!showBanner && !showModal`, ArcScrim dim layer present on Hero / CtaSection / QuoteSection, footer rich with manifesto + 4-col grid + bottom legal strip, photo attachments wired across compressImage / req.formData() / Resend.attachments / emailTemplate "Photos attached" section, anti-double-inversion meta tags in emailTemplate.
