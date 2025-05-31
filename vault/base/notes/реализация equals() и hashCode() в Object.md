---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-31T06:51:08+03:00
updated: 2025-05-31T06:58:17+03:00
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
