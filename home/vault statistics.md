---
icon: 📊
cssclasses:
  - hide-backlinks
obsidianUIMode: preview
---

> [!important|hide-icon]+ ♨️ Heatmap
> `$=await dv.view("templates/views/heatmap")`

```dataviewjs
const pages = dv.pages("#note OR #system OR #project OR #source OR #creator OR #contact OR #production");
const N = pages.length;
const outlinks = pages.flatMap(p => p.file.outlinks).length;
const backlinks = pages.flatMap(p => p.file.inlinks).length;
const E = (outlinks + backlinks) / 2;
const density = (2 * E) / (N * (N - 1));
const avgDegree = (2 * E) / N;
const orphans = pages.filter(p => p.file.outlinks.length === 0 && p.file.inlinks.length === 0).length;
const noisePct = ((orphans / N) * 100).toFixed(1);

// Status evaluation
const densityStatus = density < 0.01 ? "sparse, noise" : density > 0.1 ? "chaos, over-connected" : "healthy";
const degreeStatus = avgDegree < 2 ? "too many orphans" : avgDegree > 10 ? "hub-dominated" : "balanced";
const orphanStatus = (orphans / N) < 0.05 ? "clean" : "noisy";

// PKM Journey Achievement (detailed progression)
let vaultAchievement;
if (N < 25) vaultAchievement = "🌰 Seed — just planted";
else if (N < 50) vaultAchievement = "🌱 Sprout — first shoots";
else if (N < 100) vaultAchievement = "📝 Note Hoarder — collecting phase";
else if (N < 200) vaultAchievement = "🔗 Link Discoverer — connections emerge";
else if (N < 350) vaultAchievement = "🧩 Pattern Seeker — themes surfacing";
else if (N < 500) vaultAchievement = "🗺️ Map Maker — MOCs appearing";
else if (N < 750) vaultAchievement = "🌿 Digital Gardener — tending ideas";
else if (N < 1000) vaultAchievement = "📚 Commonplace Scholar — old school method";
else if (N < 1500) vaultAchievement = "🏗️ System Builder — structure solidifies";
else if (N < 2500) vaultAchievement = "🧠 Second Brain — Forte's vision";
else if (N < 4000) vaultAchievement = "🃏 Zettelkasten Practitioner — Luhmann's way";
else if (N < 6000) vaultAchievement = "⚡ Idea Machine — synthesis mode";
else if (N < 8000) vaultAchievement = "✍️ Prolific Writer — Ryan Holiday level";
else if (N < 10000) vaultAchievement = "📖 Knowledge Publisher — producing from notes";
else if (N < 15000) vaultAchievement = "🎓 Luhmann's Disciple — serious scale";
else if (N < 20000) vaultAchievement = "🏛️ Living Library — institutional memory";
else vaultAchievement = "🌌 Exocortex Master — transcendent system";

dv.table(["Metric", "Value", "Status"], [
  ["Vault Size", N, vaultAchievement],
  ["Edges", E.toFixed(0), "—"],
  ["Density", density.toFixed(4), densityStatus],
  ["Avg Degree", avgDegree.toFixed(2), degreeStatus],
  ["Orphans", `${orphans} (${noisePct}%)`, orphanStatus]
]);
```

___

> [!info|hide-icon]+ 📝 Notes
> <u>Total</u>: `$=dv.pages("#note").length`
> Created today: `$=dv.pages("#note").where(p => dv.func.contains(p.file.frontmatter.created, moment().format("YYYY-MM-DD"))).length`
> Updated today: `$=dv.pages("#note").where(p => dv.func.contains(p.file.frontmatter.updated, moment().format("YYYY-MM-DD"))).length`

> [!info|hide-icon]+ ✅ Tasks
> <u>Total</u>: `$=dv.pages('-"files"').file.tasks.length`
> Completed tasks: `$=dv.pages('-"files"').file.tasks.where(t => t.completed).length`
> Completed today: `$=dv.pages('-"files"').file.tasks.where(t => t.completed).where(t => t.text.includes("✅ " + moment().format('YYYY-MM-DD'))).length`

> [!info|hide-icon]+ 🏢 Projects
> <u>Total</u>: `$=dv.pages("#project").length`
> Active projects: 🟦 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "🟦")).length`
> Completed projects: 🟩 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "🟩")).length` 📢 `$=dv.pages("#project").where(p => dv.func.contains(p.status, "📢")).length`
> Frozen projects: ❄ `$=dv.pages("#project").where(p => dv.func.contains(p.status, "❄")).length`

> [!info|hide-icon]+ 🗃️ Sources
> <u>Total</u>: `$=dv.pages("#source").length`
> Active sources: 🟦 `$=dv.pages("#source").where(p => dv.func.contains(p.status, "🟦")).length` ⚛️ `$=dv.pages("#source").where(p => dv.func.contains(p.status, "⚛️")).length`
> Completed sources: 🟩 `$=dv.pages("#source").where(p => dv.func.contains(p.status, "🟩")).length`

> [!info|hide-icon]+ 👥 People
> <u>Total</u>: `$=dv.pages("#contact OR #creator OR #production").length`
> Contacts: `$=dv.pages("#contact").length`
> Creators `$=dv.pages("#creator").length`
> Productions `$=dv.pages("#production").length`

> [!info|hide-icon]+ 🗺️ High-notes
> <u>Total</u>: `$=dv.pages("#system").length`
> Categories: `$=dv.pages("#system/category").length`
> Meta-notes: `$=dv.pages("#system/high/meta").length`
> Problems `$=dv.pages("#system/high/problem").length`
> Hierarchies `$=dv.pages("#system/high/hierarchy").length`

> [!info|hide-icon]+ ➕ Additions
> <u>Total</u>: `$=dv.pages("(#mark/addition OR #mark/log/conspectus) AND -#mark/addition/aggregator").length`
> Conspectuses: `$=dv.pages("#mark/log/conspectus").length`
> Meetings: `$=dv.pages("#mark/addition/meeting").length`
> Experiments: `$=dv.pages("#mark/addition/experiment").length`
> Reports: `$=dv.pages("#mark/addition/report").length`

> [!info|hide-icon]+ 📅 Periodic notes
> <u>Total</u>: `$=dv.pages("#periodic").length`
> Days: `$=dv.pages("#periodic/day").length`
> Weeks: `$=dv.pages("#periodic/week").length`
> Months: `$=dv.pages("#periodic/month").length`
> Quarters: `$=dv.pages("#periodic/quarter").length`
> Years: `$=dv.pages("#periodic/year").length`

___

> [!question]+ How long I use this vault?
> ```dataviewjs
> const notesWithCreated = dv.pages()
>   .where(p => p.file.frontmatter.created)
>   .sort(p => p.file.frontmatter.created);
> 
> if (notesWithCreated.length === 0) {
>   dv.span("No notes with creation date found");
> } else {
>   const oldestNote = notesWithCreated[0];
>   const oldestNoteDate = moment(oldestNote.file.frontmatter.created);
>   const diffDays = moment().diff(oldestNoteDate, 'days');
>   dv.span(`${diffDays} days`);
> }
> ```
