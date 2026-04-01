---
limit: 100
mapWithTag: true
icon: scroll
tagNames:
  - mark/scene
excludes: 
extends: 
version: "2.13"
fields:
  - id: AjTWYL
    name: tags
    options:
      valuesList:
        "1": scene
      sourceType: ValuesList
      valuesListNotePath: ""
      valuesFromDVQuery: ""
    type: Select
    path: ""
  - id: q9fO81
    name: status
    options:
      valuesList:
        "1": 💡
        "2": 🟥
        "3": 🧠
        "4": 🔎
        "5": 🟦
        "6": 📋
        "7": 🖍
        "8": ⏳
        "9": 🟩
        "10": ⬛
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of statuses.md
      valuesFromDVQuery: ""
    type: Select
    path: ""
  - id: A07XkG
    name: up
    options:
      dvQueryString: dv.pages('"projects/longform"').file.filter(p => dv.func.contains(p.tags, "project/longform"))
    type: File
    path: ""
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: w2OWСU
filesPaths: 
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - AjTWYL
  - q9fO81
  - A07XkG
  - w2OWСU
---
