---
aliases: []
created: 2025-06-02 09:41:55+03:00
deck: obsidian::work
sr-due: 2025-06-04
sr-ease: 237
sr-interval: 1
tags:
- note/specific/code
- category/java
updated: 2025-06-03 07:57:14+03:00
---

**В чем разница между this.getClass == that.getClass() и that instanceof MyClass**
—
`instanceof` проверяет, является ли данный объект экземпляром:
- данного класса
- дочернего класса
- класса, который реализует указанный [[интерфейс]]

`this.getClass() == that.getClass()` проверяет два класса на идентичность,[^1] поэтому нужно использовать `getClass()`

- [ ] #task/inbox #category/work :[^1] все еще непонятно в чем разница