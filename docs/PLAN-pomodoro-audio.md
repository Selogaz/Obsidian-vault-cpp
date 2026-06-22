---
updated: 2026-06-21T23:17:51+03:00
---

# PLAN: Pomodoro Audio Player (Web/PWA)

## Goal

Web-based (PWA) app: user picks any local audio file → plays during Pomodoro work intervals, stops during breaks. Fully customisable work/break durations. Works offline after first visit.

## Tech Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Shell | Vite + React | Fast dev, PWA plugin |
| UI | React (pure CSS) | Timer UI, no design system needed |
| Audio | `<audio>` + Blob URL | File picked via `<input type="file">`, played as ObjectURL |
| Storage | localStorage | Settings persistence (durations, session count) |
| PWA | vite-plugin-pwa | Offline via service worker (caches app shell on first visit) |
| Hosting | Any static (Vercel/Netlify/Cloudflare Pages) | No server needed |

## Features

| Priority | Feature | Description |
|----------|---------|-------------|
| P0 | Timer core | Work/break countdown MM:SS with configurable durations |
| P0 | Audio playback | Play user's file during work, stop on break |
| P0 | File picker | `<input type="file" accept="audio/*">` |
| P0 | Duration controls | +/- buttons for work and break (1-min step, min 1, max 120) |
| P1 | Start/Pause/Reset | Control timer state |
| P1 | Session counter | Tracks completed Pomodoros |
| P1 | Settings persistence | Save durations in localStorage, restore on reload |
| P1 | PWA offline | Service worker caches app; works without internet |
| P2 | Desktop notifications | Alert on session switch (when tab not focused) |
| P2 | Keyboard shortcuts | Space = start/pause, R = reset |

## File Structure

```
pomodoro-audio/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.json
│   └── icons/
│       └── icon-512.png
├── src/
│   ├── main.jsx          # React entry
│   ├── App.jsx           # Root component
│   ├── App.css           # Global styles
│   ├── components/
│   │   ├── Timer.jsx     # MM:SS display + state machine
│   │   ├── Timer.css
│   │   ├── Controls.jsx  # Start/Pause/Reset buttons
│   │   ├── Controls.css
│   │   ├── DurationPicker.jsx  # +/- for work & break
│   │   ├── DurationPicker.css
│   │   ├── AudioPicker.jsx     # File input + playback
│   │   ├── AudioPicker.css
│   │   └── SessionCounter.jsx  # Pomodoros completed
│   └── hooks/
│       ├── useTimer.js   # Timer logic (custom hook)
│       ├── useAudio.js   # Audio file handling
│       └── useSettings.js # localStorage
```

## Component Tree

```
<App>
├── <DurationPicker work={25} break={5} onChange={...} />
├── <Timer seconds={1500} status={...} />
├── <Controls onStart onPause onReset />
├── <AudioPicker file={...} onFileChange={...} />
└── <SessionCounter count={3} />
```

## Data Flow

1. User picks audio file → `useAudio` creates `URL.createObjectURL(file)` → stored in state
2. User adjusts durations → `useSettings` saves to `localStorage`
3. User clicks Start → `useTimer` begins countdown → `useAudio` kicks off playback
4. Timer hits 0 → switch work↔break (audio stops on break start, resumes on work start)
5. Session counter increments on each work→break transition
6. On reload → `useSettings` restores durations from `localStorage`; file must be re-picked (browser security — cannot persist file handles automatically in all browsers)

## Task Breakdown

### Task 1: Scaffold Vite + React + PWA

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Empty directory |
| OUTPUT | `npm run dev` opens React app in browser |
| VERIFY | Browser shows "Hello" text |

Steps:
- `npm create vite@latest pomodoro-audio -- --template react`
- Install `vite-plugin-pwa`
- Add `pwa` config to `vite.config.js` (auto-update strategy)
- Create `public/manifest.json` with app name, icons, theme color
- Verify offline: DevTools → Application → Service Workers → "Offline" checkbox → page still loads

---

### Task 2: Timer logic (useTimer hook)

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 1 scaffold |
| OUTPUT | `useTimer` hook with state machine |
| VERIFY | Storybook or inline test: `start()` → counts down, `pause()` → stops, `reset()` → back to full |

State machine: `IDLE → RUNNING → PAUSED ⇄ RUNNING → COMPLETE → IDLE`
- Default work: 1500s (25 min), default break: 300s (5 min)
- Returns: `{ seconds, status, phase, start, pause, reset, workDuration, breakDuration, setWorkDuration, setBreakDuration }`

