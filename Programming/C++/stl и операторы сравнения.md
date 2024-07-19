```c++
array<int, 4> arr = {1, 94, 77, 4};
array<int, 4> arr2 = {1, 94, 77, 4};
bool result = (arr == arr2);
bool result2 = (arr != arr2);
bool result3 = (arr > arr2);
bool result4 = (arr < arr2);
cout << result << endl;
cout << result2 << endl;
```

Условие для того, чтобы сравнение работало - операторы сравнения должны быть перегружены в контейнере.

[[C++]] [[stl]] [[array stl]]