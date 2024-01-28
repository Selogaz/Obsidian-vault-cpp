
```c++
#include <algorithm>

void Foo(int a) {
	cout << a << endl;
}
int main() {
	int arr[] = {1, 2, 10, 55};
	for_each(begin(arr), end(arr), Foo);
		for_each(begin(arr), end(arr), [](int &a){cout << a << endl;a++;});
	for (auto &a : arr) {
		cout << a << endl;
	}
	return 0;
}
```

[[C++]] [[stl]] [[циклы]] [[алгоритмы]] 