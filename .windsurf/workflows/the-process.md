# The Process — Full-Stack Agent Harness v3
# Adapted for: 60 Walker St Household Portal

> A transferable, project-agnostic orchestration layer for AI agent coding sessions.
> Adapted for static Next.js front-end with no backend, Netlify deployment.
>
> **Project:** 60 Walker St — Household Portal
> **Stack:** Next.js 15.1, React 19, TypeScript 5.7, Tailwind CSS v4, Jest
> **Deploy:** Netlify (static export)
> **Capability:** Static site with client-side state, PIN-protected management portal, no backend API.

---

## 1. Process Flowchart (ASCII)

```
USER REQUEST
    |
    v
0a. SESSION STATE AGENT (open)
    - Load prior ARCHITECTURE.md, lessons learned
    - Load active task graph and environment status
    - Load .ai/sessions/production_signals.md (if exists)
    - Output: Hydrated session context
    |
    v
0b. TRIAGE / CLASSIFIER AGENT
    - Score request using Decision Matrix (Section 3)
    - Assign tier: CORE or EXTENDED
    - Decide: GATED or AUTONOMOUS
    - Output: Tier + routing decision + task graph
    |
    v
1. RESEARCH AGENT
    - If UI/UX: consult Baymard, Material Design, WCAG
    - If production signals present: incorporate error patterns
    - Output: Research summary with sources
    |
    v
2. DESIGN AGENT
    - Present design plan with files to change, section breakdown
    - WAIT for explicit user approval before coding
    - Output: Approved design plan
    |
    v
3a. CODE AGENT (Front-end only for 60 Walker St)
    - React/TSX, Tailwind CSS, shared Icon component
    - All sections are "use client" — full hydration
    - Output: Clean, typed, minimal code
    |
    v
4a. DOCUMENTATION AGENT
    - Run heuristic checklist against diffs (Section 9)
    - Append with timestamp; never delete
    - Output: Updated .md files with timestamps
    |
    v
4b. TEST AGENT
    - Unit tests: npm test (Jest + React Testing Library)
    - Output: Test report (pass/fail count)
    |
    +-------pass---------+   +--------fail--------+
    |                    |   |                    |
    v                    |   v                    |
5. AUDIT AGENT           |   RECOVERY AGENT       |
Build, lint,             |   - Classify failure   |
typecheck, security      |   - AUTO-FIX: lint, type, unused imports
    |                    |   - ESCALATE: test failures, security, perf regressions
    |                    |   - ROLLBACK: if fix fails 3x
    |                    |   - retry (max 3) ------> (back to 4b)
    |                    |
    v                    |
5b. PERFORMANCE AGENT    |
(EXTENDED — if triggered)|
Compare vs baselines     |
    |                    |
    v                    |
6. DEPLOY AGENT          |
CI/CD: GitHub Actions -> Netlify
Manual: npm run deploy (multi-strategy fallback)
    |
    v
0c. SESSION STATE AGENT (close)
    - Serialize: decisions, files changed, failures
    - Append Lessons Learned
    - Update task graph
    - Write checkpoint to .ai/sessions/YYYY-MM-DD_topic.md
```

---

## 2. Pipeline Tiers

> **v3 change:** The pipeline is split into CORE (always) and EXTENDED (conditional).

### CORE Pipeline (mandatory for every change)

| Step | Agent | Always Required |
|------|-------|----------------|
| 0a | Session State (open) | Yes |
| 0b | Triage / Classifier | Yes |
| 1 | Research | Yes |
| 2 | Design | Yes |
| 3a | Code (front-end) | Yes |
| 4a | Documentation | Yes |
| 4b | Test | Yes |
| 5 | Audit | Yes |
| 6 | Deploy | Yes |
| 0c | Session State (close) | Yes — even on failure |

### EXTENDED Pipeline (activate when triggered)

| Step | Agent | Trigger |
|------|-------|---------|
| 5b | Performance | Any change touching bundle output, rendering path, or images |
| 7 | Infrastructure | Any CI/CD, Netlify config, or deploy script change |
| 8 | Observability | Any production deployment; always after initial deploy |

**Note:** 60 Walker St has no backend, database, or auth server. Agents 3b (Backend), 3c (Database), 3d (Auth server), 3e (Contract Validation), and 3f (Integration) are **not applicable** unless the project scope expands to full-stack.

