---
tags:
  - note/specific/code
  - category/java
aliases:
  - плюсы Spring Boot
deck: obsidian::java
created: 2025-06-13T10:02:05+03:00
updated: 2025-06-18T14:54:21+03:00
sr-due: 2025-06-22
sr-interval: 4
sr-ease: 270
---

**плюсы Spring Boot**
—
- сам настроит Apache Tomcat и развернет в нем приложение
- не нужно следить за версиями библиотек и фреймворков
	- задать в качестве родительского артефакта `spring-boot-starter-parent`
	- или в блоке `dependencyManagement` артефакт `spring-boot-dependencies`
- благодаря стартерам вроде `spring-boot-starter-web` упрощает добавление новых фич
