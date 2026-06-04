# Technical Spec: 60 Walker St — Household Portal

## 1. Architecture Overview
Static site generated at build time (SSG). No backend required for v1.0. All household data is hardcoded in TypeScript data files. Deployed as static export on CDN.

### Architecture Layers
| Layer | Technology | Responsibility |
|-------|-----------|----------------|
| UX | Product spec | Personas, journeys, flows |
| Interaction | CSS + React states | Hover, click, copy, download feedback |
| System | Next.js 15 + React 19 | Components, data flow, rendering |
| Platform | Static export | No APIs; content served as files |
| Infrastructure | Vercel/Netlify (target) | CDN, edge cache, static hosting |
| Security | CSP headers (build config) | XSS prevention, secure headers |

## 2. Data Sources
No database. Content lives in:
- `app/data/house-rules.ts` — Communication guidelines, cleaning rotation, shared supplies, Wi-Fi, reminders
- `app/data/utilities.ts` — Cost breakdown, providers, payment instructions
- `app/data/contacts.ts` — Provider numbers, action items, payment methods
- `public/artifacts/` — Original reference images for download

## 3. Component Architecture
- **Page**: `app/page.tsx` — Single-page scroll experience with 3 sections
- **Sections** (in `app/sections/`):
  - `welcome.tsx` — House rules, cleaning schedule, Wi-Fi, shared supplies
  - `utilities.tsx` — Cost table, provider info, payment instructions
  - `contact.tsx` — Provider contacts, action buttons, payment methods
- **Components** (in `components/ui/` — Shadcn primitives):
  - `card.tsx` — Rule cards, info cards
  - `table.tsx` — Utilities cost table
  - `button.tsx` — Download buttons, action buttons
  - `badge.tsx` — Status labels (e.g., "Pay by 15th")
- **Layout**: `app/layout.tsx` — Meta tags, fonts, household branding

## 4. Platform Architecture

### 4.1 API Design
No runtime APIs for v1.0. All data is compile-time static.

### 4.2 Service Boundaries
- **Content Layer**: Static TS data files (compile-time)
- **Presentation Layer**: React components (client-side hydration for interactivity)
- **Asset Layer**: Static files in `public/` (served by CDN)

### 4.3 Integration Points
- **Phone links**: `tel:` protocol for click-to-call
- **Download links**: `<a download>` for artifact files
- **External payments**: Venmo/Zelle links (external app)
- **No 3rd party APIs**: No Stripe, no SendGrid, no webhooks

### 4.4 Error / Retry Handling
- Download failures: Browser-native retry; no custom retry logic needed
- Copy failures: Graceful fallback to selectable text
- No network-dependent features beyond static asset serving

## 5. Infrastructure Architecture

### 5.1 Deployment Model
- **Target**: Vercel (preferred) or Netlify
- **Method**: Static export (`next.config.ts` → `output: 'export'`)
- **Build command**: `npm run build` → outputs to `dist/`
- **Deploy**: `dist/` folder pushed to CDN

### 5.2 Environments
- **Production**: Main branch auto-deploys to production URL
- **Preview**: PR branches get preview URLs

### 5.3 Scaling
- Static export = infinitely scalable on CDN
- No compute needed; no cold starts
- Cache headers: `max-age=31536000` for static assets

### 5.4 Observability
- **Build logs**: CI/CD pipeline captures build output
- **Analytics**: Optional — add Vercel Analytics or Plausible (privacy-friendly)
- **No runtime logging**: Static site has no server-side runtime

### 5.5 Security Model
- **Authentication**: None required (public info board)
- **Data protection**: No PII stored; phone numbers are public utility contacts
- **API security**: No APIs to protect
- **Headers**: Add `Content-Security-Policy` in `next.config.ts`
- **Input validation**: Not applicable (no user input)

## 6. Asset Handling
- Original artifact images in `public/artifacts/` (welcome-summary.png, utilities-share.png, utilities-contact.png)
- Download buttons serve these files directly via `<a download>`
- No image optimization needed for reference artifacts (small PNGs)

## 7. Styling
- Tailwind CSS v4 (utility-first)
- **Color Palette** (derived from reference images):
  - Primary: `#1e3a5f` (navy blue — headers, borders)
  - Secondary: `#4a9c2d` (green — accents, highlights, buttons)
  - Accent: `#f59e0b` (amber — warnings, reminders)
  - Background: `#ffffff` (white), `#f8fafc` (slate-50 cards)
  - Text: `#0f172a` (slate-900 body), `#1e3a5f` (navy headings)
- Typography: Inter (body), bold weight for headings (matching reference poster style)
- Mobile-first breakpoints: sm/md/lg/xl

## 8. Tech Stack Rules
- Next.js 15+ (App Router)
- React 19
- TypeScript 5.x (strict mode)
- Tailwind CSS 4.x
- Shadcn UI (CLI-installed components only)
- No runtime dependencies beyond above without updating this file
