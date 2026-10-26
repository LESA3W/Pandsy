/**
 * Pipeline des 12 steps pour générer un site avec Claude Code
 * Les placeholders {BUSINESS_NAME}, {CITY}, etc. sont remplacés par generate-site.js
 * à partir des infos reçues par le serveur.
 */

/**
 * RULES NON-NÉGOCIABLES injectées dans les prompts critiques
 */
export const GLOBAL_RULES = {
  fonts: `FONT RULES (NEVER VIOLATE):
- NEVER use Times New Roman, serif fallback, or any browser-default font
- ALWAYS use Google Fonts via next/font/google in app/layout.tsx
- Choose 1 sans-serif (Inter, DM Sans, Manrope, Geist) for body
- Optionally choose 1 display font for headings
- ALL text elements must inherit from these fonts via CSS variables
- If you encounter font-family Times New Roman or serif anywhere REPLACE IT`,
  whatsapp: `WHATSAPP BUTTON (CONDITIONAL):
BEFORE implementing a WhatsApp button you MUST verify:
1. Extract digits only from {PHONE}
2. Check if the number is a mobile number not a landline. Landline indicators: starts with 01-05 in France, US area codes followed by non-mobile patterns
3. If LANDLINE or UNSURE: DO NOT add WhatsApp button. Instead add a simple click-to-call button with tel: link
4. If MOBILE: add WhatsApp floating button: fixed bottom-6 right-6 z-50, rounded-full, bg #25D366, WhatsApp SVG icon + Chat with us in white, shadow-lg, hover scale-105, links to https://wa.me/DIGITS_ONLY
5. In ALL cases add a click-to-call link somewhere visible (header or contact section)`,
  logo: `LOGO AND COLOR RULES (NEVER VIOLATE):
LOGO:
- Use the business logo AS-IS never crop distort recolor or alter it
- You can ONLY adjust display size (max-height 60px in header)
- Always use object-contain to preserve aspect ratio
- If LOGO_URL is provided use that exact URL via Next.js Image component
- If no logo provided generate a clean text-based logo with the business name
COLORS FROM LOGO (MANDATORY - NEVER IGNORE):
- The logo colors have been extracted and provided as LOGO_COLORS: {LOGO_COLORS}
- You MUST use these exact hex colors as the PRIMARY and SECONDARY colors of the entire site
- The first color = primary (buttons, headers, accents, CTA backgrounds)
- The second color = secondary (borders, hover states, subtle accents)
- The third color if provided = accent (small details, icons, highlights)
- EVERY page must visually match these colors. Do NOT invent your own color palette
- If LOGO_COLORS is empty or not provided then choose colors appropriate for the business type
- After setting up tailwind.config or globals.css with these colors VERIFY they are actually used in components`,
  images: `BUSINESS IMAGES (MANDATORY - FOLLOW PLACEMENT GUIDE):
Images are provided as BUSINESS_IMAGES (comma-separated URLs). Place them EXACTLY as follows:

IMAGE PLACEMENT FOR EVERY SITE:
1. HERO BACKGROUND — First image as full-width hero background with dark gradient overlay (bg-black/50) for text readability. Use priority prop. This is the MOST important image on the site.
2. ABOUT SECTION — Second image next to the about/story text. Shows the business interior or team.
3. SERVICES SECTION — Third image illustrating the services offered.
4. GALLERY/PORTFOLIO — Images 4-6 in a grid gallery section showing the work or products.
5. CTA SECTION — Last image as background for the final call-to-action section with dark overlay.
6. ADDITIONAL — Any remaining images spread across other sections.

TECHNICAL RULES:
- Use Next.js Image component with proper width height and descriptive alt text
- Hero image: priority prop, sizes 100vw, fill with object-cover
- All other images: lazy loaded
- Always add dark gradient overlays on background images for text readability
- If fewer than 6 images provided reuse images or use Unsplash for gaps
- If NO BUSINESS_IMAGES provided at all use high-quality Unsplash photos relevant to {BUSINESS_TYPE}
- NEVER leave a major section without an image. The site must feel visually rich and professional.`,
  legal: `LEGAL PAGES (MANDATORY):
Create both pages with REAL filled content (zero Lorem ipsum zero placeholders):
1. /privacy-policy with sections: Introduction, Information We Collect, How We Use Information, Cookies, Third Parties, User Rights, Contact (use {BUSINESS_NAME} and {FULL_ADDRESS})
2. /terms-of-service with sections: Acceptance, Services Description, User Responsibilities, Intellectual Property, Limitation of Liability, Governing Law, Contact
Both pages must be linked from the footer.
Both pages must use the same layout fonts and design system as the rest of the site.`
};

