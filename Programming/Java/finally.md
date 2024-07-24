---
создал заметку: 2024-07-24
tags:
  - Java
  - finally
  - Exception
---
Одно из применений - закрытие открытого ресурса
```java
BufferedReader reader = null;
FileReader fileReader = null;
try {
	fileReader = new FileReader("file.txt");
	reader = new BufferedReader(fileReader); 
	String data = reader.readLine();
	doSomething(data);
} catch (FileNotFoundException e) {
	System.out.println("File not found");
} catch (IOException e) {
	System.out.println("IO exception occured");
} finally {
	try {
		reader.close();
		fileReader.close();
	} catch (IOException e) {
		System.out.println("Unable to close resource");
	}
	
}

public static void doSomething(String data) {
	System.out.println("Do something with data");
}
```

[[Ресурс]]