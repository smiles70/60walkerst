# Epic: P0/P1 Conversion Optimization

**Goal**: Increase landing page conversion by improving emotional appeal, trust signals, and social proof.
**Governance**: Agent swarm with Harness Router. Design Agent + Code Agent + Test Agent + Audit Agent.

---

## Success Criteria

- [x] Hero headline is value-driven, not address-only
- [x] Trust badges visible below CTA buttons
- [x] Social proof line present
- [x] Hero overlay reduced for better photo visibility
- [x] Pricing visible in applicant section
- [x] "Schedule Tour" section present
- [x] Testimonial placeholder in applicant section
- [x] "What's Included" teaser below hero buttons
- [x] All quality gates pass (build, test, lint, typecheck)
- [x] Zero bugs

---

## Dependency Map

```
Sprint 1 (Hero Copy + Visual) ──┐
                                 ├──→ Sprint 3 (Tests + Integration) ──→ Sprint 4 (Audit + Commit)
Sprint 2 (Applicant Enhance) ────┘
```

---

## Sprint Backlog

### Sprint 1: Hero Copy & Visual Polish [P0] ✅
**Objective**: Rewrite headline, add trust badges, social proof, reduce overlay.
**Depends on**: None
**Agents**: Design Agent (decisions) + Code Agent (implementation)

**Tasks**:
- [x] Update headline: "Your Next Chapter Starts Here — 60 Walker St, Walden NY"
- [x] Add subtitle: "A welcoming shared home in the heart of the Hudson Valley"
- [x] Reduce hero overlay from `from-navy-900/80` to `from-navy-900/50`
- [x] Add trust badge row: "Available Now · No Broker Fee · Move-In Ready"
- [x] Add social proof line: "Loved by previous roommates · 5-star household"
- [x] Add "What's Included" teaser grid below hero card
- [x] Update `hero.test.tsx` for new copy
- [x] Run quality gates → zero errors → commit

### Sprint 2: Applicant Section Enhancements [P1] ✅
**Objective**: Add pricing, tour CTA, testimonials.
**Depends on**: None (can run concurrent with Sprint 1)
**Agents**: Code Agent + Test Agent

**Tasks**:
- [x] Add `pricing` field to `TownInfo` in `app/data/applicant.ts`
- [x] Add `testimonials` array to `app/data/applicant.ts`
- [x] Add `scheduleTour` object with contact info
- [x] Display pricing in Town Info tab
- [x] Add "Schedule a Tour" card in applicant section
- [x] Add testimonial carousel/placeholder in applicant section
- [x] Write tests for new applicant features
- [x] Run quality gates → zero errors → commit

### Sprint 3: Integration & Page Tests [P1] ✅
**Objective**: Update page tests, verify all new sections render.
**Depends on**: Sprint 1 + Sprint 2
**Agents**: Test Agent + Audit Agent

**Tasks**:
- [x] Update `page.test.tsx` to check for new headline text
- [x] Verify trust badges render in hero
- [x] Verify "What's Included" teaser renders
- [x] Verify applicant section shows pricing and testimonials
- [x] Run `npm test` — all 40 tests pass
- [x] Run `npm run build` — zero errors
- [x] Run `npm run lint` — zero errors, zero warnings
- [x] Run `tsc --noEmit` — zero type errors
- [x] Commit

### Sprint 4: Final Audit & Epic Close [P2] ✅
**Objective**: Run full audit suite, update epic, push.
**Depends on**: Sprint 3
**Agents**: Audit Agent + Docs Agent

**Tasks**:
- [x] Run `ai_slop_audit` — check for duplicated code
- [x] Run `ai_security_audit` — check for new vulnerabilities
- [x] Update epic markdown with sprint completion checkboxes
- [x] Git commit with sprint summary
- [x] Git push to origin
