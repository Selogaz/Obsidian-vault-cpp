---
tags:
  - note/specific/code
  - category/java
aliases:
  - abstract factory
deck: obsidian::java
created: 2025-10-01T18:11:44+03:00
updated: 2025-10-08T18:51:01+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**abstract factory**
—
создаёт семейства связанных объектов.

Пример из Spring: Сочетание `@Configuration` и `@Profile`, например, для конфигурации DataSource на различных средах.
```java
@Configuration
@Profile("EU")
public class EUConfig {
    @Bean
    public DataSource dataSource() {
        // ...
   }

    @Bean
    public PlatformTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }
}

```
