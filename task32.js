//Write a JavaScript function to find an array contains a specific element

function findValue(arr, value) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (!value && value !== 0) return 'error (value)';

  return (arr.indexOf(value) !== -1) ? true : false;
};

console.log( findValue([2, 5, 9, 6], 5) );
console.log( findValue([2, 5, 9, 6], 0) );