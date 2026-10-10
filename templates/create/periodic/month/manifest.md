---
name: 🇲 Monthly
description: "A monthly note that reviews activity, themes, and project health."
enforce_folder: periodic/monthly
target:
  query: '#periodic/month'
fields:
  tags:
    type: select
    description: "The type of this periodic note. It has exactly one tag."
    label: 🏷️ Tags
    required: true
    default: periodic/month
    options:
      - value: periodic/month
        description: "Use this for every month note."
  up:
    type: multilink
    description: "The quarterly note this period belongs to."
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
    fixed: 🇲
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
