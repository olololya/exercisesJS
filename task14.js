//Write a JavaScript program to remove duplicate items from an array
// (ignore case sensitivity)

function removeDuplicate(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (arr.length === 1) return arr;

  var arr_unique = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr_unique.length === 0) {
      arr_unique[0] = arr[i];
      continue;
    };
    var flag = true;
    for (var j = 0; j < arr_unique.length; j++) {
      if (arr[i] === arr_unique[j]) {
        flag = false;
        break;
      };
    };
    if (flag === true) arr_unique.push(arr[i]);
  };

  return arr_unique;
};

var arr = [1, 2, 3, 1, 4, 5, 1, 2, 4, 6, 6, 7, 8, 8, 8, 8, 9];

console.log(arr);
arr = removeDuplicate(arr);
console.log(arr);