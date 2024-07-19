```c++
#include <iostream>

using namespace std;

class Weapon {//абстрактный класс
public:
	virtual void shoot() = 0;//чисто виртуальная функция
};

class Pistol : public Weapon{
public:
	void shoot() override{
		cout << "BANG!" << endl;
	}
};

class SubmachineGun : public Weapon{
public:
	void shoot() override{
		cout << "BANG! BANG BANG!!" << endl;
	}
};

class Player {
public:
	void shoot(Weapon *weapon) {
		weapon->shoot();	
	}
}

int main() {
	Pistol pist;
	Weapon *Gun = &pist;//Указатель на базовый класс может хранить в себе ссылку на любого своего наследника
	Gun->Shoot();
return 0;
}
```


[[C++]] [[Override]] [[ООП]] [[Полиморфизм]] [[Наследование]]