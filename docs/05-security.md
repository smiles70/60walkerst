# 05-security.md — Security Documentation

## Authentication

| Aspect | Detail |
|--------|--------|
| Public sections | No authentication required |
| Management portal | Client-side PIN entry (6 digits) |
| PIN value | `606060` (hardcoded in `app/data/management.ts`) |
| PIN storage | `localStorage.setItem("mgmtAuth", "true")` |
| PIN validation | String comparison against hardcoded constant |
| Session persistence | Indefinite (localStorage) until `removeItem("mgmtAuth")` on logout |

## Security Concerns

| Issue | Severity | Location | Mitigation |
|-------|----------|----------|------------|
| Hardcoded PIN | High | `app/data/management.ts` | Move to environment variable or server-side validation |
| localStorage auth | Medium | `management-login.tsx` | Add session timeout, server-side validation if backend added |
| No CSP headers | Medium | `next.config.ts` | Add Content-Security-Policy headers |
| Credit report PII | High | `app/data/applicants.ts` | Remove or anonymize hardcoded financial data |
| No rate limiting on PIN attempts | Low | `management-login.tsx` | Add attempt counter + lockout |
| No encryption for PIN | Low | N/A | PIN is 6 digits; brute force trivial without rate limiting |

## Environment Variables

| Variable | Required | Used In | Purpose |
|----------|----------|---------|---------|
| NETLIFY_AUTH_TOKEN | No (CI only) | `.github/workflows/deploy.yml` | Netlify deployment auth |
| NETLIFY_SITE_ID | No (CI only) | `.github/workflows/deploy.yml` | Netlify site identifier |
| SURGE_LOGIN | No (optional) | `scripts/deploy.js` | Surge.sh auth |
| SURGE_TOKEN | No (optional) | `scripts/deploy.js` | Surge.sh token |
| VERCEL_TOKEN | No (optional) | `scripts/deploy.js` | Vercel auth |

<!-- updated: 2026-06-14 -->
