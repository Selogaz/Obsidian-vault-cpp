Хранит пары элементов. Первый элемент - ключ. Не хранит одинаковые ключи.

```c++
#include <map>

map<int, string> myMap;
myMap.insert(make_pair(1, "phone"));
myMap.insert(pair<int, string>(2, "notebook"));
myMap.emplace(3, "монитор");

auto it = myMap.find(2);
cout << it->first << endl;

auto it2 = myMap.find(44);
if (it2 != myMap.end()) {//не получим ошибку
	cout << it2->second << endl;
} else {
	cout << "Элемент не найден" << endl;
}
```

![[map.png]]

emplace возвращает результат своей работы, по которому можно определить получилось ли вставить новый элемент.
```c++
auto res = myMap.emplace(2, "asdf");
```
Ключ 2 уже есть в map, поэтому, emplace вернет false и итератор, указывающий на пару. 
res(пара, true/false)
Таким образом, можно контролировать, получилось ли добавить элемент или нет.

```cpp
cout << myMap[3] << endl;//вернется второе значение, соответствующая ключу 3. В данном случае, монитор
```


```cpp
map<string, int> myMap2;
myMap2.emplace("Петя", 13131);
myMap2.emplace("Маша", 22222);
myMap2.emplace("Миша", 4111);

cout << myMap2["Петя"] << endl;//вывод - 13131
myMap2["Петя"] = 99999;//вместо 13131 теперь 99999
myMap2["Вася"] = 777;//если есть, то поменяется. Если нет - будет добавлен
myMap2["Вася"] = 111111;//у Васи поменяется значение

myMap2.at("Коля") = 3;//выбросит исключение. Коли нет в map. Если бы был, то значение бы поменялось

myMap2.erase("Петя");//удаляется по ключу

```



```c++
multimap<string, int> myMap;//может хранить повторяющиеся ключи
```
У multimap не перегружен оператор []
Отсутствует метод at
[[C++]] [[pair]] [[set stl]] [[emplace]] 