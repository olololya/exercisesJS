//Write a JavaScript program to compute the sum and product of an array of integers.

function printSumProd(arr) {
  var err = null;
  if (!Array.isArray(arr)) err = 'error (not array)';
  if (arr.length < 1) err = 'error (null)';
  if (arr.length === 1) err = 'error (need more 1 element)';
  if (err) {
    console.log(err);
    return;
  }

  var sum = 0;
  var prod = 1;

  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
    prod *= arr[i];
  };

  console.log('sum = ' + sum);
  console.log('prod = ' + prod);
};

printSumProd([1, 2, 3, 4, 5]);
printSumProd([0, 2, 3, 4, 5]);
printSumProd([1]);