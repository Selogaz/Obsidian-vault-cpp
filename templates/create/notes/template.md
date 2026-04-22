<%*
const note = await tp.user.note()
await tp.file.rename(note.title)
const template = note.template
-%><% template %>