Объект, который создает новые потоки по требованию. Использование фабрик потоков устраняет жесткое связывание вызовов [`new Thread`](https://docs-oracle-com.translate.goog/javase/8/docs/api/java/lang/Thread.html?_x_tr_sl=auto&_x_tr_tl=ru&_x_tr_hl=ru#Thread-java.lang.Runnable-), позволяя приложениям использовать специальные подклассы потоков, приоритеты и т. д.

```java
import java.util.concurrent.ThreadFactory;  
  
public class Runner {  
  
    private static final String MESSAGE_EXCEPTION_TEMPLATE = "Exception was thrown with message '%s' in " +  
            "thread '%s'.\n";  
    private static final String MESSAGE_EXCEPTION = "I'm exception";  
  
    public static void main(final String[] args) throws InterruptedException {  
        final Thread.UncaughtExceptionHandler uncaughtExceptionHandler = (thread, exception)  
                -> System.out.printf(MESSAGE_EXCEPTION_TEMPLATE, exception.getMessage(),  
                thread.getName());  
        final ThreadFactory threadFactory = new DaemonThreadWithUncaughtExceptionHandlerFactory(uncaughtExceptionHandler);  
  
        final Thread firstThread = threadFactory.newThread(new Task());  
        firstThread.start();  
  
        final Thread secondThread = threadFactory.newThread(new Task());  
        secondThread.start();  
  
        firstThread.join();  
        secondThread.join();  
    }  
  
    private static final class Task implements Runnable {  
        @Override  
        public void run() {  
            System.out.println(Thread.currentThread().isDaemon());  
            throw new RuntimeException(MESSAGE_EXCEPTION);  
        }  
    }  
  
    private static final class DaemonThreadWithUncaughtExceptionHandlerFactory  
            implements ThreadFactory {  
  
        private final Thread.UncaughtExceptionHandler uncaughtExceptionHandler;  
  
        public DaemonThreadWithUncaughtExceptionHandlerFactory(final Thread.UncaughtExceptionHandler uncaughtExceptionHandler) {  
            this.uncaughtExceptionHandler = uncaughtExceptionHandler;  
        }  
  
        @Override  
        public Thread newThread(final Runnable runnable) {  
            final Thread thread = new Thread(runnable);  
            thread.setUncaughtExceptionHandler(this.uncaughtExceptionHandler);  
            thread.setDaemon(true);  
            return thread;  
        }  
    }  
}
```