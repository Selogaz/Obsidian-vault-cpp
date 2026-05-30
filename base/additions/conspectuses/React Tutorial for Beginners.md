---
tags:
  - source/video/recording
  - mark/log/conspectus
  - category/webdev
aliases:
  - Конспект React Tutorial for Beginners
status: 🟩
source:
  - "[[Учебник по React для начинающих]]"
start: 2026-05-26T21:30:00+03:00
end:
next:
url: https://youtu.be/SqcY0GlETPk
icon: 📓
color: "#6f97c8"
updated: 2026-05-27T12:55:08+03:00
category:
  - "[[webdev]]"
creator:
  - "[[Mosh Hamedani]]"
published: 2023-03-12
total_hours: 1.5
---

> [!toc]+
> ```table-of-contents
> ```

# 1. Введение

React — библиотека для построения пользовательских интерфейсов. Разработана Facebook. Позволяет создавать SPA (Single Page Applications) с переиспользуемыми компонентами.

**Prerequisites:** HTML, CSS, JavaScript (ES6+ — стрелочные функции, модули, классы). React знать не нужно.

**React 18 + TypeScript** — стек курса.

# 2. Настройка окружения

- **Node.js** v16+
- Редактор кода (VS Code)
- **Create React App** (устаревающий подход) → **Vite** (рекомендуемый)

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm run dev
```

## Структура проекта (Vite)

```
my-app/
├── index.html          # точка входа
├── src/
│   ├── main.tsx        # рендер корневого компонента
│   ├── App.tsx         # корневой компонент
│   └── main.tsx        # ReactDOM.createRoot
├── package.json
├── tsconfig.json
└── vite.config.ts
```

`main.tsx`:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
[[web React.StrictMode]]

# 3. Компоненты

[[web компонент]]

## JSX

[[web jsx]]

## Фрагменты (Fragments)

```tsx
<>
  <h1>Title</h1>
  <p>Text</p>
</>
```

Сокращение `<></>` — не создаёт лишний DOM-узел.

# 4. Как работает React

[[web virtual dom]]

# 5. Экосистема React

- **React** — ядро (UI)
- **ReactDOM** — рендер в браузере
- **TypeScript** — типизация
- **React DevTools** — инспектор компонентов
- **Vite** — сборщик (замена CRA)
- Дополнительно: React Router, Axios, React Query, Zustand/Redux

# 6. ListGroup Component

Пример компонента со списком:

```tsx
function ListGroup() {
  const items = ['New York', 'Los Angeles', 'Chicago', 'Houston'];
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            key={item}
            className={selectedIndex === index ? 'list-group-item active' : 'list-group-item'}
            onClick={() => setSelectedIndex(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
```

**Ключевые моменты:**

[[web react key]]
[[web map]]
- `useState<T>(-1)` — хук состояния с типом

# 7. Рендеринг списков

```tsx
{items.map((item) => <li key={item}>{item}</li>)}
```

**Key** — стабильный идентификатор: `item.id` > `item` > `index` (index — только если массив статичен).

# 8. Условный рендеринг

[[web условный рендеринг]]

# 9. Обработка событий

```tsx
<button onClick={(event) => console.log(event)}>Click</button>
<button onClick={handleClick}>Click</button>
```

- Тип события в TS: `React.MouseEvent<HTMLButtonElement>`
- Предотвращение стандартного поведения: `event.preventDefault()`

```tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log(event.clientX, event.clientY);
};
```

# 10. Управление состоянием (useState)

[[web useState]]

# 11. Пропсы (Props)

[[web props]]

# 12. Передача функций через Props

[[web паттерн lifting state up]]

# 13. State vs Props

[[web state vs props]]
# 14. Children (передача дочерних элементов)

[[web передача дочерних элементов]]

# 15. React DevTools

[[web react DevTools]]

**Установка:** Chrome Web Store → React Developer Tools.

# 16. Практика: Button Component

Задача: создать переиспользуемый `Button` с кастомизацией цвета, текста, иконки и обработчика клика, имитируя Bootstrap-стили.

```tsx
interface ButtonProps {
  children: string;
  color?: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
}

function Button({ children, color = 'primary', onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${color}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

# 17. Практика: Alert Component

Задача: создать компонент `Alert`, который можно закрыть по кнопке.

```tsx
interface AlertProps {
  children: ReactNode;
  onClose: () => void;
}

function Alert({ children, onClose }: AlertProps) {
  return (
    <div className="alert alert-warning alert-dismissible">
      {children}
      <button type="button" className="btn-close" onClick={onClose} />
    </div>
  );
}
```

# Выводы

- React строится на **компонентах** — переиспользуемых, композируемых единицах UI
- **JSX** — декларативный синтаксис для описания разметки
- **useState** — базовый механизм реактивности
- **Props** — способ коммуникации между компонентами
- Поток данных — **однонаправленный** (сверху вниз)
- TypeScript добавляет типовую безопасность на всех уровнях
- Курс закладывает фундамент для более глубокого изучения: эффектов, контекста, маршрутизации, работы с API
