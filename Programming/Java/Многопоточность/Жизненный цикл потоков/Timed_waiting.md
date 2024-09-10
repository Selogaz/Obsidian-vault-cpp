Тот же waiting, но с указанием времени.
![[Pasted image 20240911002133.png]]

```java
  
public class Runner {  
  
    private static final String MESSAGE_TEMPLATE_THREAD_STATE = "%s : %s\n";  
  
    private static final int AMOUNT_MILLISECONDS_TO_SLEEP_IN_MAIN_THREAD = 1000;  
  
    private static final int AMOUNT_MILLISECONDS_TO_JOIN_IN_THREAD_ON_MAIN_THREAD = 2000;  
  
    public static void main(final String[] args) throws InterruptedException {  
        final Thread mainThread = Thread.currentThread();  
        final Thread thread = new Thread(() -> {  
            try {  
                mainThread.join(AMOUNT_MILLISECONDS_TO_JOIN_IN_THREAD_ON_MAIN_THREAD);//ждем, пока выполнится поток main  
                showThreadState(Thread.currentThread());//runnable  
            } catch (InterruptedException e) {  
                throw new RuntimeException(e);  
            }  
        });  
        thread.start();  
        Thread.sleep(AMOUNT_MILLISECONDS_TO_SLEEP_IN_MAIN_THREAD);  
        showThreadState(thread);//w8ing  
    }  
  
    private static void showThreadState(final Thread thread) {  
        System.out.printf(String.format(MESSAGE_TEMPLATE_THREAD_STATE, thread.getName(),  
                thread.getState()));  
    }  
  
  
}
```

[[Жизненный цикл потоков]]

