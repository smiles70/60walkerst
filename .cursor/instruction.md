# Instruction

## Current Task (Epic Sprint 5: ESLint & Quality Gates)
Configure ESLint with Next.js recommended rules + accessibility, fix all violations. Follow agent swarm governance.

> Create `.eslintrc.json` extending `next/core-web-vitals`, `next/typescript`, and `plugin:jsx-a11y/recommended`. Install `eslint-plugin-jsx-a11y` if needed. Run `npm run lint` and fix all violations. Ensure `npm test` and `npm run build` still pass. Do not change component behavior except to fix lint violations.

## Scope
- **In Scope**: `.eslintrc.json`, `package.json` (if deps needed), lint fixes in source files
- **Out of Scope**: Component behavior changes beyond lint fixes

## Dependencies
- Requires: Sprint 4 completed & pushed (confirmed)
- Blocks: Epic complete

## Expected Output
- `npm run lint` passes with zero errors/warnings
- `npm test` still passes
- `npm run build` still passes
- Zero bugs after `/code check` and `/bug checker` iteration
