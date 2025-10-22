// Important Topic Shallow and Deep Copy

let obj = {
  name1: "Akif",
};

// let user = obj;
// user.name = "Ali";
// console.log(user);

// aise ya copy tu krra h lakin ya is ki actual copy ni hoti ya jis obj ko hum copy krne ki kohish krre us ka reference pass krte h
// like memory ma dono ka same hi address ho ga jb b hum kis ma b chnages krre ga tu dono ma changes ho gi
// is liye hum use krte h shallow copy ka

// then ab hum use krre ga shallow copy with spread operator ka use kr ke

let user2 = { ...obj };
user2.name1 = "Ahmed";
console.log(user2);
console.log(obj);

// this is shallow copy
// ek aur method h shallow copy ki

// const user3 = Object.assign({}, obj);
// user3.name = "User3";
// console.log(user3);
// console.log(obj);

// ya thi humri shallow copy lakin is ma ek issue h
// jo toper object bane in ka reference ni milta lakin nesting object ma jo hum na nest object kiya h wo same refernece wala hi kaam krta h yani actual copy ni milti h nesting objects ki

// is liye hum use krte h deep copy ko wo kese hoti h dekte h

// deep copy ma hum sab sa phly is obj ko hum convert kr de g string ma then again object ban de ga

// ab baat ye h hum string ma ku convert krre h kya string actual copy krti h
// is ka answere ya h  string actual copy krti h reference ni dti

// is liye hum object ko first string ma convert krre ga ek js ka method ko use krra ke like

// JSON Stringify({})
// is sa kay ho ga ya string ma convert kr de ga
// then ab hum is ko again object ma convert krre ga object ma is le liye ek method used hota h JSON.parse
// is sa again object ban ge ga
// ab hum agr actual ma yani obj ma koi chnages krte h  second obj ma koi difference ni aya ga and dosra agr hum  second ma koi chnages krte h tu first ma koi chnages ni aya ga

let user4 = JSON.parse(JSON.stringify(obj));
user4.name = "User4";

console.log(obj);
console.log(user4);

// deep copy ki apni limit h
// ya thi  deep copy is ka koi aur tarika ni h is
