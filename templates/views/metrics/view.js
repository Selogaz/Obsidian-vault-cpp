/**
 * Portable graph-health view for an Obsidian vault.
 *
 * Optional input:
 *   query: Dataview source string (default: every Markdown page)
 *   source: an explicit page collection instead of query
 *   exclude: folder prefixes (default: ["home", "files", "templates", "periodic"])
 *   achievementExclude: exclusions for the collection achievement (default: infrastructure only)
 *   thresholds: partial overrides for the heuristic defaults below
 *   clusteringSample: maximum notes sampled for local clustering
 */

const options = input && typeof input === "object" ? input : {};
const normalizePrefixes = (prefixes) => (Array.isArray(prefixes) ? prefixes : [prefixes])
  .map((prefix) => String(prefix).replace(/^\/+|\/+$/g, ""))
  .filter(Boolean);
const excluded = normalizePrefixes(options.exclude ?? ["home", "files", "templates", "periodic"]);
const achievementExcluded = normalizePrefixes(
  options.achievementExclude ?? ["home", "files", "templates"]
);
const source = options.source ?? dv.pages(options.query ?? "");
const sourcePages = [...new Map(Array.from(source)
  .filter((page) => page?.file?.path)
  .map((page) => [page.file.path, page])).values()];
const hasPrefix = (path, prefixes) =>
  prefixes.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
const pages = sourcePages.filter((page) => !hasPrefix(page.file.path, excluded));
const achievementN = sourcePages.filter(
  (page) => !hasPrefix(page.file.path, achievementExcluded)
).length;

const defaults = {
  densityGood: [1, 5],
  densityWatch: [0.5, 8],
  degreeGood: [2, 10],
  degreeWatch: [1, 15],
  medianGood: [2, 5],
  medianWatch: [1, 10],
  coreGood: 90,
  coreWatch: 70,
  coverageGood: 70,
  coverageWatch: 50,
  orphanGood: 5,
  orphanWatch: 10,
  componentGood: 5,
  componentWatch: 10,
  clusteringGood: [0.1, 0.4],
  clusteringWatch: [0.05, 0.6],
  hubGood: 40,
  hubWatch: 60,
  unresolvedGood: 0,
  unresolvedWatch: 1,
};
const thresholdOverrides = options.thresholds ?? {};
const thresholds = Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => {
  const value = thresholdOverrides[key];
  if (!Array.isArray(fallback)) {
    const number = value == null ? NaN : Number(value);
    return [key, Number.isFinite(number) ? number : fallback];
  }
  const range = Array.isArray(value) ? value.map(Number) : fallback;
  return [key, range.length === 2 && range.every(Number.isFinite) && range[0] <= range[1] ? range : fallback];
}));

const LEVEL = {
  neutral: { emoji: "⚪", label: "context" },
  good: { emoji: "🟢", label: "healthy" },
  watch: { emoji: "🟡", label: "watch" },
  attention: { emoji: "🔴", label: "action" },
};
const inRange = (value, [min, max]) => value >= min && value <= max;
const rangeLevel = (value, good, watch) =>
  inRange(value, good) ? "good" : inRange(value, watch) ? "watch" : "attention";
const minLevel = (value, good, watch) =>
  value >= good ? "good" : value >= watch ? "watch" : "attention";
const maxLevel = (value, good, watch) =>
  value <= good ? "good" : value <= watch ? "watch" : "attention";
const pct = (value) => `${value.toFixed(1)}%`;

const N = pages.length;
const pageSet = new Set(pages.map((page) => page.file.path));
const adjacency = new Map(pages.map((page) => [page.file.path, new Set()]));
const outgoing = new Map(pages.map((page) => [page.file.path, new Set()]));
const unresolvedLabels = new Set();
const unresolvedPairs = new Set();
const unresolvedSources = new Set();
let directedLinks = 0;

