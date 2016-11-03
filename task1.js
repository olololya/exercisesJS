//Write a JavaScript program to calculate the factorial of a number. 

function factorial(num) {
  if (num != 1) {
    return num * factorial(num - 1);
  } else {
    return num;
  }
};

console.log( factorial(5) );