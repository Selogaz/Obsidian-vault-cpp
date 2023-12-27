Спецификатор(модификатор?) доступа. Используется при наследовании.
Поля  с этим спецификатором могут использоваться наследниками, но их нельзя использовать через объект(через точку).

```c++
class A {
public:
	string msgOne = "Сообщение один";
private:
	string msgTwo = "Сообщение два";
protected:
	string msgThree = "Сообщение три";
};

class B : public A {
public:
	void PrintMsgPublic() {
		cout << msgThree << endl;
	}
	void PrintMsgPrivate() {
		cout << msgThree << endl;
	}
	void PrintMsgProtected() {
		cout << msgThree << endl;
	}
};

int main() {
	B b;
	b.PrintMsgPublic();//спокойно выведется сообщение 1
	b.PrintMsgPrivate();//ошибка
	b.PrintMsgProtected();//выведет сообщение 3
	return 0;
}
```

[[C++]] [[ООП]] [[Наследование]]