Расширяемый пул потоков с множеством параметров, с помощью которых можно регулировать этот пул потоков.

```java
ThreadPoolExecutor executor = 
	(ThreadPoolExecutor) Executors.newMixedThreadPool(5);
executor.setCorePoolSize(5);//кол-во потоков по умолчанию
executor.setMaximumPoolSize(8);//если в коде создаются потоки, то их количество может увеличиться до этого значения
```

[[Executor]] [[Executors]] 