for (const page of pages) {
  const targets = new Set();
  for (const link of page.file.outlinks ?? []) {
    const resolved = app.metadataCache.getFirstLinkpathDest(
      link.path,
      page.file.path
    );
    if (!resolved) {
      unresolvedLabels.add(link.path);
      unresolvedPairs.add(`${page.file.path}\u0000${link.path}`);
      unresolvedSources.add(page.file.path);
      continue;
    }
    if (resolved.extension === "md") targets.add(resolved.path);
  }
  for (const target of targets) {
    if (target === page.file.path || !pageSet.has(target)) continue;
    directedLinks++;
    outgoing.get(page.file.path).add(target);
    adjacency.get(page.file.path).add(target);
    adjacency.get(target).add(page.file.path);
  }
}

const degrees = [...adjacency.values()].map((neighbors) => neighbors.size);
const deadEnds = [...outgoing.values()].filter((targets) => targets.size === 0).length;
const leaves = degrees.filter((degree) => degree === 1).length;
const sortedDegrees = [...degrees].sort((a, b) => a - b);
const totalDegree = degrees.reduce((sum, degree) => sum + degree, 0);
const avgDegree = N ? totalDegree / N : 0;
const middle = Math.floor(N / 2);
const medianDegree = !N
  ? 0
  : N % 2
    ? sortedDegrees[middle]
    : (sortedDegrees[middle - 1] + sortedDegrees[middle]) / 2;
const orphanPaths = [...adjacency]
  .filter(([, neighbors]) => neighbors.size === 0)
  .map(([path]) => path);
const orphans = orphanPaths.length;
const orphanPct = N ? (orphans / N) * 100 : 0;
const orphanFolders = [...orphanPaths.reduce((counts, path) => {
  const folder = path.includes("/") ? path.split("/")[0] : "vault root";
  counts.set(folder, (counts.get(folder) ?? 0) + 1);
  return counts;
}, new Map())].sort((a, b) => b[1] - a[1]);
const orphanBreakdown = orphanFolders
  .slice(0, 4)
  .map(([folder, count]) => `${folder} ${count.toLocaleString()}`)
  .join(" · ");
const periodicOrphans = orphanFolders.find(([folder]) => folder === "periodic")?.[1] ?? 0;
const orphansMostlyPeriodic = orphans > 0 && periodicOrphans / orphans >= 0.5;
const linkedCoverage = N ? (degrees.filter((degree) => degree >= 2).length / N) * 100 : 0;
const outgoingPerNote = N ? directedLinks / N : 0;
const density = N > 1 ? directedLinks / (N * (N - 1)) : 0;

const visited = new Set();
const componentSizes = [];
for (const path of pageSet) {
  if (visited.has(path)) continue;
  const queue = [path];
  let size = 0;
  for (let i = 0; i < queue.length; i++) {
    const current = queue[i];
    if (visited.has(current)) continue;
    visited.add(current);
    size++;
    for (const neighbor of adjacency.get(current)) {
      if (!visited.has(neighbor)) queue.push(neighbor);
    }
  }
  componentSizes.push(size);
}
const components = componentSizes.length;
const multiNoteComponents = componentSizes.filter((size) => size > 1).length;
const largestComponent = componentSizes.reduce(
  (largest, size) => Math.max(largest, size),
  0
);
const corePct = N ? (largestComponent / N) * 100 : 0;
const componentPct = N > 1 ? ((components - 1) / (N - 1)) * 100 : 0;

const hubCount = Math.max(1, Math.ceil(N * 0.05));
const hubDegree = [...degrees]
  .sort((a, b) => b - a)
  .slice(0, hubCount)
  .reduce((sum, degree) => sum + degree, 0);
const hubShare = totalDegree ? (hubDegree / totalDegree) * 100 : 0;

const candidates = [...pageSet].filter((path) => adjacency.get(path).size >= 2);
const requestedSample = Number(options.clusteringSample ?? 800);
const sampleLimit = Number.isFinite(requestedSample) && requestedSample > 0
  ? Math.floor(requestedSample)
  : 800;
