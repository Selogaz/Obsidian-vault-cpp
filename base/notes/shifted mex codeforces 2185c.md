---
tags:
  - note/specific/code
  - category/computer_science
aliases:
  - shifted MEX solution
meta:
created: 2026-03-19T22:15:00+03:00
updated: 2026-03-20T00:48:58+03:00
---

# Shifted MEX — Codeforces 2185C

## Задача

Дан массив `a`. Можно прибавить ко всем элементам одно число `x` (может быть отрицательным). Найти максимальный MEX после операции.

MEX — минимальное неотрицательное число, отсутствующее в массиве.

## Идея

Оптимальный сдвиг `x` делает так, чтобы `a[i] + x = k` для какого-то `k` в диапазоне MEX. Тогда `x = k - a[i]`.

Перебираем все пары `(i, k)` где `i` — индекс элемента, `k` —MEX.
## Решение (O(n log n))

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        int t = input.nextInt();
        
        while (t-- > 0) {
            int n = input.nextInt();
            long[] arr = new long[n];
            for (int i = 0; i < n; i++) {
                arr[i] = input.nextLong();
            }
            
            Arrays.sort(arr);
            
            // Удаляем дубликаты
            long[] unique = Arrays.stream(arr).distinct().toArray();
            
            int answer = 0;
            int current = 1;
            
            for (int i = 1; i < unique.length; i++) {
                if (unique[i] == unique[i - 1] + 1) {
                    current++;
                } else {
                    answer = Math.max(answer, current);
                    current = 1;
                }
            }
            answer = Math.max(answer, current);
            
            System.out.println(answer);
        }
    }
}
```

## Работает ли на тесте 5?

Для `[0, 300000, 600000, ...]`:
- Сортировка не меняет порядок
- Никакие два элемента не являются подряд идущими
- answer = 1

**Сложность O(n log n) — должно пройти все тесты.**

## Пример

Для `[4, 2, 3, 6]` и `x = -2`:
- Сдвинутый массив: `[2, 0, 1, 4]`
- MEX: 0, 1, 2 есть → MEX = **3**

https://codeforces.com/problemset/problem/2185/C
[[algorithms]]
