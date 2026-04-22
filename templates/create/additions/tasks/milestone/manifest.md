---
name: 📍 Milestone
exclude:
  - milestone
target:
  query: "#task/milestone"
fields:
  tags:
    type: select
    label: 🏷️ Tags
    required: true
    options:
      - value: task/default
        label: ✔️ task
      - value: task/milestone
        label: 📍 milestone
  icon:
    type: text
    required: true
    hidden: true
    fixed: 📍
  color:
    type: text
    required: true
    hidden: true
    fixed: "#dc9656"
formatting:
  property_order:
    - tags
    - aliases
    - id
    - attribute
    - description
    - project
    - status
    - priority
    - related
    - blockedBy
    - category
    - meta
    - problem
    - creator
    - production
    - url
    - start
    - end
    - icon
    - color
    - created
    - updated
---
