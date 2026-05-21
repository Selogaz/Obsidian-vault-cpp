---
tags:
  - note/specific/code
  - category/webdev
aliases:
  - аудит проекта
deck: obsidian::webdev
icon: </>
color: "#ab4642"
created: 2026-05-10T21:00:37+03:00
updated: 2026-05-11T00:37:01+03:00
---

**аудит проекта**
—
# Аудит проекта: критические проблемы

## 1. 🔴 TEST_MODE=true В auth-роутах в проде-готовом коде

[src/app/api/auth/login/route.ts:7](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/api/auth/login/route.ts#L7), [register/route.ts:7](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/api/auth/register/route.ts#L7), [me/route.ts:5](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/api/me/route.ts#L5) — `TEST_MODE = true` принимает любые данные и создаёт сессию. Если такой билд уйдёт на staging/прод, любой запрос с `?test=true` (а в `test-auth/page.tsx` — это всегда true) логинит произвольного пользователя.

**Решение.** Заменить на `process.env.NODE_ENV !== 'production' && process.env.AUTH_TEST_MODE === '1'` и убрать query-флаг `?test=true` со всех страниц. Лучше — целиком вынести тестовый режим за пределы продового бандла через separate route или env-условный `notFound()`.

## 2. 🔴 Дубликат верстки desktop ↔ mobile для каждого шага

27 файлов в [character/sections/](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/sections/), 7230 строк. Каждый шаг существует дважды: `CharacterRaceStep.tsx` и `CharacterRaceStepMobile.tsx` — почти идентичная логика выбора, разная только обёртка. Любая доработка (добавить поле, поправить адаптер) делается в двух местах, и история сессии показывает, что они уже разъезжаются.

**Решение.** Вынести логику шага (пропсы, обработчики, состояние списка) в headless-хук `useStepX(...)`, а `Step` и `StepMobile` оставить тонкими «оболочками-вьюхами». Альтернатива на уровне CSS — один компонент с responsive-версткой через Tailwind breakpoints (`md:hidden`/`hidden md:block`), как сделано в `page.tsx`. Это уменьшит площадь ошибок вдвое.

## 3. 🔴 [page.tsx](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx) — 700 Строк, держит всё

Один файл содержит: `ContinueButton`/`BackButton`, лоадер, error state, динамическую генерацию шагов, `handleCreateCharacter` с маппингом DTO, а также массивный switch по `currentStep` с пробросом ~15 пропсов в каждый компонент шага. Нарушает «не складывать всё в один файл» из AGENTS.md.

**Решение.**

- Кнопки → `components/ui/CharacterContinueButton.tsx` / `CharacterBackButton.tsx`.
- Маппинг `selection → CreateCharacterRequest` → `lib/characterDraft.ts` (`buildCreateCharacterPayload(selection, totalStats)`). Сейчас это инлайн в обработчике, который никем не тестируется.
- Switch шагов → `<CharacterStepRouter currentStep=... />` с одной таблицей `{ id: ... , Component, mobileComponent, props }`.

## 4. 🟠 Утечка состояния между шагами при сборке payload

В [page.tsx](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx) `handleCreateCharacter` молча `return`'ит, если поля не выбраны (`selection.alignment`, `selection.origin` и т.п.). Кнопка при этом активна (`disabled={false}` в [page.tsx:643](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx#L643)), и пользователь жмёт «Создать персонажа» — ничего не происходит, ошибки нет. Та же кнопка на mobile: `onNext={handleNext}` без визуального состояния.

**Решение.** Использовать `canCreateCharacter` из `useCharacter` (он уже там есть!) как `disabled` для ContinueButton на шаге `spells`. Плюс добавить toast/inline-ошибку при `createCharacter` failure — сейчас только `console.warn` ([page.tsx](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx) в `catch`).

## 5. 🟠 [useCharacter.ts](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/hooks/useCharacter.ts) — 756 Строк, god-hook

Один хук грузит races, subraces, classes, subclasses, backgrounds, alignments, spells, держит локальный selection, считает totalStats, randomize-ит всё, авто-выбирает дефолтные подрасы. У него ~30 точек return и куча useEffect с deps вроде `[selection.characterClass?.id, selection.subClass?.id]` — отсюда race condition'ы (см. историю сессии: «гном мерцал», «tiefling-zariel»).

**Решение.** Разбить на:

- `useCharacterCatalog()` — все справочники (races/classes/...).
- `useCharacterSelection()` — мутации + derived state.
- `useSpellsForSelection(classId, subclassId)` — POST /spells, изолированно.
- `useSubclassesForClass(classId)` — изолированно.

Это уберёт связанные deps и каскадные эффекты.

## 6. 🟠 Нет глобального error UX

`createCharacter` (только что подключённый), `getSpells`, `getFirstLevelSubclasses` — все ошибки уходят в `console.warn`. Пользователь видит зависшую кнопку или пустой список и не понимает, что бэк отдал 502/403.

**Решение.** Добавить минимальный `useToast` (sonner или своё на 30 строк) и единый `apiClient` в `services/_client.ts`, который кидает типизированную `ApiError` с code/status/body — и тостит её на верхнем уровне. Сейчас каждый сервис изобретает свой парсинг `response.text()`.

## 7. 🟡 Inline-styles + `<style jsx>` для скрытия скроллбаров — повторено 6+ раз

13 случаев `<style jsx>` или фиксированной высоты. Например, `.origin-mobile-scroll`, `.alignment-mobile-scroll`, `.spells-mobile-scroll` — три почти идентичных блока CSS.

**Решение.** Один утилитарный класс в `globals.css`:

```css
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
```

И заменить все вхождения. Заодно убрать магические `height: '409px'` — лучше `flex-1 min-h-0`, чтобы скролл работал без хардкода.

## 8. 🟡 Хардкод mock-данных в [services/character.ts](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/services/character.ts) при работающем бэкенде

Файл на 95 строк отдаёт хардкодные races/classes/subClasses/origins. По AGENTS.md эти данные теперь идут из `/api/character-builder/*`, но `getCharacterData()` всё ещё вызывается в `useCharacter` для structure (steps, statsInfo) и фолбэка. Это запутывает: какой `id: 'human'` (мок) vs UUID (бэк).

**Решение.** Оставить в `character.ts` только то, что реально не приходит с бэка (статичные `steps`, `statsInfo`), и переименовать функцию в `getCharacterStaticData()`. Удалить мок-races/classes — они уже не используются как источник правды.

## 9. 🟡 16 `console.log/warn/error` Уйдут в прод

Не критично, но засоряет консоль. Половина — диагностика race conditions, которые по идее уже починены.

**Решение.** Завести `lib/logger.ts` с `logger.warn(...)` no-op'ящим в `NODE_ENV === 'production'`, заменить вызовы. Или просто отчистить устаревшие логи.

## 10. 🟡 Inventory/proficiencies Всегда пустые в `createCharacter`

В только что добавленной [character-create.ts](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/services/character-create.ts) → [page.tsx](vscode-webview://0anlt4kj9jaeu08hr47t2vr4o3rrn0b8dhrnohrps2cj868a93pj/src/app/\(game\)/game/character/page.tsx) `handleCreateCharacter` — `proficiencies.skills: []`, `inventory.items: []`. Бэк это примет, но персонаж будет «лысым».

**Решение.** Это требует доработки UI (этапы выбора навыков/языков/стартового снаряжения, которых сейчас нет в визарде). Минимум — затащить дефолты с бэка: для класса есть `proficiencies.skills.choose: N` и `from: ClassSkillItem[]` — на этапе stats или нового шага дать выбрать N навыков. Иначе финальный персонаж не валиден по правилам D&D.

---

# Приоритеты, если делать поэтапно

1. **Сейчас** — #1 (security), #4 (`disabled={!canCreateCharacter}` + toast на ошибку API). Минимум кода, максимум пользы.
2. **Следующий спринт** — #3 (вынести `buildCreateCharacterPayload` + `StepRouter`) и #7 (no-scrollbar utility). Это рефакторинг без изменения поведения.
3. **Стратегически** — #2 (схлопнуть desktop/mobile дублёры) и #5 (распилить `useCharacter`). Эти два дадут максимальный долгосрочный выигрыш, но требуют 1–2 дня рефакторинга и регрессионного тестирования всего визарда.
4. **Перед запуском в прод** — #10 (выбор навыков/инвентаря), #8 (вычистить мок-данные), #9 (логи).

# Декомпозиция приоритета №3

## Часть A — Распилить `useCharacter.ts` (756 строк → ~150)

Сначала useCharacter, потому что новые мини-хуки сделают рефакторинг шагов проще: схлопывая desktop/mobile, я буду опираться уже на чистый API хуков, а не на god-hook.

### A1. Подготовка

1. **A1.1** Создать `src/hooks/character/` директорию.
2. **A1.2** Снять snapshot текущего поведения визарда: пройти все шаги вручную, записать что куда selectится, какие race-conditions сейчас есть. Это reference для регрессии.
3. **A1.3** Зафиксировать публичный API `useCharacter` (что именно используется на стороне `page.tsx`) — grep по `useCharacter()` в проекте, выписать список потребляемых полей. Это нужно, чтобы новые хуки покрывали всё, что сейчас торчит наружу.

### A2. Извлечь катологи (read-only справочники с бэка)

1. **A2.1** Создать `useCharacterCatalog()` — грузит `races`, `classes`, `backgrounds`, `alignments` (статичные списки, не зависящие от выбора). Возвращает `{raceOptions, classOptions, backgroundOptions, alignmentOptions, loading, error}`.
2. **A2.2** Создать `useSubracesForRace(raceId)` — грузит подрасы выбранной расы. Изолирует cascade `race → subraces`.
3. **A2.3** Создать `useSubclassesForClass(classId, level)` — грузит подклассы выбранного класса 1 уровня. Только если у класса `subclassSelectionLevel === 1`.
4. **A2.4** Создать `useSpellsForSelection(classId, subclassId)` — POST `/spells`. Возвращает `{cantripChoices, spellChoices, loading}`.

### A3. Извлечь selection-логику

1. **A3.1** Создать `useCharacterSelection()` — держит `selection` state + selectters (`selectRace`, `selectSubRace`, `selectClass`, ..., `setName`, `setGender`, `updateStats`). Чистая мутация state без сетевых вызовов.
2. **A3.2** Извлечь `randomize*` функции в `useCharacterRandomizer(selection, catalog)` — зависит от каталога и текущего selection, дёргает методы из A3.1.
3. **A3.3** Извлечь `totalStats`, `usedPoints`, `raceBonuses` derivations в `useCharacterDerived(selection, catalog)` (или просто чистые функции в `lib/characterStats.ts`, без хука).

### A4. Извлечь side-effects авто-выбора

1. **A4.1** Извлечь auto-pick первой расы / дефолтной подрасы (DEFAULT_SUBRACE_BY_RACE) в отдельный `useCharacterAutoselect(selection, catalog, dispatch)` — это эффект, который ставит дефолты при появлении новых данных. Чтобы было ясно, какие useEffect'ы тут side-effect'ят, а какие чисто read.

### A5. Композиция

1. **A5.1** Переписать `useCharacter()` как тонкий композитор поверх A2–A4. Сохранить тот же return-объект (по A1.3). Файл должен ужаться ~до 150 строк.
2. **A5.2** Прогнать визард end-to-end на dev. Сравнить со снимком A1.2. Особое внимание: гном/тифлинг (известные race conditions из истории), переключение класса с/на класс с подклассом.

### A6. Очистка

1. **A6.1** Удалить мок-данные из `services/character.ts`, оставить только статичные `steps` + `statsInfo` (#8 из аудита, идёт в довесок). Переименовать в `getCharacterStaticData()`.
2. **A6.2** Снять `console.warn` оставшиеся после стабилизации (#9 из аудита).

---

## Часть B — Схлопнуть desktop/mobile дублёры

Делаю шаг за шагом: пилотный шаг, потом масштабируем шаблон. Не делаю всё сразу — каждый шаг нужно протестировать визуально на двух breakpoint'ах.

### B1. Выбор стратегии и пилот

1. **B1.1** **Решить, как схлопывать**: вариант α — single component с responsive Tailwind (`md:` / `hidden md:block`); вариант β — headless `useStepX()` хук + два тонких `<View>` компонента. Зафиксировать решение в `AGENTS.md`. Без этого решения остальные шаги бессмысленны.
2. **B1.2** **Пилот на одном простом шаге** — `CharacterNameStep` + `CharacterNameStepMobile`. Самый маленький, без сложного state. Проверить, что выбранный подход реально схлопывает код, а не плодит дополнительные обёртки.
3. **B1.3** Пройти проверку end-to-end на узком и широком экранах (≤768px и ≥1024px). Если выбранный подход неудобен — откатить и попробовать другой. Лучше переделать пилот, чем тиражировать ошибку на 8 шагов.

### B2. Простые шаги (без cascade-dependencies)

1. **B2.1** Схлопнуть `CharacterGenderStep` ↔ `CharacterGenderStepMobile`.
2. **B2.2** Схлопнуть `CharacterAlignmentStep` ↔ `CharacterAlignmentStepMobile`.
3. **B2.3** Схлопнуть `CharacterOriginStep` ↔ `CharacterOriginStepMobile`.

### B3. Шаги выбора с скроллом и карточками

1. **B3.1** Схлопнуть `CharacterRaceStep` ↔ `CharacterRaceStepMobile`. Здесь больше логики (icons, info-modal, scroll-thumb), но шаг изолирован.
2. **B3.2** Схлопнуть `CharacterSubRaceStep` ↔ `CharacterSubRaceStepMobile`. Зависит от `useSubracesForRace` из A2.2 — должно быть готово.
3. **B3.3** Схлопнуть `CharacterClassStep` ↔ `CharacterClassStepMobile`.
4. **B3.4** Схлопнуть `CharacterSubClassStep` ↔ `CharacterSubClassStepMobile`. Зависит от A2.3.

### B4. Сложные шаги

1. **B4.1** Схлопнуть `CharacterStatsStep` ↔ `CharacterStatsStepMobile`. Сложнее: 6 +/- кнопок, рекомендованные/сброс, валидация диапазона. Тестировать distribute-points аккуратно.
2. **B4.2** Схлопнуть `CharacterSpellsStep` ↔ `CharacterSpellsStepMobile`. Самый большой шаг (selectedCantrips + selectedSpells, лимиты, кнопка "Создать персонажа"). Зависит от A2.4.

### B5. StepRouter (#3 из аудита, попутный refactor)

1. **B5.1** В `page.tsx` switch по `currentStep` сейчас занимает ~400 строк (после схлопывания шагов один компонент на шаг — но всё ещё швах ~15 пропсов на каждый). Вынести в `<CharacterStepRouter currentStep="..." {...stepProps} />` с одной таблицей шагов.
2. **B5.2** Убрать дублирующую логику навигации (`isFirstStep` / `isLastStep` рассчитывается одинаково в каждом step-компоненте).

### B6. Финал

1. **B6.1** Прогнать весь визард на узком и широком экранах ещё раз — golden path + edge cases:
		- Класс с подклассом (Sorcerer/Warlock/Cleric) — проверить что step "Подкласс" появляется и работает.
		- Раса без подрасы (Half-Orc?) — проверить, что шаг подрасы корректно скипается/показывается.
		- Spells шаг — лимиты cantrips/spells, кнопка "Создать персонажа" блокируется когда `!canCreateCharacter`.
		- "Случайная генерация" заполняет всё.
2. **B6.2** Удалить старые `*StepMobile.tsx` файлы окончательно.
3. **B6.3** Обновить `AGENTS.md`: убрать упоминания `*StepMobile.tsx` из списка структуры.

---

## Оценка

- **Часть A:** ~10–14 часов чистой работы (A1.3 + A2 + A3 + A5 — самое объёмное; A4 + A6 — мелочи).
- **Часть B:** ~12–16 часов (~1–1.5 часа на каждый шаг + B5 + регрессия). B1.3 ОБЯЗАТЕЛЬНО, иначе риск переделать всё.
- **Итого ~3–4 рабочих дня** при последовательной работе. Можно растянуть, делая по одной задаче за коммит, чтобы регрессии локализовались.

## Порядок и зависимости

- A → B: B2.2/B3.2/B3.4/B4.2 зависят от A2 (новые мини-хуки).
- A1.3 — критичен. Не уверен, что покрыл — не начинай A2.
- B1.3 — gate, без зелёной проверки на пилоте B2 не начинать.
- B5 можно делать после B4 или **между** B3 и B4 (когда уже половина шагов схлопнута, но ещё не все — будет видно, какие пропсы реально общие).
