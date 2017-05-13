// // Spread Operator examples:  spreads out arrays to be all the values of the array as if not in array
//
// function add(a, b) {
//   return a + b;
// }
//
// console.log(add(3, 1));
//
// var toAdd = [9, 5];
//
// console.log(add(...toAdd));  // The spread operator spreads out the elements in the structure; in this case an array
//
//
//
// var groupA = ['Doug', 'Erin'];
// var groupB = ['Remy', 'Charley'];
// var final = [3, ...groupA, ...groupB];
//
// console.log(final);

var person = ['Charley', 6];
var personTwo = ['Janie', 83];

function greet (name, age) {
  console.log('Hi, ' + name + '. You are ' + age + '.');
}

greet(...person);
greet(...personTwo);

var names = ['Charley', 'Remy'];
var final = ['Mr. Fish', ...names];

final.forEach(function(name) {
  console.log('Hi, ' + name);
});
