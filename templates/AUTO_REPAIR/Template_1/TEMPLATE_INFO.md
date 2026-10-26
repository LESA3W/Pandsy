# TEMPLATE_INFO — AUTO_REPAIR / Template_1

## Style — "BAY 04 / GARAGE FLOOR"

**An industrial workshop interface.** The site IS the garage: bay numbers, hazard tape, inspection-card grids, and monospace work-order metadata — pulled from real shop interiors instead of an outsider's idea of "auto."

## Color palette

Three colors are per-client (injected from `{{LOGO_COLORS}}` via CSS vars in `app/layout.tsx`):

| Token | CSS var | Source |
|---|---|---|
| Primary | `--color-primary` | `{{LOGO_COLORS}}[0]` — drives focus rings, selection |
| Secondary | `--color-secondary` | `{{LOGO_COLORS}}[1]` |
| Accent | `--color-accent` | `{{LOGO_COLORS}}[2]` |

The visual identity rests on **locked workshop neutrals + a hardcoded hazard yellow** so the workshop signal stays consistent regardless of client palette:

| Token | Hex | Usage |
|---|---|---|
| `ink` | `#0a0a0a` | Page background, primary text on light |
| `ink-panel` | `#171717` | Section panels, form fields |
| `ink-border` | `#262626` | Hairlines, dividers |
| `ink-rule` | `#404040` | Stronger rules, scrollbar |
| `ink-mute` | `#a3a3a3` | Mid-gray utility |
| `cream` | `#fafafa` | Primary text on dark |
| `bone` | `#e5e5e5` | Soft text |
| `hazard` | `#facc15` | THE workshop signal — bay markers, CTAs, hazard tape |

## Typography pairing

| Role | Family | Why |
|---|---|---|
| Display | **Bebas Neue** (400) | Condensed, signage-style — the visual grammar of bay-number stencils, shop signage, and license-plate-adjacent letterforms. |
| Subhead / data | **JetBrains Mono** | Monospace authority — work orders, inspection printouts, telemetry strips. Every "REPORT #4471 · 5/5"-style metadata line is mono. |
| Body | **Inter** | Clean modern sans for paragraphs, forms, and legal copy. Legibility above all. |

Loaded via `next/font/google` with `display: "swap"` and CSS-variable bindings consumed by `tailwind.config.ts`.

## Sections (in order, with bay assignments)

| # | Component | Bay # | Layout call |
|---|---|---|---|
| 1 | `Header.tsx` | (chrome) | Sticky, transparent → matte-black on scroll. Logo always uses `LOGO_URL_LIGHT` (header background is dark in both states). |
| 2 | `Hero.tsx` | BAY 01 | Full-bleed image[0], massive Bebas headline, mono sub-strip, two CTAs, work-order metadata grid at bottom. |
| 3 | `TrustBar.tsx` | (transition) | Slow horizontal marquee with 8 universal trust signals separated by rotated hazard squares. |
| 4 | `Services.tsx` | BAY 04 | Asymmetric two-column. Left: heading + image[2] in clipped corner frame. Right: inspection-card grid of all parsed services with Lucide icons. |
| 5 | `About.tsx` | BAY 05 | Two-column split. Image[1] in clipped frame with floating "LOCAL · {{CITY}}" badge. Right: copy + 3-stat dashboard. |
| 6 | `WhyChooseUs.tsx` | BAY 06 | 4-tile grid with massive hazard ordinals (01-04), Lucide icons, slot headlines and descriptions. |
| 7 | `Gallery.tsx` | BAY 07 | **2 cells** (per AUTO_REPAIR spec) using image[3] & image[4]. Asymmetric heights, mono caption strip with "REC" indicator. |
| 8 | `Reviews.tsx` | BAY 08 | 3 testimonial cards in inspection-report style with `REPORT #` headers and 5-star strips. |
| 9 | `QuoteSection.tsx` | BAY 09 | Background image[2] darkened. Left: pitch + bullets. Right: full quote form with vehicle make/model/year. |
| 10 | `CtaSection.tsx` | BAY 10 | Full-bleed image[5] with hazard-tape borders top and bottom. Massive headline + dual CTAs. |
| 11 | `ContactSection.tsx` | BAY 11 | Two-column. Left: address/phone/email/hours rows with hazard-yellow left borders. Right: contact form. |
| 12 | `Footer.tsx` | (chrome) | Hazard-tape divider on top. Logo + tagline + nav + contact + legal links. |

The numbering deliberately has gaps (01 → 04, etc.) — real garages have non-contiguous bay numbers and that asymmetry sells the authenticity.

