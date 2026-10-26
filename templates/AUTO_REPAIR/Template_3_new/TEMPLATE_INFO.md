# SODIUM LAMP — AUTO_REPAIR / Template_3

## Pitch

A service bay still lit at midnight. The lights stay on so the work can finish.

T3 is the after-hours / night-shift / dramatic-light AUTO_REPAIR template.
Photographic depth, sodium-amber atmosphere on deep slate-navy. Reads like
an editorial automotive photo essay shot during the swing shift, not a
SaaS landing page in dark mode.

## Color palette

Locked across clients. Sodium amber `#e8a14e` is the T3 signature accent and
is NOT overridden by per-client `{{LOGO_COLORS}}` (those are used for subtle
secondary accents only).

| Token              | Hex       | Role                                                              |
| ------------------ | --------- | ----------------------------------------------------------------- |
| `night`            | `#0c1419` | Page background — deep slate-navy / asphalt at night              |
| `night-deep`       | `#080d12` | Footer / deepest surface                                          |
| `surface-1`        | `#141c23` | Section background variant 1                                      |
| `surface-2`        | `#1e2830` | Card / form / elevation 2                                         |
| `slate-line`       | `#2a3540` | Hairlines, borders                                                |
| `chrome`           | `#a8b3bf` | Metallic icon tint, secondary text on dark                        |
| `amber`            | `#e8a14e` | Sodium accent — CTAs, focus rings, glow dots, stars, kicker badges |
| `amber-deep`       | `#c87f30` | Hover state for amber                                             |
| `haze`             | `#f4d8a3` | Warm halation / soft sodium fade — gradients, light-leak overlays |
| `bone`             | `#f0e9d8` | Primary text on dark — warm cream-white, never pure white         |
| `bone-soft`        | `#c9c4b8` | Body text                                                         |
| `mute`             | `#7d7868` | Tertiary text, captions, dates                                    |

Per-client palette: `--color-primary` / `--color-secondary` / `--color-accent`
parsed in `app/layout.tsx` from `{{LOGO_COLORS}}`. Used in subtle places only.

## Typography

| Role                    | Family               | Weights      | Why this and not T1/T2                                                                                                                          |
| ----------------------- | -------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Display                 | Bricolage Grotesque  | 600, 700, 800 | Modern brutalist sans with width-axis personality. NOT condensed (T1 owns Bebas/Rajdhani). NOT slab serif (T2 owns Zilla Slab). Reads editorial. |
| Body                    | Geist Sans           | 400, 500, 600 | Clean modern neutral. NOT Inter (used by both T1 and T2).                                                                                       |
| Photo metadata accent   | Geist Mono           | 400          | ONLY used in tiny photo captions and gallery file tags. NEVER as a hero metadata strip (that pattern belongs to T1).                           |

All loaded via `next/font/google` with `display: "swap"` and exposed as
`--font-display`, `--font-sans`, `--font-mono` CSS variables.

## Sections (in order)

All 12 mandatory sections per claude.md hard rule #4-9, with photographic rhythm:

1. **Header** — sticky, transparent over hero, darkens to `surface-2/95` on scroll
2. **Hero** — full-bleed `{{HERO}}` with vignette + sodium halation, NightTitle headline, dual CTAs, hours strip
3. **TrustBar** — STATIC (NOT marquee — T1 owns marquee) row of 6 universal trust signals separated by GlowDots
4. **Services** — split layout: dark photo with MetaCaption + service grid of AmbientCards with ChromeIcons
5. **About** — sticky text photo essay with parallax `{{ABOUT}}` and StatRow (ASE / OEM / 12-MO)
6. **WhyChooseUs** — 4-column typographic tiles with single GlowDot leading mark + ChromeIcon (NO ordinals)
7. **Gallery** — 2-cell asymmetric grid (`{{GALLERY_1}}` + `{{GALLERY_2}}`) with FRAME mono captions
8. **Reviews** — Google Business badge + 2x2 review grid in AmbientCards with StarRow
9. **QuoteSection** — copy + 4 promise bullets + QuoteForm in AmbientCard
10. **CtaSection** — full-bleed `{{CTA}}` with strong amber halation overlay
11. **ContactSection** — info column with amber-bar separators + ContactForm in AmbientCard
12. **Footer** — `night-deep` surface with HaloRule top, light logo, 4 social icons

## Placeholders used

All 46 placeholders verified literal in source. Confirmed via:

```bash
grep -rE "\{\{[A-Z0-9_]+\}\}" --include="*.tsx" --include="*.ts" .
```

