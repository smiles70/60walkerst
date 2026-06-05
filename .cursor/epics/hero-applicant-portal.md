# Epic: Hero & Applicant Portal

**Goal**: Redesign landing page with hero photo, Applicant/Tenant entry points, and comprehensive Walden NY info for applicants.
**Governance**: Agent swarm with Architecture Gate for each sprint. Code check + bug checker → zero bugs → commit + push.

---

## Sprint Backlog

### Sprint 1: Data Layer [P0] ✅
**Objective**: Create typed data files for applicant content.
**Tasks**:
- Create `app/data/applicant.ts` with TownInfo, WatchtowerFacility, KingdomHall, AssemblyHall types
- Populate with researched data: Walden general info, nearby attractions, medical, shopping
- Populate Watchtower facilities (Warwick, Patterson, Wallkill) with addresses, distances, phone numbers
- Populate Kingdom Halls within 40 miles
- Populate Assembly Halls within 40 miles (note if none found)
- Commit and push

### Sprint 2: Hero Section [P0] ✅
**Objective**: Build hero with front door photo and two CTA buttons.
**Tasks**:
- Create `app/sections/hero.tsx` with full-width hero image (`/hero-door.jpg`)
- Overlay with title "60 Walker St — Household Portal"
- Two prominent buttons: "Applicant" and "Tenant"
- Buttons trigger callback to parent (state managed in page.tsx)
- Responsive design, accessible
- Commit and push

### Sprint 3: Applicant Info Section [P1] ✅
**Objective**: Build interactive cards showing Walden info, Watchtower facilities, Kingdom Halls, Assembly Halls.
**Tasks**:
- Create `app/sections/applicant.tsx`
- Town info cards (General, Nearby, Medical, Shopping)
- Watchtower facilities table/card with distances
- Kingdom Halls list with distances
- Assembly Halls list (or "none within 40 miles" notice)
- Use shared Icon component
- Commit and push

### Sprint 4: Page Refactor & State Shell [P1] ✅
**Objective**: Refactor page.tsx to state-driven shell. Move existing sections behind Tenant toggle.
**Tasks**:
- Refactor `app/page.tsx` to use `useState` for view mode: 'hero' | 'applicant' | 'tenant'
- Default: hero only
- Applicant button → shows `ApplicantSection`
- Tenant button → shows `WelcomeSection` + `UtilitiesSection` + `ContactSection`
- Add "Back" button to return to hero
- Update `page.test.tsx`
- Commit and push

### Sprint 5: Tests & Quality [P2] ✅
**Objective**: Add tests for new components. Verify all quality gates.
**Tasks**:
- Write `__tests__/hero.test.tsx`
- Write `__tests__/applicant.test.tsx`
- Update `__tests__/page.test.tsx` for new state-driven layout
- Run `npm test`, `npm run build`, `npm run lint`, `tsc --noEmit`
- All must pass with zero errors
- Commit and push

---

## Dependency Map

```
Sprint 1 (Data) ──────┐
                      ├──→ Sprint 3 (Applicant) ──┐
Sprint 2 (Hero) ──────┘                           ├──→ Sprint 4 (Page Refactor) ──→ Sprint 5 (Tests)
```

Sprints 1 and 2 can run concurrently.
Sprint 3 depends on Sprint 1.
Sprint 4 depends on Sprint 2 and 3.
Sprint 5 is final verification.

---

## Success Criteria

- [x] Hero displays front door photo with two CTA buttons
- [x] Applicant view shows Walden info, Watchtower facilities, Kingdom Halls, Assembly Halls
- [x] Tenant view shows existing Welcome/Utilities/Contact sections
- [x] `npm test` passes (33/33)
- [x] `npm run build` passes
- [x] `npm run lint` passes (0 errors, 0 warnings)
- [x] Zero bugs
