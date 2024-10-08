#include <iostream>

using namespace std;

template <typename T>
class List
{
public:
	List();	 // конструктор
	~List(); // деструктор

	void pop_back();//удалить последний элемент
	void removeAt(int index);
	void insert(T data, int index); // вставляет элемент в указанную позицию
	void push_front(T data);		// добавляет элемент в начало списка
	void clear();
	void pop_front();		// удаляет первый элемент списка
	void push_back(T data); // добавление элементов в конец списка
	int GetSize()
	{ // Возвращает количество элементов в списке
		return Size;
	}
	T &operator[](const int index); // перегруженный оператор, который по указанному индексу возвращает данные из списка
private:
	template <typename>
	class Node
	{ // элемент односвязного списка, который хранит данные и указатель на след. элемент
	public:
		Node *pNext; // указатель на следующий элемент
		T data;
		Node(T data = T(), Node *pNext = nullptr)
		{
			this->data = data;
			this->pNext = pNext;
		}
	};
	Node<T> *head; // поле, в котором лежит самый первый элемент
	int Size;	   // счетчик элементов списка
};

template <typename T>
List<T>::List()
{
	Size = 0;
	head = nullptr;
}
template <typename T>
List<T>::~List()
{
	clear(); // для удаления всех элементов в момент выхода из зоны видимости main
}

template<typename T>
void List<T>::pop_back() {
	removeAt(Size - 1);
}

template <typename T>
void List<T>::remoteAt(int index)
{
	if (index == 0)
	{
		pop_front();
	}
	else
	{
		Node<T> *previous = this->head;
		for (int i = 0; i < index - 1; i++)
		{
			previous = previous->pNext;
		}
		Node<T> *toDelete = previous->pNext;//адрес следующего элемента(того, который хотим удалить) записываем в переменную toDelete
		previous->pNext = toDelete->pNext;//туда, куда указывал toDelete, теперь указывает previous
		delete toDelete;
		Size--;
	}
}

template <typename T>
void List<T>::insert(T data, int index)
{
	if (index == 0)
	{
		push_front(data);
	}
	else
	{
		Node<T> *previous = this->head;		// инициализируем указатель первым элементом
		for (int i = 0; i < index - 1; i++) // поиск элемента, стоящего перед тем, куда будем вставлять
		{
			previous = previous->pNext;
		}
		previous->pNext = new Node<T>(data, previous->pNext); // создаем элемент по указанному индексу
		Size++;												  // увеличиваем счетчик элементов
	}
}

template <typename T>
void List<T>::push_front(T data)
{
	head = new Node<T>(data, head); // Создание нового элемента, указываем адрес следующего элемента(текущий хэд), делаем новый элемент первым(новым хэдом, вместо старого)
	Size++;							// увеличиваем счетчик элементов
}

template <typename T>
void List<T>::clear()
{
	while (Size) // тоже самое, что и !=0. т.е. "пока в списке есть элементы"
	{
		pop_front();
	}
}

template <typename T>
void List<T>::pop_front()
{
	Node<T> *temp = head; // создаем новый указатель для 1 элемента в списке
	head = head->pNext;	  // первым элементом становится второй
	delete temp;		  // удаляем первый элемент
	Size--;				  // уменьшаем счетчик элементов списка
}

template <typename T>
void List<T>::push_back(T data)
{
	if (head == nullptr)
	{
		head = new Node<T>(data);
	}
	else
	{
		Node<T> *current = this->head;
		while (current->pNext != nullptr)
		{
			current = current->pNext;
		}
		current->pNext = new Node<T>(data);
	}
	Size++;
}
template <typename T>
T &List<T>::operator[](const int index)
{
	int counter = 0; // счетчик объектов класса
	Node<T> *current = this->head;
	while (current != nullptr)
	{
		if (counter == index)
		{
			return current->data;
		}
		current = current->pNext;
		counter++;
	}
	// delete current;
}

int main()
{
	List<int> lst; // объект класса List
	lst.push_back(5);
	lst.push_back(10);
	lst.push_back(15);
	/* int numbersCount;
	cin >> numbersCount;
	for (int i=0; i < numbersCount; i++) {
		lst.push_back(rand() % 10);
	} */
	for (int i = 0; i < lst.GetSize(); i++)
	{
		cout << lst[i] << endl;
	}
	cout << endl
		 << "Элементов в списке " << lst.GetSize() << endl
		 << "Выполняю метод pop_front" << endl
		 << endl;
	lst.clear();
	for (int i = 0; i < lst.GetSize(); i++)
	{
		cout << lst[i] << endl;
	}
	cout << endl
		 << "Элементов в списке " << lst.GetSize() << endl;
	return 0;
}