Used: `{{ABOUT}}`, `{{BUSINESS_NAME}}`, `{{BUSINESS_TYPE}}`, `{{CITY}}`,
`{{CTA}}`, `{{EMAIL}}`, `{{FACEBOOK_URL}}`, `{{FULL_ADDRESS}}`, `{{GALLERY_1}}`,
`{{GALLERY_2}}`, `{{GOOGLE_LOGO_URL}}`, `{{GOOGLE_MAPS_URL}}`,
`{{GOOGLE_RATING}}`, `{{GOOGLE_REVIEW_COUNT}}`, `{{GOOGLE_REVIEW_URL}}`,
`{{HERO}}`, `{{HOURS}}`, `{{INSTAGRAM_URL}}`, `{{LOGO_COLORS}}`,
`{{LOGO_URL_DARK}}`, `{{LOGO_URL_LIGHT}}`, `{{PHONE}}`, `{{PHONE_DIGITS}}`,
`{{REVIEW_1}}`–`{{REVIEW_4}}`, `{{REVIEW_1_NAME}}`–`{{REVIEW_4_NAME}}`,
`{{REVIEW_1_STARS}}`–`{{REVIEW_4_STARS}}`, `{{REVIEW_1_DATE}}`–`{{REVIEW_4_DATE}}`,
`{{SERVICES}}`, `{{SERVICES_IMAGE}}`, `{{STATE}}`, `{{TARGET_DESCRIPTION}}`,
`{{TIKTOK_URL}}`, `{{TWITTER_URL}}`, `{{ZIP}}`.

## SLOT markers used

- `SLOT:HERO_KICKER` — pre-title ("OPEN · ON CALL · UNDER THE HOOD")
- `SLOT:HERO_HEADLINE` — atmospheric statement headline
- `SLOT:HERO_SUBLINE` — 2-line value-prop sub-headline

Other section copy is treated as "creative direction" rather than slot —
rewritten by hand at customization time when needed, but the defaults are
already 100% business-age agnostic.

## Animation philosophy

**Atmospheric over animated.** Slow fade-up reveals (700ms cubic-bezier) on
section enter, gentle halo-pulse on the bottom-left cookie button, and
hover states that brighten the amber glow on CTAs (no scale, no spring).
Photos rely on still-image vignette + halation rather than animated parallax,
which keeps `prefers-reduced-motion` clean and avoids motion-sickness on
long scrolls. Header transitions transparency on scroll past 80px.

The reduced-motion guard in `globals.css` cuts all animation duration to
0.01ms, so anyone with the OS setting on sees the site as a still photograph.

## Inspiration

- Sodium-lit gas-station photography (Jeff Brouws, William Eggleston night work)
- Wim Wenders night-road compositions (Paris, Texas)
- Premium automotive editorial (Drive Tribe, The Drive long-form)
- Service-bay night-shift documentary photography

NOT: motorsport HUD telemetry (T2-v1 rejected territory), boutique magazine
editorial, SaaS dark-mode landing pages, wedding portfolio dark hero.

## Notes for future templates / categories (DO NOT do)

This list grows with each template shipped. Anything below is OWNED by an
existing AUTO_REPAIR template and CANNOT be reused in ELECTRICIANS T1/T2/T3
or PLUMBERS T1/T2/T3 if those categories aim to break out of the dark/cream/
heritage triangle. The atoms can be re-used WITHIN the same category only
when planning a new sub-variant.

### Owned by Template_1 — BAY 04 / GARAGE FLOOR

- Matte black `#0a0a0a` / charcoal / carbon as primary surface
- Hazard yellow `#facc15 / #fbbf24` family as accent color
- Bebas Neue, Rajdhani, Oswald, Anton, condensed industrial display sans
- JetBrains Mono / Space Mono as a "telemetry / metadata strip" element
- Sections numbered like "BAY 01", "SECTOR 04", "STATION 07"
- Hazard tape / diagonal yellow-and-black warning band as a divider
- Marquee / infinite-scroll ticker as the trust bar pattern
- Concrete-grain background texture
- Monospace work-order metadata strips ("ORDER #2847 · STATUS: OPEN")
- Industrial workshop interface / garage floor framing
- Component names: `BayLabel`, `SectorLabel`, `RpmFrame`, `TelemetryRow`, `HazardDivider`

### Owned by Template_2 — HERITAGE WORKSHOP

