```c++
#include <iostream>
#include <algorithm>
#include <vector>
#include <list>
#include <string>
using namespace std;

int main() {
	vector<int> v = {10, 1, -55, 11, 13, 58};//обертка для динамического массива
	list<int> lst = {4, 7, 77, -3, 44, 74};//двусвязный список
	auto result = max_element(v.begin(), v.end());//передается итератор на начало коллекции и итератор на конец коллекции
	cout << *result << endl;//разыменовываем, потому что result - итератор
	auto result2 = max_element(lst.begin(), lst.end());
	cout << *result2 << endl;
	return 0;
}
```

```c++
const int SIZE = 6;
int arr[SIZE] = {10, 1, -55, 11, 13, 58};
auto result = max_element(arr, arr + SIZE);
cout << *result << endl;
```

[[C++]] [[list (stl)]] [[vector]] [[алгоритмы]] [[stl]] [[Итератор]] 