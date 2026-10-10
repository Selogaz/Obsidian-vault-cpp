---
name: 👤 Working
description: "A contact note for a colleague or professional collaborator."
target:
  query: "#contact/working"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 👤
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
