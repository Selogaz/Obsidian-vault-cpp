---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-27 10:58:35+03:00
updated: 2025-06-05T16:58:36+03:00
sr-due: 2025-06-11
sr-interval: 9
sr-ease: 240
---

**Nested class**
—
Определен *внутри* другого класса. Должен использоваться только для *обслуживания обрамляющего* его класса. Иначе должен стать обычным классом. Вложенные классы имеют доступ к полям обрамляющего, но *не наоборот*. Использование вложенных классов *нарушает инкапсуляцию*

Существует 4 типа вложенных классов:
- [[static nested class|static nested]]
- [[member inner class|member inner]]
- [[local inner class|local inner]]
- [[anonymous inner class|anonymous inner]]

c [[java 8]] inner и anonymous классы могут использовать <font color="#ffff00">`effectively final`</font> переменные

- [ ] #task/inbox #category/work effectively final
