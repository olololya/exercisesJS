//Write a JavaScript function to move an array element from one position to another.

function move(arr, pos1, pos2) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length <= 1) return 'error (length array)';
  if (pos1 === undefined || pos2 === undefined ) return 'error (not position)';
  if (pos1 === pos2) return 'error (pos1 != pos2)';
  if (pos1 > arr.length || pos2 >= arr.length) return 'error (position > length array)';

  if (pos1 < 0) pos1 += arr.length;
  if (pos2 < 0) pos2 += arr.length;

  arr.splice(pos2, 0, arr.splice(pos1, 1)[0]);
  return arr;
};

console.log( move([10, 20, 30, 40, 50], 0, 2) );
console.log( move([10, 20, 30, 40, 50], -1, -2) );