```java
StringBuilder builder = new StringBuilder();

try {
	FileInputStream is = new FileInputStream("/home/exuberance/Документы/EmptyFile");
	for (;;) {
		int code = ls.read();//читает очередной символ в файле и возвращает его код
		if (code < 0) break;//если код -1, то файл закончился
		char ch = (char) code;
		builder.append(ch);
	}
} catch (Exception ex) {
	ex.printStackTrace();
}

System.out.println(builder.toString());
```




[[Java]] [[Работа с файлами]]