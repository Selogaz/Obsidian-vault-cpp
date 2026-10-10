---
name: 🇾 Yearly
description: "A yearly note that reviews long term patterns and sets one priority."
enforce_folder: periodic/yearly
target:
  query: '#periodic/year'
fields:
  tags:
    type: select
    description: "The type of this periodic note. It has exactly one tag."
    label: 🏷️ Tags
    required: true
    default: periodic/year
    options:
      - value: periodic/year
        description: "Use this for every year note."
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
    fixed: 🇾
formatting:
  property_order:
    - tags
    - reviewed
    - cssclasses
    - icon
    - created
    - updated
---
