let students = [];

// add
students.push(
  { name: "Akif", age: "10", course: "Html" },
  { name: "Ali", age: "15", course: "Html" }
);

// update
// students[0] = { name: "Ahmed", age: "12", course: "css" };

// delete
students[0] = students.pop();

// Read
console.log(students);
