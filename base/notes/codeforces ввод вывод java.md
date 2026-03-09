---
tags:
  - note/specific/code
  - category/study
aliases: []
created: 2026-03-06T23:20:00+03:00
updated: 2026-03-08T23:28:02+03:00
---

На Codeforces формат ввода всегда описан в секции **Input** условия задачи.

## Простой ввод (для small/medium задач)

```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        int n = sc.nextInt();           // первая строка
        String s = sc.next();           // второе слово
        int k = sc.nextInt();           // третье число
        
        // твой алгоритм
        System.out.println(result);
    }
}
```

## Быстрый ввод (для больших данных, n > 10⁵)

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        
        int n = Integer.parseInt(st.nextToken());  // первое число
        int m = Integer.parseInt(st.nextToken());  // второе число
    }
}
```

## Неизвестное количество чисел

```java
// Вариант 1: строка с массивом
String[] parts = br.readLine().split(" ");
int[] arr = new int[parts.length];
for (int i = 0; i < parts.length; i++) {
    arr[i] = Integer.parseInt(parts[i]);
}

// Вариант 2: n чисел, каждое на новой строке
int n = Integer.parseInt(br.readLine());
int[] arr = new int[n];
for (int i = 0; i < n; i++) {
    arr[i] = Integer.parseInt(br.readLine());
}
```

## Как читать условие

Всегда смотри секцию **Input** в условии задачи:

```
Input:
The first line contains integer n (1 ≤ n ≤ 10⁵)
The second line contains n integers a1, a2, ..., an
```

Переводишь на код:
- `first line contains n` → `sc.nextInt()` → `int n`
- `second line contains n integers` → цикл `for i = 0..n-1` → `arr[i] = sc.nextInt()`

## Когда использовать какой сканер

| Метод | Когда использовать |
|-------|-------------------|
| `Scanner` | Small/medium задачи, до 10⁵ чисел |
| `BufferedReader + StringTokenizer` | Large данные, важна скорость |
| `FastScanner` (свой класс) | Контесты, максимальная скорость |

## Шаблон для решения задачи

```java
import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        
        // Читаешь входные данные по порядку из условия
        int n = Integer.parseInt(br.readLine());
        int[] arr = new int[n];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }
        
        // Твой алгоритм
        int answer = solve(arr);
        
        // Вывод
        System.out.println(answer);
    }
    
    static int solve(int[] arr) {
        // реализация
        return 0;
    }
}
```
