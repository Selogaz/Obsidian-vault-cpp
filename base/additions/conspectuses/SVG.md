---
tags:
  - source/article/paper
  - mark/log/conspectus
  - category/js
  - category/html
  - category/css
aliases: []
status: 🟦
source:
  - "[[full stack itproger]]"
next:
url:
start: 2026-01-30T10:35:39+03:00
end:
created: 2026-01-30T10:35:39+03:00
updated: 2026-01-30T10:55:46+03:00
---

> [!toc]+
> ```table-of-contents
> ```

# Определение

SVG - язык разметки масштабируемой векторной графики

# Возможности языка

- Описание путей
- Геометрические фигуры
- Визуальные свойства
- Интерактивность
- Анимация и сценарии

# Главное преимущество

Изображение SVG не чувствительно к уменьшению или растягиванию - качество изображения не падает

# Стандартная структура SVG-файла

Стандартный XML-заголовок, объявление:
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
```

DOCTYPE, определяющий тип документа:
```xml
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
```

Корневой элемент документа с указанием пространства имён SVG:
```xml
<svg version="1.1"
     baseProfile="full" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:ev="http://www.w3.org/2001/xml-events" width="100%" height="100%">
```

Далее располагаются различные объекты, что описаны на языке SVG.

# Пример SVG объекта
```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="198" height="188"
     viewBox="0 0 198 188"
     version="1.1"
     baseProfile="full"
     xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xmlns:ev="http://www.w3.org/2001/xml-events">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="even-odd">
        <polygon id="Star-1" stroke="#979797" stroke-width="3" fill="#F8E81C"
            points="99 154 40 185 51 119 4 73 69 64 99 3 128 64 194 73 147 119 158 185 ">
        </polygon>
    </g>
</svg>
```
