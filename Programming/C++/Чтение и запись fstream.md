```c++
#include <fstream>
#include <iostream>

using namespace std;

int main() {
	fstream fs;
	string path = "myFile.txt";
	fs.open(path, fstream::in | fstream::out | fstream::app);
	if (!fs.is_open()) {
		cout << "Ошибка открытия файла!" << endl;
	}
	else {
		string msg;
		int value;
		cout << "Файл открыт" << endl;
		cout << "Введите 1 для записи сообщения в файл" << endl;
		cout << "Введите 2 для считывания всех сообщений из файла" << endl;
		cin >> value;
		if (value==1) {
			cout << "Введите ваше сообщение" << endl;
			cin >> msg;
			fs << msg << "\n";
		}
		if (value == 2) {
			while(!fs.eof()) {
				msg = "";
				fs >> msg;
				cout << msg << endl;
			}
		}
	}
	fs.close();
	return 0;
}
```

[[C++]] [[Чтение из файла]] [[Programming/C++/Запись в файл]]