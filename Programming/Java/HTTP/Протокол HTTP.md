HTTP - HyperText Transfer Protocol
Протокол передачи данных между клиентом и сервером.
Чтобы обратиться к серверу, клиент должен знать его физический адрес, т.е. IP адрес. Чтобы узнать IP адрес сервера, клиент обращается к DNS серверу. DNS - Domain Name Service - сервис доменных имен.
Далее DNS-сервер сообщает IP адрес сервера клиенту. 
По полученному IP адресу клиент делает запрос к серверу. Если это протокол HTTP, запрос делается к 80 порту сервера. Если это HTTPS, запрос делается к 443 порту.
Сервер на этот запрос отправляет ответ.

ERR_CONNECTION_REFUSED - клиент не смог отправить запрос к серверу
ERR_CONNECTION_TIMED_OUT - клиент соединился с сервером, но не получил никакого ответа за определенный промежуток времени.

Запрос клиента к серверу - request.
Ответ сервера клиенту - response

Пример запроса:
```php
POST /index.html HTTP/1.1 //request line
Host: skillbox.ru //request headers
Accept: image/gif, image/jpeg, */*
Accept-encoding: gzip, deflate, br
Accept-language: ru-RU, ru
User-Agent: Mozilla/5.0
					//empty line
text=PHP&mode=full   //body
```
Код выше называют "HTTP сообщением" или request message

`GET/POST` - метод запроса
`/index.html` - URI  - uniform resource identifier, унифицированный индикатор ресурса
`HTTP/1.1` - protocol version
`User-Agent` - parameter(key)
`Mozilla/5.0` - value

request body:
- Может быть пустым
- Параметры запроса(данные формы)
- Данные(Json)
- Файл


#### HTTP-ответ (response)
```php
HTTP/1.1 200 OK //status line
Date: Tue, 31 Mar 2020 09:23:35 GMT //response headers
Content-Type: text/html; charset=uft-8
Server: nginx/1.16.1 (Ubuntu)
Etag: "1b873-QCXtoIDHCmRH5kCo9rL9+w"
X-powered-By: PHP/5.6.40
//empty line
<h1>Main page </h1> //body
```
response message

`HTTP/1.1` - protocol version
`200` status code
`OK` - status

Протокол HTTP - стандарт, по которому формируются и интерпретируются сообщения.