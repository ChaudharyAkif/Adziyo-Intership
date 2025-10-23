let arr: any[] = [
  { name: "Akif", age: 12, course: "Html" },
  { name: "Ali", age: 20, course: "Css" },
];

// add
arr.push({ name: "Ahmed", age: 20, course: "React" });

// edit
arr[1] = { name: "Akif3", age: 18, course: "Js" };

// DELETE
arr[1] = arr.pop();

console.log(arr);
