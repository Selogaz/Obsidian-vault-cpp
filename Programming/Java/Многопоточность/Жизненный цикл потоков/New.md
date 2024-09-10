На этой стадии поток только что был создан, но еще не запущен. Чтобы его создать, необходимо сформировать объект класса Thread и, при необходимости, передать ему объект, реализующий интерфейс Runnable.

![[Pasted image 20240910234910.png]]

```java
  
public class Runner {  
  
    private static final String MESSAGE_TEMPLATE_THREAD_STATE = "%s : %s\n";  
  
    public static void main(final String[] args) {  
        final Thread thread = new Thread(() -> showThreadState(Thread.currentThread()));  
        showThreadState(thread);  
  
    }  
  
    private static void showThreadState(final Thread thread) {  
        System.out.printf(String.format(MESSAGE_TEMPLATE_THREAD_STATE, thread.getName(),  
                thread.getState()));  
    }  
  
  
}
```

[[Жизненный цикл потоков]]