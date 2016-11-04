//There are two arrays with individual values, write a JavaScript program
// to compute the sum of each individual index value from the given arrays.

function getSum(arr1, arr2) {
  var sum_arr = [];
  var i = 0;

  while (i < arr1.length && i < arr2.length) {
    sum_arr.push(arr1[i] + arr2[i]);
    i++
  };

  if (arr1.length > sum_arr.length) {
    for (var j = i; j < arr1.length; j++) {
      sum_arr.push(arr1[j]);
    };
  };
  if (arr2.length > sum_arr.length) {
    for (var j = i; j < arr2.length; j++) {
      sum_arr.push(arr2[j]);
    };
  };

  return sum_arr;
};

var arr1 = [1, 0, 2, 3, 4];
var arr2 = [3, 5, 6, 7, 8, 13];

console.log( getSum(arr1, arr2) );