export function injectRules(prompt, ruleKeys) {
  if (!ruleKeys || ruleKeys.length === 0) return prompt;
  const rules = ruleKeys.map(k => GLOBAL_RULES[k]).filter(Boolean).join('\n\n');
  return rules + '\n\n---\n\n' + prompt;
}


/**
 * Pipeline de TEST (1 seul step) — pour valider la plomberie
 * sans cramer le plan Max sur les 12 steps.
 * Activée quand businessData.TEST_MODE === true
 */
export const TEST_PIPELINE_STEPS = [
  {
    number: 1,
    name: 'Smoke Test',
    prompt: `Create a file called hello.txt in the current directory.
Inside the file, write exactly this content (and nothing else):

Business: {BUSINESS_NAME}
City: {CITY}
Type: {BUSINESS_TYPE}

Then output ONLY the absolute path of the file you created on the LAST line, prefixed with "FILE_CREATED: ".
Example: FILE_CREATED: /home/USER/automation/sites/inactive/joes-shop-123/hello.txt`,
  },
];

/**
 * Pipeline complète (12 steps) — utilisée en production
 */
export const PIPELINE_STEPS_FULL = [
  {
    number: 1,
    name: 'Plan Architecture',
    prompt: `Enter plan mode. I need to create a business website for {BUSINESS_NAME}, a {BUSINESS_TYPE} in {CITY} ({ZIP}).
Services: {SERVICES}.
Phone: {PHONE}.
Address: {FULL_ADDRESS}.
Hours: {HOURS}.
ALL CONTENT MUST BE IN ENGLISH (US).

Plan the full site architecture: pages, sections, tech stack, design direction, and SEO strategy.
Write the plan to tasks/todo.md.

DO NOT present multiple options. DO NOT ask which approach. Just plan and execute.`,
  },
  {
    number: 2,
    name: 'Competitive Research',
    prompt: `Use the market-researcher agent to analyze the top {BUSINESS_TYPE} websites in {CITY} and surrounding areas. Document findings to tasks/research.md.
Then use the /clone-website skill to reverse-engineer the structure of the best {BUSINESS_TYPE} sites in {CITY} (analyze only, don't copy).
Then use the competitive-analyst agent to benchmark vs what we're building.`,
  },

  {
    number: 3,
    name: 'Design System',
    prompt: `Use the /design-consultation skill to define the full design system for {BUSINESS_NAME}, a {BUSINESS_TYPE}.

- Find the client logo in the project files (check src/assets/, public/, src/ with Glob)
- If a logo exists, extract colors from it. If not, choose what fits the industry.
- Use the competitive research from tasks/research.md as reference.
- Target customer: {TARGET_DESCRIPTION}
- Output: design-system.md

ALL text examples in ENGLISH (US).`,
  },

  {
    number: 4,
    name: 'Scaffold Next.js',
    prompt: `Use the nextjs-developer agent with /vercel:nextjs and /vercel:shadcn skills to scaffold the project.

Business: {BUSINESS_NAME}, a {BUSINESS_TYPE}.
Services: {SERVICES}.
Phone: {PHONE}. Address: {FULL_ADDRESS}. Hours: {HOURS}.

Apply the design system from design-system.md to tailwind.config.ts.

GOTCHAS (from past builds):
- Configure next.config.ts with remotePatterns for images.unsplash.com IMMEDIATELY after scaffold
- Verify asset filenames with Glob before any import
- Copy client images to public/ if they are in src/

ALL content = ENGLISH (US).`,
  },

  {
    number: 5,
    name: 'Design & Build UI',
    prompt: `Use the /ui-ux-pro-max skill to design each page following design-system.md.
Then use the /frontend-design skill to code all components.
Then use the /emil-design-eng skill to refine interactions and polish.

Business: {BUSINESS_NAME}, a {BUSINESS_TYPE} in {CITY}.
Target customer: {TARGET_DESCRIPTION}.

GOTCHAS (from past builds):
- Logo: if a logo file exists (Glob src/assets/, public/), display it in header and footer WITHOUT the business name as text next to it. If no logo, fall back to styled text.
- Favicon: use the client logo. Place in public/.
- Images: client images in src/assets/ or public/ ALWAYS take priority over Unsplash.
- Unsplash: NEVER use the page slug as CDN ID — always curl -sI "https://unsplash.com/photos/{slug}/download" | grep -i location to get the real CDN URL.

ALL text = ENGLISH (US).`,
  },

  {
    number: 6,
    name: 'Google Reviews',
    prompt: `Use the /gstack skill to find real Google reviews of {BUSINESS_NAME} at {FULL_ADDRESS}.

RULES:
- Only real Google reviews, never fake
- Minimum 4 stars, most recent first
- At least 3 reviews (5 if available)
- Google "G" logo must appear (verify with Glob in src/assets/ or public/)

Build a reviews section styled with the site's design system.
ALL labels in ENGLISH (US).`,
  },

  {
    number: 7,
    name: 'SEO',
    prompt: `Use the seo-specialist agent to optimize the entire site for {BUSINESS_NAME}, a {BUSINESS_TYPE} in {CITY}.

Run the full SEO suite in order:
/seo then /seo-schema then /seo-sitemap then /seo-content then /seo-technical then /seo-local then /seo-maps then /seo-geo then /seo-images then /seo-performance then /seo-backlinks

GOTCHA (from past builds):
Verify NAP consistency with Grep — must be IDENTICAL everywhere (header, footer, contact page, schema.org JSON-LD):
- Name: {BUSINESS_NAME}
- Address: {FULL_ADDRESS}
- Phone: {PHONE}
- Hours: {HOURS}

ALL meta content in ENGLISH (US).`,
  },

  {
    number: 8,
    name: 'Forms & Email',
    prompt: `Configure email forms with Resend for {BUSINESS_NAME}, a {BUSINESS_TYPE}.

Two forms:
1. Main lead capture form on the home page hero — choose the right fields for a {BUSINESS_TYPE}.
2. General contact form on the contact page (Name, Email, Phone, Message).

SEND ALL EMAILS TO: {TEST_EMAIL} (TEST email, not the client's)

GOTCHAS (from past builds — these caused real errors):
- Instantiate Resend INSIDE the handler function, NOT at module level
- Check { data, error } in response, NOT just ok:true
- Use from: "onboarding@resend.dev" for testing
- The Resend API key is already available. Write it to .env.local: RESEND_API_KEY={RESEND_API_KEY}
- DO NOT create a new key. Use the one provided above.
- After setting up the forms send a TEST email to {TEST_EMAIL} and verify it arrives.

ALL form labels, placeholders, messages = ENGLISH (US).`,
  },

  {
    number: 9,
    name: 'Design Review & Polish',
    prompt: `Use the /design-review skill to run a full visual QA.
Then use the /redesign-skill to upgrade any generic-looking sections to premium quality.
Then use the /simplify skill to review code for reuse and efficiency.

Fix ALL issues found before proceeding.
Verify ALL text is in ENGLISH (US) — no French, no Lorem Ipsum.`,
  },

  {
    number: 10,
    name: 'Testing & QA',
    prompt: `Use the /qa skill for systematic QA testing of the full site.

TEST FORMS END-TO-END:
1. npm run dev
2. Submit both forms with test data
3. Verify Resend returns an id (not just ok:true)
4. Verify emails received at {TEST_EMAIL}
5. DO NOT proceed until BOTH forms confirmed working

Also verify: images, links, responsive, NAP consistency (Grep), hours consistency (Grep), Google Reviews, logo, phone clickable (tel:).
ALL text in English (US) — grep for any French words.`,
  },
  {
    number: 11,
    name: 'Site Validation & Auto-Fix',
    prompt: `You are a strict QA validator. Verify the site meets ALL rules before deployment.

VALIDATION CHECKLIST:

1. FONTS: grep -ri "times new roman" app/ src/ --include="*.tsx" --include="*.css" --include="*.ts". Also grep -ri "font-family.*serif" in same files. If ANY match found REPLACE with the Google Font from layout.tsx.

2. WHATSAPP vs CALL BUTTON: Check the business phone {PHONE}. Extract digits only. If it looks like a landline (France: starts with 01-05, US: standard landline patterns) then there should be NO WhatsApp button, only a click-to-call tel: link. If it looks like a mobile there should be a WhatsApp button linking to wa.me/DIGITS. Verify the correct one is implemented. If wrong FIX it.

3. LOGO INTEGRITY: If a logo image exists verify it uses object-contain and is NOT cropped or distorted. grep -ri "logo" app/ src/ --include="*.tsx". If cropped FIX to object-contain with max-h-[60px].

4. COLORS MATCH LOGO: If a logo exists verify the site primary and secondary colors match the logo dominant colors. Check tailwind.config or globals.css for the primary color values. If the colors do not match the logo visually FIX the color palette to match.

5. HERO BACKGROUND IMAGE: Verify the hero section on the home page has a background image (not just a solid color). grep -ri "hero\|banner" app/ --include="*.tsx". The hero must have an image with a dark gradient overlay for text readability. If missing ADD a hero background image.

6. IMAGES THROUGHOUT: Verify each major section has at least 1 image. Count the number of Next.js Image components: grep -ri "from .next/image" app/ --include="*.tsx" | wc -l. There should be at least 5 images across the site. If fewer ADD relevant images from BUSINESS_IMAGES or Unsplash.

7. LEGAL PAGES: Verify /privacy-policy and /terms-of-service pages exist with real content. ls app/privacy-policy/page.tsx app/terms-of-service/page.tsx. If missing CREATE them. If they contain Lorem ipsum REWRITE.

8. FOOTER LINKS: Verify footer has links to /privacy-policy and /terms-of-service. If missing ADD them.

9. BUILD TEST: Run npm run build. If it fails FIX all errors until it passes.

PROCESS:
- Run each check
- For EACH failure fix it immediately then re-verify
- After all fixes run npm run build one final time
- If build passes with 0 errors output VALIDATION_PASSED
- If you cannot fix after 3 attempts output VALIDATION_FAILED with reason

Business phone: {PHONE}
Business name: {BUSINESS_NAME}
Business address: {FULL_ADDRESS}`,
  },

  {
    number: 12,
    name: 'Deploy to Vercel',
    prompt: `Use /vercel:deploy to deploy the site to Vercel.
Command: vercel deploy --prod --yes --scope lesa3ws-projects

GOTCHAS (from past builds):
- NEVER use --- in the Vercel project name
- If env vars were added, redeploy mandatory
- After deploy: verify the PROD site (not localhost) — images, forms, responsive, links, reviews

Then use /canary skill for post-deploy monitoring.
Final check: ALL text on live site is ENGLISH (US).

IMPORTANT: At the end, output ONLY the final Vercel production URL on the LAST line, prefixed with "DEPLOYED_URL: "
Example: DEPLOYED_URL: https://joe-barbershop-abc123.vercel.app`,
  },
];

