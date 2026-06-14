# SKILL.md — Post-Deploy Validate

> **Owner:** Audit Agent (must run after every deploy action)
> **Trigger:** CI completes, user says "check if it's live", or after any push to master/main
> **Goal:** Verify the deploy actually succeeded, changes are visible on the target site, and nothing is broken
> **Quality Target:** 100% detection of failed deploys, partial deploys, and invisible changes

---

## 1. Pre-Flight Checklist (MUST VERIFY ALL)

| # | Check | How | Pass Criteria |
|---|-------|-----|---------------|
| 1 | **CI workflow completed successfully** | GitHub Actions API or UI | Status = `completed`, Conclusion = `success` |
| 2 | **Target site is reachable** | HTTP HEAD request to production URL | Status code 200 |
| 3 | **Deployed files match committed files** | Diff source against live (see Section 4) | All changed files are reflected in live site |
| 4 | **Key changes are visible in browser** | Screenshot, DOM check, or manual verification | User-requested changes render correctly |
| 5 | **No 404s on new assets** | Check new files in `public/` are accessible | All new static files return 200 |
| 6 | **Smoke test: critical paths work** | Click through main user journeys | No JavaScript errors, no broken navigation |
| 7 | **No console errors** | Browser DevTools console check | Zero critical errors, zero 404s for required assets |
| 8 | **Performance baseline not regressed** | Lighthouse or manual timing | No significant slowdown vs last deploy |

---

## 2. Deploy Failure Patterns — KNOW THESE

| Pattern | Symptom | Root Cause | Detection Method |
|---------|---------|------------|------------------|
| **Wrong site** | Changes live on random `.netlify.app` URL, not `60walkerst.com` | Anonymous deploy created new site | Check URL matches expected production domain |
| **CI passed but deploy failed** | GitHub Actions green, but site unchanged | Deploy step failed after build (secrets, CLI error) | Check CI logs for "Deploy to Netlify" step |
| **Partial deploy** | Some changes visible, others missing | Uncommitted files not in push | Diff source files against live site |
| **Cached old version** | No changes visible after refresh | CDN or browser cache | Hard refresh (Ctrl+Shift+R), check cache headers |
| **Broken build** | Site shows 404 or blank page | Build error not caught locally | HTTP 200 but missing JS/CSS chunks |
| **Asset 404** | Images/docs fail to load | New `public/` files not deployed | Check Network tab for 404s |
| **JS runtime error** | Blank sections or broken interactivity | Type error, missing import, bad prop | Check browser console for red errors |

---

## 3. Step-by-Step Validation Procedure

### Phase A: Verify CI Success (30 seconds)

```bash
# GitHub Actions API — check latest run
$headers = @{
  "Accept" = "application/vnd.github+json"
  "X-GitHub-Api-Version" = "2022-11-28"
}
$run = Invoke-RestMethod `
  -Uri "https://api.github.com/repos/{OWNER}/{REPO}/actions/runs?per_page=1" `
  -Headers $headers

# Check:
# - $run.workflow_runs[0].status = "completed"
# - $run.workflow_runs[0].conclusion = "success"
# - $run.workflow_runs[0].head_sha matches your commit hash
```

**If CI failed:**
1. Open the run URL: `https://github.com/{OWNER}/{REPO}/actions/runs/{RUN_ID}`
2. Find the failed step
3. Read the error log
4. Fix the issue locally
5. Commit and push again

---

### Phase B: Verify Site Reachability (10 seconds)

```powershell
# HTTP HEAD check
$response = Invoke-WebRequest `
  -Uri "https://60walkerst.com" `
  -Method HEAD `
  -UseBasicParsing `
  -ErrorAction SilentlyContinue

# Expected: StatusCode = 200
# If 404 or 5xx → Deploy failed or DNS issue
```

---

### Phase C: Diff Source vs Live (2 minutes)

**Method 1: File Hash Comparison (Programmatic)**

```bash
# For each file changed in the commit, compare to live
# Example: check if house-rules.ts changes are in the built JS bundle

# Download the live HTML
curl -s "https://60walkerst.com" > /tmp/live.html

# Check if expected text appears in the HTML
# (static export inlines React components, so text should be in HTML)
grep -q "Roommates A, B & C" /tmp/live.html && echo "✅ Text found" || echo "❌ Text NOT found"
```

**Method 2: DOM Content Check via Browser (Manual or Scripted)**

```javascript
// In browser console on 60walkerst.com
// After navigating to Tenant Portal → Welcome Home

const cards = document.querySelectorAll('h3');
const cleaningCard = Array.from(cards).find(h => h.textContent.includes('Cleaning Rotation'));
if (cleaningCard) {
  const parent = cleaningCard.closest('[role="button"]') || cleaningCard.parentElement;
  const text = parent.innerText;
  console.log('Card content:', text);
  console.assert(text.includes('Roommates A, B & C'), '❌ Missing updated text');
  console.assert(text.includes('Click to view full schedule'), '❌ Missing schedule hint');
} else {
  console.error('❌ Cleaning Rotation card not found');
}
```

**Method 3: Static Asset Check**

```bash
# For new public/ files:
curl -s -o /dev/null -w "%{http_code}" "https://60walkerst.com/hudson-haven-chore-chart.docx"
# Expected: 200
```

---

### Phase D: Smoke Test Critical Paths (2 minutes)

Navigate through the site and verify:

