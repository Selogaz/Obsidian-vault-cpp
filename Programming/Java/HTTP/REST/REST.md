**REST** (**RE**presentational **S**tate **T**ransfer) — это архитектурный стиль, который описывает основы построения распределённых сетевых систем. Другими словами, REST — это набор правил, который помогает программисту организовать написание кода серверного приложения, чтобы все системы легко обменивались данными и приложение можно было масштабировать.

В отличие от других подходов, например SOAP, REST обладает гибкостью и универсальностью. Это позволяет программистам комбинировать разные модули в системе. 

Ключевые элементы REST:

- **сервер**, который хранит полезные данные или осуществляет полезные функции; сервер предлагает API как средство доступа к своим данным или функциям;
- **клиент** — программное обеспечение, которое работает на компьютере, смартфоне или другом устройстве пользователя и обращается к серверу по предоставленному API;
- **ресурс** — контент, который сервер может предоставить клиенту (например, видео или текстовый файл).

Чтобы получить доступ к ресурсу, клиент отправляет HTTP-запрос к серверу.  
В ответ сервер возвращает HTTP-ответ с закодированными данными о ресурсе. Особенность REST в том, что оба типа сообщений (запрос и ответ) являются информативными, то есть содержат информацию о том, как их интерпретировать и обрабатывать.

Наиболее часто информация в запросах и ответах передаётся в виде JSON. 

**JSON** (JavaScript Object Notation) — это легковесный формат обмена данными. С помощью JSON можно передать информацию о числах и строках, а также объектах и их коллекциях.

Для примера попробуем записать информацию о пользователе онлайн-университета: 

{  
    "firstName": "Иван",  
    "lastName": "Петров",  
    "age": 25,  
    "courses": [  
        {"name": "Программирование", "duration": 4},  
        {"name": "Система контроля версий Git", "duration": 2}  
    ]  
}

В JSON данные записываются в формате «ключ — значение». Ключ — это название параметра объекта, а значение — значение этого параметра. Также можно записать коллекцию (заключается в квадратные скобки) и сделать значением некоторый объект или коллекцию объектов (как информация о курсах).

Важное преимущество JSON — отсутствие лишней информации. Например, в сравнении с XML в JSON отсутствует ссылка на схему XSD и каждый элемент не нужно заключать в парные теги. Это облегчает чтение JSON-запросов и ответов. А ещё JSON намного легче читается людьми, это существенно облегчает разработку. 

Теперь представим, каким может быть наш первый REST-запрос и ответ на него. Допустим, есть сервер онлайн-университета, который хранит информацию обо всех курсах, и нам нужно получить эту информацию с сервера. Отправим запрос с нашего клиента (браузера или мобильного приложения):

GET [https://skillbox.ru/code/](https://skillbox.ru/code/)

В ответ мы можем получить список курсов по программированию:

{  
    "courses": [  
        {"id":1, "name":"Java с нуля", "duration":4},  
        {"id":2, "name":"Система контроля версий Git", "duration":2}  
        {"id":3, "name":"Python Basic", "duration":3}  
    ]  
}

Как видите, программист сможет легко понять содержание запроса (Get/Programming/Courses) и ответа и прочитать их. Это важное преимущество архитектуры REST.

[[Протокол HTTP]] 