---

## 3. Triage Decision Matrix

### Step 1 — Score the request

| Dimension | Score 1 | Score 2 | Score 3 |
|-----------|---------|---------|---------|
| Files touched | 1–3 files | 4–10 files | 11+ files |
| Security surface | No auth change | PIN or localStorage change | New auth flow or encryption |
| User-visible change | Internal only | Existing UI modified | New UI surface |
| Reversibility | One-command rollback | Build cache issue | Structural change |
| External dependency | None | Existing image/asset | New third-party service |

**Total score → pipeline mode:**

| Score | Mode | Pipeline tier |
|-------|------|---------------|
| 5–7 | AUTONOMOUS | CORE only |
| 8–11 | GATED | CORE + relevant EXTENDED |
| 12–15 | GATED + ESCALATE | CORE + all relevant EXTENDED + user review before deploy |

### Step 2 — Classify request type

| Type | Examples | Default mode |
|------|---------|-------------|
| Hotfix | Lint fix, broken import, missing semicolon | AUTONOMOUS (score override to 5) |
| Refactor (internal) | Rename variable, extract function | AUTONOMOUS if score <=7 |
| Test addition | New unit or integration test file | AUTONOMOUS |
| Doc update | .md file change, comment update | AUTONOMOUS |
| Dependency patch | Minor/patch version bump, npm audit fix | GATED |
| New feature | New component, section, data file | GATED |
| UI change | Any visible layout, color, or interaction change | GATED |
| PIN/auth change | Management PIN, localStorage auth logic | GATED + ESCALATE |
| Scope expansion | Adds capability not in current design | GATED + ESCALATE |

### Triage rules
1. When in doubt, score higher. Autonomous is an optimization, not a default.
2. A classification is irreversible mid-run. If autonomous routing was wrong, stop and escalate.
3. Score the actual change, not the stated intent.

---

## 4. Agent Definitions

### Core Pipeline Agents

| # | Agent | Responsibility | Trigger | Output |
|---|-------|---------------|---------|--------|
| 0a | Session State (open) | Load prior context, task graph, env status | Start of every session | Hydrated session context |
| 0b | Triage / Classifier | Score request, assign tier, route | After session open | Score + tier + routing decision |
| 1 | Research | Search expert sources, incorporate production signals | Any UI/UX or feature question | Research summary with citations |
| 2 | Design | Create section-by-section plan | After research, before any code | Approved design plan |
| 3a | Code (Front-end) | React/TSX, Tailwind, shared Icon component | After design approval | Clean, typed, minimal UI code |
| 4a | Documentation | Heuristic diff analysis, deterministic .md routing | After code completion | Updated .md files with timestamps |
| 4b | Test | Jest + React Testing Library | After documentation pass | Test report (pass/fail) |
| 5 | Audit | Build, lint, typecheck, security review | After tests pass | Clean build + security report |
| 6 | Deploy | Deploy to Netlify via GitHub Actions or manual script | After clean build + perf pass | Live URL + environment status |
| 0c | Session State (close) | Serialize session, update task graph, baselines | End of every session — including failures | Session artifact + updated memory |

### Extended Pipeline Agents

| # | Agent | Responsibility | Trigger | Output |
|---|-------|---------------|---------|--------|
| 5b | Performance | Lighthouse, bundle delta, render-blocking | Any bundle-affecting change | Perf report + pass/fail |
| 7 | Infrastructure | CI/CD, Netlify config, deploy scripts | New environment or service | .github/workflows/, infra code |
| 8 | Observability | Error tracking, production signals | Production deployment | production_signals.md for next session |

---

## 5. Agent Contract Layer

> **Note:** For 60 Walker St, parallel agents are rare (single front-end codebase). If parallel work is needed (e.g., simultaneous data + UI changes), the Design Agent produces a Contract defining data shape changes.

### What an Agent Contract specifies

```markdown
## Agent Contract — [Feature Name]
Generated by: Design Agent
Session: YYYY-MM-DD_topic

### Data Shape Changes
| File | Export | Change | Owner agent |
|------|--------|--------|-------------|
| app/data/applicant.ts | pricingInfo | ADD securityDeposit field | Code Agent |
| app/data/utilities.ts | utilityRows | ADD trash row | Code Agent |

### Front-End Expectations
| Component | Data it consumes | Source |
|-----------|-----------------|--------|
| ApplicantSection | pricingInfo | app/data/applicant.ts |
| UtilitiesContent | utilityRows | app/data/utilities.ts |
```

