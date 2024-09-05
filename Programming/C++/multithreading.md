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

Передача в поток функцию вместе с параметрами:

```c++
#include <thread>
#include <chrono>

void doWork(int a, int b) {
		this_thread::sleep_for(chrono::milliseconds(3000));
		cout << "========\t "<<"DoWork STARTED\t=========" << endl;
		this_thread::sleep_for(chrono::milliseconds(5000));
		cout <<"a + b = " <<a + b << endl;
		this_thread::sleep_for(chrono::milliseconds(3000));
		cout << "========\t "<<"DoWork STOPPED\t=========" << endl;
}

int main() {
	thread th(doWork,2,3);//параметры должны соответствовать типу и количеству
	for (size_t i = 0; true; i++) {
		cout << "ID потока main = "<<this_thread::get_id() << "\tmain works\t"<<i<<endl;
		this_thread::sleep_for(chrono::milliseconds(500));
	}
	th.join();//дождиается выполнения потока th(функция doWork)
	return 0;
}
```

[[C++]] [[chrono]] [[Programming/C++/Многопоточность]] 