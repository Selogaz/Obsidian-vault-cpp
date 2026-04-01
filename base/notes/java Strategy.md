---
tags:
  - note/specific/code
  - category/java
aliases:
  - Strategy
deck: obsidian::java
created: 2025-08-10T12:04:51+03:00
updated: 2025-10-16T10:37:11+03:00
sr-due: 2025-11-15
sr-interval: 30
sr-ease: 290
---

**Strategy**
—
# Fill the gaps
набор алгоритмов для какой-то задачи. Как паттерн [[java command|command]], только для группы связанных функций.

# Refactoring guru
Позволяет определить семейство алгоритмов, поместить каждый из них в отдельный класс и сделать их объекты взаимозаменяемыми.

1. Навигационные системы:
    - Различные алгоритмы маршрутизации (например, кратчайший путь, самый быстрый путь).
2. Сжатие данных:
    - Разные алгоритмы сжатия (например, ZIP, RAR, LZMA).
3. Обработка платежей:
    - Разные способы оплаты (например, кредитной картой, PayPal, криптовалютой).
4. Игры:
    - Разные стратегии поведения персонажей (например, агрессивное, пассивное, случайное).

```java
// Интерфейс стратегии (Strategy)
interface SortingStrategy {
    int[] sort(int[] data);
}

// Конкретная стратегия 1: Быстрая сортировка
class QuickSortStrategy implements SortingStrategy {
    @Override
    public int[] sort(int[] data) {
        System.out.println("Сортировка быстрой сортировкой");
        Arrays.sort(data); // Используем встроенный метод сортировки Java
        return data;
    }
}

// Конкретная стратегия 2: Пузырьковая сортировка
class BubbleSortStrategy implements SortingStrategy {
    @Override
    public int[] sort(int[] data) {
        System.out.println("Сортировка пузырьковой сортировкой");
        int n = data.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (data[j] > data[j + 1]) {
                    // Меняем элементы местами
                    int temp = data[j];
                    data[j] = data[j + 1];
                    data[j + 1] = temp;
                }
            }
        }
        return data;
    }
}

// Контекст (Context)
class Sorter {
    private SortingStrategy strategy;

    public Sorter(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortingStrategy strategy) {
        this.strategy = strategy;
    }

    public int[] sort(int[] data) {
        return strategy.sort(data);
    }
}

// Использование
public class StrategyDemo {
    public static void main(String[] args) {
        int[] data = {5, 2, 9, 1, 5, 6};

        // Создаем контекст с начальной стратегией
        Sorter sorter = new Sorter(new QuickSortStrategy());
        System.out.println(Arrays.toString(sorter.sort(data))); // Output: Сортировка быстрой сортировкой \n [1, 2, 5, 5, 6, 9]

        // Меняем стратегию на пузырьковую сортировку
        sorter.setStrategy(new BubbleSortStrategy());
        System.out.println(Arrays.toString(sorter.sort(data))); // Output: Сортировка пузырьковой сортировкой \n [1, 2, 5, 5, 6, 9]
    }
}
```
