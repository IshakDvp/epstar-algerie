# EPSTAR Cloudflare deployment

## First upload to GitHub

1. Extract this ZIP file.
2. Open the extracted folder, select all contents (including hidden files if present), then upload them to the `epstar-algerie` GitHub repository.
3. Replace files with the same names and commit to the `main` branch.

## Cloudflare Workers build settings

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`
- Production branch: `main`

## Every future update

1. Edit the project locally.
2. Run `npm run build` and confirm that it completes.
3. Push the changed files to GitHub main.
4. Cloudflare deploys the new version automatically.

Do not add `nodejs_compat` anywhere in Cloudflare settings: it is already set once in `wrangler.jsonc`.
