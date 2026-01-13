---
tags:
  - note/specific/code
  - category/java
aliases:
  - atomic
deck: obsidian::java
created: 2025-09-19T22:14:31+03:00
updated: 2025-10-08T19:30:38+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**atomic**
—
Семейство классов из пакета java.util.concurrent.atomic (например, AtomicInteger, AtomicLong, AtomicReference). Atomic класс - *обёртка над volatile полем с дополнительными методами на основе CAS*.
```java
public class AtomicInteger {
  private volatile int value;
  public final boolean compareAndSet(int expectedValue, int newValue) {…}
}

```
![[java CAS]]
```java
AtomicInteger ai = new AtomicInteger();
…
boolean isUpdated = ai.compareAndSet(10, 15); // если значение ai было 10, оно заменится на 15, и метод вернёт true. Если другой поток изменил значение, и оно больше не 10, метод вернёт false

```

Помимо CAS в атомиках есть множество других операций:
- compareAndExchange(expectedValue, newValue) - если обновление не успешно, возвращает текущее значение переменной
- getAndIncrement() - сделать инкремент переменной
- getAndAdd(delta) - увеличить переменную на заданное значение
- updateAndGet(IntUnaryOperator updateFunction) - применить функцию к текущему значению

Atomic не подойдет:
❌ при одновременном изменении двух или более полей
❌ для отслеживания изменений в системе. [[java ABA-проблема|ABA проблема]]: если значение поменялось c А на В, а затем снова на А, CAS операция решит, что значение не менялось. Но на самом деле произошли промежуточные изменения.

[[Полезный паттерн использования volatile и Atomic с неизменяемыми объектами]]
