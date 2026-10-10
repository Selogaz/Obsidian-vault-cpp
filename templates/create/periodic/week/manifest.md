---
name: 🇼 Weekly
description: "A weekly note that reviews recent work and sets the next focus."
enforce_folder: periodic/weekly
target:
  query: '#periodic/week'
fields:
  tags:
    type: select
    description: "The type of this periodic note. It has exactly one tag."
    label: 🏷️ Tags
    required: true
    default: periodic/week
    options:
      - value: periodic/week
        description: "Use this for every week note."
  up:
    type: multilink
    description: "The monthly note this period belongs to."
    label: ⬆️ Up
    validate_exists: false
  reviewed:
    type: boolean
    description: "Whether this period has been reviewed."
    label: 👁️ reviewed
    required: true
    default: false
  icon:
    type: text
    description: "The icon for this note type."
    required: true
    hidden: true
    fixed: 🇼
formatting:
  property_order:
    - tags
    - up
    - reviewed
    - cssclasses
    - icon
    - created
    - updated
---
