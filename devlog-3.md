# NoctOS Devlog 3 — Advanced Apps & Polish

**Date:** June 17, 2026
**Phase:** Calculator, Settings, Safari, Spotlight, Keyboard Shortcuts, New Features

## What was built

### Calculator
- 280×380px, not resizable — mimics macOS calculator
- Display: current expression (14px, secondary) + current value (36px, light)
- **4×5 button grid** with circular buttons (border-radius: 50%)
  - Row 1: AC, ±, % (grey function buttons)
  - Rows 2-4: digits + operators (blue accent)
  - Row 5: 0 (double-width), ., =
- **Full math logic**: chained operations, decimal, percentage, sign toggle
- Keyboard support: 0-9, +, -, *, /, Enter (=), Escape (AC), Backspace
- Button animations: hover brightness(1.2), active brightness(0.9) scale(0.96)

### Settings
- 680×460px with sidebar (200px) + panel
- **5 panels**:
  - **General**: Username input, Language, Timezone (auto-detected)
  - **Appearance**: 6 accent color swatches (blue, purple, pink, green, orange, red)
    - Clicking updates `--accent` CSS variable globally in real time
    - Also updates `--accent-glow`, `--accent-dim`, `--border-accent`
  - **Wallpaper**: 4 gradient thumbnails (Base, Nebula, Aurora, Midnight)
    - Clicking applies CSS gradient to desktop
  - **Dock**: Magnification toggle, icon size slider
  - **About**: macOS-style "About This Mac" panel
    - Crescent moon logo, NoctOS name, version
    - Chip, Memory, Storage, Display specs

### Safari
- 900×560px with tab bar, toolbar, favorites bar, content area
- **Tab system**: Create/close/switch tabs, active tab highlighted
- **URL bar**: Enter URL → loads in iframe with sandbox
- **Favorites bar**: GitHub, Linear, Vercel, Figma pills
- **Start page**: Centered search bar + 4 favorite icons
- iframe loading for external URLs

### Spotlight Search
- Triggered by Cmd+Space or search icon in menu bar
- 620px centered panel with backdrop blur
- Search input with magnifying glass icon
- **Results by category**: Applications, Files
- Click result → closes Spotlight, opens app
- Keyboard: Enter to select, Escape to close
- Real-time filtering as you type

### Keyboard Shortcuts
- `Cmd+Space` → Spotlight
- `Cmd+W` → Close focused window
- `Cmd+M` → Minimize focused window
- `Cmd+H` → Hide focused window (opacity 0)
- `Cmd+Tab` → App switcher overlay
  - Shows dock icons of open apps
  - Tab cycles focus, release opens selected
- `Escape` → Close Spotlight, context menus, Mission Control
- `Ctrl+Up` → Mission Control

## New Features (beyond the guide)

### Notification Center
- Bell icon in menu bar → slide-in panel from right (340px)
- **Weather widget**: Mock data (72°, Sunny, Cupertino)
- **System notifications**: Welcome message, system update, backup complete
- **Calendar section**: Today's date with event info
- Slide animation: `cubic-bezier(0.32,0.72,0,1)` for that macOS feel

### Mission Control
- `Ctrl+Up` → zoom out effect, tile all open windows
- Each window shown as a scaled tile with title
- Click a tile → closes Mission Control, focuses that window
- Background: `rgba(0,0,0,0.65)` with blur

### Screensaver
- After 90 seconds of idle (no mouse/keyboard activity)
- Full-screen black with large drifting clock text
- Time in 120px font, `rgba(255,255,255,0.15)` — subtle and elegant
- `animation: ss-drift` — slow floating movement
- Any mouse/keyboard input dismisses it immediately

### Dock Right-Click Context Menu
- Right-click any dock icon → context menu
- Options: Open, Hide, Quit
- Quit closes all windows for that app
- Styled with `var(--bg-elevated)`, blur, shadow

### Calendar Dropdown
- Click clock in menu bar → mini calendar
- Shows current month with navigation (‹ › arrows)
- Today highlighted with accent color
- Other month days shown in tertiary color

## Technical highlights
- All animations use only `transform` and `opacity` — no layout thrashing
- Calculator uses state machine pattern for operation chaining
- Notes debounced save prevents excessive localStorage writes
- Spotlight search uses simple string matching for instant results
- Settings accent color updates 4 CSS variables simultaneously

## What's in the final build
- Single `index.html`: 2425 lines
- Zero dependencies, zero frameworks
- Works in Chrome, Firefox, Safari
- Pure vanilla HTML + CSS + JavaScript

## Git history
1. `75272a2` — NoctOS v1.0 — macOS-inspired WebOS (2425 lines)

## Hackatime
- Project "noctOS" created via heartbeat API
- Time logged throughout build process
