<div align="center">

# 🖥️ macOS Portfolio

### An interactive developer portfolio that reimagines a resume as a fully functional desktop operating system — and a native-feeling phone on mobile.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38)](https://github.com/pmndrs/zustand)

</div>

---

## ✨ Overview

This isn't a portfolio with a navbar and a few sections. It's a **living desktop**.

On a laptop, visitors land on a pixel-faithful **macOS desktop** — a translucent menu bar, a magnifying Dock, draggable windows, and a hero title that bends its letter weights as the cursor glides past. Every "app" is a window into the developer behind it: Finder browses real projects, Safari renders a GitHub-style repo list, Terminal prints the tech stack, and the Resume opens an actual PDF viewer.

On a phone, the same content transforms into a **native iOS experience** — a home screen with a status bar and app dock, full-screen app pages with a "Go Back" bar, and a Files-style folder browser with live breadcrumbs.

One codebase. Two operating systems. Zero compromise.

---

## 🎯 Highlights

- **Dual operating systems** — A macOS desktop and an iOS mobile experience driven by a single `useIsMobile` breakpoint switch, sharing all data and state.
- **Magnifying Dock** — A GSAP-powered Dock where icons scale and lift based on the cursor's exact distance, just like the real thing.
- **Variable-font hero** — The welcome title interpolates font weight per letter as the mouse moves, using CSS `font-variation-settings` driven by GSAP.
- **Draggable windows** — Every app is a free-floating, focusable, z-index-managed window powered by GSAP Draggable.
- **Real apps, real content:**
  - **Finder** — Browse projects, files, images, and links in a sidebar + canvas layout.
  - **Safari** — A GitHub-style "My repositories" view generated from your project data.
  - **Terminal** — Your tech stack rendered as a `show tech stack` command output.
  - **Resume** — A genuine in-browser PDF viewer (`react-pdf`) with download.
  - **Photos** — A masonry-style gallery with a full-screen image preview.
  - **Contact** — Social links as vibrant, tactile cards.
