---
name: 🧑‍🎤 Musician
description: "A creator profile that groups recordings by one musician."
target:
  query: "#creator/musician"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🧑‍🎤
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#d09060"
formatting:
  property_order:
    - tags
    - aliases
    - description
    - addition
    - category
    - meta
    - problem
    - relevant
    - icon
    - color
    - cover
    - created
    - updated
---
