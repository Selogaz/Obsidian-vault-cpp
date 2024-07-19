```c++
#include <algorithm>
#include <vector>

//std::find, std::find_if std::find_if_not

int main() {

	vector<int> v = {9, 4, 94, 12, 6, 1, 3, 7};
	auto result = find(v.begin(), v.end(),12);
	auto result2 = find(v.begin(), v.end(),0);
	if (result2 == v.end()) {
		cout << "-" << endl;
	} else {
		cout << "+" << endl;
	}
}
```

```c++
auto result = find_if(v.begin(), v.end(), [](int a){return a%2 == 0;});//для поиска четных чисел, если поставить != 0, будет искать нечетные
if (result == v.end()) {
		cout << "-" << endl;
	} else {
		cout << "+" << endl;
	}
```

```c++
auto result = find_if_not(v.begin(), v.end(), [](int a){return a%2 == 0;});//инвертированный результат, по сравнению с find_if
if (result == v.end()) {
		cout << "-" << endl;
	} else {
		cout << "+" << endl;
	}
```


```c++
class Person {
public:
	Person(string name, double score) {
		this->Name = name;
		this->Score = score;
	}
	bool operator()(const Person &p) {
		return p.Score > 180;
	}
	string Name;
	double Score;
};
int main() {
	vector<Person> people {
		Person("Сася", 181),
		Person("Кася", 151),
		Person("Уася", 141),
		Person("Цася", 161),
		Person("Йася", 180),
		Person("Аася", 182),
		Person("Ыася", 183),
		Person("Фася", 184),
		Person("Пепяка", 999),
		Person("Маша", 169),
	};
	auto result = find_if(people.begin(), people.end(), [](const Person &p){return p.Name == "Маша";});
	if (result == people.end()) {
		cout << "-" << endl;
	} else {
		cout << "+" << endl;
	}
	return 0;
}
```


[[C++]] [[stl]] [[алгоритмы]] [[Лямбда]] [[Предикат]] 