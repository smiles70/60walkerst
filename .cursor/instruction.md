# Instruction

## Current Task (Epic Sprint 1: Data Layer — Hero & Applicant Portal)
Create typed data files for applicant content. Follow agent swarm governance.

> Create `app/data/applicant.ts` exporting typed interfaces (TownInfo, WatchtowerFacility, KingdomHall, AssemblyHall) and populated arrays. Include: Walden general info, nearby attractions, medical, shopping; Watchtower facilities (Warwick HQ, Patterson Educational Center, Wallkill Farms) with real addresses, phones, distances from Walden; Kingdom Halls within 40 miles; Assembly Halls within 40 miles (or empty array with note). Use string literal icon names matching the shared Icon component.

## Scope
- **In Scope**: `app/data/applicant.ts`
- **Out of Scope**: Components, page.tsx

## Dependencies
- Requires: Testing & Patterns epic complete (confirmed)
- Blocks: Sprint 2 (Hero), Sprint 3 (Applicant Section)

## Expected Output
- `app/data/applicant.ts` with complete typed data
- `npm run build` still passes
- Zero bugs after `/code check` and `/bug checker` iteration
