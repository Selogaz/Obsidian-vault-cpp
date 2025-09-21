---
tags:
  - note/specific/code
  - category/java
aliases:
  - пояснения к pom.xml
deck: obsidian::java
created: 2025-06-13T09:49:16+03:00
updated: 2025-09-21T12:01:29+03:00
sr-due: 2026-09-26
sr-interval: 370
sr-ease: 294
---

**пояснения к pom.xml**
—
```xml
		<dependency>
			<groupId>org.springframework.boot</groupId>
			<artifactId>spring-boot-starter-web</artifactId>
		</dependency>
```
стартер, содержащий все необходимые зависимости. Нет версии, потому что версиями управляет сам [[Spring Boot]], подтягивая из родительского проекта:
```xml
<parent>
		<groupId>org.springframework.boot</groupId>
		<artifactId>spring-boot-starter-parent</artifactId>
		<version>3.5.0</version>
		<relativePath/> <!-- lookup parent from repository -->
	</parent>
```

версия плагина `spring-boot-maven-plugin` также подтягивается из родительского:
```xml
<build>
		<plugins>
			<plugin>
				<groupId>org.springframework.boot</groupId>
				<artifactId>spring-boot-maven-plugin</artifactId>
			</plugin>
		</plugins>
	</build>
```
