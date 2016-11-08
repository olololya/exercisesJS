/*Write a JavaScript function to fill an array with values
 (numeric, string with one character) on supplied bounds.
 console.log(num_string_range('a', "z", 2));
 ["a", "c", "e", "g", "i", "k", "m", "o", "q", "s", "u", "w", "y"]
*/

function fillArray(start, end, interval) {
  if ((!start && start !== 0) || (!end && end !== 0) ||
    (!interval && interval !== 0)) return 'error (null)';
  if (typeof start !== typeof end) return 'error (diff type)';
  if (typeof start === 'string' &&
    (start.length !== 1 || end.length !== 1)) return 'error (more than one character)';
  if (interval < 1) return 'error (interval null)';

  var arr = [];

  if (start === end) arr.push(start);

  if (typeof start === 'string') {
    start = start.charCodeAt(0);
    end = end.charCodeAt(0);
    for (var i = start; i < end; i += interval) {
      arr.push(String.fromCharCode(i));
    }
  } else {
    for (var i = start; i < end; i += interval) {
      arr.push(i);
    }
  }

  return arr;
}

console.log( fillArray('a', 'z', 2) );
console.log( fillArray(1, 20, 2) );
console.log( fillArray(1, '2', 2) );
console.log( fillArray('a', 'a', 2) );
console.log( fillArray('', 'z', 2) );
console.log( fillArray('a', 'z', -2) );
console.log( fillArray('a', 'zzzzz', 2) );