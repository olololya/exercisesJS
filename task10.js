//Write a JavaScript program which prints the elements of the following array

function printElem(arr) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';

  for (var i = 0; i < arr.length; i++) {
    console.log('row ' + i);
    for ( var j = 0; j < arr[j].length; j++) {
      console.log(' ' + arr[i][j]);
    };
  };
};

var arr = [[1, 2, 1, 24], [8, 11, 9, 4], [7, 0, 7, 27], [7, 4, 28, 14], [3, 10, 26, 7]];

printElem(arr);