# Template_3 ELECTRICIANS — HOT WIRE / LIVE EDITORIAL

## One-line pitch

Editorial cream surface, deep crimson live-wire stamp atoms, copper bus-bar hairlines. The licensed master electrician who hand-stamps every job ticket.

---

## Color palette

Tokens locked independent of `{{LOGO_COLORS}}` so the visual system stays coherent across clients with different brand colors.

| Token | Hex | Role |
|-------|-----|------|
| `cream.DEFAULT` | `#f7f1e8` | Primary surface (warm cream, NOT T2 clinical paper) |
| `cream.deep` | `#ede5d6` | Raised cream / stamp base |
| `cream.rule` | `#dcd1bd` | Hairline rule on cream |
| `cream.tint` | `#fbf6ee` | Lightest wash |
| `ink.DEFAULT` | `#0d0d0e` | Matte black ink (headlines, body) |
| `ink.deep` | `#020203` | Deepest matte (scrim base) |
| `ink.panel` | `#1a1a1c` | Raised matte panel (footer, dark sections) |
| `ink.mute` | `#6b6661` | Mute body text on cream |
| `ash.DEFAULT` | `#5a5550` | Warm ash secondary text |
| `ash.deep` | `#3d3935` | Deep ash |
| `crimson.DEFAULT` | `#b8252b` | Live-wire primary accent |
| `crimson.deep` | `#7d161b` | Pressed crimson |
| `crimson.glow` | `#d63a40` | Lifted crimson |
| `crimson.tint` | `#f4d4d6` | Light wash on cream |
| `ember.DEFAULT` | `#d94c1f` | Copper-orange secondary accent |
| `copper.DEFAULT` | `#c87f3f` | Bus-bar copper hairlines + marks |
| `copper.deep` | `#945a26` | Pressed copper |
| `copper.glow` | `#e3a268` | Lifted copper |
| `copper.tint` | `#f0d8b8` | Soft copper wash |

Per-client `{{LOGO_COLORS}}` are parsed in `app/layout.tsx` per claude.md hard rule #16 and exposed as `--color-primary` / `--color-secondary` / `--color-accent` CSS vars.

---

## Typography

Distinct from T1 UPPERCASE Archivo Black + Inter + JetBrains Mono and T2 regular-case Space Grotesk + Inter Tight + IBM Plex Mono.

| Role | Font | Notes |
|------|------|-------|
| Display | **Fraunces** (weights 500/700/900) | Slab-soft variable serif, editorial-bold register. NEVER uppercased — keeps mixed-case editorial register. |
| Body | **Mona Sans** (weights 400/500/600) | Confident humanist sans. NOT Inter or Inter Tight. |
| Mono | **Geist Mono** (weights 400/500) | Clean modern monospace. NOT JetBrains Mono, NOT IBM Plex Mono. |

Loaded via `next/font/google` and exposed as `--font-display` / `--font-sans` / `--font-mono` CSS vars referenced from `tailwind.config.ts`.

---

## Sections (claude.md mandated order)

