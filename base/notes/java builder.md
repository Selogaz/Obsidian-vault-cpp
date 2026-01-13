---
tags:
  - note/specific/code
  - category/java
aliases:
  - builder
deck: obsidian::java
created: 2025-10-01T18:14:23+03:00
updated: 2025-10-08T18:49:29+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 278
---

**builder**
—
разделяет действия по созданию объекта и его непосредственное создание. Другими словами, позволяет создавать объект постепенно.

Пример:
```java
Account acc = Account.builder().INN(111).KPP(222).build();
```

Пример из [[JDK]]: StringBuilder, HttpClient.newBuilder()

- ✅ Можно создать сложный объект постепенно
- ✅ Можно вернуть интерфейс и скрыть тип создаваемого класса

Чтобы не писать класс Builder, можно использовать аннотацию `@Builder` из Lombok.
