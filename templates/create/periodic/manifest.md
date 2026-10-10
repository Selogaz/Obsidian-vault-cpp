---
name: ⭕ periodic
description: "A dated note that connects planning and reflection across time."
fields:
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
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
---