const sampleSize = Math.min(sampleLimit, candidates.length);
const sample = Array.from({ length: sampleSize }, (_, index) =>
  candidates[Math.floor(((index + 0.5) * candidates.length) / sampleSize)]
);
let clusteringSum = 0;
for (const path of sample) {
  const neighbors = adjacency.get(path);
  let linkedNeighborDegree = 0;
  for (const neighbor of neighbors) {
    for (const candidate of adjacency.get(neighbor)) {
      if (neighbors.has(candidate)) linkedNeighborDegree++;
    }
  }
  clusteringSum += linkedNeighborDegree / (neighbors.size * (neighbors.size - 1));
}
const clustering = sample.length ? clusteringSum / sample.length : 0;

const densityDigits = N >= 10000 ? 5 : N >= 1000 ? 4 : 3;
const densityRange = N > 1
  ? `${(thresholds.densityGood[0] / (N - 1)).toFixed(densityDigits)}–${(
      thresholds.densityGood[1] / (N - 1)
    ).toFixed(densityDigits)}`
  : "not available";

const enoughGraph = N >= 2;
const coreLevel = enoughGraph
  ? minLevel(corePct, thresholds.coreGood, thresholds.coreWatch)
  : "neutral";
const densityLevel = enoughGraph ? rangeLevel(
  outgoingPerNote,
  thresholds.densityGood,
  thresholds.densityWatch
) : "neutral";
const degreeLevel = enoughGraph ? rangeLevel(
  avgDegree,
  thresholds.degreeGood,
  thresholds.degreeWatch
) : "neutral";
const medianLevel = N >= 3 ? rangeLevel(
  medianDegree,
  thresholds.medianGood,
  thresholds.medianWatch
) : "neutral";
const coverageLevel = N >= 3 ? minLevel(
  linkedCoverage,
  thresholds.coverageGood,
  thresholds.coverageWatch
) : "neutral";
const orphanLevel = enoughGraph
  ? maxLevel(orphanPct, thresholds.orphanGood, thresholds.orphanWatch)
  : "neutral";
const componentLevel = !N ? "neutral" : components === 1 ? "good" : maxLevel(
  componentPct,
  thresholds.componentGood,
  thresholds.componentWatch
);
const clusteringLevel = sample.length ? rangeLevel(
  clustering,
  thresholds.clusteringGood,
  thresholds.clusteringWatch
) : "neutral";
const hubLevel = totalDegree
  ? maxLevel(hubShare, thresholds.hubGood, thresholds.hubWatch)
  : "neutral";
const unresolvedPct = N ? (unresolvedPairs.size / N) * 100 : 0;
const unresolvedLevel = N ? maxLevel(
  unresolvedPct,
  thresholds.unresolvedGood,
  thresholds.unresolvedWatch
) : "neutral";

const achievements = [
  { max: 10, emoji: "✨", title: "First Sparks", caption: "something has begun" },
  { max: 25, emoji: "🌰", title: "Seed", caption: "just planted" },
  { max: 50, emoji: "🌱", title: "Sprout", caption: "first shoots" },
  { max: 100, emoji: "📝", title: "Note Hoarder", caption: "collecting phase" },
  { max: 200, emoji: "🔗", title: "Link Discoverer", caption: "connections emerge" },
  { max: 350, emoji: "🧩", title: "Pattern Seeker", caption: "themes surfacing" },
  { max: 500, emoji: "🗺️", title: "Map Maker", caption: "MOCs appearing" },
  { max: 750, emoji: "🌿", title: "Digital Gardener", caption: "tending ideas" },
  { max: 1000, emoji: "📚", title: "Commonplace Scholar", caption: "old-school method" },
  { max: 1500, emoji: "🏗️", title: "System Builder", caption: "structure solidifies" },
  { max: 2000, emoji: "🏙️", title: "Knowledge Architect", caption: "ideas have rooms now" },
  { max: 2500, emoji: "🧠", title: "Second Brain", caption: "Forte’s vision" },
  { max: 3250, emoji: "🕸️", title: "Knowledge Weaver", caption: "threads become fabric" },
  { max: 4000, emoji: "🗃️", title: "Zettelkasten Practitioner", caption: "Luhmann’s way" },
  { max: 5000, emoji: "⚡", title: "Idea Machine", caption: "synthesis mode" },
  { max: 6500, emoji: "✍️", title: "Prolific Writer", caption: "Ryan Holiday level" },
  { max: 8000, emoji: "🔭", title: "Insight Observatory", caption: "patterns at scale" },
  { max: 10000, emoji: "📖", title: "Knowledge Publisher", caption: "producing from notes" },
  { max: 12500, emoji: "🧭", title: "Knowledge Cartographer", caption: "mapping the unknown" },
  { max: 15000, emoji: "🎓", title: "Luhmann’s Disciple", caption: "serious scale" },
  { max: 20000, emoji: "🏛️", title: "Living Library", caption: "institutional memory" },
  { max: 30000, emoji: "🌌", title: "Exocortex Master", caption: "transcendent system" },
  { max: 50000, emoji: "🪐", title: "Civilization Archive", caption: "generational memory" },
  { max: Infinity, emoji: "♾️", title: "Infinite Garden", caption: "beyond counting" },
];
const achievementIndex = achievements.findIndex((tier) => achievementN < tier.max);
const achievement = achievements[Math.max(0, achievementIndex)];
const achievementFloor = achievementIndex > 0 ? achievements[achievementIndex - 1].max : 0;
const achievementProgress = Number.isFinite(achievement.max)
  ? Math.max(0, Math.min(100, ((achievementN - achievementFloor) / (achievement.max - achievementFloor)) * 100))
  : 100;
