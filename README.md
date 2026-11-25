# Dimaag Dada website (www.dimaagdada.com)
Static single-page site and installable app (PWA). Deployed by GitHub Actions to GitHub Pages.
Edit `index.html`, bump `VERSION` in `sw.js`, run `node ~/.claude/skills/website-app/scripts/check-inline-js.mjs index.html`, then push.
Any new top-level file must also be added to the `cp -r` line in `.github/workflows/pages.yml`.

## Deploy rules
1. Push once per change. Do not push again while a deploy is running; wait for it to finish (runs queue, they are not cancelled).
2. If a deploy fails with "Deployment failed, try again later", use "Re-run failed jobs" on the run (it re-runs only the deploy job). Do not push an empty commit.
3. After a deploy, check the live file (for example `sw.js` VERSION) before telling anyone it is live.
