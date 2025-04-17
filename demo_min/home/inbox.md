---
aliases:
- "inbox"
- "evergreen"
- "orphans"
---
alt + p (inbox)
# inbox
```dataview
LIST
FROM #mark/fleeting
SORT file.ctime DESC
```
# evergreen
```dataview
LIST
FROM #note/evergreen
SORT file.name ASC
```
# orphans

%%У этих заметок нет исходящих и входящих ссылок%%
```dataview
LIST
FROM 
	!"home" 
	AND 
	!"templates" 
	AND 
	!"periodic"
	AND
	!"projects"
	AND
	!"sources"
	AND
	!"types"
WHERE
	length(file.inlinks) = 0 
	AND 
	length(file.outlinks) = 0
```