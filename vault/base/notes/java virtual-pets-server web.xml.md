---
tags:
  - note/specific/code
  - category/java
aliases:
  - virtual-pets-server web.xml
deck: obsidian::java
created: 2025-06-15T09:28:58+03:00
updated: 2025-09-21T12:13:25+03:00
sr-due: 2026-09-19
sr-interval: 363
sr-ease: 290
---

**virtual-pets-server web.xml**
—
```xml
<context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>
            /WEB-INF/spring/root-context.xml
            /WEB-INF/spring/security.xml
            /WEB-INF/spring/appServlet/servlet-context.xml
        </param-value>
    </context-param>
```
параметр `contextConfigLocation` считывается листенером [[java ContextLoadListener|ContextLoadListener]]
