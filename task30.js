//Write a JavaScript function to merge two arrays and removes all duplicates
// elements.

function mergeArrays(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return 'error (not array)';
  if (arr1.length < 1) return arr2;
  if (arr2.length < 1) return arr1;

  var arr3 = arr1.concat(arr2);

  return removeDuplicate(arr3);

  function removeDuplicate(arr) {
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
}

console.log( mergeArrays([1, 2, 3], [2, 30, 1]) );
