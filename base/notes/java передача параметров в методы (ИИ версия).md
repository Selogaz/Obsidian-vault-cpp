---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-03 08:46:17+03:00
updated: 2025-09-21T12:50:22+03:00
sr-due: 2026-11-01
sr-interval: 406
sr-ease: 310
---

**Передача параметров в методы (ИИ версия)**
—
- **Для статических методов**:
    Параметры последовательно размещаются в локальных переменных, начиная с индекса `0
```java
static void staticMethod(int x, String y) {
	// 0=x, 1=y
}
```

- **Для методов экземпляра**:
    - Переменная с индексом `0` всегда хранит **ссылку `this`**.
    - Параметры начинаются с индекса `1`.
```java
void instanceMethod(String s) {
	// 0=this, 1=s
}
```
