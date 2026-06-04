# Instruction

## Current Task (Epic Sprint 2: DRY Refactor — Shared Icon Component)
Eliminate the duplicated `Icon` component across 3 section files. Follow agent swarm governance.

> Create `components/ui/icon.tsx` containing a single shared `Icon` component that aggregates ALL icon definitions from `welcome.tsx`, `utilities.tsx`, and `contact.tsx`. The component must accept `name: string` and optional `className?: string` props and return `React.ReactElement | null`. Import and use this shared `Icon` in all three section files, removing the local `Icon` function from each. Ensure all icons have `aria-hidden="true"` for accessibility. Do not change any visual output or behavior.

## Scope
- **In Scope**: New file `components/ui/icon.tsx`, modifications to `app/sections/welcome.tsx`, `app/sections/utilities.tsx`, `app/sections/contact.tsx`
- **Out of Scope**: Data files, page.tsx, layout.tsx, globals.css

## Dependencies
- Requires: Sprint 1 completed & pushed (confirmed)
- Blocks: Sprint 3 (Silent Failure Fix)

## Expected Output
- Single `Icon` component in `components/ui/icon.tsx`
- All 3 section files import shared `Icon`
- No local `Icon` functions remain in section files
- `npm run build` passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
