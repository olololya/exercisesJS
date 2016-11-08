//Write a JavaScript function to remove a specific element from an array

function removeElem(arr, elem) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (!elem) return 'error (not elem)';


  var ind = arr.indexOf(elem);
  if (ind === -1) return "not found";
  arr.splice(ind, 1);
  return arr;
};

console.log( removeElem([2, 5, 9, 6], 5) );