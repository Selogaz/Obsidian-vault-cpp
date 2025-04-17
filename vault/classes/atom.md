---
fields:
  - id: xyhsd1
    name: status
    options:
      valuesList:
        "1": 🟥
        "2": 🟦
        "3": 🟩
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of statuses.md
      valuesFromDVQuery: ""
    type: Select
    path: ""
  - id: qboKed
    name: deck
    options:
      valuesList: {}
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of decks.md
      valuesFromDVQuery: ""
    type: Select
    path: ""
  - id: 1DLCae
    name: cssclasses
    options:
      valuesList:
        "1": full-width
        "2": hide-backlinks
        "3": hide-properties
        "4": no-inline-title
        "5": remove-dataview-title
      sourceType: ValuesList
      valuesListNotePath: ""
      valuesFromDVQuery: ""
    type: Multi
    path: ""
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: IkD7ff
  - name: created
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 3GP9Y8
  - name: updated
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: hF9z9Q
  - name: tags
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of tags (notes).md
    path: ""
    id: AwHz5o
version: "2.47"
limit: 100
mapWithTag: true
icon: atom
tagNames: 
filesPaths:
  - base/notes
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - AwHz5o
  - IkD7ff
  - qboKed
  - 1DLCae
  - xyhsd1
  - 3GP9Y8
  - hF9z9Q
---
