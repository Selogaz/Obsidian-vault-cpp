---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - подключение TailwindCSS к vite проекту
deck: obsidian::css
meta:
  - css
created: 2026-01-26T18:28:06+03:00
updated: 2026-03-04T19:33:43+03:00
---

**подключение TailwindCSS к vite проекту**
—
# В корне проекта
```zsh
npm install tailwindcss @tailwindcss/vite
```

# vite.config.js

Добавить эти строки, не удалять то, что есть. Импорт - наверх, tailwindcss - добавить к плагинам

```js
import tailwindcss from '@tailwindcss/vite'

export default ...
plugins: [
    tailwindcss(),
  ],
```

# main.css

```css
@import "tailwindcss";
```
