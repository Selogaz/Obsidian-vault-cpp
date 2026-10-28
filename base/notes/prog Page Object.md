---
tags:
  - note/specific/code
  - category/programming
aliases:
  - Page Object
deck: obsidian::programming
cssclasses:
icon: </>
color: "#ab4642"
created: 2026-10-22T12:46:55+04:00
updated: 2026-10-22T12:46:55+04:00
---

**Что такое паттерн Page Object?**
—
Класс на страницу или её компонент: внутри локаторы и методы-действия, а тест описывает только сценарий и проверки.

## Подробнее

Зачем:
- локатор меняется в одном месте, а не во всех тестах;
- тест читается как сценарий, а не как набор низкоуровневых команд;
- повторяющиеся блоки (шапка, меню) выносятся в классы-компоненты и переиспользуются.

Методы возвращают следующую страницу, поэтому тест читается цепочкой:

```java
new LoginPage(driver)
    .login("user", "pass")   // возвращает MainPage
    .openProfile();          // возвращает ProfilePage
```

> [!tip] Частый уточняющий вопрос
> Проверки (assert) живут в тестах, а не в Page Object. Page Object только описывает страницу и действия на ней.

Инструменты: в Selenium – Page Factory (`@FindBy` + `PageFactory.initElements`), в Selenide поля объявляют как `SelenideElement` без инициализации.
