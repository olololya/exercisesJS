//Write a merge sort program in JavaScript. 

function mergeSort(arr) {
  var avrg = Math.floor(arr.length / 2);
  if (avrg > 0) { 
    var left = mergeSort(arr.slice(0, avrg));
    var right = mergeSort(arr.slice(avrg));
    var sort_arr = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) {
        sort_arr.push(left.shift());
      } else {
        sort_arr.push(right.shift());
      }
    }
    return sort_arr.concat(left, right);
  }
  return arr;
};

console.log( mergeSort([34,7,23,32,5,62,2,33]) );