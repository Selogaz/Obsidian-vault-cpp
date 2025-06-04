---
aliases: []
created: 2025-06-02 09:47:28+03:00
deck: obsidian::work
sr-due: 2025-06-07
sr-ease: 270
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-03 07:57:44+03:00
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