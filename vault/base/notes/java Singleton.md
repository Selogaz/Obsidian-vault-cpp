---
tags:
  - note/specific/code
  - category/java
aliases:
  - Singleton
deck: obsidian::java
created: 2025-08-10T13:11:13+03:00
updated: 2025-08-10T13:12:57+03:00
---

**Singleton**
—
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
