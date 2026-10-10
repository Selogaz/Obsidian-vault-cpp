---
name: 🔔 Podcast
description: "A production note that groups episodes from one podcast show."
target:
  query: "#production/podcast"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🔔
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#c85545"
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
