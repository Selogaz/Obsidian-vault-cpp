---
name: 🇶 Quarterly
enforce_folder: periodic/quarterly
target:
  query: '#periodic/quarter'
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
