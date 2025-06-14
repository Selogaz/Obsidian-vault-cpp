---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-23 10:47:45+03:00
updated: 2025-06-05T16:58:37+03:00
sr-due: 2025-06-07
sr-interval: 9
sr-ease: 245
---

**Constant pool и таблица символов**
—
Различия:

- [[Run-time constant pool|Пул констант]] хранит данные, *непосредственно используемые байт-кодом*, в то время как таблица символов - *информацию об идентификаторах*.
- Пул констант может содержать данные, которые *невозможно представить прямо в байт-коде* (например, большие числа или строки).
- Таблица символов используется для *поиска и идентификации символов* в коде. 

Взаимодействие:

- Байт-код ссылается *на элементы `Constant Pool`*, а не непосредственно на значения. 
- Во время выполнения, `JVM` использует `Constant Pool` и `Symbol Table` *для разрешения этих ссылок* и доступа к данным. 
- Например, если байт-код ссылается на строковую константу, эта *ссылка приводит к элементу* в `Constant Pool`, а `JVM` использует `Symbol Table` *для поиска* фактического строкового *объекта*.
