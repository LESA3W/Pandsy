# Template_2 — HERITAGE WORKSHOP

## Style name and pitch

**HERITAGE WORKSHOP** — *the front office of a 50-year-old neighborhood shop at 8 AM, with morning light coming through the bay door.*

A light-mode auto-repair template anchored on warm cream paper, deep forest green, and sun-faded clay. Reads like a hand-painted shop sign maintained for two generations. Aimed at owner-operated shops that compete on trust and craft, not throughput.

---

## Color palette

| Token | Hex | Role |
|---|---|---|
| `cream` | #faf6ef | Page background, primary surface |
| `paper` | #ffffff | Card surfaces, form fields |
| `forest` | #1f3a2e | Primary structural accent — section labels, headlines, primary buttons |
| `forest-deep` | #122019 | Hover state, footer surface, dark CTA section background |
| `ink` | #1a1a17 | Primary text on cream (warm near-black) |
| `ink-soft` | #4a463f | Body text |
| `ink-mute` | #8a8378 | Tertiary copy, captions, dates |
| `clay` | #9c5d3a | Sun-faded terracotta — secondary CTA accent, marker dots, hover underlines |
| `clay-deep` | #6e3f24 | Clay hover state |
| `stone` | #d6cfc1 | Hairline dividers, borders |
| `stone-soft` | #ebe5d8 | Alternate panel surface (trust signals row, About section) |
| `primary` / `secondary` / `accent` | from `{{LOGO_COLORS}}` | Per-client logo color hooks |

The page surface is locked at `cream` (light), satisfying the absolute interdiction on dark-mode primary surfaces.

---

## Typography pairing

| Role | Family | Weights | Rationale |
|---|---|---|---|
| Display | **Zilla Slab** | 400, 500, 600, 700 | American slab serif. Reads as hand-painted shop sign. NOT condensed industrial signage, NOT editorial italic. |
| Body | **Inter** | 400, 500, 600 | Clean, comfortable, neutral. Lets the slab carry the personality. |

No monospace face. Mono is owned by Template_1's telemetry signature and is explicitly forbidden as a metadata-strip element here.

Both loaded via `next/font/google` with `display: "swap"` and exposed as `--font-display` + `--font-sans` CSS variables.

---

## Sections used (in order)

All 12 mandatory sections present. None fused. Renamed where the original name belonged to a Template_1 visual atom.

1. **Header** — sticky, cream surface, logo defaults to `{{LOGO_URL_DARK}}`
2. **Hero** — photo-led split. Service strip pre-title (`Wrench · Service / Gauge · Diagnostic / ShieldCheck · Repair`). Massive Zilla Slab statement. 2 CTAs. Address + Hours row with icons. Hero image carries two enamel-style placards: "Open. Walk-ins welcome." (top-right) and "ASE Certified · All Makes · All Models" (bottom-left overlap).
3. **TrustSignals** — static typographic row on stone-soft surface. Each pill has a small clay Lucide tool icon (BadgeCheck, ShieldCheck, ClipboardCheck, Receipt, Clock, MapPin). NOT a marquee.
4. **Services** — section label "Under the hood." Asymmetric grid: wide service image with a "Foreign · Domestic · Light truck / ALL MAKES" placard overlay + 8 service cards parsed from `{{SERVICES}}`.
5. **AboutStory** — story-driven 2-col with founder portrait, narrative, 3 stat blocks, LocalBadge floating over the image edge
6. **ShopValues** — 4 typographic value tiles numbered with small Roman numerals (i, ii, iii, iv) in clay italic
7. **Workmanship** — 2-cell asymmetric gallery (`{{GALLERY_1}}` wide + `{{GALLERY_2}}` narrow). Top-left mini-tags on each image (Wrench / Cog icons) and small-caps figcaptions reading "Service floor · {{CITY}}" and "Workshop · {{CITY}}".
8. **Reviews** — Google Business badge + mandatory 2x2 grid, "Leave a review" → `{{GOOGLE_REVIEW_URL}}`
9. **QuoteSection** — copy + bullet list left, QuoteForm in a PaperCard right
10. **CtaSection** — the one dark moment, full-bleed `{{CTA}}` + forest-deep overlay. Pre-title strip "Walk-ins · Tow-ins · Same-day service." Slab statement "Pull in. We will take it from there."
11. **ContactSection** — address/phone/email/hours with clay left-bars + ContactForm in PaperCard
12. **Footer** — forest-deep surface, logo switches to `{{LOGO_URL_LIGHT}}`, 4 social icons, year via `useEffect`

### Recurring shop-signage micro-atoms (reused across sections)

- **Chevron triangle** — every `SectionLabel` opens with a 10×10 clay triangle pointing right, like a directional sign on a garage wall
- **Clay enamel placards** — small `bg-paper`/`bg-cream` cards with shadow-paper, used as overlay callouts on Hero + Services + Workmanship images. Read like enamel signs nailed to a shop wall.
- **Mechanical pre-titles** — Hero opens with `Service · Diagnostic · Repair` (icons + small caps). CtaSection opens with `Walk-ins · Tow-ins · Same-day service`. Both replace generic SectionLabel framing in their respective sections.
- **Lucide tool iconography** — Wrench, Cog, Gauge, ShieldCheck, BadgeCheck, ClipboardCheck used as semantic anchors throughout. Always sized 12-16px in clay or forest, never decorative.

---

## All 46 placeholders used

Verified via `grep -rohE "\{\{[A-Z0-9_]+\}\}"`:

