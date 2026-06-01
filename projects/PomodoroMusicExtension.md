---
tags:
  - status/wip
  - project/single
  - priority/c
  - category/webdev
aliases:
  - PomoMusic Controller
addition:
status: 🟦
priority: 🇨
category:
  - "[[webdev]]"
meta:
problem:
creator:
production:
start: 2026-05-31T19:38:57+03:00
end:
url:
  - "[GitHub](https://github.com/exuberance/PomodoroMusicExtension)"
cover:
icon: ✏️
color: "#b87535"
created: 2026-05-31T19:38:57+03:00
updated: 2026-05-31T19:44:03+03:00
tasks:
  - "- [x] Настройка проекта (Vite, TypeScript, multi-entry build pipeline)"
  - "- [x] Popup UI (старт/пауза/сброс, обратный отсчёт, фаза, список вкладок)"
  - "- [x] Timer engine через `chrome.alarms` (tick + phase-end)"
  - "- [x] State machine (idle → work → break → idle) + session counting"
  - "- [x] Tab control через content script (pause/resume/volume на `<audio>`/`<video>`)"
  - "- [x] Volume control (центральный слайдер, чтение актуальной громкости из вкладки)"
  - "- [x] Badge countdown (отображение остатка на иконке)"
  - "- [x] Desktop notifications (смена фаз)"
  - "- [x] Settings page (длительности, автостарт, уведомления)"
  - "- [x] Cross-browser: Chrome MV3 + Firefox 109+ (background.scripts)"
  - "- [x] Firefox ESM → IIFE rebundling (esbuild post-build step)"
  - "- [x] Auto-start после брейка (повторное использование controlledTabIds)"
  - "- [x] Error resilience (silent catch на закрытых вкладках, восстановление из storage)"
  - "- [x] 59 unit tests (state, timer, tab-controller, playback-control)"
  - "- [x] Build scripts (generate-icons, copy-assets, bundle-firefox-scripts)"
  - "- [x] Architecture docs + Development guide"
  - "- [x] Autoplay fix"
---

> [!toc]- Table of contents
> ```table-of-contents
> ```

> [!todo]- Tasks
> ```tasks
> path includes {{query.file.path}}
> group by heading
> hide task count
> ```

# Description

**PomoMusic Controller** — браузерное расширение, которое автоматически управляет воспроизведением музыки (YouTube, Spotify, SoundCloud, VK и др.) по Pomodoro-таймеру.

## Architecture

Трёхуровневая message-passing архитектура: **Popup** ↔ **Background Service Worker** (MV3) ↔ **Content Script** (на каждой вкладке). Background управляет таймером через `chrome.alarms` (переживает suspend), сохраняет состояние в `storage.local`. Popup показывает обратный отсчёт (local `setInterval`). Content Script управляет `<audio>`/`<video>` элементами через DOM.

## Стек

- TypeScript strict mode
- Vite (multi-entry build)
- Vitest + happy-dom (59 тестов)
- Vanilla CSS (тёмная тема `#1a1a2e`)
- webextension-polyfill
- Chrome MV3 + Firefox 109+ (с IIFE rebundling для Firefox)

## Структура

```
src/
├── background/   # index, state (idle→work→break→idle), timer, tab-controller, notifications
├── content/      # index, playback-control (pause/resume/volume)
├── popup/        # index, styles, components (timer-display, phase-indicator, controls)
├── options/      # index, styles
└── shared/       # types, constants, messages
```

# Done

- [x] Настройка проекта (Vite, TypeScript, multi-entry build pipeline)
- [x] Popup UI (старт/пауза/сброс, обратный отсчёт, фаза, список вкладок)
- [x] Timer engine через `chrome.alarms` (tick + phase-end)
- [x] State machine (idle → work → break → idle) + session counting
- [x] Tab control через content script (pause/resume/volume на `<audio>`/`<video>`)
- [x] Volume control (центральный слайдер, чтение актуальной громкости из вкладки)
- [x] Badge countdown (отображение остатка на иконке)
- [x] Desktop notifications (смена фаз)
- [x] Settings page (длительности, автостарт, уведомления)
- [x] Cross-browser: Chrome MV3 + Firefox 109+ (background.scripts)
- [x] Firefox ESM → IIFE rebundling (esbuild post-build step)
- [x] Auto-start после брейка (повторное использование controlledTabIds)
- [x] Error resilience (silent catch на закрытых вкладках, восстановление из storage)
- [x] 59 unit tests (state, timer, tab-controller, playback-control)
- [x] Build scripts (generate-icons, copy-assets, bundle-firefox-scripts)
- [x] Architecture docs + Development guide
- [x] Autoplay fix
