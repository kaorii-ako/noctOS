# NoctOS Devlog 2 — Core Apps

**Date:** June 17, 2026
**Phase:** Finder, Terminal, Notes

## What was built

### Finder
- 760×480px window with sidebar (200px) + content area
- Sidebar sections: Favorites (Desktop, Downloads, Documents), Devices (Macintosh HD)
- **Grid view** (default): 4-column grid, 80px icons with labels
- **List view**: Columns (Name, Date Modified, Size, Kind), alternating row colors
- Breadcrumb navigation: "Macintosh HD › Projects › noctOS"
- Back/Forward buttons with history tracking
- **2+ levels deep** fake file system:
  ```
  Macintosh HD/
  ├── Desktop/README.txt
  ├── Downloads/screenshot.png, design-v2.fig
  ├── Documents/notes.txt, project-alpha/{index.html, style.css, app.js}
  ├── Projects/noctOS/index.html, website/{index.html, main.css}
  └── Applications/Safari.app, Terminal.app
  ```
- Double-click folders to navigate, sidebar clicks to jump

### Terminal
- 600×400px with dark background (#0d0d14) for depth
- Colored prompt: `noctos@system ~ %` (blue user, light path, grey char)
- **15+ built-in commands**:
  - `help` — formatted command table
  - `ls` / `ls -la` — colored output (blue=dirs, white=files, detailed with permissions)
  - `cd [dir]` / `cd ..` — directory navigation with prompt updates
  - `pwd` — print working directory
  - `whoami` — "noctos-user"
  - `date` — real current date/time
  - `echo [msg]` — echo message
  - `clear` — clear terminal
  - `history` — last N commands
  - `open [app]` — open Finder/Safari/Notes/Calculator
  - `neofetch` — ASCII art crescent moon + system info
  - `cat [file]` — show fake file contents
  - `rm [file]` — "Permission denied. (just kidding)"
  - `sudo` — "Nice try."
  - `exit` — close terminal
- Tab autocomplete for unique command matches
- Up/Down arrow keys cycle command history
- Custom scrollbar (4px, transparent track)

### Notes
- 680×480px with sidebar (220px) + editor
- Sidebar: search input, + button, scrollable note list
- Each note shows: title, preview (60 chars), date
- Active note: `var(--bg-active)` background, blue left border
- **Editor**: contenteditable div with toolbar (Bold, Italic, Underline, HR, Bullet List)
- Title input (22px, font-weight 600)
- **Auto-save**: Debounced 800ms after last keystroke
  - "Saved" pill appears briefly (green dot + text, fades 1.5s)
- **localStorage persistence**: Key `noctos_notes`, saves `{id, title, content, updatedAt}`
- **3 pre-loaded notes**:
  1. "NoctOS Features" — feature list
  2. "Project Ideas" — brainstorm
  3. "Getting Started" — welcome guide

## Technical highlights
- Terminal uses a fake virtual filesystem (nested object structure)
- Notes auto-save uses `clearTimeout`/`setTimeout` debounce pattern
- Finder navigation maintains a history stack for back/forward
- All file icons are hand-crafted SVGs with color

## Challenges
- Terminal command parsing needed careful handling of quoted strings and edge cases
- Contenteditable in Notes is notoriously inconsistent — had to use `document.execCommand` for formatting
- Finder breadcrumb navigation required tracking both path and history index separately

## Next
Advanced apps: Calculator, Settings, Safari, Spotlight, keyboard shortcuts
