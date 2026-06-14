# SKILL.md — Pre-Deploy Check

> **Owner:** Audit Agent (must run before any deploy action)
> **Trigger:** User says "deploy", "make it live", "push to production", or any deploy intent
> **Goal:** Verify the deploy pathway, credentials, and code state BEFORE any push or deploy command executes
> **Quality Target:** 100% prevention of wrong-site deploys, missing-secret failures, and uncommitted-code pushes

---

## 1. Pre-Flight Checklist (MUST PASS ALL)

| # | Check | How | Pass Criteria |
|---|-------|-----|---------------|
| 1 | **Identify deploy pathway** | Read `.github/workflows/deploy.yml` | Confirm CI/CD pipeline exists and is the production pathway |
| 2 | **Verify NOT on a fallback script** | Read `scripts/deploy.js` or `package.json` deploy script | If `npm run deploy` uses `--allow-anonymous --create-site`, it is NOT the production pathway |
| 3 | **Check git status** | `git status --short` | Working tree is clean OR only intended files are staged |
| 4 | **Diff against origin** | `git diff origin/master --name-only` (or `origin/main`) | Know exactly which files will change on push |
| 5 | **Verify branch is correct** | `git branch --show-current` | Must be `master` or `main` (per `deploy.yml` trigger) |
| 6 | **Check GitHub Actions secrets** | GitHub API: `repos/{owner}/{repo}/actions/secrets` or manual UI check | `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` must exist |
| 7 | **Verify build passes locally** | `npm run build` | Exit code 0, zero TypeScript errors, zero ESLint warnings |
| 8 | **Verify tests pass locally** | `npm test` | Exit code 0, all tests green |
| 9 | **Confirm target URL** | Read `netlify.toml` or check DNS | Know the exact production URL before deploying |
| 10 | **No sensitive data in diff** | `git diff --cached | grep -i "password\|secret\|token\|key"` | No credentials leaked in the commit |

---

## 2. Deploy Pathway Decision Tree

```
USER REQUESTS DEPLOY
        |
        v
Read .github/workflows/deploy.yml
        |
        +-- EXISTS and triggers on push to master/main
        |       |
        |       v
        |   Read scripts/deploy.js
        |       |
        |       +-- Uses --allow-anonymous --create-site?
        |       |       |
        |       |       +-- YES → WARNING: This creates NEW sites, NOT production
        |       |       |         |
        |       |       |         v
        |       |       |   BLOCK deploy. Inform user:
        |       |       |   "Local deploy script creates a NEW site.
        |       |       |    Production deploys via GitHub push → CI → Netlify."
        |       |       |
        |       |       +-- NO (uses PAT + SITE_ID) → May be valid for emergency
        |       |               |
        |       |               v
        |       |           Ask user: "Use local emergency deploy or GitHub CI?"
        |       |
        +-- DOES NOT EXIST or is broken
                |
                v
            FALLBACK: Use local deploy script (if available)
            WARN user: "No CI pipeline detected. Using local fallback."
```

---

## 3. Critical Red Flags — STOP IMMEDIATELY

| Red Flag | Why It's Dangerous | What To Do |
|----------|-------------------|------------|
| `npm run deploy` with `--create-site` | Creates NEW Netlify site with random URL, NOT `60walkerst.com` | Stop. Use `git push` to trigger GitHub Actions instead |
| Working tree has uncommitted changes | Push will NOT include unstaged files → partial deploy | Stop. Stage all files or stash, then re-check |
| Not on `master`/`main` branch | GitHub Actions only triggers on these branches | Stop. Checkout correct branch or inform user |
| `NETLIFY_AUTH_TOKEN` secret missing | CI deploy step will fail after successful build | Stop. Inform user to update GitHub secret |
| `NETLIFY_SITE_ID` secret missing | Netlify CLI doesn't know which site to deploy to | Stop. Inform user to update GitHub secret |
| Build fails locally | CI will also fail, wasting runner minutes | Stop. Fix build errors first |
| Tests fail locally | CI will also fail, blocking deploy | Stop. Fix tests first |
| Diff includes `.env`, credentials, or PII | Security breach if pushed | Stop. Remove sensitive files from commit |

---

## 4. Step-by-Step Procedure

### Phase A: Audit Deploy Pipeline (30 seconds)

```bash
# 1. Check CI/CD workflow exists
cat .github/workflows/deploy.yml

# 2. Check deploy script strategy
cat scripts/deploy.js | grep -E "create-site|allow-anonymous|NETLIFY_AUTH_TOKEN"

# 3. Check package.json deploy scripts
cat package.json | grep -A2 '"deploy"'
```

