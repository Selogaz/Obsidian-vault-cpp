```c++
#include <iostream>

using namespace std;

void Foo(int value) {
	if (value < 0) {
		throw runtime_error("Число меньше 0");
	}
	cout << "Перменная = " << value << endl;
}

int main() {
	try {
		Foo(-55);
	}
	catch (const exception & ex) {
		cout << "Мы поймали " << ex.what() << endl;
	}
	return 0;
}
```

[[C++]] [[Исключения]] [[try catch]]