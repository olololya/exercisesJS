//Write a JavaScript program to perform a binary search.

function binSearch(arr, num) {
  var i = 0, j = arr.length;

  while (i < j) {
    var avrg = Math.floor((i + j) / 2);
    if (num <= arr[avrg]) j = avrg;
    else i = avrg + 1;
  };

  if (arr[i] === num) return i;
  else return 'not found';
};

console.log( binSearch([0, 1, 2, 3, 4, 5, 6, 8], 4) );