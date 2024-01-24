```c++
#include <algorithm>
#include <vector>
#icnlude <string>

bool GreaterThanZero(int a) {//унарный предикат, т.к. принимает 1 параметр
	return a > 0;
}

bool MyPred(int a, int b) {
	return a > b;//если будет a < b, то станет от меньшего к большему
}

bool LessThanZero(int a) {
	return a < 0;
}

int main() {

	vector<int> v = {9, 4, 94, 6, 1, 3, 7};
	sort(v.begin(),v.end());//от меньшего к большему
	sort(v.begin(),v.end(), MyPred);//от большего к меньшему
	sort(v.begin(),v.end(), [](int a, int b) {return a > b});//от большего к меньшему
	sort(v.begin(),v.end(), [](int a, int b) {return a < b});//от меньшего к большему
	for (auto element : v) {
		cout << element << endl;
	}
	return 0;
}
```

```c++
const int SIZE = 7;
int arr[SIZE] = {9, 4, 94, 6, 1, 3, 7};
sort(arr, arr + SIZE, [](int a, int b){return a > b});
for (auto element : arr) {
	cout << element << endl;
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
	};
	sort(people.begin(), people.end(), [](const Person &p1, const Person &p2){return p1.Name < p2.Name;});//Отсортированы по имени
	sort(people.begin(), people.end(), [](const Person &p1, const Person &p2){return p1.Score > p2.Score;});//отсортированы по баллам
	for (auto element : people) {
	cout << "Имя:\t" <<element.Name <<"\tбаллы:\t"<< element.Score << endl;
}
	return 0;
}
```

[[C++]] [[stl]] [[алгоритмы]] [[Предикат]] [[Лямбда]] 