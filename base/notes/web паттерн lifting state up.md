---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - паттерн lifting state up
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:37:11+03:00
updated: 2026-06-21T23:22:17+03:00
---

**паттерн lifting state up**
—
```tsx
interface Props {
  items: string[];
  heading: string;
  onSelectItem: (item: string) => void;
}

function ListGroup({ items, heading, onSelectItem }: Props) {
  return (
    <>
      {items.map((item) => (
        <li key={item} onClick={() => onSelectItem(item)}>{item}</li>
      ))}
    </>
  );
}

// Parent
<ListGroup items={cities} heading="Cities" onSelectItem={(item) => console.log(item)} />
```

Паттерн **«подъём состояния» (lifting state up)** — передача обработчиков из родителя.
[[web props|props]]
