---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - условный рендеринг
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:01:44+03:00
updated: 2026-05-26T21:01:44+03:00
---

**условный рендеринг**
—

Четыре подхода:

1. **Тернарный оператор:**
```tsx
{items.length === 0 ? <p>No items</p> : <ul>...</ul>}
```

2. **&& (логическое И):**
```tsx
{items.length === 0 && <p>No items</p>}
```

3. **Переменная:**
```tsx
const message = items.length === 0 ? <p>No items</p> : null;
return <>{message}<ul>...</ul></>;
```

4. **Функция-хелпер:**
```tsx
const getMessage = () => items.length === 0 ? <p>No items</p> : null;
```