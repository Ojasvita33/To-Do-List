const form = document.querySelector("form");
const input = document.querySelector("form input");
const tasksContainer = document.querySelector(".tasks");
const themeToggle = document.getElementById("theme-toggle");

let todos = [];

// Theme toggle functionality
const setTheme = (darkMode) => {
  document.body.classList.toggle("dark-mode", darkMode);
  themeToggle.innerHTML = darkMode ? "☀️" : "🌙";
  localStorage.setItem("theme", darkMode ? "dark" : "light");
};

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  setTheme(true);
}

themeToggle.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("dark-mode"));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const todo = {
    text: input.value,
    checked: false,
    id: new Date().getTime(),
  };

  todos.push(todo);
  e.target.reset();

  displayTodos();
});

const displayTodos = () => {
  tasksContainer.innerHTML = "";

  todos.forEach((todo) => {
    const taskEl = document.createElement("div");
    const inputEl = document.createElement("input");
    const textEl = document.createElement("p");
    const delButton = document.createElement("button");

    taskEl.classList.add("task");
    inputEl.classList.add("checkbox");
    delButton.classList.add("delete");
    textEl.classList.add("text");

    inputEl.type = "checkbox";
    textEl.innerHTML = todo.text;
    delButton.innerHTML = "Delete";

    delButton.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      displayTodos();
    });

    inputEl.addEventListener("change", (e) => {
      todo.checked = e.target.checked;

      if (todo.checked) {
        taskEl.classList.add("done");
      } else {
        taskEl.classList.remove("done");
      }
    });

    taskEl.appendChild(inputEl);
    taskEl.appendChild(textEl);
    taskEl.appendChild(delButton);
    tasksContainer.appendChild(taskEl);
  });
};