const nextAchievement = achievements[achievementIndex + 1];
const achievementNext = Number.isFinite(achievement.max)
  ? `${(achievement.max - achievementN).toLocaleString()} to ${nextAchievement?.title ?? achievement.title}`
  : "The final tier is yours";

const metric = (data) => ({ priority: 99, ...data });
const primary = [
  metric({
    id: "notes",
    label: "Notes",
    value: N.toLocaleString(),
    level: "neutral",
    state: "analyzed",
    summary: "Markdown notes included in this graph analysis.",
    calculation: "Counts every page in the selected Dataview source after folder exclusions.",
    range: "No quality target. A larger vault is not automatically a healthier vault.",
    action: "Use note count as context and optimize the structural signals instead.",
  }),
  metric({
    id: "links",
    label: "Directed links",
    value: directedLinks.toLocaleString(),
    level: "neutral",
    state: `${outgoingPerNote.toFixed(1)} per note`,
    summary: "Unique internal links from one analyzed note to another.",
    calculation: "Counts each source-to-target pair once. Self-links and links outside the selected graph are ignored.",
    range: "No standalone target. Density, coverage and degree give this number useful context.",
    action: "Prefer meaningful contextual links over increasing the raw total.",
  }),
  metric({
    id: "core",
    label: "Main core",
    value: pct(corePct),
    level: coreLevel,
    state: enoughGraph ? `${largestComponent.toLocaleString()} notes` : "insufficient data",
    summary: "Share of notes inside the largest connected component.",
    calculation: "Finds every component after treating links as bidirectional, then divides the largest by all analyzed notes.",
    range: `🟢 ≥${thresholds.coreGood}% · 🟡 ≥${thresholds.coreWatch}% and <${thresholds.coreGood}% · 🔴 below ${thresholds.coreWatch}%`,
    action: !enoughGraph
      ? "Add at least two notes before evaluating the main core."
      : coreLevel === "good"
      ? "Preserve a few meaningful bridges between topical areas."
      : "Connect isolated areas through bridge notes that genuinely relate the topics.",
    priority: 2,
  }),
];

