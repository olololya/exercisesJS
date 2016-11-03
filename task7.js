//Write a JavaScript program to check whether a number is even or not. 

function isEven(num) {
  if (num > 1) return isEven(num - 2);
  else {
    return (num == 0) ? true : false;
  }
};

console.log( isEven(8) );
console.log( isEven(9) );