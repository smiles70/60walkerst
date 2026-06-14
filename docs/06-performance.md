# 06-performance.md — Performance Documentation

## Status

**No baseline initialized yet.** Run `/perf-baseline` after the first working build.

## Performance Baseline Init Checklist

- [ ] Run `npm run build`
- [ ] Serve `dist/` locally
- [ ] Run Lighthouse CI (`npx lhci autorun`)
- [ ] Record scores to `.lighthouserc.json`
- [ ] Record scores below as baseline entry

## Baseline Entry Template

```markdown
## Performance Baseline — [date]
Initialized by: Performance Agent / /perf-baseline
Build: [git sha]

### Lighthouse Scores
| Metric | Score | Floor (-5pts) |
|--------|-------|---------------|
| Performance | 00 | 00 |
| Accessibility | 00 | 00 |
| Best Practices | 00 | 00 |
| SEO | 00 | 00 |

### Core Web Vitals
| Metric | Value | Threshold |
|--------|-------|-----------|
| FCP | 0.0s | 2.0s |
| LCP | 0.0s | 3.0s |
| TBT | 0ms | 300ms |
| CLS | 0.00 | 0.1 |

### Bundle Sizes
| Chunk | Size | Budget |
|-------|------|--------|
| main.js | 0kb | 200kb |

### Notes
[Any known issues or planned improvements at time of baseline]
```

<!-- updated: 2026-06-14 -->
