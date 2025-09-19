---
tags:
  - note/specific/code
  - category/java
aliases:
  - collection injection
deck: obsidian::java
created: 2025-06-15T09:28:12+03:00
updated: 2025-06-18T14:42:03+03:00
sr-due: 2025-06-22
sr-interval: 4
sr-ease: 283
---

**collection injection**
—
[[Spring Framework]] позволяет описывать коллекции и внедрять их в конструкторы и поля бинов
```xml
<bean id = "conversionService"
        class = "org.springframework.format.support.FormattingConversionServiceFactoryBean">
        <property name = "converters">
            <set>
                <bean
                    class = "ru.urvanov.virtualpets.server.convserv.BookToApiConverter" />
                <bean
                    class = "ru.urvanov.virtualpets.server.convserv.ClothToApiConverter" />
                <bean
                    class = "ru.urvanov.virtualpets.server.convserv.DrinkToApiConverter" />
                <bean
                    class = "ru.urvanov.virtualpets.server.convserv.FoodToApiConverter" />
                <bean
                    class = "ru.urvanov.virtualpets.server.convserv.PetToApiConverter" />
            </set>
        </property>
    </bean>
```

Здесь в поле `converters` бина `conversionService` внедряется реализация интерфейса java.util.Set с бинами экземпляров классов `BookToApi..., ClothToApi... etc`

Аналогичным образом можно внедрять реализации java.util.List, используя элемент `list` и реализации java.util.Map, применяя `map`.

[[java пример внедрения коллекции List]]

[[java внедрение реализации интерфейса java.util.Map]]

[[java создание бинов util in security.xml]]
