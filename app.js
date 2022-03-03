const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const searchTodo = document.querySelector(".form-search");

const insertTodo = (inputValue) => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  }

  event.target.reset();
};

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();

  const inputValue = event.target.add.value.trim();
  insertTodo(inputValue);
});

todosContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const getTagName = event.target.tagName;
  const checkedElement = ["LI", "SPAN"].includes(getTagName);

  if (Array.from(clickedElement.classList).includes("delete")) {
    clickedElement.parentElement.remove();
  }

  if (checkedElement) {
    clickedElement.classList.toggle("check");
  }
});

const filterTodos = (todos, inputValue, returnMatchedTodos) =>
  todos.filter((todo) => {
    const matchedTodos = todo.textContent.toLowerCase().includes(inputValue);
    return returnMatchedTodos ? matchedTodos : !matchedTodos;
  });

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach((todo) => {
    todo.classList.remove(classToRemove);
    todo.classList.add(classToAdd);
  });
};

const hiddenTodos = (todos, inputValue) => {
  const todosToHide = filterTodos(todos, inputValue, false);
  manipulateClasses(todosToHide, "hidden", "d-flex");
};

const showTodos = (todos, inputValue) => {
  const todosToShow = filterTodos(todos, inputValue, true);
  manipulateClasses(todosToShow, "d-flex", "hidden");
};

searchTodo.addEventListener("input", (event) => {
  const inputValue = event.target.value.trim().toLowerCase();
  const todos = Array.from(todosContainer.children);

  hiddenTodos(todos, inputValue);
  showTodos(todos, inputValue);
});
