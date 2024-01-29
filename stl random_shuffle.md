```c++
#include <algorithm>
#include <ctime>

srand(time(NULL));
int arr[] = {1,2,3,4,5};
random_shuffle(begin(arr), end(arr));
for (auto el : arr) {
	cout << el << " ";
}
cout << endl;
```

```c++
class IAction {
public:
	vitual void Acrion() = 0;
};

class CatAction : public IAction {
	virtual void Action() override {
		cout << "Гладим кота" << endl;
	}
};

class TeaAction : public IAction {
	virtual void Action() override {
		cout << "Пьем чай" << endl;
	}
};

class DogAction : public IAction {
	virtual void Action() override {
		cout << "Гуляем с собакой" << endl;
	}
};

class SleepAction : public IAction {
	virtual void Action() override {
		cout << "Спим" << endl;
	}
};

int main() {
	srand(time(NULL));
	IAction* arr[] = {
		&CatAction(),
		&TeaAction(),
		&DogAction(),
		&SleepAction()
	};
	random_shuffle(begin(arr), end(arr));
	for (auto &el : arr) {
		el->Action();
	}
	cout << endl;
	return 0;
}
```
[[C++]] [[stl]] [[ООП]] [[virtual]] [[Override]] [[Ссылка]] [[Наследование]] 