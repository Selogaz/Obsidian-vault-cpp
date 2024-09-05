
Задача класса lock_guard - захватить мьютекс в конструкторе и освободить его в деструкторе. Избавляет от необходимости освобождать мьютекс вручную и связанных с этим проблем(забывания).
```c++
#include <iostream>
#include <mutex>
#include <thread>
#include "SimpleTimer.h"

using namespace std;

mutex mtx;

void Print(char ch) {
	this_thread::sleep_for(chrono::milliseconds(2000));
	//все, что выше, выполнится в отдельном потоке
	{//вручную ограничиваем область видимости lock_guard
		lock_guard<mutex> guard(mtx);
		for (int i = 0; i < 5; ++i) {
			for (int i = 0; i < 10; i++) {
				cout << ch;
				this_thread::sleep_for(chrono::milliseconds(20));
			}
			cout << endl;
		}
		cout << endl;
	}
	//Все, что ниже выполнится в отдельном потоке
	this_thread::sleep_for(chrono::milliseconds(2000));
}

int main() {
	SimpleTimer timer;
	thread t1(Print, "*");
	thread t2(Print, "#");
	t1.join();
	t2.join();
	return 0;
}
```

[[C++]] [[multithreading]] [[Programming/C++/Многопоточность]] [[mutex]] 