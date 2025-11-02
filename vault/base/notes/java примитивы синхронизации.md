---
tags:
  - note/specific/code
  - category/java
aliases:
  - примитивы синхронизации
deck: obsidian::java
created: 2025-07-16T14:34:02+03:00
updated: 2025-11-01T08:33:16+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**примитивы синхронизации**
—
## Примитивы синхронизации в Java

Java предоставляет множество примитивов синхронизации для координации работы потоков.[^1][^2]

### Ключевое слово synchronized

**synchronized** — это базовый механизм синхронизации в Java.[^3][^4] Он может применяться к методам или блокам кода:

```java
public synchronized void method() {
    // синхронизированный метод
}

public void method() {
    synchronized(this) {
        // синхронизированный блок
    }
}
```

### Семафоры ([[java Semaphore|Semaphore]])

**Semaphore** — это примитив синхронизации, который контролирует доступ к ресурсу через счетчик разрешений.[^5][^6] Используется для ограничения количества потоков, которые могут получить доступ к ресурсу одновременно.

```java
Semaphore semaphore = new Semaphore(3); // 3 разрешения

// Получение разрешения
semaphore.acquire();
try {
    // Работа с ресурсом
} finally {
    semaphore.release();
}
```

### CountDownLatch

**CountDownLatch** — это синхронизационный примитив, который позволяет одному или нескольким потокам ждать, пока другие потоки не завершат выполнение определенного количества операций.[^7][^8]

```java
CountDownLatch latch = new CountDownLatch(3);

// В рабочих потоках
latch.countDown(); // уменьшает счетчик

// В основном потоке
latch.await(); // ожидает, пока счетчик не станет 0
```

### CyclicBarrier

**CyclicBarrier** — это точка синхронизации, где указанное количество потоков встречается и блокируется до тех пор, пока все не достигнут барьера.[^9][^10] В отличие от CountDownLatch, *CyclicBarrier может использоваться повторно*.

```java
CyclicBarrier barrier = new CyclicBarrier(3);

// В каждом потоке
barrier.await(); // ждет, пока все потоки не достигнут барьера
```

### Volatile

**volatile** — это ключевое слово, которое гарантирует видимость изменений переменной между потоками.[^11][^12] Переменная помечается как volatile, *чтобы обеспечить чтение из основной памяти, а не из кэша процессора*.

```java
private volatile boolean running = true;
```

### wait() И notify()

**wait()** и **notify()** — это методы класса Object для координации работы потоков.[^13][^14] Они должны вызываться только внутри синхронизированных блоков или методов(почему?).

```java
synchronized (object) {
    while (!condition) {
        object.wait(); // ожидание
    }
    // работа
}

synchronized (object) {
    // изменение условия
    object.notify(); // уведомление одного ожидающего потока
}
```

### Атомарные классы

**Атомарные классы** (AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference) предоставляют потокобезопасные операции без использования блокировок.[^15][^16]

```java
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet(); // атомарное увеличение
int value = counter.get(); // атомарное чтение
```

## Сравнение подходов к синхронизации

| Примитив | Использование | Преимущества | Недостатки |
| :-- | :-- | :-- | :-- |
| **synchronized** | Базовая синхронизация | Простота использования | Ограниченная функциональность |
| **ReentrantLock** | Расширенная синхронизация | Больше возможностей, справедливость | Более сложное использование |
| **Semaphore** | Контроль доступа к ресурсам | Ограничение количества потоков | Может привести к deadlock |
| **CountDownLatch** | Ожидание завершения операций | Простая координация | Одноразовое использование |
| **CyclicBarrier** | Синхронизация точек | Переиспользуемость | Может блокироваться навсегда |
| **volatile** | Видимость изменений | Высокая производительность | Не гарантирует атомарность |
| **Atomic классы** | Атомарные операции | Без блокировок | Ограничены одной переменной |

[^1]: https://www.guru99.com/ru/synchronization-in-java.html
[^2]: https://habr.com/ru/companies/otus/articles/830356/
[^3]: https://javarush.com/groups/posts/1055-sinkhronizacija-potokov-blokirovka-obhhekta-i-blokirovka-klassa
[^4]: https://javarush.com/groups/posts/1994-sinkhronizacija-potokov-operator-synchronized
[^5]: https://www.simplilearn.com/what-is-semaphore-in-java-uses-article
[^6]: https://www.geeksforgeeks.org/java/semaphore-in-java/
[^7]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CountDownLatch.html
[^8]: https://sky.pro/wiki/java/ispolzovanie-count-down-latch-v-mnogopotochnosti-java/
[^9]: https://jenkov.com/tutorials/java-util-concurrent/cyclicbarrier.html
[^10]: https://zetcode.com/java/cyclicbarrier/
[^11]: https://www.datacamp.com/doc/java/volatile
[^12]: https://jenkov.com/tutorials/java-concurrency/volatile.html
[^13]: https://www.digitalocean.com/community/tutorials/java-thread-wait-notify-and-notifyall-example
[^14]: https://dev.to/devcorner/mastering-wait-and-notify-in-java-a-producer-consumer-example-383a
[^15]: https://www.geeksforgeeks.org/java/atomic-variables-in-java-with-examples/
[^16]: https://download.java.net/java/early_access/panama/docs/api/java.base/java/util/concurrent/atomic/package-summary.html