- Cream / off-white / paper / eggshell / warm beige as primary surface
- Forest green `#1f3a2e` family as primary structural accent
- Clay / terracotta `#9c5d3a` family as secondary accent
- Zilla Slab / any American slab-serif display
- Clay chevron triangle as section-label leading mark
- Clay enamel placards as overlay callouts on images
- Roman numeral ordinals (i, ii, iii, iv) in italic
- Tool-icon trust pills (Wrench / Cog / Gauge prefixed small-caps items)
- Service strip pre-titles ("Service · Diagnostic · Repair")
- Headline copy register: "Pull in", "Under the hood", "All Makes · All Models"
- "Heritage / neighborhood / 50-year-old shop / two generations" narrative
- LocalBadge stamps / floating-card overlays on photos
- Hand-painted shop signage aesthetic
- Component names: `SectionLabel`, `SignTitle`, `LocalBadge`, `PaperCard`, `ServiceMark`, `Hairline`, `ChevronTriangle`

### Owned by Template_3 — SODIUM LAMP (this template)

- Deep slate-navy `#0c1419` / asphalt-blue-black as primary surface
- Sodium amber `#e8a14e` as primary signature accent
- Warm haze `#f4d8a3` as halation / light-leak gradient color
- Bone-cream `#f0e9d8` as primary text (never pure white)
- Bricolage Grotesque (display) + Geist (body) + Geist Mono (photo metadata) pairing
- After-hours / night-shift / lit-bay-at-midnight framing
- Sodium-vignette + warm halation overlay pattern (`HazeOverlay`)
- Photographic-rhythm transitions (image-anchored sections alternating with type-led)
- Hero copy register: "It is a Tuesday and your car will not start."
- CTA copy register: "When the lights are on, we are working."
- GlowDot (6px amber pinprick with sodium halo) as the universal leading mark
- HaloRule (slate hairline with amber radial fade-out at one end) as divider
- AmbientCard (slate-gradient surface with slate-line border) as panel surface
- Cinematic still-image atmospherics over animated motion
- Component names: `NightTag`, `NightTitle`, `HaloRule`, `AmbientCard`, `SodiumButton`, `GhostButton`, `ChromeIcon`, `NightStar`, `HazeOverlay`, `MetaCaption`, `GlowDot`, `StatRow`

### Lanes still OPEN for ELECTRICIANS / PLUMBERS T1-T3

- Electric blue + voltage yellow + copper / brushed steel direction (ELECTRICIANS-native)
- Water-blue + ocean-tone + brass + flow-vector direction (PLUMBERS-native)
- Diagrammatic / blueprint-line / schematic direction
- High-contrast neon / signage / late-night-call-out direction (CAREFUL: must not collide with T3 SODIUM LAMP — different palette and different framing required)
- Field-safety / dispatch / fleet-route direction

### Forbidden across all categories (claude.md hard rule #17)

- Editorial magazine / boutique stationery / vintage library
- Service-manual cream paper with serif italic
- SaaS landing page (gradients, illustrations, equal-column feature cards)
- Wedding photographer portfolio
- Family-owned / since-19XX / heritage / neighborhood-institution copy

## Component file structure

```
components/
├── Header.tsx
├── Hero.tsx
├── TrustBar.tsx
├── Services.tsx
├── About.tsx
├── WhyChooseUs.tsx
├── Gallery.tsx
├── Reviews.tsx
├── QuoteSection.tsx
├── CtaSection.tsx
├── ContactSection.tsx
├── Footer.tsx
├── CookieConsent.tsx
├── forms/
│   ├── QuoteForm.tsx
│   └── ContactForm.tsx
└── ui/
    ├── Logo.tsx
    ├── NightTag.tsx
    ├── NightTitle.tsx
    ├── HaloRule.tsx
    ├── AmbientCard.tsx
    ├── SodiumButton.tsx
    ├── GhostButton.tsx
    ├── ChromeIcon.tsx
    ├── NightStar.tsx        (exports NightStar + StarRow)
    ├── HazeOverlay.tsx
    ├── MetaCaption.tsx
    ├── GlowDot.tsx
    ├── StatRow.tsx
    ├── TikTokIcon.tsx
    └── XIcon.tsx
```

## Tech stack (per claude.md hard rule #13)

- Next.js 15.1.4 App Router + TypeScript 5
- Tailwind CSS v3.4 (NOT v4)
- React 19
- pnpm
- Lucide React for icons (except TikTok / X)
- Framer Motion v11 (used sparingly — prepared, not heavily exercised)
- react-hook-form + @hookform/resolvers + zod for forms
- Resend v4 for transactional email
- Google Fonts via `next/font/google`: Bricolage Grotesque, Geist, Geist Mono
- @fortawesome/* for X (Twitter) brand glyph
