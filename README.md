# Pandsy — Up to 375 Personalized Sites Built & Pitched Daily

> An automated pipeline that scrapes local-business leads across the US, generates and deploys a polished, individually-branded website for each one in ~90 seconds, then cold-emails it straight to the owner — ramping to **~375 sites pitched per day** across 15 warmed inboxes. Scrape → build → deploy → outreach → track, all orchestrated from a single Google Sheet.

Private-origin project (2026), published as an archive. Not a product, not open source. Infrastructure endpoints and credentials have been stripped.

<p align="center">
  <img src="docs/banner.png" alt="Pandsy — Better websites. More clients." width="520">
</p>

---

## What it was

Most local businesses — auto-repair garages, plumbers, electricians — have no website or a bad one. Pandsy turned a scraped list of them into **production-deployed, individually-branded websites at scale**, then used each live site as the hook for a cold-email campaign: *"here's a free website I built for your shop — want it?"*

Everything ran off one **Google Sheet** acting as the lead database and the control panel. Each row was a business; its columns drove scraping, generation, deployment, emailing, and tracking.

**By the numbers**
- **~375 sites/day** pitched at full ramp — 15 warmed inboxes × 25 sends/inbox/day
- **~90 seconds** per site — scrape data in, live URL out
- **~$0 generation cost** — template-based, **no LLM tokens** at render time
- **9 designs** — 3 verticals × 3 template variants, picked by business type
- **~2,000** qualified US lead stock, scraped and scored continuously
- **~$150/month** all-in infrastructure at steady state

---

## How it works

```mermaid
flowchart LR
    SHEET[("Google Sheet<br/>FULL LEADS — the brain")]

    subgraph n8n [n8n orchestration · self-hosted]
      direction TB
      A["Workflow A<br/>Lead Scraper<br/>(Google Places)"]
      B["Workflow B<br/>Site Generator"]
      C["Workflow C<br/>Cold-Email Sender<br/>+ tracking"]
      A --> B --> C
    end

    SHEET --> A
    B --> GEN["Generator engine<br/>(Node / Express)"]
    GEN --> VERCEL["Vercel<br/>per-site deploy"]
    GEN --> SHOT["Headless screenshots"]
    VERCEL --> SITE[("business.pandsy.com")]
    C --> GMAIL["Gmail API<br/>15 rotating inboxes"]
    GMAIL --> PROSPECT(("Prospect"))
    PROSPECT -. opens · clicks · replies · calls .-> SHEET
    SITE --> SHEET

    classDef sheet fill:#fbbf24,stroke:#b45309,color:#111827,font-weight:bold;
    classDef wf fill:#3b82f6,stroke:#1e40af,color:#ffffff;
    classDef gen fill:#10b981,stroke:#047857,color:#ffffff;
    classDef host fill:#111827,stroke:#000000,color:#ffffff;
    classDef mail fill:#ef4444,stroke:#b91c1c,color:#ffffff;
    classDef prospect fill:#a855f7,stroke:#7e22ce,color:#ffffff;
    class SHEET sheet;
    class A,B,C wf;
    class GEN,SHOT gen;
    class VERCEL,SITE host;
    class GMAIL mail;
    class PROSPECT prospect;
```

