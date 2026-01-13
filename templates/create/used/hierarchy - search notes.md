```dataviewjs
const tags = dv.current().tags.filter(p => p.startsWith("category")).join(" AND #")

const hierarchies = dv.pages(`#system/high/hierarchy AND #${tags}`)

const notes = dv.pages(`#note AND #${tags}`)

const filteredNotes = notes.where(note => {
    return !hierarchies.some(hierarchy => 
        note.file.inlinks.includes(hierarchy.file.link));
}).sort(p => p.file.name);

dv.list(filteredNotes.file.link);
```