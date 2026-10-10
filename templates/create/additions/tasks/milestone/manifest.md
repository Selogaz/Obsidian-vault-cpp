---
name: 📍 Milestone
description: "A project checkpoint that groups tasks toward one result."
exclude:
  - milestone
target:
  query: "#task/milestone"
fields:
  tags:
    type: multiselect
    description: "The type of this task note, plus category tags kept in sync with the category links."
    label: 🏷️ Tags
    required: true
    strict: false
    options:
      - value: task/default
        description: "Use this for one action that belongs to a project."
        label: ✔️ task
      - value: task/milestone
        description: "Use this for a checkpoint that groups project tasks."
        label: 📍 milestone
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 📍
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#dc9656"
formatting:
  property_order:
    - tags
    - aliases
    - description
    - id
    - attribute
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
