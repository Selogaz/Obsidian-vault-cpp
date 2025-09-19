---
tags:
  - note/specific/code
  - category/java
aliases:
  - DispatcherServlet
deck: obsidian::java
created: 2025-06-13T07:49:00+03:00
updated: 2025-06-16T21:48:07+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 274
---

**DispatcherServlet**
—
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
