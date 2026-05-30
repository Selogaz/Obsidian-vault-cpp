---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - props
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:19:07+03:00
updated: 2026-05-26T21:19:07+03:00
---

**props**
—
Пропсы - входные данные для компонентов.
Передача данных от родителя к дочернему компоненту.

**Деструктуризация** пропсов в параметрах компонента.
```tsx
// Parent
<ListGroup items={cities} heading="Cities" />

// Child — типизация через interface
interface Props {
  items: string[];
  heading: string;
}

function ListGroup({ items, heading }: Props) {
  // ...
}
```
