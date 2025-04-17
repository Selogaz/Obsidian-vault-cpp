---
icon: 〽️
---

The headings and format of the prefix assignment are hard-coded. Prefixes are set and read from this file.
___

Prefixes can be used when creating notes by enclosing them in brackets:
`[[js console.log()]]`

Prefixes can be used when refactoring notes.
```
js consle.log()
The method writes (logs) a message to the console.
```
If you highlight the text above and then press `alt+f`, a note will be created where
- `js consle.log()` is the title of the note
- `The method writes (logs) a message to the console.` is the content

___

On the left is the name, on the right are the prefixes (separator `|`).

# Categories

computer_science – cs
english – en|eng

```yaml
note title.md
---
tags:
  - note/specific/exact
  - category/computer_science
aliases: []
deck: obsidian::computer_science
created: 2030-12-12
updated: 2030-12-12
---

Note title
—
content
```

# Specific

// code `%`

git – %git

```yaml
note title.md
---
tags:
  - note/specific/code
aliases:
  - ^git
created: 2030-12-12
updated: 2030-12-12
---

content
```

// exact `!`

nixos – !nix

```yaml
note title.md
---
tags:
  - note/specific/exact
aliases:
  - ^nixos
created: 2030-12-12
updated: 2030-12-12
---

content
```

// default

fabric – fab

```yaml
note title.md
---
tags:
  - note/basic/primary
aliases:
  - ^nixos
created: 2030-12-12
updated: 2030-12-12
---

content
```

# Code

js – js

```yaml
prefix note title().md
---
tags:
  - note/specific/code
  - category/js
aliases:
  - note title
deck: obsidian::js
created: 2030-12-12
updated: 2030-12-12
---

note title
—
content
```

# System

Change only the prefixes

meta – meta|mt
hierarchy – hier
problem – prob

```yaml
note title.md
---
tags:
  - system/high/hierarchy
  - category/knowledge_base
category:
  - "[[knowledge_base]]"
meta:
  - "[[meta]]"
problem:
  - "[[problem]]"
aliases: []
created: 2030-12-12
updated: 2030-12-12
---

😀
```

___

default
```yaml
note title.md
---
tags:
  - note/basic/primary
aliases: []
created: 2030-12-12
updated: 2030-12-12
---

content
```
