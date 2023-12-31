```c++
#include <iostream>
#include <fstream>

using namespace std;

int main() {
	ifstream fin;
	string path = "myFile.txt";
	fin.exceptions(ifstream::badbit | ifstream::failbit);
	try {
		cout << "Попытка открыть файл" << endl;
		fin.open(path);
		cout << "Файл успешно открыт" << endl;
	}
	catch (const exception & ex) {
		cout << ex.what() << endl;
		cout << "Ошибка открытия файла" << endl;
	} 
	fin.close();
	return 0;
}
```

```c++
#include <iostream>
#include <fstream>

using namespace std;

int main() {
	ifstream fin;
	string path = "myFile.txt";
	fin.exceptions(ifstream::badbit | ifstream::failbit);
	try {
		cout << "Попытка открыть файл" << endl;
		fin.open(path);
		cout << "Файл успешно открыт" << endl;
	}
	catch (const ifstream::failure & ex) {
		cout << ex.what() << endl;
		cout << ex.code() << endl;//выведет код ошибки
		cout << "Ошибка открытия файла" << endl;
	} 
	fin.close();
	return 0;
}
```
[[C++]] [[Исключения]] [[Чтение из файла]]