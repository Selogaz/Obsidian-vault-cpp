---
tags:
  - note/specific/code
  - category/java
aliases:
  - root-context.xml
deck: obsidian::java
created: 2025-06-13T11:02:38+03:00
updated: 2025-06-16T21:48:42+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 276
---

**root-context.xml**
—
```xml
<?xml version = "1.0" encoding = "UTF-8"?>
<beans xmlns = "http://www.springframework.org/schema/beans"
    xmlns:context = "http://www.springframework.org/schema/context"
    xmlns:task = "http://www.springframework.org/schema/task"
    xmlns:aop = "http://www.springframework.org/schema/aop"
    xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation = "
    http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://www.springframework.org/schema/context
    http://www.springframework.org/schema/context/spring-context.xsd
    http://www.springframework.org/schema/aop
    http://www.springframework.org/schema/aop/spring-aop.xsd
    http://www.springframework.org/schema/task
    http://www.springframework.org/schema/task/spring-task.xsd">
```

- `xmlns` – пространство имен по умолчанию
	- содержит элементы для описания бинов
- префикс `context`
	- поддержка конфигурирования [[java ApplicationContext|ApplicationContext]]
- `task`
	- настройка запуск заданий по расписанию
- `aop` элементы для создания [[java aop aspect|аспектов]] и [[AOP]]