---

### Task 3: Timer UI components

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 2 (useTimer hook) |
| OUTPUT | Timer + Controls + DurationPicker components |
| VERIFY | Click Start → MM:SS counts down; Pause stops; Reset resets; +/- buttons change durations (disabled while running) |

Components:
- `Timer.jsx` — displays `MM:SS` centered, large font
- `Controls.jsx` — Start/Pause/Reset buttons
- `DurationPicker.jsx` — two rows (Work / Break) with `[−] MM:SS [+]` (step 1 min, min 1, max 120)

---

### Task 4: Audio picker & playback

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 3 (working timer) |
| OUTPUT | User picks audio → plays during work, stops on break |
| VERIFY | Pick file → start timer → audio plays; break starts → audio pauses; next work → resumes |

Details:
- `<input type="file" accept="audio/*">` — styled as a button
- `URL.createObjectURL(file)` → `<audio>` element
- `useAudio` hook: `{ play(), pause(), stop(), fileName, isPlaying }`
- Wire to `useTimer`: on work start → `play()`, on break start → `pause()`

Browser limitation: file must be re-picked after page reload (no persistent file access without File System Access API which is Chromium-only).

---

### Task 5: Session counter + UI polish + PWA

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 4 (timer + audio) |
| OUTPUT | Session counter, clean layout, installable PWA |
| VERIFY | Complete a session → counter increments; install prompt appears; offline reload works |

Details:
- `SessionCounter.jsx` — "Pomodoros: N" with optional flame icon
- Phase indicator: "Work" / "Break" label changes color
- PWA: verify `beforeinstallprompt` event, service worker caches all assets
- Responsive layout (mobile-friendly since it's web)

---

### Task 6: Settings persistence (localStorage)

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 5 (working app) |
| OUTPUT | Durations restored on reload |
| VERIFY | Change durations → refresh page → same durations shown |

Details:
- `useSettings` hook: saves/loads `{ workDuration, breakDuration, sessionCount }` to `localStorage`
- Auto-save on any change (debounced)
- No file path persistence (browser security)

---

### Task 7: Desktop notifications (optional)

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 6 |
| OUTPUT | Notification when tab is backgrounded on session switch |
| VERIFY | Switch to another tab → wait for session end → notification appears |

Details:
- `Notification API` — `new Notification("Work session over!")`
- Request permission on first start
- Only fires when `document.hidden === true`

---

### Task 8: Polish & deploy

**Agent:** frontend-specialist

| Field | Value |
|-------|-------|
| INPUT | Task 6 or 7 |
| OUTPUT | Production build + deployed |

Steps:
- `npm run build` → `dist/`
- Favicon, meta tags (og:, twitter:)
- Deploy to Vercel / Netlify / Cloudflare Pages (zero config)

## Dependency Graph

```
Task 1 (Scaffold Vite + React + PWA)
  └── Task 2 (useTimer hook)
       └── Task 3 (Timer UI components)
            └── Task 4 (Audio picker & playback)
                 └── Task 5 (Session counter + UI + PWA polish)
                      └── Task 6 (Settings persistence)
                           └── Task 7 (Notifications) [optional]
                                └── Task 8 (Polish & deploy)
```

## Agent Assignments

| Task | Agent | Why |
|------|-------|-----|
| 1-8 | `frontend-specialist` | Entirely frontend — no backend needed |

## Verification Checklist

- [ ] `npm run dev` opens app, shows timer UI
- [ ] Timer counts down MM:SS, switches work↔break automatically
- [ ] +/- buttons adjust durations (min 1, max 120, disabled while running)
- [ ] File picker opens, selected audio plays during work, stops on break
- [ ] Session counter increments each work→break cycle
- [ ] Change durations → refresh → values restored
- [ ] PWA: App installable, works offline after first visit
- [ ] No console errors
- [ ] `npm run build` produces working `dist/`
- [ ] Deployed to static host (optional)

## Notes

- No backend. Everything is client-side.
- Audio file must be re-picked after page refresh (standard browser security). The `showDirectoryPicker` + File System Access API is Chromium-only and not reliable cross-browser, so skip it.
- PWA service worker uses "generateSW" strategy from `vite-plugin-pwa` — pre-caches all build assets on first visit.
- All text in Russian (user's request is in Russian).
- Timer uses `setInterval` with 1s tick. For better accuracy, could use `requestAnimationFrame` + delta tracking, but 1s is fine for a Pomodoro app.
