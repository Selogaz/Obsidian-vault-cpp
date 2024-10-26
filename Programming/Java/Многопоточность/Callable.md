#### Интерфейс Runnable

**1. Возвращаемое значение.** Runnable не предоставляет способа возвращать результат выполнения задачи.

**2. Исключения.** Runnable не бросает проверяемые исключения (за исключением тех, которые являются подклассами RuntimeException).

#### Интерфейс Callable

**1. Возвращаемое значение:** Callable предоставляет возможность возвращать результат выполнения задачи.

**2. Исключения:** Callable позволяет бросать проверяемые исключения.

**3. Метод:** Он содержит метод `call()`, который аналогичен методу `run()` в интерфейсе Runnable, но может возвращать значение и бросать проверяемые исключения.

```java
Callable callable = ()-> {
	double sum = 0;
	for (int i = 0; i < 1000; i++) {
		sum += Math.random();
	}
	if (sum < 0.6) {
		throw new IllegalArgumentException("fdfdfd");
	}
	return sum / 1000;
}

FutureTask<Double> futureTask = new FutureTask(callable);
new Thread(futureTask).start();
try {
	System.out.println(futureTask.get());
} catch (InterruptedException e) {
	e.printStackTrace();
} catch (ExecutionException e) {
	e.printStackTrace();
}
```

[[Интерфейс Runnable]] [[Programming/Java/Многопоточность|Многопоточность]] [[FutureTask]]