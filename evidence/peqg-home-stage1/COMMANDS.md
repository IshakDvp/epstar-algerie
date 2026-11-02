# Reproduction / 2026-11-02

Linux managed local checkout /workspace/scratch/b8c9077386e2/peqg-source/epstar-algerie-main; Node24.22.1, npm11.9.0. Synthetic SQLite only for integration tests. Local browser R2/D1 fixture data only; no remote DB/mail.

1. Restore epstar-algerie-main.zip then v2 through v28 in numeric order. Preserve original Vite/hosting config.
2. `npm run install:ci` exit0. An early build/preview attempt occurred while installer was still running (exit69 / vite missing); retry only after installation succeeded. This was setup timing, not source regression.
3. `npm run build` exit0; `node --test tests/*.test.mjs` baseline73/73. Logs baseline-build.log/baseline-tests.log.
4. Add tests/auth-single-use.test.mjs; `node --test tests/auth-single-use.test.mjs` before fix exit1, results302/302 rather than302/401 (auth-before.log).
5. Apply atomic claim and header dismissal. Initial header cleanup test exposed boolean EventTarget capture-removal issue; shared capture options fixed it. Final targeted tests pass.
6. `npm run build` exit0 after final edits (final-build.log); `node --test tests/*.test.mjs` exit0,76/76,0skips (final-tests.log). These include SSR locale/theme/no-draft/no-late-feed snapshots and Home CAS/order tests.
7. `npm audit --json` exit1, report dependency-audit.json.43 vulnerable entries, not43 proven deployed exploits. Review applicability and compatible upgrade paths.
8. `node node_modules/typescript/bin/tsc --noEmit` exit2,27 diagnostics, typescript.log. Build passing does not resolve them.
9. `sites-preview start <checkout>` -> http://terminal.local:4173/. Browser-only QA via CUA; isolated migrations0000/0001 and4product/3project/2logo fixtures, images via Wrangler r2 --local only. Temporary QA iframe page removed before final build. Browser results/limits in PEQG_HOME_STAGE1.md. No screenshot files included.

Checksums of preserved files:

- package-lock.json 283dbdf55081ff6e460baff80764f39f722f13a0720e1a5fa13153ea877051a5
- app/page.tsx 40364f252073cab507407f8677f95122e003388ef943232bc9596e6222b5414f
- app/home-layout.css 67c3477334dc76ac7b6ee8e8e83748d524372c204f21e2f02b2ec9c506f02dbd
- app/components/theme-provider.tsx 5b98ef724bd1acfa2d1f8d346843d4e5a11ba6f56ae414813e9d5b12a1882d61

Before-v29 backup ZIP includes the2 modified existing code files and4 required continuity/evidence docs. It is not a production D1/R2 backup or restore drill.
