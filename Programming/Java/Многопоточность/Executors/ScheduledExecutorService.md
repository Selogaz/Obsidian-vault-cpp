```java
ScheduledExecutorService service = Executors.newScheduledThreadPool(5);
service.schedule(()-> System.out.println("YES"), 1000, TimeUnit.MILLISECONDS);//запустить через 1с
service.scheduleAtFixedRate(()-> System.out.println("YES"), 1000, 2000, TimeUnit.MILLISECONDS);//запускать каждые 2000мс после старта программы, первый запуск через 1000мс
service.scheduleWithFixedDelay()//после окончания работы программы
```

[[ExecutorService]] 