const dateRegex = /📅\s*(\d{4}-\d{2}-\d{2})/;
const timeRegex = /⏰\s*(\d{2}:\d{2})/;

const todo = `
const people = dv.pages("#creator OR #production OR #contact").file.link;
const tasks = dv.pages().file.tasks
    .where(t => !t.completed)
    .where(t => people.some(link => dv.func.contains(t.outlinks, link)))
    .sort(t => {
        if (!t.text) return "9999-12-31T23:59";
        
        const dateMatch = t.text.match(${dateRegex});
        const taskDate = dateMatch ? dateMatch[1] : "9999-12-31";
       
        const timeMatch = t.text.match(${timeRegex});
        const taskTime = timeMatch ? timeMatch[1] : "23:59";
       
        return taskDate + 'T' + taskTime;
    })
    .groupBy(t => people.filter(link => dv.func.contains(t.outlinks, link)));
dv.taskList(tasks);
`;

dv.span('```dataviewjs\n' + todo + '```\n');