/**
 * Remplace les placeholders d'un step avec les vraies infos business
 */
export function fillPlaceholders(template, businessData) {
  let filled = template;
  for (const [key, value] of Object.entries(businessData)) {
    const placeholder = new RegExp(`\\{${key}\\}`, 'g');
    filled = filled.replace(placeholder, value || 'N/A');
  }
  return filled;
}

/**
 * Les champs attendus dans businessData
 */
export const REQUIRED_FIELDS = [
  'BUSINESS_NAME',
  'BUSINESS_TYPE',
  'CITY',
  'ZIP',
  'FULL_ADDRESS',
  'PHONE',
  
  'HOURS',
];

export const OPTIONAL_FIELDS = [
  'SERVICES',
  'TARGET_DESCRIPTION',
  'TEST_EMAIL',
  'TEST_MODE',
];

/**
 * Pipeline MOCKUP (10 steps) — pour la prospection
 * Enlève SEO complet (step 7) et Code Review (step 11)
 */
export const MOCKUP_PIPELINE_STEPS = PIPELINE_STEPS_FULL.filter(
  (step) => step.number !== 7 && step.number !== 6
);

/**
 * Pipeline POST-VENTE (2 steps) — après la vente
 * SEO complet + Code Review & Security
 */
export const POST_SALE_STEPS = PIPELINE_STEPS_FULL.filter(
  (step) => step.number === 7
);

/**
 * Alias par défaut — la pipeline mockup est le défaut
 */
export const PIPELINE_STEPS = MOCKUP_PIPELINE_STEPS;