## Placeholders used (verified via grep)

15 of the 16 fixed placeholders are referenced in source. `{{ZIP}}` is omitted because `{{FULL_ADDRESS}}` already includes the postal code.

```
{{BUSINESS_NAME}}        {{BUSINESS_TYPE}}      {{CITY}}
{{STATE}}                {{FULL_ADDRESS}}       {{PHONE}}
{{PHONE_DIGITS}}         {{HOURS}}              {{SERVICES}}
{{TARGET_DESCRIPTION}}   {{LOGO_URL_LIGHT}}     {{LOGO_URL_DARK}}
{{LOGO_COLORS}}          {{BUSINESS_IMAGES}}    {{EMAIL}}
```

## SLOT markers used (rewritable per client at customization time)

```
SLOT:HERO_HEADLINE             SLOT:HERO_SUBLINE
SLOT:SERVICES_INTRO            SLOT:SERVICE_BLURB_1..N   (one per parsed service)
SLOT:ABOUT_BODY
SLOT:WHY_TILE_1_HEADLINE       SLOT:WHY_TILE_1_BODY
SLOT:WHY_TILE_2_HEADLINE       SLOT:WHY_TILE_2_BODY
SLOT:WHY_TILE_3_HEADLINE       SLOT:WHY_TILE_3_BODY
SLOT:WHY_TILE_4_HEADLINE       SLOT:WHY_TILE_4_BODY
SLOT:GALLERY_INTRO
SLOT:REVIEW_1_BODY             SLOT:REVIEW_2_BODY        SLOT:REVIEW_3_BODY
SLOT:QUOTE_HEADLINE            SLOT:QUOTE_BODY
SLOT:CTA_HEADLINE              SLOT:CTA_BODY
```

Each fallback uses only the 16 placeholders + universally applicable copy so the template renders sensibly even before any SLOT rewrite.

## Animation philosophy

**Mechanical, not theatrical.** Most motion is 200-300ms fades and small translates (`hover:translate-x-1`, `group-hover:-translate-y-0.5`). The single longer animation is the trust-bar marquee (38s linear loop) which evokes a slow shop-sign ticker rather than a flashy carousel. CTAs respond to hover with explicit color/border transitions instead of scaling. All animations respect `prefers-reduced-motion` via the global rule in `globals.css` that flattens durations to ~0ms when the user has reduced-motion preferred.

## Creative choices specific to "BAY 04 / GARAGE FLOOR"

The premise is that a real garage interior has a visual language nobody steals: a **bay number, a hazard stripe, a metadata strip on every work order, a clipboard-grade monospace font for the things that matter, and concrete grain everywhere.** I leaned into all of them. Every section gets a `<BayLabel n="0X" title="…" meta="…" />` so the workshop frame is unmistakable, and the hazard yellow `#facc15` shows up wherever the user has to make a decision (CTAs, focus rings, ordinals, REC indicators) so the eye is trained to follow it. The image treatments (40-60% opacity over deep matte gradients) make photography feel like security-camera frames from the shop floor, which is the look I wanted. The metadata strips (`ORDER #2847 · STATUS: OPEN · ETA: 14 MIN`, `REPORT #4471`, `FORM ID: QUOTE-001`) are fake-but-believable shop telemetry — they cost nothing visually but cement the universe.

The thing this template **doesn't do** is also the point: no italic serif headlines, no cream paper backgrounds, no editorial pull-quotes, no SaaS gradient blobs, no vintage stamps, no "service manual" framing. Those lanes are open for Template_2 (motorsport telemetry HUD direction) and Template_3 (something more aggressive again).

## Inspiration / references

- Real shop signage and bay-numbering paint at independent garages.
- Industrial control-panel aesthetics (the legible kind, not retro skeuomorphism).
- Monospaced engineering documents — work orders, inspection sheets, dyno printouts.
- Construction-site hazard tape as a UI motif.

## Notes for future templates in this category

- **Template_2** should claim the **motorsport / telemetry HUD** lane (red + carbon black + chrome + telemetry green; tachometer rings; sector-time strips). It's the most distinct visual territory left and it speaks to performance-shop clients.
- **Template_3** should go a different direction entirely — maybe a **dealership-grade premium service** look (deep navy + brass + warm white + heavy serif headlines) for clients who position upmarket. Keep the workshop signals subtle so it doesn't compete with Template_1.
- All three should keep the same 12-section order, same forms, same legal pages, same dual-logo system, and same 16-placeholder contract — only the visual language should change.



