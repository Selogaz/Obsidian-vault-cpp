---
tags:
  - note/specific/code
  - category/java
aliases:
  - example
deck: obsidian::work
created: 2025-05-20 11:45:06+03:00
updated: 2025-06-04T19:43:37+03:00
sr-due: 2025-07-15
sr-interval: 41
sr-ease: 290
---

**Пример полиморфизма**
—
В зависимости от того, какой телефон передается в `callAnotherUser`, будут вызываться различные реализации метода `call`.
Давайте представим, что нам в программе нужно описать пользователя, который может пользоваться любыми моделями телефона, чтобы позвонить другому пользователю. Вот как можно это сделать:
```java
public class User {
    private String name;

    public User(String name) {
        this.name = name;
    }

    public void callAnotherUser(int number, AbstractPhone phone) {
// вот он полиморфизм - использование в коде абстактного типа AbstractPhone phone!
        phone.call(number);
    }
}
```

Теперь опишем различные модели телефонов. Одна из первых моделей телефонов:
```java
public class ThomasEdisonPhone extends AbstractPhone {

    public ThomasEdisonPhone(int year) {
        super(year);
    }

    @Override
    public void call(int outputNumber) {
        System.out.println("Вращайте ручку");
        System.out.println("Сообщите номер абонента, сэр");
    }

    @Override
    public void ring(int inputNumber) {
        System.out.println("Телефон звонит");
    }
}
```

Обычный стационарный телефон:
```java
public class Phone extends AbstractPhone {

    public Phone(int year) {
        super(year);
    }

    @Override
    public void call(int outputNumber) {
        System.out.println("Вызываю номер" + outputNumber);
    }

    @Override
    public void ring(int inputNumber) {
        System.out.println("Телефон звонит");
    }
}
```

И, наконец, крутой видеотелефон:
```java
public class VideoPhone extends AbstractPhone {

    public VideoPhone(int year) {
        super(year);
    }

    @Override
    public void call(int outputNumber) {
        System.out.println("Подключаю видеоканал для абонента " + outputNumber);
    }

    @Override
    public void ring(int inputNumber) {
        System.out.println("У вас входящий видеовызов..." + inputNumber);
    }
}
```

Создадим объекты в методе main() и протестируем метод callAnotherUser:
```java
AbstractPhone firstPhone = new ThomasEdisonPhone(1879);
AbstractPhone phone = new Phone(1984);
AbstractPhone videoPhone=new VideoPhone(2018);
User user = new User("Андрей");
user.callAnotherUser(224466,firstPhone);
// Вращайте ручку
//Сообщите номер абонента, сэр
user.callAnotherUser(224466,phone);
//Вызываю номер 224466
user.callAnotherUser(224466,videoPhone);
//Подключаю видеоканал для абонента 224466
```

Используя вызов одного и того же метода объекта user, мы получили различные результаты. *Выбор* конкретной реализации метода call внутри метода callAnotherUser *производился* динамически на основании конкретного типа вызывающего его объекта *в процессе выполнения программы*. В этом и заключается основное преимущество полиморфизма – *выбор реализации в процессе выполнения программы*.

В примерах классов телефонов, приведенных выше, мы использовали переопределение методов – прием, при котором *изменяется реализация* метода, определенная в базовом классе, *без изменения сигнатуры* метода. По сути, это является заменой метода, и именно новый метод, определенный в подклассе, вызывается при выполнении программы.

Обычно, при переопределении метода, используется аннотация @Override, которая подсказывает компилятору о необходимости проверить сигнатуры переопределяемого и переопределяющего методов.
