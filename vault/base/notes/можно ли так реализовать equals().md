---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 09:24:36+03:00
updated: 2025-06-05T16:58:35+03:00
sr-due: 2025-06-07
sr-interval: 4
sr-ease: 273
---

**Можно ли так реализовать equals**
—
```java
equals(Object that) {
return this.hashCode() == that.hashCode()
}
```

Для сравнения экземпляров класса `Object` такой код допустим. Потому что `hashCode()` в классе `Object` возвращает уникальные значения для разных объектов[^1]

В общем случае не стоит, потому что [[java hashCode()]] не гарантирует уникальность значения для каждого объекта.

[^1]: его вычисление основано на использовании алгоритма генерации случайных чисел
