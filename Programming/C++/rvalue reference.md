Временный ссылочный параметр - особый вид ссылки на временный объект или на результат выражения, который не будет использоваться для ссылки на существующий объект после его создания. Он позволяет передавать временные объекты и выражения в функции как обычные параметры, избегая ненужных копий и улучшая производительность.

Rvalue reference обозначается знаком &&(два амперсанда), и его использование в функции указывает компилятору на то, что этот параметр является временным и может быть оптимизирован. 

rvalue reference могут быть использованы только для передачи временных объектов и результатов выражений и не могут быть использованы для ссылок на существующие объекты. Использование rvalue reference для ссылки на постоянный объект может привести к непредсказуемым результатам и ошибкам в программе.

[[C++]] [[Ссылка]] [[ООП]] [[Конструктор перемещения]] 