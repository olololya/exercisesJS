//Write a JavaScript program to find duplicate values in a JavaScript array



function findDuplicate(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';
  if (arr.length === 1) return [];

  var arr_duplicate = [];
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr_duplicate = addDupl(arr_duplicate, arr[i]);
        break;
      };
    };
  };

  function addDupl(arr, num) {
    var flag = true;
    for (var i = 0; i < arr.length; i++) {
      if (num === arr[i]) {
        flag = false;
        break;
      }
    };
    if (flag) arr.push(num);
    return arr;
  };

  return arr_duplicate;
};

var arr = [1, 2, 3, 1, 4, 5, 1, 2, 4, 6, 7, 8, 8, 8, 8, 9];

console.log(arr);
console.log( findDuplicate(arr) );