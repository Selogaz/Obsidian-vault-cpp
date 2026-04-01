---
updated: 2025-07-16T14:31:39+03:00
---

<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# ExecutorService и ReentrantLock в Java: Руководство по многопоточности и синхронизации

## ExecutorService: Управление пулами потоков

**ExecutorService** — это интерфейс в Java, который предоставляет удобный способ управления потоками исполнения и выполнения задач асинхронно.[^1][^2] Он является расширением интерфейса `Executor` и предоставляет дополнительные возможности для управления жизненным циклом потоков.

### Основные характеристики ExecutorService

ExecutorService позволяет создавать пул потоков исполнения и выполнять задачи в этих потоках.[^3] Основные преимущества:

- **Управление жизненным циклом**: Методы `shutdown()` и `shutdownNow()` для корректного завершения работы[^1][^4]
- **Асинхронное выполнение**: Позволяет выполнять задачи в фоновом режиме[^5][^6]
- **Контроль выполнения**: Возможность получить `Future` для отслеживания состояния задач[^1][^5]

### Основные методы ExecutorService

```java
// Создание пула потоков
ExecutorService executorService = Executors.newFixedThreadPool(10);

// Выполнение задач
executorService.execute(new Runnable() {
    public void run() {
        System.out.println("Asynchronous task");
    }
});

// Получение Future для контроля выполнения
Future<String> future = executorService.submit(new Callable<String>() {
    public String call() {
        return "Result";
    }
});

// Завершение работы
executorService.shutdown();
```

### Реализации ExecutorService

Наиболее распространенные реализации создаются через фабричные методы класса `Executors`:

- **newFixedThreadPool(int)**: Создает пул с фиксированным количеством потоков[^2][^6]
- **newCachedThreadPool()**: Создает пул с переменным количеством потоков
- **newSingleThreadExecutor()**: Создает пул с единственным потоком

### Практическое применение

ExecutorService особенно полезен при работе с большим количеством задач. Например, вместо создания 100,000 потоков для 100,000 задач, можно создать пул из 10 потоков и передать все задачи в ExecutorService.[^3]

## ReentrantLock: Расширенная блокировка

**ReentrantLock** — это класс в пакете `java.util.concurrent.locks`, который реализует интерфейс `Lock` и предоставляет возможности взаимного исключения, аналогичные ключевому слову `synchronized`, но с дополнительными возможностями.[^7][^8]

### Основные возможности ReentrantLock

ReentrantLock предоставляет следующие возможности:

- **Повторное захватывание**: Поток может захватить блокировку несколько раз[^7][^9]
- **Справедливость**: Опциональная настройка справедливой очереди ожидания[^8][^10]
- **Условия**: Возможность создания условий через `newCondition()`[^7]
- **Прерывание**: Возможность прерывания ожидающих потоков[^7]

### Принцип работы ReentrantLock

ReentrantLock отслеживает "счетчик захватов" (hold count):

- Начинается с 1 при первом захвате блокировки
- Увеличивается при каждом повторном захвате
- Уменьшается при каждом освобождении
- Блокировка полностью освобождается, когда счетчик достигает нуля[^7]

### Пример использования ReentrantLock

```java
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();
    
    public void increment() {
        lock.lock();
        try {
            count++;
            System.out.println(Thread.currentThread().getName() + 
                             " incremented count to: " + count);
        } finally {
            lock.unlock();
        }
    }
    
    public int getCount() {
        lock.lock();
        try {
            return count;
        } finally {
            lock.unlock();
        }
    }
}
```

### Методы ReentrantLock

| Метод                                  | Описание                                           |
| :------------------------------------- | :------------------------------------------------- |
| `lock()`                               | Захватывает блокировку                             |
| `unlock()`                             | Освобождает блокировку                             |
| `tryLock()`                            | Пытается захватить блокировку немедленно           |
| `tryLock(long timeout, TimeUnit unit)` | Пытается захватить блокировку с таймаутом          |
| `lockInterruptibly()`                  | Захватывает блокировку с возможностью прерывания   |
| `getHoldCount()`                       | Возвращает количество захватов текущим потоком     |
| `isHeldByCurrentThread()`              | Проверяет, захвачена ли блокировка текущим потоком |

## Примитивы синхронизации в Java

Java предоставляет множество примитивов синхронизации для координации работы потоков.[^11][^12]

### Ключевое слово synchronized