const signals = [
  metric({
    id: "density", label: "Density", value: density.toFixed(densityDigits), level: densityLevel,
    state: !enoughGraph ? "insufficient data" : outgoingPerNote < thresholds.densityGood[0] ? "sparse" : outgoingPerNote > thresholds.densityGood[1] ? "dense" : "balanced",
    summary: "Share of all possible directed links that exist.",
    calculation: "Directed links ÷ (notes × (notes − 1)). The suggested range scales with vault size.",
    range: `🟢 ${densityRange}, equivalent to ${thresholds.densityGood[0]}–${thresholds.densityGood[1]} outgoing links per note · 🟡 inside ${thresholds.densityWatch[0]}–${thresholds.densityWatch[1]} but outside green · 🔴 beyond that.`,
    action: !enoughGraph ? "Add at least two notes before evaluating graph density." : outgoingPerNote < thresholds.densityGood[0] ? "Add links where a note depends on or extends another idea." : outgoingPerNote > thresholds.densityGood[1] ? "Review whether the extra links remain meaningful." : "Keep the current linking rhythm.", priority: 9,
  }),
  metric({
    id: "degree", label: "Avg degree", value: avgDegree.toFixed(2), level: degreeLevel,
    state: !enoughGraph ? "insufficient data" : avgDegree < thresholds.degreeGood[0] ? "thin" : avgDegree > thresholds.degreeGood[1] ? "highly connected" : "balanced",
    summary: "Average number of unique neighboring notes.", calculation: "Adds each note's incoming and outgoing neighbors, then divides by note count.",
    range: `🟢 ${thresholds.degreeGood[0]}–${thresholds.degreeGood[1]} · 🟡 inside ${thresholds.degreeWatch[0]}–${thresholds.degreeWatch[1]} but outside green · 🔴 beyond that.`,
    action: !enoughGraph ? "Add more notes before evaluating average degree." : avgDegree < thresholds.degreeGood[0] ? "Add a small number of contextual links to thin areas." : avgDegree > thresholds.degreeGood[1] ? "Review link usefulness, then use Hub share to judge concentration." : "Maintain the current average while improving weaker notes.", priority: 8,
  }),
  metric({
    id: "median", label: "Median degree", value: medianDegree.toFixed(1), level: medianLevel,
    state: N < 3 ? "insufficient data" : medianDegree < thresholds.medianGood[0] ? "thin middle" : medianDegree > thresholds.medianGood[1] ? "dense middle" : "healthy middle",
    summary: "Connections of the typical middle note.", calculation: "Sorts all note degrees and takes the middle value.",
    range: `🟢 ${thresholds.medianGood[0]}–${thresholds.medianGood[1]} · 🟡 inside ${thresholds.medianWatch[0]}–${thresholds.medianWatch[1]} but outside green · 🔴 beyond that.`,
    action: N < 3 ? "Add at least three notes before evaluating the median." : medianDegree < thresholds.medianGood[0] ? "Add direct contextual links between ordinary notes." : "Preserve direct links between ordinary notes.", priority: 6,
  }),
  metric({
    id: "coverage", label: "Link coverage", value: pct(linkedCoverage), level: coverageLevel,
    state: N < 3 ? "insufficient data" : linkedCoverage >= thresholds.coverageGood ? "broad" : linkedCoverage >= thresholds.coverageWatch ? "uneven" : "limited",
    summary: "Share of notes connected to at least two neighbors.", calculation: "Counts notes with degree 2 or higher, then divides by all analyzed notes.",
    range: `🟢 ≥${thresholds.coverageGood}% · 🟡 ≥${thresholds.coverageWatch}% and <${thresholds.coverageGood}% · 🔴 below ${thresholds.coverageWatch}%`,
    action: N < 3 ? "Add at least three notes before evaluating coverage." : coverageLevel === "good" ? "Keep new notes connected in both directions of context." : "Review zero-link and one-link notes, then connect the ones worth keeping.", priority: 3,
  }),
  metric({
    id: "orphans", label: "Orphans", value: `${orphans.toLocaleString()} · ${pct(orphanPct)}`, level: orphanLevel,
    state: !enoughGraph ? "insufficient data" : orphanLevel === "good" ? "clean" : orphanLevel === "watch" ? "growing" : "high",
    summary: "Notes with no resolved links to another note included in this graph.", calculation: `Counts notes whose in-scope unique-neighbor degree is zero.${orphanBreakdown ? ` Current folders: ${orphanBreakdown}.` : ""}`,
    range: `🟢 ≤${thresholds.orphanGood}% · 🟡 >${thresholds.orphanGood}% and ≤${thresholds.orphanWatch}% · 🔴 above ${thresholds.orphanWatch}%`,
    action: !enoughGraph
      ? "Add at least two notes before evaluating orphans."
      : orphanLevel === "good"
      ? "Review new orphans periodically."
      : orphansMostlyPeriodic
        ? "Most orphans are periodic notes. Connect only the entries meant to join the knowledge graph, and treat the rest as a journal archive."
        : "Connect useful orphans and review the rest for archival.", priority: 1,
  }),
  metric({
    id: "components", label: "Components", value: components.toLocaleString(), level: componentLevel,
    state: !N ? "insufficient data" : components === 1 ? "unified" : componentLevel === "good" ? "few islands" : "fragmented",
    summary: "Disconnected islands inside the analyzed graph, including isolated notes.", calculation: `Counts components after treating links as bidirectional. Fragmentation is extra components ÷ (notes − 1). Current total contains ${orphans.toLocaleString()} single-note orphans and ${multiNoteComponents.toLocaleString()} multi-note islands.`,
    range: `🟢 1 component or at most ${thresholds.componentGood}% fragmentation · 🟡 up to ${thresholds.componentWatch}% · 🔴 above that.`,
    action: !N ? "Add notes before evaluating components." : componentLevel === "good" ? "Keep topical clusters connected by a few meaningful bridges." : "Connect related islands, but do not merge unrelated topics just to improve the number.", priority: 4,
  }),
  metric({
    id: "clustering", label: "Local clustering", value: clustering.toFixed(2), level: clusteringLevel,
    state: !sample.length ? "insufficient data" : clustering < thresholds.clusteringGood[0] ? "loose topics" : clustering > thresholds.clusteringGood[1] ? "tightly clustered" : "thematic",
    summary: "How often a note's neighbors also connect to one another.",
    calculation: `Averages the local clustering coefficient over ${sample.length.toLocaleString()} notes with at least two neighbors${candidates.length > sample.length ? " using a deterministic sample" : ""}.`,
    range: `🟢 ${thresholds.clusteringGood[0].toFixed(2)}–${thresholds.clusteringGood[1].toFixed(2)} · 🟡 inside ${thresholds.clusteringWatch[0].toFixed(2)}–${thresholds.clusteringWatch[1].toFixed(2)} but outside green · 🔴 beyond that.`,
    action: !sample.length ? "Add notes with at least two neighbors before evaluating clustering." : clustering < thresholds.clusteringGood[0] ? "Cross-link closely related notes inside the same topic." : clustering > thresholds.clusteringGood[1] ? "Compare with Main core before deciding whether more bridges are needed." : "Keep a balance between topical triangles and bridges.", priority: 7,
  }),
  metric({
    id: "hubs", label: "Hub share", value: pct(hubShare), level: hubLevel,
    state: !totalDegree ? "insufficient data" : hubLevel === "good" ? "distributed" : hubLevel === "watch" ? "concentrated" : "highly concentrated",
    summary: "Share of all degree held by the top 5% most connected notes.", calculation: `Sums degree across the ${hubCount.toLocaleString()} most connected notes and divides by total degree.`,
    range: `🟢 ≤${thresholds.hubGood}% · 🟡 >${thresholds.hubGood}% and ≤${thresholds.hubWatch}% · 🔴 above ${thresholds.hubWatch}%`,
    action: !totalDegree ? "Add resolved links before evaluating hub concentration." : hubLevel === "good" ? "Keep useful hubs while linking leaf notes directly." : "Reduce dependence on indexes by connecting related leaf notes to each other.", priority: 6,
  }),
  metric({
    id: "deadends", label: "Dead ends", value: deadEnds.toLocaleString(), level: "neutral", ungraded: true,
    summary: "Notes with no resolved outgoing links to another note inside the analyzed graph.",
    calculation: "Counts notes whose in-scope outgoing-neighbor set is empty. Incoming links do not change this value, and a dead end may still belong to the main graph.",
    range: "No preferred range. Terminal notes can be intentional.",
    action: "Inspect only when you expected a note to lead onward.",
  }),
  metric({
    id: "leaves", label: "Leaves", value: leaves.toLocaleString(), level: "neutral", ungraded: true,
    summary: "Notes connected to exactly one other note inside the analyzed graph.",
    calculation: "Counts notes with one unique neighbor after incoming and outgoing links are treated as bidirectional. A leaf with only an incoming link is also a dead end.",
    range: "No preferred range. Leaf notes are a normal part of graph structure.",
    action: "Use this count as a map of the graph edge, not as a target to optimize.",
  }),
  metric({
    id: "unresolved", label: "Unresolved", value: unresolvedPairs.size.toLocaleString(), level: unresolvedLevel,
    state: !N ? "insufficient data" : unresolvedPairs.size === 0 ? "resolved" : unresolvedLevel === "watch" ? "small backlog" : "large backlog",
    summary: "Unique source-to-target pairs that Obsidian cannot resolve.", calculation: `Counts each missing target once per source note, including notes and attachments. Current pairs affect ${unresolvedSources.size.toLocaleString()} notes and contain ${unresolvedLabels.size.toLocaleString()} distinct link paths.`,
    range: `🟢 ${thresholds.unresolvedGood}% · 🟡 above ${thresholds.unresolvedGood}% and up to ${thresholds.unresolvedWatch}% of note count · 🔴 above that.`,
    action: !N ? "Add notes before evaluating unresolved links." : unresolvedPairs.size === 0 ? "Keep link names stable and let Obsidian update renamed targets." : "Review missing targets: create intentional placeholders or correct stale names.", priority: 5,
  }),
];

