---
name: ⭕ aggregator
description: "A container that groups supporting material for another note."
enforce_folder: base/additions/aggregators
target:
  query: "#mark/addition/aggregator"
fields:
  tags:
    type: multiselect
    description: "The addition type and other marks applied here."
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  created:
    type: date
    description: "When this note was created."
    hidden: true
  updated:
    type: date
    description: "When this note was last updated."
    hidden: true
---
