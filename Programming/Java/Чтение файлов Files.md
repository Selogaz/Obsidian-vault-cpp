
```java
StringBuilder builder = new StringBuilder();

try {
	List<String> lines = Files.readAllLines(Paths.get("/home/exuberance/Документы/EmptyFile"));
	lines.forEach(line -> builder.append(line + "\n"));
	}
} catch (Exception ex) {
	ex.printStackTrace();
}

System.out.println(builder.toString());
```

[[Java]] [[Чтение файлов BufferedReader]] [[Чтение файлов FileInputStream]] [[Работа с файлами]] 