**Decision:**
- If GitHub Actions exists AND triggers on push → production pathway is `git push`
- If `deploy.js` uses anonymous deploy → local script is NOT production

### Phase B: Verify Git State (30 seconds)

```bash
# 1. Current branch
git branch --show-current

# 2. Uncommitted changes
git status --short

# 3. Files that will change on push
git diff origin/master --name-only
# (or git diff origin/main --name-only)

# 4. Last commit message
git log -1 --oneline
```

**Decision:**
- If branch is NOT `master`/`main` → Stop, inform user
- If uncommitted changes exist → Stop, stage or stash
- If diff includes unexpected files → Stop, review

### Phase C: Verify Secrets (if CI pathway)

```bash
# Check via GitHub CLI (if installed and authenticated)
gh secret list

# Or check via GitHub API
curl -s -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  "https://api.github.com/repos/{OWNER}/{REPO}/actions/secrets"
```

**Fallback:** Ask user to verify in GitHub UI:
- Repo → Settings → Secrets and variables → Actions
- Confirm `NETLIFY_AUTH_TOKEN` exists
- Confirm `NETLIFY_SITE_ID` exists

### Phase D: Local Build & Test Gate (2-3 minutes)

```bash
npm run build
npm test
```

**Decision:**
- If build fails → Stop, fix errors
- If tests fail → Stop, fix tests
- If warnings exist → Fix warnings (zero tolerance)

### Phase E: Security Scan (15 seconds)

```bash
# Check for credentials in staged files
git diff --cached | grep -i -E "password|secret|token|key|api_key"

# Check for .env files in diff
git diff --cached --name-only | grep -E "\.env"
```

**Decision:**
- If credentials found → Stop, remove from commit immediately

---

## 5. Verification Checklist (Before Declaring "Ready to Deploy")

- [ ] Deploy pathway identified (GitHub CI vs local fallback)
- [ ] On correct branch (`master`/`main`)
- [ ] Working tree clean (all intended changes staged/committed)
- [ ] Diff reviewed — only expected files will change
- [ ] Build passes locally with zero errors/warnings
- [ ] Tests pass locally with zero failures
- [ ] No credentials or secrets in diff
- [ ] GitHub Actions secrets verified (if CI pathway)
- [ ] Production URL known and confirmed
- [ ] User explicitly approves deploy after pre-check summary

---

## 6. Common Pitfalls — DO NOT DO THESE

| # | Pitfall | Why It Breaks | Prevention |
|---|---------|---------------|------------|
| 1 | Run `npm run deploy` without reading deploy script | May create anonymous site instead of updating production | Always read `scripts/deploy.js` and `package.json` first |
| 2 | Assume `deploy` script = production deploy | Fallback scripts exist for emergencies, not daily use | Pre-deploy check decides the correct pathway |
| 3 | Push with uncommitted changes | Working directory changes don't deploy → partial/incomplete update | `git status` must be clean before push |
| 4 | Skip local build because "CI will catch it" | Wastes CI runner minutes, slower feedback loop | Always build locally first |
| 5 | Skip secret verification | CI fails silently at deploy step after successful build | Check secrets BEFORE pushing |
| 6 | Deploy from feature branch | GitHub Actions only triggers on master/main push | Must be on correct branch |
| 7 | Not knowing the production URL | Can't verify deploy succeeded | Check `netlify.toml`, DNS, or ask user |

---

## 7. Example Pre-Deploy Summary (Output to User)

```
✅ PRE-DEPLOY CHECK SUMMARY
============================
Pathway:    GitHub Actions CI/CD (push to master → Netlify)
Branch:     master ✓
Git state:  Clean, 7 files staged
Build:      PASS (0 errors, 0 warnings)
Tests:      PASS (12/12)
Secrets:    NETLIFY_AUTH_TOKEN ✓ | NETLIFY_SITE_ID ✓
Security:   No credentials in diff ✓
Target URL: https://60walkerst.com

Files to deploy:
  M  app/data/house-rules.ts
  M  app/sections/welcome.tsx
  A  app/sections/chore-chart.tsx
  M  components/ui/icon.tsx
  A  public/hudson-haven-chore-chart.docx
  M  .gitignore
  A  .ai/skills/add-applicant/SKILL.md

🚀 Ready to deploy. Proceed? (yes/no)
```

---

*Skill version 1.0 — 60 Walker St Household Portal*
*Created: 2026-06-14 (Lesson Learned #21-23)*
