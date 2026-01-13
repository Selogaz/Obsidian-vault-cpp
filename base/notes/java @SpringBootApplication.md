---
tags:
  - note/specific/code
  - category/java
aliases:
  - SpringBootApplication
deck: obsidian::java
created: 2025-06-15T09:43:00+03:00
updated: 2025-09-21T12:51:26+03:00
sr-due: 2026-10-20
sr-interval: 394
sr-ease: 320
---

**@SpringBootApplication**
—
с класса, помеченного этой аннотацией, начинается приложение на [[base/notes/Spring Boot]] .
```java
package ru.urvanov.virtualpets.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {

	public static void main(Stirng[] args) {
		SpringApplication.run(Application.class,args);
	}
}
```
Аннотация @SpringBootApplication включает:
- механизм автоконфигурации
- механизм [[java сканирование бинов|сканирования бинов]] для текущего и дочерних пакетов
- использует помеченный класс как источник дополнительной конфигурации, помимо классов с @Configuration

[[java механизм автоконфигурации Spring Boot]]
