# ELECTRICIANS / Template_2 — BLUEPRINT / GRID

The licensed master electrician's spec-sheet identity. Paper-white surface, blueprint grid, sapphire blue primary accent, hazard yellow reserved for the SafetyTape diagonals. Every section reads like a sheet on a technical drawing set: title block, sheet number, measure ruler, crosshair setting-out points.

The 24/7 emergency framing lives in a top-anchored alert band that scrolls with the page — not a bottom-right pulsing button (that's T1's atom).

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
| `paper.DEFAULT` | `#fafbfc` | Primary surface (paper white) |
| `paper.deep` | `#f1f4f7` | Raised paper / blueprint tint |
| `paper.tint` | `#e4ebf2` | Graph-paper tint |
| `paper.rule` | `#cbd5e0` | Light surface rule |
| `steel.DEFAULT` | `#475569` | Mid-grey body text |
| `steel.deep` | `#1e293b` | Ink for headlines |
| `steel.ink` | `#0f172a` | Deepest punch |
| `steel.mute` | `#64748b` | Muted text on paper |
| `steel.rule` | `#94a3b8` | Mid rule |
| `steel.panel` | `#334155` | Dark panel for accent strips |
| `sapphire.DEFAULT` | `#1e40af` | Primary trade accent (deep institutional blue) |
| `sapphire.bright` | `#2563eb` | Hover / focus |
| `sapphire.deep` | `#1d4ed8` | Pressed |
| `sapphire.glow` | `#3b82f6` | Lifted highlights / on-dark text |
| `sapphire.tint` | `#dbeafe` | Light wash on paper |
| `hazard.DEFAULT` | `#eab308` | RESERVED for SafetyTape stripes only (NOT primary accent) |
| `hazard.deep` | `#a16207` | Deeper stripe |
| `alert.DEFAULT` | `#dc2626` | Reserved for EmergencyBanner top band |
| `alert.deep` | `#991b1b` | Pressed |
| `alert.tint` | `#fee2e2` | Inline error backgrounds |
| `midnight` | `#020617` | Deepest scrim base for image dim layers |

**Key palette differences vs T1 ELECTRICIANS:**
- Primary surface: paper white `#fafbfc` (T2) vs voltage navy `#0a1929` (T1) — light-mode vs dark-mode
- Primary accent: sapphire blue `#1e40af` (T2) vs voltage amber `#fbbf24` (T1)
- Hazard yellow used DIFFERENTLY: T1 used amber as primary CTA color; T2 confines hazard yellow to the SafetyTape diagonal stripe atom only

---

## Typography

| Role | Font | Why |
|------|------|-----|
| Display (`--font-display`) | **Space Grotesk** | Technical-neutral grotesque. Set in regular case (NOT UPPERCASE — that's T1's signature). Weights 500 / 600 / 700. Outlook fallback: `'Helvetica Neue', Helvetica, Arial, sans-serif`. |
| Body (`--font-sans`) | **Inter Tight** | Tighter horizontal width than T1's regular Inter. More contemporary register. Weights 400 / 500 / 600. Outlook fallback: `Arial, Helvetica, sans-serif`. |
| Mono (`--font-mono`) | **IBM Plex Mono** | Humanist mono. Distinct from T1's JetBrains Mono. Weights 400 / 500. Outlook fallback: `'Courier New', monospace`. |

**Key typography differences vs T1 ELECTRICIANS:**
- Display: Space Grotesk (technical-neutral grotesque) vs Archivo Black (heavy industrial geometric)
- Display register: regular case with tight tracking vs T1's UPPERCASE-everywhere
- Mono: IBM Plex Mono (humanist) vs JetBrains Mono (geometric)
- Body: Inter Tight vs Inter (close cousins, tighter width)

---

## Visual atoms (reserved for T2 ELECTRICIANS)

T1 ELECTRICIANS reserved its atoms (PanelLabel, ConduitFrame, ArcScrim, FilamentGlow, VoltageRule, CircuitDivider, VoltageMeter, EmergencyButton). T2 introduces a fresh set:

| Atom | Role | T1 equivalent (DO NOT confuse) |
|------|------|-------------------------------|
| `<BlueprintCell />` | Section header — title-block card with sheet number + title + spec note | T1's `<PanelLabel />` |
| `<SchematicMark />` | Small crosshair / target annotation glyph | (T1 had no equivalent — kicker dots) |
| `<TargetMarker />` | Larger crosshair SVG used as separator in TrustBar / Footer | T1's `<VoltageMeter />` |
| `<MeasureRule />` | Ruler-style hairline divider with tick increments | T1's `<VoltageRule />` |
| `<SafetyTape />` | Diagonal hazard-tape divider (yellow + steel) | T1's `<CircuitDivider />` (different visual metaphor) |
| `<SchematicFrame />` | Image / card frame with crosshair corner marks | T1's `<ConduitFrame />` (T1 had L-shaped brackets; T2 has plus-sign corners) |
| `<GridScrim />` | Image dim layer per claude.md #2b | T1's `<ArcScrim />` |
| `<GridGlow />` | Subtle blueprint-grid background overlay (atmospheric) | T1's `<FilamentGlow />` |
| `<EmergencyBanner />` | Top-anchored alert band that scrolls with the page | T1's `<EmergencyButton />` (different placement: top vs bottom-right; different visual: band vs circle) |

