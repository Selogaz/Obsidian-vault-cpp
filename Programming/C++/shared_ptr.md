Данные не удаляются до тех пор, пока не исчезнет последний указатель на эти данные. В деструкторе shared_ptr ведется счетчик ссылок.

```c++
#include <memory>
shared_ptr<int> p1(new int(5));
shared_ptr<int> p2(p1);
```

[[C++]] [[Умные указатели]] [[Указатель]]  [[unique_ptr]] 