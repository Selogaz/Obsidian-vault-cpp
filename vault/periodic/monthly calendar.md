---
tags:
  - mark/gtd
aliases: []
updated: 2025-03-20T11:17:36+07:00
obsidianUIMode: preview
cssclasses:
  - no-inline-title
  - hide-backlinks
icon: 🗓️
---

```dataviewjs
// https://forum.obsidian.md/t/calendar-for-the-tasks-plugin/88150
// https://share.note.sx/kzlthbn5#bsDfLHGsojDf9LZK2vJ9YMJwsN44yFzfrhxdONOlcgM

moment.locale("en-gb");

const calendarContainer = this.container;
const today = moment().startOf("day");
let displayedMonth = moment(
  sessionStorage.getItem("selectedMonth") || today,
).startOf("month");
let activeTooltip = null;
let tooltipTimeout = null;

// Удаление всех tooltip'ов
const clearTooltips = () =>
  document
    .querySelectorAll(".calendar-tooltip")
    .forEach((tooltip) => tooltip.remove());

// Функция задержки
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Функция для обновления статуса задачи
const updateTaskStatus = async (task) => {
  const tasksApi = app.plugins.plugins["obsidian-tasks-plugin"]?.apiV1;
  if (!tasksApi) {
    console.error("Tasks API недоступен");
    return;
  }

  const file = app.vault.getAbstractFileByPath(task.path);
  if (!(file instanceof obsidian.TFile)) {
    console.error("Файл не найден.");
    return;
  }

  const content = await app.vault.read(file);
  const lines = content.split("\n");
  const taskLineIndex = lines.findIndex((line) => line.includes(task.text));

  if (taskLineIndex === -1) {
    console.log("Задача не найдена в файле.");
    return;
  }

  const updatedTaskLine = tasksApi.executeToggleTaskDoneCommand(
    lines[taskLineIndex],
    file.path,
  );
  if (updatedTaskLine === lines[taskLineIndex]) {
    console.log("Статус задачи не изменился.");
    return;
  }

  lines[taskLineIndex] = updatedTaskLine;
  await app.vault.modify(file, lines.join("\n"));
  console.log("Статус задачи успешно обновлен!");
  task.completed = !task.completed;
};

// Функция для открытия задачи в заметке
const openTaskInNote = (task) => {
  const file = app.vault.getAbstractFileByPath(task.path);
  if (!(file instanceof obsidian.TFile)) return;

  app.workspace
    .getLeaf(false)
    .openFile(file)
    .then(() => {
      const view = app.workspace.getActiveViewOfType(obsidian.MarkdownView);
      if (!view) return;

      const editor = view.editor;
      const content = editor.getValue();
      const taskLine = content
        .split("\n")
        .findIndex((line) => line.includes(task.text));
      if (taskLine === -1) return;

      editor.setCursor({ line: taskLine, ch: 0 });
      editor.scrollIntoView(
        { from: { line: taskLine, ch: 0 }, to: { line: taskLine, ch: 0 } },
        true,
      );
    });
};

// Функция для создания кнопок навигации
const createButton = (text, onClick) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.onclick = onClick;
  return button;
};

// Функция для получения задач на конкретный день
const getTasksForDay = (date) => {
  const dateString = date.format("YYYY-MM-DD");
  return dv
    .pages("#task") // Фильтруем заметки по тегу #task
    .flatMap((p) =>
      p.file.tasks
        .filter((task) => task.text.includes("#task")) // Фильтруем задачи по тегу #task в тексте самой задачи
        .map((task) => ({ ...task, path: p.file.path })),
    )
    .filter((task) => {
      const taskDate = task.text.match(/📅 (\d{4}-\d{2}-\d{2})/);
      return taskDate && moment(taskDate[1], "YYYY-MM-DD").isSame(date, "day");
    });
};

// Функция для обновления содержимого текущего tooltip
const updateActiveTooltip = async (date) => {
  if (!activeTooltip) return;

  // Очистить текущее содержимое tooltip
  activeTooltip.innerHTML = "";

  // Получить обновленные задачи для дня
  const updatedTasks = getTasksForDay(date);

  // Если нет задач, скрыть tooltip
  if (updatedTasks.length === 0) {
    activeTooltip.remove();
    activeTooltip = null;
    return;
  }

  // Создать новые элементы задач
  updatedTasks.forEach((task) => {
    const taskDiv = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.onchange = async () => {
      await updateTaskStatus(task);
      await delay(300); // Задержка, чтобы плагин tasks успел обновиться
      await updateActiveTooltip(date); // Обновить содержимое tooltip
    };

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    taskText.style.cursor = "pointer";
    taskText.onclick = () => openTaskInNote(task);

    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskText);
    taskDiv.style.paddingBottom = "5px";
    activeTooltip.appendChild(taskDiv);
  });
};

// Основная функция для рендеринга календаря
const renderCalendar = () => {
  calendarContainer.innerHTML = "";

  const monthStart = displayedMonth.clone().startOf("month");
  const monthEnd = displayedMonth.clone().endOf("month");
  const firstDayToShow = monthStart.clone().startOf("week");
  const lastDayToShow = monthEnd.clone().endOf("week");

  const days = [];
  let day = firstDayToShow.clone();
  while (day.isBefore(lastDayToShow.clone().add(1, "day"), "day")) {
    days.push(day.clone());
    day.add(1, "day");
  }

  const navContainer = document.createElement("div");
  navContainer.style.cssText =
    "display: flex; gap: 10px; margin-bottom: 10px; justify-content: center;";

  const updateDisplayedMonth = (modifier, unit) => {
    displayedMonth[modifier](1, unit);
    sessionStorage.setItem("selectedMonth", displayedMonth.toISOString());
    renderCalendar();
  };

  navContainer.appendChild(
    createButton("⏪", () => updateDisplayedMonth("subtract", "year")),
  );
  navContainer.appendChild(
    createButton("◀", () => updateDisplayedMonth("subtract", "month")),
  );
  navContainer.appendChild(
    createButton("🏠", () => {
      displayedMonth = moment(today).startOf("month");
      sessionStorage.setItem("selectedMonth", displayedMonth.toISOString());
      renderCalendar();
    }),
  );
  navContainer.appendChild(
    createButton("▶", () => updateDisplayedMonth("add", "month")),
  );
  navContainer.appendChild(
    createButton("⏩", () => updateDisplayedMonth("add", "year")),
  );

  calendarContainer.appendChild(navContainer);

  // Ensure month name is displayed in English
  const title = document.createElement("h3");
  title.textContent = moment(Date.now()).format('MMMM DD, dddd (YYYY-MM-DD)')
  title.style.cssText = "text-align: center; margin-top: 10px;";
  calendarContainer.appendChild(title);

  const calendarGrid = document.createElement("div");
  calendarGrid.style.cssText =
    "display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; margin: 0 auto; max-width: 350px; width: 100%;";

  // English day names
  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach((dayOfWeek) => {
    const dayHeader = document.createElement("div");
    dayHeader.textContent = dayOfWeek;
    dayHeader.style.cssText = "text-align: center; font-weight: bold;";
    calendarGrid.appendChild(dayHeader);
  });

  const tasksCache = new Map();

  const getTasksForDay = (date) => {
    const dateString = date.format("YYYY-MM-DD");
    if (!tasksCache.has(dateString)) {
      tasksCache.set(
        dateString,
        dv
          .pages("#task")
          .flatMap((p) =>
            p.file.tasks.map((task) => ({ ...task, path: p.file.path })),
          )
          .filter((task) => {
            const taskDate = task.text.match(/📅 (\d{4}-\d{2}-\d{2})/);
            return (
              taskDate && moment(taskDate[1], "YYYY-MM-DD").isSame(date, "day")
            );
          }),
      );
    }
    return tasksCache.get(dateString);
  };

  days.forEach((date) => {
    const dayCell = document.createElement("div");
    dayCell.style.cssText =
      "width: 100%; height: 50px; border-radius: 10%; display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer; margin: 2px;";

    dayCell.style.backgroundColor =
      date.month() === displayedMonth.month() ? "#bfbfbf" : "#505050";
    dayCell.style.color = "black";

    if (date.isSame(today, "day")) {
      dayCell.style.cssText +=
        "border: ridge 4px gray; background-color: #bfbfbf; font-weight: bold;";
    }

    const dayNumber = document.createElement("span");
    dayNumber.textContent = date.date();
    dayNumber.style.fontSize = "16px";
    dayCell.appendChild(dayNumber);

    const tasksForDay = getTasksForDay(date);

    if (tasksForDay.length > 0) {
      const incompleteTasks = tasksForDay.filter((task) => !task.completed);
      const completedTasks = tasksForDay.filter((task) => task.completed);

      if (incompleteTasks.length > 0) {
        const redCircle = document.createElement("div");
        redCircle.style.cssText =
          "position: absolute; bottom: 2px; right: 2px; width: 15px; height: 15px; border-radius: 50%; background-color: red; display: flex; justify-content: center; align-items: center; font-size: 12px; color: white;";
        redCircle.textContent = incompleteTasks.length;
        dayCell.appendChild(redCircle);
      }

      if (completedTasks.length > 0) {
        const greenCircle = document.createElement("div");
        greenCircle.style.cssText =
          "position: absolute; bottom: 2px; left: 2px; width: 15px; height: 15px; border-radius: 50%; background-color: green; display: flex; justify-content: center; align-items: center; font-size: 12px; color: white;";
        greenCircle.textContent = completedTasks.length;
        dayCell.appendChild(greenCircle);
      }

      dayCell.onmouseover = () => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);

        tooltipTimeout = setTimeout(() => {
          clearTooltips();

          const tooltip = document.createElement("div");
          tooltip.classList.add("calendar-tooltip");
          tooltip.style.cssText =
            "position: absolute; background-color: #333; color: #fff; border: 1px solid #444; padding: 10px; box-shadow: 0px 0px 10px rgba(0,0,0,0.5); z-index: 10; min-width: 250px; max-width: 400px; border-radius: 5px; transition: opacity 0.3s ease, visibility 0.3s ease; opacity: 0; visibility: hidden; white-space: pre-wrap; word-wrap: break-word;";

          const rect = dayCell.getBoundingClientRect();
          const windowWidth = window.innerWidth;
          const tooltipWidth = 400;
          const offsetX = 10;

          let leftPosition = Math.min(
            rect.left,
            windowWidth - tooltipWidth - offsetX,
          );
          leftPosition = Math.max(leftPosition, 0);

          tooltip.style.top = `${rect.bottom + window.scrollY}px`;
          tooltip.style.left = `${leftPosition}px`;

          document.body.appendChild(tooltip);

          requestAnimationFrame(() => {
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
          });

          // Добавляем задачи в tooltip
          tasksForDay.forEach((task) => {
            const taskDiv = document.createElement("div");
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.onchange = async () => {
              await updateTaskStatus(task);
              await delay(300); // Задержка для обработки плагином tasks
              await updateActiveTooltip(date); // Обновить содержимое tooltip
            };

            const taskText = document.createElement("span");
            taskText.textContent = task.text;
            taskText.style.cursor = "pointer";
            taskText.onclick = () => openTaskInNote(task);

            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(taskText);
            taskDiv.style.paddingBottom = "5px";
            tooltip.appendChild(taskDiv);
          });

          tooltip.onmouseenter = () => {
            if (tooltipTimeout) clearTimeout(tooltipTimeout);
            tooltip.style.opacity = "1";
            tooltip.style.visibility = "visible";
          };

          tooltip.onmouseleave = () => {
            tooltipTimeout = setTimeout(() => {
              if (activeTooltip) {
                activeTooltip.style.opacity = "0";
                activeTooltip.style.visibility = "hidden";
                tooltipTimeout = setTimeout(() => {
                  if (activeTooltip) {
                    activeTooltip.remove();
                    activeTooltip = null;
                  }
                }, 300);
              }
            }, 250);
          };

          activeTooltip = tooltip;
        }, 300); // Задержка перед показом tooltip
      };

      dayCell.onmouseleave = (e) => {
        if (tooltipTimeout) clearTimeout(tooltipTimeout);

        if (activeTooltip) {
          const tooltipRect = activeTooltip.getBoundingClientRect();
          const mouseX = e.clientX;
          const mouseY = e.clientY;
          const isMouseOverTooltip =
            mouseX >= tooltipRect.left &&
            mouseX <= tooltipRect.right &&
            mouseY >= tooltipRect.top &&
            mouseY <= tooltipRect.bottom;

          if (!isMouseOverTooltip) {
            tooltipTimeout = setTimeout(() => {
              if (activeTooltip) {
                activeTooltip.style.opacity = "0";
                activeTooltip.style.visibility = "hidden";
                tooltipTimeout = setTimeout(() => {
                  if (activeTooltip) {
                    activeTooltip.remove();
                    activeTooltip = null;
                  }
                }, 300);
              }
            }, 250);
          }
        }
      };
    }

    calendarGrid.appendChild(dayCell);
  });

  calendarContainer.appendChild(calendarGrid);
};

// Рендерим календарь при загрузке
renderCalendar();
```
