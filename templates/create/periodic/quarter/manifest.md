---
name: 🇶 Quarterly
description: "A quarterly note that reviews direction, synthesis, and project results."
enforce_folder: periodic/quarterly
target:
  query: '#periodic/quarter'
fields:
  tags:
    type: select
    description: "The type of this periodic note. It has exactly one tag."
    label: 🏷️ Tags
    required: true
    default: periodic/quarter
    options:
      - value: periodic/quarter
        description: "Use this for every quarter note."
  up:
    type: multilink
    description: "The yearly note this period belongs to."
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
    fixed: 🇶
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