Universal atoms (T1 also uses, T2 reuses without conflict):
- `<Logo />` (dual variant, native `<img>`)
- `<TikTokIcon />`, `<XIcon />`
- `<StarRow />`, `<ServiceIcon />`

---

## Sections (12, in order per claude.md hard rule #4)

| # | Section | T2 layout note |
|---|---------|---------------|
| 1 | Header | Sticky paper-white. NOT transparent → solid swap (that's T1). |
| 2 | Hero | Split layout: copy LEFT, image-in-SchematicFrame on RIGHT with spec sidebar overlay. NOT full-bleed image (that's T1). |
| 3 | TrustBar | Slow ticker scroll on steel-deep band. NOT static row (that's T1). |
| 4 | Services | Equal 3-col grid. Image card is FULL-WIDTH ABOVE the grid, NOT 5/7 asymmetric beside the grid (that's T1). |
| 5 | About | Text LEFT, image RIGHT in SchematicFrame. NOT image LEFT, text RIGHT (that's T1). |
| 6 | WhyChooseUs | 4-column on dark steel band. Sheet-ordinal labels above each tile. |
| 7 | Gallery (single cell — no GALLERY_2) | Hazard-tape strip ABOVE image card, then SchematicFrame around image. NOT ConduitFrame L-brackets (that's T1). |
| 8 | Reviews (2x2 grid + Google badge) | Sapphire-blue accents on white cards. NOT amber on volt-panel (that's T1). |
| 9 | QuoteSection | Image-bg with GridScrim dim. Form on paper-white card, NOT in a ConduitFrame (that's T1). |
| 10 | CtaSection | Image-bg with GridScrim. SafetyTape strips top + bottom, NOT CircuitDivider (that's T1). |
| 11 | ContactSection | Info columns LEFT with MeasureRule above each block, NOT amber-bordered left edges (that's T1). |
| 12 | Footer | Steel-ink dark band, sapphire-glow accents. SafetyTape strip top atmospheric, NOT amber-rule (that's T1). |

Plus the chrome:
- `components/CookieConsent.tsx` (banner + modal + floating button, claude.md #6 visibility logic)
- `components/EmergencyBanner.tsx` (TOP-anchored 24/7 phone band — different placement from T1's bottom-right button)

---

## Placeholders used (verified via `pnpm run preview:list` — all 46 honored where applicable)

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
| `HERO_HEADLINE` | `Hero.tsx` | "Power up. / Wired right. / From outlet to grid." |
| `ABOUT_HEADLINE` | `About.tsx` | "We sign the work. / We pull the permits. / We answer the phone." |
| `WHY_TILE_01_ORDINAL` ... `_04_ORDINAL` | `WhyChooseUs.tsx` | "Standard 01" ... "Standard 04" |
| `WHY_TILE_01_HEADLINE` | `WhyChooseUs.tsx` | "Licensed & insured" |
| `WHY_TILE_02_HEADLINE` | `WhyChooseUs.tsx` | "After-hours response" |
| `WHY_TILE_03_HEADLINE` | `WhyChooseUs.tsx` | "Up-front pricing" |
| `WHY_TILE_04_HEADLINE` | `WhyChooseUs.tsx` | "Master on staff" |
| `CTA_HEADLINE` | `CtaSection.tsx` | "After hours? / You still call us." |

---

## Animation philosophy

Quiet, deliberate, technical. No flashy effects. Slow ticker scroll on TrustBar (60s linear), grid-breath background tint (7s), alert-pulse on the EmergencyBanner alert icon (1.4s — barely visible), rise-up on cards (0.5s). Reduced-motion guard kills all animations to ~0.001ms. The site reads as a **steady-spec** brand — measured, not marketing-glossy.

---

## Inspiration & references

- Architectural and electrical drawing title blocks (the sheet-number + title-spec card in the corner of every blueprint)
- Set-square / scale ruler markings on technical drawings
- Crosshair setting-out marks used by surveyors and electricians
- Hazard-tape jobsite signage (the diagonal black-yellow stripe — used here SPARINGLY)
- Specification sheets and submittal documents (the spec-sheet register of the copy)
- Top-anchored alert bands on dispatch / control-room UIs (the EmergencyBanner)

---

## Notes for Template_3 ELECTRICIANS — DO NOT do

T3 ELECTRICIANS must pick **fresh visual atoms** and **a locked color palette** that doesn't conflict with T1 OR T2. Combined reservations from both T1 and T2:

### Reserved component names (DO NOT reuse — across T1 and T2)
T1 reserves:
- `<PanelLabel />`, `<ConduitFrame />`, `<ArcScrim />`, `<FilamentGlow />`, `<VoltageRule />`, `<CircuitDivider />`, `<VoltageMeter />`, `<EmergencyButton />`

T2 adds:
- `<BlueprintCell />`, `<SchematicMark />`, `<TargetMarker />`, `<MeasureRule />`, `<SafetyTape />`, `<SchematicFrame />`, `<GridScrim />`, `<GridGlow />`, `<EmergencyBanner />`

T3 must invent fresh names — e.g. `<NeonBracket />`, `<FilamentScrim />`, `<CopperRule />`, `<SparkMark />`, `<NightVeil />`, `<RibbonDivider />`, etc., depending on direction.

### Reserved typography (DO NOT reuse)
T1: Archivo Black + Inter + JetBrains Mono. UPPERCASE display.
T2: Space Grotesk + Inter Tight + IBM Plex Mono. Regular case display.

T3 should pick a fresh display family — options that DON'T clash:
- A geometric-modern serif (e.g. **Fraunces**, **GT Sectra**, **Recoleta**)
- A condensed industrial sans like **Bebas Neue**, **Anton**, or **Oswald** (close to T1's lane but with different proportions — risky)
- A humanist serif like **PP Editorial New**, **GT Super**, or **DM Serif Display**
- A contemporary mono-display like **Geist Mono Display** for a programmer-tool register

Pair with body and mono fonts that don't overlap T1 or T2.

### Reserved palette (DO NOT reuse as primary)
T1: voltage navy + amber + arc cyan
T2: paper white + sapphire blue + hazard yellow (constrained) + alert red

T3 directions still available:
- **NEON / LATE NIGHT** (deep black + neon cyan + filament glow) — T1 reserved this in its notes; T3 can claim it
- **SPARK / IGNITION** (cream + copper + matte navy) — caveat: pair copper with a non-tide surface to avoid PLUMBERS T1 collision
- **OUTLET / RESIDENTIAL** (warm grey + copper + cream) — soft, homey
- **HOT WIRE** (deep crimson + warm cream + matte black) — fully untaken
- **SOLAR / GRID-FORWARD** (sage green + amber + cream) — fully untaken, leans into solar/EV register

### Reserved language tokens (DO NOT reuse)
From T1: "Live", "200A", "breaker", "circuit", "conduit", "panel cover", "service entrance", "wired clean", "code-compliant", "labeled clean"
From T2: "From outlet to grid", "Tested. Tagged. Trusted.", "Sheet-XX", "spec-sheet", "blueprint", "drawings filed", "title block", "We sign the work."

T3 must coin its own electrical-trade-coherent vocabulary.

### Reserved layout signatures
T1: PanelLabel as section header; 5/7 asymmetric Services (image-card + service-grid); bottom-right pulsing red emergency button
T2: BlueprintCell as section header; equal 3-col Services with full-width image strip above; top-anchored emergency band; ticker-scroll TrustBar; light-mode primary

T3 must invent a different section-header pattern, a different services layout, a different emergency CTA placement, and a different TrustBar treatment.

### Reserved emergency framing placements
T1: bottom-right sticky pulsing button
T2: top-anchored band scrolling with the page

T3 options still open:
- Inline within the hero metadata sidebar (quietly)
- Side-rail floating element (left or right edge, half-visible)
- Footer band (above the legal strip)
- Dispatched-line spec card embedded in the contact section
- Floating-action ribbon that slides in on scroll

---

## Build status

```
$ pnpm run build
Errors: 0 | Warnings: 0
$ pnpm run preview:list   # all 46 placeholders resolve cleanly
```

Verified: 46 placeholders kept literal, no T1 reserved component names used, no Archivo Black, no T1 reserved language tokens in user-rendered copy, no heritage-locked copy, no em-dashes in user-facing text, no "Family-Owned", no ETA values, no GALLERY_2 placeholder, no wrong-industry framing (vehicle / garage / plumbing), Resend env fallback present, emailTemplate used by both routes, hydration safety on html+body, cookie button visibility keyed on `!showBanner && !showModal`, GridScrim dim layer present on Hero / CtaSection / QuoteSection, footer rich with manifesto + 4-col grid + bottom legal strip + SafetyTape atmospheric strip, photo attachments wired across compressImage / req.formData() / Resend.attachments / emailTemplate "Photos attached" section.
