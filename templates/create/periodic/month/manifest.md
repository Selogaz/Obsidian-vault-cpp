---
name: 🇲 Monthly
enforce_folder: periodic/monthly
target:
  query: '#periodic/month'
fields:
  reviewed:
    type: boolean
    label: 👁️ reviewed
    required: true
    default: false
  icon:
    type: text
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
