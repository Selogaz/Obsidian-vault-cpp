---
tags:
  - note/specific/code
  - category/java
aliases:
  - web.xml
deck: obsidian::java
created: 2025-06-13T07:45:24+03:00
updated: 2025-09-21T12:44:01+03:00
sr-due: 2026-09-01
sr-interval: 345
sr-ease: 280
---

**web.xml**
—

стандартный дескриптор развертывания веб-приложения [[Jakarta EE]]
- [[java ContextLoadListener|добавление]] `ContextLoadListener` в список listner'ов
	- позволит [[java WebApplicationContext|инициализировать контекст]] `WebApplicationContext` c помощью XML.
	- [[java simple context.xml|файл с xml-конфигурацией]]
- описание [[java Servlet API|сервлета]], в котором [[java DispatcherServlet|указан]] `DispatcherServlet`

источники лежат по адресу[^1]

[^1]: [simple-spring-webmvc](https://github.com/urvanov-ru/simple-spring-webmvc/blob/master/src/main/webapp/WEB-INF/web.xml)
