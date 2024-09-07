Благодаря этому интерфейсу можно взаимодействовать с результатами асинхронных вычислений. Future показывает результат выполнения асинхронной операции и предоставляет методы для проверки завершения операции, ожидания её завершения и извлечения результата.

В интерфейсе Future определены следующие основные методы:

- `boolean isDone():` Возвращает true, если операция завершена, то есть, готов результат.
    
- `boolean isCancelled():` Возвращает true, если операция была отменена до завершения.
    
- `boolean cancel(boolean mayInterruptIfRunning):` Пытается отменить выполнение задачи. Параметр mayInterruptIfRunning указывает, может ли быть прерван поток, выполняющий задачу.
    
- `V get():` Возвращает результат выполнения задачи. Если задача еще не завершена, вызывающий поток блокируется до её завершения.
    
- `V get(long timeout, TimeUnit unit):` Возвращает результат выполнения задачи, ожидая указанное количество времени. Если результат не готов в течение указанного времени, генерируется исключение TimeoutException.

Пример использования Future с Callable:

```java
import java.util.concurrent.*;
public class FutureExample {    
public static void main(String[] args) {        // Создаем пул потоков        
ExecutorService executor = Executors.newFixedThreadPool(1);        // Создаем объект Callable        
Callable<Integer> callableTask = () -> {            System.out.println("Выполняется в отдельном потоке");            
// Какая-то вычислительная работа
return 42;        
};        
// Передаем Callable задачу в ExecutorService        
Future<Integer> future = executor.submit(callableTask);        
try {
// Делаем что-то другое в основном потоке            
// Ждем завершения выполнения и получаем результат            
Integer result = future.get();            System.out.println("Результат: " + result);
} catch (InterruptedException | ExecutionException e) {            e.printStackTrace();        
}        // Завершаем ExecutorService        
executor.shutdown();
}}
```
Этот пример был выполнен с помощью интерфейса Callable для создания асинхронной задачи, а затем ее результат получили с применением Future, который используется для ожидания и получения итога выполнения задачи в асинхронном режиме. Метод `get()` блокирует вызывающий поток, пока результат не будет готов.

[[Callable]] [[Programming/Java/Многопоточность|Многопоточность]] 