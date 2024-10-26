Вместо принудительной остановки потока необходимо использовать метод оповещения о прекращении работы потока - `interrupt()`. Данный метод установит флаг прерывания потока (прекращения работы), который можно проверить методом `isInterrupted()` и указать логику его обработки и завершения работы потока.

Если же поток был заблокирован, находился в ожидании (wait, sleep, join), то будет сброшен флаг прерывания и выброшено исключение `InterruptedException`. В таком случае, после обработки исключения и для прерывания потока, необходимо заново установить флаг прерывания методом `interrupt()`.

```java
import java.util.concurrent.TimeUnit;  
  
public class Runner {  
  
    private static final String MESSAGE_REQUEST_WAS_SENT = "\nRequest was sent.";  
    private static final int DURATION_IN_SECONDS_DELIVERING_RESPONSE = 1;  
    private static final String MESSAGE_RESPONSE_WAS_RECEIVED = "Response was received.";  
    private static final String MESSAGE_SERVER_WAS_STOPPED = "Server was stopped.";  
    private static final long TIME_WAITING_IN_SECONDS_TO_START_STOPPING_THREAD = 5;  
    private static final String MESSAGE_THREAD_WAS_INTERRUPTED =  "Thread was interrupted.";  
  
    public static void main(final String[] args) throws InterruptedException {  
        final Thread communicatingThread = new Thread(() -> {  
           try {  
               while(!Thread.currentThread().isInterrupted()) {  
                   doRequest();  
               }  
           } catch (final InterruptedException e) {  
               Thread.currentThread().interrupt();  
               System.out.println(Thread.currentThread().isInterrupted());  
               System.out.println(MESSAGE_THREAD_WAS_INTERRUPTED);  
           }  
        });  
        communicatingThread.start();  
  
        final Thread stoppingThread = new Thread(() -> {  
           if (isServerShouldBeOffed()) {  
               //communicatingThread.stop();  
               communicatingThread.interrupt();  
               stopServer();  
           }  
        });  
        TimeUnit.SECONDS.sleep(TIME_WAITING_IN_SECONDS_TO_START_STOPPING_THREAD);  
        stoppingThread.start();  
    }  
  
    private static void doRequest() throws InterruptedException {  
        System.out.println(MESSAGE_REQUEST_WAS_SENT);  
        TimeUnit.SECONDS.sleep(DURATION_IN_SECONDS_DELIVERING_RESPONSE);  
        System.out.println(MESSAGE_RESPONSE_WAS_RECEIVED);  
    }  
  
    private static boolean isServerShouldBeOffed() {  
        return true;  
    }  
  
    private static void stopServer() {  
        System.out.println(MESSAGE_SERVER_WAS_STOPPED);  
    }  
}
```

[[Thread]]