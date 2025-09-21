---
limit: 200
mapWithTag: true
icon: presentation
tagNames:
  - mark/addition/report
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - PsUdhD
  - m0XPzP
  - jilWAO
  - W2OdСg
version: "2.14"
fields:
  - name: tags
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": mark/addition/report
    path: ""
    id: PsUdhD
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🟥
        "2": 🟩
    path: ""
    id: m0XPzP
  - name: project
    type: MultiFile
    options:
      dvQueryString: dv.pages("#project")
    path: ""
    id: jilWAO
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2OdСg
---
