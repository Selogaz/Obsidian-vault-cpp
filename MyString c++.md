```c++
#include <iostream>

#include <string.h>

  

using namespace std;

  

class MyString {

private:

char * str;

public:

MyString();

MyString(char * str);

MyString(const MyString & other);

MyString(MyString && other);

~MyString();

void create_str(char * str);

MyString & operator=(const MyString & other);

MyString operator+(const MyString & other);

void Print();

int length;

bool operator== (const MyString & other);

bool operator != (const MyString & other);

char & operator [](int index);

};

  
  
  

int main() {

MyString rts("SDA");

MyString hhh("SDA");

MyString result = rts + hhh;

result.Print();

return 0;

}

  

MyString::MyString() {

str = nullptr;

length = 0;

}

  

MyString::MyString(char * str) {

length = strlen(str);

this->str = new char[length + 1];

  

for (size_t i = 0; i < length; i++) {

this->str[i] = str[i];

}

this->str[length] = '\0';

}

  

MyString::~MyString() {

delete [] this->str;

}

  
  
  

MyString::MyString(const MyString & other) {//конструктор копирования

int length = strlen(other.str);

this->str = new char[length + 1];

  

for (size_t i = 0; i < length; i++) {

this->str[i] = other.str[i];

}

this->str[length] = '\0';

}

  

MyString::MyString(MyString && other) {//Конструктор перемещения

this->length = other.length;

this->str = other.str;

other.str = nullptr;//Удаляем адрес, на который указывает укаазатель, чтобы не вызвался деструктор

  

}

  

void MyString::create_str(char * str) {

length = strlen(this->str);

this->str = new char[length + 1];

  

for (size_t i = 0; i < length; i++) {

this->str[i] = str[i];

}

this->str[length] = '\0';

}

  

MyString & MyString:: operator=(const MyString & other) {

if (this->str != nullptr) {

delete [] str;

}

length = strlen(other.str);

this->str = new char[length + 1];

  

for (int i = 0; i < length; i++) {

this->str[i] = other.str[i];

}

this->str[length] = '\0';

return * this;

}

  

MyString MyString::operator+(const MyString & other) {

MyString newStr;

length = strlen(this->str) + strlen(other.str);

newStr.str = new char[length + 1];

int i = 0;

for (; i < strlen(this->str); i++) {

newStr.str[i] = this->str[i];

}

for (int j = 0; j < strlen(other.str); j++,i++) {

newStr.str[i] = other.str[j];

}

newStr.str[length] = '\0';

return newStr;

}

  

bool MyString:: operator==(const MyString & other) {

if (this->length != other.length) {

return false;

}

for (int i = 0; i < length; i++) {

if (this->str[i] != other.str[i]) {

return false;

}

}

return true;

}

  

bool MyString:: operator != (const MyString & other) {

return !(this->operator==(other));

}

  

char & MyString::operator [](int index) {

return this->str[index];

}

  

void MyString:: Print() {

cout << this->str << endl;

}
```

[[Исходники]] [[C++]] [[ООП]]