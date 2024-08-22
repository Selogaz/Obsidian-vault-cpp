Отобразить колонку в обратном порядке
```sql
select first_name, reverse(first_name) from user order by reverse(first_name) desc;
```
![[Pasted image 20240821151411.png]]

```sql
select user_id, first_name from user order by first_name limit 10;
```
![[Pasted image 20240821151706.png]]