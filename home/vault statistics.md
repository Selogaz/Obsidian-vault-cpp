---
icon: 📊
obsidianUIMode: preview
cssclasses:
  - hide-backlinks
  - vault-statistics-page
  - hide-properties
---

````tabs
tab: Activity
`$=await dv.view("templates/views/heatmap")`

tab: Graph health
`$=await dv.view("templates/views/metrics")`

tab: Vault contents
`$=await dv.view("templates/views/statistics")`
````
