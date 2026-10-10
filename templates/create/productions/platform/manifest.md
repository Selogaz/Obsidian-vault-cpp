---
name: 🏨 Platform
description: "A production note for a service that hosts or distributes content."
target:
  query: "#production/platform"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🏨
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