1. **Scrape — Workflow A.** Pulls US local businesses from the Google Places API (name, address, phone, hours, Google reviews, category) into the Sheet, and builds the correct *"leave a review"* link for each (`writereview?placeid=…`). Leads are scored and anything that already has a real website is filtered out (a Playwright site-check tests each prospect's domain).
2. **Generate — Workflow B.** Picks the next approved lead, calls the generator engine: it selects a template by business type, injects the real business data, builds the Next.js site, deploys it to Vercel under a `*.pandsy.com` subdomain, disables deployment protection, and captures hero + full-page screenshots. The live URL + captures are written back to the Sheet.
3. **Outreach — Workflow C.** A sender running every 2 minutes: reads the Sheet, filters `approved` leads inside the send window, assigns an inbox + template (rotation across 15 Gmail inboxes, per-inbox daily cap, 18–22 min gap), builds a personalized email with branded tracked links, sends via the Gmail API, and logs everything back to the Sheet (`LEADS` + `SEND-LOG`).
4. **Track.** Opens, clicks, replies, unsubscribes and inbound calls all flow back into the Sheet, with Telegram pings for anything needing a human.

---

## The Google Sheet — the brain

The entire operation was driven by one spreadsheet. No dashboards, no DB UI — just tabs and columns that every workflow reads and writes.

- **FULL LEADS** — the master list: business data, lead score, `Status`, the generated Site URL, and the tracking columns (**Opened / Clicked / Replied / Called**) that tick as the campaign runs.
- **COLD EMAIL CAMPAIGN** — the week-by-week send roadmap (warmup → ramp → regime, up to 375 mails/day across 15 inboxes).
- **INBOX-STATUS** — per-inbox daily cap and usage (25/inbox/day → 375 total).
- **EMAIL-TEMPLATES** — the rotating template pool with per-template stats.
- **COSTS / LEADS** and **COMPTABILITE** — per-scrape cost + yield, and the running cost ledger.

### The `Status` column — the state machine

Every row advances through the `Status` field, and each value is the signal that tells the next workflow whether to pick the row up:

| Status | Meaning |
|---|---|
| `scraping_done` | Workflow A scraped, enriched (phone, email, logo, reviews) and **scored** the lead. Sitting in the pool. |
| `approved` | Passed the quality gate (good score, **no existing website**) → eligible for site generation. |
| `generating` | Workflow B **locked** the row and the generator is building + deploying the site (the lock prevents double-processing). |
| `emailed` | Workflow C sent the cold email — an inbox + template were assigned and logged to SEND-LOG. |
| `called` | An inbound call from the prospect was logged via call-tracking — the hottest signal. |
| `skipped` | Filtered out — the business already has a real website, so no site is built. |
| `failed` / `timeout` | Generation or send errored; the row is reset for a later retry. |

Leads are also segmented by quality with **SCORE 1–4** banners, highest-intent first.

### FULL LEADS — the master tab

Scored leads with full business data (lead emails + phones redacted), alongside the generation + outreach columns that write back live (Pandsy inboxes redacted):

<table>
<tr>
<td width="50%"><a href="docs/screenshots/sheet/full-leads-1.jpg"><img src="docs/screenshots/sheet/full-leads-1.jpg" alt="FULL LEADS — scored leads, business data (SCORE 1)"></a></td>
<td width="50%"><a href="docs/screenshots/sheet/full-leads-2.jpg"><img src="docs/screenshots/sheet/full-leads-2.jpg" alt="FULL LEADS — site generation and outreach tracking"></a></td>
</tr>
</table>

![FULL LEADS — scored leads, business data (SCORE 2–4)](docs/screenshots/sheet/full-leads-3.jpg)

### The other tabs

**COLD EMAIL CAMPAIGN** — warmup → ramp → 375 mails/day, week by week:

![COLD EMAIL CAMPAIGN](docs/screenshots/sheet/email-campaign.jpg)

**INBOX-STATUS** — 15 inboxes, 25 sends/inbox/day = 375/day cap (Pandsy addresses redacted):

![INBOX-STATUS](docs/screenshots/sheet/inbox-status.jpg)

**EMAIL-TEMPLATES** — the rotating template pool:

![EMAIL-TEMPLATES](docs/screenshots/sheet/email-templates.jpg)

**COSTS / LEADS** — per-scrape cost and lead yield, by score:

![COSTS / LEADS](docs/screenshots/sheet/costs-leads.jpg)

**COMPTABILITE** — the running cost ledger, ~$150/mo at steady state (founder names + personal split redacted):

![COMPTABILITE](docs/screenshots/sheet/comptabilite.jpg)

---

## The n8n pipeline

Three workflows do the work (shown here from a local re-import of the real exports; credentials stripped).

**Workflow A — Lead Scraper**
![Workflow A](docs/screenshots/workflows/workflow-a.png)

**Workflow B — Site Generator**
![Workflow B](docs/screenshots/workflows/workflow-b.png)

**Workflow C — Cold-Email Sender**
![Workflow C](docs/screenshots/workflows/workflow-c.png)

---

## The 9 templates

Hand-built Next.js (App Router) + Tailwind templates, polished to WCAG AA — 3 variants per vertical. Every business-specific value is a `{{PLACEHOLDER}}` the generator fills; shown here with showcase demo data.

### Auto Repair
| Template 1 | Template 2 | Template 3 |
|---|---|---|
| ![](docs/screenshots/templates/auto-repair-t-1.png) | ![](docs/screenshots/templates/auto-repair-t-2.png) | ![](docs/screenshots/templates/auto-repair-t-3.png) |

### Electricians
| Template 1 | Template 2 | Template 3 |
|---|---|---|
| ![](docs/screenshots/templates/electricians-t-1.png) | ![](docs/screenshots/templates/electricians-t-2.png) | ![](docs/screenshots/templates/electricians-t-3.png) |

### Plumbers
| Template 1 | Template 2 | Template 3 |
|---|---|---|
| ![](docs/screenshots/templates/plumbers-t-1.png) | ![](docs/screenshots/templates/plumbers-t-2.png) | ![](docs/screenshots/templates/plumbers-t-3.png) |

**Live demos** (showcase data):
- Auto Repair — [t-1](https://auto-repair-t-1.vercel.app) · [t-2](https://auto-repair-t-2.vercel.app) · [t-3](https://auto-repair-t-3.vercel.app)
- Electricians — [t-1](https://electricians-t-1.vercel.app) · [t-2](https://electricians-t-2.vercel.app) · [t-3](https://electricians-t-3.vercel.app)
- Plumbers — [t-1](https://plumbers-t-1.vercel.app) · [t-2](https://plumbers-t-2.vercel.app) · [t-3](https://plumbers-t-3.vercel.app)

---

## The generator engine (`generator/`)

A small Node/Express service that turns one business's data into a deployed site.

- **Template-based, zero LLM at render time** — deterministic, fast, free. Data flows into `{{PLACEHOLDER}}` tokens.
- **Category normalization** — tolerant of messy source data (`AUTO REPAIR`, `Auto Repair`, `auto-repair` → `AUTO_REPAIR`).
- **Real assets or graceful fallback** — pulls the business's logo/photos, falls back to template samples or a clean text logo when missing.
- **Deploy + harden** — deploys to Vercel, then disables Vercel Authentication via the REST API so prospects (and screenshot bots) see the site, not a login wall.
- **Screenshots** — headless Chromium captures hero + full-page, handling cookie banners, sticky headers and lazy-loaded images.

| File | Role |
|---|---|
| `server.js` | Express API, serial job queue, screenshot serving |
| `generate-site-v2.js` | core: template pick → data injection → build → Vercel deploy → SSO disable |
| `pipeline.js` | orchestration helpers |
| `placeholder-substitute.js` | `{{PLACEHOLDER}}` substitution |
| `category-detector.js` | business-type normalization |
| `screenshot.js` | headless hero + full-page capture |
| `post-sale.js` | post-conversion handoff |

---

## Tech stack

- **Generation**: Node.js, Express, Playwright (Chromium)
- **Sites**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Orchestration**: n8n (self-hosted on a Hetzner VPS)
- **Data**: Google Sheets API (lead database), Google Places API (scraping)
- **Hosting**: Vercel (per-site deployments, `*.pandsy.com`)
- **Email**: Gmail API across 15 inboxes + Resend, with open/click/reply tracking
- **Telephony**: tracked phone number, call forwarding + logging
- **Alerts**: Telegram

---

## Repository structure

```
.
├── generator/     Node/Express site-generation engine
├── templates/     9 Next.js templates (3 verticals × 3 variants) + showcase deploy scripts
├── docs/          screenshots (templates · workflows · sheet)
├── .env.example   required environment variables
└── README.md
```

## Running it (reference)

Archive — not wired to live infrastructure. See [`.env.example`](.env.example).

```bash
cd generator && npm install && cp ../.env.example .env   # fill in your own values
node server.js
```

Deploy the 9 showcase templates to Vercel with demo data:

```bash
cd templates && VERCEL_SCOPE=your-team node scripts/deploy-showcase.mjs
```

---

## Notes

- **Private-origin & archived.** Kept for the record, not maintained.
- **Sanitized.** All real endpoints, IPs, IDs, phone numbers and credentials were removed. The raw n8n workflow exports are intentionally not included — the pipeline is documented instead.
