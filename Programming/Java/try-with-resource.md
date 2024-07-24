```java
try (Resource resource = _) {
	doSomething(resource)
} catch (ExceptionType e) {
	//обработка исключения,
	//возникшего во время выполнения кода
} catch (IOException e) {
	//обработка исключения,
	//возникшего во время создания ресурса
}
```

Для того, чтобы использовать ресурс в try-with-resource, необходимо, чтобы он имплементировал интерфейс AutoCloseable

```java
try (FileReader fileReader = new FileReader("file.txt");
	BufferedReader reader = new BufferedReader(fileReader);){
	String data = reader.readLine();
	doSomething(data);
} catch (FileNotFoundException e) {
	System.out.println("File not found");
} catch (IOException e) {
	System.out.println("IO exception occured");
}//блок finally больше не нужен, ресурсы будут автоматически закрыты

public static void doSomething(String data) {
	System.out.println("Do something with data");
}
```

```java
public class MyResource implements AutoCloseable{
	@Override
	public void close() trows Exception {
		((String) null).length();
	}
}
```

```java
try {
	try (MyResource resource = new MyResource()){
		doSomething();
	}
} catch (Exception e) {
	e.pritnStackTrace();
	for (Throwable t : e.getSuppressed()) {
		System.out.println("Suppressed exceptions: " + t);
	}
}



public static void doSomething() {
	int[] intArray = null;
	intArray[3] = 1;
}
```

[[Ресурс]] [[Обработка исключений]] [[Java]] [[try-catch]] [[AutoCloseable]] [[finally]] 