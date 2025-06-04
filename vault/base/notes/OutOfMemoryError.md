---
aliases: []
created: 2025-06-02 12:43:29+03:00
deck: obsidian::work
sr-due: 2025-06-06
sr-ease: 260
sr-interval: 3
tags:
- note/specific/code
- category/java
updated: 2025-06-03 07:12:40+03:00
---

**OutOfMemoryError**
—
выбрасывается, когда [[JVM]] не может создать/разместить объект из-за нехватки памяти, а [[зачем нужен сборщик мусора|сборщик мусора]] не может освободить достаточное её количество.
Область памяти, занимаемая процессом, состоит из нескольких частей. В зависимости от того, в какой из частей не хватило места, выбрасывается разный тип ошибки:
- `java.lang.OutOfMemoryError: Java heap space`: Не хватает места в куче. Проблема в утечке памяти
- `java.lang.OutOfMemoryError: PermGen space` Не хватает места в *Permanent* области. До [[java 8]]
- `java.lang.OutOfMemoryError: GC overhead limit exceeded` может возникнуть как 1 случае, так и во 2. Сборщик мусора все время работает, пытаясь освободить место. Можно отключить.
- `java.lang.OutOfMemoryError: unable to create new native thread` когда нет возможности создавать новые потоки