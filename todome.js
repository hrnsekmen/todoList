const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  form.addEventListener("submit", addTodo);
  clearButton.addEventListener("click", clearAllTodos);
  todoList.addEventListener("click", deleteTodo);
  filter.addEventListener("keyup", filterTodos);
}
function loadAllTodosToUI() {
  let todos = getTodosFromStorage();
  todos.forEach((todo) => {
    addTodoToUI(todo);
  });
}
function filterTodos(e) {
  const filterValue = e.target.value.toLowerCase();
  const listItems = document.querySelectorAll(".list-group-item");
  listItems.forEach(function (listItem) {
    const text = listItem.textContent.toLowerCase();
    if (text.indexOf(filterValue) === -1) {
      listItem.setAttribute("style", "display:none !important");
    } else {
      listItem.setAttribute("style", "display:flex !important");
    }
  });
}
function addTodo(e) {
  const newTodo = todoInput.value.trim();

  if (newTodo === "") {
    showAlert("danger", "Alan boş bırakılamaz!");
  } else {
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success", "Başarıyla eklendi!");
  }
  e.preventDefault();
}
function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  todoList.appendChild(listItem);
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoInput.value = "";
}
function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    const deletedtodo = e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
    showAlert("success", "Başarıyla silindi!");
  }
  e.preventDefault();
}
function deleteTodoFromStorage(deletetodo) {
  let todos = getTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (todo === deletetodo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function clearAllTodos(e) {
  if (confirm("Emin misiniz ?")) {
    showAlert("success", "Liste Temizlendi");
    todoList.innerHTML = "";
    localStorage.removeItem("todos");
  } else {
    showAlert("warning", "Veriler silinmedi!");
  }
  e.preventDefault();
}
function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  setInterval(function () {
    alert.remove();
  }, 1000);
}
