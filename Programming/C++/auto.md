auto - ключевое слово в с++, которое используется для автоматического определения типа данных переменной. Когда вы объявляете переменную с использованием auto, компилятор сам определяет тип этой переменной на основе инициализирующего выражения.
```c++
auto a = 10;//int
auto b = 1.44;//double
auto c = "string";//const char *
auto d;//ошибка. Инициализация обязательна
vector<int> myVector = {1, 9, 44};
vector<int>::iterator it = myVector.begin();
auto it2 = myVector.begin();//эта запись и запись выше — равнозначны 
```

Можно использовать auto для объявления универсальных параметров в функциях или классах.
```c++
template<typename T>
void func(T arg) {

}
//
```
T - универсальный параметр, а arg - параметр функции, который может иметь любой тип. Вы можете заменить T на auto, чтобы указать, что параметр может иметь любой тип.
```c++
template<typename T>
void func(auto arg) {

}

int main() {
	func(5);//arg имеет тип int
	func("Hello, World!");//arg имеет тип const char*
	return 0;
}
```
В этом случае arg будет иметь тот тип, который вы передадите в функцию.
[[C++]]  [[vector]] [[Итератор]] [[stl]] [[namespace std]] 