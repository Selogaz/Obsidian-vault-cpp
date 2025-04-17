---
limit: 100
mapWithTag: false
icon: factory
tagNames: 
excludes: 
extends: 
version: "2.90"
fields:
  - name: aliases
    type: YAML
    options: {}
    path: ""
    id: GdGlea
  - name: tags
    type: Multi
    options:
      valuesList: {}
      sourceType: ValuesListNotePath
      valuesListNotePath: templates/lists/list of tags (production).md
      valuesFromDVQuery: ""
    path: ""
    id: jYbs5S
  - name: created
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: 9fvLkY
  - name: updated
    type: Date
    options:
      dateShiftInterval: 1 day
      dateFormat: YYYY-MM-DD
      defaultInsertAsLink: false
      linkPath: ""
    path: ""
    id: gcxIO5
  - name: meta
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/meta AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: S8O4eM
  - name: category
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/category AND -#mark/ignore")
    path: ""
    id: KXUgKN
  - name: problem
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/problem AND -#mark/ignore").where(p => Array.isArray(p.file.frontmatter.meta) && current.file.frontmatter.meta.some(v => p.file.frontmatter.meta.includes(v)))
    path: ""
    id: VVTZs3
  - name: production
    type: MultiFile
    options:
      dvQueryString: dv.pages("#production").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: Z9h0AF
  - name: relevant
    type: Boolean
    options: {}
    path: ""
    id: ietQvj
filesPaths:
  - base/productions
bookmarksGroups: 
savedViews: []
favoriteView: 
fieldsOrder:
  - jYbs5S
  - GdGlea
  - KXUgKN
  - S8O4eM
  - VVTZs3
  - Z9h0AF
  - ietQvj
  - gcxIO5
  - 9fvLkY
---
