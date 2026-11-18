"use strict";

// Keep the planner's data under one namespaced key to avoid collisions
// with other applications that may use localStorage on the same domain.
const STORAGE_KEY = "focusdesk.tasks.v1";

const taskForm = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const taskSummary = document.querySelector("#task-summary");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = loadTasks();
let activeFilter = "all";

/**
 * Read saved tasks safely. Invalid or outdated stored data falls back
 * to an empty list instead of preventing the application from starting.
 */
function loadTasks() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(stored) ? stored : [];
  } catch (error) {
    console.warn("Could not read saved tasks:", error);
    return [];
  }
}

/** Persist the current task collection in this browser. */
function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/** Create a task using the form values and a unique browser-side ID. */
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(taskForm);
  const title = String(formData.get("title") || "").trim();
  if (!title) return;

  tasks.unshift({
    id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    title,
    project: String(formData.get("project") || "").trim(),
    due: String(formData.get("due") || ""),
    completed: false,
    createdAt: new Date().toISOString()
  });

  saveTasks();
  taskForm.reset();
  renderTasks();
});

/** Update task status or remove a task through event delegation. */
taskList.addEventListener("click", (event) => {
  const row = event.target.closest("[data-task-id]");
  if (!row) return;
  const task = tasks.find((item) => item.id === row.dataset.taskId);
  if (!task) return;

  if (event.target.matches("[data-action='toggle']")) {
    task.completed = event.target.checked;
  } else if (event.target.matches("[data-action='delete']")) {
    tasks = tasks.filter((item) => item.id !== task.id);
  } else {
    return;
  }

  saveTasks();
  renderTasks();
});

/** Switch between all, open, and completed task views. */
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderTasks();
  });
});

/**
 * Render task rows with DOM APIs and textContent.
 * Using textContent avoids interpreting user-entered task names as HTML.
 */
function renderTasks() {
  const visibleTasks = tasks.filter((task) => {
    if (activeFilter === "open") return !task.completed;
    if (activeFilter === "done") return task.completed;
    return true;
  });

  taskList.replaceChildren();
  visibleTasks.forEach((task) => {
    const row = document.createElement("li");
    row.className = `task-item${task.completed ? " completed" : ""}`;
    row.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-check";
    checkbox.checked = Boolean(task.completed);
    checkbox.dataset.action = "toggle";
    checkbox.setAttribute("aria-label", `Mark ${task.title} as completed`);

    const main = document.createElement("div");
    main.className = "task-main";
    const title = document.createElement("span");
    title.className = "task-title";
    title.textContent = task.title;

    const meta = document.createElement("span");
    meta.className = "task-meta";
    meta.textContent = [task.project, task.due ? `Due ${task.due}` : ""].filter(Boolean).join(" · ") || "Personal task";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-task";
    remove.dataset.action = "delete";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", `Delete ${task.title}`);

    main.append(title, meta);
    row.append(checkbox, main, remove);
    taskList.append(row);
  });

  const openCount = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = String(openCount);
  taskSummary.textContent = `${tasks.length} total · ${openCount} open`;
  emptyState.hidden = visibleTasks.length > 0;
}

/**
 * Connect a local file to a media element.
 * Object URLs avoid uploading the selected file to a server.
 */
function connectLocalMedia(inputSelector, playerSelector, nameSelector) {
  const input = document.querySelector(inputSelector);
  const player = document.querySelector(playerSelector);
  const name = document.querySelector(nameSelector);
  let currentObjectUrl = null;

  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;

    // Release the previous object URL to avoid holding unnecessary memory.
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
    currentObjectUrl = URL.createObjectURL(file);
    player.src = currentObjectUrl;
    name.textContent = file.name;
    player.load();
  });

  // Release the temporary URL when the page is closed or refreshed.
  window.addEventListener("beforeunload", () => {
    if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl);
  });
}

connectLocalMedia("#audio-file", "#audio-player", "#audio-name");
connectLocalMedia("#video-file", "#video-player", "#video-name");
renderTasks();
