---
tags:
  - note/specific/code
  - category/java
aliases:
  - import
deck: obsidian::java
created: 2025-06-15T08:41:29+03:00
updated: 2025-09-21T12:28:43+03:00
sr-due: 2026-09-26
sr-interval: 370
sr-ease: 294
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
