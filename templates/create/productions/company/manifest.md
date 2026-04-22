---
name: 💼 Company
target:
  query: "#production/company"
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: 💼
  color:
    type: text
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
    - created
    - updated
---
