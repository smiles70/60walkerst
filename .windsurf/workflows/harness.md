---
description: 60 Walker St Agent Harness — Project-specific orchestration layer for AI agents
---

# 60 Walker St Agent Harness

## Architecture

```
User Request
    │
    ▼
[Harness Router] ───┬──► [Design Agent]  ──► Visual/UX changes
    │              ├──► [Code Agent]      ──► Implementation
    │              ├──► [Test Agent]      ──► Test coverage
    │              ├──► [Audit Agent]     ──► Slop + Security checks
    │              └──► [Docs Agent]      ──► Epic/PRD updates
    │
    ▼
[Quality Gate] ──► Build + Test + Lint + TypeCheck
    │
    ▼
[Commit + Push]
```

## Agent Specializations

| Agent | Trigger | Skills Loaded | Output |
|-------|---------|--------------|--------|
| **Design Agent** | `*.tsx` in `sections/`, CSS changes | Color psychology, conversion optimization, WCAG guidelines | Design decisions with rationale |
| **Code Agent** | Any `.ts`, `.tsx` | DRY enforcer, component patterns, TypeScript strict mode | Clean, typed, minimal code |
| **Test Agent** | Any component file | React Testing Library, Jest, coverage thresholds | Tests for every new component |
| **Audit Agent** | Any change | `ai_slop_audit`, `ai_security_audit`, dependency scanning | Pass/fail report with fixes |
| **Docs Agent** | Sprint completion | Markdown formatting, epic progress tracking | Updated `.cursor/epics/*.md` |

## Project Memory (Persistent Context)

```yaml
project:
  name: "60 Walker St Household Portal"
  stack: [Next.js 15.1, React 18, Tailwind CSS, TypeScript]
  test_stack: [Jest, React Testing Library, 33 tests]
  quality_gates: [build, test, lint, typecheck]
  
components:
  icon: "components/ui/icon.tsx"
  hero: "app/sections/hero.tsx"
  applicant: "app/sections/applicant.tsx"
  welcome: "app/sections/welcome.tsx"
  utilities: "app/sections/utilities.tsx"
  contact: "app/sections/contact.tsx"
  
data:
  applicant: "app/data/applicant.ts"
  house_rules: "app/data/house-rules.ts"
  utilities: "app/data/utilities.ts"
  
conventions:
  - Use shared Icon component, never inline SVG
  - All components typed with React.ReactElement return
  - Focus-visible for accessibility, never focus:outline-none
  - Navy (#1e3a5f) + Green (#4caf50) palette
  - Tests for every new component
  - ESLint + jsx-a11y zero violations
```

## Quality Gate Protocol

```
Every code change MUST pass:
1. npm run build     → 0 errors
2. npm test          → All suites pass
3. npm run lint      → 0 errors, 0 warnings
4. tsc --noEmit      → 0 type errors
5. ai_slop_audit     → 0 slop patterns
6. ai_security_audit → 0 vulnerabilities

If ANY gate fails:
- Fix immediately
- Do NOT commit
- Re-run full suite
```

## Custom Commands

| Command | Agent | Action |
|---------|-------|--------|
| `/design-audit` | Design Agent | Review visual hierarchy, color, CTA psychology |
| `/optimize-hero` | Design + Code | Run conversion optimization on hero section |
| `/add-test` | Test Agent | Scaffold test file for current component |
| `/security-check` | Audit Agent | Full security audit + dependency scan |
| `/slop-check` | Audit Agent | Check for duplicated code, anti-patterns |
| `/sprint-report` | Docs Agent | Update epic markdown with progress |
| `/full-gate` | All Agents | Run complete quality gate suite |

## Swarm Governance

- Sprints run concurrently when no dependencies
- Each sprint has: Objective → Tasks → Code → Audit → Commit
- Bug checker runs after every code change
- Zero bugs = commit; any bugs = fix before commit
- Epic markdown updated after every sprint