const metrics = [...primary, ...signals];
const graded = metrics.filter((item) => item.level !== "neutral");
const countLevel = (level) => graded.filter((item) => item.level === level).length;
const healthSummary = enoughGraph
  ? `🟢 ${countLevel("good")} · 🟡 ${countLevel("watch")} · 🔴 ${countLevel("attention")}`
  : "⚪ insufficient data";
const nextMetric = [...graded].sort((a, b) => {
  const severity = { attention: 0, watch: 1, good: 2 };
  return severity[a.level] - severity[b.level] || a.priority - b.priority;
})[0];
const nextMove = !enoughGraph
  ? "Add at least two analyzed notes before interpreting graph health."
  : nextMetric?.level === "good"
  ? "The main graph signals are healthy. Keep the current linking rhythm and review drift over time."
  : nextMetric.action;
const nextIcon = !enoughGraph ? "⚪" : nextMetric?.level === "attention" ? "🔴" : nextMetric?.level === "watch" ? "🟡" : "🟢";

const root = dv.el("section", "", { cls: "vault-metrics" });
const detailsId = `vault-metrics-details-${Math.random().toString(36).slice(2, 9)}`;
const metricHtml = (item, extraClass = "") => {
  const level = LEVEL[item.level];
  return `<div class="vault-metrics__metric ${extraClass}" data-metric="${item.id}" data-level="${item.level}">
    <small>${item.label}</small><b>${item.value}</b>${item.ungraded ? "" : `<span>${level.emoji} ${item.state}</span>`}
  </div>`;
};
const byId = Object.fromEntries(metrics.map((item) => [item.id, item]));

