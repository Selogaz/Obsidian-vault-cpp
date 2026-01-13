---
tags:
  - note/specific/code
  - category/java
aliases:
  - проблема N + 1
deck: obsidian::java
created: 2025-09-20T09:19:18+03:00
updated: 2025-10-08T18:59:38+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 276
---

**проблема N + 1**
—
ситуация, когда основной запрос возвращает N сущностей, и для каждой из них выполняется отдельный запрос для загрузки данных

Пример. Допустим, у автора несколько книг:
```java
@Entity
public class Author {
  // ...
  OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
  private List<Book> books;
}
```
Мы запрашиваем все книги:
```java
List<Author> authors = authorRepository.findAll();
for (Author author : authors) {   
  System.out.println(author.getBooks().size());
}

```
В результате [[java Hibernate|Hibernate]] выполнит примерно следующие запросы:
```java
SELECT * FROM author; // 3 автора
SELECT * FROM book WHERE author_id=1;
SELECT * FROM book WHERE author_id=2;
SELECT * FROM book WHERE author_id=3;

```
1 запрос для авторов и N запросов для каждой книги. Всего N+1 запрос

Проблема будет проявляться при любом FetchType. Для ленивой загрузки FetchType.LAZY, N дополнительных запросов будут сделаны позже, для FetchType.EAGER - сразу.

# Решение проблемы N + 1

- ✅ JOIN FETCH
```java
@Query("SELECT a FROM Author a JOIN FETCH a.books")List<Author> findAllWithBooks();

```
- ✅ EntityGraph/NamedEntityGraph
```java
@EntityGraph(attributePaths = {"books"})List<Author> findAllWithBooks();

```

В обоих случаях будет сгенерирован примерно такой запрос:
```java
SELECT author .*, book.*
FROM author 
JOIN book ON author.id = book.author_id

```

## Менее оптимальные решения

Снижают количество запросов и уменьшают тяжесть проблемы, но менее эффективны, чем JOIN FETCH и EntityGraph

- BatchSize
```java
@BatchSize(size=3)@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)private List<Book> books;

```
При запросе authorRepository.findAll() будет один запрос для авторов, запросы для книг будут группироваться по 3:
```sql
SELECT * FROM Book WHERE author_id IN (?, ?, ?)

```

- FetchMode.SUBSELECT
```java
@Fetch(FetchMode.SUBSELECT)
@OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
private List<Book> books;

```
При запросе authorRepository.findAll() сформируются 2 запроса: один для авторов, второй для книг в таком виде
```sql
SELECT * FROM Book WHERE author_id IN (SELECT id FROM author)

```

При выборе способа реализации нужно проверить, как новый запрос ляжет на текущую схему БД: как используются индексы, сколько данных пройдет через сеть, как работает пагинация.

# Дополнительные материалы
[[Все способы разрешения N + 1]]