**synchronized** — это базовый механизм синхронизации в Java.[^13][^14] Он может применяться к методам или блокам кода:

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

### Семафоры (Semaphore)

**Semaphore** — это примитив синхронизации, который контролирует доступ к ресурсу через счетчик разрешений.[^15][^16] Используется для ограничения количества потоков, которые могут получить доступ к ресурсу одновременно.

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

**CountDownLatch** — это синхронизационный примитив, который позволяет одному или нескольким потокам ждать, пока другие потоки не завершат выполнение определенного количества операций.[^17][^18]

```java
CountDownLatch latch = new CountDownLatch(3);

// В рабочих потоках
latch.countDown(); // уменьшает счетчик

// В основном потоке
latch.await(); // ожидает, пока счетчик не станет 0
```

### CyclicBarrier

**CyclicBarrier** — это точка синхронизации, где указанное количество потоков встречается и блокируется до тех пор, пока все не достигнут барьера.[^19][^20] В отличие от CountDownLatch, CyclicBarrier может использоваться повторно.

```java
CyclicBarrier barrier = new CyclicBarrier(3);

// В каждом потоке
barrier.await(); // ждет, пока все потоки не достигнут барьера
```

### Volatile

**volatile** — это ключевое слово, которое гарантирует видимость изменений переменной между потоками.[^21][^22] Переменная помечается как volatile, чтобы обеспечить чтение из основной памяти, а не из кэша процессора.

```java
private volatile boolean running = true;
```

### wait() И notify()

**wait()** и **notify()** — это методы класса Object для координации работы потоков.[^23][^24] Они должны вызываться только внутри синхронизированных блоков или методов.

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

**Атомарные классы** (AtomicInteger, AtomicLong, AtomicBoolean, AtomicReference) предоставляют потокобезопасные операции без использования блокировок.[^25][^26]

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

## Заключение

ExecutorService и ReentrantLock являются мощными инструментами для работы с многопоточностью в Java. ExecutorService упрощает управление пулами потоков и асинхронным выполнением задач, тогда как ReentrantLock предоставляет расширенные возможности синхронизации по сравнению с базовым synchronized. Выбор конкретного примитива синхронизации зависит от специфических требований приложения и сложности задач координации потоков.

<div style="text-align: center">⁂</div>

[^1]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ExecutorService.html
[^2]: https://proselyte.net/java-executor-services/
[^3]: https://dev.to/sonali_g_/executorservice-in-java-40bd
[^4]: https://developer.android.com/reference/java/util/concurrent/ExecutorService
[^5]: https://habr.com/ru/articles/554608/
[^6]: https://jenkov.com/tutorials/java-util-concurrent/executorservice.html
[^7]: https://www.geeksforgeeks.org/java/reentrant-lock-in-java/
[^8]: https://docs.oracle.com/javase/jp/11/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html
[^9]: https://download.java.net/java/early_access/loom/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html
[^10]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/ReentrantLock.html
[^11]: https://www.guru99.com/ru/synchronization-in-java.html
[^12]: https://habr.com/ru/companies/otus/articles/830356/
[^13]: https://javarush.com/groups/posts/1055-sinkhronizacija-potokov-blokirovka-obhhekta-i-blokirovka-klassa
[^14]: https://javarush.com/groups/posts/1994-sinkhronizacija-potokov-operator-synchronized
[^15]: https://www.simplilearn.com/what-is-semaphore-in-java-uses-article
[^16]: https://www.geeksforgeeks.org/java/semaphore-in-java/
[^17]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/CountDownLatch.html
[^18]: https://sky.pro/wiki/java/ispolzovanie-count-down-latch-v-mnogopotochnosti-java/
[^19]: https://jenkov.com/tutorials/java-util-concurrent/cyclicbarrier.html
[^20]: https://zetcode.com/java/cyclicbarrier/
[^21]: https://www.datacamp.com/doc/java/volatile
[^22]: https://jenkov.com/tutorials/java-concurrency/volatile.html
[^23]: https://www.digitalocean.com/community/tutorials/java-thread-wait-notify-and-notifyall-example
[^24]: https://dev.to/devcorner/mastering-wait-and-notify-in-java-a-producer-consumer-example-383a
[^25]: https://www.geeksforgeeks.org/java/atomic-variables-in-java-with-examples/
[^26]: https://download.java.net/java/early_access/panama/docs/api/java.base/java/util/concurrent/atomic/package-summary.html
