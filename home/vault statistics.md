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

const pageSet = new Set(pages.map(p => p.file.path));
const pathToIndex = new Map(pages.map((p, i) => [p.file.path, i]));

let E = 0;
const degreeMap = new Map(pages.map(p => [p.file.path, 0]));
const adjacency = new Map(pages.map(p => [p.file.path, new Set()]));

for (const p of pages) {
  for (const link of p.file.outlinks) {
    if (pageSet.has(link.path) && link.path !== p.file.path) {
      E++;
      degreeMap.set(p.file.path, degreeMap.get(p.file.path) + 1);
      degreeMap.set(link.path, degreeMap.get(link.path) + 1);
      adjacency.get(p.file.path).add(link.path);
      adjacency.get(link.path).add(p.file.path);
    }
  }
}

const density = N > 1 ? E / (N * (N - 1)) : 0;
const avgDegree = N > 0 ? (2 * E) / N : 0;

const orphans = pages.filter(p => degreeMap.get(p.file.path) === 0).length;
const noisePct = ((orphans / N) * 100).toFixed(1);

const degrees = pages.map(p => degreeMap.get(p.file.path)).sort((a, b) => a - b);
const mid = Math.floor(degrees.length / 2);
const medianDegree = degrees.length % 2 !== 0
  ? degrees[mid]
  : ((degrees[mid - 1] + degrees[mid]) / 2);

const visited = new Set();
let componentCount = 0;
let largestComponent = 0;

for (const p of pages) {
  if (!visited.has(p.file.path)) {
    componentCount++;
    const queue = [p.file.path];
    let componentSize = 0;
    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);
      componentSize++;
      for (const neighbor of adjacency.get(current)) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
    }
    if (componentSize > largestComponent) largestComponent = componentSize;
  }
}

const largestPct = ((largestComponent / N) * 100).toFixed(1);

const degreeStatus = avgDegree < 2 ? "too many orphans" : avgDegree > 10 ? "hub-dominated" : "balanced";
const orphanStatus = (orphans / N) < 0.05 ? "clean" : "noisy";
const medianStatus = medianDegree === 0 ? "most nodes isolated" : medianDegree < 2 ? "sparse" : medianDegree <= 5 ? "healthy" : "dense";
const componentStatus = componentCount === 1 ? "fully connected" : componentCount <= Math.floor(N * 0.05) ? "few clusters" : "fragmented";
const largestStatus = largestPct > 90 ? "dominant core" : largestPct > 60 ? "partial core" : "no clear core";

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
  ["Edges (directed)", E, "—"],
  ["Density", density.toFixed(4), "—"],
  ["Avg Degree", avgDegree.toFixed(2), degreeStatus],
  ["Median Degree", medianDegree.toFixed(1), medianStatus],
  ["Orphans", `${orphans} (${noisePct}%)`, orphanStatus],
  ["Components", componentCount, componentStatus],
  ["Largest Component", `${largestComponent} (${largestPct}%)`, largestStatus]
]);
```

- **Vault Size** – the number of notes in the system.
- **Edges** – the number of directed links between notes within the vault.
- **Density** – the proportion of existing connections out of all possible ones. Aim for the range 0.005–0.05: below that the graph is too sparse, above it becomes chaotic.
- **Avg Degree** – the average number of connections per note. Healthy range: 2–10. Below 2, the graph breaks apart into isolated islands.
- **Median Degree** – the typical number of connections for an ordinary note. If significantly lower than the average, the system is held together by a few hubs rather than a balanced network. Aim for 2+.
- **Orphans** – notes with no connections within the vault. Normal threshold: up to 5%.
- **Components** – the number of disconnected clusters. Ideal: 1. The fewer there are, the more cohesive the system.
- **Largest Component** – the share of notes in the main connected core. Aim for 90%+: this indicates that the vault functions as a unified system rather than an archive.

___

> [!info|hide-icon]+ 📝 Notes
> <u>Total</u>: `$=dv.pages("#note").length`
> Evergreens: `$=dv.pages("#note/basic/evergreen OR #note/basic/incubator OR #note/basic/fern OR #note/basic/seed").length`
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
