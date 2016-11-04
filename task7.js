//Write a JavaScript program to sort the items of an array

function sortArray(num1, num2) {
  return num1 - num2;
};

var arr = [3, 8, 7, 6, 5, -4, 3, 2, 1];
console.log( arr.sort(sortArray) );