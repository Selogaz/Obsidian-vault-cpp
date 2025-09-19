---
tags:
  - note/specific/code
  - category/java
aliases:
  - Spring Intitializr
deck: obsidian::java
created: 2025-06-13T09:13:11+03:00
updated: 2025-06-18T14:42:29+03:00
sr-due: 2025-06-22
sr-interval: 4
sr-ease: 276
---

**Spring Intitializr**
—
[https://start.spring.io](https://start.spring.io)
- генерирует `pom.xml`
- для самого простого примера в блок `Dependencies` можно подключить только одну зависимость – *Spring Web*
- Project Metadata:
	- GroupId: `ru.urvanov.springbook2024` . Доменное имя организации в обратном порядке. К нему добавляется разделение на команды / проекты
	- ArtifactId: `simple-spring-boot-webmvc` . Имя генерируемого проектом <font color="#ffff00">артефакта</font> в виде `simple-spring-boot-webmvc-<version>.jar`
	- Name: `simple-spring-boot-webmvc` . Название в теге name из `pom.xml`
	- Package name: `ru.urvanov.springbook2024.simplespringbootwebmvc`. Пакет, в котором будет лежать `Application.java`
	- Packaging: способ упаковки. Оставить `jar`
- Generate и скачать

[[java пояснения к pom.xml|пояснения к pom.xml]]
[[java стартовый класс spring boot]]
[[java сборка jar|сборка jar]]
