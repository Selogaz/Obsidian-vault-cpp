---
name: 🇩 Daily
enforce_folder: periodic/daily
target:
  query: "#periodic/day"
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
    fixed: 🇩
  focus:
    type: number
    label: 🧿 focus
    min: 0
    max: 10
  learn:
    type: number
    label: 💡 learn
    min: 0
    max: 10
  routine:
    type: number
    label: 🔄 routine
    min: 0
    max: 10
  move:
    type: number
    label: 🧗 move
    min: 0
    max: 10
  connect:
    type: number
    label: 💬 connect
    min: 0
    max: 10
  rest:
    type: number
    label: 🌙 rest
    min: 0
    max: 10
formatting:
  property_order:
    - tags
    - up
    - reviewed
    - cssclasses
    - focus
    - learn
    - routine
    - move
    - connect
    - rest
    - icon
    - created
    - updated
---
