Класс **Charset** — это инструмент сопоставления последовательности байтов с конкретной кодировкой текста, определённой в стандартах [IANA](https://www.ietf.org/rfc/rfc2278.txt) (Internet Assigned Numbers Authority). Его можно использовать для кодирования текста в байтовые последовательности и декодирования. Некоторые кодировки, которые можно использовать с помощью класса Charset, включают UTF-8, ISO-8859-1 и Windows-1251.

Например, чтобы закодировать строку в UTF-8 при помощи класса Charset, можно использовать следующий код:
```java
String text = "Hello Skillbox";  
Charset winCharset = Charset.forName("windows-1251");  
ByteBuffer byteBuffer = winCharset.encode(text);
```
затем успешно декодировать его из байтовой последовательности в строку:
```java
CharBuffer charBuffer = winCharset.decode(byteBuffer);  
String textFromChar = charBuffer.toString();  
System.out.println(textFromChar);// Hello Skillbox
```

Классы CharsetEncoder и CharsetDecoder используют и для преобразования текста между кодировками. Также в них есть методы для проверки возможности декодирования, обработки ошибок и проверки результата преобразования символов в байты и наоборот.

Применение классов из пакета java.nio.charset может пригодиться, если нужно оперативно перевести из одной кодировки в другую большой объём текста, например, полученного по сети.


[[Java]] [[Java NIO]] [[Буферы]]
