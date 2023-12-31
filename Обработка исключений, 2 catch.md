```c++
```c++
#include <iostream>

using namespace std;

void Foo(int value) {
	if (value < 0) {
		throw "Число меньше 0";
	}
	if (value == 0) {
		throw runtime_error("Число равно 0");
	}
	if (value == 1) {
		throw 1;
	}
	cout << "Перменная = " << value << endl;
}

int main() {
	try {
		Foo(1);
	}
	catch (const exception & ex) {
		cout << "Мы поймали " << ex.what() << endl;
	}
	catch (const char * ex) {
		cout << "Мы поймали " << ex << endl;
	}
	catch (...) {
		cout << "Что-то пошло не так" << endl;
	}
	return 0;
}

```