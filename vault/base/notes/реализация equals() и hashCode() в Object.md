---
aliases: []
created: 2025-05-31 06:51:08+03:00
deck: obsidian::work
sr-due: 2025-06-06
sr-ease: 272
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-02 08:44:52+03:00
---

**Реализация equals и hashCode() в Object**
—
реализация [[equals()]] сводится к проверке двух ссылок
```java
public boolean equals(Object obj) {
	return (this == obj);
}
```

реализация [[hashCode()|hashCode()]] написана не на Java и зависит от реализации JVM:
```java
public native int hashCode();
```

в [[виды сборщиков мусора в HotSpot|HotSpot VM]] хэш-код вычисляется с помощью алгоритма генерации простых чисел<font color="#ffff00"> Xorshift</font>