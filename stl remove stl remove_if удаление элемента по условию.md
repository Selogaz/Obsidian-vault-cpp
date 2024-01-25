Алгоритм remove группирует элементы внутри контейнера на основе того, что мы хотим "удалить" из коллекции.

```c++
#include <algorithm>
vector<int> v = {5, 9, 1, 46, 4, 9, 4};
auto result = remove(v.begin(), v.end(), 9);//перместил 9 в конец вектора
//result - итератор, указывающий на границу между нужными и ненужными элементами. На первый ненужный элемент.
v.erase(result, v.end());

```

```c++
class Person {
public:
	Person(string name, double score, int age) {
		this->Name = name;
		this->Score = score;
		this->Age = age;
	}
	bool operator()(const Person &p) {
		return p.Score > 180;
	}
	string Name;
	double Score;
	int Age;
};
int main() {
	vector<Person> people {
		Person("Сася", 181, 21),
		Person("Кася", 151, 30),
		Person("Уася", 141, 22),
		Person("Цася", 161, 32),
		Person("Йася", 180, 33),
		Person("Аася", 182, 41),
		Person("Ыася", 183, 42),
		Person("Фася", 184, 43),
		Person("Пепяка", 999, 51),
		Person("Маша", 169, 52),
	};
	people.erase(remove_if(people.begin(), people.end(), [](const Person &p){return p.Score < 150 || p.Age < 25;}), people.end());
	cout << "Всего элементов" << people.size() << endl;
	for (auto element : people) {
		cout << "Имя:\t" << element.Name <<"\tбаллы:\t"<< element.Score << "\tВозраст\t" << element.Age  << endl;
	}
	return 0;
}
```

```c++
string str = "Текст с несколькими    пробелами";
cout << str << endl;
str.erase(remove(str.begin(), str.end(), ' '), str.end());//удаляет пробелы
cout << str << endl;
```

[[C++]] [[stl]] [[алгоритмы]] [[stl_copy  stl_copy_if Выборка данных по условию]] 