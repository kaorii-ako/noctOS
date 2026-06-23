# ◗ NoctOS

A fully functional macOS-inspired Web Operating System built with pure vanilla HTML, CSS, and JavaScript. Zero dependencies. Zero frameworks.

**[Launch NoctOS →](https://noctos-koii.vercel.app/os)**

![NoctOS Banner](https://img.shields.io/badge/NoctOS-v1.0-3b82f6?style=for-the-badge&labelColor=0a0a0f) ![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge&labelColor=0a0a0f) ![Status](https://img.shields.io/badge/Status-Complete-28c840?style=for-the-badge&labelColor=0a0a0f)

---

## What is NoctOS?

NoctOS is a web-based operating system that runs entirely in your browser. It features a complete desktop environment with draggable windows, a working terminal, file system navigation, and built-in applications, all in a single HTML file.

## Features

### Desktop Environment
- **Window System** -- Drag, resize, minimize, maximize, and snap windows with traffic light controls
- **Dock** -- macOS-style dock with magnification effect and bounce animations
- **Menu Bar** -- Live clock, dropdown menus, system tray with battery, WiFi, and volume
- **Desktop Icons** -- Double-click to open apps, right-click for context menu
- **Wallpapers** -- 6 built-in wallpapers (Base, Nebula, Aurora, Midnight, Sunset, Ocean)

### Built-in Applications

| App | Description |
|-----|-------------|
| **Finder** | Navigate nested file systems with grid/list views, breadcrumbs, and sidebar |
| **Terminal** | 15+ commands including `neofetch`, `ls`, `cd`, `cat`, tab autocomplete |
| **Notes** | Rich text editing with auto-save to localStorage |
| **Calculator** | Full math logic with keyboard support |
| **Settings** | Live accent color picker, wallpaper switching, dock customization |
| **Safari** | Tab-based browser with loading indicators, bookmarks, and Google search |

### System Features
- **Spotlight Search** -- `Cmd+Space` to search apps and files
- **Notification Center** -- Weather, calendar, and system notifications
- **Mission Control** -- `Ctrl+Up` to tile all open windows
- **Screensaver** -- Floating clock after 90 seconds of idle
- **Keyboard Shortcuts** -- `Cmd+W`, `Cmd+M`, `Cmd+H`, `Cmd+Tab`

## Getting Started

### Prerequisites
- Node.js 18+ (for the Express server)
- npm

### Installation

```bash
git clone https://github.com/kaorii-ako/noctOS.git
cd noctOS
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page, or [http://localhost:3000/os](http://localhost:3000/os) to launch the OS.

### Deploy to Vercel

1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Deploy, no configuration needed

## Tech Stack

- **Frontend** -- Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Backend** -- Node.js + Express
- **Styling** -- CSS Custom Properties, Grid, Flexbox, Animations
- **Storage** -- localStorage for notes persistence
- **Dependencies** -- Zero (only Express for the server)

## Project Structure

```
noctOS/
├── server.js              # Express backend
├── package.json
├── vercel.json            # Vercel deployment config
├── index.html             # Full OS (all-in-one)
├── public/
│   ├── index.html         # Landing page
│   ├── os.html            # NoctOS web OS
│   ├── css/style.css      # Landing page styles
│   └── js/main.js         # Particles, animations
└── devlog-*.md            # Development logs
```

## Terminal Commands

```
help       Show all commands
ls         List directory contents
ls -la     List with details
cd [dir]   Change directory
pwd        Print working directory
whoami     Show current user
date       Show current date/time
echo [msg] Print message
clear      Clear terminal
history    Show command history
open [app] Open an application
neofetch   Show system info
cat [file] Show file contents
rm [file]  Remove file (simulated)
sudo       "Nice try."
exit       Close terminal
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+Space` | Open Spotlight |
| `Cmd+W` | Close window |
| `Cmd+M` | Minimize window |
| `Cmd+H` | Hide window |
| `Cmd+Tab` | App switcher |
| `Ctrl+Up` | Mission Control |
| `Escape` | Close overlays |

## AI Usage

AI tools were used sparingly during development for:

- **Code completion** -- Assisted with writing repetitive UI components and boilerplate
- **Asset generation** -- Helped generate SVG icons and CSS animations
- **Debugging** -- Used for identifying and fixing edge cases in event handlers

## Development

```bash
npm run dev    # Start development server
```

## License

MIT © [kaorii-ako](https://github.com/kaorii-ako)

---

Built with love and vanilla JavaScript
