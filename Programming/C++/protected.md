Уровень доступа, который позволяет классу и его друзьям видеть и изменять члены класса. Это помогает обеспечить некоторую степень инкапсуляции, сохраняя при этом возможность изменения данных для друзей класса.

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

Картинка ниже  иллюстрирует ситуацию из кода ниже. 

```c++
class B : public A//наследники В будут наследовать также, как В наследовал от А
	class C : B//поля В для С без именений
		public// - одинаковые спецификаторы и у А, и у В, и у С
		private
		protected
class B : private A//наследники В будут наследовать так, как если бы у В все поля были private
	class C : B//поля В для С будут private
		private//В и С теперь private. Private поля А доступны в В
		private//Но в С к private-полям класса А доступа нет
		private
class B : protected A//наследники В будут наследовать так, как если бы поля public класса В стали protected
	class C : B//public поля В для С станут protected. public стал protected
		protected
		private
		protected
```

![[Screenshot_20231227_143154.png]]


[[C++]] [[ООП]] [[Наследование]]