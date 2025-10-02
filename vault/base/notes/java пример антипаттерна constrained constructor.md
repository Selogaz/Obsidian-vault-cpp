---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна constrained constructor
deck: obsidian::java
created: 2025-06-06T08:13:05+03:00
updated: 2025-10-02T17:46:19+03:00
sr-due: 2026-12-14
sr-interval: 438
sr-ease: 312
---

**пример антипаттерна constrained constructor**
—
похоже, что это создание экземпляра через [[java Reflection|Reflection API]]
```java
//typeFromSettings, nameFromSettrings,priceFromSettings считываются из настроек
Class<?> clazz = Class.forName(typeFromSettings);
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
Object collectionShelfItem = constructor.newInstance(nameFromSettrings,priceFromSettings);
```
