//Write a JavaScript function to generate an array between two integers
// of 1 step length

function createArray(start, end) {
  if (!start && start !== 0) return 'error (not start)';
  if (!end && end !== 0 || end <= start) return 'error (not length)';
  var arr = [];
  for (var i = 0, value = start; value <= end; i++, value++) {
    arr[i] = value;
  }
  return arr;
}

console.log( createArray(4, 7) );

console.log( createArray(-4, 7) );