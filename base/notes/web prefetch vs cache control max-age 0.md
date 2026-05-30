---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - prefetch vs cache control max-age 0
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-24T21:38:48+03:00
updated: 2026-05-24T21:38:48+03:00
---

**prefetch vs cache control max-age 0**
—

Браузер делает revalidation-запрос **при каждом** обращении к файлу. То есть `<link rel=preload>` и `prewarmCharacterContent` через `Image()` тянут SVG один раз, но при последующем рендере `next/image` или fetch в `ClassIconInline` пойдут **снова** в сеть (условный 304, если ETag совпал, или полный ответ, если нет). Получается, что browser-side prewarm не даёт повторного cache-hit'а на том же сеансе.

А `prefetchSvgIcons` (через `fetch` → `svgCache: Map<string, string>` в памяти JS) — **обходит** этот HTTP-кеш: данные лежат в RAM, и при следующем рендере `ClassIconInline` берёт их синхронно без сетевого запроса. Поэтому он у вас работает, а prewarm — нет.