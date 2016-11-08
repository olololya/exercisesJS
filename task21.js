/*Write a JavaScript program to flatten a nested (any depth) array.
If you pass shallow, the array will only be flattened a single level.
Sample Data : console.log(flatten([1, [2], [3, [[4]]],[5,6]]));
[1, 2, 3, 4, 5, 6]
console.log(flatten([1, [2], [3, [[4]]],[5,6]], true));
[1, 2, 3, [[4]], 5, 6]*/

function flatten(arr, shallow, arr_out) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';

  if (!arr_out) arr_out = [];

  if (shallow) {
    return arr_out.concat.apply(arr_out, arr);
  } else {
    for (var value of arr) {
      if (Array.isArray(value)) flatten(value, shallow, arr_out);
      else arr_out.push(value);
    }
  }

  return arr_out;
};

console.log( flatten([1, [2], [3, [[4]]], [5,6]]) );

console.log( flatten([1, [2], [3, [[4]]] ,[5,6]], true) )