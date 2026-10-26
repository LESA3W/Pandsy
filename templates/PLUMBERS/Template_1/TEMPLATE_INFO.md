# Template_1 PLUMBERS — TIDEWATER / SLATE & COPPER

> Steady hands. Honest work. The water you trust.

A confident, plumbing-coherent template that pairs deep teal-navy with warm copper. Built around the trade itself — copper fittings, water-line marks, the muted palette of a harbor at dusk. Trustworthy without being clinical, professional without being corporate. The kind of site a homeowner with a flooded basement at 6am clicks "Call Now" on without hesitation.

---

## Color palette

| Token | Hex | Where it lives |
|---|---|---|
| `tide` | `#0c1f29` | Primary surface (matte deep teal-navy, harbor at dusk) |
| `tide-deep` | `#06121a` | Deepest surface — Hero/CTA backgrounds |
| `tide-panel` | `#11293a` | Raised cards (Services grid, Reviews 2x2) |
| `tide-border` | `#1e3a4a` | Hairline rule on dark surfaces |
| `tide-rule` | `#2a4a5e` | Mid rule, dividers, button borders |
| `tide-mute` | `#7a96a8` | Muted text on dark |
| `tide-cream` | `#d6e1e7` | Soft cream on dark for body |
| `mist` | `#e8eef0` | Pale slate-mist (light relief surface — TrustBar, About, ContactSection, Gallery, legal pages) |
| `mist-deep` | `#cdd9de` | Mist edge tone |
| `mist-rule` | `#b6c4cc` | Light surface rule |
| `mist-ink` | `#3a4a55` | Slate ink for body on mist |
| `mist-mute` | `#6c7e89` | Muted text on mist |
| `copper` | `#b06a3b` | Primary trade accent — pipe-fitting warmth |
| `copper-bright` | `#c47e4e` | Hover/focus copper |
| `copper-deep` | `#864e2a` | Pressed copper |
| `copper-glow` | `#e89766` | Lifted copper highlights |
| `emergency` | `#dc2626` | Reserved for emergency CTAs only |
| `emergency-glow` | `#ef4444` | Emergency hover/pulse |
| `night` | `#04080c` | Image scrim base |

Per-client `{{LOGO_COLORS}}` are parsed in `app/layout.tsx` into `--color-primary/-secondary/-accent` CSS vars. The locked palette above is independent so the visual system stays coherent across clients with different brand colors.

---

## Typography

| Family | Weight | Use |
|---|---|---|
| **Fraunces** (display, modern serif) | 500–700 | Headlines, section titles, review bodies (italic), large numerals |
| **Inter Tight** (body, geometric humanist sans) | 400–600 | All body copy, labels, list items |
| **JetBrains Mono** (mono) | 400–500 | Section kickers, trust signals, metadata strips, dates, legal-update timestamps |

**Why this pairing:** Plumbing is a craft profession. Fraunces is a confident modern serif with architectural character — it carries weight without feeling corporate or stuffy. Inter Tight gives clean, dependable body copy. JetBrains Mono handles utility text in a register that mirrors a service technician's clipboard, not a tech startup's deploy logs. The trio reads as "professional, capable, real" — exactly what a homeowner wants when calling about water.

Loaded via `next/font/google` in `app/layout.tsx` and exposed as `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)`.

---

## Sections (12 in canonical order)

1. **Header** — sticky transparent → tide solid on scroll. Light logo throughout (dark surface). Mobile drawer.
2. **Hero** — full-bleed `{{HERO}}` + WaterScrim dim layer + FlowWash atmospheric + foreground: kicker, Fraunces SLOT headline, subhead, copper "Get a free quote" + emergency-red "24/7 emergency" CTAs, mono trust strip.
3. **TrustBar** — STATIC row (not marquee) of 6 universal plumbing trust signals separated by copper DropSeals. Mist surface.
4. **Services** — 3-col grid of services parsed from `{{SERVICES}}`. PlumbingIcon resolver per claude.md rule #15. Each card: icon, name, descriptor (auto-flavored by service-name keywords).
5. **About** — split: framed `{{ABOUT}}` image with FittingBracket (left, sticky) + kicker, SLOT headline, body, 3 promises grid, CTA pair (right). Mist surface.
6. **WhyChooseUs** — 4-col trust grid on tide-deep with FlowWash. Each cell: copper-rule top, Lucide icon, Fraunces title, body.
7. **Gallery** — single hero card per claude.md rule #14 (no GALLERY_2). FittingBracket-framed `{{GALLERY_1}}` with caption-strip overlay at bottom. Mist surface.
8. **Reviews** — Google Business badge + 2x2 grid of 4 reviews. StarRow component, italic Fraunces review body, Quote icon, name + date row.
9. **QuoteSection** — split: pitch (kicker, SLOT headline, promises list, emergency callout — left) + FittingBracket-framed QuoteForm (right). `{{SERVICES_IMAGE}}` is inset on the right side at 30% opacity for atmosphere.
10. **CtaSection** — full-bleed `{{CTA}}` + WaterScrim + FlowWash + centered emergency-framed SLOT headline + emergency-red phone CTA + copper quote CTA.
11. **ContactSection** — 3-col: address (with map link) / phone+email / hours + ContactForm card. Mist surface.
12. **Footer** — RICH per claude.md rule #4b: manifesto block + light logo + 4 socials, TideLine divider, 4-col info grid (Where we are / Reach our crew / When we&apos;re open / Site map), TideLine, bottom legal strip with year (useEffect) + 3 legal links.

