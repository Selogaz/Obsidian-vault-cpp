---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:41:55+03:00
updated: 2025-06-16T21:29:24+03:00
sr-due: 2025-07-26
sr-interval: 40
sr-ease: 277
---

**В чем разница между this.getClass == that.getClass() и that instanceof MyClass**
—
`instanceof` проверяет, является ли данный объект экземпляром:
- данного класса
- дочернего класса
- класса, который реализует указанный [[интерфейс]]

`this.getClass() == that.getClass()` проверяет два класса на идентичность,[^1] поэтому нужно использовать `getClass()`

- [ ] #task/inbox #category/work :[^1] все еще непонятно в чем разница
