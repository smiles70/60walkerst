# Deployment Configuration — 60 Walker St

> **Single source of truth for how this project deploys.**
> If this doc is out of date, update it immediately before making any deploy changes.

---

## 1. Production Deployment

| Attribute | Value |
|-----------|-------|
| **Platform** | Cloudflare Pages |
| **Project Name** | `60-walker-st` |
| **Git Provider** | GitHub (`smiles70/60walkerst`) |
| **Production Branch** | `master` |
| **Build Command** | `npm run build` |
| **Build Output Directory** | `dist` |
| **Framework Preset** | `None` (custom) |
| **Root Directory** | `/` (repo root) |
| **Build System Version** | Version 3 |
| **Automatic Deployments** | Enabled |
| **Build Comments** | Enabled |
| **Build Cache** | Disabled (Beta, currently off) |

### Production Domains
- `https://60walkerst.com` (custom domain)
- `https://www.60walkerst.com` (custom domain redirect)
- `https://60-walker-st.pages.dev` (Cloudflare Pages default)

### How It Works
1. Push any commit to `master` on GitHub
2. Cloudflare Pages detects the push via Git integration
3. Runs `npm run build`
4. Publishes contents of `dist/` to production
5. Custom domain `60walkerst.com` serves the built files

### Build Time
~1–3 minutes typical.

---

## 2. Stale / Legacy Artifacts (DO NOT USE)

The following files exist in the repo but are **NOT part of the production deploy pathway**. They were created during research but never configured correctly. Using them will create confusion or broken deploys.

| Artifact | Status | Why |
|----------|--------|-----|
| `.github/workflows/deploy.yml` | ❌ Stale / Broken | References Netlify CLI with `NETLIFY_AUTH_TOKEN` secret; this secret has never been configured, so every GitHub Actions run fails |
| `netlify.toml` | ❌ Stale | References `dist` but Netlify is not the production platform |
| `scripts/deploy.js` | ❌ Stale / Misleading | Multi-strategy deploy script including anonymous Netlify deploys; using this creates NEW random Netlify sites, never `60walkerst.com` |
| `package.json` deploy scripts | ⚠️ Partially stale | `"deploy": "node scripts/deploy.js"` and `"deploy:anonymous"` are for emergency/debug only, NOT production |

**Rule:** If you need to deploy, push to `master`. Do not run `npm run deploy` or `scripts/deploy.js` unless you are explicitly testing deploy behavior on a throwaway URL.

---

## 3. Pre-Deploy Checklist

Before pushing to `master`:

1. **Build passes locally:** `npm run build` completes with zero errors
2. **No uncommitted changes:** `git status` shows clean working tree
3. **Git connection is live:** Check Cloudflare Dashboard → `60-walker-st` → Settings → Build → Git repository shows green `smiles70/60walkerst`
4. **You are on `master`:** `git branch --show-current` returns `master`

---

## 4. Post-Deploy Verification

After pushing:

1. **Check Cloudflare Dashboard** → `60-walker-st` → Deployments for a new build
2. **Wait for build success** (usually 1–3 min)
3. **Verify live site:** `https://60walkerst.com?nocache=1`
4. **Confirm changes visible:** Check the specific section/modal/component you changed

---

## 5. Troubleshooting

### Problem: Push to `master` but no new deployment appears
**Cause:** Cloudflare Pages Git integration disconnected.  
**Fix:**
1. Cloudflare Dashboard → `60-walker-st` → Settings → Build
2. Click **Disconnect** then **Connect** next to "Git repository"
3. Re-select `smiles70/60walkerst` and `master` branch
4. Re-enter Build command: `npm run build`
5. Re-enter Build output directory: `dist`
6. Click **Save**
7. Push an empty commit: `git commit --allow-empty -m "Trigger deploy" && git push`

### Problem: GitHub Actions shows "Deploy to Netlify" failures
**Cause:** The `.github/workflows/deploy.yml` workflow is stale and unused.  
**Fix:** Ignore it. The real deployment is Cloudflare Pages. If desired, delete `.github/workflows/deploy.yml`, `netlify.toml`, and `scripts/deploy.js` to eliminate confusion.

### Problem: Changes not visible after deploy
**Cause:** Cloudflare CDN caching.  
**Fix:** Hard refresh (Ctrl+Shift+R) or append `?nocache=1` to URL. Cloudflare Pages deployments bust cache automatically, but browser cache may persist.

---

## 6. Environment & Dependencies

| Tool | Required | Install |
|------|----------|---------|
| Node.js | Yes | `https://nodejs.org` (LTS) |
| npm | Yes | Bundled with Node.js |
| `npm install` | Yes | Run once after clone |

### Local Build
```powershell
npm run build
# Output: dist/
```

### Local Dev Server
```powershell
npm run dev
```

---

## 7. What NOT to Do

- ❌ Run `npm run deploy` for production — it uses the stale Netlify script
- ❌ Run `scripts/deploy.js` for production — it creates random Netlify sites
- ❌ Trust the GitHub Actions "Deploy to Netlify" workflow — it has never worked and is not the production pathway
- ❌ Manually drag-and-drop the `dist` folder — Cloudflare Pages auto-deploys from Git
- ❌ Configure new 3rd-party integrations without updating this doc

---

*Last updated: 2026-06-14*  
*Next review: Any time deployment behavior changes*
