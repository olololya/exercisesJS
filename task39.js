//Write a JavaScript function to filter false, null, 0 and blank values
// from an array.

function filterArray(value) {
  if (value) return value;
};

var arr = [58, '', 'abcd', true, null, false, 0].filter(filterArray);
console.log(arr);