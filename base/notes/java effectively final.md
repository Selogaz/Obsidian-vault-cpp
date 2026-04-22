---
tags:
  - note/specific/code
  - category/java
aliases:
  - effectively final
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2026-03-05T16:58:01+03:00
updated: 2026-03-05T16:58:01+03:00
---

**effectively final**
—
переменная, которая не объявлена как final, но фактически не меняется после инициализации.
Компилятор сам определяет, что переменная не изменяется, и разрешает её использовать.
```java
final int x = 10;
int x = 10; //и далее не меняется - effectively final
int x = 10; x++; //не effectively final
```
Это упростило работу с inner и [[anonymous inner class|anonymous]] классами в Java 8+, теперь не нужно писать везде final - компилятор сам поймет
