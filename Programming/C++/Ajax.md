Asynchronous JavaScript and XML — технология, которая позволяет веб-приложениям получать данные с сервера без необходимости перезагрузки всей страницы. Ajax использует несколько технологий, включая JavaScript, XMLHttpRequest и CSS, чтобы обеспечить более интерактивное и эффективное взаимодействие с пользователем.

Принцип работы Ajax:
1. Пользователь выполняет действие на веб-странице, например, нажимает кнопку.
2. JavaScript-код на стороне клиента обрабатывает это событие и отправляет запрос на сервер с помощью XMLHttpRequest. 
3. Сервер обрабатывает запрос и возвращает ответ в виде JSON или XML. 
4. JavaScript-код на стороне клиента обрабатывает полученный ответ и обновляет страницу, добавляя или удаляя элементы, меняя стили или отображая сообщения

Примеры работы Ajax:
1. Автообновление ленты ВК при прокрутке вниз
2. Поиск по каталогу товаров в интернет-магазине без перезагрузки всей страницы
3. Загрузка комментариев к записи без перезагрузки всей страницы 

Пример кода на JavaScript для выполнения Ajax-запроса:
```js
function sendRequest() {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://example.com/api/endpoint', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var response = JSON.parse(request.responseText);
      console.log(response);
    } else {
      alert('Error making request.');
    }
  };

  request.onerror = function() {
    alert('Error making request.');
  };

  request.send();
}

document.getElementById('button').addEventListener('click', sendRequest);
```
В этом примере мы используем XMLHttpRequest для отправки GET-запроса на сервер example.com и обрабатываем ответ. Если запрос успешен, мы преобразуем ответ в JSON и выводим его в консоли. Если происходит ошибка, выводится сообщение об ошибке.

Вот пример использования AJAX для обновления ленты новостей без перезагрузки всей страницы:
```js

<html>
<head>
    <title>AJAX News Feed</title>
</head>
<body>
    <h1>Latest News</h1>
    <div id="news-feed">
        <ul>
            <li>News item 1.</li>
            <li>News item 2.</li>
        </ul>
    </div>
    
    <script>
        // Функция для получения новых новостей с сервера
        function getNews() {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    // Обновляем DOM с новыми новостями
                    var newsItems = JSON.parse(this.responseText),
                        newsFeed = document.getElementById("news-feed");
                    newsItems.forEach(function(newsItem) {
                        var li = document.createElement("li");
                        li.innerHTML = newsItem;
                        newsFeed.appendChild(li);
                    });
                }
            };
            xmlhttp.open("GET", "http://news-api.example.com/", true);
            xmlhttp.send();
        }
        
        // Обновляем новости каждые 30 секунд
        setInterval(getNews, 30000);
    </script>
</body>
</html>
```

[[JavaScript ]] [[Асинхронное программирование]] 