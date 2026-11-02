# EPSTAR v25 — fluid Home / Arabic hierarchy

Apply this overlay to the repository with v24 already installed. Copy matching paths into the repository root and replace those files; do not create a second project. No database migration or environment change is required.

Commit suggestion: `Improve fluid homepage layout and Arabic text hierarchy`

Changes: responsive side gutters instead of capped Home containers; fluid request form and managed blocks; two simpler path cards; existing guidance available through an expandable question; Arabic heading spacing/weight; proportional product/solution visuals; balanced footer and LTR contact values. All saved content keys, paths, section ordering/visibility, draft and publish logic are retained.

The Home editor explains which helper fields appear inside the expandable guidance. No content needs to be re-entered.

Local build and automated tests passed. Final populated visual review was blocked by the preview browser's URL policy after restart, so it is NOT certified complete. Full PEQG is not PASS.

After Commit/Push and successful existing Cloudflare deployment, test:

1. Hard refresh Home at phone, tablet and wide desktop widths; verify all sections share consistent side gutters and no horizontal scrollbar.
2. Check AR/FR/EN in light and dark modes, especially long Arabic headings and path descriptions.
3. Expand/collapse the question above the paths using mouse and keyboard. Verify both path links.
4. Check actual products, logos and projects; image proportions, captions and paragraph lengths.
5. Check request form, testimonial, footer navigation, phone and email direction. No request submission is necessary for layout checks.
6. Check any custom Home blocks. Existing saved translations, ordering and visibility must remain intact.

Rollback: revert the v25 commit in GitHub Desktop and push through the same deployment workflow. No data rollback is required because v25 makes no database writes.
