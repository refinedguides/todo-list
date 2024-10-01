const todos = JSON.parse(localStorage.getItem("todos")) || [];

const todoForm = document.querySelector(".todo-form");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const statusText = document.getElementById("statusText");

todoForm.addEventListener("submit", addTodo);

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // create the checkbox input
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = todo.done;
    cb.addEventListener("change", () => toggleDone(todo.id));

    // create the todo text
    const span = document.createElement("span");
    span.textContent = todo.text;

    // create the delete button
    const btn = document.createElement("button");
    btn.classList.add("remove-button");
    btn.addEventListener("click", () => removeTodo(todo.id));
    btn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>`;

    // append the created elements to list item
    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(btn);

    todoList.appendChild(li);
  });
}
showStatus();
renderTodos();

function showStatus() {
  if (!todos.length) {
    statusText.textContent = "You have no tasks. 😊";
    return;
  }

  const pending = todos.filter((todo) => !todo.done).length;
  if (pending === 0) {
    statusText.textContent = "All done! 🎉";
  } else if (pending === 1) {
    statusText.textContent = "1 task remaining";
  } else {
    statusText.textContent = `${pending} / ${todos.length} tasks remaining`;
  }
}

function addTodo(e) {
  e.preventDefault();

  const newTodoText = todoInput.value.trim();
  if (!newTodoText) {
    alert("Please enter a valid todo item");
    return;
  }

  const newTodo = {
    id: Date.now() + Math.random().toString(36).substring(2, 9),
    text: newTodoText,
    done: false,
  };

  todos.unshift(newTodo);

  saveTodos();
  showStatus();
  renderTodos();

  todoInput.value = "";
}

function toggleDone(id) {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;

  saveTodos();
  showStatus();
}

function removeTodo(id) {
  const todoIndex = todos.findIndex((todo) => todo.id === id);
  todos.splice(todoIndex, 1);

  saveTodos();
  showStatus();
  renderTodos();
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
