# NoctOS Devlog 1 — Foundation

**Date:** June 17, 2026
**Phase:** Boot screen, Menu bar, Desktop, Dock, Window System

## What was built

### Boot Sequence
Implemented a 4-phase boot animation:
1. Crescent moon SVG logo fades in (1.2s)
2. "NoctOS" text appears below (0.8s)
3. Progress bar fills from 0% to 100% (0.6s)
4. Entire screen fades out, desktop fades in (0.4s)

The boot uses CSS transitions and `setTimeout` chains — no libraries needed.

### Menu Bar
- Fixed 28px top bar with `backdrop-filter: blur(24px)` for that frosted glass look
- Left side: NoctOS logo, active app name, File/Edit/View/Window/Help dropdowns
- Right side: Battery (87%), WiFi, Volume, live clock (updates every second), Search icon
- Clock format: "Wed Jun 17 1:21 PM"
- Dropdowns styled with `var(--bg-elevated)` and shadow

### Desktop
- Full viewport between menu bar and dock
- 3 desktop icons: Macintosh HD, Projects, README.txt (80px grid, top-left)
- Right-click context menu: New Note, New Folder, Change Wallpaper, About NoctOS
- Wallpaper cycling: Base → Nebula → Aurora → Midnight → back to Base

### Dock
- Pill container, bottom-center, with `backdrop-filter: blur(48px)`
- 7 app icons with colored SVG illustrations (not grey boxes!)
- **Magnification effect**: `scale = 1 + (maxScale - 1) * Math.max(0, 1 - distance / radius)`
  - maxScale: 1.6, radius: 100px
  - Smooth CSS transitions, feels physically satisfying
- Hover labels appear above icons
- Running indicator (2px dot) below open apps
- Bounce animation on double-click of focused app
- Right-click context menu: Open, Hide, Quit

### Window System
- Window creation with title bar, traffic lights, content area, resize handle
- **Drag**: mousedown on titlebar → track mousemove → smooth repositioning
- **Snap zones**: Drag to top edge (fullscreen), left edge (left half), right edge (right half)
  - Ghost preview with `var(--accent-glow)` background
- **Traffic lights**: Red (close), Yellow (minimize), Green (fullscreen)
  - Icons appear on hover: × − ⤢
- **Z-index management**: Base 100, increment on focus, cap 9990
- **Animations**: Open (scale 0.95→1, 180ms), Close (120ms), Minimize (200ms)
- Resize handle in bottom-right corner

## Technical highlights
- Pure CSS custom properties for the entire design system
- `will-change: transform` on window elements for GPU acceleration
- `requestAnimationFrame`-compatible dock magnification
- All animations use `transform` and `opacity` only (no layout thrashing)

## Challenges
- Getting the dock magnification to feel right took iteration — the radius and maxScale values matter a lot
- Snap zone detection needed careful mouse position tracking during drag
- Traffic light hover icons need to work on both hover and non-hover states

## Next
Core apps: Finder, Terminal, Notes