1. **Header** — cream surface, transparent → solid on scroll, Fraunces nav, crimson "Free quote" CTA.
2. **Hero** — asymmetric editorial: full-bleed `{{HERO}}` right with `<InkScrim />` MANDATORY dim layer + `<EmberHalo />` warm halation; Fraunces 5xl/8xl headline; crimson "Get a free quote" + bordered "Call now" CTAs; inline `<HotlinePlate />` for mobile.
3. **TrustBar** — static crimson ribbon with `<SparkMark />` separators, Geist Mono uppercase trust items.
4. **Services** — 2-row editorial: full-bleed `{{SERVICES_IMAGE}}` row 1 (with `<InkScrim />` + `<StampMark />` overlay) and 4 service cards row 2.
5. **About** — split: `{{ABOUT}}` in `<EditorialFrame />` left, Fraunces headline + ash body + 3 proof-point strip right.
6. **WhyChooseUs** — 3 editorial proof columns separated by `<LiveWireGlyph />` hooks.
7. **Gallery** — single landscape `{{GALLERY_1}}` in `<EditorialFrame />` (NO GALLERY_2 per claude.md #14).
8. **Reviews** — Google Business badge + 2x2 grid of review cards with `<StarRow />` crimson stars + italic Fraunces quotes.
9. **QuoteSection** — split: editorial intro + `<QuoteForm />` on cream-deep surface, top crimson stripe.
10. **CtaSection** — full-bleed `{{CTA}}` with `<InkScrim />` MANDATORY dim layer + `<RibbonDivider />` + `<EmberHalo />`; Fraunces 6xl headline + 2 CTAs. Preceded by a `<RibbonDivider />`.
11. **ContactSection** — split: business info card + `<ContactForm />`.
12. **Footer** — RICH per claude.md #4b: manifesto block + 4 social icons, 4-col info grid (Where we stamp / Reach the bench / Hours we work / Site map), atmospheric crimson `<EmberHalo />`, bottom legal strip.

---

## Placeholders used (44 of 46)

```
{{ABOUT}} {{BUSINESS_NAME}} {{BUSINESS_TYPE}} {{CITY}} {{CTA}} {{EMAIL}}
{{FACEBOOK_URL}} {{FULL_ADDRESS}} {{GALLERY_1}} {{GOOGLE_LOGO_URL}}
{{GOOGLE_MAPS_URL}} {{GOOGLE_RATING}} {{GOOGLE_REVIEW_COUNT}} {{GOOGLE_REVIEW_URL}}
{{HERO}} {{HOURS}} {{INSTAGRAM_URL}} {{LOGO_COLORS}} {{LOGO_URL_DARK}}
{{LOGO_URL_LIGHT}} {{PHONE}} {{PHONE_DIGITS}} {{REVIEW_1}} {{REVIEW_1_DATE}}
{{REVIEW_1_NAME}} {{REVIEW_1_STARS}} {{REVIEW_2}} {{REVIEW_2_DATE}}
{{REVIEW_2_NAME}} {{REVIEW_2_STARS}} {{REVIEW_3}} {{REVIEW_3_DATE}}
{{REVIEW_3_NAME}} {{REVIEW_3_STARS}} {{REVIEW_4}} {{REVIEW_4_DATE}}
{{REVIEW_4_NAME}} {{REVIEW_4_STARS}} {{SERVICES}} {{SERVICES_IMAGE}}
{{STATE}} {{TARGET_DESCRIPTION}} {{TIKTOK_URL}} {{TWITTER_URL}} {{ZIP}}
```

`GALLERY_2` is not used (ELECTRICIANS only has `GALLERY_1` per claude.md #14).

---

## SLOT markers used

| SLOT | Section | Purpose |
|------|---------|---------|
| `HERO_HEADLINE` | Hero | 4-line editorial headline. |
| `HERO_SUBHEAD` | Hero | One-paragraph subhead. |
| `SERVICES_HEADLINE` | Services | Editorial headline above the services grid. |
| `ABOUT_HEADLINE` | About | Three-clause editorial headline. |
| `ABOUT_BODY` | About | Two-paragraph editorial body block. |

Pipeline rewrites the inner copy at customization time per claude.md hard rule #8.

---

## Animation philosophy

Editorial-bold, deliberate. Light **stamp-press** micro-animation on stamp atoms (0.22s scale 1→0.97 on tap), subtle warm **halo-breath** on Hero / Footer (`<EmberHalo />`, 9s ease), 2.4s **wire-pulse** on the live-wire dot inside `<HotlineRail />` and `<HotlinePlate />`, 0.5s **rise-up** on cards. All motion respects `prefers-reduced-motion: reduce`.

---

## Reserved language tokens

- "Live wire", "hotline", "hand-stamped", "code-stamped", "permits in hand", "ticket open", "ticket book", "we hand the ticket", "wired right" (alone, not in T2's phrase "Power up. Wired right.")
- Hero manifesto: `Live wire. / Hand-stamped. / The crew {{CITY}} keeps on call.`
- Footer manifesto: `We stamp the work. We pull the permits. We pick up the phone.`
- Trust register: "Licensed Master Electrician · Bonded & Insured · Up-Front Pricing · 24/7 Emergency · Permits Pulled · NEC Certified · Code-Stamped Work · Local to {{CITY}}"

---

## Inspiration / references

- Editorial print culture (Apartamento Magazine, Aperture, The Drift) for the slab-soft serif + ribbon stripe combination.
- Hand-stamp aesthetics from independent letterpress shops (Hatch Show Print, Yee-Haw Industries) for the `<StampMark />` rotation + crimson ink.
- Modern editorial-residential interfaces that lean warm rather than clinical.

The intent is "electrician who keeps a hand-stamped ticket book" — not "stationery boutique" and not "literary magazine".

---

## Notes for future ELECTRICIANS templates / categories

T1, T2, and T3 ELECTRICIANS collectively own the following — DO NOT REUSE in any future ELECTRICIANS template (Template_4 if it ever exists, or in cross-category templates that share the electrical-universe vocabulary):

### Reserved component names (26 atoms across T1 + T2 + T3)

- T1: `<PanelLabel />`, `<ConduitFrame />`, `<ArcScrim />`, `<FilamentGlow />`, `<VoltageRule />`, `<CircuitDivider />`, `<VoltageMeter />`, `<EmergencyButton />`
- T2: `<BlueprintCell />`, `<SchematicMark />`, `<TargetMarker />`, `<MeasureRule />`, `<SafetyTape />`, `<SchematicFrame />`, `<GridScrim />`, `<GridGlow />`, `<EmergencyBanner />`
- T3: `<StampMark />`, `<HotlinePlate />`, `<HotlineRail />`, `<CopperRule />`, `<RibbonDivider />`, `<EmberHalo />`, `<InkScrim />`, `<EditorialFrame />`, `<SparkMark />`, `<LiveWireGlyph />`

### Reserved typography pairings (3)

- T1: Archivo Black + Inter + JetBrains Mono UPPERCASE
- T2: Space Grotesk + Inter Tight + IBM Plex Mono regular case
- T3: Fraunces + Mona Sans + Geist Mono mixed-case editorial

### Reserved primary palettes (3)

- T1: voltage navy + voltage amber + arc cyan + emergency red
- T2: paper white + sapphire + hazard yellow + alert red
- T3: warm cream + matte ink + deep crimson + bus-bar copper

### Reserved emergency CTA placements (3)

- T1: bottom-right pulsing red circle button
- T2: top-anchored red alert band (scrolls with page)
- T3: vertical LEFT-edge sticky rail with phone digits stacked

A 4th ELECTRICIANS template would need: a 4th typography pairing, a 4th primary palette, a 4th set of atom names, AND a 4th emergency CTA placement (e.g. footer ribbon, hero metadata sidebar, sliding-bottom-left, embedded HotlineCard in contact). And the language register must be its own (T3 took editorial-stamp, T2 took blueprint-spec, T1 took panel-cover).

### Reserved language phrases (no overlap)

- T1: "Live", "200A", "breaker", "circuit", "conduit", "panel cover", "service entrance", "wired clean", "code-compliant", "labeled clean", "Lights on. Power steady.", "Lights stay on. Permits pulled."
- T2: "From outlet to grid", "Tested. Tagged. Trusted.", "Sheet-XX", "spec-sheet", "blueprint", "drawings filed", "title block", "We sign the work.", "Power up. Wired right.", "We answer the phone."
- T3: "Hand-stamped", "ticket book", "ticket open", "we hand the ticket", "stamp the work", "We stamp the work. We pull the permits. We pick up the phone.", "Live wire. Hand-stamped.", "crimson tag"

### What works universally (never reserved)

- ELECTRICIANS Lucide icon mapping (`panel→ShieldCheck`, `lighting→Lightbulb`, etc.) per claude.md #15 — shared across all templates.
- The 5-image plan (HERO, ABOUT, SERVICES_IMAGE, GALLERY_1, CTA — no GALLERY_2) per claude.md #14.
- The 8-field QuoteForm schema (name, email, phone, address, propertyType, urgency, service, message) — claude.md #14b.
- Photo upload architecture per claude.md #14c (5 photos, 1 MB / 3.5 MB caps, JPEG @ 1600px compression).
- 2x2 Reviews grid + Google Business badge.
- Trust signal vocabulary: Licensed Master Electrician, Bonded & Insured, Up-Front Pricing, 24/7 Emergency, Permits Pulled, NEC Certified, BBB A+ Rated, Local to `{{CITY}}`, EVITP-Certified Installers, Lifetime Workmanship Warranty, Code-Compliant Work.
- Forbidden copy patterns from claude.md #11 (em-dashes, "Family-Owned", ETAs, heritage claims) — universally banned.
