---
limit: 100
mapWithTag: false
icon: person-standing
tagNames:
excludes:
extends:
version: "2.89"
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
      valuesListNotePath: templates/lists/list of tags (creator).md
      valuesFromDVQuery: ""
    path: ""
    id: jYbs5S
  - name: meta
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/meta").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: S8O4eM
  - name: category
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/category")
    path: ""
    id: KXUgKN
  - name: problem
    type: MultiFile
    options:
      dvQueryString: dv.pages("#system/high/problem").where(p => Array.isArray(p.file.frontmatter.meta) && current.file.frontmatter.meta.some(v => p.file.frontmatter.meta.includes(v)))
    path: ""
    id: VVTZs3
  - name: production
    type: MultiFile
    options:
      dvQueryString: dv.pages("#production").where(p => Array.isArray(p.file.frontmatter.category) && current.file.frontmatter.category.some(v => p.file.frontmatter.category.includes(v)))
    path: ""
    id: UQoHq5
  - name: relevant
    type: Boolean
    options: {}
    path: ""
    id: Ne4p82
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2oWСU
  - name: description
    type: Input
    options:
      template: "{{info}}"
    path: ""
    id: MNLxKO
filesPaths:
  - base/creators
bookmarksGroups:
savedViews: []
favoriteView:
fieldsOrder:
  - jYbs5S
  - GdGlea
  - MNLxKO
  - KXUgKN
  - S8O4eM
  - VVTZs3
  - UQoHq5
  - Ne4p82
  - W2oWСU
---
