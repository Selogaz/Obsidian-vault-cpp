---
tags:
  - note/specific/code
  - category/java
aliases:
  - Facade
deck: obsidian::java
created: 2025-08-10T12:33:26+03:00
updated: 2025-10-08T18:52:25+03:00
sr-due: 2025-10-12
sr-interval: 4
sr-ease: 279
---

**Facade**
—
# Fill the gaps

предоставляет интерфейс к сложной системе, скрывает её сложность. Внутри себя объект делегирует вызовы в другие компоненты.

Пример: jdbcTemplate в Spring, [[java API gateway|API gateway]] в [[java микросервисы|микросервисах]]

# Refactoring guru

Предоставляет упрощенный интерфейс к библиотеке, фреймворку или другому набору классов. **Скрывает сложность системы**

```java
// Подсистема: работа с базой данных
class OrderDatabase {
    public void saveOrder(String orderDetails) {
        System.out.println("Заказ сохранен в базе данных: " + orderDetails);
    }
}

// Подсистема: обработка платежей
class PaymentProcessor {
    public boolean processPayment(double amount) {
        System.out.println("Оплата успешно проведена: $" + amount);
        return true; // Предположим, что оплата всегда успешна
    }
}

// Подсистема: доставка
class ShippingService {
    public void shipOrder(String address) {
        System.out.println("Заказ отправлен по адресу: " + address);
    }
}

// Фасад
class OrderFacade {
    private OrderDatabase database;
    private PaymentProcessor paymentProcessor;
    private ShippingService shippingService;

    public OrderFacade() {
        this.database = new OrderDatabase();
        this.paymentProcessor = new PaymentProcessor();
        this.shippingService = new ShippingService();
    }

    // Упрощенный метод для оформления заказа
    public void placeOrder(String orderDetails, double amount, String address) {
        System.out.println("Начинаем оформление заказа...");
        database.saveOrder(orderDetails);
        paymentProcessor.processPayment(amount);
        shippingService.shipOrder(address);
        System.out.println("Заказ успешно оформлен!");
    }
}

// Использование
public class FacadeDemo {
    public static void main(String[] args) {
        // Создаем фасад
        OrderFacade orderFacade = new OrderFacade();

        // Оформляем заказ через фасад
        orderFacade.placeOrder("Новый ноутбук", 1200.0, "ул. Ленина, д. 10");
    }
}
```
