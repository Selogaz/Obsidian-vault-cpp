---
name: ✏️ Single
enforce_folder: projects
target:
  query: "#project/single"
fields:
  icon:
    type: text
    required: true
    hidden: true
    fixed: ✏️
  color:
    type: text
    required: true
    hidden: true
    fixed: "#b87535"
formatting:
  property_order:
    - tags
    - aliases
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
