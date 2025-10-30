// let form = document.querySelector("form");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//   let fullNameInput = document.querySelector("#fullName");
//   let emailInput = document.querySelector("#email");
//   let passwordInput = document.querySelector("#password");
//   let nameError = document.querySelector("#Nameerror");

//   let a = fullNameInput.value.trim();
//   let b = emailInput.value.trim();
//   let c = passwordInput.value.trim();

//   if (!a || !b || !c) {
//     console.log("Fill all the fields");
//     return;
//   }

//   if (a.length < 3) {
//     nameError.innerHTML = `Name must be at least 3 characters. You entered "${a}"`;
//     nameError.style.display = "initial";
//     return;
//   } else {
//     nameError.style.display = "none";
//   }

//   // ✅ Clear input boxes
//   fullNameInput.value = "";
//   emailInput.value = "";
//   passwordInput.value = "";

//   console.log("Done ✅");
// });

// class car {
//   constructor(name) {
//     this.name = name
//     console.log(`${name} is this car`);
//   }
//   Start = "Car is Start";
//   stop = "Car is Start";
// }

// let Car1 = new car("ToyotaCar");
// let Car2 = new car("mm");
// console.log(Car2);

// class Product {
//   constructor(id, title, price, image) {
//     this.id = id;
//     this.title = title;
//     this.price = price;
//     this.image = image;
//   }

//   getInfo() {
//     return `${this.title} - $${this.price}`;
//   }
// }

// const data = { id: 1, title: "iPhone 14", price: 1200, image: "iphone.jpg" };
// const data2 = { id: 5, title: "iPhone 17", price: 12900, image: "iphone.jpg" };
// const product = new Product(data.id, data.title, data.price, data.image);
// const product2 = new Product(data.id, data.title, data.price, data.image);
// console.log(product.getInfo()); // iPhone 14 - $1200

let getValue = (val) => {
  return document.querySelector(`#${val}`);
};

// let gettingPrompt = prompt("What's Your Name ?");
// let UserName = (getValue("name").innerHTML = `Hi ${gettingPrompt}`);

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
    Discription = getValue("Discription ").value.trim();

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
  emptyTodos();
  console.log("Todos Add Successfully");
};

const handleRead = () => {
  let todos = JSON.parse(localStorage.getItem("todos"));
  if (todos === null) {
    todos = [];
  }
  if(!todos.length){
    getValue()
  }
};
const handleUpdate = () => {};
const handleDelete = () => {
  localStorage.removeItem("users");
  console.log("Remove Users Successfully ");
};

getValue("year").innerHTML = new Date().getFullYear();
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





























