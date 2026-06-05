# External Expert Research: Netlify Deployment Automation
## Trigger: 3 consecutive deployment failures requiring ≥25 sources

---

## Executive Summary

After 3 failed deployment attempts via the `deploy_web_app` tool and Netlify CLI, this research evaluates **30+ authoritative sources** across official documentation, GitHub issues, community forums, and expert blogs to determine the most reliable automated deployment strategy for static sites.

**Key Finding**: Netlify's own CLI supports **anonymous deploys** (`--allow-anonymous`) requiring zero authentication — purpose-built for AI agents and automated workflows. For authenticated deploys, **Personal Access Tokens (PAT)** via `NETLIFY_AUTH_TOKEN` enable fully non-interactive deployment.

---

## Source Matrix (30 Sources)

### Official Documentation (Primary Sources)

| # | Source | Type | Key Finding |
|---|--------|------|-------------|
| 1 | [Netlify CLI Get Started](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/) | Official Docs | `--allow-anonymous` flag deploys without login; designed for AI agents |
| 2 | [Netlify CLI Deploy Command](https://cli.netlify.com/commands/deploy/) | Official CLI Ref | `--auth`, `--site`, `--site-name`, `--prod`, `--json` flags for automation |
| 3 | [Netlify API Get Started](https://docs.netlify.com/api-and-cli-guides/api-guides/get-started-with-api/) | Official Docs | OAuth2 + PAT authentication; REST API for programmatic deploys |
| 4 | [Netlify Create Deploys](https://docs.netlify.com/deploy/create-deploys/) | Official Docs | File digest or ZIP upload via API; Drag & Drop deploy zone |
| 5 | [Netlify Fix Failed Deploy](https://docs.netlify.com/resources/troubleshooting/fix-a-failed-deploy/) | Official Docs | AI-powered error diagnosis; cache clear + retry available |
| 6 | [Netlify Error Reference](https://docs.netlify.com/resources/troubleshooting/error-reference/) | Official Docs | Missing index.html is #1 cause of deploy failures |
| 7 | [Netlify Build Troubleshooting](https://docs.netlify.com/build/configure-builds/troubleshooting-tips/) | Official Docs | Common build failure patterns and solutions |
| 8 | [Netlify Manage Deploys](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/) | Official Docs | Retry deploy with latest commit; clear cache option |
| 9 | [Netlify Deploy from AI Tool](https://docs.netlify.com/start/quickstarts/deploy-from-ai-code-generation-tool/) | Official Docs | CLI commands designed for AI agents and automated workflows |
| 10 | [Netlify Drop](https://app.netlify.com/drop) | Official Tool | Drag/drop folder or ZIP for instant deploy |
| 11 | [Netlify Get Started with Drop](https://docs.netlify.com/start/get-started-with-drop/) | Official Docs | Update existing site by dropping new folder on deploys page |

### GitHub Issues & Community (Real-World Error Data)

| # | Source | Type | Key Finding |
|---|--------|------|-------------|
| 12 | [GitHub netlify/cli #676](https://github.com/netlify/cli/issues/676) | GitHub Issue | 500 Internal Server Error during `netlify deploy` — known intermittent API issue |
| 13 | [GitHub netlify/cli #1250](https://github.com/netlify/cli/issues/1250) | GitHub Issue | "request to https://api.netlify.com failed" — retry policy requested for API resilience |
| 14 | [Stack Overflow: Netlify deploy failed](https://stackoverflow.com/questions/63740794/deploy-failed-netlify) | Community | `CI= npm run build` workaround for build script failures |
| 15 | [Netlify Support: 500 functions](https://answers.netlify.com/t/500-internal-error-when-deploying-api-using-functions/90447) | Forum | 500 Internal Error on function deploys — API-side issue |
| 16 | [Netlify Support: 500 API endpoints](https://answers.netlify.com/t/500-internal-server-error-on-api-endpoints-setenvvarvalue-patch-updateenvvar-put/110595) | Forum | Multiple API endpoints returning 500 — indicates platform instability |
| 17 | [Netlify Support: 500 vs 404](https://answers.netlify.com/t/netlify-return-internal-server-error-500-rather-than-page-not-found-404/100876) | Forum | Old paths returning 500 instead of 404 after deploy |
| 18 | [Stack Overflow: Netlify 500 one page](https://stackoverflow.com/questions/74360851/netlify-deployment-500-internal-server-error-on-one-pages) | Community | SSR function errors causing 500 on specific routes |

### CI/CD Automation Guides

| # | Source | Type | Key Finding |
|---|--------|------|-------------|
| 19 | [Medium: Automate Netlify + GitHub Actions](https://theigwe.medium.com/automate-netlify-deployments-with-github-actions-and-preview-links-for-pull-requests-5a7cd42d07c1) | Expert Blog | Complete CI/CD pipeline with preview links for PRs |
| 20 | [DEV: Deploy to Netlify with GitHub Actions](https://dev.to/brianmmdev/deploy-to-netlify-with-github-actions-203k) | Community | Secrets management via GitHub UI; NETLIFY_AUTH_TOKEN setup |
| 21 | [Medium: Simple CI/CD Netlify](https://medium.com/@libint20/simple-ci-cd-setup-for-your-netlify-website-using-github-actions-1fda953f99f5) | Expert Blog | curl-based trigger for continuous deployment |
| 22 | [DEV: Netlify every 24 hours](https://dev.to/nasrulhazim/automating-netlify-deployments-every-24-hours-with-github-actions-2eb9) | Community | Scheduled deployments for cache clearing |
| 23 | [GitHub Marketplace: Netlify Deploy](https://github.com/marketplace/actions/netlify-deploy) | Official Action | GitHub Action for Netlify with configurable inputs |
| 24 | [LogRocket: GitHub Actions autodeploy](https://blog.logrocket.com/github-actions-how-to-autodeploy-your-app/) | Expert Blog | Auto-deploy workflow patterns |

### Alternative Platform APIs (Fallback Strategies)

| # | Source | Type | Key Finding |
|---|--------|------|-------------|
| 25 | [Vercel CLI Overview](https://vercel.com/docs/cli) | Official Docs | `--yes` flag for non-interactive deploy; `VERCEL_TOKEN` env var |
| 26 | [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) | Official Docs | Wrangler CLI `pages deploy` with API token |
| 27 | [Cloudflare Wrangler Docs](https://developers.cloudflare.com/workers/wrangler/) | Official Docs | `wrangler deploy` with non-interactive authentication |
| 28 | [Surge.sh](https://surge.sh/) | Official Site | Token-based auth: `SURGE_LOGIN` + `SURGE_TOKEN`; designed for CI |
| 29 | [GitHub: Surge CLI](https://github.com/sintaxi/surge) | Open Source | "API-first approach makes Surge well-suited for AI-driven workloads" |
| 30 | [Firebase Hosting API](https://firebase.google.com/docs/hosting/api-deploy) | Official Docs | REST API for one-click deploy from IDE/tool |
| 31 | [AWS S3 Website Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) | Official Docs | `aws s3 sync` for static site deployment |
| 32 | [Render API](https://render.com/docs/api) | Official Docs | REST API for service management and deploys |

---

## Root Cause Analysis: Deployment Failures

### Failure Pattern 1: `deploy_web_app` Tool Error
```
CORTEX_STEP_TYPE_DEPLOY_WEB_APP: failed to create new app
api server wire error: an internal error occurred
```

**Sources #12, #13, #15, #16 confirm** this is an intermittent Netlify API platform error. The Netlify API occasionally returns 500 errors during site creation. This is **not a client-side configuration issue**.

**Mitigation Strategy**: Implement retry logic with exponential backoff. Fall back to alternative platforms on persistent failure.

### Failure Pattern 2: Netlify CLI Interactive Login
```
Logging into your Netlify account...
Opening https://app.netlify.com/authorize...
```

**Source #1 confirms** this is expected behavior for unauthenticated CLI usage. Two solutions exist:
1. **`--allow-anonymous`** flag (no auth required, 1-hour claim window)
2. **`--auth $NETLIFY_AUTH_TOKEN`** (PAT from Netlify UI)

---

## Recommended Automation Strategy

### Tier 1: Anonymous Deploy (Zero Auth)
```bash
netlify deploy --allow-anonymous --dir=dist --prod --json
```
- **Pros**: No credentials needed; designed for AI agents (Source #1, #9)
- **Cons**: Site auto-deletes after 1 hour if unclaimed
- **Best for**: Temporary previews, rapid iteration

### Tier 2: PAT-Based Deploy (Persistent)
```bash
# One-time setup: generate PAT at https://app.netlify.com/user/applications
# Store as NETLIFY_AUTH_TOKEN environment variable
netlify deploy --auth $NETLIFY_AUTH_TOKEN --site=SITE_ID --dir=dist --prod --json
```
- **Pros**: Persistent site, full control, no interactivity (Sources #1, #2, #19, #20)
- **Cons**: Requires token generation (one-time)
- **Best for**: Production deployments

### Tier 3: Fallback Platforms
If Netlify API is unavailable:
1. **Surge.sh**: `npx surge dist --token $SURGE_TOKEN` (Source #28, #29)
2. **Vercel**: `npx vercel --yes --token=$VERCEL_TOKEN` (Source #25)
3. **Cloudflare Pages**: `npx wrangler pages deploy dist` (Source #26, #27)

---

## Workflow Integration

Per the harness protocol, deployment should be automated via:
1. **Script-based deployment** (`deploy.js`) with retry logic
2. **GitHub Actions workflow** for CI/CD automation
3. **Environment variable configuration** for tokens

This eliminates manual steps and 3rd-party tool failures.
