# Instruction

## Current Task (Agent Swarm: Utilities Dashboard Section)
Build the Utilities Dashboard section for the 60 Walker St household portal. Follow full agent orchestration, then code check, bug checker, iterate to zero, commit and push.

> Create `app/data/utilities.ts` containing the utilities cost data from the Utilities Share reference image: Propane (Blue Flame, $68.00, 36.4%, $34.00), Electric (NYSEG, $48.00, 25.7%, $24.00), Internet (Spectrum, $71.00, 37.9%, $35.50), Total ($187.00, 100%, $93.50). Also include per-person share and provider info. Then create `app/sections/utilities.tsx` that renders a styled cost table with SectionHeader (navy bar), payment instructions (Pay by 15th, Venmo/Zelle), and responsive layout. Import and render the section in `app/page.tsx` after WelcomeSection. Do not touch welcome or contact sections.

## Scope
- **In Scope**: `app/data/utilities.ts`, `app/sections/utilities.tsx`, update `app/page.tsx` to import utilities section
- **Out of Scope**: Welcome section, Contact section, Download artifacts section

## Dependencies
- Requires: Welcome section built & pushed (confirmed)
- Blocks: Contact section

## Expected Output
- `app/data/utilities.ts` exports typed utility cost data
- `app/sections/utilities.tsx` renders responsive cost table with provider info
- Payment instructions visible (pay-by date, methods)
- `npm run build` passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
