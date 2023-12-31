```c++
#include <iostream>

using namespace std;

class MyException : public runtime_error {
public:
	MyException(const char * msg, int dataState):runtime_error(msg) {
		this->dataState = dataState;
	}
	int GetDataState() {
		return dataState;
	}
private:
	int dataState;
};

void Foo(int value) {
	if (value == 0) {
		throw runtime_error("Число равно 0");
	}
	if (value == 1) {
		throw MyException("фыр!", value);
	}
	cout << "Перменная = " << value << endl;
}

int main() {
	try {
		Foo(1);
	}
	catch (MyException &ex){
		cout << "Блок 1: Мы поймали "  << ex.what() << endl;
		cout << "Состояние данных: " << ex.GetDataState() << endl;
	}
	catch (exception &ex){
		cout << "Блок 1: Мы поймали "  << ex.what() << endl;
	}
	return 0;
}
```