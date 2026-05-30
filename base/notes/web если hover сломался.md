---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - если hover сломался
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T15:47:18+03:00
updated: 2026-05-26T15:47:18+03:00
---

**если hover сломался**
—
На основе анализа кода, вот что я нашёл:
# Анализ проблемы
После изучения всех компонентов мобильного меню расы (RaceStepMobile.tsx, page.tsx, MobilePanelSwitcher.tsx, MobileStepFrame.tsx, embla-carousel) — прямой причины в коде нет: нет ни прозрачного fixed-наложения на весь экран, ни pointer-events: none на body, ни программного отключения hover-эффектов.
Однако есть косвенная причина, связанная с Embla Carousel:
## Наиболее вероятная причина
Сценарий: вы открыли страницу создания персонажа в режиме мобильной эмуляции Chrome DevTools (или на touch-устройстве), свайпнули по embla-carousel (Gender ↔ Race ↔ SubRace), и после выхода из мобильного режима touch-эмуляция "залипла".
Вот как это работает:
1. Embla Carousel (используется на строке 111 page.tsx) регистрирует pointer/touch-обработчики на контейнере для обработки свайпов
2. Когда вы взаимодействуете с каруселью в мобильном режиме (или touch-устройстве), браузер переключается в touch-режим
3. В touch-режиме браузер не синтезирует mouse-события (или синтезирует их не полностью)
4. CSS :hover-эффекты работают только через mouse-события — если их нет, hover не срабатывает
5. Chrome DevTools, после выключения мобильной эмуляции, не всегда корректно сбрасывает touch-режим
## Почему это не баг верстки
- md:hidden / hidden md:flex — корректно переключают mobile/desktop вьюхи
- В коде нет preventDefault() на touch-событиях (embla использует passive listeners)
- Нет touch-action: none, которое могло бы заблокировать mouse-события
- Нет прозрачных overlay-элементов с fixed + inset-0, висящих в DOM
## Как проверить / исправить
**Проверка**: Обновите страницу (F5) — hover должен вернуться. Если да — это "залипший" touch-режим.
**Решение**: Нужно добавить в useEmblaCarousel опцию `{ watchDrag: false }` на десктопе, либо обернуть инициализацию карусели в проверку 
```js
matchMedia('(pointer: coarse)'):
const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const [emblaRef] = useEmblaCarousel({
  axis: 'x',
  loop: false,
  align: 'start',
  skipSnaps: false,
  watchDrag: isTouchDevice, // не перехватывать pointer-события на десктопе
});
```
Это предотвратит регистрацию touch-обработчиков на устройствах с мышью, исключая "залипание" touch-режима.