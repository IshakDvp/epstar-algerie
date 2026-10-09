# Upload this version to GitHub

1. Open the `epstar-algerie` repository on GitHub.
2. Choose **Add file** then **Upload files**.
3. Drag every file and folder from this extracted folder into the repository root.
4. Confirm that `EPSTAR-LATEST-VERSION.md` appears in the uploaded file list.
5. Commit to the `main` branch.
6. In Cloudflare, wait for the build triggered by that commit. Use **Retry build** only if no new build appears.

Cloudflare build settings:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

The `wrangler.jsonc` file already contains `nodejs_compat`. Do not add that flag in Cloudflare settings.
