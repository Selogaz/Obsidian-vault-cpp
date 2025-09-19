---
tags:
  - note/specific/code
  - category/java
aliases:
  - @Autowired на сеттере
deck: obsidian::java
created: 2025-06-13T12:25:35+03:00
updated: 2025-06-13T12:25:35+03:00
---

**@Autowired на сеттере**
—
```java
public void setDataSource(DataSource dataSource) {
	this.jdbcTemplate = new JdbcTemplate(dataSource);
}
```
