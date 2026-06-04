# Verification: Architecture Gate + Build Verification

## 1. Architecture Gate (MUST PASS BEFORE BUILDING)

### UX Domain
- [x] User personas defined (Resident, New Roommate, Guest)
- [x] Core journeys mapped (Onboarding, Pay Utilities, Report Issue, Download)
- [x] Task flows defined (Wi-Fi lookup, cost review, outage report)
- [x] Screen/route map complete (single page, 5 sections)
- [x] UX constraints documented (< 2s load, 1-click access)
- [x] Failure/error UX defined (no-JS fallback, missing image, broken download)

### Interaction Domain
- [x] Idle states defined (content visible, interactive elements ready)
- [x] Hover/active states defined (card lift, button highlight)
- [x] Success states defined (copy confirmation toast)
- [x] Error states defined (toast notifications)
- [x] Empty states: N/A (all content static)
- [x] No silent failures (all actions have visible feedback)

### System Domain
- [x] Component architecture defined (Hero, InfoCard, CostTable, ContactCard, etc.)
- [x] Data flow documented (static TS → React components → DOM)
- [x] File structure planned (`app/sections/`, `app/data/`, `components/ui/`)
- [x] Naming conventions set (PascalCase components, kebab-case files)

### Platform Domain
- [x] API contracts: N/A (no runtime APIs)
- [x] Service boundaries clear (Content → Presentation → Asset layers)
- [x] Integration points documented (tel:, download, external payment apps)
- [x] Error/retry handling defined (browser-native for downloads)

### Infrastructure Domain
- [x] Deployment model defined (static export → Vercel/Netlify CDN)
- [x] Hosting target specified (Vercel preferred)
- [x] Build pipeline confirmed (`npm run build` → `dist/`)

### Security Domain
- [x] Authentication: N/A (public site)
- [x] Data protection: No PII; utility contacts are public
- [x] Input validation: N/A (no user input)
- [x] CSP headers planned for `next.config.ts`

**✅ Architecture Gate: PASSED**

---

## 2. Build & Compile
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts on localhost:3000 without crash
- [ ] `npm run build` passes with zero errors
- [ ] TypeScript compilation succeeds (`tsc --noEmit`)
- [ ] No `any` types introduced

## 3. Functional Testing
- [ ] Manual test: Open http://localhost:3000 → Browser tab shows "60 Walker St — Household Portal"
- [ ] Manual test: Custom colors work → `bg-navy` applies navy background; `text-green` applies green text
- [ ] Manual test: Verify `app/sections/`, `app/data/`, `components/ui/`, `public/artifacts/` exist

## 4. Regression Checks
- [ ] No unauthorized file modifications outside `instruction.md` scope
- [ ] No new unapproved dependencies beyond Next.js, React, Tailwind, Shadcn

## 5. Sign-Off
- [ ] AI confirms all Architecture Gate checks passed
- [ ] AI confirms build and compile checks passed
- [ ] Human reviews git diff and accepts
- [ ] `context.md` updated with completed features
- [ ] Critic review: verify alignment with `product.md`, `tech.md`, `instruction.md`
