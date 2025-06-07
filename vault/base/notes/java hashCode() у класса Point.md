---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 07:23:06+03:00
updated: 2025-06-05T17:39:57+03:00
sr-due: 2025-06-13
sr-interval: 8
sr-ease: 250
image: https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png
---

Если у класса Point{int x, y;} реализовать метод
```java
equals(Object that) {
(return this.x == that.x && this.y == that.y)
}
```
но сделать хэш код в виде
```java
int hashCode() {
	return x;
}
```
, то будут ли корректно такие точки помещаться и извлекаться из HashSet?
—
Новый элемент будет успешно добавлен в HashSet. Извлечение элемента также будет осуществляться успешно. Но *производительность такого кода будет невысокой*, из-за неэффективности хэш-функции, которая cпособна породить *большое количество [[java коллизия|коллизий]]*.

```dataviewjs
// dataviewjs
const notes = dv.pages("#note").where(p => p.file.frontmatter.image)

const container = dv.el("div", "", {
  attr: {
    style: "display: flex; flex-wrap: wrap; gap: 8px;"
  }
})

notes.forEach(p => {
  const noteElement = dv.el("span", "", {
    attr: {
      style: `
        display: inline-flex; 
        align-items: center; 
        padding: 6px 10px; 
        background-color: var(--background-secondary); 
        border-radius: 6px;
        border: 1px solid var(--background-modifier-border);
        white-space: nowrap;
      `
    }
  })
  
  dv.el("img", "", {
    container: noteElement,
    attr: {
      src: p.file.frontmatter.image,
      style: `
	    width: 30px;
	    height: 30px;
	    margin-right: 6px;
	    border: none;
	  `
    }
  })
  
  dv.el("span", p.file.link, {
    container: noteElement
  })
  
  container.appendChild(noteElement)
})
```

- [ ] #task/inbox #category/obsidian интересная ссылка с иконкой
