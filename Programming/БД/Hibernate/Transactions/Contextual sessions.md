Большинству приложений, использующих Hibernate, требуется та или иная форма контекстного сеанса, при котором данный сеанс действует во всей области данного контекста. Однако в разных приложениях определение того, что представляет собой контекст, обычно различно; разные контексты определяют разные рамки понятия текущего.
контекстные сеансы на основе JTA — это все, что вам нужно использовать
Однако, начиная с версии 3.1, обработка SessionFactory.getCurrentSession() теперь является подключаемой.
[[Transactions]]