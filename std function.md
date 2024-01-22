Полиморфная обёртка функции
```c++
#include <functional>

using namespace std;

void Foo() {
	cout << "Foo()" << endl;
}

void Bar() {
	cout << "=====Bar()=====" << endl;
}

int Sum(int a, int b) {
	return a + b;
}

int main() {
	function<void()> v;
	v = Foo;
	v();
	function<int(int,int)> f;
	f = Sum;
	int result = f(2, 2);
	cout << result << endl;
	return 0;
}
```


```c++
#include <functional>

using namespace std;

void Foo(int a) {
	if (a > 10 && a < 40) {
		cout << "FOO" << a << endl;
	}
	
}

void Bar(int a) {
	if (a % 2 == 0) {
		cout <<"Bar "<< a << endl;
	}
}

void DoWork(vector<int> &vc) {//
	for (auto el : vc) {
		Foo(el);
	}
}

void DoWork2(vector<int> &vc) {
	for (auto el : vc) {
		Bar(el);vector<int> vc = {1, 51, 4, 10, 44, 98, 8, 12, 22, 29, 49};
	}
}

int main() {
	vector<int> vc = {1, 51, 4, 10, 44, 98, 8, 12, 22, 29, 49};
	DoWork(vc);
	return 0;
}
//Вместо двух DoWork код ниже
```


```c++
void DoWork(vector<int> &vc, function<void(int)> f) {
	for (auto el : vc) {
		f(el);
	}
}
int main() {
	DoWork(vc, Foo);
	DoWork(vc, Bar);
}
```

```c++
void DoWork(vector<int> &vc, vector<function<void(int)>> funcVector ) {
	for (auto el : vc) {
		for (auto &fel : funcVector) {
			fel(el);
		}
	}
}

void Baz(int a) {
	cout <<"BAZ" << endl;
}
int main() {
	vector<function<void(int)>> fVector;
	fVector.emplace_back(Foo);
	fVector.emplace_back(Bar);
	fVector.emplace_back(Baz);
	DoWork(vc, fVector);
}
```