---

## 6. Quality Gate Protocol (Exact Commands)

### Front-End Gates (CORE — Always Required)

```bash
# Gate 1: Unit Tests
npm test

# Gate 2: Build
npm run build

# Gate 3: Lint
npx eslint . --ext .ts,.tsx

# Gate 4: Typecheck
npx tsc --noEmit

# Gate 5: AI Slop Check
npx eslint . --ext .ts,.tsx --rule 'no-unused-vars: error'
```

### Performance Gates (EXTENDED — Required when bundle output changes)

```bash
# Gate 10: Bundle Size Check
npx bundlesize

# Gate 11: Lighthouse CI
npx lhci autorun
# Requires .lighthouserc.json — fails if score drops >5 points vs baseline
```

**If ANY gate fails:** Recovery Agent activates. Do NOT commit or deploy until all gates pass.

---

## 7. Production Feedback Loop

### How it works

At session close, the Observability Agent writes `.ai/sessions/production_signals.md`:

```markdown
## Production Signals — [timestamp]
Source: Netlify Analytics / Browser console logs
Period: last 7 days

### Error rates
| Page | Error rate | Count | Top error |
|------|-----------|-------|-----------|
| / | 0.1% | 3 | "undefined is not iterable" |

### Performance regressions
| Page | P75 before | P75 after | Delta |
|------|-----------|---------|-------|
| / | 1.2s | 2.1s | +75% |
```

**Signal freshness:**
- If older than 7 days, flag as stale.
- If no file exists, skip silently.

---

## 8. Slash Commands

| Command | Agent | What It Does |
|---------|-------|--------------|
| /triage | Triage | Score request, assign tier, output task graph |
| /session-open | Session State | Load prior context + production signals |
| /session-close | Session State | Serialize session, update baselines |
| /design-audit | Design | Review visual hierarchy, color, CTA psychology |
| /code-check | Audit | Run lint + typecheck + slop audit |
| /security | Audit | Full security audit: dependencies, secrets, XSS vectors |
| /ai-slop | Audit | Detect AI-generated code smells |
| /perf | Performance | Run full performance gate vs baselines |
| /perf-baseline | Performance | Initialize or reset performance baselines |
| /recover | Recovery | Diagnose latest gate failure and attempt fix |
| /rollback | Recovery | Roll back to last clean state |
| /docs-sync | Documentation | Sync all .md files against current codebase |
| /optimize-hero | Design + Code | Run conversion optimization on hero section |
| /add-test | Test | Scaffold test file for current component |
| /sprint-report | Docs | Update epic markdown with progress |
| /full-gate | All | Run complete CORE quality gate suite |
| /infra-plan | Infrastructure | Preview infrastructure changes before deploy |

---

## 9. Documentation Agent Heuristics

### Heuristic Checklist (run in order)

```
FOR EACH changed file in the diff:

  IF new exported function or method added:
    -> Append to docs/04-tech.md under "API / Functions"

  IF new data file created or modified in app/data/:
    -> Update docs/03-system.md under "Data Layer"

  IF new React component created at app/sections/ or components/:
    -> Append to docs/03-system.md under "Component Map"

  IF existing component deleted:
    -> Update docs/03-system.md — mark as removed, date

  IF new npm package installed (not devDependency):
    -> Append to docs/04-tech.md under "Dependencies"

  IF CI/CD pipeline or GitHub Actions workflow changed:
    -> Update docs/ARCHITECTURE.md under "CI/CD & Deployment"

  IF new image added to public/:
    -> Update docs/03-system.md under "Assets"

  IF nothing above matches:
    -> No .md update required
```

### Rules
1. **Never rewrite from scratch.** Append and update only.
2. **Timestamp every entry.** Format: `<!-- updated: YYYY-MM-DD -->`
3. **Never delete historical context.** Removed features marked "Removed — [date]".
4. **One pass per session.** Run the full checklist once after all code completes.
5. **Flag stale docs.** If a .md references a component that no longer exists, add `⚠️ STALE`.

---

## 10. Performance Baseline Init

