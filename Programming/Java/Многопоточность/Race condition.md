Состояние гонки. Возникает, когда в нескольких потоках выполняется не атомарная операция. Место, где происходит Race condition называют [[Критическая секция]] 

```java
import java.util.concurrent.ThreadFactory;  
import java.util.stream.IntStream;  
  
public class Runner {  
  
    private static int counter = 0;  
    private static final int INCREMENT_AMOUNT_FIRST_THREAD = 500;  
    private static final int INCREMENT_AMOUNT_SECOND_THREAD = 600;  
  
    public static void main(final String[] args) throws InterruptedException {  
        final Thread firstThread = createIncrementingCounterThread(INCREMENT_AMOUNT_FIRST_THREAD);  
        final Thread secondThread = createIncrementingCounterThread(INCREMENT_AMOUNT_SECOND_THREAD);  
  
        firstThread.start();  
        secondThread.start();  
  
        firstThread.join();  
        secondThread.join();  
  
        System.out.println(counter);  
  
    }  
  
    private static Thread createIncrementingCounterThread(final int incrementAmount) {  
        return new Thread(() -> IntStream.range(0,INCREMENT_AMOUNT_FIRST_THREAD).forEach(i -> counter++));  
    }  
}
```


[[Programming/Java/Многопоточность|Многопоточность]] 