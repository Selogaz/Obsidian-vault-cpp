---
tags:
  - note/specific/code
  - category/java
aliases:
  - паттерны gof
deck: obsidian::java
created: 2025-10-01T20:13:43+03:00
updated: 2025-10-06T19:28:28+03:00
sr-due: 2025-10-10
sr-interval: 4
sr-ease: 270
---

**паттерны gof**
—
GoF - Gang of Four - написаны "Бандой четырех" )
Design Patterns: Elements of Reusable Object-Oriented Software

Делятся на 3 группы:
- Порождающие: для создания объектов
- Структурные: упрощают организацию классов
- Поведенческие: организуют взаимодействие объектов

# Порождающие паттерны

## [[java Singleton|Singleton]]

## [[java Factory method|Factory method]]

## [[java abstract factory|Abstract Factory]]

## [[java builder|Builder]]

## [[java prototype|Prototype]]

# Структурные паттерны

## [[java Adapter|Adapter]]

## [[java bridge|Bridge]]

## [[java composite|Composite]]

## [[java Decorator|Decorator]]

## [[java Facade|Facade]]

## [[java flyweight|Flyweight]]

## [[java Proxy|Proxy]]

# Поведенческие паттерны

## [[java chain of responsibility|Chain of Responsibility]]

## [[java command|Command]]

## [[java interpreter|Interpreter]]

## [[java iterator|Iterator]]

## [[java mediator|Mediator]]

## [[java memento|Memento]]

## [[java паттерн наблюдатель|Observer]]

## [[java state|State]]

## [[java Strategy|Strategy]]

## [[java template method|Template Method]]

# Сравнение: [[java Adapter|адаптер]], [[java Decorator|декоратор]], [[java Proxy|прокси]]

По реализации это все классы-обёртки. Отличаются целью и интерфейсом, который доступен конечному клиенту.

Пример: у класса Calculator есть метод add(int a, int b)
Адаптер меняет интерфейс для других клиентов. Пользователь использует *интерфейс адаптера*, чтобы получить доступ к *функциям исходного класса*.

Пример: класс RomanCalculator с методом add(String a, String b). Принимает на вход строки с римскими цифрами, затем вызывает метод add у Calculator:
```java
RomanCalculator calc = new RomanCalculator();
String res = calc.add("IX, "VI");
```
Декоратор добавляет новую функциональность. Пользователь использует *интерфейс декоратора* для доступа к *новым* методам.

Пример: класс VoiceCalculator с методами для голосового ввода команд:
```java
VoiceCalculator calc = new VoiceCalculator();
int res = calc.processVoiceCommand();
```
[[java Proxy|Proxy]] добавляет *скрытую* функциональность, пользователь использует *интерфейс исходного класса*

Пример: класс LoggingCalculator логирует действия пользователя:
```java
Calculator calc = new LoggingCalculator();
int res = calc.add(1,2);
```

# Сравнение: фабрика и фабричный метод

- фабрика создаёт группы связанных объектов
- фабричный метод - статический метод для создания одного объекта

Данная трактовка фабричного метода отличается от каноничной, но она часто используется на практике и принимается на собеседованиях

# Дополнительные материалы
[[java паттерны проектирования|паттерны проектирования]]
[[sources/refactoring guru|refactoring guru]] - каноничное описание паттернов GoF
[[java builder для продвинутых]] - https://t.me/java_fillthegaps/553
[[java fluent api]]
[[java fluent api vs builder]]
