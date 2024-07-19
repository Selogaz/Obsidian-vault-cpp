enum -тип данных, который позволяет создавать переменные с ограниченным набором значений
```c++
#include <iostream>

using namespace std;

class PC {
public:
	enum PCState {
		OFF,
		ON,
		SLEEP
	};
	void SetState(PCState state) {
		this->State = State;
	}
	PCState GetState() {
		return State;
	}
private:
	PCState State;
};

int main() {
	PC pc;
	pc.SetState(PC::PCState::ON);
	switch (pc.GetState()) {
		case PC::PCState::OFF:
			cout << "Выключен" << endl;
			break;
		case PC::PCState::ON:
			cout << "Включен" << endl;
			break;
		case PC::PCState::SLEEP:
			cout << "Спит" << endl;
			break;
	}
	return 0;
}


```
[[C++]]