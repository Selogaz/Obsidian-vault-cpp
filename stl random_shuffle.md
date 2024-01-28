```c++
#include <algorithm>
#include <ctime>

srand(time(NULL));
int arr[] = {1,2,3,4,5};
random_shuffle(begin(arr), end(arr));
for (auto el : arr) {
	cout << el << " ";
}
cout << endl;
```
[[C++]] [[stl]] 