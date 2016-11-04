//Write a JavaScript function to retrieve the value of a given property
// from all elements in an array.

function findValueOfProp(arr, prop) {
  if (!Array.isArray(arr)) return 'error (not array)';
  if (arr.length < 1) return 'error (null)';

  var arr_val = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].hasOwnProperty(prop)) {
      arr_val.push(arr[i][prop]);
    };
  };

  return arr_val;
};

var library = [
  { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
  { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
  { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
];

console.log( findValueOfProp(library, 'title') );