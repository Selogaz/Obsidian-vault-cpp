```java
StringBuilder builder = new StringBuilder();

try {
	BufferedReader br = new BufferedReader(new FileReader("/home/exuberance/Документы/EmptyFile"));
	for (;;) {
		String line = br.readLine();//читает ПОСТРОЧНО!
		if(line == null) {//если лайн нулл, то файл закончился
			break;
		}
		builder.append(line + "\n");
	}
} catch (Exception ex) {
	ex.printStackTrace();
}

System.out.println(builder.toString());
```


[[Работа с файлами]] [[Java]] [[Чтение файлов FileInputStream]] 