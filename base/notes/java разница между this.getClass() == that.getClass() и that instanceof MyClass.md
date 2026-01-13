---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:41:55+03:00
updated: 2025-10-02T17:23:26+03:00
sr-due: 2026-11-29
sr-interval: 423
sr-ease: 297
---

**В чем разница между this.getClass == that.getClass() и that instanceof MyClass**
—
`instanceof` проверяет, является ли данный объект экземпляром:
- данного класса
- дочернего класса
- класса, который реализует указанный [[интерфейс]]

`this.getClass() == that.getClass()` проверяет два класса на идентичность,[^1] поэтому нужно использовать `getClass()`

- [x] #task/inbox #category/work :[^1] все еще непонятно в чем разница ✅ 2025-10-02
getClass проверяет именно точное совпадение
