---
создал заметку: 2024-07-16
tags:
  - StreamAPI
  - промежуточные_операторы
---
метод, который преобразует один объект стрима в другой
```java
Stream<String> stream = Stream.of("aa", "b", "cccc");
Stream<Integer> streamInt = stream.map(str -> str.length());
```
Происходит преобразование элемента String в элемент Integer. Используется метод length(), который возвращает значение длины строки в int. Неявно происходит упаковка в Integer.