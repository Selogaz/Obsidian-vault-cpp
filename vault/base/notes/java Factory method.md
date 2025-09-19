---
tags:
  - note/specific/code
  - category/java
aliases:
  - Factory method
deck: obsidian::java
created: 2025-08-10T12:24:43+03:00
updated: 2025-08-10T12:26:44+03:00
---

**Factory method**
—
Предоставляет интерфейс для создания объектов в суперклассе, но позволяет подклассам менять тип объектов, которые будут созданы. Этот паттерн помогает делегировать процесс создания объектов отдельному классу, что упрощает управление и расширение кода.

- Когда нужно обеспечить возможность расширения системы новыми типами продуктов.
- Когда логика создания объектов должна быть отделена от клиентского кода.

```java
// Продукт (Product)
interface Shape {
    void draw();
}

// Конкретные продукты (Concrete Products)
class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Рисуем круг");
    }
}

class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Рисуем квадрат");
    }
}

class Triangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Рисуем треугольник");
    }
}

// Создатель (Creator)
abstract class ShapeFactory {
    // Фабричный метод
    public abstract Shape createShape();

    // Дополнительный метод для использования продукта
    public void renderShape() {
        Shape shape = createShape();
        shape.draw();
    }
}

// Конкретные создатели (Concrete Creators)
class CircleFactory extends ShapeFactory {
    @Override
    public Shape createShape() {
        return new Circle();
    }
}

class SquareFactory extends ShapeFactory {
    @Override
    public Shape createShape() {
        return new Square();
    }
}

class TriangleFactory extends ShapeFactory {
    @Override
    public Shape createShape() {
        return new Triangle();
    }
}

// Использование
public class FactoryMethodDemo {
    public static void main(String[] args) {
        // Создаем фабрики для разных фигур
        ShapeFactory circleFactory = new CircleFactory();
        ShapeFactory squareFactory = new SquareFactory();
        ShapeFactory triangleFactory = new TriangleFactory();

        // Рисуем фигуры
        circleFactory.renderShape();  // Output: Рисуем круг
        squareFactory.renderShape();  // Output: Рисуем квадрат
        triangleFactory.renderShape(); // Output: Рисуем треугольник
    }
}
```

Еще существует <font color="#ffff00">Simple Factory</font> и <font color="#ffff00">Abstract Factory</font>

- [ ] #task/inbox #category/work Simple Factory
- [ ] #task/inbox #category/work Abstract Factory
