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

[[C++]] [[list (stl)]] [[namespace std]] [[циклы]] 