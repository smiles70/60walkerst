# Active Checkpoint

## Session: 2026-06-14 — Deep Scan + v3 Process Adoption

### Agents Completed
- [x] Session State (open)
- [x] Deep Scan (5-pass codebase analysis)
- [x] Process Adaptation (v3 -> 60 Walker St)

### Files Changed / Created
- `.windsurf/workflows/the-process.md` — v3 process adapted for 60 Walker St
- `docs/ARCHITECTURE.md` — Full architecture assessment
- `docs/03-system.md` — Component map, data layer, assets
- `docs/04-tech.md` — Dependencies, build commands, config files
- `docs/05-security.md` — Auth model, security concerns, env vars
- `docs/06-performance.md` — Baseline placeholder (awaiting /perf-baseline)
- `.ai/sessions/active_checkpoint.md` — This file

### Decisions Made
1. **No backend agents** in v3 pipeline — 60 Walker St is fully static
2. **PIN remains client-side** for now — noted as High severity in security.md
3. **Performance baseline pending** — run `/perf-baseline` before first deploy
4. **Production signals pending** — Netlify Analytics not yet configured
5. **Merge conflict marker check** added to Audit Agent (Lesson Learned #20 from Noni)

### Agents Completed (This Session)
- [x] Design Agent — chore chart modal + applicant skill design approved by user
- [x] Code Agent — implemented chore chart modal, wired welcome.tsx, added icons
- [x] Documentation Agent — created SKILL.md for add-applicant

### Files Changed / Created (This Session)
- `components/ui/icon.tsx` — Added `Download` and `X` icons
- `app/data/house-rules.ts` — Updated cleaning rotation: "Roommates A, B & C"
- `app/sections/chore-chart.tsx` — **NEW** Full chore chart modal with 4 schedule tables + download
- `app/sections/welcome.tsx` — Wired cleaning card click -> modal, added "View schedule" hint
- `public/hudson-haven-chore-chart.docx` — Copied from docs/ for download
- `.ai/skills/add-applicant/SKILL.md` — **NEW** Enterprise-grade skill guide (10 sections)
- `.ai/skills/pre-deploy-check/SKILL.md` — **NEW** Mandatory pre-deploy verification (Lessons #21-23)
- `.ai/skills/post-deploy-validate/SKILL.md` — **NEW** Mandatory post-deploy validation (Lesson #24)
- `.windsurf/workflows/the-process.md` — Updated Lessons Learned (#21-24), Process Enforcement Rules (#21-22), Skills Inventory, Session State Open/Close protocols

### Decisions Made (This Session)
1. **Reused existing download pattern** — `<a download>` from applicant-detail.tsx (not jspdf)
2. **Excluded research foundation** from modal — user requested schedules only
3. **Skill is markdown-only** — no CLI/script; deterministic guide for agent-driven additions
4. **No new dependencies** — all implementation uses existing stack
5. **DEPLOY LESSON #21**: Never run `npm run deploy` without checking pipeline first — anonymous deploy creates NEW site, not production
6. **DEPLOY LESSON #22**: GitHub Actions CI/CD is the single source of truth for production
7. **DEPLOY LESSON #23**: Missing GitHub secrets (`NETLIFY_AUTH_TOKEN`) block production deploys
8. **DEPLOY LESSON #24**: Never assume deploy succeeded without post-deploy validation
9. **Pre-deploy check is now MANDATORY** per Process Enforcement Rule #21
10. **Post-deploy validation is now MANDATORY** per Process Enforcement Rule #22

### Root Cause of Deploy Failure
- Ran `npm run deploy` → triggered `scripts/deploy.js` → used `--allow-anonymous --create-site`
- Created NEW Netlify site: `splendid-phoenix-c21a7f.netlify.app` (NOT `60walkerst.com`)
- Pushed to GitHub → GitHub Actions CI failed at "Deploy to Netlify" step
- Likely cause: `NETLIFY_AUTH_TOKEN` secret expired/missing
- Fix: User must update GitHub secret, then re-run CI

### Next Agent in Queue
- Await user request -> Triage Agent -> Research/Design/Codeloop
- **BLOCKED**: Production deploy pending GitHub secret fix by user

### Flags / Warnings
- 🚨 **CRITICAL**: GitHub Actions `NETLIFY_AUTH_TOKEN` secret likely expired — blocking all production deploys
- 🚨 **CRITICAL**: Previous anonymous deploy created wrong site — do NOT use `npm run deploy` for production
- ⚠️ Build verification pending — npm unavailable in shell (PATH issue), user to verify locally
- ⚠️ Hardcoded PIN (606060) in `app/data/management.ts` — security risk
- ⚠️ Credit report PII hardcoded in `app/data/applicants.ts`
- ⚠️ No CSP headers in `next.config.ts`
- ⚠️ Performance baseline not yet initialized

---
