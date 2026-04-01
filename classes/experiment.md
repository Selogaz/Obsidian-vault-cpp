---
limit: 200
mapWithTag: true
icon: flask-conical
tagNames:
  - mark/addition/experiment
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - oIRWAJ
  - 0bxm0C
  - 4jdJtJ
  - iAuKUf
  - 6sNMVW
  - njqdpn
  - JABSYp
  - W2OdСU
version: "2.81"
fields:
  - name: tags
    type: Multi
    options:
      sourceType: ValuesList
      valuesList:
        "1": mark/addition/experiment
    path: ""
    id: oIRWAJ
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🟥
        "2": 🟩
    path: ""
    id: 0bxm0C
  - name: input
    type: Input
    options:
      template: "{{input data}}"
    path: ""
    id: iAuKUf
  - name: output
    type: Input
    options:
      template: "{{output data}}"
    path: ""
    id: 6sNMVW
  - name: description
    type: Input
    options:
      template: "{{experiment description}}"
    path: ""
    id: njqdpn
  - name: attribute
    type: Input
    options:
      template: "{{grouping attribute}}"
    path: ""
    id: JABSYp
  - name: project
    type: MultiFile
    options:
      dvQueryString: dv.pages("#project")
    path: ""
    id: 4jdJtJ
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2OdСU
---