root.innerHTML = `
  <header class="vault-metrics__header"><span>Health signals</span><strong>${healthSummary}</strong></header>
  <div class="vault-metrics__achievement" aria-label="Playful collection-size achievement with its own scope, not a graph health score" data-tooltip-position="top">
    <span class="vault-metrics__achievement-icon">${achievement.emoji}</span>
    <div class="vault-metrics__achievement-copy"><small>Collection achievement</small><strong>${achievement.title}</strong><span>${achievement.caption} · ${achievementN.toLocaleString()} notes · ${achievementNext}</span></div>
    <div class="vault-metrics__achievement-track"><i style="width:${achievementProgress.toFixed(1)}%"></i></div>
  </div>
  <div class="vault-metrics__group-label"><span>Scale</span><small>How large and connected the graph is</small></div>
  <div class="vault-metrics__scale">
    ${metricHtml(byId.notes, "vault-metrics__metric--hero")}
    <div class="vault-metrics__scale-side">${metricHtml(byId.links)}${metricHtml(byId.core)}</div>
  </div>
  <div class="vault-metrics__group-label"><span>Connection rhythm</span><small>What an ordinary note experiences</small></div>
  <div class="vault-metrics__rhythm">${["degree", "median", "coverage", "density"].map((id) => metricHtml(byId[id])).join("")}</div>
  <div class="vault-metrics__group-label"><span>Topology</span><small>Clusters, bridges and concentration</small></div>
  <div class="vault-metrics__topology">
    ${metricHtml(byId.clustering, "vault-metrics__metric--feature")}
    <div class="vault-metrics__topology-side">${metricHtml(byId.components)}${metricHtml(byId.hubs)}</div>
  </div>
  <div class="vault-metrics__group-label"><span>Endpoints</span><small>Where paths stop or narrow</small></div>
  <div class="vault-metrics__endpoints">${metricHtml(byId.deadends)}${metricHtml(byId.leaves)}</div>
  <div class="vault-metrics__maintenance">${metricHtml(byId.orphans, "vault-metrics__metric--wide")}${metricHtml(byId.unresolved)}</div>
  <div id="${detailsId}" class="vault-metrics__details" role="region" aria-live="polite" hidden>
    <div class="vault-metrics__details-head"><strong data-title></strong><span data-current></span><button type="button" aria-label="Close metric details">×</button></div>
    <p data-summary></p>
    <div class="vault-metrics__details-grid"><div><small>Calculation</small><p data-calculation></p></div><div><small>Suggested range</small><p data-range></p></div></div>
    <p class="vault-metrics__metric-action"><small>Next move</small><span data-action></span></p>
  </div>
  <div class="vault-metrics__next"><span>${nextIcon}</span><div><small>Next move</small><p>${nextMove}</p></div></div>`;

