---
tags:
  - note/specific/code
  - category/java
aliases:
  - bridge
deck: obsidian::java
created: 2025-10-01T18:23:31+03:00
updated: 2025-10-01T18:23:31+03:00
---

**bridge**
—
отделяет абстракцию от реализации. Позволяет менять абстракцию и реализацию независимо.

На практике выглядит как абстрактный класс, в полях которого есть типы-интерфейсы.

Пример из Spring: jdbcAccessor (родитель jdbcTemplate) с разными DataSource
```java
public abstract class JdbcAccessor {
   private DataSource dataSource;
   ...
}
```
