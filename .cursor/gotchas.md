# Gotchas — 60 Walker St

## Gotcha 1: Tailwind v4 Custom Colors Need Inline Styles
**When:** Any time you use a custom color from `@theme`
**Symptom:** Color class exists in JSX but does not render in browser
**Why:** `@theme { --color-green: #4a9c2d }` defines a CSS variable, NOT a utility class
**Fix:** Use `style={{ color: "#4a9c2d" }}` or `className="[color:var(--color-green)]"`
**Verify:** `grep "4a9c2d" dist/_next/static/css/*.css` must return a match after build

---

## Gotcha 2: Netlify --allow-anonymous Is NOT Enough
**When:** Using anonymous deploy for quick previews
**Symptom:** `Error: No project linked`
**Why:** Anonymous deploy skips login but still needs a site target
**Fix:** Always add `--create-site=<name>` for new sites or `--site=<id>` for existing
**Command:** `npx netlify deploy --allow-anonymous --create-site="60-walker-st" --dir=dist --prod --json`

---

## Gotcha 3: `npm run build` Output Gets Hijacked by Python Server
**When:** Python http.server is running on port 9000 while you run `npm run build`
**Symptom:** Build appears to succeed but dist folder is stale; or build fails with EBUSY
**Why:** Windows file locking on the `dist` folder; Python server holds file handles
**Fix:** Kill all python processes before building:
```powershell
Get-Process python* | Stop-Process -Force
Remove-Item -Recurse -Force dist
npm run build
```

---

## Gotcha 4: ESLint `no-unused-vars` on Local Components
**When:** Removing a component from JSX but leaving its function definition
**Symptom:** Lint warning: `'TrustBadges' is defined but never used`
**Why:** Component was defined locally but no longer referenced in render
**Fix:** Delete the unused function definition entirely, not just its JSX usage
**Shortcut:** Run `npm run lint` immediately after any component removal

---

## Gotcha 5: `text-white` on Dark Image Is Invisible
**When:** Hero section has dark background photo
**Symptom:** White text blends into dark door photo — unreadable
**Why:** Insufficient contrast between white text (#ffffff) and dark vignette
**Fix:** Use tenant button green `#4a9c2d` for high contrast against dark backgrounds
**Accessibility:** Always verify contrast ratio > 4.5:1 for normal text

---

## Gotcha 6: Browser Cache Hides CSS Changes
**When:** Rebuilding after style changes
**Symptom:** Browser still shows old colors/layout after successful build
**Why:** Browser caches CSS aggressively; local server may serve stale files
**Fix:**
1. Stop and restart the server
2. Hard refresh: `Ctrl + Shift + R` or DevTools → Empty Cache and Hard Reload
3. Open in incognito/private window

---

## Gotcha 7: Anonymous Netlify Sites Expire After 1 Hour
**When:** Using `--allow-anonymous` without claiming
**Symptom:** Site URL returns 404 after ~1 hour
**Why:** Unclaimed anonymous deploys are auto-deleted by Netlify
**Fix:** Log into Netlify and claim the site, or use PAT-based deploy for persistence
**Claim URL:** `https://app.netlify.com/projects/<site-name>`
