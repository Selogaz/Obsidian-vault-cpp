Когда выполнение метода `run()` завершается, поток переходит в состояние завершения. Это может произойти при естественном завершении выполнения кода или в случае вызова метода `stop()`. После завершения выполнения поток больше не может быть запущен. Также в случае выброса необработанного исключения поток тоже переходит в состояние `terminated` 

![[Pasted image 20240911002811.png]]

```java
  
public class Runner {  

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

Если в потоке произошло исключение, остальные потоки будут работать дальше.
[[Жизненный цикл потоков]]