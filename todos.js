let getValue = (val) => {
  return document.querySelector(`#${val}`);
};  
let getRadomId = () => {
  return Math.random().toString(36).slice(2);
};

let emptyTodos = () => {
  getValue("title").value = "";
  getValue("Location").value = "";
  getValue("Discription").value = "";
  return;
};

const handleSubmit = () => {
  let Title = getValue("title").value.trim(),
    Location = getValue("Location").value.trim(),
    Discription = getValue("Discription").value.trim();

  if (Title.length < 3) {
    return showNotification("Please enter your  Title Correctly", "error");
  }
  if (Location.length < 3) {
    return showNotification("Please enter your Location Correctly", "error");
  }
  if (Discription.length < 8) {
    return showNotification("Please enter your Discription Correctly", "error");
  }
  let todo = { Title, Location, Discription };
  todo.id = getRadomId();
  todo.dateCreated = new Date().getTime();
  todo.status = "active";
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    todos = [];
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
  showNotification("A new Todos has been successfully Create", "success");
  showTodos();
  emptyTodos();

  console.log("Todos Add Successfully");
};

const showTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    todos = [];
  }
  if (!todos.length) {
    return (getValue(
      "output"
    ).innerHTML = `<h5 >HURRAY! No Task  available  Add a task button  to add your task </h5>`);
  }

  let tableStartCode = `<div class="table-responsive">  <table class="table">`;
  let tableEndingCode = `</table></div>`;
  let tableHead = `<thead> <tr> <th>#</th> <th>Title</th> <th> Location</th>  <th>Description</th> <th>Action</th></tr>`;
  let tableBody = ``;

  for (let i = 0; i < todos.length; i++) {
    let todo = todos[i];
    tableBody += `<tr> <td>${i + 1} </td> <td>${todo.Title} </td> <td>${
      todo.Location
    } </td> <td>${
      todo.Discription
    } </td> <td> <button class ="btn btn-info btn-sm mb-2  mb-md-0 me-0 me-md-1"
      data-value ="${
        todo.id
      }" onclick="handleEdit(event)"> <i class="fa-solid fa-pen" data-value =${
      todo.id
    }></i>  </button></td> <td> <button class="btn btn-danger btn-sm mb-2  mb-md-0 me-0 me-md-1" data-value =${
      todo.id
    } onclick="handleDelete(event)">  <i class="fa-solid fa-trash" data-value =${
      todo.id
    }></i> </button> </td> </tr> `;
  }
  let table =
    tableStartCode +
    tableHead +
    "<tbody>" +
    tableBody +
    "</tbody>" +
    tableEndingCode;
  getValue("output").innerHTML = table;
};

const handleEdit = (e) => {
  let todoId = e.target.getAttribute("data-value");
  console.log(e.target.getAttribute("data-value"));
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todo = todos.find((todo) => {
    return todo.id === todoId;
  });
  let { Title, Discription, Location } = todo;

  getValue("title").value = Title;
  getValue("Discription").value = Discription;
  getValue("Location").value = Location;

  localStorage.setItem("todosforEdit", JSON.stringify(todo));

  getValue("updateTaskButton").style.display = "block";
  getValue("addTaskButton").style.display = "none";
};

let handleUpdate = () => {
  let todosforEdit = JSON.parse(localStorage.getItem("todosforEdit"));
  let updatetitle = getValue("title").value;
  let updateLocation = getValue("Location").value;
  let updateDiscription = getValue("Discription").value;

  let updateTodos = {
    ...todosforEdit,
    title: updatetitle,
    Location: updateLocation,
    Discription: updateDiscription,
  };

  let todos = JSON.parse(localStorage.getItem("todos"));
  updateTodos.dataModified = new Date().getTime();

  let todosAfterUpdate = todos.map((todo) => {
    if (todo.id === todosforEdit.id) return updateTodos;
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(todosAfterUpdate));
  showTodos();
  emptyTodos();
  showNotification("Todos is Successfully Update", "success");
  getValue("addTaskButton").style.display = "block";
  getValue("updateTaskButton").style.display = "none";
};

let handleDelete = (e) => {
  let todoId = e.target.getAttribute("data-value");
  console.log(e.target.getAttribute("data-value"));
  let todos = JSON.parse(localStorage.getItem("todos"));
  let todosAfterDelete = todos.filter((todo) => {
    return todo.id !== todoId;
  });
  localStorage.setItem("todos", JSON.stringify(todosAfterDelete));
  showNotification("A Todos has been successfully Delete", "success");
  showTodos();
};
// Toastify Function
function showNotification(msg, type) {
  let bgColor;
  switch (type) {
    case "success":
      bgColor = "Linear-gradient(to right ,#1D976C,#93f989";
      break;
    case "error":
      bgColor = "Linear-gradient(to right ,#93291e,#ed213a";
      break;
    default:
      bgColor = "#000";
  }
  Toastify({
    text: msg,
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: bgColor,
      color: "#fff",
    },
  }).showToast();
}

window.onload = () => {
  showTodos();
  getValue("year").innerHTML = new Date().getFullYear();

  let gettingPrompt = prompt("What's Your Name ?");
  (getValue("name").innerHTML = `Hi ${gettingPrompt} !`);
};

