---
name: 🖊️ Longform
description: "A project that develops a long work through separate scenes."
target:
  query: "#project/longform"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🖊️
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#5585b5"
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
