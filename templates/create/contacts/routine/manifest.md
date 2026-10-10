---
name: 🧟 Routine
description: "A contact note for a service provider or recurring interaction."
target:
  query: "#contact/routine"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🧟
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#3a80b5"
formatting:
  property_order:
    - tags
    - aliases
    - description
    - addition
    - category
    - meta
    - problem
    - production
    - relevant
    - icon
    - color
    - cover
    - created
    - updated
---
