Перемещает повторяющиеся элементы в конец контейнера

![[stl_unique.png]]

```c++
unique(begin(arr), end(arr));
auto result = unique(begin(arr), end(arr));//возвращает итератор на границу между нужными и ненужными элементами
for_each(begin(arr), result, [](int a){cout << a << endl;})
```

```c++
vector<int> v = {1, 2, 2, 2, 5, 4, 4};
auto result = unique(begin(v), end(v));
v.erase(result, v.end());
```

```c++
vector<int> v = {1, 2, 2, 2, 5, 4, 4};
vector<int> v2;
unqie_copy(begin(v), end(v), back_inserter(v2));//уникальные элементы будут скопированы в v2
```