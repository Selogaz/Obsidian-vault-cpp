---
tags:
  - note/specific/code
  - category/java
aliases:
  - пример rest-контроллера
deck: obsidian::java
created: 2025-06-13T08:23:30+03:00
updated: 2025-09-17T17:41:48+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**пример rest-контроллера**
—
MainController.java
```java
package ru.urvanov.springbook2024.simplespringwebmvc.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
    
    @GetMapping("/")
    public String home() {
        return "Hello, world!";
    }

}
```

`home()` будет обрабатывать HTTP-запросы GET на `http://localhost:8080/simple-spring-webmvc/`, где:
- localhost – адрес сервера (при запуске локально - localhost)
- 8080 – порт сервера (по умолчанию для Apache Tomcat – 8080)
- simple-spring-webmvc – название по умолчанию при запуске из IDE, либо название <font color="#ffff00">war-файла</font>

![[java @RestController]]

![[java @GetMapping]]

- [x] #task/reference #category/work war-файл ✅ 2025-09-17
