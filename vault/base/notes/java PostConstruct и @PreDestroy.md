---
tags:
  - note/specific/code
  - category/java
aliases:
  - PostConstruct и @PreDestroy
deck: obsidian::java
created: 2025-06-15T11:14:59+03:00
updated: 2025-06-18T14:09:28+03:00
sr-due: 2025-06-25
sr-interval: 7
sr-ease: 254
---

**PostConstruct и @PreDestroy**
—
находятся в `jakarta.annotation`
зависимость(в [[Spring Boot]] подтягивается автоматом):
```xml pom.xml
<dependency>
	<groupId>jakarta.annotion</groupId>
	<artifactId>jakarta.annotation-api</artifactId>
	<version>2.1.1</version>
	<scope>provided</scope>
</dependency>
```

`<scope>` указан как `provided` потому что зависимость предоставляется контейнером `Apache Tomcat`

Методы бина, помеченные @PostConstruct, выполняются *после* создания экземпляра бина и внедрения всех зависимостей.
```java
public class InitDestroyExample {
	void postConstructMethod() {
	sout "post";
	}
}
```
Методы, помеченные @PreDestroy выполняются перед уничтожением бина – когда приложение получит сигнал остановки
```java
public class InitDestoryExample {
	void preDestroyMethod() {
		sout "pre"
	}
}
```
