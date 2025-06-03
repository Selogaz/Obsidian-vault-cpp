---
tags:
  - note/specific/exact
  - category/work
aliases: []
deck: obsidian::work
created: 2025-06-02T12:54:02+03:00
updated: 2025-06-03T07:57:58+03:00
sr-due: 2025-06-04
sr-interval: 1
sr-ease: 235
---

**Try-with-resources**
—
позволяет использовать блок [[try-catch-finally|try-catch]] не заботясь о закрытии ресурсов. Ресурсы объявляются в скобках сразу после `try`, а компилятор уже сам *неявно создаёт секцию [[finally]], в которой и происходит освобождение занятых в блоке ресурсов*. Под *ресурсами* подразумеваются *сущности, реализующие интерфейс* `java.lang.Autocloseable`.

```java
try(/*объявление ресурсов*/) {
//... 
} catch(Exception ex) {
//...
} finally {
//...
}
```

блоки `catch` и *явный* [[finally]] выполняются уже после того, как закрываются ресурсы в *неявном* finally.
