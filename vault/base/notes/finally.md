---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-30 18:08:20+03:00
updated: 2025-09-21T12:40:45+03:00
sr-due: 2026-12-01
sr-interval: 436
sr-ease: 310
---

**Finally**
—
оператор `finally` гарантирует, что определенный в нем участок кода будет выполнен вне зависимости от того, какие исключения были перехвачены в блоке `try-catch`

`finally` не будет выполнен в случае, если [[JVM]] "умирает":
```java
try {
System.exit(0);
} catch(Exception e) {
e.printStackTrace();
} finally { }
```
