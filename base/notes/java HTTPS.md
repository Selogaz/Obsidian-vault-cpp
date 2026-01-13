---
tags:
  - note/specific/code
  - category/java
aliases:
  - HTTPS
deck: obsidian::java
created: 2025-09-30T20:27:50+03:00
updated: 2025-10-08T19:35:44+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 270
---

**HTTPS**
—
Сгенерировать самоподписанный сертификат
```bash
openssl req -newkey rsa:2048 -x509 -keyout key.pem -out cert.pem -days 365
```
Команда выводит два файла: key.pem (закрытый ключ) и cert.pem (открытый сертификат). Также она попросит придумать пароль.

```bash
openssl pkcs12 -export -in cert.pem -inkey key.pem -out certificate.p12 -name "certificate"
```
Вторая команда получает в качестве входных данных два файла, сгенерированных первой командой, и выводит самоподписанный сертификат.

Скопируйте файл certificate.p12 в папку ресурсов проекта Spring Boot и добавьте следующие строки в файл application.properties:
```properties
server.ssl.key-store-type=PKCS12
server.ssl.key-store=classpath:certificate.p12
server.ssl.key-store-password=12345
```

Для того, чтобы пропустить проверку подлинности сертификата, нужно добавить аргумент `-k`:
```bash
curl -k -u user:93a01cf0-794b-4b98-86ef-54860f36f7f3 https://localhost:8080/hello
```

Благодаря этому сертификату клиент, вызывающий конечную точку, знает, что ответ пришел от сервера аутентификации и никто не перехватил канал связи. Но его нужно купить)
