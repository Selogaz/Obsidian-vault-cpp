{% assign name = zt.title | default: zt.citationKey | default: zt.DOI | default: zt.key -%}
{{ name | replace: "/", " - " }}{% suffix %}
