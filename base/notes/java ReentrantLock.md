---
tags:
  - note/specific/code
  - category/java
aliases:
  - ReentrantLock
deck: obsidian::java
created: 2025-07-16T14:30:41+03:00
updated: 2025-10-08T18:35:48+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**ReentrantLock**
—
это класс в пакете `java.util.concurrent.locks`, который реализует интерфейс `Lock` и предоставляет возможности взаимного исключения, аналогичные ключевому слову `synchronized`, но с дополнительными возможностями.[^1][^2]

### Основные возможности ReentrantLock

ReentrantLock предоставляет следующие возможности:

- **Повторное захватывание**: Поток может захватить блокировку несколько раз[^1][^3]
- **Справедливость**: Опциональная настройка справедливой очереди ожидания[^2][^4]
- **Условия**: Возможность создания условий через `newCondition()`[^1]
- **Прерывание**: Возможность прерывания ожидающих потоков[^1]

### Принцип работы ReentrantLock

ReentrantLock отслеживает "счетчик захватов" (hold count):

- Начинается с 1 при первом захвате блокировки
- Увеличивается при каждом повторном захвате
- Уменьшается при каждом освобождении
- Блокировка полностью освобождается, когда счетчик достигает нуля[^1]

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

[^1]: https://www.geeksforgeeks.org/java/reentrant-lock-in-java/
[^2]: https://docs.oracle.com/javase/jp/11/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html
[^3]: https://download.java.net/java/early_access/loom/docs/api/java.base/java/util/concurrent/locks/ReentrantLock.html
[^4]: https://docs.oracle.com/javase/8/docs/api/java/util/concurrent/locks/ReentrantLock.html
