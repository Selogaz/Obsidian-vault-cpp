---
tags:
  - note/specific/code
  - category/css
aliases:
  - добавление своего цвета в TailwindCSS
deck: obsidian::css
created: 2026-01-26T18:19:09+03:00
updated: 2026-01-26T18:19:09+03:00
---

**добавление своего цвета в TailwindCSS**
—
main.css
```css
@theme {
  --color-dudar-500: #E06249;
}
```
PostItems.vue
```vue
<button class="bg-dudar-500">Добавить</button>
```