//Write a JavaScript program to find a pair of elements (indices of the two numbers)
// from an given array whose sum equals a specific target number.

function findPair(arr, target) {
  if (arr.length <= 1) return 'error';

  var pairs = [];

  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) pairs.push([].concat(i + 1, j + 1));
    };
  };

  return pairs;
};

console.log( findPair([10, 20, 10, 40, 50, 60, 70], 60) );

