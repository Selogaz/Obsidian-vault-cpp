---
tags:
  - note/specific/code
  - category/java
aliases:
  - внедрение значений из property-файлов
deck: obsidian::java
created: 2025-06-13T12:32:00+03:00
updated: 2025-06-16T22:10:29+03:00
sr-due: 2025-06-20
sr-interval: 4
sr-ease: 270
---

**внедрение значений из property-файлов**
—
```java
@Value("{virtualpets-server-springframework.server.url}")
private String serverUrl;
```
```properties application_dev.properties
virtualpets-server-springframework.server.url = http://localhost:8080/virtualpets-server-springframework
virtualpets-server-springframework.play.url = http://localhost:8081/
```

полю `serverUrl` будет присвоено значение `http://localhost:8080/virtualpets-server-springframework`
