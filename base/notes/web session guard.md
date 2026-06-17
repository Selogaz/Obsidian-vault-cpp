---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - session guard
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-06-12T11:39:02+03:00
updated: 2026-06-12T11:39:02+03:00
---

**session guard**
—
В [src/app/(game)/game/character/page.tsx](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx):

1. Импорт `getCurrentGame` из `@/services/game`.
2. Новый state `hasGameSession: boolean | null`:
    - `null` — ещё не проверили (SSR + первый клиентский рендер).
    - `true` — сессия есть, рендерим визард.
    - `false` — сессии нет, `router.replace('/game/create')` уже вызван, держим пустой экран до завершения навигации.
3. Early return `return null` для `hasGameSession !== true`, расположен **выше** `bootstrapping`-блока — пользователь не успевает увидеть preloader перед редиректом.
4. `useEffect` запускается один раз на mount: проверяет `getCurrentGame()` и либо ставит `hasGameSession=true`, либо вызывает `router.replace('/game/create')` и `setHasGameSession(false)`.