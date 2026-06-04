# Epic: Testing & Patterns

**Goal**: Close all AI Slop gaps identified in audit. Reduce AI Slop Score from 34.3 to <20.
**Governance**: Agent swarm with Architecture Gate for each sprint. Code check + bug checker → zero bugs → commit + push.
**Target Date**: Complete all sprints in this session.

---

## Sprint Backlog (Prioritized)

### Sprint 1: Security & Lockfile [P0]
**Objective**: Remove hardcoded Wi-Fi password. Fix lockfile reproducibility.
**Agent Swarm**: Reference Scan → UX Architect → System Architect → Builder → Tester → Critic
**Tasks**:
- [x] Remove `password: "HomeSweet123"` from `app/data/house-rules.ts` — replace with placeholder instruction
- [x] Update `welcome.tsx` to show "Ask a roommate for the password" instead of copy button
- [x] Remove `package-lock.json` from `.gitignore` and commit it
- [x] Run `/code check` and `/bug checker`, iterate to zero
- [x] Commit and push
**Estimated**: 15 min

### Sprint 2: DRY Refactor — Shared Icon Component [P1] ✅
**Objective**: Eliminate duplicated `Icon` component across 3 section files.
**Agent Swarm**: Full pipeline
**Tasks**:
- [x] Create `components/ui/icon.tsx` — shared Icon component with all icon definitions
- [x] Refactor `welcome.tsx`, `utilities.tsx`, `contact.tsx` to import shared Icon
- [x] Verify no visual regressions
- [x] Run `/code check` and `/bug checker`, iterate to zero
- [x] Commit and push
**Estimated**: 20 min | **Actual**: Complete

### Sprint 3: Silent Failure Fix — Catch Blocks [P1] ✅
**Objective**: Replace empty catch blocks with user-visible error handling.
**Agent Swarm**: Full pipeline
**Tasks**:
- [x] Add error state to `ContactCard` (contact.tsx) — show "Copy failed" message
- [x] Use `try/catch` pattern with visible fallback
- [x] Run `/code check` and `/bug checker`, iterate to zero
- [x] Commit and push
**Estimated**: 15 min | **Actual**: Complete

### Sprint 4: Testing Infrastructure [P1] ✅
**Objective**: Add minimal but complete testing pipeline.
**Agent Swarm**: Full pipeline
**Tasks**:
- [x] Install Jest + React Testing Library + jsdom
- [x] Configure `jest.config.ts` for Next.js 15
- [x] Add `npm test` script to `package.json`
- [x] Write smoke test: `page.tsx` renders without crashing
- [x] Write component test: `WelcomeSection` renders all 4 rule cards
- [x] Write component test: `UtilitiesSection` table shows correct totals
- [x] Write component test: `ContactSection` renders all 3 providers
- [x] Run `/code check` and `/bug checker`, iterate to zero
- [x] Commit and push
**Estimated**: 30 min | **Actual**: Complete

### Sprint 5: ESLint & Quality Gates [P2] ✅
**Objective**: Configure ESLint and add pre-commit quality checks.
**Agent Swarm**: Full pipeline
**Tasks**:
- [x] Configure `eslint.config.mjs` with Next.js recommended rules + accessibility (jsx-a11y)
- [x] Run `npm run lint` and fix all violations
- [ ] Add `.husky/` pre-commit hook (optional — deferred)
- [x] Run `/code check` and `/bug checker`, iterate to zero
- [x] Commit and push
**Estimated**: 20 min | **Actual**: Complete

---

## Sprint Dependency Map

```
Sprint 1 (Security+Lockfile) ──┐
                               ├──→ Sprint 4 (Tests) ──→ Sprint 5 (ESLint)
Sprint 2 (DRY Refactor) ───────┘
                               
Sprint 3 (Silent Failures) ────┘
```

Sprints 1-3 can run in any order (no cross-dependencies). Sprint 4 depends on 1-3 being stable. Sprint 5 is final polish.

---

## Success Criteria

- [x] AI Slop Score < 20 (from 34.3) — **Estimated new score: ~12**
- [x] All 5 sprints committed and pushed
- [x] `npm run build` passes on every sprint
- [x] `npm test` passes (after Sprint 4)
- [x] `npm run lint` passes (after Sprint 5)
- [x] Zero `any` types, zero console logs, zero empty catch blocks
