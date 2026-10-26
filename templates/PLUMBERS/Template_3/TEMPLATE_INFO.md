# Template_3 PLUMBERS — CLEARLINE / CLEAN WATER SERVICE

> We test the line. We tarp the floor. We close the work order.

A clinical, residential-modern plumbing template that pairs cloud-white surfaces with bright cyan, deep aqua, and a vermillion emergency accent. Built for the homeowner who wants a real arrival window, a written quote, and floors that stay clean. Trustworthy, modern, residential. The kind of site a homeowner with a flooded basement at 6am calls because it reads as competent and on-time, not "we got here yesterday and we'll get there eventually."

---

## Color palette

| Token | Hex | Where it lives |
|---|---|---|
| `cloud` | `#fafcfd` | Primary surface (LandingHero, ServiceMenu, CompanyStory, ReachUs, legal pages) |
| `pearl` | `#f1f7fa` | Relief surface (BadgeStrip, Promise, MomentGallery, Testimonials) |
| `sky-soft` | `#e0f2fe` | Atmospheric wash start (RequestPanel bg, ServiceDot fill) |
| `sky-bright` | `#f0f9ff` | Atmospheric wash end |
| `aqua` | `#06b6d4` | Primary trade accent (buttons, droplet fills, active states) |
| `aqua-deep` | `#0e7c9c` | Display headline tone, kicker text, MeterPanel heading band |
| `aqua-bright` | `#22d3ee` | Hover lift on aqua |
| `aqua-glow` | `#67e8f9` | Soft highlight |
| `chrome` | `#cdd5db` | Utility hairlines, dividers, card borders |
| `chrome-mute` | `#94a3b8` | Muted text on light surfaces |
| `ink` | `#0f1d28` | Primary body ink (charcoal-navy, NOT pure black) |
| `ink-mute` | `#475569` | Muted body ink |
| `vermillion` | `#ef5b2b` | Emergency surfaces ONLY (NOT `#f97316` coral, NOT `#dc2626` T1, NOT `#b1271f` T2) |
| `vermillion-deep` | `#c43d14` | Emergency pressed |
| `vermillion-glow` | `#fb7c4e` | Emergency hover lift |
| `harbor-night` | `#0e3a52` | Footer surface start (dark cyan-navy interlude) |
| `harbor-night-deep` | `#0c4a6e` | Footer + RescueBar gradient end |

Per-client `{{LOGO_COLORS}}` are parsed in `app/layout.tsx` into `--color-primary/-secondary/-accent` CSS vars. The locked palette above stays system-coherent across clients.

---

## Typography

| Family | Weight | Use |
|---|---|---|
| **Mona Sans** (semi-extended grotesque, Black 900) | 700–900 | Display: SLOT headlines, manifesto, large numerals |
| **Inter** (humanist sans) | 400–600 | Body copy, paragraphs, labels, form values |
| **Geist Mono** (modern technical mono) | 400–500 | Kickers, trust signals, dates, metadata, button micro-labels |

**Why this pairing:** the original Manrope+Inter pair stress-tested as twin grotesques and risked SaaS-landing drift. Mona Sans Black 900 vs Inter 400 creates the visual hierarchy contrast the page needs. Mona Sans Black is also distinctly NOT the typical "Linear-clean" Vercel register — it carries the punchier weight of hospital signage or a clean-water utility logo. The trio breaks every T1+T2 ownership lane: T1 = Fraunces serif, T2 = IBM Plex slab serif, T3 = pure grotesque.

Loaded via `next/font/google` in `app/layout.tsx` and exposed as `var(--font-display)` / `var(--font-sans)` / `var(--font-mono)`.

---

## Sections (12 in canonical order)

