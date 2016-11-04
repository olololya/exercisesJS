/*We have the following arrays : Go to the editor
color = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow "];
o = ["th","st","nd","rd"]
Write a JavaScript program to display the colors in the following way :
  "1st choice is Blue ."
"2nd choice is Green."
"3rd choice is Red."*/

function print(arr) {
  if (!Array.isArray(arr)) err = 'error (not array)';
  if (arr.length < 1) err = 'error (null)';

  var o = ["th","st","nd","rd"];

  for (var i = 0; i < arr.length; i++) {
    var num = i + 1;
    if (num < 4) console.log(num + o[num] + ' choice is ' + arr[i]);
    else console.log(num + o[0] + ' choice is ' + arr[i]);
  };
};


var arr = ["Blue ", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

print(arr);