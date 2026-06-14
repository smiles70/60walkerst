# 04-tech.md — Technical Documentation

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.1.0 | Framework (App Router, static export) |
| react | 19.0.0 | UI library |
| react-dom | 19.0.0 | React DOM renderer |
| tailwindcss | 4.0.0 | Utility-first CSS framework |
| @tailwindcss/postcss | 4.0.0 | PostCSS plugin for Tailwind v4 |
| clsx | 2.1.1 | Conditional class joining |
| tailwind-merge | 3.0.1 | Merge Tailwind classes without conflicts |
| class-variance-authority | 0.7.1 | Component variant management |
| typescript | 5.7.3 | Type system |
| @types/react | 19.0.0 | React type definitions |
| @types/react-dom | 19.0.0 | React DOM type definitions |
| @types/jest | 29.5.14 | Jest type definitions |
| @types/node | 22.10.5 | Node.js type definitions |
| jest | 30.4.2 | Test runner |
| ts-jest | 30.0.4 | TypeScript preprocessor for Jest |
| @testing-library/react | 16.2.0 | React Testing Library |
| @testing-library/jest-dom | 6.6.3 | Custom Jest matchers for DOM |
| @testing-library/user-event | 14.6.0 | User event simulation |
| identity-obj-proxy | 3.0.0 | CSS mock for Jest |
| eslint | 9.19.0 | Linting |
| @eslint/js | 9.19.0 | ESLint JavaScript plugin |
| eslint-plugin-react | 7.37.4 | React ESLint rules |
| eslint-plugin-jsx-a11y | 6.10.2 | Accessibility ESLint rules |
| netlify-cli | 18.1.0 | Netlify deployment CLI |

## Build Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Static export to `dist/` |
| `npm start` | Serve `dist/` locally |
| `npm test` | Run Jest tests |
| `npm run lint` | ESLint check |
| `npm run deploy` | Multi-strategy deploy (Netlify/Surge/Vercel) |
| `npm run deploy:anonymous` | Anonymous Netlify deploy |

## Key Configuration Files

| File | Purpose |
|------|---------|
| `next.config.ts` | Static export config (`output: 'export'`, `distDir: 'dist'`) |
| `tsconfig.json` | TypeScript strict mode, path aliases (`@/*`) |
| `jest.config.ts` | Jest + ts-jest + jsdom + module aliases |
| `netlify.toml` | Publish directory: `dist` |
| `.github/workflows/deploy.yml` | CI/CD: test -> build -> deploy to Netlify |

## Path Aliases

```
@/* -> ./*
```

<!-- updated: 2026-06-14 -->
