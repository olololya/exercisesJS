//Write a JavaScript function to create a specified number of elements
// with pre-filled string value array.

function createArray(length, value) {
  if (!length || value === undefined) return 'error (null)';
  if (length < 1) return 'error (length <= 0)';

  return new Array(length + 1).join(value + ' ').split(' ', length);
};

console.log( createArray(6, 0) );
console.log( createArray(4, 'jghk') );
console.log( createArray(4, '-11') );