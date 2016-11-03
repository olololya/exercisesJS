//Write a JavaScript program to compute the sum of an array of integers.

var arr = [1, 2, 3, 4, 5, 6];
var sum = 0;
var ind = 0;

function getSum(sum, ind) {
  if (ind < arr.length) {
    return getSum(sum + arr[ind], ind + 1);
  } else {
    return sum;
  }
};

console.log( getSum(sum, ind) ); //21
