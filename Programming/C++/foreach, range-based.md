Циклы, которые используют диапазон(range) значений вместо того, чтобы явно указывать начальное и конечное значения. Они появились в стандарте с++11 позволяют упростить код, делая его более читаемым и безопасным.
```c++
#include <list>

int main() {
	list<int> myList = {1, 99, 4, 94, 799, 44};
	for(const auto &element : myList) {
		cout << element << endl;
	}

	return 0;
}
```

[[C++]] [[list (stl)]] [[namespace std]] [[циклы]]  [[C++11]]  