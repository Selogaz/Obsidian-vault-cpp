---
tags:
  - note/specific/code
  - category/java
aliases:
  - DispatcherServlet
deck: obsidian::java
created: 2025-06-13T07:49:00+03:00
updated: 2025-10-02T17:40:44+03:00
sr-due: 2026-11-18
sr-interval: 412
sr-ease: 294
---

**DispatcherServlet**
—
# Fill the gaps
центральный сервлет, который принимает все входящие запросы, делегирует обработку в классы-контроллеры и возвращает ответ пользователю.

# Урванов
перенаправляет запросы [[java слой контроллеров|контроллеру]]
```java
<servlet>
        <servlet-name>appServlet</servlet-name>
        <servlet-class>
            org.springframework.web.servlet.DispatcherServlet
        </servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value></param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>appServlet</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>
```

`servlet-mapping` – разделяет по обрабатываемым адресам
