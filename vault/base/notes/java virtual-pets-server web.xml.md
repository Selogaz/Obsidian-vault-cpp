---
tags:
  - note/specific/code
  - category/java
aliases:
  - virtual-pets-server web.xml
deck: obsidian::java
created: 2025-06-15T09:28:58+03:00
updated: 2025-06-16T22:21:23+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
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
