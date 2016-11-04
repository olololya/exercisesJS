//Write a JavaScript program to find the sum of squares of a numeric vector

function getSum(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (arr.length === 1) return 'sum  = ' + Math.pow(arr[0], 2);

  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += Math.pow(arr[i], 2);
  };
  return 'sum = ' + sum;
};

console.log( getSum([1, 2, 3, 4, 5]) )