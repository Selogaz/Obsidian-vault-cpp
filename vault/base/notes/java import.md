---
tags:
  - note/specific/code
  - category/java
aliases:
  - import
deck: obsidian::java
created: 2025-06-15T08:41:29+03:00
updated: 2025-06-16T22:19:26+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 274
---

**import**
—
импорт частей конфигурации в основной:
```xml root-context.xml
<import resource = "properties.xml" />
<import resource = "servlet-jee.xml" />
<import resource = "servlet-tx.xml" />
```

- servlet-jee.xml - конфигурация JNDI-ресурсов
- servlet-tx.xml – описания бинов, связанных с управлением транзакциями, [[java Hibernate|Hibernate]], а также настраивает библиотеку Liquibase для управления миграциями данных.
