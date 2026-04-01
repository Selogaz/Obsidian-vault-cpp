---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:47:28+03:00
updated: 2025-11-01T08:04:43+03:00
sr-due: 2026-02-28
sr-interval: 119
sr-ease: 270
---

**Можно ли реализовать метод equals класса MyClass вот так**
—
```java
class MyClass {
	public boolean equals(MyClass that) {
		return this == that;
	}
}
```

Можно, но данная реализация перегружает метод, а не переопределяет
