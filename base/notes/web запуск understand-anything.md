---
tags:
  - note/specific/code
  - note/basic/primary
  - category/webdev
aliases:
  - запуск understand-anything
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-06-10T18:28:20+03:00
updated: 2026-06-11T20:03:59+03:00
---

**запуск understand-anything**
—
```zsh
cd ~/.understand-anything-plugin/packages/dashboard && \
GRAPH_DIR="/home/exuberance/Документы/Подземелья Максвелла/front-maxwell" npx vite --host 127.0.0.1
```

```zsh
pkill -f "vite" 2>/dev/null
cd ~/.understand-anything-plugin/packages/dashboard && \
GRAPH_DIR="/home/exuberance/Документы/Подземелья Максвелла/front-maxwell" \
nohup npx vite --host 127.0.0.1 
```
[[web understand-anything команды]]
