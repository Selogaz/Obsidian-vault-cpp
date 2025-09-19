---
tags:
  - note/specific/code
  - category/java
aliases:
  - web.xml
deck: obsidian::java
created: 2025-06-13T07:45:24+03:00
updated: 2025-06-18T14:06:40+03:00
sr-due: 2025-06-25
sr-interval: 7
sr-ease: 260
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
