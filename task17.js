//Write a JavaScript program to shuffle an array

function shuffle(arr) {
  for (var i = 0; i < arr.length; i++) {
    var ind = Math.floor(Math.random() * arr.length)
    var tmp = arr[i];
    arr[i] = arr[ind];
    arr[ind] = tmp;
  };
  return arr;
};

console.log( shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) );