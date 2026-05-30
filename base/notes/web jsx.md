---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - jsx
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T20:57:58+03:00
updated: 2026-05-26T20:57:58+03:00
---

**jsx**
—
JavaScript XML — синтаксический сахар над `React.createElement`. Компилируется Babel/TypeScript.

- Один корневой элемент (или Fragment `<></>`)
- Закрывающиеся теги (`<br />`)
- `className` вместо `class`
- Фигурные скобки `{expression}` для вставки JS
- Стили — объекты `{{ color: 'red' }}`

```tsx
function App() {
  return <div className="container">{new Date().toLocaleString()}</div>;
}
```