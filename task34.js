//Write a JavaScript function to get nth largest element from an unsorted array

function getLargest(arr, ind) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (!ind || ind <= 0 || ind > arr.length) return 'error (ind)';


  arr.sort(function(a, b) {
    return b - a;
  });
  return arr[ind - 1];
}

var arr = [43, 56, 23, 89, 88, 90, 99, 652];
console.log( getLargest(arr, 4));
console.log( getLargest(arr, 1));
console.log( getLargest(arr, 5));
console.log( getLargest(arr, 9));