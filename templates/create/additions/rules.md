---
name: additions follow their parent
rules:
  - name: drop with project
    description: "Drops an open addition or task when its project is dropped."
    when:
      and:
        - "status=📥 OR status=🟥 OR status=❄"
        - project: { when: "status=⬛" }
    then:
      set: { status: ⬛ }
  - name: drop with source
    description: "Drops an open addition when its source is dropped."
    when:
      and:
        - "status=📥 OR status=🟥 OR status=❄"
        - source: { when: "status=⬛" }
    then:
      set: { status: ⬛ }
---
