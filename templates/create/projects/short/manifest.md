---
name: 🗞️ Short
description: "A publishing project for one short piece such as a post."
enforce_folder: projects
target:
  query: "#project/short"
fields:
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🗞️
  color:
    type: text
    description: "The color for this note type."
    required: true
    hidden: true
    fixed: "#a39070"
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
