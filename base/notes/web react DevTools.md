---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - react DevTools
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-26T22:04:12+03:00
updated: 2026-05-27T12:41:34+03:00
tasks:
  - '- [ ] #task/inbox #category/webdev - ждет завершения <font color="#ffff00">гидратации</font>'
  - '- [ ] #task/inbox #category/webdev - Вызывает callbacks через <font color="#ffff00">useLayoutEffect</font> (например, сигнал `window.__NEXT_HYDRATED = true`)'
  - '- [ ] #task/inbox #category/webdev - Измеряет <font color="#ffff00">Web Vitals</font> через <font color="#ffff00">useEffect</font>'
  - "- [ ] #task/inbox #category/webdev Другое определение - клиентский React-корень, создаваемый `hydrateRoot()`."
  - '- [ ] #task/inbox #category/webdev - Получает <font color="#ffff00">Flight-поток</font> (<font color="#ffff00">RSC payload</font>) через `useServerResponse()`'
  - "- [ ] #task/inbox #category/webdev - Рендерит `<AppRouter>` внутри себя"
  - '- [ ] #task/inbox #category/webdev Другое определение - корень <font color="#ffff00">React Server Components</font>, создаваемый React-рантаймом для <font color="#ffff00">RSC-дерева</font>. Содержит Server Components, которые отрендерились на сервере и пришли на клиент в виде <font color="#ffff00">RSC Payload</font> (компактного бинарного представления).'
  - "- [ ] #task/inbox #category/webdev createRoot()"
  - "- [ ] #task/inbox #category/webdev hydrateRoot"
---

**react DevTools**
—
components - выбрать какой-нибудь элемент из списка - выпадет меню

глазик
в этом меню есть глазик - нажатие на него переведет на соответсвующий элемент в dom

жук
выводит пропсы, хуки, кем отрисованы, путь до файла

!
вводит компонент в error-state. Не просто так оно сюда добавлено.

Браузерное расширение для инспекции:
- Дерево компонентов (props, state)
- Хуки и их значения
- Производительность (Profiler)
- Source-карты для дебага

# HeadManagerContext.Provider

React-контекст из библиотеки `react-helmet-async`. Используется HelmetProvider'ом для передачи состояние `<head>` вниз по дереву компонентов.

*Чтобы его отрендерить*, используется `HelmetProvider`(который *внутри* рендерит `HeadManagerContext.Provider`), а дочерние `<Helmet>` компоненты через этот контекст читают/записывают метаданные для title, meta, link, script и тд

```tsx
// react-helmet-async создаёт:
const HeadManagerContext = React.createContext<HeadManager | null>(null);
// HelmetProvider рендерит:
<HeadManagerContext.Provider value={managerInstance}>
  {children}
</HeadManagerContext.Provider>
```

# Root and ServerRoot

## Root

Next.js runtime
лежит в `packages/next/clients/index.tsx`. *Компонент-обертка*, который:
- [ ] #task/inbox #category/webdev - ждет завершения <font color="#ffff00">гидратации</font>
- [ ] #task/inbox #category/webdev - Вызывает callbacks через <font color="#ffff00">useLayoutEffect</font> (например, сигнал `window.__NEXT_HYDRATED = true`)
- [ ] #task/inbox #category/webdev - Измеряет <font color="#ffff00">Web Vitals</font> через <font color="#ffff00">useEffect</font>
- [ ] #task/inbox #category/webdev Другое определение - клиентский React-корень, создаваемый `hydrateRoot()`.

## ServerRoot

Next.js runtime
 из `packages/next/client/components/app-router.tsx` и `client/index.tsx`
 Клиентский компонент, который:
- [ ] #task/inbox #category/webdev - Получает <font color="#ffff00">Flight-поток</font> (<font color="#ffff00">RSC payload</font>) через `useServerResponse()`
 - Вызывает `response.readRoot()` - рендерит серверные компоненты на клиенте
- [ ] #task/inbox #category/webdev - Рендерит `<AppRouter>` внутри себя
- [ ] #task/inbox #category/webdev Другое определение - корень <font color="#ffff00">React Server Components</font>, создаваемый React-рантаймом для <font color="#ffff00">RSC-дерева</font>. Содержит Server Components, которые отрендерились на сервере и пришли на клиент в виде <font color="#ffff00">RSC Payload</font> (компактного бинарного представления).

Вместе они реализуют архитектуру React Server Components: серверная часть идёт в ServerRoot, клиентская — в Root. React *"сшивает" эти два дерева* через границу клиентских компонентов. Можно проверить: если компонент использует useState/useEffect, он *гарантированно окажется под Root*, а обычный серверный *компонент без 'use client' — под ServerRoot.*

web RSC payload
компактное бинарное представление

- [ ] #task/inbox #category/webdev createRoot()
- [ ] #task/inbox #category/webdev hydrateRoot
