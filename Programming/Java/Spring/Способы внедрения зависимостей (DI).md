- Через конструктор: это наиболее рекомендуемый и явный способ. Spring автоматически передаст подходящий бин в этот конструктор при создании экземпляра класса. Явно аннотацию можно не указывать
```java
public CommentController(CommentCRUDService commentService) {  
    this.commentService = commentService;  
}
```

- Через поля: можно аннотировать поля класса аннотацией @Autowired. Spring автоматически внедрит подходящий бин в эти поля при создании экземпляра класса. Этот подход менее явный, и некоторые считают его менее предпочтительным для чистоты кода.
```java
@Autowired
private final CommentCRUDService commentService;
```

- Через методы-сеттеры: можно аннотировать методы-сеттеры класса аннотацией @Autowired. Spring внедрит зависимость в соответствующий метод после создания экземпляра класса. Также этот способ менее явный и может быть менее чистым с точки зрения архитектуры 
```java
@Autowired
public setCommentsService(CommentCRUDService commentService) {  
    this.commentService = commentService;  
}
```
[[Dependency Injection]]