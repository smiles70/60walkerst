# Context: 60 Walker St — Household Portal

## 1. Project Directory Tree
```
windsurf-project/
├── .cursor/
│   ├── system.md
│   ├── product.md
│   ├── tech.md
│   ├── context.md
│   ├── instruction.md
│   └── verification.md
├── app/
│   ├── sections/        (welcome, utilities, contact)
│   ├── data/            (house-rules, utilities, contacts)
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   └── ui/              (Shadcn components)
├── public/
│   └── artifacts/       (reference images for download)
│       ├── welcome-summary.png
│       ├── utilities-share.png
│       └── utilities-contact.png
├── lib/
│   └── utils.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## 2. Built & Verified Features
- [x] Next.js project scaffold — Status: built & tested
- [x] Tailwind + custom color palette — Status: built & tested
- [x] Architecture Blueprint (UX + System + Platform + Infra + Security) — Status: adopted in `.cursor/`
- [x] Welcome / House Rules section — Status: built & tested
- [ ] Utilities Dashboard section — Status: pending
- [ ] Contact & Action Hub section — Status: pending
- [ ] Downloadable artifacts — Status: pending
- [ ] Responsive polish — Status: pending

## 3. Architecture Domains Covered
| Domain | File | Status |
|--------|------|--------|
| UX Architecture | `product.md` Section 2 | Defined (personas, journeys, flows, constraints) |
| Interaction Model | `product.md` Section 3 | Defined (states, transitions, feedback, edge cases) |
| UI System | `product.md` Section 4 | Defined (components, layouts, reusability) |
| System Architecture | `tech.md` Sections 1-3 | Defined (components, data flow, structure) |
| Platform Architecture | `tech.md` Section 4 | Defined (services, integrations, error handling) |
| Infrastructure | `tech.md` Section 5 | Defined (deployment, scaling, observability, security) |
| Governance | `system.md` Sections 2-3 | Defined (agent flow, architecture gate) |

## 4. Third-Party Integrations
- None (v1.0 fully static)

## 5. Known Issues & Constraints
- **Reference images exist** — 3 artifact images provided by user (Welcome Summary, Utilities Share, Utilities & Contact)
- **Content from images** — Need to extract and data-fy all text from the 3 reference images
- **Color scheme locked** — Navy (#1e3a5f) + Green (#4a9c2d) + Amber (#f59e0b) from reference posters
- **No backend** — All data static; updates require code changes
- **Artifact files needed** — User must copy 3 PNGs to `public/artifacts/` for download buttons to work

## 6. Last Updated
2026-06-04 — Architecture Blueprint fully adopted. 6 domains governed: UX, Interaction, System, Platform, Infrastructure, Security.
