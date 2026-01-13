---
tags:
  - note/specific/code
  - category/java
aliases: []
deck: obsidian::work
created: 2025-05-31 06:12:23+03:00
updated: 2025-09-28T06:31:58+03:00
sr-due: 2025-10-18
sr-interval: 20
sr-ease: 270
---

**Equals**
—
Сравнивает объекты по *внутреннему состоянию*.

Отличие от == в том, что == *сравнивает ссылки*.

- [x] #task/inbox #category/work условия для переопределения [[java equals()]][^1] ✅ 2025-06-06

метод класса Object для проверки идентичности объектов

Реализация по умолчанию проверяет равенство ссылок:
```java
public boolean equals(Object obj) {
   return (this == obj);
}

```

Контракт equals:
- Рефлексивность - экземпляр должен быть равен сам себе
- Консистентность - если экземпляры равны, то без внешних воздействий они должны оставаться равны
- Симметрия - если A.equals(B), то и B.equals(A)
- Транзитивность - если А равен В и В равен С, то А равен С
- Сравнение существующего объекта с null должно возвращать false

equals тесно связан с методами hashCode и compareTo

Когда можно не переопределять equals:
- Для перечислений enum
- Когда важны сами экземпляры, а не данные внутри них. Пример - классы Thread, RecursiveTask
- Сравнение объектов вообще не предполагается. Пример - класс Pattern
- В базовом классе уже есть equals, и на подходит эта реализация
- Класс имеет модификатор доступа private или по умолчанию и мы уверены, что метод equals не будет вызван

# Реализация equals при наличии наследования

Допустим, есть класс Parent и его наследник Child. Если нельзя сравнивать родителя и наследника, использует getClass
```java
public boolean equals(Object o) {
  if (this == o) return true;

  if (o == null || getClass() != o.getClass()) 
    return false;

  return this.getX() == p.getX();
}

```

Если сравнивать Parent и Child допустимо, использует instanceof:
```java
public boolean equals(Object o) {
  if (this == o) return true;

  if (!(o instanceof Parent p) 
    return false;
  return this.getX() == p.getX();
}

```

# Правильное и неправильное использование equals

- В records уже определен equals по всем полям
- В Lombok есть аннотация `@EqualsAndHashCode`
- Object.equals (из пакета java.util) поможет сократить проверки на null
- ❌ Неправильно использовать Object.equals для целого объекта:
```java
public boolean equals(Object o) {     
  return Objects.equals(this, o); 
}

```
- ✅ Правильно: использовать Object.equals для полей, где возможен null
```java
public boolean equals(Object o) { 
  ...   
  return this.id.equals(user.id) && Objects.equals(this.name, user.name); 
}

```

[^1]: [](“Если вы хотите переопределить equals(), какие условия должны выполняться?” ([“java-interview/core”](zotero://select/library/items/T3X9ZD57)) ([snapshot](zotero://open-pdf/library/items/2GAN5TQF?sel=div%3Anth-child(375)%20%3E%20h2&annotation=9PLJNAL7)))
