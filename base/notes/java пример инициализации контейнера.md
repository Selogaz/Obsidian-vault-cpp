---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример инициализации контейнера
deck: obsidian::java
created: 2025-06-11T18:27:27+03:00
updated: 2025-10-02T16:58:44+03:00
sr-due: 2026-11-10
sr-interval: 404
sr-ease: 290
---

**пример инициализации контейнера**
—
```java
//инициализация контекста Spring IoC
ApplicationContext context = new ClassPathXmlApplicationContext("context.xml");

//получение бина petService из контекста
PetService service = context.getBean("petService", PetService.class);

```
service ссылается не на сам экземпляр класса `PetService`, а именно на [[java bean|bean]]. При вызове методов будут вызываться не методы класса напрямую, а *методы бина*. Это позволяет контейнеру `Spring IoC` осуществлять доп. действия *до, после или вместо* вызова этого метода.
