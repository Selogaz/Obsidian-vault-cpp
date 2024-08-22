```sql
select ExtractValue('a href = "http://example.com">Link <strong>Click</strong></a>', '/a/strong') as value;
```
![[Pasted image 20240821134439.png]]
Записали текст внутри тега strong в столбец value;

```sql
select ExtractValue('a href = "http://example.com">Link <strong>Click</strong></a>', '/a') as value;
```
![[Pasted image 20240821134605.png]]
Содержимое а в value