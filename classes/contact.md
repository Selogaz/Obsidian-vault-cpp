---
limit: 100
mapWithTag: false
icon: contact
tagNames:
excludes:
extends:
version: "2.94"
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
      valuesListNotePath: templates/lists/list of tags (contact).md
      valuesFromDVQuery: ""
    path: ""
    id: jYbs5S
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
    id: iejRHL
  - name: relevant
    type: Boolean
    options: {}
    path: ""
    id: rphbiY
  - name: cssclasses
    type: Multi
    options:
      sourceType: ValuesListNotePath
      valuesList: {}
      valuesListNotePath: templates/lists/list of cssclasses.md
    path: ""
    id: W2oWСu
  - name: description
    type: Input
    options:
      template: "{{info}}"
    path: ""
    id: dI8yxi
filesPaths:
  - base/contacts
bookmarksGroups:
savedViews: []
favoriteView:
fieldsOrder:
  - jYbs5S
  - GdGlea
  - dI8yxi
  - KXUgKN
  - S8O4eM
  - VVTZs3
  - iejRHL
  - rphbiY
  - W2oWСu
---
