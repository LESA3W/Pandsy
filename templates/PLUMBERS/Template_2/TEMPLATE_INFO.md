# Template_2 PLUMBERS — BRASS LINE / SHOP DRAWINGS

> Open the line. Test the seal. Sign the work order.

A workshop-grade plumbing template that pairs warm cream/bone paper with brushed brass and a single deep-harbor interlude. Built around the trade itself: brass fittings, dimension callouts, plate references, spec sheets, and the kind of working drawings a master plumber would pin on the shop wall. Trustworthy, technical, specific. The kind of site that reads as "shop ledger" not "boutique stationery."

---

## Color palette

| Token | Hex | Where it lives |
|---|---|---|
| `bone` | `#f4ede2` | Primary surface (warm-tinted paper, used by Hero, ServiceSheet, ShopBio, WorkshopPlate, QuoteTicket, ContactCard, legal pages) |
| `bone-deep` | `#e9dfcf` | Secondary cream (SpecStrip, Standards, raised cards inside other sections) |
| `bone-rule` | `#d8cab4` | Hairline separators on bone |
| `paper-ink` | `#1b1f26` | Primary ink (body, headlines) |
| `paper-mute` | `#5b6168` | Muted text on bone |
| `brass` | `#b8923f` | Primary trade accent (cleaner than the muddy `#a8843a` originally proposed) |
| `brass-bright` | `#cfa658` | Hover/lifted brass |
| `brass-deep` | `#7e6028` | Pressed brass / strong rule / kicker text |
| `brass-glow` | `#e3c075` | Highlight brass (used on harbor surfaces) |
| `harbor` | `#1f3a5c` | Cobalt-blue interlude tone (not used as primary surface — only adjacent treatment) |
| `harbor-deep` | `#152a45` | Footer + CallSheet underwash |
| `harbor-rule` | `#4a6280` | Mid-rule on harbor |
| `harbor-mute` | `#8aa0bb` | Muted text on harbor |
| `harbor-cream` | `#e6ecf2` | Body text on harbor |
| `crimson` | `#b1271f` | Emergency-only oxidized terracotta-red (NOT `#dc2626` — that is T1) |
| `crimson-glow` | `#c83a31` | Emergency hover |

Per-client `{{LOGO_COLORS}}` are parsed in `app/layout.tsx` into `--color-primary/-secondary/-accent` CSS vars. The locked palette above stays system-coherent regardless of client logo colors.

---

## Typography

| Family | Weight | Use |
|---|---|---|
| **IBM Plex Serif** (slab-flavored serif) | 500–700 | Headlines, section titles, manifesto, large numerals |
| **Work Sans** (clean grotesque, workshop-named) | 400–600 | Body copy, paragraphs, list items, form values |
| **Space Mono** (drafter's CRT mono) | 400–700 | Kickers, trust signals, plate references, dates, metadata, button labels |

**Why this pairing:** Plumbing is a craft profession run from a workshop. IBM Plex Serif's slab-flavored geometry reads engineering-register (it was designed for IBM's manufacturing/technical content), Work Sans is a humanist grotesque named for working life, Space Mono carries the slightly retro CRT/drafter character that reads "shop drawings" rather than "deploy logs." The trio reads as a master plumber's working notebook, not an editorial magazine.

Loaded via `next/font/google` in `app/layout.tsx` and exposed as `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)`.

---

## Sections (12 in canonical order)

