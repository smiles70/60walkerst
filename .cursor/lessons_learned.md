# Lessons Learned — 60 Walker St

## Lesson 1: Tailwind CSS v4 Utility Generation
**Date:** 2026-06-05
**Severity:** High (caused 4 iterations to fix hero headline color)

### What happened
Changed hero headline from `text-white` to `text-green`. Commit succeeded, build succeeded, tests passed — but the color did not render in the browser. The headline remained dark/navy.

### Root cause
Tailwind CSS v4 uses CSS-based `@theme` configuration (`@theme { --color-green: #4a9c2d }`). This defines a CSS custom property, but **does not automatically generate utility classes** like `text-green` or `bg-green` the way Tailwind v3 did with `theme.extend`.

We verified by grepping the generated CSS — `#4a9c2d` was **not present** in the build output.

### Fix
Use inline styles with explicit hex values for guaranteed color application:
```tsx
<h1 style={{ color: "#4a9c2d" }}>...</h1>
```

### Prevention
After any color/utility class change, always verify the generated CSS:
```bash
npm run build
grep "4a9c2d" dist/_next/static/css/*.css
```

---

## Lesson 2: Netlify Anonymous Deploy Requires --create-site
**Date:** 2026-06-05
**Severity:** Medium (caused deploy script failure)

### What happened
Created `deploy:anonymous` script with `--allow-anonymous` flag. First run failed with:
```
Error: No project linked. Use --create-site <name> to create a new site...
```

### Root cause
`--allow-anonymous` removes authentication requirements but **does not auto-create a site**. You must explicitly pass `--create-site=<name>` or `--site=<id>`.

### Fix
```bash
npx netlify deploy --allow-anonymous --create-site="60-walker-st" --dir=dist --prod --json
```

### Prevention
Always test deployment scripts with a dry-run or manual execution before relying on them in automation.

---

## Lesson 3: Documentation Research ≠ Working Code
**Date:** 2026-06-05
**Severity:** High (30 sources read, still missed the flag)

### What happened
Conducted exhaustive research (30+ sources) on Netlify deployment automation. Still produced a broken script because the `--create-site` flag requirement was not connected to `--allow-anonymous` usage.

### Root cause
Research was documentation-heavy but lacked **hands-on validation**. Reading CLI reference does not guarantee understanding of flag interactions.

### Fix
Research + immediate practical test:
```bash
npx netlify deploy --allow-anonymous --dir=dist --prod --json
# ^ fails → reveals missing --create-site
```

### Prevention
All automation scripts must be tested end-to-end before being committed.

---

## Lesson 4: TrustBadges/SocialProof/Teaser Should Be View-Conditional
**Date:** 2026-06-05
**Severity:** Low (UI cleanup)

### What happened
Added conditional rendering for trust badges, social proof, and teaser — but later decided they should not appear in the cards view at all. Only the two cards should show.

### Root cause
UI requirements evolved after implementation. Original design assumed supplementary info in cards view; revised design calls for minimal cards-only view.

### Fix
Removed all three components from the cards view entirely. Only title/subtitle + two cards render.

### Prevention
Get final UI wireframe/approval before implementing view-state conditionals.

---

## Lesson 5: Removing Components Requires Test Updates
**Date:** 2026-06-05
**Severity:** Low

### What happened
Removed TrustBadges, SocialProof, WhatsIncludedTeaser from cards view. Tests immediately failed because they asserted these elements were present.

### Fix
Removed corresponding test assertions in `__tests__/applicant.test.tsx`.

### Prevention
Always run the full test suite immediately after removing UI elements that tests depend on.
