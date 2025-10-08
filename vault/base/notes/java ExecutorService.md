---
tags:
  - note/specific/code
  - category/java
aliases:
  - ExecutorService
deck: obsidian::java
created: 2025-07-16T11:11:05+03:00
updated: 2025-10-06T19:19:16+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 270
---

**ExecutorService**
—
интерфейс в Java, который предоставляет удобный способ управления потоками исполнения и выполнения задач асинхронно. Он является расширением интерфейса `Executor` и предоставляет дополнительные возможности для управления жизненным циклом потоков.

### Основные характеристики ExecutorService

ExecutorService позволяет создавать пул потоков исполнения и выполнять задачи в этих потоках.[^1] Основные преимущества:

- **Управление жизненным циклом**: Методы `shutdown()` и `shutdownNow()` для корректного завершения работы[^2][^3]
- **Асинхронное выполнение**: Позволяет выполнять задачи в фоновом режиме[^4][^5]
- **Контроль выполнения**: Возможность получить `Future` для отслеживания состояния задач[^2][^4]

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

- **newFixedThreadPool(int)**: Создает пул с фиксированным количеством потоков[^6][^5]
- **newCachedThreadPool()**: Создает пул с переменным количеством потоков
- **newSingleThreadExecutor()**: Создает пул с единственным потоком

### Практическое применение

ExecutorService особенно полезен при работе с большим количеством задач. Например, вместо создания 100,000 потоков для 100,000 задач, можно создать пул из 10 потоков и передать все задачи в ExecutorService.[^1]
[[ExecutorService и ReentrantLock в Java_ Руководств]]

![[java fixedThreadPool]]

![[java cachedThreadPool]]

![[java singleThreadPool]]

![[java scheduledThreadPool]]

![[java newWorkStealingPool]]

![[java рекомендации по использованию пулов потоков]]

[^1]: https://dev.to/sonali_g_/executorservice-in-java-40bd
[^2]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/ExecutorService.html
[^3]: https://developer.android.com/reference/java/util/concurrent/ExecutorService
[^4]: https://habr.com/ru/articles/554608/
[^5]: https://jenkov.com/tutorials/java-util-concurrent/executorservice.html
[^6]: https://proselyte.net/java-executor-services/
