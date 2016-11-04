//Write a JavaScript function to remove. 'null', '0', '""', 'false', 'undefined'
// and 'NaN' values from an array.

function remove(value) {
  if (value) return value;
};

var arr = [NaN, 0, 15, false, -22, '',undefined, 47, null].filter(remove);
console.log(arr);