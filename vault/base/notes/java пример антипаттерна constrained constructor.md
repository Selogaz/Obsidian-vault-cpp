---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример антипаттерна constrained constructor
deck: obsidian::java
created: 2025-06-06T08:13:05+03:00
updated: 2025-06-06T08:13:05+03:00
---

**пример антипаттерна constrained constructor**
—
```java
//typeFromSettings, nameFromSettrings,priceFromSettings считываются из настроек
Class<?> clazz = Class.forName(typeFromSettings);
Constructor<?> constructor = clazz.getConstructor(String.class, int.class);
Object collectionShelfItem = constructor.newInstance(nameFromSettrings,priceFromSettings);
```

