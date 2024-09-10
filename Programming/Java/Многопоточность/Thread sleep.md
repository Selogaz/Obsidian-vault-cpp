```java
Thread::sleep();
```
Приостанавливает работу потока на определенное количество мс.

```java
import static java.util.stream.IntStream.rangeClosed;  
  
public class Runner {  
    private static final int FROM_FIRST_THREAD = 1;  
    private static final int TO_FIRST_THREAD = 500;  
  
    private static final int FROM_SECOND_THREAD = 501;  
    private static final int TO_SECOND_THREAD = 1000;  
  
    private static final String TEMPLATE_MESSAGE_THREAD_NAME_AND_NUMBER = "%s : %d\n";  
  
    private static final int TIME_WAITING_IN_MILLIS = 1000;  
  
    public static void main(String[] args) throws InterruptedException {  
        TaskSummingNumbers firstTask = startSubTask(FROM_FIRST_THREAD, TO_FIRST_THREAD);  
        TaskSummingNumbers secondTask = startSubTask(FROM_SECOND_THREAD, TO_SECOND_THREAD);  
        waitForTasksFinished();  
        final int resultNumber = firstTask.getResultNumber() + secondTask.getResultNumber();  
        printThreadNameAndNumber(resultNumber);  
    }  
  
    private static TaskSummingNumbers startSubTask(final int fromNumber, final int toNumber) {  
        final TaskSummingNumbers subTask = new TaskSummingNumbers(fromNumber, toNumber);  
        final Thread thread = new Thread(subTask);  
        thread.start();  
        return subTask;  
    }  
  
    private static void printThreadNameAndNumber(final int number) {  
        System.out.printf(TEMPLATE_MESSAGE_THREAD_NAME_AND_NUMBER, Thread.currentThread().getName(), number);  
    }  
  
    private static void waitForTasksFinished() throws InterruptedException {  
        Thread.sleep(TIME_WAITING_IN_MILLIS);  
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