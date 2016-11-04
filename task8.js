//Write a JavaScript program to find the most frequent item of an array.

var arr = [3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];

function findFrequent(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (arr.length === 1) return arr[0] + ' ( 1 times )';

  var max_count = 0;
  var frequent = null;

  for (var i = 0; i < arr.length; i++) {
    if (frequent == arr[i]) continue;
    else {
      var count = 1;
    }
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) count++;
    };
    if (max_count < count) {
      max_count = count;
      frequent = arr[i];
    };
  };

  return frequent + ' ( ' + max_count + ' times )';
};

console.log( findFrequent(arr) );