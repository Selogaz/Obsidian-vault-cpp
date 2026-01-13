---
limit: 100
mapWithTag: true
icon: glasses
tagNames:
  - project/single
  - project/longform
  - project/short
excludes:
extends:
version: "2.200"
fields:
  - id: qsrvuj
    name: cover
    options:
      template: "{{url}}"
    type: Input
    path: ""
  - id: 2YkbVI
    name: start
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
    type: Date
    path: ""
  - id: Ryj6VJ
    name: end
    options:
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
    type: Date
    path: ""
  - name: tags
    type: Multi
    options:
      valuesList: {}
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of tags (projects).md
      valuesFromDVQuery: ""
    path: ""
    id: WV01w7
  - name: category
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/category AND -#mark/ignore")
    path: ""
    id: YGxO6z
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: FabvXB
  - name: published
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: s303ut
  - name: meta
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/meta AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: Igphqu
  - name: url
    type: Input
    options:
      template: "'\"[{{site}}]({{url}})\"'"
    path: ""
    id: mNXPQV
  - name: problem
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/problem AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.meta) && current.file.frontmatter.meta.some(v => p.file.frontmatter.meta.includes(v)))
    path: ""
    id: ojOTU4
  - name: priority
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": 🇦
        "2": 🇧
        "3": 🇨
        "4": 🇩
        "5": 🇪
    path: ""
    id: mMdPga
  - name: status
    type: Select
    options:
      sourceType: ValuesList
      valuesList:
        "1": ⬛
        "2": ❄
        "3": 🟥
        "4": 🟦
        "5": 🟩
        "6": 📢
    path: ""
    id: 7GrOx8
  - name: creator
    type: MultiFile
    options:
      dvQueryString: 'dv.pages("#contact OR #creator").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))'
    path: ""
    id: tV52l1
  - name: production
    type: MultiFile
    options:
      dvQueryString: dv.pages("#production").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: 26Dmf8
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2oWcu
filesPaths:
bookmarksGroups:
savedViews: []
favoriteView:
fieldsOrder:
  - WV01w7
  - FabvXB
  - 7GrOx8
  - mMdPga
  - s303ut
  - YGxO6z
  - Igphqu
  - ojOTU4
  - tV52l1
  - 26Dmf8
  - mNXPQV
  - 2YkbVI
  - Ryj6VJ
  - qsrvuj
  - W2oWcu
---
