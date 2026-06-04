# Instruction

## Current Task (Agent Swarm: Welcome / House Rules Section)
Build the Welcome / House Rules section for the 60 Walker St household portal. This is a single atomic task following the full agent orchestration flow.

> Create `app/data/house-rules.ts` containing all house rules data extracted from the Welcome Summary reference image: Communication Guidelines (Talk Early & Often, Be Respectful, Address Issues Directly), Cleaning Rotation (Roommates A & B Swap Weekly), Shared Supplies (Trash Bags, Paper Towels, Dish Soap), Wi-Fi Info (Network: WalkerSt60, Password: HomeSweet123), and the key reminder about dirty dishes. Then create `app/sections/welcome.tsx` that renders this data using the UI system defined in `product.md` — InfoCard components with icons, SectionHeader with navy bar, responsive grid layout. Import and render the section in `app/page.tsx`. Do not touch utilities or contact sections.

## Scope
- **In Scope**: `app/data/house-rules.ts`, `app/sections/welcome.tsx`, update `app/page.tsx` to import welcome section
- **Out of Scope**: Utilities section, Contact section, Download artifacts section, layout changes

## Dependencies
- Requires: Next.js scaffold complete (confirmed)
- Blocks: Utilities section (parallel track, but welcome goes first as it's the hero-adjacent content)

## Expected Output
- `app/data/house-rules.ts` exports typed data for all 5 rule categories
- `app/sections/welcome.tsx` renders cards with icons, navy section header, responsive grid
- `app/page.tsx` renders the welcome section below placeholder hero
- `npm run build` passes with zero errors
