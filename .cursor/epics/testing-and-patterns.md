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
- [ ] Remove `password: "HomeSweet123"` from `app/data/house-rules.ts` — replace with placeholder instruction
- [ ] Update `welcome.tsx` to show "Ask a roommate for the password" instead of copy button
- [ ] Remove `package-lock.json` from `.gitignore` and commit it
- [ ] Run `/code check` and `/bug checker`, iterate to zero
- [ ] Commit and push
**Estimated**: 15 min

### Sprint 2: DRY Refactor — Shared Icon Component [P1]
**Objective**: Eliminate duplicated `Icon` component across 3 section files.
**Agent Swarm**: Full pipeline
**Tasks**:
- [ ] Create `components/ui/icon.tsx` — shared Icon component with all icon definitions
- [ ] Refactor `welcome.tsx`, `utilities.tsx`, `contact.tsx` to import shared Icon
- [ ] Verify no visual regressions
- [ ] Run `/code check` and `/bug checker`, iterate to zero
- [ ] Commit and push
**Estimated**: 20 min

### Sprint 3: Silent Failure Fix — Catch Blocks [P1]
**Objective**: Replace empty catch blocks with user-visible error handling.
**Agent Swarm**: Full pipeline
**Tasks**:
- [ ] Add error state to `InfoCard` (welcome.tsx) — show "Copy failed" message
- [ ] Add error state to `ContactCard` (contact.tsx) — show "Copy failed" message
- [ ] Use `try/catch/finally` pattern with visible fallback
- [ ] Run `/code check` and `/bug checker`, iterate to zero
- [ ] Commit and push
**Estimated**: 15 min

### Sprint 4: Testing Infrastructure [P1]
**Objective**: Add minimal but complete testing pipeline.
**Agent Swarm**: Full pipeline
**Tasks**:
- [ ] Install Jest + React Testing Library + jsdom
- [ ] Configure `jest.config.ts` for Next.js 15
- [ ] Add `npm test` script to `package.json`
- [ ] Write smoke test: `page.tsx` renders without crashing
- [ ] Write component test: `WelcomeSection` renders all 4 rule cards
- [ ] Write component test: `UtilitiesSection` table shows correct totals
- [ ] Write component test: `ContactSection` renders all 3 providers
- [ ] Run `/code check` and `/bug checker`, iterate to zero
- [ ] Commit and push
**Estimated**: 30 min

### Sprint 5: ESLint & Quality Gates [P2]
**Objective**: Configure ESLint and add pre-commit quality checks.
**Agent Swarm**: Full pipeline
**Tasks**:
- [ ] Configure `eslint.config.mjs` with Next.js recommended rules + accessibility (jsx-a11y)
- [ ] Run `npm run lint` and fix all violations
- [ ] Add `.husky/` pre-commit hook (optional — if husky install works)
- [ ] Run `/code check` and `/bug checker`, iterate to zero
- [ ] Commit and push
**Estimated**: 20 min

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

- [ ] AI Slop Score < 20 (from 34.3)
- [ ] All 5 sprints committed and pushed
- [ ] `npm run build` passes on every sprint
- [ ] `npm test` passes (after Sprint 4)
- [ ] `npm run lint` passes (after Sprint 5)
- [ ] Zero `any` types, zero console logs, zero empty catch blocks
