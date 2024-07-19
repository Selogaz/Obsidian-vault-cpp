```c++
#include <list>

template<typename T>
void PrintList(const list<T> &lst) {
	for (auto i = lst.cbegin(); i != lst.cend(); ++i) {
		cout << *i << endl;
	}
}
//вывод листа выведен в функцию

int main() {
	
	return 0;
}
```

[[C++]] [[list (stl)]] [[auto]] 