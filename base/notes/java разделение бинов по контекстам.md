---
tags:
  - note/specific/code
  - category/java
aliases:
  - разделение бинов по контекстам
deck: obsidian::java
created: 2025-06-13T10:42:21+03:00
updated: 2025-09-21T12:06:43+03:00
sr-due: 2026-09-16
sr-interval: 360
sr-ease: 290
---

**разделение бинов по контекстам**
—
Если бины описаны в одном контексте, то в [[java DispatcherServlet|DispatcherServlet]] в качестве `contextConfigLocation` не передается ничего:

```xml
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
```

в сложных случаях можно указать дочерний контекст:
[[java объявление дочернего контекста]]
