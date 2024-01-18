Структура данных, которая хранит два значения(first, second) и обеспечивает быстрый доступ к ним.
Она используется для создания пар элементов, которые связаны друг с другом. Например, можно создать пару из ключа  значения в структурах данных, таких как map или unordered_map.
```c++
#include <utility>

std::pair<int, string> p(1, "Телефон");
std::cout << p.first << std::endl;
std::cout << p.second << std::endl;
```

Pair может быть объявлен и инициализирован несколькими способами:
```cpp
// Directly initializing a pair
std::pair<int, char> p1 = std::make_pair(1, 'a');

// Using the pair constructor
std::pair<int, char> p2(1, 'b');

// Default pair
std::pair<int, char> p3;
```


[[C++]] [[pair]] [[namespace std]] [[map]] 