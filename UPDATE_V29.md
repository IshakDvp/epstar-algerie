# v29 — PEQG Home stage1 (NOT release approval)

Overlay for installed v28. Contains two bounded fixes: atomic single-use magic-link claim; accessible mobile disclosure dismissal. Existing Home/menu structure unchanged. No database migration, dependency upgrade or production operation.

Commit: `Start homepage PEQG audit and harden login and mobile navigation`

Review PEQG_HOME_STAGE1.md BEFORE treating the project as launch-ready. Build and76 tests pass, but dependency audit and reliability gates do not. Critical package alert applicability must be resolved; email failures, quote repeat-operation behavior, backups/restore and full real-device/admin E2E remain open.

The short Home/menu proposal is documented, not applied without agreement. Continuity docs and reproducible logs are included.

Use existing Commit/Push workflow for reviewed code changes, not a new project. This ZIP does not certify a production deployment. Do not post tokens/credentials in test screenshots.

After installation verify mobile menu open/outside/Escape/resize and normal parent/child navigation. For login verification use a newly requested link normally; do not repeatedly share the link. Operator should validate mail delivery and monitor failures in the subsequent stage.
