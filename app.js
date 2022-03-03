const formAddTodo = document.querySelector(".form-add-todo");
const todosContainer = document.querySelector(".todos-container");
const searchFormTodo = document.querySelector(".form-search");

formAddTodo.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputValue = event.target.add.value.trim();

  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center">
      <span>${inputValue}</span>
      <i class="far fa-trash-alt delete"></i>
    </li>
    `;
  }

  event.target.reset();
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
    return;
  }
});

searchFormTodo.addEventListener("input", (event) => {
  const inputValue = event.target.value.toLowerCase().trim();

  Array.from(todosContainer.children)
    .filter((todo) => !todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("d-flex");
      todo.classList.add("hidden");
    });

  Array.from(todosContainer.children)
    .filter((todo) => todo.textContent.toLowerCase().includes(inputValue))
    .forEach((todo) => {
      todo.classList.remove("hidden");
      todo.classList.add("d-flex");
    });
});
