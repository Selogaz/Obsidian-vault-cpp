---
fields:
  - id: qboKed
    name: deck
    options:
      valuesList: {}
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of decks.md
      valuesFromDVQuery: ""
    type: Select
    path: ""
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: IkD7ff
  - name: tags
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of tags (notes).md
    path: ""
    id: AwHz5o
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: AIbU7X
  - name: created
    type: DateTime
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DDTHH:mm:ssZ
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 0sYzbQ
  - name: updated
    type: DateTime
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DDTHH:mm:ssZ
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: E9GYH2
  - name: icon
    type: Input
    options:
      template: "{{icon}}"
    path: ""
    id: xPV8i7
version: "2.97"
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
  - AIbU7X
  - xPV8i7
  - 0sYzbQ
  - E9GYH2
---
