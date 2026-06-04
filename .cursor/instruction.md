# Instruction

## Current Task (Epic Sprint 1: Security & Lockfile)
Fix critical security anti-pattern (hardcoded Wi-Fi password) and reproducibility issue (gitignored lockfile). Follow agent swarm governance.

> Remove the hardcoded Wi-Fi password "HomeSweet123" from `app/data/house-rules.ts`. Replace with a placeholder message: "Password: Ask a roommate for the current Wi-Fi password." Remove the "Copy Password" button from `app/sections/welcome.tsx` since the password is no longer in source code. Keep the network name "WalkerSt60" visible. Also remove `package-lock.json` from `.gitignore` so the lockfile is tracked in git for reproducible builds. Do not touch other sections.

## Scope
- **In Scope**: `app/data/house-rules.ts` (remove hardcoded password), `app/sections/welcome.tsx` (remove copy button), `.gitignore` (remove package-lock.json exclusion)
- **Out of Scope**: Other sections, other data files, build config changes

## Dependencies
- Requires: Contact section built & pushed (confirmed)
- Blocks: Sprint 2 (DRY Refactor)

## Expected Output
- Wi-Fi password is no longer in source control
- `package-lock.json` tracked in git
- `npm run build` passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
