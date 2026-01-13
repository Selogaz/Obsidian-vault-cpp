---
tags:
  - note/specific/code
  - category/java
aliases:
  - подключение aop зависимостей
deck: obsidian::java
created: 2025-06-15T12:04:33+03:00
updated: 2025-09-21T12:11:01+03:00
sr-due: 2026-10-08
sr-interval: 382
sr-ease: 302
---

**подключение aop зависимостей**
—
### Зависимости для [[Spring Framework]]
для создания [[java aop aspect|аспектов]] с помощью аннотации @AspectJ потребуются:
```xml
<dependency>
	<groupId>org.aspectj</groupId>
	<artifactId>aspectjweaver</artifactId>
	<version>${org.aspectj-version}</version>
</dependency>
```
```xml
<dependency>
	<groupId>org.springframework</groupId>
	<artifactId>spring-aop</artifactId>
	<version>${org.springframework-version}</version>
</dependency>
```
```xml
<properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <org.springframework-version>6.1.10</org.springframework-version>
        <org.aspectj-version>1.9.21</org.aspectj-version>
</properties>
```

### Зависимости для [[base/notes/Spring Boot]]
```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```
