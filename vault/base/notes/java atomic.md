---
tags:
  - note/specific/code
  - category/java
aliases:
  - atomic
deck: obsidian::java
created: 2025-09-19T22:14:31+03:00
updated: 2025-09-19T22:14:31+03:00
---

**atomic**
—
Семейство классов из пакета java.util.concurrent.atomic (например, AtomicInteger, AtomicLong, AtomicReference). Atomic класс - обёртка над volatile полем с дополнительными методами на основе CAS.
```java
public class AtomicInteger {
  private volatile int value;
  public final boolean compareAndSet(int expectedValue, int newValue) {…}
}

```

CAS(compare-and-swap) методы основаны на специальной инструкции процессора, которая позволяет сравнить текущее значение переменной с ожидаемым, и если они совпадают, заменить его на новое за одну неделимую операцию.
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
❌ для отслеживания изменений в системе. ABA проблема: если значение поменялось c А на В, а затем снова на А, CAS операция решит, что значение не менялось. Но на самом деле произошли промежуточные изменения.

[[Полезный паттерн использования volatile и Atomic с неизменяемыми объектами]]
