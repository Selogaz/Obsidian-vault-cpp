---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:34:48+03:00
updated: 2025-06-06T07:02:42+03:00
sr-due: 2025-06-15
sr-interval: 9
sr-ease: 250
---

**Правила переопределения [[java equals()|Object.equals()]]**
—
- == для определения является ли аргумент ссылкой на нужный объект. Если нет, то `false`.
- `getClass()` проверяет правильный ли тип у аргумента
- приведение аргумента к нужному типу перед проверкой `instanceof`
- Если все поля одного класса соответствуют полям другого, то `true`
- переопределить также и [[java hashCode()|`hashCode()`]]. *Равные объекты должны возвращать одинаковые хэш-коды*
