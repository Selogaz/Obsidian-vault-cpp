---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - передача дочерних элементов
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T21:36:44+03:00
updated: 2026-05-26T21:36:44+03:00
---

**передача дочерних элементов**
—
```tsx
interface Props {
  children: ReactNode;
}

function Alert({ children }: Props) {
  return <div className="alert alert-primary">{children}</div>;
}

// Использование
<Alert>
  <strong>Hello</strong> World
</Alert>
```

`ReactNode` — импортируется из `react`; покрывает любой рендерящийся контент.