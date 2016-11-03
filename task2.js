//Write a JavaScript program to find the greatest common divisor (gcd)
// of two positive numbers. 

function getNOD(num1, num2) {
  if(num2 == 0) {
    return num1;
  } else {
    return getNOD(num2, num1 % num2)
  };
};

console.log( getNOD(15, 35) );  //5