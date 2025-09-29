---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:47:28+03:00
updated: 2025-09-28T20:50:53+03:00
sr-due: 2025-10-17
sr-interval: 19
sr-ease: 250
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
