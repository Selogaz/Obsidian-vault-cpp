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
  - name: icon
    type: Input
    options:
      template: "{{icon}}"
    path: ""
    id: xPV8i7
version: "2.99"
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
---