### When to run
- New project: After first working build, before first production deploy.
- Inherited project: Before first session with performance gate.
- Slash command: `/perf-baseline`

### Procedure

```bash
# Step 1: Build
npm run build

# Step 2: Serve dist locally
npx serve dist &
npx lhci collect --url=http://localhost:3000
npx lhci upload --target=filesystem --outputDir=.lighthouseci

# Step 3: Read scores, write .lighthouserc.json with floor thresholds
# Floor = (actual score) - 5 points
```

**Baseline update rules:**
1. Never lower thresholds without user approval.
2. Update baselines at every session close (0c).
3. If no baseline exists, Performance Agent skips comparison and warns.

---

## 11. Recovery Agent Playbook

### Decision Tree

```
Gate failure detected
        |
        v
Classify failure
        |
        ├── lint / type error / unused import
        │       -> Auto-fix, re-run gate, no approval
        │
        ├── test failure (unit)
        │       -> Write diagnosis to .ai/recovery/
        │       -> Escalate to user with fix options
        │
        ├── security block
        │       -> Hard stop immediately
        │       -> Escalate with CVE details
        │
        ├── performance regression
        │       -> Block deploy
        │       -> Escalate with before/after scores
        │
        └── build failure
                -> Escalate — never auto-fix build errors
```

### Attempt Ceiling
- Max 3 auto-fix attempts per failure
- After 3: write `.ai/recovery/YYYY-MM-DD_failure.md` and stop

---

## 12. Skills Inventory

| Skill | Use For |
|-------|---------|
| web-perf | Core Web Vitals, Lighthouse scores, render-blocking |
| nextjs-static | Next.js static export, App Router, SSG patterns |
| tailwind-v4 | Tailwind CSS v4 theming, @theme directive |
| jest-rtl | React Testing Library, Jest, coverage thresholds |
| netlify-deploy | Netlify CLI, static deploy, redirects |
| error-taxonomy | Classify failures; standard remediation playbook |
| performance-baseline | Baseline init, .lighthouserc.json generation |
| production-signals | Signal schema, browser error collection |

---

## 13. Lessons Learned & Gotchas

| # | Lesson | Root Cause | Fix |
|---|--------|-----------|-----|
| 1 | Never skip Design Agent approval | Implemented single-column change without approval -> had to revert | Always present plan, wait for explicit user approval |
| 2 | Red for neutral policies is psychologically wrong | Used bg-red-500 + Ban icon for "No Pets" | bg-slate-100 text-slate-700 + factual icons |
| 3 | Single column in a wide card creates dead zones | Attempted grid-cols-1 to fix height mismatch | Balance column content instead of removing columns |
| 4 | Always reference the user's model | Created generic Ban prohibition instead of paw print | Recreated icons matching user's TurboTenant reference |
| 5 | Research before designing | Guessed solution without checking guidance | Consult Baymard, Material Design, Airbnb first |
| 6 | 30% rule for rent is gross (pre-tax) income | User asked about net vs gross income estimate | Cited SoFi, AmEx, HUD; explained 1969 Brooke Amendment |
| 7 | No unauthorized scope decisions | User enforced after pricing card incident | Always ask before expanding scope |
| 8 | Always check actual filenames | User said "alaini" but files were "alaina" | Listed public folder before implementing download |
| 9 | Never persist tenant auth in localStorage | PIN screen was being skipped on reload | Remove localStorage, always show PIN first |
| 10 | Base64 encoding does not obfuscate PINs | PIN was visible in localStorage | Used state-only, no persistence |
| 11 | Recovery Agent has a 3-attempt ceiling | Infinite retry on broken test stalled pipeline | After 3 failed attempts, write diagnosis and escalate |
| 12 | Triage classification is irreversible mid-run | Autonomous routing on a UI change caused a revert | When in doubt, Triage defaults to GATED |
| 13 | Session State close is mandatory even on failure | Interrupted session lost all context | Session State Agent writes checkpoint on exit regardless |
| 14 | Performance gate failures block deploy | A passing build with a 40% Lighthouse regression shipped | Add perf thresholds at project setup via /perf-baseline |
| 15 | Documentation Agent runs before Test | Tests passed but ARCHITECTURE.md was 2 sprints out of date | Doc Agent diffs code and updates .md files before test suite |
| 17 | Performance baselines without initialization are meaningless | First deploy failed Gate 11 with no baseline to compare against | Run /perf-baseline before first performance-gated deploy |
| 18 | Production errors invisible to planning without a feedback loop | Auth bug recurred across 3 sessions | Observability Agent writes production_signals.md |
| 19 | "Minor" dependency bumps can break contract shapes | A patch version of a UI library changed a prop type | Dependency updates score as GATED in Triage Decision Matrix |
| 20 | Merge conflict markers in workflow YAML break CI | Unresolved markers in deploy.yml caused workflow failure | Add "grep for conflict markers" to Audit Agent pre-commit checklist |

