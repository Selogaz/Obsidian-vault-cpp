---
name: 🇾 Yearly
enforce_folder: periodic/yearly
target:
  query: '#periodic/year'
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