1. **MastHeader** — sticky transparent → bone solid on scroll. Dark logo (`{{LOGO_URL_DARK}}`) on cream throughout. Mobile drawer. Above MastHeader: always-visible **EmergencyStrip** with crimson StampSeal + Space Mono "24/7 EMERGENCY · {{PHONE}}".
2. **OpeningPlate** (Hero) — cream surface dominant, `{{HERO}}` framed as a plate on the right (50% on desktop). Image gets SchemaScrim with `mix-blend-multiply` to harmonize any client photo with the bone surface. Foreground (left): Space Mono kicker with leading BrassMedallion, IBM Plex Serif SLOT headline, Work Sans subhead, brass solid + crimson ghost CTAs, mono trust strip.
3. **SpecStrip** (TrustBar) — STATIC row (not marquee) on bone-deep with brass corner ticks. 6 universal plumbing trust signals separated by RiserMark.
4. **ServiceSheet** (Services) — split header: text on left + framed `{{SERVICES_IMAGE}}` plate on right. Below, 3-col grid of plate-cards parsed from `{{SERVICES}}`. Each card: PlateLine top + brass corner ticks + PlumbingMark icon + IBM Plex Serif name + auto-flavored Work Sans descriptor + "PLATE 0N" reference.
5. **ShopBio** (About) — split: framed `{{ABOUT}}` image plate (left, sticky on desktop) + (right) Space Mono kicker, IBM Plex Serif SLOT headline, body referencing `{{TARGET_DESCRIPTION}}`, 3-row promises grid each with BrassMedallion. Bone surface.
6. **Standards** (WhyChooseUs) — 4-col trust grid on bone-deep. Each cell: PlateLine top + Space Mono "STANDARD 0N" kicker + Lucide icon (in brass) + IBM Plex Serif title + Work Sans body.
7. **WorkshopPlate** (Gallery) — single hero card per claude.md rule #14 (PLUMBERS = no GALLERY_2). PlateLine top + brass corner ticks framing `{{GALLERY_1}}` + Space Mono caption strip "PLATE 03 / IN-PROGRESS WORK".
8. **ClientNotes** (Reviews) — Google Business badge above + 2x2 grid of 4 reviews. Each card: PlateLine top + brass StampSealLabel "REF: NOTE-01" in top-right + Quote icon stamp + Work Sans body (NOT italic — T1 owns italic for reviews) + Space Mono name+date row. StarBrass component for stars.
9. **QuoteTicket** (QuoteSection) — split: pitch (kicker, IBM Plex Serif SLOT headline, promises list with BrassMedallion bullets, emergency callout box with crimson left-bar) + framed QuoteForm card (PlateLine top + brass corner ticks). NO inset image.
10. **CallSheet** (CtaSection) — full-bleed `{{CTA}}` + SchemaScrim strong (claude.md rule #2b) + harbor-tinted atmospheric overlay + centered emergency-framed IBM Plex Serif SLOT headline + crimson primary "Call now: {{PHONE}}" + brass ghost secondary "Get a quote". This is the **harbor-blue interlude** breaking the cream sections.
11. **ContactCard** (ContactSection) — 3-stack of address/phone-email/hours info cards on the left + framed ContactForm card on the right.
12. **Footer** — RICH per claude.md rule #4b on harbor-deep surface (second harbor interlude). Manifesto in IBM Plex Serif: *"Open the line. Test the seal. Sign the work order."* + 4 social icons opposite the manifesto + DraftRule divider in brass + 4-col info grid (Where we're working / Reach the workshop / Open hours / Site map) each with leading BrassMedallion + DraftRule atmospheric (one element only) + bottom legal strip with year (useEffect) + 3 legal links.

Plus chrome:
- **CookieConsent** — 3-state machine. Bottom-LEFT brass-circle floating button. **Visibility gated as `showFloatingButton = mounted && view === "hidden"`** (NOT `hasGivenConsent` — claude.md rule #6). Banner: bone-deep surface + brass buttons. Modal: full-screen with backdrop blur + 3 toggles.
- **EmergencyStrip** — always-visible top strip on bone-deep surface with crimson StampSeal + Space Mono phone line. Different lane from T1's bottom-RIGHT floating button.

---

## Placeholders used (verified)

All 46 from the spec:

`BUSINESS_NAME`, `BUSINESS_TYPE`, `CITY`, `STATE`, `ZIP`, `FULL_ADDRESS`, `PHONE`, `PHONE_DIGITS`, `HOURS`, `SERVICES`, `TARGET_DESCRIPTION`, `LOGO_URL_LIGHT`, `LOGO_URL_DARK`, `LOGO_COLORS`, `EMAIL`, `HERO`, `ABOUT`, `SERVICES_IMAGE`, `GALLERY_1`, `CTA`, `GOOGLE_LOGO_URL`, `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT`, `GOOGLE_REVIEW_URL`, `GOOGLE_MAPS_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `TWITTER_URL`, `REVIEW_1`–`REVIEW_4`, `REVIEW_1_NAME`–`REVIEW_4_NAME`, `REVIEW_1_STARS`–`REVIEW_4_STARS`, `REVIEW_1_DATE`–`REVIEW_4_DATE`.

`{{ZIP}}` and `{{BUSINESS_TYPE}}` are referenced in the layout metadata title. `{{GALLERY_2}}` is intentionally NOT used (PLUMBERS = 5 images per claude.md rule #14).

---

## SLOT markers

Free-form slots for copy rewritten at customization time. Defaults pre-locked to **service promises** (Licensed & Insured, Master Plumber on Staff, Up-Front Pricing, 24/7 Emergency, Pressure Tested) — never on tenure or family/heritage framing.

| SLOT | Where | Default copy |
|---|---|---|
| `HERO_KICKER` | OpeningPlate | "PLUMBING SHOP / {{CITY}}, {{STATE}}" |
| `HERO_HEADLINE` | OpeningPlate | "Open the line. Test the seal. Sign it off." |
| `HERO_SUBHEAD` | OpeningPlate | "Licensed plumbers serving {{CITY}}. Up-front pricing, written quotes, every joint pressure-tested before we leave." |
| `SERVICES_HEADLINE` | ServiceSheet | "What we do, written down." |
| `ABOUT_KICKER` | ShopBio | "About the shop" |
| `ABOUT_HEADLINE` | ShopBio | "We do the job once. We do it right." |
| `ABOUT_BODY` | ShopBio | (Two paragraphs anchored on Licensed & Insured + Master Plumber on Staff + Pressure Tested. References `{{TARGET_DESCRIPTION}}`.) |
| `STANDARDS_HEADLINE` | Standards | "Plumbing you don't have to think about again." |
| `QUOTE_HEADLINE` | QuoteTicket | "Tell us what's wrong. We'll tell you what it costs." |
| `CTA_HEADLINE` | CallSheet | "Pipe burst. Drain backed up. Don't wait. Don't guess." |
| `FOOTER_MANIFESTO` | Footer | "Open the line. Test the seal. Sign the work order." |

---

## Animation philosophy

**MEASURED + PROCEDURAL.** Animations feel like a draftsman placing lines and ticks. Slow horizontal slides (300–500ms ease-out), sequential tick-mark reveals, no parallax, no swooping motion, no 3D transforms. Hover on brass elements: a soft "ink spread" effect (background lightens to `brass-bright`, no transform). Stamp seals have a barely-visible static brass-shine gradient (no continuous animation). Cookie banner uses `animate-draft-slide` (gentle 8px translate-Y).

This is a deliberate 4th lane against T1's "fluid + responsive (water-like)" — the visual register reads "shop ledger" rather than "ocean currents."

`prefers-reduced-motion` disables all transitions and animations via `app/globals.css`.

---

## Visual atoms — owned by T2 PLUMBERS

These atoms are signature to BRASS LINE / SHOP DRAWINGS. T3 PLUMBERS should NOT reuse them; pick fresh visual atoms that fit the clinical-modern direction.

- **PlateLine** — thin horizontal hairline with tick-marks at each end, like a dimension callout
- **BrassMedallion** — small brass-circle SVG used as inline marker / list bullet / kicker prefix
- **RiserMark** — short divider with circle terminals at each end (pipe-section motif)
- **DraftRule** — single 1px brass line with tick marks at intervals (drafter's ruler edge)
- **SchemaScrim** — DIM LAYER component (claude.md rule #2b) with `soft|default|strong` opacity, `harbor|bone-deep|crimson|ink` tones, `normal|multiply` blend modes
- **PaperGrain** — subtle paper texture overlay (very faint noise + bone-rule wash)
- **StampSeal / StampSealLabel** — brass-circle stamped element (REF tags + emergency seal)
- **PlumbingMark** — Lucide icon resolver wrapper (uses `parseServices`)
- **StarBrass** — brass-filled stars from a digit string

Color signature: **warm bone `#f4ede2` + brass `#b8923f` + harbor-deep `#152a45` interludes + oxidized crimson `#b1271f` reserved for emergency**.

Typography signature: **IBM Plex Serif slab + Work Sans body + Space Mono utility**.

Layout signature: **PlateLine top + brass corner ticks on cards, Space Mono kickers with leading BrassMedallion, framed image plates with caption strips ("PLATE 0N / SUBJECT"), 4-col info grid in Footer**.

Motion signature: **measured + procedural, draft-slide reveals, no continuous loops; bottom-LEFT brass-circle cookie button + always-visible top EmergencyStrip on bone-deep surface (NOT bottom-RIGHT floating)**.

---

## Notes for Template_3 PLUMBERS — DO NOT do

T1 PLUMBERS (TIDEWATER / SLATE & COPPER) and T2 PLUMBERS (BRASS LINE / SHOP DRAWINGS) collectively own the following. T3 needs fresh atoms in its direction (CLEAN WATER / CLINICAL MODERN — sky-blue gradient + crisp white + thin teal accents + warm orange/red urgency).

**Owned palette (DO NOT reuse as primary):**
- T1: deep teal-navy `#0c1f29` family + warm copper `#b06a3b` family + cool slate-mist `#e8eef0`
- T2: warm bone `#f4ede2` family + brass `#b8923f` family + harbor-deep `#152a45` interludes
- The pure emergency red `#dc2626` (T1) AND the oxidized crimson `#b1271f` (T2)

**Owned typography (DO NOT reuse the pairings):**
- T1: Fraunces + Inter Tight + JetBrains Mono
- T2: IBM Plex Serif + Work Sans + Space Mono

T3 should pick a clinical-modern trio: Manrope or Mona Sans grotesque + a humanist serif headline option (e.g., Newsreader, Source Serif 4) OR a pure sans pair (Geist Sans + Geist Mono). Avoid all three families above.

**Owned component names and atoms (DO NOT reuse the names):**
- T1: TideLine, DropSeal, FittingBracket, CopperRule, WaterScrim, FlowWash, PlumbingIcon, StarRow
- T2: PlateLine, BrassMedallion, RiserMark, DraftRule, SchemaScrim, PaperGrain, StampSeal, StampSealLabel, PlumbingMark, StarBrass
- T1 section names: Header, Hero, TrustBar, Services, About, WhyChooseUs, Gallery, Reviews, QuoteSection, CtaSection, ContactSection, Footer, EmergencyButton
- T2 section names: MastHeader, OpeningPlate, SpecStrip, ServiceSheet, ShopBio, Standards, WorkshopPlate, ClientNotes, QuoteTicket, CallSheet, ContactCard, EmergencyStrip
- Style names: "Tidewater / Slate & Copper" (T1), "Brass Line / Shop Drawings" (T2)

T3 should use **clinical / clean-water / residential service** vocabulary: pill-shaped components, droplet-in-circle marks, gradient washes, soft shadow lifts. Suggested section names: `TopBar`, `LandingHero`, `BadgeStrip`, `ServiceMenu`, `CompanyStory`, `Promise`, `MomentGallery`, `Testimonials`, `RequestPanel`, `RescueBar`, `ReachUs`, plus `Footer`.

**Owned emergency treatments (DO NOT reuse):**
- T1: bottom-RIGHT floating sticky button with red pulse animation
- T2: always-visible top EmergencyStrip on bone-deep surface with crimson StampSeal
- T3 options: a HERO badge stamp inside the hero copy, a sticky bottom-CENTER bar (different from T1's right-only), a footer emergency band, or an inline rescue-bar between sections

**Owned cookie button positions/styles (DO NOT reuse):**
- T1: bottom-LEFT copper circle with continuous ripple
- T2: bottom-LEFT brass-circle StampSeal-style (no continuous animation)
- T3 should pick: bottom-RIGHT (since both T1 and T2 use bottom-LEFT) with a soft droplet shape, OR the cookie icon hosted in a slim translucent pill at bottom-CENTER

**Reserved direction for T3 PLUMBERS:**
**CLEAN WATER / CLINICAL MODERN** — soft sky-blue gradient backgrounds + crisp white + thin teal accents + warm orange/red urgency. Modern clinical residential plumbing service vibe ("we won't ruin your floor"). Visual atoms: rounded-pill components, drop-shadow lifts, droplet-in-circle marks, gradient washes. Type pairing: confident grotesque (Manrope, Mona Sans) + humanist serif headlines OR pure sans pair.

The **DRAIN OR FLOW** direction (deep indigo/teal washes + chrome silver + coral copper, photo-led with water motion) remains unused if a T4 ever ships — but that direction is already partially in T1's lane (deep blue + copper). T4 would need to push significantly further into the chrome/photo/motion territory to differentiate.

---

## File map

```
app/
  layout.tsx           Google fonts (IBM Plex Serif + Work Sans + Space Mono) + parseColors → CSS vars
                       + suppressHydrationWarning + EmergencyStrip + CookieConsent
  page.tsx             12-section orchestration
  globals.css          Base resets + reduced-motion guard + select arrow tinted brass
  api/
    quote/route.ts     Resend + zod, plumbing fields (address/propertyType/urgency/service from
                       parseServices), renderEmailHtml({kind:"quote"})
    contact/route.ts   Resend + zod, simpler, renderEmailHtml({kind:"contact"})
  privacy-policy/page.tsx
  terms-of-service/page.tsx
  cookie-policy/page.tsx (with openCookiePreferences button)

components/
  MastHeader.tsx       Sticky transparent → bone, dark logo, mobile drawer
  EmergencyStrip.tsx   Always-visible top strip with crimson StampSeal + phone line
  OpeningPlate.tsx     Hero: cream + framed image plate right + brass border
  SpecStrip.tsx        TrustBar: boxed brass-cornered, 6 signals + RiserMark dividers
  ServiceSheet.tsx     Services: split header with framed SERVICES_IMAGE + 3-col plate-cards
  ShopBio.tsx          About: split, framed image left, promises grid right
  Standards.tsx        WhyChooseUs: 4-col grid on bone-deep
  WorkshopPlate.tsx    Gallery: single framed image + caption strip
  ClientNotes.tsx      Reviews: Google badge + 2x2 grid + StampSealLabel REF tags
  QuoteTicket.tsx      QuoteSection: pitch + framed QuoteForm
  CallSheet.tsx        CtaSection: full-bleed CTA, harbor interlude, crimson CTA
  ContactCard.tsx      ContactSection: 3-stack info cards + framed ContactForm
  Footer.tsx           Rich footer per rule #4b on harbor-deep
  CookieConsent.tsx    3-state machine, brass-circle floating button (gated correctly)
  forms/
    QuoteForm.tsx      RHF + zod, plumbing-specific selects (address+propertyType+urgency+service)
    ContactForm.tsx    RHF + zod, simpler
  ui/
    Logo.tsx           Native <img>, dual variant
    TikTokIcon.tsx     Custom stroke SVG
    XIcon.tsx          FontAwesome faXTwitter wrapper
    PlateLine.tsx      Dimension-callout hairline
    BrassMedallion.tsx Brass-circle inline marker
    RiserMark.tsx      Pipe-section divider with circle terminals
    DraftRule.tsx      Drafter's ruler edge with tick marks
    SchemaScrim.tsx    Dim layer (claude.md rule #2b)
    PaperGrain.tsx     Subtle paper texture overlay
    StampSeal.tsx      Brass stamped element (REF tags + emergency seal)
    PlumbingMark.tsx   Lucide icon resolver wrapper
    StarBrass.tsx      Brass-filled stars from digit string

lib/
  emailTemplate.ts     Bone cream email card, brass accents, IBM Plex Serif headline + Work Sans body,
                       pinned link colors, Outlook MSO conditional fallback, NO anti-double-inversion
                       meta tags (light email)
  cookieConsent.ts     localStorage helpers + custom event for cross-component sync
  parseColors.ts       {{LOGO_COLORS}} CSV → CSS var trio
  parseServices.ts     {{SERVICES}} CSV → [{name, icon, descriptor}] using PlumbingMark mapping
  cn.ts                Classname helper

.env.example, .gitignore, next.config.ts, package.json, postcss.config.mjs,
tailwind.config.ts, tsconfig.json, next-env.d.ts
```

---

## References / inspiration

- Pipe-fitter shop drawings — dimension callouts, plate references, valve schedules — for the visual language
- Brass plumbing fittings (the trade's signature material) for accent warmth — different hue lane than T1's copper
- Cobalt harbor blue (Pacific Northwest deep-water tones) for interlude punctuation
- IBM Plex Serif chosen specifically for its engineering/manufacturing register — workshop-grade, NOT literary
- Work Sans named for working life — humanist grotesque body face that pairs naturally with Plex Serif
- Space Mono for the slightly retro CRT/drafter character that reads "shop drawings" not "deploy logs"
