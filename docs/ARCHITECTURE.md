# ARCHITECTURE.md — 60 Walker St Household Portal

> Deep scan artifact. Generated from codebase analysis.
> Updated: 2026-06-14

---

## 1. Project Overview

**Name:** 60 Walker St — Household Portal
**Type:** Static single-page application (SPA)
**Purpose:** Shared household information board for residents and applicants of 60 Walker St, Walden, NY
**Auth:** None for public sections; client-side PIN (606060) for management portal
**Backend:** None — fully static
**Database:** None — all data hardcoded in TypeScript files

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router, static export) | 15.1.0 |
| UI Library | React | 19.0.0 |
| Language | TypeScript | 5.7.0 (strict) |
| Styling | Tailwind CSS | 4.0.0 |
| Font | Inter (Google Fonts) | — |
| Icons | Custom SVG (shared Icon component) | — |
| Testing | Jest + React Testing Library + ts-jest | Jest 30.4.2 |
| Linting | ESLint + jsx-a11y | 9.x |
| Deploy | Netlify (static export) | — |

---

## 3. File System Architecture

```
app/
  page.tsx              — Root SPA controller (hero/applicant/tenant view switcher)
  layout.tsx            — HTML shell, Inter font, metadata
  globals.css           — Tailwind v4 theme, custom animations
  data/
    house-rules.ts      — 5 rule categories + Wi-Fi + reminders
    utilities.ts        — 4 utility rows with cost breakdown
    contacts.ts         — 3 providers + 3 action buttons
    applicant.ts        — Town info, Watchtower facilities, pricing, gallery
    applicants.ts       — Full applicant data with credit screening report
    management.ts       — PIN, dashboard widgets, documents
  sections/
    hero.tsx            — Full-screen landing with photo + 2 CTAs
    applicant.tsx       — Two-view: About This Home / About The Area
    tenant.tsx          — Three-card hub: Welcome / Utilities / Contact + Management
    welcome.tsx         — House rules grid + key reminder
    utilities.tsx       — Cost table + payment card + reminder
    contact.tsx         — Provider cards with call/copy + action buttons
    management-login.tsx    — PIN auth (localStorage-based)
    management-dashboard.tsx — Overview widgets + applicants link + documents
    applicants-list.tsx      — Applicant cards with status badges
    applicant-detail.tsx   — Full applicant profile (summary, application, screening, messages)
components/
  ui/
    icon.tsx            — 29 named SVG icons
lib/
  utils.ts              — cn() utility (clsx + tailwind-merge)
scripts/
  deploy.js             — Multi-strategy Netlify deploy with retry logic
public/                 — 12 static images (house, town, Watchtower photos)
__tests__/              — 6 test files (page, hero, applicant, contact, utilities, welcome)
```

---

## 4. State Management & Navigation

Client-side view switching via React useState (no Next.js routing):

- **Root:** `ViewMode = "hero" | "applicant" | "tenant"`
- **Tenant portal:** `TenantView = "cards" | "welcome" | "utilities" | "contact" | "management-login" | "management-dashboard" | "applicants-list" | "applicant-detail"`
- **Applicant portal:** `ViewKey = "cards" | "home" | "area"` + `TabKey = "town" | "watchtower" | "halls"`
- **Management auth:** PIN-based (606060) stored in localStorage as `mgmtAuth`

---

## 5. Data Layer

All data lives in `app/data/*.ts` as typed exports:

| File | Contents |
|------|----------|
| `house-rules.ts` | 5 rule categories, key reminder |
| `utilities.ts` | 4 utility rows, per-person costs, payment instructions |
| `contacts.ts` | 3 providers (NYSEG, Village of Walden, Blue Flame), action items |
| `applicant.ts` | Town info, 3 Watchtower facilities, 8 Kingdom Halls, 2 Assembly Halls, pricing, testimonials, gallery |
| `applicants.ts` | **One hardcoded applicant** (Alaina Carnell) with full rental application + credit screening report (661 score, 10 tradelines, $13,475 balance, $10,023 past due) |
| `management.ts` | PIN (606060), 4 widgets, 3 document references |

---

## 6. Build & Deploy

**Build:**
```bash
npm ci -> npm test -> npm run build -> outputs to dist/
```

`next.config.ts`:
- `output: 'export'` (static HTML generation)
- `distDir: 'dist'`

**Deploy mechanisms:**
| Method | Trigger | Auth |
|--------|---------|------|
| GitHub Actions -> Netlify | Push to main/master | NETLIFY_AUTH_TOKEN + NETLIFY_SITE_ID secrets |
| `npm run deploy` | Manual | Multi-strategy fallback (Netlify anon/PAT -> Surge -> Vercel) |

---

## 7. Testing

| Test File | Coverage |
|-----------|----------|
| `page.test.tsx` | View switching, navigation, back buttons |
| `hero.test.tsx` | Headline rendering, CTA buttons, click handlers |
| `applicant.test.tsx` | Town card rendering, tab switching |
| `contact.test.tsx` | Provider cards, copy functionality |
| `utilities.test.tsx` | Cost table, payment card |
| `welcome.test.tsx` | House rules cards, reminder banner |

**Config:** `jest.config.ts`
- Environment: `jsdom`
- Preset: `ts-jest`
- Module mapper: `@/*` -> `<rootDir>/*`
- CSS mocked via `identity-obj-proxy`

---

## 8. Known Gaps & Security Notes

| Issue | Location | Severity |
|-------|----------|----------|
| Management PIN hardcoded (606060) | `app/data/management.ts` | High — trivial to bypass |
| Auth stored in localStorage | `management-login.tsx` | Medium — client-side only, no server validation |
| No CSP headers configured | `next.config.ts` missing `headers` | Medium |
| Credit report data is real PII | `app/data/applicants.ts` | High — hardcoded financial data |
| Download links are `#` placeholders | `applicants.ts` attachments | Low |
| No `public/artifacts/` directory | Referenced in spec but missing | Low |
| Netlify anonymous deploy exposes site | `scripts/deploy.js` | Medium |

---

## 9. CI/CD & Deployment

`.github/workflows/deploy.yml`:
- Triggers on push to `master`/`main` or `workflow_dispatch`
- Node.js 22, npm cache
- Steps: checkout -> install -> test -> build -> deploy to Netlify

`scripts/deploy.js`:
- Multi-strategy fallback: Netlify anonymous -> Netlify PAT -> Surge.sh -> Vercel
- Retry logic: 3 attempts, exponential backoff
- Writes `.deploy-info.json` on success

---

*ARCHITECTURE.md generated from deep scan. Updated: 2026-06-14*
