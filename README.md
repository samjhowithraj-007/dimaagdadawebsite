# Dimaag Dada website (www.dimaagdada.com)
Static single-page site and installable app (PWA). Deployed by GitHub Actions to GitHub Pages.
Edit `index.html`, bump `VERSION` in `sw.js`, run `node ~/.claude/skills/website-app/scripts/check-inline-js.mjs index.html`, then push.
Any new top-level file must also be added to the `cp -r` line in `.github/workflows/pages.yml`.
