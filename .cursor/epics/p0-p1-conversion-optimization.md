# Epic: P0/P1 Conversion Optimization

**Goal**: Increase landing page conversion by improving emotional appeal, trust signals, and social proof.
**Governance**: Agent swarm with Harness Router. Design Agent + Code Agent + Test Agent + Audit Agent.

---

## Success Criteria

- [ ] Hero headline is value-driven, not address-only
- [ ] Trust badges visible below CTA buttons
- [ ] Social proof line present
- [ ] Hero overlay reduced for better photo visibility
- [ ] Pricing visible in applicant section
- [ ] "Schedule Tour" section present
- [ ] Testimonial placeholder in applicant section
- [ ] "What's Included" teaser below hero buttons
- [ ] All quality gates pass (build, test, lint, typecheck)
- [ ] Zero bugs

---

## Dependency Map

```
Sprint 1 (Hero Copy + Visual) ──┐
                                 ├──→ Sprint 3 (Tests + Integration) ──→ Sprint 4 (Audit + Commit)
Sprint 2 (Applicant Enhance) ────┘
```

---

## Sprint Backlog

### Sprint 1: Hero Copy & Visual Polish [P0]
**Objective**: Rewrite headline, add trust badges, social proof, reduce overlay.
**Depends on**: None
**Agents**: Design Agent (decisions) + Code Agent (implementation)

**Tasks**:
- [ ] Update headline: "Your Next Chapter Starts Here — 60 Walker St, Walden NY"
- [ ] Add subtitle: "A welcoming shared home in the heart of the Hudson Valley"
- [ ] Reduce hero overlay from `from-navy-900/80` to `from-navy-900/50`
- [ ] Add trust badge row: "Available Now · No Broker Fee · Move-In Ready"
- [ ] Add social proof line: "Loved by previous roommates · 5-star household"
- [ ] Add "What's Included" teaser grid below hero card
- [ ] Update `hero.test.tsx` for new copy
- [ ] Run quality gates → zero errors → commit

### Sprint 2: Applicant Section Enhancements [P1]
**Objective**: Add pricing, tour CTA, testimonials.
**Depends on**: None (can run concurrent with Sprint 1)
**Agents**: Code Agent + Test Agent

**Tasks**:
- [ ] Add `pricing` field to `TownInfo` in `app/data/applicant.ts`
- [ ] Add `testimonials` array to `app/data/applicant.ts`
- [ ] Add `scheduleTour` object with contact info
- [ ] Display pricing in Town Info tab
- [ ] Add "Schedule a Tour" card in applicant section
- [ ] Add testimonial carousel/placeholder in applicant section
- [ ] Write tests for new applicant features
- [ ] Run quality gates → zero errors → commit

### Sprint 3: Integration & Page Tests [P1]
**Objective**: Update page tests, verify all new sections render.
**Depends on**: Sprint 1 + Sprint 2
**Agents**: Test Agent + Audit Agent

**Tasks**:
- [ ] Update `page.test.tsx` to check for new headline text
- [ ] Verify trust badges render in hero
- [ ] Verify "What's Included" teaser renders
- [ ] Verify applicant section shows pricing and testimonials
- [ ] Run `npm test` — all 35+ tests pass
- [ ] Run `npm run build` — zero errors
- [ ] Run `npm run lint` — zero errors, zero warnings
- [ ] Run `tsc --noEmit` — zero type errors
- [ ] Commit

### Sprint 4: Final Audit & Epic Close [P2]
**Objective**: Run full audit suite, update epic, push.
**Depends on**: Sprint 3
**Agents**: Audit Agent + Docs Agent

**Tasks**:
- [ ] Run `ai_slop_audit` — check for duplicated code
- [ ] Run `ai_security_audit` — check for new vulnerabilities
- [ ] Update epic markdown with sprint completion checkboxes
- [ ] Git commit with sprint summary
- [ ] Git push to origin
