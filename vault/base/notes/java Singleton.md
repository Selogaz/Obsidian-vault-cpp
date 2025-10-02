---
tags:
  - note/specific/code
  - category/java
aliases:
  - Singleton
deck: obsidian::java
created: 2025-08-10T13:11:13+03:00
updated: 2025-10-01T18:05:04+03:00
---

**Singleton**
—
# Fill the gaps

Паттерн, гарантирующий, что будет создано не более 1 экземпляра класса.

Примеры: `Runtime.getRuntime()`, пул соединений с БД.

Варианты реализации:
- Double-check locking (Потокобезопасный ленивый вариант)
- Через элемент enum (Потокобезопасный ленивый вариант)
- Статическое поле класса, [[приватный конструктор]]

Часто одним из вариантов реализации называют создание бина со скоупом Singleton. Это не совсем верно, т.к. никто не запрещает создать ещё экземпляры этого класса через new или определить бин такого же класса, но с другим именем.

Синглтон считается [[java антипаттерн|антипаттерном]], потому что вводит глобальное состояние в приложение, к которому имеют доступ из любого места
- Повышается связность и сложность
- Усложняется тестирование - тесты становятся не изолированными, требуют сброса состояния синглтона, сложно использовать мок-объекты

# Refactoring guru
Гарантирует, что класс имеет единственный экземпляр, предоставляя глобальный доступ к этому экземпляру.

Чтобы его реализовать, нужно сделать *приватный конструктор*. Создать *статический метод*, который будет этот конструктор вызывать и сохранять всё в *статические поля*

```java
public final class Singleton {
    private static Singleton instance;
    public String value;

    private Singleton(String value) {
        // The following code emulates slow initialization.
        try {
            Thread.sleep(1000);
        } catch (InterruptedException ex) {
            ex.printStackTrace();
        }
        this.value = value;
    }

    public static Singleton getInstance(String value) {
        if (instance == null) {
            instance = new Singleton(value);
        }
        return instance;
    }
}

public class DemoSingleThread {
    public static void main(String[] args) {
        System.out.println("If you see the same value, then singleton was reused (yay!)" + "\n" +
                "If you see different values, then 2 singletons were created (booo!!)" + "\n\n" +
                "RESULT:" + "\n");
        Singleton singleton = Singleton.getInstance("FOO");
        Singleton anotherSingleton = Singleton.getInstance("BAR");
        System.out.println(singleton.value);
        System.out.println(anotherSingleton.value);
    }
}
```

```bash
If you see the same value, then singleton was reused (yay!)
If you see different values, then 2 singletons were created (booo!!)

RESULT:

FOO
FOO
```