---

## 14. Process Enforcement Rules

1. **Full pipeline for ANY change:** Session Open -> Triage -> Research -> Design -> Code -> Docs -> Test -> Audit -> Deploy -> Session Close
2. **CORE tier is always active.** EXTENDED agents activate per Triage Decision Matrix.
3. **Design Agent plan must be approved by user** before coding — unless Triage scored AUTONOMOUS.
4. **Zero warnings tolerated** in build — fix all lint/type errors before deploy.
5. **No unauthorized scope decisions** — user approval required before any implementation.
6. **Research before designing** — never guess UI or API solutions.
7. **Always run the full gate for the active tier** — never skip Test or Audit to save time.
8. **Security gate failures are BLOCKERS** — never deploy with known vulnerabilities.
9. **Recovery Agent activates on any gate failure** — the failing agent never retries itself.
10. **Recovery Agent auto-fix authority is bounded** — lint, type errors, unused imports only.
11. **Recovery Agent 3-attempt ceiling** — after 3 failed attempts, write diagnosis and stop.
12. **Session State checkpoint after every agent** — not just end of session.
13. **Session State close is mandatory on failure** — always checkpoint before exit.
14. **Triage defaults to GATED when uncertain** — AUTONOMOUS is an optimization, not a shortcut.
15. **Performance regressions block deploy** — thresholds set at baseline init.
16. **Documentation Agent runs before Test** — docs must reflect code before tests validate it.
17. **Observability Agent writes production signals after every prod deploy.**
18. **Session Open loads production signals** — Research and Design agents must incorporate them.
19. **No baseline, no perf gate** — if docs/06-performance.md has no baseline, run /perf-baseline first.
20. **Check for merge conflict markers before every push** — grep for conflict markers in Audit Agent.

---

## 15. UI/UX Conventions (60 Walker St)

| Convention | Value | Usage |
|------------|-------|-------|
| Primary color | `#1e3a5f` (navy) | Headers, borders, active states |
| Success color | `#4a9c2d` (green) | Completed steps, positive values, badges, CTAs |
| Warning color | `#f59e0b` (amber) | Medium credit scores, caution states, reminders |
| Danger color | `#dc2626` (red) | ONLY for actual errors/negatives, never neutral policies |
| Neutral color | `#64748b` (slate) | Neutral policies, placeholders |
| Border radius | `rounded-2xl` (1rem) | Cards, containers |
| Card border | `border-2 border-navy-200` | Consistent card styling |
| Icon library | Shared `Icon` component, never inline SVG | `components/ui/icon.tsx` |
| Focus states | `focus-visible`, never `focus:outline-none` | Accessibility compliance |
| Completed timeline | Green filled dots + navy connecting lines | Visual consistency |
| Font | Inter (Google Fonts) | Body text, headings |
| Animation | `animate-hero-fade-up`, `animate-hero-scale-in` | Hero entrance |

---

## 16. File System Documentation

### Folder Structure

