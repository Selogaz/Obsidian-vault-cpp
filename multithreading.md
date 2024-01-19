```c++
#include <thread>
#include <chrono>

void doWork() {
	for (size_t i = 0; i < 10; i++) {
		cout << "ID потока = "<<this_thread::get_id() << endl;
		this_thread::sleep_for(chrono::milliseconds(1000));
	}
}

int main() {
	thread th(doWork);//создание второго потока
	thread th2(doWork);
	//th.detach();//обрывает поток, когда main доходит до конца
	for (size_t i = 0; i < 10; i++) {
		cout << "ID потока = "<<this_thread::get_id() << endl;
		this_thread::sleep_for(chrono::milliseconds(500));
	}
	th.join();//дождиается выполнения потока th(функция doWork)
	th2.join();
	return 0;
}
```

[[C++]] [[chrono]] [[Многопоточность]] 