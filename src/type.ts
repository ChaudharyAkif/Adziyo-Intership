interface Todo {
  id: string;
  Title: string;
  Location: string;
  Discription: string;
  dateCreated: number;
  dataModified?: number;
  status: string;
}

const getValue = (val: string): HTMLElement | null => {
  return document.querySelector(`#${val}`);
};

const getRandomId = (): string => {
  return Math.random().toString(36).slice(2);
};

const emptyTodos = (): void => {
  const titleEl = getValue("title") as HTMLInputElement;
  const locationEl = getValue("Location") as HTMLInputElement;
  const descEl = getValue("Discription") as HTMLInputElement;

  if (titleEl) titleEl.value = "";
  if (locationEl) locationEl.value = "";
  if (descEl) descEl.value = "";
};

const handleSubmit = (): void => {
  const titleEl = getValue("title") as HTMLInputElement;
  const locationEl = getValue("Location") as HTMLInputElement;
  const descEl = getValue("Discription") as HTMLInputElement;

  const Title = titleEl.value.trim();
  const Location = locationEl.value.trim();
  const Discription = descEl.value.trim();
  if (Title.length < 3) {
    return showNotification("Please enter your Title correctly", "error");
  }
  if (Location.length < 3) {
    return showNotification("Please enter your Location correctly", "error");
  }
  if (Discription.length < 8) {
    return showNotification("Please enter your Description correctly", "error");
  }

  const todo: Todo = {
    id: getRandomId(),
    Title,
    Location,
    Discription,
    dateCreated: new Date().getTime(),
    status: "active",
  };

  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

  showNotification("A new Todo has been successfully created", "success");
  showTodos();
  emptyTodos();
};

const showTodos = (): void => {
  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  const outputEl = getValue("output");

  if (!todos.length) {
    if (outputEl)
      outputEl.innerHTML = `<h5>HURRAY! No tasks available. Click Add Task to add your task.</h5>`;
    return;
  }

  const tableStartCode = `<div class="table-responsive"><table class="table">`;
  const tableEndCode = `</table></div>`;
  const tableHead = `
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Location</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
  `;

  let tableBody = "";
  todos.forEach((todo, index) => {
    tableBody += `
      <tr>
        <td>${index + 1}</td>
        <td>${todo.Title}</td>
        <td>${todo.Location}</td>
        <td>${todo.Discription}</td>
        <td>
          <button class="btn btn-info btn-sm me-1" data-value="${
            todo.id
          }" onclick="handleEdit(event)">
            <i class="fa-solid fa-pen" data-value="${todo.id}"></i>
          </button>
          <button class="btn btn-danger btn-sm" data-value="${
            todo.id
          }" onclick="handleDelete(event)">
            <i class="fa-solid fa-trash" data-value="${todo.id}"></i>
          </button>
        </td>
      </tr>
    `;
  });

  const fullTable = `${tableStartCode}${tableHead}<tbody>${tableBody}</tbody>${tableEndCode}`;
  if (outputEl) outputEl.innerHTML = fullTable;
};

const handleEdit = (e: Event): void => {
  const target = e.target as HTMLElement;
  const todoId = target.getAttribute("data-value");
  if (!todoId) return;

  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  const todo = todos.find((t) => t.id === todoId);
  if (!todo) return;

  (getValue("title") as HTMLInputElement).value = todo.Title;
  (getValue("Discription") as HTMLInputElement).value = todo.Discription;
  (getValue("Location") as HTMLInputElement).value = todo.Location;

  localStorage.setItem("todosforEdit", JSON.stringify(todo));

  (getValue("updateTaskButton") as HTMLElement).style.display = "block";
  (getValue("addTaskButton") as HTMLElement).style.display = "none";
};

const handleUpdate = (): void => {
  const todosForEdit: Todo = JSON.parse(
    localStorage.getItem("todosforEdit") || "{}"
  );

  const updatedTitle = (getValue("title") as HTMLInputElement).value;
  const updatedLocation = (getValue("Location") as HTMLInputElement).value;
  const updatedDescription = (getValue("Discription") as HTMLInputElement)
    .value;

  const updatedTodo: Todo = {
    ...todosForEdit,
    Title: updatedTitle,
    Location: updatedLocation,
    Discription: updatedDescription,
    dataModified: new Date().getTime(),
  };

  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  const updatedTodos = todos.map((todo) =>
    todo.id === todosForEdit.id ? updatedTodo : todo
  );

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  showTodos();
  emptyTodos();
  showNotification("Todo successfully updated", "success");

  (getValue("addTaskButton") as HTMLElement).style.display = "block";
  (getValue("updateTaskButton") as HTMLElement).style.display = "none";
};

const handleDelete = (e: Event): void => {
  const target = e.target as HTMLElement;
  const todoId = target.getAttribute("data-value");
  if (!todoId) return;

  const todos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
  const remainingTodos = todos.filter((todo) => todo.id !== todoId);

  localStorage.setItem("todos", JSON.stringify(remainingTodos));
  showNotification("Todo successfully deleted", "success");
  showTodos();
};

function showNotification(
  msg: string,
  type: "success" | "error" | "info"
): void {
  let bgColor: string;
  switch (type) {
    case "success":
      bgColor = "linear-gradient(to right, #1D976C, #93F989)";
      break;
    case "error":
      bgColor = "linear-gradient(to right, #93291E, #ED213A)";
      break;
    default:
      bgColor = "#000";
  }

  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    style: {
      background: bgColor,
      color: "#fff",
    },
  }).showToast();
}

window.onload = (): void => {
  showTodos();

  const yearEl = getValue("year");
  if (yearEl) yearEl.innerHTML = new Date().getFullYear().toString();

  const userName = prompt("What's your name?");
  (getValue("name") as HTMLElement).innerHTML = `Hi ${userName}!`;
};

(window as any).handleSubmit = handleSubmit;
(window as any).handleEdit = handleEdit;
(window as any).handleDelete = handleDelete;
(window as any).handleUpdate = handleUpdate;

let value: string = "Hello World";
let lengthOfValue = (value as string).length;
console.log(lengthOfValue);
