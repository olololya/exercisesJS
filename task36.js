// Write a JavaScript function to create a specified number of elements
// with pre-filled numeric value array.

function createArray(length, value) {
  if (!length || value === undefined) return 'error (null)';
  if (length < 1) return 'error (length <= 0)';

  if (isNaN(parseInt(value))) return 'error (value not Num)';
  else value = parseInt(value);

  var arr = new Array(length);
  for (var i = 0; i < length; i++)
    arr[i] = value;
  return arr;
};

console.log( createArray(6, 0) );
console.log( createArray(4, 'jghk') );
console.log( createArray(4, '-11') );