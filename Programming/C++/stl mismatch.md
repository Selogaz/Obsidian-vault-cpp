```c++
int arr[] = {11, 3, 4, 5, 7, 10};
int arr2[] = {1, 3, 4, 5, 7, 10};
auto result = mismatch(begin(arr), end(arr), begin(arr2), end(arr2));
if (result.first == end(arr) && result.second == end(arr2)) {
	cout << "+" << endl;
} else {
	cout << "-" << endl;
}
```