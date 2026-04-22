---
name: 🗺️ Category
enforce_folder: base/categories
target:
  query: "#system/category"
fields:
  tags:
    type: multiselect
    sort: alphabetical
    label: 🏷️ Tags
    required: true
    options:
      - value: mark/aggregator
        label: ⇶ aggregator
      - value: mark/ignore
        label: 🚫 ignore
      - value: mark/no_sync
        label: ❌ no_sync
    strict: false
  aliases:
    type: list
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  relevant:
    type: boolean
    label: 📌 Relevant
    required: true
    default: false
  icon:
    type: text
    required: true
    hidden: true
    default: 🗺️
  color:
    type: text
    required: true
    hidden: true
    fixed: "#2a9080"
formatting:
  property_order:
    - tags
    - aliases
    - cssclasses
    - relevant
    - icon
    - color
---
