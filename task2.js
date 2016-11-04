//Write a JavaScript function to clone an array.

function array_Clone(arr) {
  return arr.slice();
};

console.log(array_Clone([1, 2, 4, 0]));
console.log(array_Clone([1, 2, [4, 0]]));