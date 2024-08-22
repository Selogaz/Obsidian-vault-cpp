```sql
select UpdateXML('<body><script>alert();</script>Text</body>', '//script', '') as new_xml;
```
![[Pasted image 20240821135350.png]]
