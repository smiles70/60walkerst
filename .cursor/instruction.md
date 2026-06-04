# Instruction

## Current Task (Agent Swarm: Contact & Action Hub Section)
Build the Contact & Action Hub section for the 60 Walker St household portal. Follow full agent orchestration, then code check, bug checker, iterate to zero, commit and push.

> Create `app/data/contacts.ts` containing provider contact information from the Utilities & Contact reference image: NYSEG (1-800-572-1111) for electric, Village of Walden (845-778-2121) for water, Blue Flame (845-778-2121) for propane. Also include action items: Report Outage, Confirm Bills, Pay Bills. Then create `app/sections/contact.tsx` that renders contact cards with phone numbers (click-to-call + copy), action buttons, and responsive layout. Import and render the section in `app/page.tsx` after UtilitiesSection. Do not touch welcome or utilities sections.

## Scope
- **In Scope**: `app/data/contacts.ts`, `app/sections/contact.tsx`, update `app/page.tsx` to import contact section
- **Out of Scope**: Welcome section, Utilities section, Download artifacts section

## Dependencies
- Requires: Utilities section built & pushed (confirmed)
- Blocks: Download artifacts section

## Expected Output
- `app/data/contacts.ts` exports typed contact data
- `app/sections/contact.tsx` renders contact cards with phone numbers, action buttons
- `npm run build` passes with zero errors
- Zero bugs after `/code check` and `/bug checker` iteration
