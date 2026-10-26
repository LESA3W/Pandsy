# P&S Agency — Templates Library

Reusable Next.js site templates for local-service businesses. Each template is a
fully working site with `{{PLACEHOLDERS}}` that the pipeline fills with any
client's scraped data (colors, font, logo, reviews, images) and ships to Vercel.

3 categories × 3 visually distinct templates = **9 demos**, each on a stable
branded URL that always serves the latest version. When a template is updated
and pushed, the same link reflects the change (no versioned URLs).

---

## Live demos

### AUTO_REPAIR

| # | Style | Live demo |
| --- | --- | --- |
| Template 1 | BAY 04 / Garage Floor (industrial workshop) | https://auto-repair-t-1.pandsy.com |
| Template 2 | Heritage Workshop (clay + paper) | https://auto-repair-t-2.pandsy.com |
| Template 3 | Sodium Lamp (dark slate + amber) | https://auto-repair-t-3.pandsy.com |

### ELECTRICIANS

| # | Style | Live demo |
| --- | --- | --- |
| Template 1 | Voltage / Live Wire | https://electricians-t-1.pandsy.com |
| Template 2 | Blueprint / Grid | https://electricians-t-2.pandsy.com |
| Template 3 | Hot Wire / Live Editorial | https://electricians-t-3.pandsy.com |

### PLUMBERS

| # | Style | Live demo |
| --- | --- | --- |
| Template 1 | Tidewater / Slate & Copper | https://plumbers-t-1.pandsy.com |
| Template 2 | Brass Line / Shop Drawings | https://plumbers-t-2.pandsy.com |
| Template 3 | Clearline / Clean Water Service | https://plumbers-t-3.pandsy.com |

---

## How updates work

- The 9 demos live on the Vercel **pandsy** team.
- Each `*.pandsy.com` subdomain is attached to its Vercel **project** (not a
  specific deployment), so every new production deploy is served on the same URL.
- Push to `main` → GitHub Action redeploys the changed template(s) → the
  matching `*.pandsy.com` link updates automatically.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v3 · pnpm · Framer Motion ·
react-hook-form + zod · Resend. See `claude.md` for the full template
constitution (placeholders, hard rules, per-category specifics).
