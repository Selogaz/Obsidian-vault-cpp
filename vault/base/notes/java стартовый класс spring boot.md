---
tags:
  - note/specific/code
  - category/java
aliases:
  - стартовый класс spring boot
deck: obsidian::java
created: 2025-06-13T09:51:53+03:00
updated: 2025-06-16T22:12:59+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**стартовый класс spring boot**
—
```java
package ru.urvanov.springbook2024.simple_spring_boot_webmvc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SimpleSpringBootWebmvcApplication {

	public static void main(String[] args) {
		SpringApplication.run(SimpleSpringBootWebmvcApplication.class, args);
	}

}
```
