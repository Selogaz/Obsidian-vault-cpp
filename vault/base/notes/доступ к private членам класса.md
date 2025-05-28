---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-25T18:03:36+03:00
updated: 2025-05-28T05:04:09+03:00
sr-due: 2025-05-31
sr-interval: 3
sr-ease: 250
---

Может ли объект получить доступ к члену класса, объявленному как private? Если да, то каким образом?
—
- *Внутри класса* доступ к приватной переменной открыт без ограничений
- *Вложенный класс* имеет доступ ко всем членам содержащего его класса
- доступ к приватным переменным через *неприватные геттеры*/сеттеры
- через *механизм рефлексии*(<font color="#ffff00">Reflection API</font>):
```java
class Victim { private int field = 42; }
//...
Victim victim = new Victim();
Field field = Victim.class.getDeclaredField("field"); field.setAccessible(true);
int fieldValue = (int) field.get(victim);
//...
```

- [ ] #task/inbox #category/work Что такое reflection API?
