---
tags:
  - note/specific/code
  - category/java
aliases:
  - context.xml
deck: obsidian::java
created: 2025-06-13T08:06:28+03:00
updated: 2025-09-21T12:00:08+03:00
sr-due: 2026-09-22
sr-interval: 366
sr-ease: 290
---

**context.xml**
—
- пространства имен и схемы XSD
```java
<?xml version = "1.0" encoding = "UTF-8"?>
<beans:beans xmlns = "http://www.springframework.org/schema/beans"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xmlns:beans = "http://www.springframework.org/schema/beans"
    xmlns:context = "http://www.springframework.org/schema/context"
    xmlns:mvc = "http://www.springframework.org/schema/mvc"
    xsi:schemaLocation = "
        http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd
        http://www.springframework.org/schema/mvc
        http://www.springframework.org/schema/mvc/spring-mvc.xsd
        ">
```

- `mvc:annotation-driven` для работы `@Controller` и дочерних
```java
<mvc:annotation-driven />

    <context:component-scan
        base-package = 
        "ru.urvanov.springbook2024.simplespringwebmvc.controller" />
```
в `component-scan` указан пакет, по которому будет поиск [[java bean|бинов]], в т.ч. и в дочерних

![[java пример rest-контроллера]]
