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
		fin.open(path);//в случае ошибки, код ниже не будет выполняться
		cout << "Файл успешно открыт" << endl;
	}
	catch (const exception & ex) {//стандартный контейнер для информации об ошибках
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
	try {//блок обработки ошибок
		cout << "Попытка открыть файл" << endl;
		fin.open(path);
		cout << "Файл успешно открыт" << endl;
	}
	catch (const ifstream::failure & ex) {//Информация о том, что пошло не так в блоке try. Эта информация может заворачиваться в контейнеры
		cout << ex.what() << endl;
		cout << ex.code() << endl;//выведет код ошибки
		cout << "Ошибка открытия файла" << endl;
	} 
	fin.close();
	return 0;
}
```
[[C++]] [[Исключения]] [[Чтение из файла]]