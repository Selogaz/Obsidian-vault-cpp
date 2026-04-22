---
name: 🔎 Meta-note
enforce_folder: base/_meta-notes
target:
  query: "#system/high/meta"
fields:
  addition:
    type: list
    label: ➕ Addition
    sort: alphabetical
  category:
    type: multilink
    label: 🗺️ Category
    sort: alphabetical
    required: true
    source:
      js: 'return dv.pages("#system/category AND -#mark/ignore").map(p => ({ value: p.file.name, label: (p.icon || "🗺️") + " " + p.file.name }))'
  icon:
    type: text
    required: true
    hidden: true
    default: 🔎
  color:
    type: text
    required: true
    hidden: true
    fixed: "#6fa8d6"
  created:
    type: date
    hidden: true
  updated:
    type: date
    hidden: true
formatting:
  property_order:
    - tags
    - aliases
    - addition
    - relevant
    - category
    - icon
    - color
    - created
    - updated
---
