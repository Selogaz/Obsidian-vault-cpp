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
		Person("Сася", 181, 29),
		Person("Кася", 151, 30),
		Person("Уася", 141, 31),
		Person("Цася", 161, 32),
		Person("Йася", 180, 33),
		Person("Аася", 182, 41),
		Person("Ыася", 183, 42),
		Person("Фася", 184, 43),
		Person("Пепяка", 999, 51),
		Person("Маша", 169, 52),
	};
	vector<Person> result;
	copy(people.begin(), people.end(), back_inserter(result));
	return 0;
}
```

```c++
copy_if(people.begin(), people.end(), back_inserter(result), [](const Person &p){return p.Name == "Иван";});
cout << "Всего элементов" << result.size() << endl;
cout << "Имя:\t" << result.Name <<"\tбаллы:\t"<< result.Score << endl;
```

```c++
copy_if(people.begin(), people.end(), back_inserter(result), [](const Person &p){return p.Age > 35 && p.Score > 140;});
sort(result.begin(), result.end(), [](const Person &p1, const Person &p2){return p1.Age < p2.Age;});
cout << "Всего элементов" << result.size() << endl;
cout << "Имя:\t" << result.Name <<"\tбаллы:\t"<< result.Score << "\tВозраст\t" << result.Age  << endl;
```

[[C++]] [[stl]] [[vector]] [[STL Алгоритмы поиска]] [[STL Алгоритмы сортировки]] 