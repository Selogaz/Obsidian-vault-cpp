---
tags:
  - note/specific/code
  - category/java
aliases:
  - state
deck: obsidian::java
created: 2025-10-01T19:09:16+03:00
updated: 2025-10-08T18:40:54+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**state**
—
инкапсуляция поведения в отдельный объект. (Чем отличается от [[java command|command]])м

Пример: у пользователя есть несколько состояний: новый, обычный, мошенник. В зависимости от состояния рассчитывается максимальная скидка и необходимость подтверждать возраст. В классе User добавляется поле UserState state:
```java
enum UserState { 
   NEW(true, 10), 
   VALIDATED(false, 25), 
   FRAUD(true, 0);

   boolean needConfirmation;
   int maxDiscount;
   // ...
}

```
