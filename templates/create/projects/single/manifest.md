---
name: ✏️ Single
description: "A compact project managed as one main body of work."
enforce_folder: projects
target:
  query: "#project/single"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: ✏️
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#b87535"
formatting:
  property_order:
    - tags
    - aliases
    - description
    - published
    - addition
    - status
    - priority
    - category
    - meta
    - problem
    - creator
    - production
    - start
    - end
    - url
    - cover
    - icon
    - color
    - created
    - updated
---
