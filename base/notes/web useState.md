---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - useState
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:12:56+03:00
updated: 2026-05-26T21:12:56+03:00
---

**useState**
—
```tsx
const [state, setState] = useState<Type>(initialValue);
```

- `state` — текущее значение
- `setState` — функция обновления (триггерит ре-рендер)
- Компонент перерисовывается при каждом вызове `setState`

**Правило:** состояние нельзя мутировать напрямую — только через `setState`.

```tsx
const [isVisible, setVisible] = useState(false);
const [items, setItems] = useState<string[]>([]);
```