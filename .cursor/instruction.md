# Instruction

## Current Task (Epic Sprint 4: Testing Infrastructure)
Add minimal but complete testing pipeline. Follow agent swarm governance.

> Install Jest, React Testing Library, and jsdom. Configure `jest.config.ts` for Next.js 15 with App Router. Add an `npm test` script to `package.json`. Write smoke tests: (1) `page.tsx` renders without crashing, (2) `WelcomeSection` renders all 4 rule cards, (3) `UtilitiesSection` table shows correct totals, (4) `ContactSection` renders all 3 provider cards. All tests must pass. Do not change component behavior.

## Scope
- **In Scope**: `package.json` (add test script), `jest.config.ts`, `__tests__/page.test.tsx`, `__tests__/welcome.test.tsx`, `__tests__/utilities.test.tsx`, `__tests__/contact.test.tsx`
- **Out of Scope**: Component behavior changes, data files

## Dependencies
- Requires: Sprint 3 completed & pushed (confirmed)
- Blocks: Sprint 5 (ESLint & Quality Gates)

## Expected Output
- `npm test` runs and all 4 test suites pass
- `npm run build` still passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