1. **TopBar** — sticky transparent → cloud-solid with backdrop-blur on scroll. Dark logo on light surface throughout. Mobile drawer.
2. **LandingHero** (Hero) — split layout: photographic `{{HERO}}` framed in a ServicePill-style rounded card on the right (50% on desktop). Image gets `AquaScrim` dim layer + `WaveWash` atmospheric. Foreground (left): Geist Mono kicker with leading PipeTick → Mona Sans Black SLOT headline → Inter subhead → in-Hero `RescuePill` emergency row → primary aqua "Get a free quote" + secondary ghost "Call: {{PHONE}}" CTAs → Geist Mono trust strip with `WaterDot` separators.
3. **BadgeStrip** (TrustBar) — STATIC row (not marquee — marquees are AUTO_REPAIR territory) on `pearl` surface. 6 universal trust signals as `FlowChip`s with `WaterDot` separators. **One `PressureGauge` MeterPanel-style cell at the right end** (`TESTED · 80 PSI`) breaks the all-pill rhythm and pulls the page away from SaaS register. RippleRule dividers above/below.
4. **ServiceMenu** (Services) — split header: Mona Sans headline + Inter subhead on left, framed `{{SERVICES_IMAGE}}` (ServicePill shape) on right. Below: 3-col grid where rows alternate `ServicePill` (rows 1, 3) + `MeterPanel` (row 2) styling. Each card: `ServiceDot` icon, Mona Sans name, Inter descriptor (auto-flavored by service-name keywords).
5. **CompanyStory** (About) — split: framed `{{ABOUT}}` ServicePill image (left, sticky on desktop) + (right) Geist Mono kicker with leading PipeTick, Mona Sans SLOT headline, Inter body referencing `{{TARGET_DESCRIPTION}}`, 3-row promises grid with sky-soft icon circles, paired CTAs. `cloud` surface with subtle `WaveWash` corner.
6. **Promise** (WhyChooseUs) — 4-col `MeterPanel` grid on `pearl` surface. **All-MeterPanel section to balance the all-pill sections.** Each cell: aqua-deep heading band top, chrome border, Lucide icon in aqua circle, Mona Sans title, Inter body.
7. **MomentGallery** (Gallery) — single hero card per CLAUDE.md rule #14 (PLUMBERS = no GALLERY_2). ServicePill-framed `{{GALLERY_1}}` with chrome caption-strip overlay at bottom. `pearl` surface with RippleRule dividers above/below.
8. **Testimonials** (Reviews) — Google Business badge above + 2x2 grid of 4 reviews. Each card: `MeterPanel` styling (NOT pills — visually anchors trust register), aqua-deep heading band, `StarAqua` row, Inter body (NOT italic — T1 owns review-italic), Quote icon in chrome circle, Geist Mono name+date row.
9. **RequestPanel** (QuoteSection) — split: pitch (kicker, Mona Sans SLOT headline, promises list with `WaterDot` bullets, vermillion `RescuePill` callout — left) + `MeterPanel`-framed QuoteForm (right). Background: full-section `sky-wash` gradient + WaveWash overlay (T1 owns inset-image-on-quote-section, T2 owns no-image — T3 takes the gradient lane).
10. **RescueBar** (CtaSection) — full-bleed `{{CTA}}` + `AquaScrim` strong + `WaveWash` harbor + harbor-night gradient overlay. Centered Mona Sans SLOT headline + vermillion primary "Call now: {{PHONE}}" + aqua-ghost "Get a quote" secondary. The dark interlude that gives visual closure weight.
11. **ReachUs** (ContactSection) — 3-stack of MeterPanel info cards (address with map link / phone+email / hours parsed) on the left + ServicePill-framed ContactForm on the right.
12. **Footer** — RICH per CLAUDE.md rule #4b. Dark cyan-navy `harbor-night → harbor-night-deep` gradient surface (NOT T1's tide-deep, NOT T2's harbor-deep). Manifesto in Mona Sans Black 900 (white) + light logo + 4 social icons opposite. AquaRule divider. 4-col info grid with leading `WaterDot` per label (Where we are / Reach the team / Open hours / Site map). Atmospheric WaveWash corner. Bottom legal strip with year (useEffect) + 3 legal links.