```
project-root/
|
├── .ai/                              # AI WORKSPACE
│   ├── sessions/                     # Session State Agent checkpoints
│   │   ├── YYYY-MM-DD_topic.md
│   │   ├── active_checkpoint.md
│   │   └── production_signals.md
│   ├── contracts/                    # Agent Contracts per session
│   │   └── YYYY-MM-DD_topic_contract.md
│   ├── recovery/                     # Recovery Agent logs
│   │   └── YYYY-MM-DD_failure.md
│   └── skills/
│       └── [skill-name]/
│           ├── SKILL.md
│           └── [detailed-guide].md
│
├── docs/                             # PROJECT DOCUMENTATION
│   ├── 01-instruction.md
│   ├── 02-product.md
│   ├── 03-system.md
│   ├── 04-tech.md
│   ├── 05-security.md
│   ├── 06-performance.md
│   └── ARCHITECTURE.md
│
├── .github/
│   └── workflows/
│       └── deploy.yml
│
├── scripts/
│   └── deploy.js                     # Multi-strategy Netlify deploy
│
├── .lighthouserc.json               # Generated by /perf-baseline
├── .env.example
├── app/                             # Next.js App Router
│   ├── data/                        # Static typed data files
│   ├── sections/                    # Page section components
│   ├── page.tsx                     # Root SPA controller
│   ├── layout.tsx                   # HTML shell, fonts
│   └── globals.css                  # Tailwind v4 theme, animations
├── components/
│   └── ui/
│       └── icon.tsx                 # Shared SVG icon component
├── lib/
│   └── utils.ts                     # cn() utility
├── __tests__/                       # Jest + React Testing Library
└── public/                          # Static images
```

### Documentation File Ownership

| File | Owner Agent | Update trigger |
|------|------------|----------------|
| `03-system.md` | Documentation Agent | New component, data file, asset |
| `04-tech.md` | Documentation Agent | New function, dependency, env var |
| `05-security.md` | Audit Agent | PIN change, security concern |
| `06-performance.md` | Performance Agent | Every passing deploy; baseline init |
| `ARCHITECTURE.md` | Documentation Agent | Stack changes, CI/CD changes |

---

## 17. Adaptation Checklist (For 60 Walker St)

### Front-End Setup
- [x] Update project name and stack in Section 15
- [x] Update file paths in agent definitions
- [x] Update color palette in UI/UX Conventions
- [x] Update deploy command in Deploy Agent (Netlify)
- [x] Verify test command exists (`npm test`)
- [x] Verify build command exists (`npm run build`)

### Performance Baseline Setup
- [ ] Run `/perf-baseline` after first working build
- [ ] Verify `.lighthouserc.json` was generated
- [ ] Verify `docs/06-performance.md` baseline entry was written

### Production Signals Setup
- [ ] Configure browser error collection or Netlify Analytics
- [ ] Verify Observability Agent can write to `.ai/sessions/production_signals.md`
- [ ] Set signal freshness threshold (default: 7 days)

### Universal Setup
- [x] Add project-specific skills to Skills Inventory
- [x] Review Lessons Learned — adapted for 60 Walker St
- [x] Create workflow file (`.windsurf/workflows/the-process.md`)
- [x] Initialize `.ai/` directory structure
- [x] Initialize `docs/` directory

---

## 18. CI/CD & Automation

### GitHub Actions Pipeline

```yaml
name: Deploy to Netlify
on:
  push:
    branches: [main, master]
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - run: npx eslint . --ext .ts,.tsx
      - run: npx tsc --noEmit
      - run: npm audit --audit-level=moderate
  deploy:
    needs: gate
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run build
      - run: npx netlify deploy --auth=${{ secrets.NETLIFY_AUTH_TOKEN }} --site=${{ secrets.NETLIFY_SITE_ID }} --dir=dist --prod --json
```

---

## 19. Session State Agent Specification

### Open Protocol
1. Read `.ai/sessions/` — load most recent session artifact
2. Read `ARCHITECTURE.md` — inject current architecture context
3. Read `docs/06-performance.md` — inject current baselines
4. Read `.ai/sessions/production_signals.md` — inject production error rates, regressions
   - If file is older than 7 days, flag as stale
   - If file does not exist, skip silently
5. Read last 3 Lessons Learned entries
6. Output: structured context block injected into all downstream agents

### Checkpoint Protocol (after every agent)
Write to `.ai/sessions/active_checkpoint.md`:
- Which agent just completed
- Files changed
- Decisions made
- Contract status (if applicable)
- Next agent in queue
- Any flags or warnings

### Close Protocol
1. Rename `active_checkpoint.md` -> `YYYY-MM-DD_HH-MM_topic.md`
2. Update `docs/06-performance.md` with latest Lighthouse scores and bundle sizes (if performance gate ran)
3. Append new Lessons Learned entries (if any)
4. Update task graph: mark completed, flag blocked, list next
5. Execute on pipeline SUCCESS and FAILURE — this step is never skipped

---

*v3: Adapted for 60 Walker St Household Portal. Static Next.js, no backend, Netlify deploy.*

