Технология, позволяющая делить одну область памяти между разными данными.

```c++
union MyUnion {
	short int a;
	int b;
	float c;
};

int main() {
	MyUnion u;
	u.a = 5;
	u.b = 4000;
	u.c = 43.54;
	return 0;
}
```


![[u a.png]]

![[u b.png]]

![[u c.png]]

[[C++]] 