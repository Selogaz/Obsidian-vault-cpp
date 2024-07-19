
```c++
mutex mtx;
void Print(char ch) {
	
	unique_lock<mutex> ul(mtx, std::defer_lock);//при указании defer_lock не будет вызван lock у мьютекса
	this_thread::sleep_for(chrono::milliseconds(2000));
	ul.lock();
		for (int i = 0; i < 5; ++i) {
			for (int i = 0; i < 10; i++) {
				cout << ch;
				this_thread::sleep_for(chrono::milliseconds(20));
			}
			cout << endl;
		}
	cout << endl;
	ul.unlock();
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
Без лок гарда:
![[without_lock_guard.png]]

С лок гардом:
![[with_lock_guard.png]]
[[multithreading]] [[C++]] [[mutex]] [[lock_guard mutex]] 














