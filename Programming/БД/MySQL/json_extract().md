![[Pasted image 20240821140040.png]]
```sql
select json_extract(metadata, '$.default_theme') from user;
```
![[Pasted image 20240821140110.png]]


```sql
select json_extract(metadata, '.posts_per_page') from user;
```
![[Pasted image 20240821140425.png]]

```sql
select json_extract(metadata, '.posts_per_page') +5 from user;
```
![[Pasted image 20240821140517.png]]

```sql
select avg(json_extract(metadata, '$posts_per_page')) from user;
```
![[Pasted image 20240821140723.png]]

[[JSON_OBJECT]] [[json]] [[avg]] 