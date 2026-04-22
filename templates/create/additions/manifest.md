---
name: ⭕ aggregator
enforce_folder: base/additions/aggregators
target:
  query: "#mark/addition/aggregator"
fields:
  tags:
    type: multiselect
    sort: alphabetical-desc
    label: 🏷️ Tags
    required: true
    strict: false
  created:
    type: date
    hidden: true
  updated:
    type: date
    hidden: true
---
