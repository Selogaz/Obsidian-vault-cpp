Используется для того, чтобы предотвратить автоматическое преобразование типов или неявное преобразование. Обычно используется для конструкторов с одним аргументом, который может быть использован для неявных преобразований.
```cpp
class MyClass {
public:
   MyClass(int x) {}
};
```
Без ключевого слова explicit можно неявно преобразовать int в MyClass
```cpp
MyClass obj = 10; // Implicit conversion
```
Если добавить explicit к конструктору, то компилятор выдаст ошибку, не позволив произойти преобразованию типов.
```cpp
class MyClass {
public:
   explicit MyClass(int x) {}
};
```
```cpp
MyClass obj = 10; // Compiler error
```
```cpp
MyClass obj(10); // Correct usage
```

[[C++]]