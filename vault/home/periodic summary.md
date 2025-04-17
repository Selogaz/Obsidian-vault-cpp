---
aliases:
cssclasses:
  - no-inline-title
  - hide-backlinks
  - remove-dataview-title
  - full-width
  - hide-properties
obsidianUIMode: preview
icon: 🗓️
---

# Quarterly 

```dataviewjs
let p = dv
  .pages('"periodic/quarterly"')
  .where((p) => p.file.name != dv.current().file.name)
  .sort((p) => p.file.name, 'desc')
  .forEach((p) => {
    const cache = this.app.metadataCache.getCache(p.file.path); 
    if (cache) {
      const headings = cache.headings;
      if (headings) {
        dv.header(2, p.file.name);
        const filteredHeadings = headings
          .slice(0)
          .filter((h) => h.level <= 6)
          .map((h) => {
            let indent = "\t".repeat(h.level - 1);
            let linkyHeading =
              "[[" + p.file.name + "#" + h.heading + "|" + h.heading + "]]";

            return indent + "- " + linkyHeading;
          })
          .join("\n");

        dv.el("div", filteredHeadings);
      }
    }
  });
```

# Monthly

```dataviewjs
let p = dv
  .pages('"periodic/monthly"')
  .where((p) => p.file.name != dv.current().file.name)
  .sort((p) => p.file.name, 'desc')
  .forEach((p) => {
    const cache = this.app.metadataCache.getCache(p.file.path); 
    if (cache) {
      const headings = cache.headings;
      if (headings) {
        dv.header(2, p.file.name);
        const filteredHeadings = headings
          .slice(0)
          .filter((h) => h.level <= 6)
          .map((h) => {
            let indent = "\t".repeat(h.level - 1);
            let linkyHeading =
              "[[" + p.file.name + "#" + h.heading + "|" + h.heading + "]]";

            return indent + "- " + linkyHeading;
          })
          .join("\n");

        dv.el("div", filteredHeadings);
      }
    }
  });
```

# Weekly

```dataviewjs
let p = dv
  .pages('"periodic/weekly"')
  .where((p) => p.file.name != dv.current().file.name)
  .sort((p) => p.file.name, 'desc')
  .forEach((p) => {
    const cache = this.app.metadataCache.getCache(p.file.path); 
    if (cache) {
      const headings = cache.headings;
      if (headings) {
        dv.header(2, p.file.name);
        const filteredHeadings = headings
          .slice(0)
          .filter((h) => h.level <= 6)
          .map((h) => {
            let indent = "\t".repeat(h.level - 1);
            let linkyHeading =
              "[[" + p.file.name + "#" + h.heading + "|" + h.heading + "]]";

            return indent + "- " + linkyHeading;
          })
          .join("\n");

        dv.el("div", filteredHeadings);
      }
    }
  });
```

# Daily

```dataviewjs
// https://www.reddit.com/r/ObsidianMD/comments/13nkcuq/table_of_contents_toc_for_a_set_of_notes_using/
let p = dv
  .pages('"periodic/daily"')
  .where((p) => p.file.name != dv.current().file.name)
  .sort((p) => p.file.name, 'desc')
  .forEach((p) => {
    const cache = this.app.metadataCache.getCache(p.file.path); 
    if (cache) {
      const headings = cache.headings;
      if (headings) {
        dv.header(2, p.file.name);
        const filteredHeadings = headings
          .slice(0)
          .filter((h) => h.level <= 6)
          .map((h) => {
            let indent = "\t".repeat(h.level - 1);
            let linkyHeading =
              "[[" + p.file.name + "#" + h.heading + "|" + h.heading + "]]";

            return indent + "- " + linkyHeading;
          })
          .join("\n");

        dv.el("div", filteredHeadings);
      }
    }
  });
```
