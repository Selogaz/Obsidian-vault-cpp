По умолчанию суммирует все элементы.
Третий параметр - точка отсчета. Грубо говоря, это число прибавляется к сумме элементов.
```c++
#include <numeric>
#include <vector>
#include <iostream>
#include <string>

using namespace std;

int main() {
	vector<int> v = {2, 3, 4, 5, 7, 10 };
	auto result = accumulate(begin(v), end(v), 0);
	auto result2 = accumulate(begin(v), end(v), 1, [](int a, int b){return a * b;});//перемножает все элементы контейнера
	auto result3 = accumulate(begin(v), end(v), 0, [](int a, int b){if (b % 2 == 0) {return a + b;} else {return a;}});//сумма четных чисел
	auto result4 = accumulate(next(begin(v)), end(v), to_string(v[0]), [](string a, int b){return a + "-" + to_string(b);});//Вывод строки "2-3-4-5-7-10"
	cout << "Result\t" << result << endl;
	return 0;
}
```
a - то, что накопилось в процессе перемножения элементов. Сначала а = 1, b = 2. a * b = 2. Теперь а = 2, b = 3. Они умножаются и тд.
Другими словами, **а** хранит промежуточный результат

[[C++]] [[stl]] 