```c++
#include <iostream>

using namespace std;

class Weapon {
public:
	virtual void shoot() {
		cout << "puk" << endl;
	}
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


int main() {

	Weapon wp;
	Pistol pist;
	Weapon *Gun = &wp;
	Gun->Shoot();
return 0;
}
```

[[C++]] [[Override]] [[ООП]] [[Полиморфизм]]