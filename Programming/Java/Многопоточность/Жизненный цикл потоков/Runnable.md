Поток переходит в состояние готовности, когда вызывается метод `start()`. Но его финальную готовность определяет система планирования операционной системы — она решает, когда поток будет выделен для выполнения.
![[Pasted image 20240911000056.png]]

```java
public class Runner {  
  
    private static final String MESSAGE_TEMPLATE_THREAD_STATE = "%s : %s\n";  
  
    public static void main(final String[] args) {  
        final Thread thread = new Thread(() -> showThreadState(Thread.currentThread()));  
        showThreadState(thread);  
        thread.start();  
  
    }  
  
    private static void showThreadState(final Thread thread) {  
        System.out.printf(String.format(MESSAGE_TEMPLATE_THREAD_STATE, thread.getName(),  
                thread.getState()));  
    }  
  
  
}
```

[[Жизненный цикл потоков]]