---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-05-30T18:08:20+03:00
updated: 2025-06-02T13:01:33+03:00
sr-due: 2025-06-04
sr-interval: 4
sr-ease: 270
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
