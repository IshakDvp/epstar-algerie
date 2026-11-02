# EPSTAR v28 — Home section order and matching dashboard

Overlay for installed v27. Replace matching repository files, then Commit/Push through the established workflow. No new project, environment variable or DB migration required.

Commit: `Align homepage section order and dashboard editors`

Agreed order: Hero -> Trust -> Solutions -> Products -> Projects -> About -> Process -> Clients -> Testimonial -> Quote -> Final CTA -> Footer. Extra managed Home blocks keep their existing tail placement.

Existing exact factory order is upgraded on read automatically without touching stored copy/images. Team-customized order is preserved. For that case: Dashboard -> Pages -> Home -> Order and visibility -> Apply agreed section order -> Preview/Publish after reviewing. The button changes only section order, not texts/images/visibility. Normal save/publish and conflict checks remain.

Numbered section editors now follow the same order as the site and order list. Shared solution slide copy/models are edited under Hero; products/projects/logos stay in their dedicated managers. Client-section Arabic copy and All projects label now read actual CMS fields.

Build PASS;73/73 automated tests PASS. Browser/production visual acceptance NOT VERIFIED; full PEQG not PASS.

Verify after deployment:

1. Home section order and Solutions menu anchor in AR/FR/EN.
2. Numbered editor sections match public order; hidden sections remain marked.
3. If customized order persists, use Apply agreed section order and review before publishing.
4. Reorder one section in a draft, save and preview: public site must retain published content until Publish.
5. Confirm existing texts/images/hidden choices remain; confirm published order can still be changed normally.

Rollback: revert commit. Read-only upgrade made no DB writes. If you subsequently saved/published a new order, restore the previous desired order in the editor and publish; code rollback does not undo saved content choices.
