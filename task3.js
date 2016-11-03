//Write a JavaScript program to get the integers in range (x, y). 

var arr = new Array();

range(2, 9);

function range(num1, num2) {
  num1++;
  if (num1 != num2) {
    arr.push(num1);
    return range(num1, num2);
  }
};

console.log(arr); //[3, 4, 5, 6, 7, 8]