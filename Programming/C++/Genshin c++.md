```c++
#include <iostream>

#include <typeinfo>//для создания указателя на имя класса

#include <string>

  

//#define DEBUG

using namespace std;

  

class Genshin {

private:

int * atk;

int num_of_atks;

int id [5]{1,3,5,7,9};

public:

const char* class_name = typeid(*this).name();//Хотел, чтобы имя хранило имя объекта, а не 5Имя_класса...

string name;

int hp;

int dmg;

void get_stat() {

cout << "Name: " << name << endl;

cout << "Hp: " << hp << endl;

cout << "Damage: " << dmg << '\n' << endl;

}

void set_atk() {

this->atk = new int[num_of_atks];

for (int i = 0; i < this->num_of_atks; i++) {

atk[i] = rand() % 5000;

}

}

  

void get_atk() {

for (int i = 0; i < this->num_of_atks; i++) {

cout << this->atk[i] << endl;

}

}

  

Genshin operator +(const Genshin & other) {

Genshin newObj;

newObj.hp = this->hp + other.hp;

newObj.dmg = this->dmg + other.dmg;

return newObj;

}

  

Genshin &operator = (const Genshin & child) {

if (atk != nullptr) {

delete [] atk;

}

this->name = child.name;

this->hp = child.hp;

this->dmg = child.dmg;

this->num_of_atks = child.num_of_atks;

  

for (int i = 0; i < num_of_atks; i++) {

this->atk[i] = child.atk[i];

}

return *this;

}

  

bool operator == (const Genshin & child) {

return (this->hp == child.hp && this->dmg == child.dmg && this->num_of_atks == child.num_of_atks);

}

  

bool operator != (const Genshin & child) {

return !(this->name == child.name && this->hp == child.hp && this->dmg == child.dmg && this->num_of_atks == child.num_of_atks);

}

  

bool operator > (const Genshin & child) {

return (this->hp > child.hp);

}

  

bool operator < (const Genshin & child) {

return (this->hp < child.hp);

}

  

bool operator >= (const Genshin & child) {

return (this->hp > child.hp || this->hp == child.hp);

}

  

bool operator <= (const Genshin & child) {

return (this->hp < child.hp || this->hp == child.hp);

}

  

Genshin & operator ++() {//Prefix!!

this->hp++;

this->dmg++;

return *this;

}

  

Genshin & operator ++(int value) {//Postfix

Genshin temp(*this);

this->hp++;

this->dmg++;

  

return temp;

}

  

Genshin & operator --() {//Prefix!!

this->hp--;

this->dmg--;

return *this;

}

  

Genshin & operator --(int value) {//Postfix

Genshin temp(*this);//Используем конструктор копирования

this->hp--;

this->dmg--;

  

return temp;

}

  

int & operator [](int index) {

return id[index];

}

  

Genshin() {

#ifdef DEBUG

cout << "Вызвался конструктор по умолчанию " << this << endl;

#endif // DEBUG

name = "Traveller";

hp = 1000;

dmg = 10;

num_of_atks = 5;

this->atk = new int[num_of_atks];

for (int i = 0; i < num_of_atks; i++)

{

atk[i] = rand() % 50;

}

}

  

Genshin(const string name, const int hp,const int dmg) {

#ifdef DEBUG

cout << "Вызвался первый конструктор " << this << endl;

#endif // DEBUG

this->name = name;

this->hp = hp;

this->dmg = dmg;

this->num_of_atks = 5;

this->atk = new int[num_of_atks];

for (int i = 0; i < num_of_atks; i++)

{

atk[i] = rand() % 5000;

}

}

  

Genshin(const Genshin &child) {

this->name = child.name;

this->hp = child.hp;

this->dmg = child.dmg;

this->num_of_atks = child.num_of_atks;

this->atk = new int[child.num_of_atks];

for (int i = 0; i < child.num_of_atks; i++)

{

this->atk[i] = child.atk[i];

}

}

  

~Genshin() {

delete [] atk;

#ifdef DEBUG

cout << "Вызвался деструктор " << this << endl;

#endif // DEBUG

}

};

  
  
  

int main() {

  

Genshin Traveller;

Genshin Zong_Lee("Zong_Lee", 21000, 2500);

/*Genshin Shadow(Zong_Lee);

Genshin Pidor;

bool result = Shadow == Zong_Lee;*/

Genshin x = Traveller + Zong_Lee;

x.get_stat();

cout << ++x.hp << endl;

cout << Traveller[1] << endl;

return 0;

}
```
[[C++]] [[ООП]] [[this]] [[Указатель]] [[Ссылка]] [[Конструктор класса по умолчанию]] [[Перегрузка оператора индексирования]] [[Конструктор копирования]] [[Перегрузка оператора равенства]] [[Перегрузка оператора присваивания]] [[Перегрузка оператора инкремент]] [[Конструктор с параметрами]] [[Исходники]]