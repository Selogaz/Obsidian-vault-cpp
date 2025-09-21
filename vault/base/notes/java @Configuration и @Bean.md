---
tags:
  - note/specific/code
  - category/java
aliases:
  - Configuration и @Bean
deck: obsidian::java
created: 2025-06-15T09:59:41+03:00
updated: 2025-09-21T12:40:16+03:00
sr-due: 2026-09-07
sr-interval: 351
sr-ease: 290
---

**@Configuration и @Bean**
—
для дополнительной конфигурации у пакета с `Application.class` создается подпакет `config`, а в нем размещаются классы с конфигурациями, помеченными @Configuration:
```java
@Configuration
public class ClockConfig {

	@Bean
	public Clock clock() {
		return Clock.systemDefaultZone();
	}
}
```
*@Bean помечаются методы, возвращающие экземпляры классов, из которых необходимо создать бины*. В качестве аргументов, помеченных этой аннотацией, принимаются другие бины, а также значения из property-файлов с помощью аннотации @Value
