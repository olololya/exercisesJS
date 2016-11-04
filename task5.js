//Write a simple JavaScript program to join all elements of the following
// array into a string.

function toString(arr, str) {
  if (str == undefined) {
    return arr.toString();
  } else {
    return arr.join(str);
  };
};

console.log( toString(["Red", "Green", "White", "Black"]) );
console.log( toString(["Red", "Green", "White", "Black"], "+") );