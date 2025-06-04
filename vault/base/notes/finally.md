---
aliases: []
created: 2025-05-30 18:08:20+03:00
deck: obsidian::work
sr-due: 2025-06-04
sr-ease: 270
sr-interval: 4
tags:
- note/specific/code
- category/java
updated: 2025-06-02 13:01:33+03:00
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