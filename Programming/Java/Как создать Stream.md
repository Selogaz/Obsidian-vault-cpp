---
tags:
  - StreamAPI
создал заметку: 2024-07-16
---
Пустой Stream - принимает тип в <>
```java
Stream<Integer> stream = Stream.empty();
```

Stream на основе перечисления
```java
Stream<String> stream = Stream.of("a","b","c");
```

Stream на основе Collection (List, Set, Queue...), методы получения стрима stream()
```java
List<Double> doubleList = List.of(10, 20, 30);
Stream<Double> stream = doubleList.stream();
```

Stream на основе Map, получаем EntrySet<> -> это коллекция Set
```java
Map<String, Integer> map = Map.of("se", 2, "ddl", 3);
Stream<Entry<String, Integer>> stream = map.entrySet().stream();
```

Для создания Stream можно использовать массивы long, double, int. В итоге получаются стримы LongStream, DoubleStream, IntStream.
```java
double[] dArray = new double[]{3.4, 5.6};
DoubleStream stream = Arrays.stream(dArray);
```

Бесконечный стрим:
```java
Stream<Order> stream = Stream.generate(() -> Order.random());
```

Генерация стрима с ограничением:
```java
Stream<Order> stream = Stream.generate((Order::random).limit(10);//указатель на метод, короткая запись лямбды
```

Использование range/rangeClosed (значения от 0 до 10). Closed означает, что включительно
```java
IntStream intStream = IntStream.rangeClosed(0, 10);
```

Получение псевдорандомных значений double от 0 до 1.0 не включительно:
```java
DoubleStream doubleStream = ThreadLocalRandom.current()
	.doubles()
	.limit(10);
```

Объединение стримов:
```java
Stream<String> stringStream = Stream.concat(Stream.of("cdek"), Stream.of("dev"));
```

Можно написать свою реализацию создания Stream, используя Spliterator. стримы LongStream, DoubleStream, IntStream оптимизированы и работают быстрее

[[StreamAPI]]