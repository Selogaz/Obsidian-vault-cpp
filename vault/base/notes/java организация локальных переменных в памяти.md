---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-03 08:45:23+03:00
updated: 2025-06-11T08:50:06+03:00
sr-due: 2025-07-05
sr-interval: 24
sr-ease: 290
---

**Организация локальных переменных в памяти**
—
- Адресуются по **индексу** (начиная с `0`).
- Пример:

```java
void example(int a, double b) {
	int c = 10; // Локальные переменные: 0=a, 1-2=b, 3=c
}
```
