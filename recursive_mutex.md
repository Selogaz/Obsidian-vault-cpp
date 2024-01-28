```c++
rm.lock();
rm.lock();
rm.lock();

rm.unlock();
rm.unlock();
rm.unlock();
```

```c++
recursive_mutex rm;
void Foo(int a) {
	rm.lock();
	cout << a << " ";
	this_thread::sleep_for(chrono::milliseconds(300));
	if (a <= 1) {
		cout << endl;
		rm.unlock();
		return;
	}
	a--;
	Foo(a);
	rm.unlock();
}
int main() {
	Foo(10);
	return 0;
}
```

[[C++]] [[multithreading]] [[mutex]] 