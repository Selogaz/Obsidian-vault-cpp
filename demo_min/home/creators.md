---
cssclasses: max
---
alt+p (sources/add author)
```dataviewjs
const creators = dv.pages("#people/creator")
const sources = dv.pages("#source")
const quotes = dv.pages("#mark/quote")
const mentions = dv.pages("-#source AND -#mark/quote")

dv.table(
	["Author", "Source(s)", "Quote(s)", "Mentions"],
	creators.sort(b => b.file.name, 'asc').map(b => [b.file.link, 
					sources.where(p => dv.func.contains(p.creator, b.file.link)).map(p => p.file.link),
					quotes.where(p => dv.func.contains(p.file.outlinks, b.file.link)).map(p => p.file.link),
					mentions.where(p => dv.func.contains(p.file.outlinks, b.file.link)).map(p => p.file.link)])
)
```