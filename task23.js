//Write a JavaScript function to find the difference of two arrays.



function  difference(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) return 'error (not array)';
  if (arr1.length < 1 || arr2.length < 1) return 'error (null)';

  var flat_arr1 = flatten(arr1);  //Flatten a nested arrays
  var flat_arr2 = flatten(arr2);

  flat_arr1 = removeDuplicate(flat_arr1);
  flat_arr2 = removeDuplicate(flat_arr2);

  var arr_out = [];

  compare(flat_arr1, flat_arr2, arr_out);
  if (flat_arr2.length > flat_arr1.length)
    compare(flat_arr2, flat_arr1, arr_out);

  return removeDuplicate(arr_out);

  function compare(arr1, arr2, arr_out) {
    for (var value1 of arr1) {
      var flag = true;
      for (var value2 of arr2) {
        if (value1 == value2) {
          flag = false;
          break;
        }
      }
      if (flag) {
        arr_out.push(value1);
      }
    }
    return arr_out;
  }

  function flatten(arr, shallow, arr_out) {
    if (!arr_out) arr_out = [];

    if (shallow) {
      return arr_out.concat.apply(arr_out, arr);
    } else {
      for (var value of arr) {
        if (Array.isArray(value)) flatten(value, shallow, arr_out);
        else arr_out.push(value);
      }
    }
    return arr_out;
  }

  function removeDuplicate(arr) {
    if (!Array.isArray(arr)) return 'error (not array)';
    if (arr.length < 1) return 'error (null)';
    if (arr.length === 1) return arr;

    var arr_unique = [];
    for (var i = 0; i < arr.length; i++) {
      if (arr_unique.length === 0) {
        arr_unique[0] = arr[i];
        continue;
      }
      var flag = true;
      for (var j = 0; j < arr_unique.length; j++) {
        if (arr[i] === arr_unique[j]) {
          flag = false;
          break;
        }
      }
      if (flag === true) arr_unique.push(arr[i]);
    }

    return arr_unique;
  }
}

console.log(difference([1, 2, 3], [100, 2, 1, 10]));
console.log(difference([1, 2, 3, 4, 5], [1, [2], [3, [[4]]],[5,6]]));
console.log(difference([1, 2, 3], [100, 2, 1, 10]));