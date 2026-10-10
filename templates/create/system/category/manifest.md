---
name: 🗺️ Category
description: "A stable domain that organizes related work and knowledge."
enforce_folder: base/categories
target:
  query: "#system/category"
fields:
  tags:
    type: multiselect
    description: "The type and marks applied to this category."
    sort: alphabetical
    label: 🏷️ Tags
    required: true
    options:
      - value: mark/aggregator
        description: "Use this for a category that collects related notes."
        label: ⇶ aggregator
      - value: mark/ignore
        description: "Use this to hide the category from filtered lists."
        label: 🚫 ignore
      - value: mark/no_sync
        description: "Use this to keep the category out of synchronization."
        label: ❌ no_sync
    strict: false
  aliases:
    type: list
    description: "Other names for this note."
    label: 🔖 Aliases
    sort: alphabetical
    required: true
  description:
    type: text
    description: What knowledge belongs in this category.
    label: 🪪 Description
    required: true
  cssclasses:
    type: multiselect
    description: "The display styles applied to this note."
    label: ⚙️ cssclasses
    options:
      - value: full-width
        description: "Use this to make the note use the full width."
      - value: hide-backlinks
        description: "Use this to hide backlinks."
      - value: hide-properties
        description: "Use this to hide properties."
      - value: no-inline-title
        description: "Use this to hide the note title."
      - value: remove-dataview-title
        description: "Use this to hide Dataview titles."
      - value: hide-embed-heading
        description: "Use this to hide headings in embedded notes."
      - value: task-contrast
        description: "Use this to increase contrast for tasks."
      - value: hide-bases-header
        description: "Use this to hide Bases headers."
      - value: hover-bases-header
        description: "Use this to show Bases headers only on hover."
      - value: category
        description: "Use this for the category dashboard layout."
  relevant:
    type: boolean
    description: "Whether this note is still relevant."
    label: 📌 Relevant
    required: true
    default: false
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    default: 🗺️
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#2a9080"
formatting:
  property_order:
    - tags
    - aliases
    - description
    - cssclasses
    - relevant
    - icon
    - color
---