const details = root.querySelector(".vault-metrics__details");
const nextPanel = root.querySelector(".vault-metrics__next");
let selectedCell = null;
const closeDetails = () => {
  details.hidden = true;
  nextPanel.hidden = false;
  root.querySelectorAll(".vault-metrics__metric").forEach((cell) => {
    cell.dataset.selected = "false";
    cell.setAttribute("aria-expanded", "false");
  });
  selectedCell?.focus();
};

for (const cell of root.querySelectorAll(".vault-metrics__metric")) {
  const item = metrics.find((metricItem) => metricItem.id === cell.dataset.metric);
  cell.tabIndex = 0;
  cell.setAttribute("role", "button");
  cell.setAttribute("aria-expanded", "false");
  cell.setAttribute("aria-controls", detailsId);
  cell.setAttribute("aria-label", item.ungraded
    ? `${item.label}: ${item.value}. ${item.summary} ${item.range}`
    : `${item.label}: ${item.value}, ${LEVEL[item.level].label}, ${item.state}. ${item.summary} Suggested: ${item.range}`);
  cell.setAttribute("data-tooltip-position", "top");

  const select = () => {
    if (cell.dataset.selected === "true") return closeDetails();
    selectedCell = cell;
    root.querySelectorAll(".vault-metrics__metric").forEach((candidate) => {
      candidate.dataset.selected = String(candidate === cell);
      candidate.setAttribute("aria-expanded", String(candidate === cell));
    });
    const level = LEVEL[item.level];
    details.querySelector("[data-title]").textContent = item.label;
    details.querySelector("[data-current]").textContent = item.ungraded
      ? item.value
      : `${item.value} · ${level.emoji} ${item.state}`;
    details.querySelector("[data-summary]").textContent = item.summary;
    details.querySelector("[data-calculation]").textContent = item.calculation;
    details.querySelector("[data-range]").textContent = item.range;
    details.querySelector("[data-action]").textContent = item.action;
    details.hidden = false;
    nextPanel.hidden = true;
  };

  cell.addEventListener("click", select);
  cell.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      select();
    }
  });
}

details.querySelector("button").addEventListener("click", closeDetails);