1. **Home page loads** → `https://60walkerst.com` → HTTP 200
2. **Tenant Portal loads** → Click "Tenant Portal" → Page renders
3. **Welcome Home section** → Navigate to Welcome Home → Cards visible
4. **Cleaning card is clickable** → Click "Cleaning Rotation" → Modal opens
5. **Modal content renders** → Chore chart tables visible
6. **Download button works** → Click "Download PDF" → File downloads
7. **Close button works** → Click "X" → Modal closes
8. **No console errors** → DevTools console → zero red errors

**For each step, record:**
- Pass / Fail
- Any console errors
- Any 404s in Network tab

---

### Phase E: Regression Check (1 minute)

Verify existing functionality still works:

1. **Other cards still render** (Wi-Fi, Shared Supplies, Communication)
2. **Monthly Share section** loads with utility table
3. **Contact & Actions** section loads
4. **Management Login** PIN screen works
5. **Back navigation** works throughout

---

## 4. Automated Validation Script Template

```javascript
// post-deploy-smoke-test.js
// Run in browser console after deploy

async function validateDeploy() {
  const results = [];
  
  // 1. Site reachable
  const home = await fetch('https://60walkerst.com', { method: 'HEAD' });
  results.push({ check: 'Site reachable', pass: home.ok });
  
  // 2. Chore chart text visible
  const html = await (await fetch('https://60walkerst.com')).text();
  results.push({ 
    check: 'Updated text present', 
    pass: html.includes('Roommates A, B & C') 
  });
  
  // 3. New asset accessible
  const asset = await fetch('https://60walkerst.com/hudson-haven-chore-chart.docx', { method: 'HEAD' });
  results.push({ check: 'Chore chart docx accessible', pass: asset.ok });
  
  // 4. No console errors (manual check)
  console.log('=== POST-DEPLOY VALIDATION ===');
  results.forEach(r => console.log(r.pass ? '✅' : '❌', r.check));
  const allPass = results.every(r => r.pass);
  console.log(allPass ? '\n🚀 DEPLOY VERIFIED' : '\n⚠️ DEPLOY ISSUES DETECTED');
  return allPass;
}

validateDeploy();
```

---

## 5. What To Do If Validation Fails

| Failure | Immediate Action | Escalation |
|---------|-----------------|------------|
| CI failed | Read CI logs, fix locally, push again | User if can't fix |
| Site 404/5xx | Check Netlify dashboard for deploy status | User if Netlify issue |
| Changes not visible | Hard refresh, wait 2 min (CDN), check if commit was pushed | User if still missing |
| Asset 404 | Verify file is in `public/`, check build output in `dist/` | User if file missing from build |
| Console JS error | Reproduce locally, fix, push again | User if can't reproduce |
| Broken existing feature | Git bisect to find breaking commit, revert if needed | User immediately |

---

## 6. Validation Report Template

```
🚀 POST-DEPLOY VALIDATION REPORT
==================================
Commit:     016e56e (master)
CI Status:  ✅ Success (https://github.com/.../runs/27508543642)
Site URL:   https://60walkerst.com
Reachable:  ✅ HTTP 200

Changed Files Verified:
  ✅ app/data/house-rules.ts — "Roommates A, B & C" visible
  ✅ app/sections/chore-chart.tsx — modal renders when card clicked
  ✅ components/ui/icon.tsx — Download + X icons render
  ✅ public/hudson-haven-chore-chart.docx — returns 200

Smoke Tests:
  ✅ Home page loads
  ✅ Tenant Portal → Welcome Home → cards visible
  ✅ Cleaning card click → modal opens
  ✅ Download button → file downloads
  ✅ Close button → modal closes
  ✅ No console errors

Regression Tests:
  ✅ Monthly Share section intact
  ✅ Contact & Actions section intact
  ✅ Management Login intact

📊 Overall: ✅ DEPLOY VERIFIED — All checks passed
```

---

## 7. Common Pitfalls — DO NOT DO THESE

| # | Pitfall | Why It Breaks | Prevention |
|---|---------|---------------|------------|
| 1 | Assume green CI = successful deploy | CI may pass build but fail deploy step | Always check CI logs for deploy step specifically |
| 2 | Check site once and move on | CDN cache or browser cache may show old version | Hard refresh, check cache headers, verify with curl |
| 3 | Only test the new feature | Existing features may be broken by the change | Always run regression smoke tests |
| 4 | Skip console error check | JS errors may not break the page but degrade UX | Open DevTools → Console → verify zero errors |
| 5 | Test only the homepage | Changes may be on sub-pages or sections | Test the specific pages/sections that changed |
| 6 | Trust "it works on my machine" | Local build ≠ production build (env differences) | Always verify on the actual production URL |
| 7 | Not comparing file hashes | Can't tell if old or new version is deployed | Use diff or text search to confirm changes are present |

---

## 8. Integration with Session Close

Post-deploy validation is the FINAL step before Session Close:

```
Deploy → Post-Deploy Validate → (if pass) → Session Close
                        |
                        +-- (if fail) → Recovery Agent → Fix → Redeploy → Re-validate
```

**Session Close MUST include:**
- Deploy commit hash
- Validation results (pass/fail per check)
- Any console errors or 404s observed
- Time to live (minutes from push to verified)

---

*Skill version 1.0 — 60 Walker St Household Portal*
*Created: 2026-06-14 (Lesson Learned #24)*
