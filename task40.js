//Write a JavaScript function to generate an array of specified length,
// filled with integer numbers, increase by one from starting position

function createArray(start, length) {
  if (!start && start !== 0) return 'error (not start)';
  if (length < 1) return 'error (not length)';
  var arr = [];
  for (var i = 0; i < length; i++, start++) {
    arr[i] = start;
  }
  return arr;
}

console.log( createArray(1, 4) );

console.log( createArray(-6, 4) );