```c++
#include <iostream>

  

using namespace std;

  

class Apple {

public:

static int Count;

  

Apple(int weight, string color) {

this->weight = weight;

this->color = color;

Count++;

id = Count;

}

  

~Apple() {

  

}

int getId() {

return id;

}

private:

int weight;

string color;

int id;

};

  

int Apple::Count = 0;

  

int main() {

Apple apple(150, "red");

cout << apple.Count << endl;

cout << apple.getId() << endl;

return 0;

}
```

ID_GENERATOR V2.0

```c++
#include <iostream>

#include <ctime>

  

using namespace std;

  

class Generator {

public:

static int count;

int uid;

static bool alreadyThere;

int random;

static int str_uid[5];

Generator();

~Generator();

};

  

int Generator::count = 0;

bool Generator::alreadyThere = false;

int Generator::str_uid[];

  

int main() {

srand((time(NULL)));

Generator huev;

/* cout << huev.count << endl; */

cout << huev.uid << endl;

Generator rot;

/* cout << rot.count << endl; */

cout << rot.uid << endl;

Generator jopa;

/* cout << jopa.count << endl; */

cout << jopa.uid << endl;

return 0;

}

  

Generator::Generator() {

count++;

for (int i = count - 1; i < count;)

{

alreadyThere = false;

this->random = rand() % 10000000;

for (int j = 0; j < count; j++)

{

if (str_uid[j]==this->random) {

alreadyThere = true;

break;

}

}

if (!alreadyThere) {

this->uid = random;

str_uid[count - 1] = this->uid;

i++;

}

}

}

  

Generator::~Generator() {

}
```

[[C++]] [[ООП]] [[Static]] [[Исходники]]