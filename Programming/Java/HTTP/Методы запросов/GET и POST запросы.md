`GET` - используется для получения какого-либо запроса, не отправляет никакие данные на сервер.
- Безопасен. Не вносит изменения на сервер.
- Тело GET-запроса *пустое*
- Параметры передаются в строке запроса
- Ответ на GET-запрос должен содержать тело
- Используется в HTML-формах

#### Get-запрос с параметрами

`/index.html?lang=ru&new=true&count=567` 
`/index.html` - page name
`lang=ru&new=true&count=567` - query string

#### POST-запрос
Используется для отправки данных на сервер
- Небезопасный
- Тело содержит данные
- Используется в HTML-формах
	- application/x-www-form-urlencoded - данные отправляются в теле запроса в таком же виде, как и в GET-запросе. Content-Type: application/x-www-form-urlencoded
	- multipart/form-data. В этом случае тело состоит из нескольких частей, каждая из которых предваряется заголовком "Content-Disposition"
	- text/plain. Используется для отладки.
- Приложения
	- application/json


`Content-Type: multipart/form-data`


[[Протокол HTTP]]