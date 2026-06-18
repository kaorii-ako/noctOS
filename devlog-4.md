# NoctOS Devlog — Session 4

**Date:** June 18, 2026
**Duration:** ~5 minutes
**Focus:** Safari browser improvements & bug fixes

## What I Worked On

### Safari Browser Overhaul
- Completely rewrote the Safari app to be more realistic and functional
- Added loading bar animation that shows when pages are loading
- Added HTTPS lock icon in the URL bar for secure sites
- Added "blocked page" fallback when sites refuse iframe connections (most modern sites do this)
- Added "Open in Real Browser" button as a fallback
- Added bookmark system with ability to add new bookmarks
- Added share button that copies URL to clipboard
- Improved start page with:
  - Favorites section with site icons
  - "Frequently Visited" section with popular dev sites
  - Logo and section headers
- URL bar now auto-selects text on focus for easy editing
- Search queries now go through Google (anything without a TLD)
- Tab titles update when pages load

### Bug Fixes
1. **Duplicate Spotlight object** — Two Spotlight definitions existed; removed the duplicate
2. **Calculator expression bug** — Curly braces appeared in operator display; fixed to show proper symbols
3. **Notes search broken** — Search input had no event handler; added filtering
4. **`ls -la` HTML rendering** — Used wrong print function; fixed to use `printHTML()`
5. **Dock "Hide" button** — Called `open()` instead of minimize; fixed
6. **Safari navigation** — Used browser history instead of per-tab history; added proper back/forward
7. **Safari disabled buttons** — Added CSS for disabled state

## Files Modified
- `index.html` — Main application file
- `public/os.html` — Synced copy for server
- `devlog-4.md` — This entry

## Notes
- Most modern websites (GitHub, Vercel, etc.) block iframe embedding via X-Frame-Options headers
- The Safari app now handles this gracefully with a fallback page
- Users can click "Open in Real Browser" to visit the actual site
- Hackatime time tracking is now configured and working