Plus chrome:
- **CookieConsent** — three-state machine (hidden | banner | modal). **Floating button visibility keyed on `!showBanner && !showModal`, NOT `hasGivenConsent`** (claude.md rule #6 correction). Bottom-LEFT, copper circle.
- **EmergencyButton** — sticky bottom-RIGHT phone CTA with red pulse dot, fades in past ~50% viewport scroll.

---

## Placeholders used (verified)

All 46 from the spec:

`BUSINESS_NAME`, `BUSINESS_TYPE`, `CITY`, `STATE`, `ZIP`, `FULL_ADDRESS`, `PHONE`, `PHONE_DIGITS`, `HOURS`, `SERVICES`, `TARGET_DESCRIPTION`, `LOGO_URL_LIGHT`, `LOGO_URL_DARK`, `LOGO_COLORS`, `EMAIL`, `HERO`, `ABOUT`, `SERVICES_IMAGE`, `GALLERY_1`, `CTA`, `GOOGLE_LOGO_URL`, `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT`, `GOOGLE_REVIEW_URL`, `GOOGLE_MAPS_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `TWITTER_URL`, `REVIEW_1`–`REVIEW_4`, `REVIEW_1_NAME`–`REVIEW_4_NAME`, `REVIEW_1_STARS`–`REVIEW_4_STARS`, `REVIEW_1_DATE`–`REVIEW_4_DATE`.

Note: `{{ZIP}}` and `{{BUSINESS_TYPE}}` are referenced in the layout metadata description / page title. `{{GALLERY_2}}` is intentionally NOT used (PLUMBERS rule per claude.md #14).

---

## SLOT markers used

Free-form slots for copy rewritten at customization time. Defaults are written for any plumbing business in any city.

| SLOT | Where | Default copy |
|---|---|---|
| `HERO_HEADLINE` | `components/Hero.tsx` | "Steady hands. Honest work. The plumbing service {{CITY}} actually trusts." |
| `ABOUT_HEADLINE` | `components/About.tsx` | "We answer the phone. We tell you the price. Then we get to work." |
| `CTA_HEADLINE` | `components/CtaSection.tsx` | "Pipe burst? Drain backed up? Don't wait. Don't guess." |

---

## Animation philosophy

Fluid + responsive. Gentle slides, water-like staggered reveals, 200–400ms ease-out with slight curve. Hover lifts on copper buttons (color shift only — no transform). Cookie button has a soft copper ripple that loops slowly. Emergency button has a red dot pulse. Header transitions opacity/blur on scroll. No hero-text flying in, no 3D parallax. The aesthetic is calm, capable, and focused — what a master plumber's hands look like, not a marketing agency's reel.

`prefers-reduced-motion` disables all transforms and animations via `app/globals.css`.

---

## Visual atoms — owned by T1 PLUMBERS

These atoms are signature to TIDEWATER / SLATE & COPPER. T2 and T3 PLUMBERS should NOT reuse them; pick fresh visual atoms that fit their direction.

- **TideLine** — horizontal hairline divider with linear gradient `tide-rule → copper → tide-rule` (the "waterline mark")
- **DropSeal** — water-droplet SVG used as inline marker / list bullet / trust-bar separator
- **FittingBracket** — frame component with copper bracket corners + thin top/bottom rules (evokes copper pipe joints)
- **CopperRule** — single 1px copper line with `full | short | center` width variants
- **WaterScrim** — DIM LAYER component (claude.md rule #2b) with `soft | default | strong` opacity steps and `night | tide` tones
- **FlowWash** — atmospheric radial-gradient overlay (teal + copper hint), `dark | light` variants. Always layered ON TOP of WaterScrim, never replaces it.
- **PlumbingIcon** — Lucide icon resolver wrapper (uses `parseServices`)
- **StarRow** — copper-filled stars from a digit string

Color signature: **deep teal-navy `#0c1f29` + warm copper `#b06a3b` + emergency red `#dc2626` reserved for emergencies**, with mist-cool relief on light sections.

Typography signature: **Fraunces serif display + Inter Tight body + JetBrains Mono utility**.

Layout signature: **copper-bracket-cornered cards, copper-rule short dividers under section kickers, mono kickers with leading DropSeal**.

Motion signature: **bottom-right floating emergency button with red pulse + bottom-left copper-ripple cookie button**.

---

## Notes for Templates 2 and 3 PLUMBERS — DO NOT do

T1 PLUMBERS owns the following. Future PLUMBERS templates need their own visual atoms and direction.

**Owned palette (DO NOT reuse as primary):**
- Deep teal-navy `#0c1f29` family as primary surface
- Copper `#b06a3b` family as the dominant trade accent
- The emergency-red `#dc2626` paired with copper as the urgency dyad
- Pale slate-mist `#e8eef0` as the relief surface

**Owned typography (DO NOT reuse the pairing):**
- Fraunces as display
- Inter Tight as body
- JetBrains Mono as utility

**Owned component names and atoms (DO NOT reuse the names — pick fresh ones for T2/T3):**
- `TideLine`, `DropSeal`, `FittingBracket`, `CopperRule`, `WaterScrim`, `FlowWash`, `PlumbingIcon`
- "Tidewater / Slate & Copper" as the style name
- Copper-bracket card-corner treatment

**Reserved alternative directions for T2 / T3 PLUMBERS:**

Each future template should pick a fresh direction that genuinely contrasts with this one. Suggestions:

- **T2 PLUMBERS — "PIPE & BRASS / HERITAGE WORKSHOP" (RESERVED):** cream/bone surface + brushed brass + deep ocean blue + light copper. Old-world plumbing trade craftsmanship. Type: warm slab serif (Source Serif, Lora) or American slab + clean grotesque body. Visual atoms: brass medallions, pipe-section dividers, blueprint hairlines, hand-stamped service marks. Trust mark in a stamp register.
- **T3 PLUMBERS — "CLEAN WATER / CLINICAL MODERN" (RESERVED):** soft sky-blue gradient backgrounds + crisp white + thin teal accents + warm orange/red urgency. Modern clean residential plumbing service. More clinical / dependable / "we won't ruin your floor" vibe. Type: confident grotesque (Manrope, Mona Sans) + humanist serif headlines OR pure sans pair. Visual atoms: rounded-pill components, drop-shadow lifts, droplet-in-circle marks, gradient washes.

The **DRAIN OR FLOW** direction (deep indigo/teal washes + chrome silver + coral copper accent, photo-led with water motion) is also unused if a T4 ever ships.

---

## File map

```
app/
  layout.tsx           Google fonts + parseColors → CSS vars + CookieConsent + EmergencyButton
  page.tsx             12-section orchestration
  globals.css          Base resets + reduced-motion guard + select arrow
  api/
    quote/route.ts     Resend + zod, plumbing fields, renderEmailHtml(kind:quote)
    contact/route.ts   Resend + zod, simpler, renderEmailHtml(kind:contact)
  privacy-policy/page.tsx
  terms-of-service/page.tsx
  cookie-policy/page.tsx (with openCookiePreferences button)

components/
  Header.tsx           Sticky, transparent → solid, mobile drawer
  Hero.tsx             Image + WaterScrim dim + FlowWash + foreground
  TrustBar.tsx         Static 6-signal row, mist surface
  Services.tsx         {{SERVICES}} grid, PlumbingIcon, auto descriptors
  About.tsx            Split with FittingBracket image, promises grid
  WhyChooseUs.tsx      4-col, copper-rule top, FlowWash bg
  Gallery.tsx          Single hero card, FittingBracket, caption-strip
  Reviews.tsx          Google badge + 2x2 grid, StarRow
  QuoteSection.tsx     Pitch + framed form, inset SERVICES_IMAGE atmosphere
  CtaSection.tsx       Full-bleed CTA + WaterScrim + emergency framing
  ContactSection.tsx   3-col info + framed ContactForm
  Footer.tsx           RICH: manifesto + 4 social + 4-col grid + bottom strip
  CookieConsent.tsx    3-state machine, floating button correctly gated
  EmergencyButton.tsx  Sticky bottom-right, red pulse, scroll-fade
  forms/
    QuoteForm.tsx      RHF + zod, plumbing-specific selects
    ContactForm.tsx    RHF + zod, simpler
  ui/
    Logo.tsx           Native <img>, dual variant
    TikTokIcon.tsx     Custom stroke SVG
    XIcon.tsx          FontAwesome faXTwitter
    TideLine.tsx       Gradient hairline divider
    DropSeal.tsx       Water-droplet inline marker
    FittingBracket.tsx Card frame with copper bracket corners
    CopperRule.tsx     Single copper hairline
    WaterScrim.tsx     Dim layer (claude.md rule #2b)
    FlowWash.tsx       Atmospheric radial-gradient overlay
    PlumbingIcon.tsx   Lucide resolver wrapper
    StarRow.tsx        5-star row from digit string

lib/
  emailTemplate.ts     Tide-dark email card, anti-inversion meta tags, copper accents
  cookieConsent.ts     localStorage helpers + custom event
  parseColors.ts       {{LOGO_COLORS}} → CSS var trio
  parseServices.ts     {{SERVICES}} → name + Lucide icon
  cn.ts                Classname helper

.env.example, .gitignore, next.config.ts, package.json, postcss.config.mjs,
tailwind.config.ts, tsconfig.json, next-env.d.ts
```

---

## References / inspiration

- Tide-line and waterline marks on harbor docks (the divider pattern)
- Copper pipe fittings — the trade's signature material — for accent warmth
- Coastal Pacific Northwest palette (deep blues, weathered copper)
- Modern serif revival (Fraunces) as a counter to typical "trades use big condensed sans" — this template is a master craftsman, not a billboard
