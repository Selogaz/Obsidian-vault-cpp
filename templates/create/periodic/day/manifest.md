---
name: 🇩 Daily
description: "A daily note for briefings, tasks, reflection, and personal scores."
enforce_folder: periodic/daily
target:
  query: "#periodic/day"
fields:
  tags:
    type: select
    description: "The type of this periodic note. It has exactly one tag."
    label: 🏷️ Tags
    required: true
    default: periodic/day
    options:
      - value: periodic/day
        description: "Use this for every day note."
  up:
    type: multilink
    description: "The weekly note this period belongs to."
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
    fixed: 🇩
  focus:
    type: number
    description: "How well you sustained attention today from 0 to 10."
    label: 🧿 focus
    min: 0
    max: 10
  learn:
    type: number
    description: "How much useful learning happened today from 0 to 10."
    label: 💡 learn
    min: 0
    max: 10
  routine:
    type: number
    description: "How well you followed your routine today from 0 to 10."
    label: 🔄 routine
    min: 0
    max: 10
  move:
    type: number
    description: "How active you were today from 0 to 10."
    label: 🧗 move
    min: 0
    max: 10
  connect:
    type: number
    description: "How connected you felt to other people today from 0 to 10."
    label: 💬 connect
    min: 0
    max: 10
  rest:
    type: number
    description: "How well you rested and recovered today from 0 to 10."
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
