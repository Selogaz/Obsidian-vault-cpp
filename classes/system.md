---
fields:
  - name: tags
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of tags (system).md
    path: ""
    id: oyqQLQ
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: ihojOG
  - name: category
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/category AND -#mark/ignore")
    path: ""
    id: ZdVdcp
  - name: meta
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/meta AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: ZEBrBX
  - name: problem
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/problem AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.meta) && current.file.frontmatter.meta.some(v => p.file.frontmatter.meta.includes(v)))
    path: ""
    id: liih0Q
  - name: relevant
    type: Boolean
    options: {}
    path: ""
    id: hJk6UX
  - name: icon
    type: Input
    options:
      template: "{{icon}}"
    path: ""
    id: nSASeZ
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2OWСU
version: "2.36"
limit: 200
mapWithTag: false
icon: package
tagNames: 
filesPaths: 
bookmarksGroups: 
excludes: 
extends: 
savedViews: []
favoriteView: 
fieldsOrder:
  - oyqQLQ
  - ihojOG
  - ZdVdcp
  - ZEBrBX
  - liih0Q
  - hJk6UX
  - nSASeZ
  - W2OWСU
---
