```java
public static void main(String[] args) {
	String htmlFile = parseFile("data/code.html");

	Document doc = Jsoup.parse(htmlFile);
	Elements elements = doc.select("a.menu__link");
	elements.forEach(System.out::println);
	elements.forEach(element -> {
		System.out.println(element.text());
	});

	//System.out.println(htmlFile);
}

public static String parseFile(String path) {
	StringBuilder = builder = new StringBuilder();

	try {
		List<String> lines = Files.readAllLines(Paths.get(path));
		lines.forEach(line -> builder.append(line + "\n"));
	} catch(Exception ex) {
		ex.printStackTrace();
	}

	return builder.toString();
}
```

jsoup

