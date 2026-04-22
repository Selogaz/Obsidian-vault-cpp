---
name: 🤵 Actor
target:
  query: "#creator/actor"
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 🤵
  color:
    type: text
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
    - created
    - updated
---
