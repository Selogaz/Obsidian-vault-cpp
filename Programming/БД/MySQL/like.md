Выводит содержимое столбца. Если совпадает, то будет 1, если не совпадает - 0;
```sql
select column from table_name like 'mysql';
```
![[Pasted image 20240820233300.png]]

```sql
select column from table_name like 'm%';
```
m% значит начинается с буквы m, а затем любое количество символов
```sql
select column from table_name like 'm%n';
```
начинается с буквы m,  любое количество символов, заканчивается на n
```sql
select column from table_name like '%m';
```
любое количество символов, заканчивается на m
```sql
select column from table_name like '__n';
```
2 пропущенных символа, заканчивается на n
```sql
select email, user_id from user where email like '@gmail.com';
```
вывести столбцы email, user_id, в которых email заканчивается на gmail.com

[[where]]