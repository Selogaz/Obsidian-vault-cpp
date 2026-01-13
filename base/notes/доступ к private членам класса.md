---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-25 18:03:36+03:00
updated: 2025-10-02T17:29:54+03:00
sr-due: 2027-01-01
sr-interval: 456
sr-ease: 310
---

Может ли объект получить доступ к члену класса, объявленному как private? Если да, то каким образом?
—
- *Внутри класса* доступ к приватной переменной открыт без ограничений
- *Вложенный класс* имеет доступ ко всем членам содержащего его класса
- доступ к приватным переменным через *неприватные геттеры*/сеттеры
- через [[java Reflection|механизм рефлексии]]
```java
class Victim { private int field = 42; }
//...
Victim victim = new Victim();
Field field = Victim.class.getDeclaredField("field"); field.setAccessible(true);
int fieldValue = (int) field.get(victim);
//...
```

- [x] #task/inbox #category/work Что такое reflection API? ✅ 2025-06-03