Plus chrome:
- **CookieConsent** — 3-state machine (hidden | banner | modal). **Floating button visibility keyed on `showFloatingButton = mounted && view === "hidden"`, NOT `hasGivenConsent`** (CLAUDE.md rule #6 correction). **Bottom-RIGHT** aqua circle with `Droplet` icon (T1+T2 both used bottom-LEFT). **No continuous animation** — hover-only soft shadow lift.
- **StickyRescue** — sticky bottom-CENTER slim vermillion pill that fades in past ~50% scroll. T1 = bottom-RIGHT button. T2 = top strip. T3 = bottom-CENTER pill + Hero row. **Three lanes confirmed.**

---

## Placeholders used (verified)

All 45 used (PLUMBERS skip GALLERY_2 per CLAUDE.md rule #14):

`BUSINESS_NAME`, `BUSINESS_TYPE`, `CITY`, `STATE`, `ZIP`, `FULL_ADDRESS`, `PHONE`, `PHONE_DIGITS`, `HOURS`, `SERVICES`, `TARGET_DESCRIPTION`, `LOGO_URL_LIGHT`, `LOGO_URL_DARK`, `LOGO_COLORS`, `EMAIL`, `HERO`, `ABOUT`, `SERVICES_IMAGE`, `GALLERY_1`, `CTA`, `GOOGLE_LOGO_URL`, `GOOGLE_RATING`, `GOOGLE_REVIEW_COUNT`, `GOOGLE_REVIEW_URL`, `GOOGLE_MAPS_URL`, `INSTAGRAM_URL`, `FACEBOOK_URL`, `TIKTOK_URL`, `TWITTER_URL`, `REVIEW_1`–`REVIEW_4`, `REVIEW_1_NAME`–`REVIEW_4_NAME`, `REVIEW_1_STARS`–`REVIEW_4_STARS`, `REVIEW_1_DATE`–`REVIEW_4_DATE`.

`{{ZIP}}` and `{{BUSINESS_TYPE}}` are referenced in the layout metadata title/description. `{{GALLERY_2}}` is intentionally NOT used (PLUMBERS = 5 images per CLAUDE.md rule #14).

---

## SLOT markers

Free-form slots for copy rewritten at customization time. Defaults are anchored on **service promises** (Licensed master plumber, Up-front pricing, 24/7 emergency, Pressure tested) — never on tenure, family/heritage framing, or time-anchored claims (CLAUDE.md rule #11).

| SLOT | Where | Default copy |
|---|---|---|
| `HERO_KICKER` | LandingHero | "CLEAN-WATER PLUMBING / {{CITY}}, {{STATE}}" |
| `HERO_HEADLINE` | LandingHero | "We test the line. We tarp the floor. We close the work order." |
| `HERO_SUBHEAD` | LandingHero | "Licensed plumbers serving {{CITY}}. Up-front pricing, written quotes, every joint pressure-tested before we leave." |
| `SERVICES_KICKER` | ServiceMenu | "What we do" |
| `SERVICES_HEADLINE` | ServiceMenu | "Plumbing you don't have to think about again." |
| `SERVICES_SUBHEAD` | ServiceMenu | (Body anchored on diagnosed cleanly + written quote + tested before close.) |
| `ABOUT_KICKER` | CompanyStory | "About the team" |
| `ABOUT_HEADLINE` | CompanyStory | "We answer the phone. We tell you the price. Then we get to work." |
| `ABOUT_BODY` | CompanyStory | (Two paragraphs anchored on Master Plumber on every crew + Pressure Tested + Floors Protected. References `{{TARGET_DESCRIPTION}}`.) |
| `PROMISE_HEADLINE` | Promise | "Four promises. Zero surprises." |
| `GALLERY_HEADLINE` | MomentGallery | "What our work looks like." |
| `QUOTE_HEADLINE` | RequestPanel | "Tell us what's wrong. We'll tell you what it costs." |
| `CTA_HEADLINE` | RescueBar | "Pipe burst. Drain backed up. Don't wait. Don't guess." |
| `FOOTER_MANIFESTO` | Footer | "We test the line. We tarp the floor. We close the work order." |

---

## Animation philosophy — *Crisp + lifted*

Distinct 3rd lane against T1's "fluid + responsive (water-like)" and T2's "measured + procedural (draftsman placing lines)":

- Fade-up on viewport entry (12px translate-Y, 200–400ms ease-out)
- Soft drop-shadow elevation transitions on hover (no transform, just shadow + tiny y-translate on buttons)
- Gentle backdrop-blur transition on TopBar scroll
- **ZERO continuous loops** (no ripple, no shine, no breathe — T1 owns continuous loops)
- Single state-change ripple on click (the only "water-motion" reference) — fades after 600ms
- StickyRescue uses a one-shot `rescue-slide-up` animation when it appears past 50% scroll
- `prefers-reduced-motion` disables all transitions and animations via `app/globals.css`

The whole motion language is about **elevation and depth**, not flow. Soft drop-shadow lifts on hover, fade-up on viewport entry, no continuous loops — what a competent residential plumber's calendar feels like, not a marketing reel.

---

## Visual atoms — owned by T3 PLUMBERS

These atoms are signature to CLEARLINE / CLEAN WATER SERVICE. Future PLUMBERS templates (T4 if it ever ships) should NOT reuse them.

- **AquaRule** — 1px chrome hairline divider (renamed from generic `Hairline` to avoid shadcn collision)
- **RippleRule** — static SVG sine-wave divider (water-motion shape, zero animation)
- **WaterDot** — droplet inscribed in a chrome circle (different from T1 DropSeal bare droplet, T2 BrassMedallion)
- **PipeTick** — short vertical pipe-segment mark with chrome ferrules (kicker prefix)
- **ServicePill** — rounded card frame with soft drop-shadow elevation + hover lift (~70% of cards)
- **MeterPanel** — square-bottom stamp card with chrome border + aqua-deep heading band (~30% of cards, breaks the all-pill rhythm)
- **FlowChip** — pill-shaped trust-signal badge
- **RescuePill** — vermillion pill for emergency framing (Hero row + sticky bottom + callout variants)
- **PressureGauge** — small dial SVG with needle (the trade anchor that pulls the page away from SaaS register)
- **AquaScrim** — DIM LAYER component (CLAUDE.md rule #2b) with `soft|default|strong` opacity, `ink|harbor-night|aqua-deep` tones
- **WaveWash** — atmospheric soft-blue radial-gradient overlay (layered ON TOP of AquaScrim, never replaces it)
- **ServiceDot** — Lucide icon resolver wrapped in soft-blue circle (uses `parseServices`)
- **StarAqua** — cyan-filled stars from digit string

Color signature: **cloud-white `#fafcfd` + bright cyan `#06b6d4` + aqua-deep `#0e7c9c` + vermillion `#ef5b2b` reserved for emergency**, with one dark cyan-navy `#0e3a52 → #0c4a6e` interlude in RescueBar + Footer.

Typography signature: **Mona Sans Black 900 display + Inter body + Geist Mono utility** — pure grotesque trio.

Layout signature: **rounded-3xl ServicePill cards with soft drop-shadow lifts + square-bottom MeterPanel stamp cards alternating, Geist Mono kickers with leading PipeTick, photographic Hero/About/Gallery/CTA mandatory**.

Motion signature: **fade-up on viewport entry + soft elevation hover lifts, ZERO continuous loops, bottom-RIGHT cookie button (no animation) + bottom-CENTER sticky vermillion rescue pill (one-shot fade-in past 50% scroll)**.

---

## Notes for future PLUMBERS templates / categories — DO NOT do

T1 PLUMBERS (TIDEWATER / SLATE & COPPER) + T2 PLUMBERS (BRASS LINE / SHOP DRAWINGS) + T3 PLUMBERS (CLEARLINE / CLEAN WATER SERVICE) collectively own everything below. A T4 PLUMBERS (the only direction left is DRAIN OR FLOW, and it sits dangerously close to T1's lane) would need its own atoms.

**Owned palette (DO NOT reuse as primary):**
- T1: deep teal-navy `#0c1f29` family + warm copper `#b06a3b` family + slate-mist `#e8eef0` + emergency red `#dc2626`
- T2: warm bone `#f4ede2` family + brass `#b8923f` family + harbor-deep `#152a45` + crimson `#b1271f`
- T3: cloud-white `#fafcfd` + bright cyan `#06b6d4` family + aqua-deep `#0e7c9c` + chrome silver `#cdd5db` + vermillion `#ef5b2b` + harbor-night `#0e3a52` family

**Owned typography (DO NOT reuse the pairings):**
- T1: Fraunces (serif display) + Inter Tight (body) + JetBrains Mono (utility)
- T2: IBM Plex Serif (slab display) + Work Sans (body) + Space Mono (utility)
- T3: Mona Sans Black 900 (grotesque display) + Inter (body) + Geist Mono (utility)

T4 should pick a typography lane that breaks all three: a punk slab serif (Source Serif 4, Newsreader, Cooper) + a different sans body (DM Sans, Outfit) + a different mono (DM Mono, Roboto Mono). Avoid the entire grotesque family Mona Sans / Manrope / Inter / Helvetica Neue display lane (T3 owns it).

**Owned component names and atoms (DO NOT reuse the names):**
- T1: TideLine, DropSeal, FittingBracket, CopperRule, WaterScrim, FlowWash, PlumbingIcon, StarRow
- T2: PlateLine, BrassMedallion, RiserMark, DraftRule, SchemaScrim, PaperGrain, StampSeal, StampSealLabel, PlumbingMark, StarBrass
- T3: AquaRule, RippleRule, WaterDot, PipeTick, ServicePill, MeterPanel, FlowChip, RescuePill, PressureGauge, AquaScrim, WaveWash, ServiceDot, StarAqua
- T1 section names: Header, Hero, TrustBar, Services, About, WhyChooseUs, Gallery, Reviews, QuoteSection, CtaSection, ContactSection, EmergencyButton
- T2 section names: MastHeader, OpeningPlate, SpecStrip, ServiceSheet, ShopBio, Standards, WorkshopPlate, ClientNotes, QuoteTicket, CallSheet, ContactCard, EmergencyStrip
- T3 section names: TopBar, LandingHero, BadgeStrip, ServiceMenu, CompanyStory, Promise, MomentGallery, Testimonials, RequestPanel, RescueBar, ReachUs, StickyRescue
- Style names: "Tidewater / Slate & Copper" (T1), "Brass Line / Shop Drawings" (T2), "Clearline / Clean Water Service" (T3)

**Owned emergency treatments (DO NOT reuse):**
- T1: bottom-RIGHT floating sticky button with red pulse animation
- T2: always-visible top EmergencyStrip on bone-deep surface with crimson StampSeal
- T3: in-Hero `RescuePill` row + sticky bottom-CENTER slim vermillion pill that fades in past 50% scroll
- T4 options: a sidebar emergency rail, a corner-stamped emergency mark on every section, a fixed-position bottom-LEFT emergency button (T1+T2 owned bottom-LEFT for cookie button only — emergency at bottom-LEFT remains unclaimed)

**Owned cookie button positions/styles (DO NOT reuse):**
- T1: bottom-LEFT copper circle with continuous ripple loop
- T2: bottom-LEFT brass-circle StampSeal-style (no continuous animation)
- T3: bottom-RIGHT aqua circle with droplet icon, no continuous animation, hover-only soft shadow lift
- T4 options: bottom-LEFT with a different shape AND different motion (e.g., a square card with subtle breathe), or top-positioned (corner of header)

**Owned animation philosophies (DO NOT reuse):**
- T1: fluid + responsive (water-like) with continuous ripple loops
- T2: measured + procedural (draftsman placing lines) with no continuous loops, brass-shine static gradient
- T3: crisp + lifted (elevation/depth) with soft drop-shadow lifts and zero continuous loops
- T4 options: photographic-driven (image-led parallax), or kinetic-typographic (display-text driven), or single-loop ambient (one slow continuous element, e.g., a vertical pipe section that fills with water)

**The DRAIN OR FLOW direction** (deep indigo/teal washes + chrome silver + coral copper, photo-led with water motion) remains technically reserved if T4 ever ships, but it sits dangerously close to T1's lane. T4 would need to push significantly further into chrome/photo/motion territory — likely with a near-monochrome chrome+navy palette and a single coral pop — to differentiate cleanly.

---

## File map

```
app/
  layout.tsx           Mona Sans + Inter + Geist Mono via next/font/google.
                       suppressHydrationWarning on html AND body.
                       parseColors → CSS vars (--color-primary/-secondary/-accent).
                       <CookieConsent /> + <StickyRescue /> injected after children.
  page.tsx             12-section orchestration (TopBar through Footer).
  globals.css          Base resets + reduced-motion guard + select arrow tinted aqua-deep.
  api/
    quote/route.ts     Resend + zod, plumbing fields, parses req.formData() for photos.
                       MIME whitelist + size re-validation + filename sanitization.
                       attachments: [{ filename, content }] passed to Resend.
                       PREVIEW_FORWARD_TO || "{{EMAIL}}" fallback.
                       renderEmailHtml({kind:"quote", attachments})
    contact/route.ts   Resend + zod, JSON only (no photos).
                       renderEmailHtml({kind:"contact"})
  privacy-policy/page.tsx     Real content using {{BUSINESS_NAME}} + {{FULL_ADDRESS}}.
  terms-of-service/page.tsx   Real content using {{BUSINESS_NAME}} + {{FULL_ADDRESS}}.
  cookie-policy/page.tsx      Real content + "Manage cookie preferences" button.

components/
  TopBar.tsx           Sticky transparent → cloud-solid + backdrop-blur, mobile drawer
  LandingHero.tsx      Split layout: ServicePill image right + foreground stack left,
                       AquaScrim + WaveWash on image, RescuePill emergency row
  BadgeStrip.tsx       Static row of 6 FlowChip trust signals + 1 PressureGauge MeterPanel,
                       pearl surface, RippleRule above/below
  ServiceMenu.tsx      Split header + 3-col mixed-rhythm grid (ServicePill+MeterPanel)
  CompanyStory.tsx     Split with framed ABOUT image + promises grid
  Promise.tsx          4-col MeterPanel grid on pearl (all-MeterPanel section)
  MomentGallery.tsx    Single ServicePill-framed GALLERY_1 + chrome caption strip
  Testimonials.tsx     Google badge + 2x2 MeterPanel grid + StarAqua + Inter body
  RequestPanel.tsx     Split pitch + MeterPanel-framed QuoteForm with sky-wash bg
  RescueBar.tsx        Full-bleed CTA + AquaScrim strong + harbor-night gradient
  ReachUs.tsx          3-stack MeterPanel info cards + ServicePill ContactForm
  Footer.tsx           Dark cyan-navy gradient + manifesto + 4 social + AquaRule + 4-col grid
  CookieConsent.tsx    3-state machine, bottom-RIGHT aqua circle (gated correctly)
  StickyRescue.tsx     Sticky bottom-CENTER vermillion pill, fades in past 50% scroll
  forms/
    QuoteForm.tsx      RHF + zod, plumbing-specific selects, photo upload via compressImage,
                       multipart/form-data submit, MeterPanel-styled drop zone
    ContactForm.tsx    RHF + zod, simpler, JSON submit
  ui/
    Logo.tsx           Native <img>, dual variant
    TikTokIcon.tsx     Custom stroke SVG
    XIcon.tsx          FontAwesome faXTwitter wrapper
    AquaRule.tsx       1px chrome hairline divider
    RippleRule.tsx     Static SVG sine-wave divider
    WaterDot.tsx       Droplet-in-circle SVG
    PipeTick.tsx       Short vertical pipe-segment kicker prefix
    ServicePill.tsx    Rounded card frame with elevation + hover lift
    MeterPanel.tsx     Square-bottom stamp card with chrome border + aqua-deep heading band
    FlowChip.tsx       Pill-shaped trust-signal badge
    RescuePill.tsx     Vermillion emergency pill (hero-row / sticky-slim / callout variants)
    PressureGauge.tsx  Dial SVG with needle (TESTED · 80 PSI strings)
    AquaScrim.tsx      Dim layer (CLAUDE.md rule #2b)
    WaveWash.tsx       Atmospheric soft-blue radial-gradient overlay
    ServiceDot.tsx     Lucide icon resolver in soft-blue circle (parseServices keyword map)
    StarAqua.tsx       Cyan-filled stars from digit string

lib/
  emailTemplate.ts     T3 light cloud email — Mona Sans Black + Inter + Geist Mono with
                       system fallbacks (Helvetica Neue / Arial Black for display, Menlo /
                       Consolas for mono), aqua-deep header band, aqua kicker, vermillion
                       reply stripe, optional attachments section, pinned link colors,
                       MSO Outlook conditional fallback. NO anti-double-inversion meta tags
                       (light email — only required for dark).
  cookieConsent.ts     localStorage helpers + custom event for cross-component sync
  imageCompress.ts     Same exports as T2 contract — MAX_PHOTOS=5, MAX_BYTES_PER_FILE=1_000_000,
                       MAX_BYTES_TOTAL=3_500_000, ACCEPTED_MIME, compressImage(),
                       canvas resize 1600px max + JPEG 0.85 (retry 0.7 if overshoot)
  parseColors.ts       {{LOGO_COLORS}} CSV → CSS var trio
  parseServices.ts     {{SERVICES}} CSV → [{name, icon, descriptor}] using PLUMBERS Lucide map
                       with T3 voice descriptors (residential clinical, "we won't ruin your floor")
  cn.ts                Classname helper

.env.example, .gitignore, next.config.ts, package.json, postcss.config.mjs,
tailwind.config.ts, tsconfig.json, next-env.d.ts
```

---

## References / inspiration

- Modern residential utility branding (clean-water companies, not industrial plumbing)
- Pacific Northwest cyan/navy water palette
- Hospital signage typography (Mona Sans Black 900 — punchy, signage-grade, signage-readable)
- Vermillion `#ef5b2b` as a calibrated emergency color — distinct from red `#dc2626` (T1) and crimson `#b1271f` (T2), more saturated than coral `#f97316` (which would read "agency / Stripe success state")
- Drop-shadow elevation as a depth language — what an Apple Health card or a Linear modal feels like, scaled down for plumbing trade clarity
- The `PressureGauge` atom — a real plumbing-trade artifact (every job has a pressure test) — pulls the page back from SaaS register
