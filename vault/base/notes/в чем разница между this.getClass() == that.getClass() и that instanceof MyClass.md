---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-06-02T09:41:55+03:00
updated: 2025-06-03T07:57:14+03:00
sr-due: 2025-06-04
sr-interval: 1
sr-ease: 237
---

**В чем разница между this.getClass == that.getClass() и that instanceof MyClass**
—
`instanceof` проверяет, является ли данный объект экземпляром:
- данного класса
- дочернего класса
- класса, который реализует указанный [[интерфейс]]

`this.getClass() == that.getClass()` проверяет два класса на идентичность,[^1] поэтому нужно использовать `getClass()`

- [ ] #task/inbox #category/work :[^1] все еще непонятно в чем разница
