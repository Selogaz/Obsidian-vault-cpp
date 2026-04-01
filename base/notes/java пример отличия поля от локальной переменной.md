---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-03 08:50:23+03:00
updated: 2025-10-02T17:00:52+03:00
sr-due: 2027-01-02
sr-interval: 457
sr-ease: 311
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
