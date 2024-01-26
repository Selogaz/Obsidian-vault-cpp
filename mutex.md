Синхронизация потоков. Защита разделяемых данных.
mutex - сигнал о том, что ресурс занят.

SimpleTimer.h
```c++
#pragma once
#include <chrono>
#include <iostream>

class SimpleTimer {
public:
	SimpleTimer();
	~SimpleTimer();
private:
	std::chrono::time_point<std::chrono::_V2::system_clock>start, end;
	std::chrono::duration<float> duration;
};
```
SimpleTimer.cpp
```c++
#include "SimpleTimer.h"
  
SimpleTimer::SimpleTimer() {
	start = std::chrono::high_resolution_clock::now();
} 
SimpleTimer::~SimpleTimer() {
	end = std::chrono::high_resolution_clock::now();
	duration = end - start;
	float result = duration.count();
	std::cout << "Прошло времени " << result << " секунд" << std::endl;
}
```


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
	mtx.lock();//приостанавливает многопоточность
	for (int i = 0; i < 5; ++i) {
		for (int i = 0; i < 10; i++) {
			cout << ch;
			this_thread::sleep_for(chrono::milliseconds(20));
		}
		cout << endl;
	}
	cout << endl;
	mtx.unlock();//возобновляет многопоточность
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

[[C++]] [[multithreading]] [[Многопоточность]] [[Время выполнения кода]] 