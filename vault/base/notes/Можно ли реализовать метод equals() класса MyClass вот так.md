---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:47:28+03:00
updated: 2025-06-11T09:04:50+03:00
sr-due: 2025-06-23
sr-interval: 12
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