- **iOS mobile mode** — Status bar (live clock, notch, wifi/battery), home-screen app grid, frosted dock, full-screen pages, and a breadcrumb file browser.
- **Single source of truth** — All projects, files, links, and content live in one `constants` file. Update data once; both desktop and mobile update everywhere.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | [React 19](https://react.dev) |
| **Build Tool** | [Vite 8](https://vite.dev) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com) (CSS-first config via `@theme`, `@utility`, `@layer`) |
| **Animation** | [GSAP 3](https://gsap.com) + [`@gsap/react`](https://github.com/greensock/react) + Draggable |
| **State** | [Zustand 5](https://github.com/pmndrs/zustand) + [Immer](https://immerjs.github.io/immer/) middleware |
| **PDF** | [react-pdf](https://github.com/wojtekmaj/react-pdf) |
| **Icons** | [lucide-react](https://lucide.dev) |
| **Tooltips** | [react-tooltip](https://react-tooltip.com) |
| **Dates** | [Day.js](https://day.js.org) |
| **Utilities** | [clsx](https://github.com/lukeed/clsx) |

---

## 🏗️ Architecture

The app is built around three core ideas: **data-driven content**, **a global window manager**, and **a responsive split** between desktop and mobile renderers.

```
                         ┌──────────────────────────┐
                         │      constants/index      │
                         │  projects · dock · socials │
                         │  tech stack · locations    │
                         └─────────────┬─────────────┘
                                       │ (single source of truth)
                 ┌─────────────────────┼─────────────────────┐
                 ▼                     ▼                     ▼
        ┌────────────────┐   ┌──────────────────┐   ┌────────────────┐
        │  Zustand store  │   │   Window apps     │   │  useIsMobile   │
        │  window · loc   │◄──┤  Finder · Safari  │   │  (640px split) │
        └───────┬─────────┘   │  Terminal · ...   │   └───────┬────────┘
                │             └─────────┬─────────┘           │
                │                       │                     │
                ▼                       ▼                     ▼
        openWindow()          WindowWrapper (HOC)      Desktop ◄──► Mobile
        focusWindow()         ┌─────────────────────────────────────────┐
        closeWindow()         │  Desktop: draggable, z-indexed window     │
                              │  Mobile:  full-screen page + Go Back bar  │
                              └─────────────────────────────────────────┘
```

### Window Manager (`store/window.js`)
A Zustand store tracks every window's `isOpen` state and `zIndex`. Opening a window assigns it the next z-index (bringing it to front); focusing re-stacks it. Immer keeps the updates clean and immutable.

### The `WindowWrapper` HOC (`hoc/WindowWrapper.jsx`)
The heart of the dual-OS magic. Any app component wrapped by it automatically becomes:
- **On desktop** — a draggable, animated, focusable floating window.
- **On mobile** — a full-screen page with a sticky iOS-style status bar and "Go Back" header.

```jsx
const FinderWindow = WindowWrapper(Finder, "finder", { customMobileHeader: true });
const ContactWindow = WindowWrapper(Contact, "contact", { mobileTitle: "Contact" });
```

### Data-driven content (`constants/index.js`)
Projects are modeled as a nested file-system tree (`locations`). The same tree powers the Finder canvas (desktop), the Finder breadcrumb browser (mobile), **and** the Safari repository list — so adding a project in one place lights it up across the entire OS.

---

## 📂 Project Structure

```
mac-os-portfolio/
├── public/
│   ├── icons/                # SVG UI icons (wifi, github, work, ...)
│   ├── images/               # App icons, wallpaper, project shots, avatars
│   └── files/                # Downloadable resume PDF
├── src/
│   ├── components/           # Shared shell UI
│   │   ├── Navbar.jsx         # macOS menu bar (desktop)
│   │   ├── Welcome.jsx        # Variable-font animated hero (desktop)
│   │   ├── Dock.jsx           # Magnifying Dock (desktop)
│   │   ├── Home.jsx           # Desktop folder icons
│   │   ├── MobileHome.jsx     # iOS home screen (apps + dock)
│   │   ├── MobileTopBar.jsx   # "Go Back" + title bar (mobile)
│   │   ├── MobileStatusBar.jsx# Clock · notch · wifi · battery
│   │   └── WindowControls.jsx # Traffic-light buttons
│   ├── windows/              # The "apps"
│   │   ├── Finder.jsx         # File browser (desktop canvas + mobile breadcrumbs)
│   │   ├── Safari.jsx         # GitHub-style repo list
│   │   ├── Terminal.jsx       # Tech stack output
│   │   ├── Resume.jsx         # PDF viewer
│   │   ├── Photos.jsx         # Gallery
│   │   ├── Contact.jsx        # Social link cards
│   │   ├── Text.jsx           # .txt file viewer
│   │   └── Image.jsx          # Image preview
│   ├── store/                # Zustand state
│   │   ├── window.js          # Window open/focus/close + z-index
│   │   └── location.js        # Active Finder location
│   ├── hoc/
│   │   └── WindowWrapper.jsx  # Desktop window ⇄ mobile page adapter
│   ├── hooks/
│   │   └── useIsMobile.js     # 640px responsive switch
│   ├── constants/
│   │   └── index.js           # 🔑 All content lives here
│   ├── App.jsx               # Composition root
│   ├── main.jsx              # React entry
│   └── index.css             # Tailwind theme + all desktop/mobile styles
├── vite.config.js            # Plugins + import aliases
└── eslint.config.js
```

### Import Aliases
Configured in `vite.config.js` for clean, refactor-safe imports:

| Alias | Path |
|-------|------|
| `#components` | `src/components` |
| `#windows` | `src/windows` |
| `#store` | `src/store` |
| `#hooks` | `src/hooks` |
| `#hoc` | `src/hoc` |
| `#constants` | `src/constants` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and **npm**

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd mac-os-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open the local URL printed in your terminal (e.g. `http://localhost:5173`).

> 💡 **Tip:** To preview the mobile experience, open your browser's device toolbar and set the width below **640px**.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

---

## 🎨 Making It Yours

Almost everything is data-driven — you rarely need to touch component logic.

| What to change | Where |
|----------------|-------|
| Projects, files, links, images | `src/constants/index.js` → `WORK_LOCATION`, `ABOUT_LOCATION`, `RESUME_LOCATION`, `TRASH_LOCATION` |
| Dock & home-screen apps | `src/constants/index.js` → `dockApps` |
| Tech stack (Terminal) | `src/constants/index.js` → `techStack` |
| Social links (Contact) | `src/constants/index.js` → `socials` |
| Photo gallery | `src/constants/index.js` → `gallery` |
| Hero text | `src/components/Welcome.jsx` & `src/components/MobileHome.jsx` |
| Wallpaper & app icons | `public/images/` |
| Resume PDF | `public/files/` (and the path in `src/windows/Resume.jsx`) |

### Which apps appear where on mobile?
In `src/components/MobileHome.jsx`:
- `DOCK_APP_IDS` — the apps pinned to the bottom dock.
- `HOME_APP_IDS` — the apps shown on the home screen grid.

---

## 📱 Responsive Behavior

The single breakpoint is **640px** (Tailwind's `sm`), governed by `useIsMobile`.

| Feature | 🖥️ Desktop (≥ 640px) | 📱 Mobile (< 640px) |
|---------|----------------------|---------------------|
| Shell | macOS menu bar + Dock + folder icons | iOS status bar + app grid + frosted dock |
| Windows | Draggable, stacked, z-indexed | Full-screen pages with a "Go Back" bar |
| Finder | Sidebar + free-positioned icons | Folder grid with live breadcrumbs |
| Safari | Multi-column GitHub repo cards | Stacked, mobile-tuned repo cards |
| Terminal | Tabular category/tech layout | Collapsible category list |
| Contact | Horizontal social cards | Full-width stacked cards |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open an issue or submit a pull request.

---

<div align="center">

**Built with React, GSAP, and an unreasonable amount of attention to detail.**

⭐ If this project inspired you, consider giving it a star.

</div>
