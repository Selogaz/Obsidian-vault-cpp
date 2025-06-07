---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:51:08+03:00
updated: 2025-06-06T06:59:07+03:00
sr-due: 2025-06-20
sr-interval: 14
sr-ease: 292
---

**Реализация equals и hashCode() в Object**
—
реализация [[java equals()]] сводится к проверке двух ссылок
```java
public boolean equals(Object obj) {
	return (this == obj);
}
```

реализация [[java hashCode()|java hashCode()]] написана не на Java и зависит от реализации JVM:
```java
public native int hashCode();
```

в [[HotSpot VM|HotSpot VM]] хэш-код вычисляется с помощью алгоритма генерации простых чисел<font color="#ffff00"> Xorshift</font>
- [ ] #task/inbox #category/work Xorshift
