Когда выполнение метода `run()` завершается, поток переходит в состояние завершения. Это может произойти при естественном завершении выполнения кода или в случае вызова метода `stop()`. После завершения выполнения поток больше не может быть запущен.

![[Pasted image 20240911002811.png]]

```java
  
public class Runner {  
  
    private static final String MESSAGE_TEMPLATE_THREAD_STATE = "%s : %s\n";  
  
    private static final int AMOUNT_MILLISECONDS_TO_SLEEP_IN_MAIN_THREAD = 1000;  
  
    private static final int AMOUNT_MILLISECONDS_TO_JOIN_IN_THREAD_ON_MAIN_THREAD = 2000;  
  
    public static void main(final String[] args) throws InterruptedException {  
        final Thread thread = new Thread(() -> showThreadState(Thread.currentThread()));  
        thread.start();  
        thread.join();  
        showThreadState(thread);  
    }  
  
    private static void showThreadState(final Thread thread) {  
        System.out.printf(String.format(MESSAGE_TEMPLATE_THREAD_STATE, thread.getName(),  
                thread.getState()));  
    }  
  
  
}
```

[[Жизненный цикл потоков]]