#include <iostream>

using namespace std;


template<typename T>
class List {
public:
	List();
	~List();

	void push_back(T data);
	int GetSize() {
        return Size;
    }
	T& operator[](const int index);
private:
	template<typename>
	class Node {
	public:
		Node *pNext;
		T data;
		Node (T data= T(), Node *pNext = nullptr) {
			this->data = data;
			this->pNext = pNext;
		}
	};
	Node<T> *head;
    int Size;
};

template<typename T>
List<T>::List() {
	Size = 0;
	head = nullptr;
}
template<typename T>
List<T>::~List() {
    //clear();
}
template<typename T>
void List<T>::push_back(T data) {
	if (head == nullptr) {
		head = new Node<T>(data);
	} else {
		Node<T> *current = this->head;
		while (current->pNext !=nullptr) {
			current = current->pNext;
		}
		current->pNext = new Node<T>(data);
	}
	Size++;
}
template<typename T>
T& List<T>::operator[](const int index) {
	int counter = 0;//счетчик объектов класса 
	Node<T> *current = this->head;
	while (current != nullptr) {
		if (counter == index) {
			return current->data;
		}
		current = current->pNext;
		counter++;
	}
    delete current;
}

int main() {
	List<int> lst;//объект класса List
	/*lst.push_back(5);
	lst.push_back(10);
	lst.push_back(15);*/
	int numbersCount;
	cin >> numbersCount;
	for (int i=0; i < numbersCount; i++) {
		lst.push_back(rand() % 10);
	}
	for (int i = 0; i < lst.GetSize(); i++) {
		cout << lst[i] << endl;
	}
	return 0;
}