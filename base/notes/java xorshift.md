---
tags:
  - note/specific/code
  - category/java
aliases:
  - xorshift
deck: obsidian::java
icon: </>
color: "#ab4642"
created: 2026-03-05T17:17:24+03:00
updated: 2026-03-05T17:17:24+03:00
---

**xorshift**
—
алгоритм генерации псевдослучайных чисел (PRNG), основанный на битовых операциях XOR и сдвига
```c
int xorshift(int x) {
	x ^= x << 13;//сдвиг влево на 13 бит, xor с оригиналом
	x ^= x >> 17;//сдвиг вправо на 17 бит, xor
	x ^= x << 5;//сдвиг влево на 5 бит, xor
	return x;
}
```
Почему используется в hashcode?
- Очень быстрый - несколько битовых операций без умножения/деления
- Хорошее распределение - младшие биты равномерно распределены
- Обратим(частично) - зная текущее состояние, можно восстановить предыдущее

- [ ] #task/inbox #category/java - Что значит равномерное распределение битов?

модифицированный xorshift для лучшего распределения в [[HotSpot VM]]:
```c
static inline int32_t hashcode(intptr_t x) {
	x ^= (x >> 33);
	x ^= 0xjlkasjdflkjasdfULL;
	x ^= (x >> 33);
	x ^= 0xJLSHdflhalskhdfULL;
	x ^= (x >> 33);
	return (int32_t) x;
}
```