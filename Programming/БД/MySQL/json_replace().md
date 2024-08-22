```sql
select json_replace(metadata, '$posts_per_page', 200, '.default_theme', 'dark') as metadata from user;
```
![[Pasted image 20240821141222.png]]
