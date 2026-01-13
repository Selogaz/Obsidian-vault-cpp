---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-06-02 13:20:36+03:00
updated: 2025-09-28T06:30:10+03:00
sr-due: 2025-10-16
sr-interval: 18
sr-ease: 250
---

**Generics**
—
```table-of-contents
```
# Стирание типов
Стирание типов (Type Erasure) - механизм в Java, при котором *информация о generic-типах удаляется* во время компиляции. При этом компилятор *добавляет дополнительные приведения типов* и заменяет generic типы на Object.
```java
List<String> strList = new ArrayList<>();
strList.add(“a”);
String value = strList.get(0);
```
Преобразуется компилятором в
```java
List strList = new ArrayList();
strList.add(“a”);
String value = (String) strList.get(0);
```

Дженерики реализованы по-разному в разных языках программирования. В java используется стирание типов для обратной совместимости с ранними версиями java, где дженериков не было.

# Ограничения использования дженериков:

## Нельзя явно создать экземпляр

```java
public static <E> void append(List<E> list) { 
    E elem = new E(); // ошибка компиляции
}

```

## Нельзя создать статическое поле

```java
public class MobileDevice<T> { 
   private static T type;  // ошибка компиляции
}

```
Статические поля существуют в единственном экземпляре. При наличии нескольких типизированных объектов (например, `MobileDevice<Smartphone>`, `MobileDevice<TabletPC>` будет непонятно, какого типа должно быть это поле.
## Нельзя использовать внутри instanceof
```java
if (list instanceof ArrayList<Integer>) // ошибка компиляции
```
## Нельзя создать массив дженерик типа
```java
List<Integer>[] arrayOfLists = new ArrayList<Integer>[2]
```
## Нельзя использовать в исключениях и внутри catch блоков
```java
class MathException<T> extends Exception // ошибка компиляции

```
## Перегруженные методы должны отличаться не только дженерик типом
```java
public class Example { 
  public void print(Set<String> strSet) { } // ошибка компиляции
  public void print(Set<Integer> intSet) { } 
}

```

Набор свойств языка, позволяющих использовать обобщенные типы и методы. Отличаются от обычных тем, что *имеют типизированные параметры*.

Примером может служить [[Java Collections Framework]]. Класс [[LinkedList|`LinkedList<E>`]] - типичный обобщенный тип. `E` - тип элементов, которые будут храниться в коллекции. Создание обобщенных типов происходит посредством *замены параметризированных типов реальными*
Использование - `LinkedList<String>`, `LinkedList<Integer>` и т.д.