`{{ABOUT}}`, `{{BUSINESS_NAME}}`, `{{BUSINESS_TYPE}}`, `{{CITY}}`, `{{CTA}}`, `{{EMAIL}}`, `{{FACEBOOK_URL}}`, `{{FULL_ADDRESS}}`, `{{GALLERY_1}}`, `{{GALLERY_2}}`, `{{GOOGLE_LOGO_URL}}`, `{{GOOGLE_MAPS_URL}}`, `{{GOOGLE_RATING}}`, `{{GOOGLE_REVIEW_COUNT}}`, `{{GOOGLE_REVIEW_URL}}`, `{{HERO}}`, `{{HOURS}}`, `{{INSTAGRAM_URL}}`, `{{LOGO_COLORS}}`, `{{LOGO_URL_DARK}}`, `{{LOGO_URL_LIGHT}}`, `{{PHONE}}`, `{{PHONE_DIGITS}}`, `{{REVIEW_1}}` through `{{REVIEW_4}}`, `{{REVIEW_1_NAME}}` through `{{REVIEW_4_NAME}}`, `{{REVIEW_1_STARS}}` through `{{REVIEW_4_STARS}}`, `{{REVIEW_1_DATE}}` through `{{REVIEW_4_DATE}}`, `{{SERVICES}}`, `{{SERVICES_IMAGE}}`, `{{STATE}}`, `{{TARGET_DESCRIPTION}}`, `{{TIKTOK_URL}}`, `{{TWITTER_URL}}`, `{{ZIP}}`.

---

## SLOT markers used

None. All copy lives directly in the components and uses only the 46 placeholders above. If a future client requires copy adaptation beyond placeholder substitution, SLOT comments can be added without restructuring.

---

## Animation philosophy

**Confident stillness with hand-feel transitions.**

- Section reveals: opacity + 6px translate-y. Subtle, never theatrical.
- Hover states: solid color shifts only (`forest`→`forest-deep`, `clay`→`clay-deep`). No glow, no scale-110, no neon.
- Section-label rule: 32px wide, extends to 48px when section enters view.
- CTA buttons: 150ms ease color transitions.
- No marquee, no scan band, no telemetry pulse.
- Respects `prefers-reduced-motion` (all transitions disabled in `globals.css`).

The site reads as someone with confidence. Not someone trying to impress with motion.

---

## Inspiration / references

- Hand-painted shop signage on independent garages along Route 66 and surrounding back roads.
- Editorial-style typography executed with structural slabs instead of decorative serifs.
- Estate-sale ledger books and parts-counter inventory cards (the proportions, not the texture).
- Independent specialty shops (cobbler, tailor, butcher) where the storefront has not been redesigned in 30 years and that is the point.

---

## Notes for Template_3 (DO NOT do)

Template_1 owns:
- Matte black + hazard yellow + per-client logo accents
- Bebas Neue + JetBrains Mono + Inter
- Bay numbering, hazard-tape dividers, monospace work-order metadata strips
- Concrete-grain background
- Industrial signage / garage-floor framing
- Marquee trust bar

Template_2 (this one) owns:
- Cream + forest green + clay terracotta + stone
- Zilla Slab + Inter (slab serif display, no mono)
- Story-driven narrative blocks, paper cards, hand-feel hairline dividers
- LocalBadge stamp, small-cap section labels with extending forest rule
- Roman-numeral subtle ordinals (i, ii, iii, iv) in clay italic
- "Heritage / neighborhood institution" framing
- **Clay chevron triangle** as the leading mark on every SectionLabel (shop-signage cue)
- **Clay enamel placards** on hero + services + gallery images (paper card overlays with tool icons)
- **Service strip pre-titles** (e.g. `Wrench · Service / Gauge · Diagnostic / ShieldCheck · Repair`) used in Hero and CtaSection
- **"All Makes · All Models" callout language** with associated visual treatment
- **Tool-icon trust pills** (Lucide tool icons next to every TrustSignals item)
- **Mechanical hero copy register** ("Pull in. We will take it from there." / "Under the hood")

Template_3 should claim a different lane that still feels auto-repair authentic. Pre-reserved by Template_1's notes:
- **Dealership-grade premium service** — deep navy + brass + warm white + heavy serif headlines. Upmarket positioning for shops that compete on luxury fleet care, German tuning, or precision specialty work.

Other open lanes to consider:
- **Body shop / paint specialist** — saturated paint-chip palette, lacquer-spec callouts, before/after sliders as the central interaction. Owns "color and finish."
- **Mobile / fleet specialist** — map-led, dispatch / route language, navy + safety orange (NOT hazard yellow). Owns "we come to you."

Avoid in Template_3:
- Light cream surfaces (T2 owns it)
- Slab-serif display fonts (T2 owns it)
- Forest green + clay terracotta combination (T2 owns it)
- "Heritage / 50-year-old shop" narrative framing (T2 owns it)
- Roman numeral ordinals (T2 owns it)
- Clay chevron triangles as section-label leading mark (T2 owns it)
- Clay enamel placard overlays on hero / services / gallery images (T2 owns it)
- Tool-icon trust pills (Wrench / Cog / Gauge prefixed small-caps items) (T2 owns it)
- "Under the hood" / "Pull in" / "All Makes · All Models" copy register (T2 owns it)
- Matte black + hazard yellow / Bebas / monospace metadata (T1 owns it)
- The motorsport / telemetry HUD lane (already attempted in T2-v1 and rejected as too close to T1)
