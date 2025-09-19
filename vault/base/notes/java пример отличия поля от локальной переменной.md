---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-03 08:50:23+03:00
updated: 2025-06-11T08:49:40+03:00
sr-due: 2025-07-04
sr-interval: 23
sr-ease: 291
---

**Пример отличия поля от локальной переменной**
—
```java

public class Demo {
    private int field; // Поле класса (хранится в heap)

    public void method(int param) {
        int localVar = 42; // Локальная переменная (фрейм стека)
        System.out.println(localVar + param + this.field);
    }
}
```
- **`this`** → индекс `0`
- **`param`** → индекс `1`
- **`localVar`** → индекс `2`
