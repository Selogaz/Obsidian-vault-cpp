Останавливает работу потока до того момента, пока не завершится поток, его вызвавший.

![[Pasted image 20240910233743.png]]

```java
import static java.util.stream.IntStream.rangeClosed;  
  
public class Runner {  
    private static final int FROM_FIRST_THREAD = 1;  
    private static final int TO_FIRST_THREAD = 500;  
  
    private static final int FROM_SECOND_THREAD = 501;  
    private static final int TO_SECOND_THREAD = 1000;  
  
    private static final String TEMPLATE_MESSAGE_THREAD_NAME_AND_NUMBER = "%s : %d\n";  
  
  
    public static void main(String[] args) throws InterruptedException {  
        TaskSummingNumbers firstTask = new TaskSummingNumbers(FROM_FIRST_THREAD, TO_FIRST_THREAD);  
        Thread firstThread = new Thread(firstTask);  
        firstThread.start();  
        TaskSummingNumbers secondTask = new TaskSummingNumbers(FROM_SECOND_THREAD, TO_SECOND_THREAD);  
        Thread secondThread = new Thread(secondTask);  
        secondThread.start();  
        waitForTasksFinished(firstThread, secondThread);  
        final int resultNumber = firstTask.getResultNumber() + secondTask.getResultNumber();  
        printThreadNameAndNumber(resultNumber);  
    }  
  
    private static void printThreadNameAndNumber(final int number) {  
        System.out.printf(TEMPLATE_MESSAGE_THREAD_NAME_AND_NUMBER, Thread.currentThread().getName(), number);  
    }  
  
    private static void waitForTasksFinished(Thread... threads) throws InterruptedException {  
        for (Thread thread : threads) {  
            thread.join();  
        }  
    }  
  
    private static final class TaskSummingNumbers implements Runnable {  
  
        private static final int INITIAL_VALUE_RESULT = 0;  
  
        private final int fromNumber;  
  
        private final int toNumber;  
  
        private int resultNumber;  
  
        public TaskSummingNumbers(final int fromNumber, final int toNumber ) {  
            this.fromNumber = fromNumber;  
            this.toNumber = toNumber;  
            this.resultNumber = INITIAL_VALUE_RESULT;  
        }  
  
        public int getResultNumber() {  
            return resultNumber;  
        }  
  
        @Override  
        public void run() {  
            rangeClosed(this.fromNumber, this.toNumber).forEach(i -> this.resultNumber += i);  
            printThreadNameAndNumber(resultNumber);        }  
    }  
}
```

[[Programming/Java/Многопоточность|Многопоточность]]