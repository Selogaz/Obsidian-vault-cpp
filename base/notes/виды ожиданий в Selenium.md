---
tags:
  - note/specific/code
  - category/programming
  - category/java
aliases:
  - виды ожиданий в Selenium
deck: obsidian::programming
cssclasses:
icon: </>
color: "#ab4642"
created: 2026-10-22T12:46:55+04:00
updated: 2026-10-22T13:26:50+04:00
---

**Чем отличаются implicit, explicit и fluent ожидания в Selenium?**
—
Implicit – глобальный таймаут поиска любого элемента. Explicit – ожидание конкретного условия для конкретного элемента. Fluent – explicit с настраиваемой частотой опроса и игнорируемыми исключениями.

## Подробнее

```java
new WebDriverWait(driver, Duration.ofSeconds(10))
    .until(ExpectedConditions.elementToBeClickable(By.id("submit")));
```

- Implicit проверяет только появление элемента в DOM, а не его состояние (видимость, кликабельность).
- Implicit и explicit не смешивают
	- таймауты складываются непредсказуемо. Обычно оставляют только explicit.
- Selenide ждёт сам
	- `$("#submit").shouldBe(visible).click()`, по умолчанию до 4 с.

Почему не `Thread.sleep` – в [[Thread.sleep в автотестах]].
